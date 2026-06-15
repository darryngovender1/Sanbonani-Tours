import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

const vertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_uv;

vec3 permute(vec3 x) {
  return mod(((x*34.0)+1.0)*x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

float sampleHeight(vec2 p, float t) {
  return fbm(p * 3.0 + t * 0.05) * 0.5 + 0.5;
}

float waterLevel(float t) {
  return 0.15 + 0.08 * sin(t * 0.1);
}

void main() {
  float t = u_time;
  vec2 uv = v_uv;
  float aspect = u_resolution.x / u_resolution.y;
  uv.x *= aspect;

  vec2 origin = vec2(aspect * 0.5, 0.5);
  origin += vec2(sin(t * 0.02) * 0.1, cos(t * 0.015) * 0.05);

  float zoom = 0.5 + 0.1 * sin(t * 0.05);
  vec2 p = (uv - origin) * zoom;

  float height = sampleHeight(p, t);
  float water = waterLevel(t);
  float waterFactor = smoothstep(water - 0.02, water + 0.02, height);

  vec3 terrainLow = vec3(0.796, 0.654, 0.490);
  vec3 terrainHigh = vec3(0.886, 0.745, 0.580);
  vec3 terrainColor = mix(terrainLow, terrainHigh, smoothstep(0.0, 0.8, height));

  vec3 waterDeep = vec3(0.105, 0.227, 0.294);
  vec3 waterShallow = vec3(0.831, 0.686, 0.215);
  vec3 waterColor = mix(waterDeep, waterShallow, smoothstep(0.0, 1.0, height / water));

  terrainColor += vec3(snoise(p * 20.0 + t * 0.1) * 0.02);
  waterColor += vec3(snoise(p * 15.0 + t * 0.2) * 0.01);

  vec3 finalColor = mix(waterColor, terrainColor, waterFactor);

  if (u_mouse.x > 0.0) {
    vec2 mUV = u_mouse / u_resolution;
    mUV.x *= aspect;
    vec2 mousePos = (mUV - origin) * zoom;
    float dist = length(p - mousePos);
    if (dist < 0.15) {
      float ripple = sin(dist * 40.0 - t * 3.0) * 0.5 + 0.5;
      ripple *= smoothstep(0.15, 0.0, dist);
      finalColor = mix(finalColor, vec3(1.0, 0.92, 0.78), ripple * 0.5);
    }
  }

  float fogFactor = smoothstep(0.0, 1.0, length(p));
  finalColor = mix(finalColor, vec3(0.886, 0.827, 0.745), fogFactor * 0.3);

  float vig = 1.0 - smoothstep(0.5, 1.5, length(v_uv - 0.5) * 2.0);
  finalColor *= 0.8 + 0.2 * vig;

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const overlineRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    if (!canvasContainerRef.current) return

    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvasContainerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_mouse: { value: new THREE.Vector2(-1.0, -1.0) },
      },
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let mouseX = -1.0
    let mouseY = -1.0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = 1.0 - (e.clientY / window.innerHeight)
    }

    const handleMouseLeave = () => {
      mouseX = -1.0
      mouseY = -1.0
    }

    window.addEventListener('mousemove', handleMouseMove)
    canvasContainerRef.current.addEventListener('mouseleave', handleMouseLeave)

    const clock = new THREE.Clock()
    let animId: number

    const animate = () => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(animate)
        return
      }
      const elapsedTime = clock.getElapsedTime()
      material.uniforms.u_time.value = elapsedTime
      material.uniforms.u_mouse.value.set(mouseX, mouseY)
      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight)
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Intersection Observer to pause when out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0 }
    )
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (canvasContainerRef.current) {
        canvasContainerRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      observer.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (canvasContainerRef.current && renderer.domElement.parentNode) {
        canvasContainerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  // Text entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.8 })

    if (overlineRef.current) {
      tl.to(overlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word')
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.5'
      )
    }

    if (subtitleRef.current) {
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
    }

    if (ctaRef.current) {
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
    }
  }, [])

  const headlineWords = 'Where the Wild Meets the Water'.split(' ')

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-[100dvh] flex items-end overflow-hidden"
    >
      {/* WebGL Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
        role="img"
        aria-label="Animated topographic map showing river channels flowing through golden terrain"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,46,46,0.3) 0%, rgba(15,46,46,0) 40%, rgba(15,46,46,0) 60%, rgba(15,46,46,0.85) 100%)',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-[2] w-full px-[5vw] pb-[15vh] max-w-[700px]">
        {/* Overline */}
        <div
          ref={overlineRef}
          className="font-body font-medium text-[11px] tracking-[0.15em] uppercase mb-5 text-cream"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          Kwazulu-Natal, South Africa
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] uppercase leading-[1.05] tracking-[-0.02em] text-cream"
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.3em]"
              style={{ opacity: 0, transform: 'translateY(40px)' }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body font-light text-base leading-relaxed mt-6 max-w-[500px]"
          style={{ color: 'rgba(245,240,230,0.7)', opacity: 0, transform: 'translateY(20px)' }}
        >
          Curated safaris and coastal journeys through the heart of Zululand
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#destinations"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="btn-primary mt-9"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          Explore Destinations
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

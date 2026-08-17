/**
 * Post-build prerender: serves dist/ with `vite preview`, visits each route in
 * headless Edge and saves the fully-rendered HTML to dist/<route>/index.html.
 *
 * Skips gracefully when no Edge/Chrome is available (e.g. Netlify CI) — the
 * site still works as a plain SPA thanks to the _redirects fallback.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROUTES = ['/', '/gallery', '/things-to-do', '/faq', '/privacy-policy', '/terms']
const PORT = 4173
const BASE = `http://localhost:${PORT}`

const BROWSER_CANDIDATES = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
]

const executablePath = BROWSER_CANDIDATES.find((p) => existsSync(p))
if (!executablePath) {
  console.warn('[prerender] No Edge/Chrome found — skipping prerender (SPA fallback still works).')
  process.exit(0)
}

const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: 'pipe',
  shell: true,
})

const waitForServer = () =>
  new Promise((resolve, reject) => {
    const deadline = Date.now() + 30000
    const tick = async () => {
      try {
        const res = await fetch(BASE)
        if (res.ok) return resolve()
      } catch {
        /* not up yet */
      }
      if (Date.now() > deadline) return reject(new Error('preview server did not start'))
      setTimeout(tick, 500)
    }
    tick()
  })

async function main() {
  await waitForServer()
  const { default: puppeteer } = await import('puppeteer-core')
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })

    for (const route of ROUTES) {
      await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 })

      // Scroll through the page so scroll-triggered content reveals itself,
      // then back to top before capture
      await page.evaluate(async () => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
        const step = window.innerHeight
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y)
          await sleep(200)
        }
        window.scrollTo(0, 0)
      })
      await new Promise((r) => setTimeout(r, 2500))

      let html = await page.content()
      // Strip vite-preview-injected nothing; mark as prerendered
      html = html.replace('<html', '<html data-prerendered')

      const dir = route === '/' ? 'dist' : join('dist', route.slice(1))
      mkdirSync(dir, { recursive: true })
      writeFileSync(join(dir, 'index.html'), html)
      console.log(`[prerender] ${route} -> ${join(dir, 'index.html')}`)
    }
  } finally {
    await browser.close()
    server.kill()
  }
}

main().catch((err) => {
  console.warn('[prerender] failed:', err.message)
  server.kill()
  process.exit(0) // never fail the build over prerendering
})

/**
 * Post-build prerender: serves dist/ with `vite preview`, visits each route in
 * a headless browser and saves the fully-rendered HTML to dist/<route>/index.html.
 *
 * Browser: local Edge/Chrome when present (dev machine), otherwise puppeteer's
 * bundled Chromium (Netlify CI). Skips gracefully if no browser can be launched —
 * the site still works as a plain SPA thanks to the _redirects fallback.
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

async function launchBrowser() {
  const local = BROWSER_CANDIDATES.find((p) => existsSync(p))
  if (local) {
    const { default: puppeteer } = await import('puppeteer-core')
    return puppeteer.launch({
      executablePath: local,
      headless: true,
      args: ['--no-sandbox', '--disable-gpu'],
    })
  }
  // CI (e.g. Netlify): no system browser — use puppeteer's bundled Chromium
  const { default: puppeteer } = await import('puppeteer')
  // The CI npm may skip postinstall scripts, so Chromium may not have been
  // downloaded at install time — fetch it on demand (no-op if present).
  let chromePath = null
  try {
    chromePath = puppeteer.executablePath()
  } catch {
    /* not resolved yet */
  }
  if (!chromePath || !existsSync(chromePath)) {
    console.log('[prerender] downloading Chromium for CI…')
    await new Promise((resolve, reject) => {
      const inst = spawn('npx', ['puppeteer', 'browsers', 'install', 'chrome'], {
        stdio: 'inherit',
        shell: process.platform === 'win32',
      })
      inst.on('exit', (code) =>
        code === 0 ? resolve() : reject(new Error(`browser install exited ${code}`)),
      )
    })
  }
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  })
}

// Spawn vite directly via node — no npx/cmd wrapper, so server.kill() actually
// kills the preview server. (A wrapper would survive the kill and keep holding
// PORT, which made the NEXT build's prerender hang.)
const server = spawn(
  process.execPath,
  [join('node_modules', 'vite', 'bin', 'vite.js'), 'preview', '--port', String(PORT), '--strictPort'],
  { stdio: 'pipe' },
)

const killServer = () => {
  try {
    server.kill()
  } catch {
    /* already dead */
  }
}

// Watchdog: never let prerendering hang the build. Exit cleanly instead —
// the SPA fallback still works without prerendered HTML.
const watchdog = setTimeout(() => {
  console.warn('[prerender] timed out — skipping (SPA fallback still works).')
  killServer()
  process.exit(0)
}, 8 * 60 * 1000) // generous: CI may need to download Chromium first

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
  const browser = await launchBrowser()

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
    clearTimeout(watchdog)
    killServer()
  }
}

main().catch((err) => {
  console.warn('[prerender] failed:', err.message)
  clearTimeout(watchdog)
  killServer()
  process.exit(0) // never fail the build over prerendering
})

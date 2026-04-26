import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = Number(process.env.PORT || 4173);
const rootUrl = `http://127.0.0.1:${port}`;
const artifactDir = join(process.cwd(), "tests", "artifacts");
mkdirSync(artifactDir, { recursive: true });

const server = spawn(process.execPath, ["server.mjs"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT: String(port) }
});

try {
  await waitForServer(rootUrl);

  const executablePath = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
  ].find(existsSync);

  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {})
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") pageErrors.push(message.text());
  });
  await page.goto(rootUrl, { waitUntil: "networkidle" });
  await page.waitForSelector("canvas");
  await page.waitForTimeout(700);
  await assertCanvasHasPixels(page, "desktop");
  await page.screenshot({ path: join(artifactDir, "desktop.png"), fullPage: true });

  const moduleCount = await page.locator(".module-button").count();
  for (let i = 0; i < moduleCount; i += 1) {
    await page.locator(".module-button").nth(i).click();
    await page.waitForTimeout(180);
    await assertCanvasHasPixels(page, `module ${i + 1}`);
  }

  await page.setViewportSize({ width: 390, height: 900 });
  await page.waitForTimeout(500);
  await assertCanvasHasPixels(page, "mobile");
  await page.screenshot({ path: join(artifactDir, "mobile.png"), fullPage: true });

  if (pageErrors.length) {
    throw new Error(`Browser errors: ${pageErrors.join(" | ")}`);
  }

  await browser.close();
  console.log("Render check passed: desktop and mobile canvases contain nonblank WebGL pixels.");
} finally {
  server.kill("SIGTERM");
}

async function waitForServer(url) {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw new Error(`Server did not start at ${url}`);
}

async function assertCanvasHasPixels(page, label) {
  const sample = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    const width = Math.min(180, gl.drawingBufferWidth);
    const height = Math.min(120, gl.drawingBufferHeight);
    const x = Math.floor((gl.drawingBufferWidth - width) / 2);
    const y = Math.floor((gl.drawingBufferHeight - height) / 2);
    const pixels = new Uint8Array(width * height * 4);
    gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    let colored = 0;
    let alpha = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      if (a > 0) alpha += 1;
      if (a > 0 && Math.max(r, g, b) - Math.min(r, g, b) > 8) colored += 1;
    }
    return { width, height, colored, alpha };
  });

  if (sample.alpha < 500 || sample.colored < 200) {
    throw new Error(`${label} canvas appears blank: ${JSON.stringify(sample)}`);
  }
}

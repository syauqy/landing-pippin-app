/**
 * Utility for generating shareable images from thought decoder results.
 * Outputs a 1080×1920 portrait (Instagram Story / TikTok) via Canvas API.
 */

/** Wrap text to fit within maxWidth, returns array of lines. */
function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/** Draw a rounded rectangle path. */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Generate a 1080×1920 portrait share image (Story format).
 * @param {object} result - { title, explanation, reframe }
 */
export async function generateShareImage(result) {
  const W = 1080;
  const H = 1920;
  const PAD = 96;
  const CONTENT_W = W - PAD * 2;
  const scale = 2;

  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  // ── Background gradient ──────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
  bg.addColorStop(0, "#fdf8f2");
  bg.addColorStop(1, "#ede0d0");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Decorative soft circles ──────────────────────────────────────
  ctx.beginPath();
  ctx.arc(W - 60, -80, 420, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(200, 170, 140, 0.13)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(-60, H + 60, 380, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(180, 148, 112, 0.10)";
  ctx.fill();

  // ── Top brand strip ──────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.fillStyle = "#b09c8a";
  ctx.font = "600 22px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("P I P P I N", W / 2, 80);

  // Small dot separator
  ctx.beginPath();
  ctx.arc(W / 2, 108, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#d4b99e";
  ctx.fill();

  // ── "Your 2AM thought" label ─────────────────────────────────────
  ctx.fillStyle = "#9a8578";
  ctx.font = "400 26px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("your 2am thought", W / 2, 168);

  // ── Thin accent line ─────────────────────────────────────────────
  const lineW = 56;
  ctx.fillStyle = "#c9a98a";
  ctx.fillRect(W / 2 - lineW / 2, 190, lineW, 3);

  // ── Category title (very large, centered) ────────────────────────
  const titleSize = 82;
  ctx.font = `700 ${titleSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.fillStyle = "#1c1410";
  const titleLines = wrapText(ctx, result.title, CONTENT_W);
  let y = 310;
  for (const line of titleLines) {
    ctx.fillText(line, W / 2, y);
    y += titleSize * 1.22;
  }

  // ── Explanation section ──────────────────────────────────────────
  y += 28;

  // Section label
  ctx.font = "500 22px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#b09c8a";
  ctx.fillText("what's really happening", W / 2, y);
  y += 52;

  // Explanation text
  ctx.font = "400 36px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#3d2f25";
  const expLines = wrapText(ctx, result.explanation, CONTENT_W - 40);
  for (const line of expLines) {
    ctx.fillText(line, W / 2, y);
    y += 36 * 1.62;
  }

  // ── Reframe box ──────────────────────────────────────────────────
  if (result.reframe) {
    y += 32;

    // Measure reframe text to size the box
    ctx.font = "400 32px -apple-system, BlinkMacSystemFont, sans-serif";
    const reframeLines = wrapText(ctx, `"${result.reframe}"`, CONTENT_W - 80);
    const boxPadV = 36;
    const boxPadH = 44;
    const lineH = 32 * 1.6;
    const boxH = reframeLines.length * lineH + boxPadV * 2;
    const boxX = PAD;
    const boxY = y;

    // Box fill
    roundRect(ctx, boxX, boxY, CONTENT_W, boxH, 24);
    ctx.fillStyle = "rgba(180, 148, 112, 0.14)";
    ctx.fill();

    // Box border
    roundRect(ctx, boxX, boxY, CONTENT_W, boxH, 24);
    ctx.strokeStyle = "rgba(180, 148, 112, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Reframe text
    ctx.fillStyle = "#5c4535";
    ctx.font = "400 32px -apple-system, BlinkMacSystemFont, sans-serif";
    let ry = boxY + boxPadV + 32 * 0.8;
    for (const line of reframeLines) {
      ctx.fillText(line, W / 2, ry);
      ry += lineH;
    }

    y = boxY + boxH;
  }

  // ── Footer ───────────────────────────────────────────────────────
  const footerY = H - 80;

  ctx.fillStyle = "rgba(176, 156, 138, 0.4)";
  ctx.fillRect(PAD, footerY - 28, CONTENT_W, 1);

  ctx.font = "400 24px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = "#b09c8a";
  ctx.fillText("getpippin.app/overthinking-decoder", W / 2, footerY);

  // ── Trigger download ─────────────────────────────────────────────
  ctx.textAlign = "left"; // reset
  const filename = `pippin-decoded-${result.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40)}.png`;
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    throw new Error("Failed to copy to clipboard. Please try again.");
  }
}

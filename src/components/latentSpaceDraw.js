/**
 * Canvas drawing helpers for LatentSpaceProjects visualization
 */

export function drawBackground(ctx, w, h) {
  // Deep dark canvas background
  ctx.fillStyle = '#070a12';
  ctx.fillRect(0, 0, w, h);

  // Faint cyber grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
  ctx.lineWidth = 1;
  const gridStep = 24;
  ctx.beginPath();
  for (let x = 0; x < w; x += gridStep) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
  }
  for (let y = 0; y < h; y += gridStep) {
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
  }
  ctx.stroke();
}

export function drawClusterLabels(ctx, clusters, w, h) {
  ctx.font = '600 10px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  clusters.forEach((c) => {
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.fillText(`// ${c.name}_CLUSTER`, c.labelX * w, c.labelY * h);
  });
}

export function drawScanline(ctx, scanY, w, isReducedMotion) {
  if (isReducedMotion) return;
  ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
  ctx.fillRect(0, scanY - 3, w, 6);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
  ctx.fillRect(0, scanY, w, 1.2);
}

export function drawNodes(ctx, points, activeId, scanY, now, isReducedMotion, time) {
  points.forEach((dot) => {
    if (!isReducedMotion && Math.abs(scanY - dot.py) < 8) {
      dot.lastPulse = now;
    }
    const pulseDecay = isReducedMotion ? 0 : Math.max(0, 1 - (now - dot.lastPulse) / 300);

    const driftX = isReducedMotion ? 0 : Math.sin(time + dot.idx * 1.7) * 1.2;
    const driftY = isReducedMotion ? 0 : Math.cos(time + dot.idx * 1.3) * 1.2;
    const currentX = dot.px + driftX;
    const currentY = dot.py + driftY;

    const isActive = dot.id === activeId;
    const baseRadius = isActive ? 6 : 4;
    const radius = baseRadius + pulseDecay * 2;

    let coreColor = '#38bdf8';
    let ringColor = 'rgba(56, 189, 248, 0.35)';
    if (dot.domain === 'WEB') {
      coreColor = '#22d3ee';
      ringColor = 'rgba(34, 211, 238, 0.35)';
    } else if (dot.domain === 'SYSTEMS') {
      coreColor = '#94a3b8';
      ringColor = 'rgba(148, 163, 184, 0.35)';
    }

    ctx.save();
    if (isActive || pulseDecay > 0.05) {
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = isActive ? 14 : 8;
    }

    // Outer ring
    ctx.beginPath();
    ctx.arc(currentX, currentY, radius + (isActive ? 4 : 2), 0, Math.PI * 2);
    ctx.strokeStyle = isActive ? '#38bdf8' : ringColor;
    ctx.lineWidth = isActive ? 1.5 : 1;
    ctx.stroke();

    // Inner core
    ctx.beginPath();
    ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
    ctx.fillStyle = isActive ? '#ffffff' : coreColor;
    ctx.fill();
    ctx.restore();

    // Node title token
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = isActive ? '#38bdf8' : 'rgba(203, 213, 225, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText(dot.title, currentX, currentY + radius + 10);
  });
}

export function drawHUD(ctx, nodeCount, activeTitle, w, h) {
  ctx.fillStyle = '#38bdf8';
  ctx.font = '8px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('[VIEW: 2D_PROJECTION]', 10, 14);

  ctx.textAlign = 'right';
  ctx.fillText(`N_NODES: ${nodeCount}`, w - 10, 14);

  ctx.textAlign = 'left';
  ctx.fillText('PROJECTION: MANUAL', 10, h - 8);

  ctx.textAlign = 'right';
  const statusText = activeTitle ? `ACTIVE: ${activeTitle}` : 'SELECT_DOT';
  ctx.fillText(statusText, w - 10, h - 8);
}

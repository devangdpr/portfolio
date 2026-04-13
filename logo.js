// =============================================
// PREMIUM DJ LOGO - Clean & Modern
// =============================================
(function () {
    const canvas = document.getElementById('logoCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 180;
    canvas.height = 44;

    const W = canvas.width;
    const H = canvas.height;
    let tick = 0;
    let hovered = false;
    let pulseScale = 1;
    let pulseDir = 1;

    canvas.addEventListener('mouseenter', () => hovered = true);
    canvas.addEventListener('mouseleave', () => hovered = false);

    function hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r},${g},${b}`;
    }

    function roundRect(x, y, w, h, r) {
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

    function draw() {
        ctx.clearRect(0, 0, W, H);

        tick++;
        pulseScale += 0.003 * pulseDir;
        if (pulseScale > 1.06 || pulseScale < 0.97) pulseDir *= -1;

        const cx = 22;
        const cy = H / 2;
        const size = 17;

        // ── BADGE ──────────────────────────────────
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(hovered ? 1.08 : pulseScale, hovered ? 1.08 : pulseScale);

        // Outer glow
        const outerGlow = ctx.createRadialGradient(0, 0, size * 0.5, 0, 0, size * 1.8);
        outerGlow.addColorStop(0, `rgba(102,126,234,${hovered ? 0.5 : 0.25})`);
        outerGlow.addColorStop(1, 'rgba(102,126,234,0)');
        ctx.beginPath();
        ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Badge shape — rounded square
        roundRect(-size, -size, size * 2, size * 2, 7);
        const badgeGrad = ctx.createLinearGradient(-size, -size, size, size);
        badgeGrad.addColorStop(0, '#7c3aed');
        badgeGrad.addColorStop(0.5, '#6366f1');
        badgeGrad.addColorStop(1, '#a855f7');
        ctx.fillStyle = badgeGrad;
        ctx.fill();

        // Shine overlay
        roundRect(-size, -size, size * 2, size * 2, 7);
        const shine = ctx.createLinearGradient(-size, -size, size * 0.5, size * 0.5);
        shine.addColorStop(0, 'rgba(255,255,255,0.25)');
        shine.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = shine;
        ctx.fill();

        // Border
        roundRect(-size, -size, size * 2, size * 2, 7);
        ctx.strokeStyle = `rgba(255,255,255,${hovered ? 0.5 : 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // "DJ" text
        ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(255,255,255,0.9)';
        ctx.shadowBlur = hovered ? 12 : 6;
        ctx.fillText('DJ', 0, 1);
        ctx.shadowBlur = 0;

        ctx.restore();

        // ── ANIMATED CORNER DOTS ──────────────────
        const dotPositions = [
            { x: cx - size - 4, y: cy - size - 4 },
            { x: cx + size + 4, y: cy - size - 4 },
            { x: cx - size - 4, y: cy + size + 4 },
            { x: cx + size + 4, y: cy + size + 4 },
        ];
        dotPositions.forEach((d, i) => {
            const alpha = 0.4 + Math.sin(tick * 0.06 + i * 1.2) * 0.3;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168,139,250,${alpha})`;
            ctx.fill();
        });

        // ── TEXT ──────────────────────────────────
        const tx = 50;
        const ty = cy;

        // "DEVANG" — bold, white
        ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        // Animated shimmer effect
        const shimmerX = ((tick * 2) % (W + 60)) - 30;
        const shimmerGrad = ctx.createLinearGradient(shimmerX - 20, 0, shimmerX + 20, 0);
        shimmerGrad.addColorStop(0, 'rgba(255,255,255,0)');
        shimmerGrad.addColorStop(0.5, 'rgba(255,255,255,0.9)');
        shimmerGrad.addColorStop(1, 'rgba(255,255,255,0)');

        // Base text color
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText('DEVANG', tx, ty - 1);

        // Shimmer layer
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillStyle = shimmerGrad;
        ctx.fillText('DEVANG', tx, ty - 1);
        ctx.restore();

        // "JAIN" — thinner, accent color with gradient
        ctx.font = '600 15px "Segoe UI", Arial, sans-serif';
        const jainGrad = ctx.createLinearGradient(tx + 72, 0, tx + 110, 0);
        jainGrad.addColorStop(0, '#a78bfa');
        jainGrad.addColorStop(1, '#f0abfc');
        ctx.fillStyle = jainGrad;
        ctx.fillText('JAIN', tx + 72, ty - 1);

        // Dot separator between names
        ctx.beginPath();
        ctx.arc(tx + 68, ty, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${0.5 + Math.sin(tick * 0.05) * 0.3})`;
        ctx.fill();

        // Animated underline
        const ulProgress = hovered ? 1 : 0.4 + Math.sin(tick * 0.04) * 0.15;
        const ulW = 128 * ulProgress;
        const ulGrad = ctx.createLinearGradient(tx, 0, tx + ulW, 0);
        ulGrad.addColorStop(0, '#6366f1');
        ulGrad.addColorStop(0.5, '#a855f7');
        ulGrad.addColorStop(1, 'rgba(168,139,250,0)');
        ctx.beginPath();
        ctx.moveTo(tx, ty + 10);
        ctx.lineTo(tx + ulW, ty + 10);
        ctx.strokeStyle = ulGrad;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = hovered ? 1 : 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Subtitle text "Portfolio"
        ctx.font = '500 8px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = `rgba(148,163,184,${hovered ? 0.9 : 0.5})`;
        ctx.letterSpacing = '2px';
        ctx.fillText('P O R T F O L I O', tx + 1, ty + 17);

        requestAnimationFrame(draw);
    }

    draw();
})();

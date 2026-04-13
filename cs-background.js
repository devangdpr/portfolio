// =============================================
// CS STUDENT BACKGROUND
// Matrix Rain + Circuit Nodes + Floating Code
// =============================================

const csCanvas = document.getElementById('csCanvas');
const cctx = csCanvas.getContext('2d');

csCanvas.width = window.innerWidth;
csCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    csCanvas.width = window.innerWidth;
    csCanvas.height = window.innerHeight;
    initMatrix();
});

// =============================================
// 1. MATRIX RAIN
// =============================================
const CHARS = '01アイウエオカキクケコ{}[]<>=+-*/;:ABCXYZ#@!?';
const FS = 13;
let cols, drops;

function initMatrix() {
    cols = Math.floor(csCanvas.width / FS);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));
}
initMatrix();

function drawMatrix() {
    // Stronger fade so it stays subtle
    cctx.fillStyle = 'rgba(5,5,16,0.15)';
    cctx.fillRect(0, 0, csCanvas.width, csCanvas.height);

    for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FS;
        const y = drops[i] * FS;

        // Bright head - very dim
        cctx.fillStyle = 'rgba(255,255,255,0.25)';
        cctx.font = `bold ${FS}px monospace`;
        cctx.fillText(char, x, y);

        // Colored trail - very subtle
        const r = Math.random();
        if (r > 0.7) cctx.fillStyle = `rgba(102,126,234,0.12)`;
        else if (r > 0.4) cctx.fillStyle = `rgba(0,220,80,0.08)`;
        else cctx.fillStyle = `rgba(240,147,251,0.07)`;
        cctx.font = `${FS}px monospace`;
        cctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FS);

        drops[i]++;
        if (y > csCanvas.height && Math.random() > 0.97) drops[i] = 0;
    }
}

// =============================================
// 2. FLOATING CODE SNIPPETS
// =============================================
const SNIPPETS = [
    'int main()', '#include<bits/stdc++.h>', 'for(i=0;i<n;i++)',
    'def solve():', 'return dp[n];', 'O(log n)', 'O(n²)',
    'while(true)', 'class Node {', 'import cv2',
    'git push origin', 'SELECT * FROM db', 'malloc(sizeof(T))',
    'cout << ans;', 'if(root==NULL)', 'BFS | DFS',
    '0xFF', '0b1010', '&&  ||  !=',
    'try { } catch(e)', 'async/await', 'HTTP 200 OK',
    'push_back(x)', 'sort(v.begin())', 'printf("%d",n)',
];

class CodeSnippet {
    constructor() { this.reset(true); }
    reset(init = false) {
        this.x = Math.random() * csCanvas.width;
        this.y = init ? Math.random() * csCanvas.height : csCanvas.height + 20;
        this.text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
        this.size = Math.random() * 3 + 9;
        this.alpha = Math.random() * 0.07 + 0.03;
        this.vy = -(Math.random() * 0.4 + 0.1);
        this.vx = (Math.random() - 0.5) * 0.2;
        this.color = Math.random() > 0.5 ? '102,126,234' : '0,200,80';
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < -30) this.reset();
    }
    draw() {
        cctx.font = `${this.size}px 'Courier New', monospace`;
        cctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        cctx.fillText(this.text, this.x, this.y);
    }
}

// =============================================
// 3. CIRCUIT NODES + L-SHAPED LINES
// =============================================
class CNode {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * csCanvas.width;
        this.y = Math.random() * csCanvas.height;
        this.r = Math.random() * 2.5 + 1.5;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.phase = Math.random() * Math.PI * 2;
        this.col = ['102,126,234', '0,200,80', '240,147,251'][Math.floor(Math.random() * 3)];
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.phase += 0.04;
        if (this.x < 0 || this.x > csCanvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > csCanvas.height) this.vy *= -1;
    }
    draw() {
        const g = Math.sin(this.phase) * 0.4 + 0.6;
        cctx.beginPath();
        cctx.arc(this.x, this.y, this.r + 3, 0, Math.PI * 2);
        cctx.fillStyle = `rgba(${this.col},${g * 0.06})`;
        cctx.fill();
        cctx.beginPath();
        cctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        cctx.fillStyle = `rgba(${this.col},${g * 0.4})`;
        cctx.fill();
    }
}

function drawCircuit(nodes) {
    for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
            const dx = nodes[a].x - nodes[b].x;
            const dy = nodes[a].y - nodes[b].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 140) {
                const alpha = (1 - d / 140) * 0.12;
                cctx.beginPath();
                cctx.moveTo(nodes[a].x, nodes[a].y);
                cctx.lineTo(nodes[b].x, nodes[a].y);
                cctx.lineTo(nodes[b].x, nodes[b].y);
                cctx.strokeStyle = `rgba(102,126,234,${alpha})`;
                cctx.lineWidth = 0.6;
                cctx.stroke();
                cctx.fillStyle = `rgba(102,126,234,${alpha * 2})`;
                cctx.fillRect(nodes[b].x - 1.5, nodes[a].y - 1.5, 3, 3);
            }
        }
    }
}

// =============================================
// INIT & ANIMATE
// =============================================
const snippets = Array.from({ length: 30 }, () => new CodeSnippet());
const cnodes   = Array.from({ length: 55 }, () => new CNode());

function csAnimate() {
    // Matrix handles its own fade via fillRect above
    drawMatrix();

    // Floating code on top
    snippets.forEach(s => { s.update(); s.draw(); });

    // Circuit
    drawCircuit(cnodes);
    cnodes.forEach(n => { n.update(); n.draw(); });

    requestAnimationFrame(csAnimate);
}

csAnimate();

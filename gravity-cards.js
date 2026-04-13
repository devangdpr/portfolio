// =============================================
// GRAVITY CARDS - Drag & Snap Back with Physics
// =============================================

class GravityCard {
    constructor(el) {
        this.el = el;
        this.originX = 0;
        this.originY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.velX = 0;
        this.velY = 0;
        this.isDragging = false;
        this.isAnimating = false;
        this.mouseStartX = 0;
        this.mouseStartY = 0;
        this.rafId = null;

        // Physics constants
        this.stiffness = 0.12;   // spring strength
        this.damping   = 0.75;   // friction / energy loss
        this.threshold = 0.3;    // stop animating below this velocity

        this.init();
    }

    init() {
        this.el.style.cursor = 'grab';
        this.el.style.userSelect = 'none';
        this.el.style.position = 'relative';
        this.el.style.zIndex = '1';
        this.el.style.willChange = 'transform';
        this.el.style.transition = 'box-shadow 0.3s ease';

        // Mouse events
        this.el.addEventListener('mousedown', (e) => this.onDragStart(e));
        window.addEventListener('mousemove', (e) => this.onDragMove(e));
        window.addEventListener('mouseup',   (e) => this.onDragEnd(e));

        // Touch events
        this.el.addEventListener('touchstart', (e) => this.onDragStart(e), { passive: true });
        window.addEventListener('touchmove',   (e) => this.onDragMove(e), { passive: true });
        window.addEventListener('touchend',    (e) => this.onDragEnd(e));
    }

    getClientPos(e) {
        if (e.touches && e.touches[0]) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }

    onDragStart(e) {
        this.isDragging = true;
        cancelAnimationFrame(this.rafId);
        this.isAnimating = false;

        const pos = this.getClientPos(e);
        this.mouseStartX = pos.x - this.currentX;
        this.mouseStartY = pos.y - this.currentY;

        this.velX = 0;
        this.velY = 0;

        this.el.style.cursor = 'grabbing';
        this.el.style.zIndex = '1000';
        this.el.style.boxShadow = '0 30px 80px rgba(102,126,234,0.7)';
        this.el.style.transition = 'box-shadow 0.3s ease';

        // Tilt on grab
        this.el.style.transform = `translate(${this.currentX}px, ${this.currentY}px) scale(1.08) rotate(2deg)`;
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        const pos = this.getClientPos(e);
        const newX = pos.x - this.mouseStartX;
        const newY = pos.y - this.mouseStartY;

        this.velX = newX - this.currentX;
        this.velY = newY - this.currentY;

        this.currentX = newX;
        this.currentY = newY;

        // Dynamic tilt based on velocity
        const tiltX = Math.max(-20, Math.min(20, this.velY * 2));
        const tiltY = Math.max(-20, Math.min(20, -this.velX * 2));
        const scale = 1.08;

        this.el.style.transform = `translate(${this.currentX}px, ${this.currentY}px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    onDragEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;

        this.el.style.cursor = 'grab';
        this.el.style.zIndex = '1';
        this.el.style.boxShadow = '';

        // Launch spring animation back to origin
        this.springBack();
    }

    springBack() {
        this.isAnimating = true;

        const animate = () => {
            if (!this.isAnimating) return;

            // Spring force toward origin (0,0)
            const forceX = -this.currentX * this.stiffness;
            const forceY = -this.currentY * this.stiffness;

            // Apply force to velocity
            this.velX = (this.velX + forceX) * this.damping;
            this.velY = (this.velY + forceY) * this.damping;

            // Update position
            this.currentX += this.velX;
            this.currentY += this.velY;

            // Dynamic tilt during spring
            const tiltX = Math.max(-15, Math.min(15, this.velY * 3));
            const tiltY = Math.max(-15, Math.min(15, -this.velX * 3));
            const scale = 1 + Math.min(0.05, (Math.abs(this.velX) + Math.abs(this.velY)) * 0.002);

            this.el.style.transform = `translate(${this.currentX}px, ${this.currentY}px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            // Stop when close enough to origin
            const speed = Math.abs(this.velX) + Math.abs(this.velY);
            const dist  = Math.abs(this.currentX) + Math.abs(this.currentY);

            if (speed < this.threshold && dist < 0.5) {
                this.currentX = 0;
                this.currentY = 0;
                this.velX = 0;
                this.velY = 0;
                this.isAnimating = false;
                this.el.style.transform = 'translate(0px, 0px) scale(1) rotateX(0deg) rotateY(0deg)';
                this.el.style.boxShadow = '';
                return;
            }

            this.rafId = requestAnimationFrame(animate);
        };

        this.rafId = requestAnimationFrame(animate);
    }
}

// =============================================
// Init all skill cards with gravity
// =============================================
function initGravityCards() {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
        new GravityCard(card);

        // Add gravity indicator badge
        const badge = document.createElement('div');
        badge.className = 'gravity-badge';
        badge.innerHTML = '⚡ drag me';
        card.appendChild(badge);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGravityCards);
} else {
    initGravityCards();
}

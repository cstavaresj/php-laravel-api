const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouseX = width / 2;
let mouseY = height / 2;

const NOTES = ['♪', '♫', '♬', '♩', '🎸', '🎵', '🎶'];

// Partículas de notas musicais
class Note {
    constructor(scattered) {
        this.pushX = 0;
        this.pushY = 0;
        this.repelRadius = 120;
        this.repelStrength = 60;
        if (scattered) {
            this.scatter();
        } else {
            this.reset();
        }
    }

    // Posição inicial espalhada pela tela toda
    scatter() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 18 + 10;
        this.speed = Math.random() * 0.8 + 0.3;
        this.drift = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.symbol = NOTES[Math.floor(Math.random() * NOTES.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }

    // Reciclagem quando sai da tela
    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 40;
        this.size = Math.random() * 18 + 10;
        this.speed = Math.random() * 0.8 + 0.3;
        this.drift = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.symbol = NOTES[Math.floor(Math.random() * NOTES.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
        this.y -= this.speed;
        this.x += this.drift + Math.sin(this.y * 0.01) * 0.3;
        this.rotation += this.rotSpeed;

        // Repulsão do mouse
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.repelRadius && dist > 0) {
            const force = (1 - dist / this.repelRadius) * this.repelStrength;
            const angle = Math.atan2(dy, dx);
            this.pushX += (Math.cos(angle) * force - this.pushX) * 0.1;
            this.pushY += (Math.sin(angle) * force - this.pushY) * 0.1;
        } else {
            this.pushX *= 0.92;
            this.pushY *= 0.92;
        }

        if (this.y < -30) this.reset();
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.pushX, this.y + this.pushY);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
    }
}

// Luzes desfocadas que se repelem do mouse
class GlowLight {
    constructor(color) {
        this.baseX = Math.random() * width;
        this.baseY = Math.random() * height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.pushX = 0;
        this.pushY = 0;
        this.radius = Math.random() * 150 + 80;
        this.color = color;
        this.phase = Math.random() * Math.PI * 2;
        this.speedX = (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1);
        this.speedY = (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1);
        this.ampX = Math.random() * 80 + 40;
        this.ampY = Math.random() * 60 + 30;
        this.repelRadius = 250;
        this.repelStrength = 120;
    }

    update(time) {
        // Movimento orgânico independente por luz
        const autoX = Math.sin(time * this.speedX + this.phase) * this.ampX;
        const autoY = Math.cos(time * this.speedY + this.phase * 1.3) * this.ampY;

        // Repulsão: quanto mais perto o mouse, mais forte empurra
        const dx = (this.baseX + autoX) - mouseX;
        const dy = (this.baseY + autoY) - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.repelRadius && dist > 0) {
            const force = (1 - dist / this.repelRadius) * this.repelStrength;
            const angle = Math.atan2(dy, dx);
            this.pushX += (Math.cos(angle) * force - this.pushX) * 0.08;
            this.pushY += (Math.sin(angle) * force - this.pushY) * 0.08;
        } else {
            // Retorno suave à posição natural
            this.pushX *= 0.95;
            this.pushY *= 0.95;
        }

        this.x = this.baseX + autoX + this.pushX;
        this.y = this.baseY + autoY + this.pushY;
    }

    draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}

// Inicializar partículas
const notes = Array.from({ length: 60 }, () => new Note(true));

// Inicializar luzes com cores temáticas de rock/metal
const lights = [
    new GlowLight('rgba(0, 200, 83, 0.3)'),
    new GlowLight('rgba(0, 229, 255, 0.25)'),
    new GlowLight('rgba(156, 39, 176, 0.2)'),
    new GlowLight('rgba(255, 23, 68, 0.15)'),
    new GlowLight('rgba(0, 176, 255, 0.2)'),
];

// Loop de animação
let time = 0;
function animate() {
    time++;
    ctx.clearRect(0, 0, width, height);

    // Desenhar luzes
    lights.forEach(light => {
        light.update(time);
        light.draw();
    });

    // Desenhar notas
    ctx.globalAlpha = 1;
    notes.forEach(note => {
        note.update();
        note.draw();
    });

    requestAnimationFrame(animate);
}

// Listeners
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

animate();

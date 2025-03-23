const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols = ["△", "○", "✕", "▢"];

// Define glow colors for each symbol
const symbolColors = {
    "△": "rgba(0, 255, 153, 0.7)",  // Green with transparency
    "○": "rgba(255, 0, 68, 0.7)",   // Red with transparency
    "✕": "rgba(0, 153, 255, 0.7)",  // Blue with transparency
    "▢": "rgba(153, 0, 255, 0.7)"   // Purple with transparency
};

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 40 + 20;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.color = symbolColors[this.symbol]; // Assign color based on symbol
        this.rotationSpeed = (Math.random() - 0.5) * 0.05; // Random speed of rotation
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap-around effect for particle movement
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Increment angle for rotation
        this.angle += this.rotationSpeed;
    }

    draw() {
        ctx.save(); // Save the current context state

        ctx.translate(this.x, this.y); // Move the origin to the particle's position
        ctx.rotate(this.angle); // Apply rotation
        ctx.fillStyle = this.color;
        ctx.font = `${this.size}px Arial`;

        // Apply glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20; // Adjust for stronger or softer glow

        ctx.fillText(this.symbol, -this.size / 2, this.size / 2); // Center the text

        // Reset shadow to avoid affecting other drawings
        ctx.shadowBlur = 0;

        ctx.restore(); // Restore the context to prevent affecting other particles
    }
}

function init() {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    let gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.2
    );
    gradient.addColorStop(0, "#0f173a");
    gradient.addColorStop(1, "#060c22");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw rotating symbols
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    init();
});

init();
animate();

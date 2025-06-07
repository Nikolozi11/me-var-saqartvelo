const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // ღილაკზე დაჭერისას მენიუ გამოჩნდება ან დაიმალება
});

//ჩამოშლა

document.querySelectorAll('.submenu-parent').forEach((item) => {
    item.addEventListener('mouseenter', () => {
        // ჯერ ყველა submenu დავმალოთ
        document.querySelectorAll('.submenu').forEach((sub) => {
            sub.style.display = 'none';
        });

        // მხოლოდ ამ hovered item-ის submenu ვაჩვენოთ
        const submenu = item.querySelector('.submenu');
        if (submenu) submenu.style.display = 'block';
    });

    item.addEventListener('mouseleave', () => {
        const submenu = item.querySelector('.submenu');
        if (submenu) submenu.style.display = 'none';
    });
});

//ქანვას ბანერი

const canvas = document.getElementById('banner');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

const logo = new Image();
logo.src = './img/GFF-logo.png';

const particles = [];

let logoAlpha = 0;
let explode = false;
let textAlpha = 0;
let showText = false;
let stopCreatingParticles = false;
let cycleDelay = 0;
let textHoldFrames = 0;
let startTextFadeOut = false;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.0015;
        if (this.alpha < 0) this.alpha = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(centerX, centerY));
    }
}

let frameCount = 0;

function animate() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Responsive logoSize
    const minDimension = Math.min(canvas.width, canvas.height);
    const logoSize = minDimension * 0.2; // 20% ეკრანის ზომის

    if (!explode) {
        if (logoAlpha < 1) {
            logoAlpha += 0.007;
        }

        ctx.globalAlpha = logoAlpha;
        ctx.drawImage(logo, canvas.width / 2 - logoSize / 2, canvas.height / 2 - logoSize / 2, logoSize, logoSize);
        ctx.globalAlpha = 1;

        frameCount++;

        if (frameCount > 120) {
            explode = true;
        }
    } else {
        if (logoAlpha > 0) {
            logoAlpha -= 0.05;
            if (!stopCreatingParticles) createParticles();
        } else {
            logoAlpha = 0;
            stopCreatingParticles = true;
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();

            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
        }

        if (stopCreatingParticles && particles.length <= 5) {
            showText = true;
        }
    }

    if (showText) {
        if (textAlpha < 1 && !startTextFadeOut) {
            textAlpha += 0.01;
        } else if (!startTextFadeOut) {
            textHoldFrames++;
            if (textHoldFrames > 120) {
                startTextFadeOut = true;
            }
        } else {
            textAlpha -= 0.005;
            if (textAlpha < 0) textAlpha = 0;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(textAlpha, 0);
        ctx.fillStyle = 'white';

        // Responsive ტექსტი — ზომა დამოკიდებულია ეკრანზე
        const fontSize = Math.floor(minDimension * 0.06); // ~6% ეკრანის ზომის
        ctx.font = `900 ${fontSize}px "Roboto Slab", serif`;
        ctx.textAlign = 'center';
        ctx.fillText('მე ვარ საქართველო', canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }

    if (startTextFadeOut && textAlpha <= 0 && particles.length === 0) {
        if (cycleDelay < 60) {
            cycleDelay++;
        } else {
            frameCount = 0;
            logoAlpha = 0;
            explode = false;
            textAlpha = 0;
            showText = false;
            stopCreatingParticles = false;
            cycleDelay = 0;
            textHoldFrames = 0;
            startTextFadeOut = false;
            particles.length = 0;
        }
    }

    requestAnimationFrame(animate);
}

logo.onload = function() {
    animate();
};

window.addEventListener('resize', () => {
    resizeCanvas();
});


function resizeCanvas() {
    const desiredAspectRatio = 16 / 9;

    let width = window.innerWidth;
    let height = window.innerHeight;

    if (width / height > desiredAspectRatio) {
        width = height * desiredAspectRatio;
    } else {
        height = width / desiredAspectRatio;
    }

    canvas.width = width;
    canvas.height = height;
}








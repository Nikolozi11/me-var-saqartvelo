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

//ქანვა ბანერი
const canvas = document.getElementById('banner');
const ctx = canvas.getContext('2d');

const bannerWidth = 600;  // ბანერის გაფართოება ტელეფონისთვის
const bannerHeight = 300; // ბანერის სიმაღლე ტელეფონისთვის

function isMobile() {
    return window.innerWidth <= 768;
}

function resizeCanvas() {
    if (isMobile()) {
        // ტელეფონისთვის - ფონი იქნება ბანერის პროპორციაზე
        canvas.width = bannerWidth;
        canvas.height = bannerHeight;
        // პლუს, მობილურზე ცენტრში მოვათავსებთ canvas-ს CSS-ით (არა აქ, მაგრამ შეგიძლია დაამატო)
    } else {
        // კომპიუტერზე - ფონი სრულად ფანჯრის ზომაზე
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
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
    constructor(x, y, scale = 1) {
        this.x = x;
        this.y = y;
        this.size = (Math.random() * 3 + 1) * scale;
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 6 + 2) * scale;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.003;
        if (this.alpha < 0) this.alpha = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles(scale = 1) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(centerX, centerY, scale));
    }
}

let frameCount = 0;

function animate() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scale = isMobile() ? 0.5 : 1;

    const logoSize = 150 * scale;

    if (!explode) {
        if (logoAlpha < 1) {
            logoAlpha += 0.007;
        }

        ctx.globalAlpha = logoAlpha;
        ctx.drawImage(
            logo,
            canvas.width / 2 - logoSize / 2,
            canvas.height / 2 - logoSize / 2,
            logoSize,
            logoSize
        );
        ctx.globalAlpha = 1;

        frameCount++;

        if (frameCount > 120) {
            explode = true;
        }
    } else {
        if (logoAlpha > 0) {
            logoAlpha -= 0.05;
            createParticles(scale);
        } else {
            logoAlpha = 0;
            if (!stopCreatingParticles) {
                stopCreatingParticles = true;
                showText = true;
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw();

            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
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
        ctx.font = `bold ${64 * scale}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('მე ვარ საქართველო', canvas.width / 2, canvas.height / 2 + 64 * 0.4 * scale);
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









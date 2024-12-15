const canvas = document.querySelector("#canvas1");

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];

let hue = 0;
 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
})

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', (event) => {
    [mouse.x, mouse.y] = [event.x, event.y];
    // drawCircle();
    particleInit(100);
})

canvas.addEventListener('mousemove', (event) => {
    [mouse.x, mouse.y] = [event.x, event.y];
    particleInit(10);
    // drawCircle();
})

class Particle {
    constructor() {
        [this.x, this.y] = [getRandomInt(0, canvas.width), getRandomInt(0, canvas.height)]
        [this.x, this.y] = [mouse.x, mouse.y]
        this.size = getRandomInt(3, 15)
        this.speedX = getRandomInt(-300, 300) * 0.01;
        this.speedY = getRandomInt(-300, 300) * 0.01; 
        this.color = `hsl(${(hue + getRandomInt(-10, 10)) % 360}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function particleInit(n) {
    for (let i = 0; i < n; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    hue += 0.5;
    particlesArray.forEach((item, index) => {
        item.update();
        item.draw();
        if (item.size < 0.5) {
            particlesArray.splice(index, 1);
            index--;
        }
    })
}

function animate() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.1)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles();
    requestAnimationFrame(animate);
}
animate();
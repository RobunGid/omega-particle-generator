let pathVisibility = document.querySelector('#clear-checkbox').checked;

const settingsForm = document.querySelector('#settings-form');

settingsForm.addEventListener('input', (event) => {
    pathVisibility = document.querySelector('#clear-checkbox').checked
})

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
    x: 0,
    y: 0,
}

canvas.addEventListener('click', (event) => {
    const xOffset = canvas.getBoundingClientRect().x;
    const yOffset = canvas.getBoundingClientRect().y;
    mouse.x = event.clientX - xOffset;
    mouse.y = event.clientY - yOffset;
    particleInit(1);
})

canvas.addEventListener('mousemove', (event) => {
    const xOffset = canvas.getBoundingClientRect().x;
    const yOffset = canvas.getBoundingClientRect().y;

    const scaleX = canvas.width / canvas.getBoundingClientRect().width;
    const scaleY = canvas.height / canvas.getBoundingClientRect().height;

    mouse.x = (event.clientX - xOffset) * scaleX;
    mouse.y = (event.clientY - yOffset) * scaleY;
    particleInit(1);
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

function particleInit(count) {
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    hue += 0.5;
    particlesArray.forEach((item, index) => {
        item.update();
        item.draw();
        particlesArray.forEach((item2, index2) => {
            const dx = item.x - item2.x;
            const dy = item.y - item2.y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = item.color;
                ctx.lineWidth = item2.size / 10;
                ctx.moveTo(item.x, item.y);
                ctx.lineTo(item2.x, item2.y);
                ctx.stroke();
                ctx.closePath();
            }
            }
        )


    if (item.size < 0.5) {
        particlesArray.splice(index, 1);
        index--;
    }
    }
)
}

function animate() {
    if (pathVisibility) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }
    handleParticles();
    requestAnimationFrame(animate);
}
animate();
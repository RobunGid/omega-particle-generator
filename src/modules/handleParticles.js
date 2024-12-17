import { particlesArray, ctx } from "./constants.js";

export function handleParticles() {
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
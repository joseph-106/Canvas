const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const frogImg = new Image();
frogImg.src = "images/frog.png";
const frog = {
    x: 0,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
    },
};
class Rock {
    x;
    y;
    width;
    height;
    constructor(height) {
        this.x = canvas.width - 100;
        this.y = 250 - height;
        this.width = 50;
        this.height = height;
    }
    draw() {
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
const rocks = [];
let timer = 0;
let 점프timer = 0;
let 점프중 = false;
let animation;
function 프레임마다실행() {
    animation = requestAnimationFrame(프레임마다실행);
    timer++;
    document.getElementById("score").innerHTML = `점수: ${Math.floor(timer / 10)}`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 50;
    ctx.fillStyle = "#baa073";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#c7efff";
    ctx.fillRect(0, 0, canvas.width, 250);
    if (timer % 120 === 0) {
        const randomHeight = (Math.floor(Math.random() * 4) + 4) * 10;
        const rock = new Rock(randomHeight);
        rocks.push(rock);
        rock.draw();
    }
    rocks.forEach((e) => {
        e.x -= 3;
        e.draw();
        if (e.x < -50) {
            rocks.splice(0, 1);
        }
        충돌체크(frog, e);
    });
    if (점프중 === true) {
        frog.y -= 4;
        점프timer++;
    }
    else {
        if (frog.y < 200) {
            frog.y += 4;
        }
    }
    if (점프timer === 40) {
        점프중 = false;
        점프timer = 0;
    }
    frog.draw();
}
프레임마다실행();
function 충돌체크(frog, rock) {
    if (frog.x + frog.width - rock.x > 0 && frog.y + frog.height - rock.y > 0) {
        cancelAnimationFrame(animation);
        alert(`점수: ${Math.floor(timer / 10)} 🐸`);
        window.location.reload();
    }
}
document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        if (frog.y === 200) {
            점프중 = true;
        }
    }
});
document.addEventListener("click", function () {
    if (frog.y === 200) {
        점프중 = true;
    }
});

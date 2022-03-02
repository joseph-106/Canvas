// 그림 그리기 최소한의 코드
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = "green"; // 유닛 색상
// ctx.fillRect(10, 10, 100, 100); // 왼쪽 위 (10, 10)에 100 * 100 사이즈 유닛

// 유닛 속성을 객체로 미리 정리해두면 편리함
const rabbit = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

rabbit.draw();

// 비슷한 종류의 객체들이 필요한 경우, 클래스로 만들자
class Rock {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const rock = new Rock();
rock.draw();

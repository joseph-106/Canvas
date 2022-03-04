// 그림 그리기 최소한의 코드
const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = "green"; // 유닛 색상
// ctx.fillRect(10, 10, 100, 100); // 왼쪽 위 (10, 10)에 100 * 100 사이즈 유닛

// 유닛 속성을 객체로 미리 정리해두면 편리함
const frog = {
  x: 200,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

// 비슷한 종류의 객체들이 필요한 경우, 클래스로 만들자
class Rock {
  constructor() {
    this.x = canvas.width - 100;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const rocks = []; // 비슷한 객체들을 배열로 관리
let timer = 0; // 프레임 체크를 위한 타이머

// 프레임마다 코드 실행하기
function 프레임마다실행() {
  requestAnimationFrame(프레임마다실행);
  timer++;

  // 실행할 내용
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 프레임마다 캔버스 비우기
  if (timer % 120 === 0) {
    // 일정 프레임마다 새로운 장애물 생성
    const rock = new Rock();
    rocks.push(rock);
    rock.draw();
  }
  rocks.forEach((e) => {
    e.x -= 3;
    e.draw();
    // 필요없어진 장애물 제거
    if (e.x < -50) {
      rocks.splice(0, 1);
    }
  });
  frog.draw();
}

프레임마다실행();

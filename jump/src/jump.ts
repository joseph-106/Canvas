// 그림 그리기 최소한의 코드 (TypeScript 사용시 <HTMLCanvasElement> 추가)
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// ctx.fillStyle = "green"; // 유닛 색상
// ctx.fillRect(10, 10, 100, 100); // 왼쪽 위 (10, 10)에 100 * 100 사이즈 유닛

// 개구리 사진
const frogImg = new Image();
frogImg.src = "images/frog.png";

// 유닛 속성을 객체로 미리 정리해두면 편리함
const frog = {
  x: 0,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    // ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(frogImg, this.x, this.y, this.width, this.height);
  },
};

// 비슷한 종류의 객체들이 필요한 경우, 클래스로 만들자
class Rock {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(height: number) {
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

const rocks = []; // 비슷한 객체들을 배열로 관리
let timer = 0; // 전체 프레임 체크를 위한 타이머
let 점프timer = 0; // 점프 프레임 체크를 위한 타이머
let 점프중 = false; // 점프 상태
let animation: number;

// 프레임마다 코드 실행하기
function 프레임마다실행() {
  animation = requestAnimationFrame(프레임마다실행);
  timer++;
  document.getElementById("score").innerHTML = `점수: ${Math.floor(
    timer / 10
  )}`; // 점수 표시

  // 실행할 내용
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 프레임마다 캔버스 비우기
  // 캔버스 크기 반응형으로
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 50;
  // 계속 위에 덧칠하는 구조
  ctx.fillStyle = "#baa073";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#c7efff";
  ctx.fillRect(0, 0, canvas.width, 250);
  if (timer % 120 === 0) {
    // 일정 프레임마다 새로운 장애물 생성
    const randomHeight = (Math.floor(Math.random() * 4) + 4) * 10;
    const rock = new Rock(randomHeight); // 장애물 높이 40, 50, 60, 70 중 랜덤
    rocks.push(rock);
    rock.draw();
  }
  rocks.forEach((e) => {
    e.x -= 3; // 장애물 속도
    e.draw();

    // 필요없어진 장애물 제거
    if (e.x < -50) {
      rocks.splice(0, 1);
    }

    // 충돌 체크
    충돌체크(frog, e);
  });
  // 점프!
  if (점프중 === true) {
    frog.y -= 4;
    점프timer++;
  } else {
    // 최소 높이
    if (frog.y < 200) {
      frog.y += 4;
    }
  } // 최대 점프 시간 = 최대 높이
  if (점프timer === 40) {
    점프중 = false;
    점프timer = 0;
  }
  frog.draw();
}

프레임마다실행();

// 객체 타입
type objType = { x: number; y: number; width: number; height: number };

// 충돌 체크 함수
function 충돌체크(frog: objType, rock: objType): void {
  if (frog.x + frog.width - rock.x > 0 && frog.y + frog.height - rock.y > 0) {
    cancelAnimationFrame(animation); // 애니메이션 종료
    alert(`점수: ${Math.floor(timer / 10)} 🐸`);
    window.location.reload();
  }
}

// 특정 키 입력 받으면 함수 실행
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    // 중복 점프 방지
    if (frog.y === 200) {
      점프중 = true;
    }
  }
});

// 좌클릭시 점프
document.addEventListener("click", function () {
  // 중복 점프 방지
  if (frog.y === 200) {
    점프중 = true;
  }
});

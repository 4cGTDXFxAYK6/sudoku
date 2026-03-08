const grid = document.getElementById("sudoku-grid");
let selectedCell = null;

// タイマー関連
let timerInterval = null;
let startTime = null;
let timerStarted = false;

function startTimer() {
  if (timerStarted) return;
  timerStarted = true;
  startTime = Date.now();

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerStarted = false;
  document.getElementById("timer").textContent = "00:00";
}

// グリッド生成
function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "cell";
    input.readOnly = true;
    input.dataset.index = i;

    const row = Math.floor(i / 9);
    const col = i % 9;

    if (row % 3 === 0) input.style.borderTop = "3px solid #000";
    if (col % 3 === 0) input.style.borderLeft = "3px solid #000";
    if (row === 8) input.style.borderBottom = "3px solid #000";
    if (col === 8) input.style.borderRight = "3px solid #000";

    input.addEventListener("click", () => {
      document.querySelectorAll(".cell").forEach(c => c.classList.remove("selected"));
      input.classList.add("selected");
      selectedCell = input;
    });

    grid.appendChild(input);
  }
}

// 問題生成
function generatePuzzle() {
  const cells = document.querySelectorAll(".cell");
  const puzzle =
    "530070000" +
    "600195000" +
    "098000060" +
    "800060003" +
    "400803001" +
    "700020006" +
    "060000280" +
    "000419005" +
    "000080079";

  puzzle.split("").forEach((n, i) => {
    const cell = cells[i];
    if (n !== "0") {
      cell.value = n;
      cell.dataset.fixed = "1";
      cell.style.background = "#eee";
    } else {
      cell.value = "";
      cell.dataset.fixed = "0";
    }
  });
}

// 数字ボタン入力
document.querySelectorAll("#num-pad button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!selectedCell) return;              // ← セルが選ばれていない
    if (selectedCell.dataset.fixed === "1") return; // ← 固定マスは変更不可

    selectedCell.value = btn.dataset.num;

    startTimer(); // ← ここで確実にタイマー開始
  });
});

// チェック機能
function checkSudoku() {
  const cells = [...document.querySelectorAll(".cell")].map(c => c.value || "0");
  const rows = [...Array(9)].map((_, r) => cells.slice(r * 9, r * 9 + 9));

  const valid = rows.every(row => {
    const nums = row.filter(n => n !== "0");
    return new Set(nums).size === nums.length;
  });

  alert(valid ? "OK!" : "間違いがあります");
}

document.getElementById("new-game").onclick = () => {
  resetTimer();
  generatePuzzle();
};

document.getElementById("check").onclick = checkSudoku;

createGrid();
generatePuzzle();

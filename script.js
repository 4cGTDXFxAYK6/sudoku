const grid = document.getElementById("sudoku-grid");
let selectedCell = null;

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "cell";
    input.readOnly = true; // ← キーボードを出さない
    input.dataset.index = i;

    input.addEventListener("click", () => {
      document.querySelectorAll(".cell").forEach(c => c.classList.remove("selected"));
      input.classList.add("selected");
      selectedCell = input;
    });

    grid.appendChild(input);
  }
}

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

document.querySelectorAll("#num-pad button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!selectedCell) return;
    if (selectedCell.dataset.fixed === "1") return; // 固定マスは変更不可

    selectedCell.value = btn.dataset.num;
  });
});

function checkSudoku() {
  const cells = [...document.querySelectorAll(".cell")].map(c => c.value || "0");
  const rows = [...Array(9)].map((_, r) => cells.slice(r * 9, r * 9 + 9));

  const valid = rows.every(row => {
    const nums = row.filter(n => n !== "0");
    return new Set(nums).size === nums.length;
  });

  alert(valid ? "OK!" : "間違いがあります");
}

document.getElementById("new-game").onclick = generatePuzzle;
document.getElementById("check").onclick = checkSudoku;

createGrid();
generatePuzzle();

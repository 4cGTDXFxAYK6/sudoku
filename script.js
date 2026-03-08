const grid = document.getElementById("sudoku-grid");

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.className = "cell";
    grid.appendChild(input);
  }
}

function generatePuzzle() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(c => c.value = "");

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
    if (n !== "0") {
      cells[i].value = n;
      cells[i].readOnly = true;
      cells[i].style.background = "#eee";
    }
  });
}

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

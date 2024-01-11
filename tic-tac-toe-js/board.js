class Board {
  constructor() {
    this.board = Array.from({ length: 3 }, () => Array(3).fill("_"));
  }

  print() {
    console.log(this.board[0]);
    console.log(this.board[1]);
    console.log(this.board[2]);
  }

  isValidMove(pos) {
    if (pos[0] >= 0 && pos[0] <= 2 && pos[1] >= 0 && pos[1] <= 2) {
      return true;
    } else {
      return false;
    }
  }

  empty(pos) {
    if (this.board[pos[0]][pos[1]] === "_") {
      return true;
    } else {
      return false;
    }
  }

  placeMark(pos, mark) {
    if (this.isValidMove(pos)) {
      this.board[pos[0]][pos[1]] = mark;
      return true;
    } else {
      return false;
    }
  }
}

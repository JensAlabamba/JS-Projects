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

  wonRow(mark) {
    for (let i = 0; i < this.board.length; i++) {
      const element = this.board[i];
      if (element.every((ele) => ele === mark)) {
        return true;
      }
    }
    return false;
  }

  wonCol(mark) {
    for (let i = 0; i < this.board.length; i++) {
      const check = [];
      for (let j = 0; j < this.board.length; j++) {
        if (this.board[j][i] === mark) {
          check.push(mark);
        }
      }
      if (check.length === 3) {
        return true;
      }
    }
    return false;
  }
}

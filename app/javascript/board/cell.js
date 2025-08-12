const WIDTH = 10
const HEIGHT = 10
const ALIVE_COLOR = "#00FFFF"
const DEAD_COLOR = "#6699CC"

export default class Cell {
  constructor(boardX, boardY, alive = false) {
    this.boardX = boardX
    this.boardY = boardY
    this.alive = alive
  }

  draw(canvasContext) {
    canvasContext.fillStyle = this.alive ? ALIVE_COLOR : DEAD_COLOR
    canvasContext.fillRect(
      this.boardX * WIDTH,
      this.boardY * HEIGHT,
      WIDTH,
      HEIGHT
    )
  }

  checkNeighbors(board) {
    const neighbors = this.#getNeighbors(board)
    const aliveNeighbors = neighbors.filter((cell) => cell.alive).length

    if (this.alive) {
      if (aliveNeighbors === 2 || aliveNeighbors === 3) {
        this.nextGenAlive = true
      } else {
        this.nextGenAlive = false
      }
    } else {
      if (aliveNeighbors === 3) {
        this.nextGenAlive = true
      }
    }
  }

  nextGeneration() {
    this.alive = this.nextGenAlive 
  }

  toJSON() {
    return {
      board_x: this.boardX,
      board_y: this.boardY,
      alive: this.alive,
    }
  }

  #getNeighbors(board) {
    const neighbors = []

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) {
          continue
        }

        const neighborX = this.boardX + x
        const neighborY = this.boardY + y

        if (
          neighborX >= 0 &&
          neighborX < board.length &&
          neighborY >= 0 &&
          neighborY < board[0].length
        ) {
          neighbors.push(board[neighborX][neighborY])
        }
      }
    }

    return neighbors
  }
}

export { WIDTH, HEIGHT }

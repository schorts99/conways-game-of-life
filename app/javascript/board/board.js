const WIDTH = 72
const HEIGHT = 48

import Cell from "./cell"

export default class Board {
  initializeGrid() {
    this.grid = []

    for (let x = 0; x < WIDTH; x++) {
      this.grid[x] = []

      for (let y = 0; y < HEIGHT; y++) {
        this.grid[x][y] = new Cell(x, y)
      }
    }
  }

  draw(canvasContext) {
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        this.grid[x][y].draw(canvasContext)
      }
    }
  }

  checkNeighbors() {
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        this.grid[x][y].checkNeighbors(this.grid)
      }
    }
  }

  nextGeneration() {
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        this.grid[x][y].nextGeneration(this.grid)
      }
    }
  }

  toggleCellAlive(x, y, alive) {
    this.grid[x][y].alive = alive
  }

  toJSON() {
    return this.grid.map((row) => row.map(cell => cell.toJSON()))
  }

  fillWithJSON(json) {
    this.grid = []
    const width = json.length
    const height = json[0].length

    for (let x = 0; x < width; x++) {
      this.grid[x] = []

      for (let y = 0; y < height; y++) {
        let cellJSON = json[x][y]
        this.grid[x][y] = Cell.fromJSON(cellJSON)
      }
    }
  }
}

export { WIDTH, HEIGHT }

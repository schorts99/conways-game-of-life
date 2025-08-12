import { Controller } from "@hotwired/stimulus"

import Board, { WIDTH as BOARD_WIDTH, HEIGHT as BOARD_HEIGHT } from "../board/board"
import { WIDTH as CELL_WIDTH, HEIGHT as CELL_HEIGHT } from "../board/cell"
import createBoardChannel from "../channels/board_channel"

const MOUSE_BUTTON_PRIMARY = 1

// Connects to data-controller="board"
export default class extends Controller {
  static values = { board: Object }
  static targets = ["canvas", "startButton", "clearButton", "nextButton"]

  connect() {
    this.canvasContext = this.canvasTarget.getContext("2d")
    this.running = false
    this.board = new Board()

    if (this.boardValue.grid.length) {
      this.board.fillWithJSON(this.boardValue.grid)
    } else {
      this.board.initializeGrid()
    }

    this.boardChannel = createBoardChannel(window.location.href.split("/").pop())

    this.#addMouseHandlers()
    this.#draw()
  }

  disconnect() {
    this.#removeMouseHandlers()
  }

  next() {
    this.board.checkNeighbors()
    this.board.nextGeneration()
    this.boardChannel.send({ action: "receive", grid: this.board.toJSON() })
  }

  start() {
    this.running = !this.running
    this.startButtonTarget.textContent = this.running ? "Stop" : "Start"
    this.clearButtonTarget.disabled = this.running
    this.nextButtonTarget.disabled =this.running
  }

  clear() {
    this.board = new Board(this.canvasContext)
  }

  #draw() {
    setInterval(this.#animateBoard, 100)
  }

  #animateBoard = () => {
    this.canvasContext.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT)

    if (this.running) {
      this.next()
    }

    this.board.draw(this.canvasContext)
  }

  #addMouseHandlers() {
    this.mouseClicked = false

    this.canvasTarget.addEventListener("contextmenu", (event) => event.preventDefault())
    this.canvasTarget.addEventListener("mousedown", this.#mouseDown.bind(this))
    this.canvasTarget.addEventListener("mouseup", this.#mouseUp.bind(this))
    this.canvasTarget.addEventListener("mousemove", this.#mouseMove.bind(this))
  }

  #removeMouseHandlers() {
    this.mouseClicked = false

    this.canvasTarget.removeEventListener("contextmenu", (event) => event.preventDefault())
    this.canvasTarget.removeEventListener("mousedown", this.#mouseDown.bind(this))
    this.canvasTarget.removeEventListener("mouseup", this.#mouseUp.bind(this))
    this.canvasTarget.removeEventListener("mousemove", this.#mouseMove.bind(this))
  }

  #mouseDown(event) {
    this.mouseClicked = true

    this.#handleClick(event);
  }

  #mouseUp(event) {
    this.mouseClicked = false

    this.#handleClick(event);
  }

  #mouseMove(event) {
    if (this.mouseClicked) {
      this.#handleClick(event);
    }
  }

  #handleClick(event) {
    const x = Math.floor(event.offsetX / CELL_WIDTH)
    const y = Math.floor(event.offsetY / CELL_HEIGHT)

    this.board.toggleCellAlive(x, y, event.buttons === MOUSE_BUTTON_PRIMARY)
  }
}

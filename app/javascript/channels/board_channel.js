import consumer from "channels/consumer"

export default function createBoardChannel(boardId) {
  return consumer.subscriptions.create({ channel: "BoardChannel", board_id: boardId }, {
    connected() {
      // Called when the subscription is ready for use on the server
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
    }
  })
}

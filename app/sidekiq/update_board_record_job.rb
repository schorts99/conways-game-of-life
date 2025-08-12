class UpdateBoardRecordJob
  include Sidekiq::Job

  def perform(board_id, grid)
    board_patcher = ::Boards::Patch::BoardPatcher.new
    
    board_patcher.patch(board_id, grid)
  end
end

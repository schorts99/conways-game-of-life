module Boards
  module Find
    class BoardFinder
      SETS = [
        Sidekiq::Queue.new,
        Sidekiq::ScheduledSet.new
      ]

      def find(id)
        SETS.each do |set|
          set.each do |job|
            if job.klass == "UpdateBoardRecordJob" && job.args[0] == id
              return Board.new(id:, grid: job.args[1])
            end
          end
        end

        board = Board.find_by(id:)

        raise ::Boards::BoardNotFound, "id: #{id}" unless board

        return board
      end
    end
  end
end

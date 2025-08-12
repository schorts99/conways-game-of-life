class BoardChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board_#{params[:board_id]}"

    reject unless params[:board_id]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    remove_existing_update_jobs(params[:board_id])
    UpdateBoardRecordJob.perform_in(5.seconds, params[:board_id], data["grid"])
  end

  private

  def remove_existing_update_jobs(board_id)
    sets = [
      Sidekiq::Queue.new,
      Sidekiq::ScheduledSet.new,
      Sidekiq::RetrySet.new
    ]

    sets.each do |set|
      set.each do |job|
        if job.klass == "UpdateBoardRecordJob" && job.args[0] == board_id
          job.delete
        end
      end
    end
  end
end

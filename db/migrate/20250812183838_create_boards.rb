class CreateBoards < ActiveRecord::Migration[7.2]
  def change
    create_table :boards do |t|
      t.json :grid
      t.timestamps
    end
  end
end

class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :word, index:true, unique:true, null:false
      t.string :audio_url
      t.string :definition
      t.string :part, index:true
      t.timestamps null: false
    end
  end
end

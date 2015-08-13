class DropSenderidToMessages < ActiveRecord::Migration
  def change
  	remove_column :messages, :senderid
  	remove_column :messages, :receiverid
  	add_column :messages, :sender_id, :integer
  	add_column :messages, :receiver_id, :integer
  end
end

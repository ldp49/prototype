class CreateMessages < ActiveRecord::Migration
  def change
    drop_table :messages
    create_table :messages do |t|
      t.integer :authnum
      t.string :firstnamepatient
      t.string :lastnamepatient
      t.date :dob
      t.integer :ethnicity
      t.integer :gender
      t.string :icd10
      t.string :ndc11
      t.string :evidence
      t.integer :nntval
      t.date :servicedate
      t.integer :servicepriority
      t.integer :servicesite
      t.string :firstnameordering
      t.string :lastnameordering
      t.integer :npiordering
      t.string :phoneorering
      t.string :emailordering
      t.string :mailordering
      t.string :clientid
      t.string :planid
      t.string :planphone
      t.string :planfax
      t.string :memberid
      t.string :patientid
      t.integer :authorization
      t.integer :preauth
      t.integer :seqid
      t.integer :senderid
      t.integer :receiverid

      t.timestamps null: false
    end
  end
end

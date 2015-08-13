json.array!(@messages) do |message|
  json.extract! message, :id, :authnum, :firstnamepatient, :lastnamepatient, :dob, :ethnicity, :gender, :icd10, :ndc11, :evidence, :nntval, :servicedate, :servicepriority, :servicesite, :firstnameordering, :lastnameordering, :npiordering, :phoneorering, :emailordering, :mailordering, :clientid, :planid, :planphone, :planfax, :memberid, :patientid, :authorization, :preauth, :seqid, :senderid, :receiverid
  json.url message_url(message, format: :json)
end

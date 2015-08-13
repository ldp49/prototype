json.array!(@insurers) do |insurer|
  json.extract! insurer, :id, :name
  json.url insurer_url(insurer, format: :json)
end

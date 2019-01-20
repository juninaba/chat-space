if @new_message.present?
  json.array! @new_message do |message|
    json.content message.content
    json.user_name message.user.name
    json.image message.image.url
    json.created_at message.created_at.strftime("%Y/%m/%d %T")
    json.id message.id
  end
end

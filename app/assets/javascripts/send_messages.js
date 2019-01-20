$(function(){
  function buildHTML(message){
    var img = (message.image)? `<image src="${message.image}">`:"";
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    ${ img }
                  </div>
                </div>`
    return html;
  }

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'post',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
      scroll();
    })
    .fail(function(){
      alert('入力してください');
    })
  })

  setInterval(update, 5000);

   function update(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      if($('.messages')[0]){
        var message_id = $('.message').last().data('id') || 0;
      }
      $.ajax({
       url: location.href,
       type: 'GET',
       data: {
        message: { id: message_id }
       },
       dataType: 'json'
      })
      .always(function(messages){
        if (messages.length !== 0){
          messages.forEach(function(message){
            var html = buildHTML(message);
            $('.messages').append(html)
            scroll();
          })
        }
      })
    } else {
      clearInterval();
    }
  }
})

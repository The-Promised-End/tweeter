$(document).ready(function(){
  var maxLength = 140;
  $('.new-tweet textarea').keyup(function() {
  var length = $(this).val().length;
  var length = maxLength-length;
  $('.counter').text(length);
  if(length < 0){
    $('.counter').css('color', 'red')
  } else {
    $('.counter').css('color', 'black')
  };
});
})
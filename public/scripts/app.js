function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement (tweet) {

  var safeArticle = `<article class="all-tweets">
                  <header class="headerbox">
                     <img src=${escape(tweet.user.avatars.small)} alt="avatar" />
                      <div class="user-info">
                      <h1>${escape(tweet.user.name)}</h1>
                      <h2>${escape(tweet.user.handle)}</h2>
                      </div>
                  </header>
                  <div class="tweet-body">
                  <p class="text">
                    ${escape(tweet.content.text)}
                  </p> </div>
              <footer class= "date">
                  <div class="icons">
                  <i class="fa fa-flag" aria-hidden="true"></i>
                  <i class="fa fa-retweet" aria-hidden="true"></i>
                  <i class="fa fa-heart" aria-hidden="true"></i>
                  </div>
               <p>${escape(tweet.created_at)}
               </p>
             </footer>
             </article>`;
    return safeArticle;
}

function renderTweets(tweetData) {
   $('#tweet-list').html(tweetData.map(createTweetElement).reverse());
  }

$(document).ready(function(){

  function loadTweets() {

    $.get('/tweets')

    .success(function(data) {
      renderTweets(data);
    })

    .error(function(data) {
      alert(data.error)
    })
  }

  loadTweets();

  const maxLength = 140;

  function isValid($form) {

    const $textArea = $form.find('textarea');
    const inputLength = $textArea.val().length;

    if (inputLength === 0) {
      alert('Cannot be empty');
      return false;
    } else if (inputLength > maxLength) {
      alert('Over max size');
      return false;
    }

    return true;

  }

  $('#create-tweet').submit(function(e){

    e.preventDefault();

    const $form = $(this);

    if (isValid($form)) {

    $.post('/tweets', $form.serialize())
      .success(function() {
        loadTweets();
      })
      .error(function(data) {
        alert(data.error);
      });

    }

  });

  $(".new-tweet").hide();

  $(".compose").click(function(e) {

    $(".new-tweet").slideToggle();

    $("textarea").focus();
  });

});



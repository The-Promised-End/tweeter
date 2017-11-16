/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  var tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
// },
// {
//      "user": {
//       "name": "sunnyMan",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "/images/smikle.png"
//       },
//       "handle": "@Mr.sun"
//     },
//     "content": {
//       "text": "I'm sunnyMan"
//     },
//     "created_at": 1461116238888
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

/*
recall that you can use jQuery to construct new elements using the $ function,
like so: var $tweet = $("<article>").addClass("tweet");
You'll want to append additional DOM elements also created via jQuery to the parent,
effectively building a DOM structure
This function shouldn't insert the created DOM structure to the page.
It should instead just return the $tweet to the caller*/


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement (tweet) {      //tweet object

  //console.log(tweet);
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
    return safeArticle;  //return 'structure of html'
}


  function renderTweets(tweetData) {
   $('#tweet-list').html(tweetData.map(createTweetElement).reverse());   //
  }
$(()=>{
  // renderTweets(tweetData);
});

$(document).ready(function(){

  function loadTweets() {

    $.get('/tweets')

    .success(function(data) {
      renderTweets(data);
    })

    .error(function(data) {
      alert(data.error)
    })
    // $.ajax({

    // method: 'GET',

    // url: '/tweets',

    // success: function(data) {

    //   renderTweets(data);

    // },

    // error: function(data){

    //   console.log("there was an error calling the tweets");

    // },

    // });
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
            $(".new-tweet").toggle();
            $("textarea").focus();
        });

});
    // var newTweet = {

    //   "user": {

    //     "name": "Rohit Dhand",

    //     "avatars": {

    //       "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",

    //       "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",

    //       "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"

    //     },

    //     "handle": "@rohit_dhand"

    //   },

    //   "content": {

    //     "text": $('#tweet-text').val()

    //   },

    //   "created_at": 1461113796368

    // };

    // $.ajax({

    //   method:'POST',

    //   url: '/tweets',

    //   data: $form.serialize(),

    //   success: function(result){

    //     tweetData.push(newTweet);

    //     renderTweets(tweetData);

    //   },

    //   error: function(error){

    //   }

    // }); //end of the ajax call





//   $('').on('click',function(e){

//     e.preventDefault();

//     var newTweet = {

//       "user": {

//         "name": "Rohit Dhand",

//         "avatars": {

//           "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",

//           "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",

//           "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"

//         },

//         "handle": "@rohit_dhand"

//       },

//       "content": {

//         "text": $('#tweet-text').val()

//       },

//       "created_at": 1461113796368

//     };
// /*
//     alert("this works");
// */
//     tweetData.push(newTweet);

//     renderTweets(tweetData);

//     // $.ajax({

//     //   method:'POST',

//     //   url: '/tweets',

//     //   da

//     //   success: function(result){

//     //     tweetData.push(newTweet);

//     //     renderTweet(tweetData);

//     //   },

//     //   error: function(error){

//     //   }

//     // }); //end of the ajax call

//   });




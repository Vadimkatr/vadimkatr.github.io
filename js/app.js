function init() {
   // Client ID and API key from the Developer Console
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
  var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
  var CLIENT_ID = "693280105097-cn4v71cefbt45ukuuj8jkfond5pn94up.apps.googleusercontent.com";
  //HN0F8piNp_netYB2Yg08aIGa
  
  var API_KEY = "AIzaSyCoOzrCXAF-vUrznvIKVpuRKT2WoylVbk8";
  gapi.load('client', {
    callback: function() {
      // Handle gapi.client initialization.
      initGapiClient();
    },
    onerror: function() {
      // Handle loading error.
      alert('gapi.client failed to load!');
    },
    timeout: 5000, // 5 seconds.
    ontimeout: function() {
      // Handle timeout.
      alert('gapi.client could not load in a timely manner!');
    }
  });
  function initGapiClient() {
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,

    }).then(function () {
    });
  }
}

function find() {
  let textReq = document.getElementById('search').value;
  if (textReq === '')
    return;

  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    q: textReq,
    maxResult: 3
  });
  request.execute(function (response) {
    console.log(response);
    console.log("1");
  })
  console.log('22222');


 
  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  // function initClient() {
  //   gapi.client.init({
  //     apiKey: API_KEY,
  //     discoveryDocs: DISCOVERY_DOCS,
  //     clientId: CLIENT_ID,
      
  //   }).then(function () {
     
  //   });
  // }

  function search(req) {
    var request = gapi.client.youtube.search.list({
      req: req,
      part: 'snippet'
    });
  
    request.execute(function(response) {
      var str = JSON.stringify(response.result);
     appendPre(str);
    });
  }
  /**
   * Append text to a pre element in the body, adding the given message
   * to a text node in that element. Used to display info from API response.
   *
   * @param {string} message Text to be placed in pre element.
   */



  function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }

  /**
   * Print files.
   */
  function getChannel() {
    gapi.client.youtube.channels.list({
      'part': 'snippet,contentDetails,statistics',
      'forUsername': 'GoogleDevelopers'
    }).then(function (response) {
      var channel = response.result.items[0];
      appendPre('This channel\'s ID is ' + channel.id + '. ' +
        'Its title is \'' + channel.snippet.title + ', ' +
        'and it has ' + channel.statistics.viewCount + ' views.');
    });
  }

}

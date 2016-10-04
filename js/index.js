// Author: Brandon Martinez
// Description: Displays a given array of twitch users
// and allows the user to filter between 
// offline/online or all users

/**********************************************************
 * Function: getChannel
 * Purpose: Use Twitch API to get user's profile and stream
 *    information
 ***********************************************************/
function getChannel() {
      //Array of usernames
    var usersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  
  usersArr.forEach(function(user) {

    var name, link, logo, stream, statusClass;
    var channelURL = "https://api.twitch.tv/kraken/channels/" + user;
    var streamURL = "https://api.twitch.tv/kraken/streams/" + user;

    //Ajax call for profile information
    $.ajax({
      type: 'GET',
      url: channelURL,
      headers: {
        'Client-ID': 'hq02ydtt1zds5y8i9kqu0j82l9k93o4'
      },

    }).done(function(userData) {
      name = userData.display_name;
      link = userData.url;
      logo = userData.logo;

      $.ajax({
        type: 'GET',
        url: streamURL,
        headers: {
          'Client-ID': 'hq02ydtt1zds5y8i9kqu0j82l9k93o4'
        },
      }).done(function(streamData) {
        // Check whether or not the user is offline/online
        var currentStream = "";
        if (streamData.stream === null) {
          stream = "Offline";
          statusClass = "offline";

        } else if (streamData.stream === undefined) {
          stream = "Account Closed"
          statusClass = "offline";
        } else {
          currentStream = streamData.stream.game;
          stream = "Streaming: " + streamData.stream.game;
          statusClass = "online";
        }

        // Append the data
        $("#users").append("<div class='channel-info " + statusClass + "'>" + "<a target='_blank' href='" + link + "'>" +
          "<div class='profile-img-ctn'><img class='profile-pic' src='" + logo + "'/>" + "</a></div>" +
          "<div class='channel-name'><a href='" + link + "' target=_blank>" + name + "</a></div>" +
          "<div class='stream-name'>" + stream + "</div>" +
          "</div>");
      });
    });
  });
}

//On Document load, call getChannel
getChannel();

// JQuery function for handling the various filters(all/offline/online)
$('#all').click(function() {
  $('.channel-info').css({
    'display': 'block'
  });
});
$('#online').click(function() {
  $('.offline').css({
    'display': 'none'
  });
  $('.online').css({
    'display': 'block'
  });
});
$('#offline').click(function() {
  $('.online').css({
    'display': 'none'
  });
  $('.offline').css({
    'display': 'block'
  });
});
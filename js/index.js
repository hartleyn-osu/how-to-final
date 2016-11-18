$(document).ready(function(){
  $(".live-links").mouseenter(function(){
     $("").show();  
  });
  
  $(".live-links").mouseleave(function(){
     $("").hide();  
  });
  
  var checkOnline = function(userName, location){
    $.ajax({
       type:"GET",
       url:"https://api.twitch.tv/kraken/streams/" + userName,
       headers:{
        'Client-ID': 'dbdgd4u943y2ppu5n3uzw385c5wq07p'
       },
       success: function(data10){
        var url = "https://www.twitch.tv/"+userName;
        var dropSpot = "#online-pic-"+location;
        if(data10.stream!=null){
          $(dropSpot).prepend("<a href='" + url + "' class='live-links' id=''><img src='https://i.ytimg.com/vi/pwy9NUV2BgM/maxresdefault.jpg' class='live-pic'></a>");
        }
       }
    });
  }  
  
  
  // MY STATUS CALL
  $.ajax({
     type:"GET",
     url:"https://api.twitch.tv/kraken/streams/nick_lenoir",
     headers:{
       'Client-ID': 'dbdgd4u943y2ppu5n3uzw385c5wq07p'
     },
     success: function(data6){  
        if(data6.stream==null){
          $("#myStatus").html("<h3 id='status-check'>I am currently OFFLINE!</h3>");
        }
        else{
          $("#myStatus").html("<h3 id='status-check'>I am currently ONLINE!</h3>");
        }
     }
  });
  // MY STATUS CALL END
  
  // FOLLOW LIST CALL
  $.ajax({
     type:"GET",
     url:"https://api.twitch.tv/kraken/users/nick_lenoir/follows/channels/",
     headers:{
       'Client-ID': 'dbdgd4u943y2ppu5n3uzw385c5wq07p'
     },
     success: function(data5){
       console.log(data5);
       for(var i=0;i<data5.follows.length;i++){
          var displayName = data5.follows[i].channel.display_name;
          var name = data5.follows[i].channel.name;
          var logo = data5.follows[i].channel.logo;
          var status = data5.follows[i].channel.status;
          var chUrl = data5.follows[i].channel.url;
         
          $("#userInfo").prepend("<br><div class='row' id='info-row'><div class='text-center'>" + "<div class='col-md-4'>" + "<img src='" + logo + "' class='pics'>" + "</div>" + "<div class='col-md-4'><a href='" + chUrl + "' id='channel-links'>" + displayName + "</a><div id='online-pic-" + i + "'></div></div>" + "<div class='col-md-4'>" + status + "</div></div></div><hr>");
         
          checkOnline(name, i);
       }
     }
  });
  // FOLLOW LIST CALL END
  
  // TOP GAMES CALL
  $.ajax({
    type:"GET",
    url:"https://api.twitch.tv/kraken/games/top",
    headers:{
      'Client-ID': 'dbdgd4u943y2ppu5n3uzw385c5wq07p'
    },
    success: function(data6){
      console.log(data6);
      for(var i=0;i<data6.top.length;i++){
        var gameTitle = data6.top[i].game.name;
        
        $("#gamesInfo").prepend("<h4><a href='https://twitch.tv/directory/game/"+gameTitle+"' class='top-links'>"+gameTitle+"</h4>");
      }  
    }
  });
  // TOP GAMES CALL END
  
  // FEATURED STREAMS CALL
  $.ajax({
    type:"GET",
    url:"https://api.twitch.tv/kraken/streams/featured",
    headers:{
      'Client-ID': 'dbdgd4u943y2ppu5n3uzw385c5wq07p'
    },
    success: function(data7){
      for(var i=0;i<data7.featured.length;i++){
        var strGame = data7.featured[i].stream.game;
        var strTitle = data7.featured[i].title;
        var strText = data7.featured[i].text;
        var strChannel = data7.featured[i].stream.channel.display_name;
        var strViewers = data7.featured[i].stream.viewers;
        var strPreview = data7.featured[i].stream.preview.medium;
        var strLink = data7.featured[i].stream.channel.url;
        
        $("#stream").prepend("<hr><div class='row'>" + 
                              "<div class='col-md-1'>" +
                              "</div>" +
                              "<div class='col-md-6'>" +
                                "<img src='" + strPreview + "' class='pics'>" +
                              "</div>" +
                              "<div class='col-md-4'>" +
                                "<ul class='text-center'>" +
                                  "<li><h4>" + strTitle + "</h4></li>" +
                                  "<li><a href='" + strLink + "'>" + strChannel + "</a></li>" +
                                  "<li>" + strGame + "</li>" +
                                  "<li>" + strText + "</li>" +
                                  "<li>" + strViewers + " viewers</li>" +
                                "</ul>" +
                              "</div>" +
                              "<div class='col-md-1'>" +
                              "</div></div>");
      }
    }
  });
  // FEATURED STREAMS CALL END
  
  // CREATE POST CALL - INCOMPLETE
  $.ajax({
    type:"POST",
    url:"https://api.twitch.tv/kraken/feed/nick_lenoir/posts",
    data: {
      "content": "This post was created with an AJAX 'post' call"
    }
  });
  // CREATE POST CALL END
  
  // SEARCH CALL - INCOMPLETE
  var searchQuery = "";
  
  $.ajax({
    type:"GET",
    url:"https://api.twitch.tv/kraken/search/streams?q="+searchQuery,
    headers:{
      'Client-ID': 'dbdgd4u943y2ppu5n3uzw385c5wq07p'
    },
    success: function(data8){
      
    }
  });
  // SEARCH CALL END
  
// DOC END  
});
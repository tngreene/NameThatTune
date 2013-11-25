"use strict";

//Game Variables
//Number of player lives, starts at 3
var lives;
var score;
var highscore;

var API_KEY = "AIzaSyCWTuWAhcjt5JU6Mz2WB5epmc--yw6oTGQ";
var curArtist;
var curSong;
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady()
{
	player = new YT.Player('player', 
							{
								height: '390',
								width: '640',
								videoId: 'M7lc1UVf-VE',
								playerVs:
								{
									autoplay:1,
									controls:0,
									enablejsapi:1 //imporant!				
								},
								events: 
								{
									'onReady': onPlayerReady,
									'onStateChange': onPlayerStateChange
								}
							}
						);
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event)
{
	var ranNo = Math.floor(Math.random() * 10);
	console.log(ranNo);
	//load a playlist into it
	event.target.loadPlaylist({list:"PL8EC5F5F8B35525F6",
								listType:"playlist",
								index:ranNo
								});
	curArtist =
	curSong =
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event)
{

}

function stopVideo() {
	player.stopVideo();
}

function checkAnswer()
{
    //If the the target value is equal to the artist in the array
	if(event.target.getAttribute("value") == songs[songIndex].artist)
    {
        //Increase the score
        score += 100;
        if(highscore < score)
        {
            //If the highscore is less, set it to the new
            highscore = score;
        }
        //Increase the song index
        songIndex++;

        //If you are past 4
        if(songIndex > 4)
        {
            //Reset it
            songIndex = 0;
        }

        //Update it
        updateSong();
        updateScore();
    }
    else//otherwise
    {
        //subtract the ifes
        lives--;

        //if you have run out of lives
        if(lives <= 0)
        {
            //REstart the game
            restartGame();
        }
    }
}

//U[date the score
function updateScore()
{
    //Set the innter html of those selectors
    document.querySelector("#playerScore").innerHTML = score;
    document.querySelector("#playerHigh").innerHTML = highscore;
}
	  
function init()
{
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  getArtist();
}

//Goes to the itunes page to find the store
function gotoITunes()
{
	//See this //https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching

	//Parameters for the search
	var term = "daft+punk+human+after+all";//Filled in with the actual song playing
	var country = "US";
	var media = "music";
	var entity = "musicTrack";
	var attribute = "mixTerm";
	var callback = "?";//Callback function for bringing the json back. MUST BE "?"!!!!!!!
	var limit = 1; //Limit of search results to the first possible one
	
	//THIS IS WORKING!!!!
	//var url = "https://itunes.apple.com/search?term=jim+jones&country=ca&callback=?";
	
	//This also works!!!!
    var url = "https://itunes.apple.com/search?"+"term="+term+"&country="+country+"&media="+media+"&entity="+entity+"&callback="+callback+"&limit="+limit;
	
	//Uses get json to find the data from there and calls jsonLoaded
	//$.getJSON(url,{dataType:"jsonp"}).done(function(data){jsonLoaded(data);});
	$.getJSON(url,{dataType:"jsonp"}).done(
												function(data)
												{
													//var itunesLink = data.results[0].trackViewUrl;
													window.open(data.results[0].trackViewUrl, "_blank");
													//jsonLoaded(data);
												}
											);
}
function getArtist()
{
	var genreSelect = document.querySelector("#genre");
	console.log(genreSelect);
	console.log(genreSelect.options);
	var curGenre = genreSelect.options[genreSelect.options.selectedIndex];
	console.log(curGenre);
	switch(curGenre)
	{
	}
}
//Handles the results
function jsonLoaded(obj){
	//For testing the obj returned
	//console.log(obj);
	//console.log(obj.results[0].trackViewUrl);
	//The final link to get to the track view
	var itunesLink = obj.results[0].trackViewUrl;
	window.open(itunesLink, "_blank");
}
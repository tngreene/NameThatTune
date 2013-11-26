"use strict";

//Game Variables
//Number of player lives, starts at 3
var attempts;
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
        attempts--;

        //if you have run out of lives
        if(attempts <= 0)
        {
            //REstart the game
            restartGame();
        }
    }
}

// Update the player's current score and the high score (if necessary)
function updateScore() {
    // Update the text of the #playerScore field
    document.querySelector("#playerScore").innerHTML = score;
	
	// If the player has set a new high score, update #playerHigh
	if( score >= highScore )
	{
		document.querySelector("#playerHigh").innerHTML = highscore;
	}
}

// HIGH SCORE COOKIE CREATION - MAY NOT WORK
// Follows w3schools JS Cookie tutorial: w3schools.com/js/js_cookies.asp
function saveHighScore(cName, value, lifeTime) {
		var expiration = new Date();
		
		expiration.setDate(expireation.getDate() + lifeTime);
		
		var cValue = escape(value) + 
		( (lifeTime == null) ? "" : "; expires = " + expiration.toUTCString() );
		
		document.cookie = cName + "=" + cValue;
		
}

function loadHighScore(cName) {
	var cValue = document.cookie;
	var cStart = cValue.indexOf(" " + cName + "=");
	
	if (cStart == -1) {
		cStart = cValue.indexOf(cName + "=");
	}
	
	if (cStart == -1) {
		cValue = null;
	}
		
	else {
		cStart = cValue.indexOf("=", cStart) + 1;
		var cEnd = cValue.indexOf(";", cStart);
		
		if (cEnd == -1) {
			cEnd = cValue.length;
		}
		
		cValue = unescape(cValue.substring(cStart, cEnd);
	}
	
	return cValue;
}

function checkHighScore() {
	var cookieScore = loadHighScore("weeklyHigh");
	
	if (cookieScore != null && cookieScore != "") { highScore = cookieScore; }
	else { highscore = 0; }
}

function endGame() {
	saveHighScore(weeklyHigh, highScore, 7);
}

function restartGame() {
	init(); // reset all values in code
	updateScore(); // update the displayed values
}
	  
function init()
{
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  getArtist();
  
	attempts = 3;
	score = 0;
	difficulty = "easy";
	// The value of highScore comes from the checkHighScore()
	checkHighScore();
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
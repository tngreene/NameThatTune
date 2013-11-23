"use strict";
//Game Variables
//Number of player lives, starts at 3
var lives;
var score;
var highscore;

//gets values from buttons
var difficulty;

//has the play button been pressed or not
//True means play, false means paused
var togglePlayButton;

//An array of songs
var songs;
var songIndex;//index of that array

//An array of scores
var scores;
//An index for the scores
var scoresIndex;

//Changes the difficulty level
function changeDifficulty(events) {
   // event.target

   //Gets the colection of bettons
   var buttonCollection = document.querySelector("#difficulty");
   for(var i=0; i < buttonCollection.childElementCount; i++)
   {
       //If they are a button and not something else
        if(buttonCollection.childNodes[i].value != null)
        {
            //set the value of difficulty
            difficulty = buttonCollection.childNodes[i].value;
        }
   }
}

//Restarts the game
function restartGame()
{
    //Saves the highscore
	var saveHigh = highscore;
    init();//resets everything else
	highscore = saveHigh;//reverst the highscore
    updateScore();//updates the display
}

function endGame()
{
    //commit scores
}

function buySong()
{

}

function updateSong()
{
    //Get the audio controls element
    var audioControls = document.querySelector("#audioControls");

    //Set the src material to the songs array
    audioControls.setAttribute("src","audio/"+songs[songIndex].name + ".mp3");
	
	//Update the trivia bubbles
	var triviaGroup = document.querySelector("#triviaGroup");
	triviaGroup.childNodes[1].setAttribute("value", songs[songIndex].artist);
	triviaGroup.childNodes[4].setAttribute("value", songs[(songIndex % 5 )+1].artist);
	triviaGroup.childNodes[7].setAttribute("value", songs[(songIndex % 5 )+2].artist);
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
//Initilizes the game
function init()
{
    //initilize various base values
    /*lives = 3;
    score = 0;

	    highscore = score;

    difficulty = "easy";

    songs = [
        {name: "Believe", artist:"The Bravery"},
        {name: "Achilles Last Stand", artist: "Led Zepplin"},
        {name: "Invaders Must Die", artist: "The Prodigy"},
        {name: "Night On Disco Mountain", artist:"David Shire"},
        {name: "Going Mobile", artist:"The Who"}
    ];
    songIndex = 0;

    scores = [
        {name: "Sarah", score:"2,000,000"},
        {name: "Ed", score:"750"},
        {name: "Ted", score:"0"}
    ];
    scoresIndex = 0;

    updateSong();
    updateScore();*/
}

function gotoITunes()
{
	//See this //https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html#searching

    //jQuery.support.cors = true;
	//Parameters for the search
	//The search parameters
	var term = "daft+punk+human+after+all";//Filled in with the actual song playing
	var country = "US";
	var media = "music";
	var entity = "musicTrack";
	var attribute = "mixTerm";
	var callback = "jsonLoaded";//Callback function for bringing the json back
	var limit = 1; //Limit of search results (if it can't find the right one within 3 then there's no hope.) This may be useless
    var url = "https://itunes.apple.com/search?"+"term="+term+"&country="+country+"&media="+media+"&entity="+entity+"&callback="+callback+"&limit="+limit;
	console.log($);
	console.log(jQuery);
	$.getJSON(url).done(function(data){jsonLoaded(data);});

	window.open(url);
}

//Handles the results
function jsonLoaded(obj){
	console.log(obj);
    var x = 0;
    x = x+1;
    console.log(x);
}
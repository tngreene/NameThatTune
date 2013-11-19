//AIzaSyCWTuWAhcjt5JU6Mz2WB5epmc--yw6oTGQ browser key
var API_KEY;
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
    lives = 3;
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
    updateScore();
}

    //togglePlayButton = true;
//--Google code---------
// 2. This code loads the IFrame Player API code asynchronously.
   /* var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//----------------------//
    //Youtube API stuff-----
    //API_KEY = 'AIzaSyCWTuWAhcjt5JU6Mz2WB5epmc--yw6oTGQ';
    //gapi.client.setApiKey(API_KEY);
    //gapi.client.load('youtube',3,getPlaylist());
//--------------------------*/


/*
 // Google code: Creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
 player = new YT.Player('player', {
 height: '390',
 width: '800',
 videoId: 'CB1aKGy-dRU',
 playerVars: {
 autoplay: 1,
 controls: 1,
 showinfo:1,
 playlist:
 ['CB1aKGy-dRU', 'IOmazuzCXCg',
 'SJmmaIGiGBg', 's1tAYmMjLdY]' ] /*, '9G6H2tQCaOA',
 'FVBnkOL-8Jw', 'xajQUEPXRyg', '1FlQCtg96SQ',
 'wtS4ef0vqhU', 'w5wuHaJ9qZw', 'gNyHymEhZmg',
 '4mjGsdF3k1s', 'QA34CtKaJBI', '7ohaMarNbKs',
 '0714IbwC3HA', '20jzMqD-N2c', 'x9_vhYpR9xo',
 'fGIOd1mPJZ0', 'BVQU6xH96k8']
 },
 events: {
 'onReady': onPlayerReady,
 'onStateChange':changeState
 }
 });
 }

 function onPlayerReady(event) {
 //event.target.playVideo();
 //Turn the music up
 event.target.setVolume(0);
 }
 //End of google code

 function changeState(e)
 {

 }
 function getPlaylist()
 {
 console.log("GetPlaylist");
 var select = document.querySelector("#genre");

 /*switch(select.selectedIndex)
 {
 case 0:
 // var request = gapi.client.youtube.playlist.list();
 player.load
 {'listType': 'playlist',
 'list': 'PL13865942465515B2',
 'index': '0',
 'startSeconds': '0',
 'suggestedQuality': 'default'}
 );

 break;
 case 1:
 player.loadloadPlaylist(
 {'listType': 'playlist',
 'list': 'PL9A1600EA18716662',
 'index': '0',
 'startSeconds': '0',
 'suggestedQuality': 'default'}
 );
 break;
 case 2:
 player.loadloadPlaylist(
 {'listType': 'playlist',
 'list': 'PLD5E09FE1EF4CCA45',
 'index': '0',
 'startSeconds': '0',
 'suggestedQuality': 'default'}
 );
 break;
 }
 function pausePlay()
 {
 console.log("HIt paused");

 //If it is playing
 var status = player.getPlayerState();
 //console
 if(status != 2)
 {
 player.pauseVideo();
 }
 else
 {
 player.playVideo();
 }
 }
 }*/
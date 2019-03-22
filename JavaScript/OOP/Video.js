// constructor function
function Video(title, uploader, seconds) {
	this.title = title;
	this.uploader = uploader;
	this.seconds = seconds;
}

Video.prototype.watch = function() {
	console.log("You watched all " + this.seconds + " seconds of " + this.title + "!");
}

var batman = new Video("Batman: The Return", "Rodger", 7236);
//batman.watch();

// ==================================================

// extended constructor function
function MusicVideo(title, uploader, seconds, artist) {
	Video.call(this, title, uploader, seconds);
	this.artist = artist;
}

// prototypal inheritance
MusicVideo.prototype = Object.create(Video.prototype);
MusicVideo.prototype.constructor = MusicVideo;

MusicVideo.prototype.rockOut = function() {
	console.log("You rocked out " + this.title + "!");
}

var sorry = new MusicVideo("Sorry", "Rodger", 201, "Justin Bieber");
//sorry.watch();
//sorry.rockOut();

// ==================================================
// constructor with object
function Video2(obj) {
	this.title = obj.title || "Untitled";
	this.uploader = obj.uploader || "Unknown";
	this.seconds = obj.seconds || 100;
}

Video2.prototype.watch = function() {
	console.log("You watched all " + this.seconds + " seconds of " + this.title + "!");
}

var film = new Video2({
	title: "Parkour Master",
	uploader: "Rodger",
	seconds: 4985
});
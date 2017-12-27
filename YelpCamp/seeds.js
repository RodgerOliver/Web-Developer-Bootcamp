var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
	},
	{
		name: "Bacon Camp",
		image: "http://www.cityofwashburn.org/uploads/7/0/4/7/70473445/8666847.jpg?464",
		description: "Sed do eiusmod tempor incididunt ut labore."
	},
	{
		name: "Dad is Stinky",
		image: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
		description: "Et dolore magna aliqua. Ut enim ad minim veniam."
	},
	{
		name: "Parkour Camp",
		image: "https://res.cloudinary.com/simpleview/image/upload/crm/grandrapids/Indian-Valley-Campground_c7bc3284-5056-a36a-06f44499296d889d.jpg",
		description: "Parkour is the best sport EVEEEEERR!!"
	},
	{
		name: "123",
		image: "http://villageofgreenport.org/images/greenport-village-mccann-campgrounds.jpg",
		description: "This is the password for everything."
	},
	{
		name: "Secret Camp",
		image: "http://www.makeyourdayhere.com/ImageRepository/Document?documentID=51",
		description: "My campground is the most secret ever!! If you wnat to go the location is below ☺☻"
	},
	{
		name: "Active Camp",
		image: "http://www.ride2guide.com/CirclePinesKOA.jpg",
		description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Lorem Camp",
		image: "https://www.nps.gov/havo/planyourvisit/images/Namakanipaio_960.jpg",
		description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
	}
];

function seedDB() {
	// REMOVE ALL CAMPS
	Camp.remove({}, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("Removed Camps");
			// ADD SOME CAMPS
			data.forEach(function(seed) {
				Camp.create(seed, function(err, campground) {
					if(err) {
						console.log(err);
					} else {
						console.log("ADDED A CAMPGROUND");
						// CREATE A COMMENT FOR EACH CAMP
						Comment.create({
							text: "Thisplace is great, but I wish there was internet",
							author: "Homer"
						}, function(err, comment) {
							if(err) {
								console.log(err);
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log("CREATED A NEW COMMENT");
							}
						});
					}
				});
			});
		}
	});

}

module.exports = seedDB;
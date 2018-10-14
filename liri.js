//******************************SETUP******************************//
//turn on dotenv to load up environment variables from.env file
require("dotenv").config();
const spotifyKeys = require("./keys.js");
//import modules and packages
const request = require('request');
const Spotify = require('node-spotify-api');
const moment = require("moment");
const fs = require('fs');
const cmd=require('node-cmd');
const chalk = require('chalk'); // something cool to modify output appearance in VSC
const spotify = new Spotify(spotifyKeys.spotify); // turn on new spotify app
const bandsintown = require("bandsintown")("codingbootcamp");
//need to use var instead of const for these next 2 or else a few of the commands will not work!!!
var command = process.argv[2];
var argument = process.argv[3];

// *****************Main functions begin based on commands chosen*****************
for (i = 4; i < process.argv.length; i++) {
    argument += `+${process.argv[i]}`
} 
// *****************1st command: concert-this*****************
// Did not use request for this. Wanted to experiment some more with NPM packages and their
// cont... accuracy. Observation!!! This NPM package is a bit buggy and does not always 
// cont... 100% match up with bandsintown website. Some dates do not match the venue etc. FYI :)

//This portion displays venue name, location, event date format manipulated w/ moment onto vsc
if (command === "concert-this") {
    bandsintown.getArtistEventList(argument).then(function (events) {
        console.log(`${chalk.red(argument)}
${chalk.underline.yellow('Venue Name')}: ${chalk.bgBlue(events[0].venue.name)}
${chalk.underline.yellow('Venue Location')}: ${chalk.bgBlue(events[1].formatted_location)}
${chalk.underline.yellow('Event Date')}: ${chalk.bgBlue(moment(events[0].datetime).format('MM/DD/YYYY'))}`
        )
// BONUS PORTION: Logging findings to a new log.txt 
fs.appendFile('log.txt', `
${argument}
Venue Name: ${events[0].venue.name}
Venue Location: ${events[1].formatted_location}
Event Date: ${moment(events[0].datetime).format('MM/DD/YYYY')}
`, function (err) {
    if (err) throw err;
    console.log('Saved @ log.txt, check it out!');
                });
    });
}
// *****************2nd command: spotify-this-song*****************
else if (command === "spotify-this-song") {
    if (process.argv[3] === undefined) {
        argument = `"The Sign" Ace of Base`
    }
    spotify.search({ type: 'track', query: argument, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        trackdata = data.tracks.items[0];
        console.log(`
${chalk.underline.yellow('Artist')}: ${chalk.magenta(trackdata.album.artists[0].name)} 
${chalk.red.bold(trackdata.name)}
${chalk.underline.yellow('Album')}: ${chalk.bgBlue(trackdata.album.name)} 
${chalk.underline.yellow('Song Sample')}: ${chalk.bgBlue(trackdata.preview_url)}`
        )
// BONUS PORTION: Logging findings to current log.txt or creates new if none already exists
        fs.appendFile('log.txt', `
${trackdata.name}
        
Album: ${trackdata.album.name} 
Artist: ${trackdata.album.artists[0].name} 
Song Sample: ${trackdata.preview_url}
`, function (err) {
            if (err) throw err;
            console.log('Saved @ log.txt, check it out!');
                    });
    });
} 
// *****************3rd command: movie-this*****************
else if (command === "movie-this") {
    if (process.argv[3] === undefined) {
        argument = `Mr.Nobody`
        console.log("!!!!!!!!!!!!!!!!!psst!!!!!!!!!!!!!!!!!");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    }
    request(`http://www.omdbapi.com/?t=${argument}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log(`${chalk.red.bold(JSON.parse(body).Title)}
${chalk.underline.yellow('Release Year')}: ${chalk.bgBlue(JSON.parse(body).Year)}
${chalk.underline.yellow('IMDB Rating')}: ${chalk.bgBlue(JSON.parse(body).imdbRating)}
${chalk.underline.yellow('Rotten Tomatoes Rating')}: ${chalk.bgBlue(JSON.parse(body).Ratings[1].Value)}
${chalk.underline.yellow('Production Country ')}: ${chalk.bgBlue(JSON.parse(body).Country)}
${chalk.underline.yellow('Languages')}: ${chalk.bgBlue(JSON.parse(body).Language)}
${chalk.underline.yellow('Plot')}: ${chalk.bgBlue(JSON.parse(body).Plot)}
${chalk.underline.yellow('Actors')}: ${chalk.bgBlue(JSON.parse(body).Actors)}`)
        }
// BONUS PORTION: Logging findings to current log.txt or creates new if none already exists
        fs.appendFile('log.txt', `
${JSON.parse(body).Title}
Release Year: ${JSON.parse(body).Year}
IMDB Rating: ${JSON.parse(body).imdbRating}
Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
Production Country: ${JSON.parse(body).Country}
Languages: ${JSON.parse(body).Language}
Plot: ${JSON.parse(body).Plot}
Actors: ${JSON.parse(body).Actors}
        `, function (err) {
            if (err) throw err;
            console.log('Saved @ log.txt, check it out!');
          }); 
    });
}
// *****************4th command: do-what-it-says*****************
else if (command === "do-what-it-says") {
// We tell it to read the random text file if this command is summoned
    fs.readFile("random.txt", "utf8", function (err, data) {
// Spit out error msg if any
        if (err) {
                    return console.log(err);
                }
// separating the data and replacing targeted characters
    data = data.replace(`"`, "");
    data = data.replace(`,`, "");
// We now call on the command inside the random text but add 'node liri.js to initiate search
    cmd.get(
        `node liri.js ${data}`,
        function (err, data, stderr) {
// data is displayed for the random text that is now being searched against
        console.log(data)

                                     }
        );
    });
}

// Thank you for reading!
# LIRI Bot

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

For a live demo, please check out this link below. Now you have peace of mind that the screenshots were not photoshopped. 

https://drive.google.com/file/d/1wtNY52TtKhNuWsUc8lpG_T-G0ZLuVmy7/view?usp=sharing

A link to the video is also available in this repo's index.html file. Enjoy!

### Prep Work

The following packages were downloaded:

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   * [Request](https://www.npmjs.com/package/request)
   * [Bands In Town API](https://www.npmjs.com/package/bandsintown) Wanted to explor npm instead of       request and compare the 2 methods for accuracy
   * [Moment](https://www.npmjs.com/package/moment)
   * [DotEnv](https://www.npmjs.com/package/dotenv)
   * [FS](https://www.npmjs.com/package/file-system)
   * [cmd](https://www.npmjs.com/package/node-cmd)
   * [Chalk](https://www.npmjs.com/package/chalk/v/1.0.0) for formatting on the command line so 
      it doesn't bore me to death
   * Used Request to grab data from the [OMDB API](http://www.omdbapi.com) 
   
## Instructions

There are 4 commands:

   1 `concert-this`  (input factor is artist name)

   2 `spotify-this-song` (input factor is song name)

   3 `movie-this` (input factor is movie name)

   4 `do-what-it-says` (no input factor needed, it reads from the random.txt file to execute)

All the work was done for you! All the user needs to do is execute an 'npm install' in the command line before proceeding to test the commands. Next, user will need to enter the following in the command prompt, ignoring the "+":

node liri.js + #commandTitlehere + "#enter appropriate input here if this is commands 1-3"

### What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

      Below is a screenshot of a tested result:

      ![concertthis](https://user-images.githubusercontent.com/41309640/46914067-5eddad00-cf66-11e8-86d2-832b61b2dec2.JPG)

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

     * If no song is provided then your program will default to "The Sign" by Ace of Base.

      Below is a screenshot of a tested result:

   ![spotify](https://user-images.githubusercontent.com/41309640/46914271-38207600-cf68-11e8-86ad-fcbb4687f06e.JPG)


3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
 Below is a screenshot of a tested result:

![omdb](https://user-images.githubusercontent.com/41309640/46914279-5f774300-cf68-11e8-9128-e6ff30b86685.JPG)


   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

 Below is a screenshot of a tested result:

![omdbdefault](https://user-images.githubusercontent.com/41309640/46914298-ac5b1980-cf68-11e8-8fb6-a9042c0c1c4e.JPG)

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

 Below is a screenshot of a tested result:

 ![dowhatitsays](https://user-images.githubusercontent.com/41309640/46914303-c268da00-cf68-11e8-9c33-6fbdb0636f5f.JPG)

### BONUS

* In addition to logging the data to your terminal/bash window, the data is output to a .txt file called `log.txt`.

* Each command is appended to the `log.txt` file or create one if it does not already exist

* This does not overwrite your file each time you run a command.

 Below is a screenshot of a tested result:

 ![logpic](https://user-images.githubusercontent.com/41309640/46914318-2b505200-cf69-11e8-8e25-3749eac123f0.JPG)


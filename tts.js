'use strict';

var watson = require('watson-developer-cloud');
var fs = require('fs');
var util = require("util"), request = require("request"), cheerio = require("cheerio");
var extractor = require("unfluff");
var md5 = require('md5');
var Promise = require('promise');

var FFmpeg = require('plain-ffmpeg');

var params = [];


var promiseCount = 0;
var myPromises = [];

/// This object holds all of the data that the text to speech returns
var returnData={};


var inputURL=process.argv[2];
var inputURLMD5=md5(inputURL);

if (!fs.existsSync("./audio/"+inputURLMD5)){
    fs.mkdirSync("./audio/"+inputURLMD5);
}




request(process.argv[2], function (error, response, html) {
		if (!error && response.statusCode == 200) {

		var data = extractor(html);
		var pageTitle = data.title;
		var pageTitleNoSpaces = pageTitle.replace(/ /g, '_');


		var pageBody = data.text;

		/// we need to make the story short because of the API

		pageBody=pageTitle+". "+pageBody;

		var page=pageBody.match(/[\s\S]{1,5000}/g)

		console.log(page);
		console.log(page.length);
		console.log(pageTitleNoSpaces);

		console.log(pageBody.length+" characters.");
		console.log(page.length+" parts in the article.");

		console.log("Title: "+data.title);


		var watson = require('watson-developer-cloud');
		var text_to_speech = watson.text_to_speech({
		username: '5bab27f4-3e1a-4531-aca1-46be6cb113e0',
		password: 'DT4ukgq3agb1',
		version: 'v1'
		});



		for(var i=0;i<page.length;i++){


			 params[i] = {
			  text: page[i],
			  voice: 'en-US_MichaelVoice', // Optional voice
			  accept: 'audio/wav',
			  fileName: "audio/"+inputURLMD5+"/"+inputURLMD5+'_'+zeroFill(i,2)+'.wav'
			};

			promiseCount++;

			var promise = new Promise(function (resolve, reject) {
					console.log("Started promise "+promiseCount);
						returnData.params=params[i];

//					console.log(params[i]);

					var fs = require('fs'),
 

					text_to_speech.synthesize(params[i], function(err, res) {
						returnData.res=res;
						resolve(returnData);

					});
			});



			promise.then(function(data) {

				//We resolved a promise, decrement the counter
				promiseCount--;


//console.log(data);
			    console.log('Got data! Promise fulfilled. ');
				/// Write the file after returned



					// var fs = require('fs');
					// fs.writeFile(data.params.fileName, data.res, function(err) {
					//     if(err) {
					//         return console.log(err);
					//     }

					//     console.log("The file was saved! "+data.params.fileName);
				console.log("Promise resolved: "+promiseCount);

				//	if all promises are returned then we should do the assembly of the files
				if(promiseCount==0){
					console.log("Got em all!");







 					var fs = require('fs'),

    var filehandle = fs.createWriteStream('./audio/'+inputURLMD5+"/"+pageTitleNoSpaces+".wav");

     var file = fs.readdirSync('./audio/'+inputURLMD5+"/"+pageTitleNoSpaces+".wav");

    currentfile = './audio/' + clips.shift() + '.wav';
    stream = fs.createReadStream(file);
    stream.pipe(dhh, {end: false});
    stream.on("end", function() {
        console.log(currentfile + ' appended');
        main();        
    });




//     clips = [];
// console.log(files);

// files.forEach(function (file) {

// 	if(file.substring(0, 32)==data.params.fileName.substring(6, data.params.fileName.length-7)){
//     	clips.push(file.substring(0));  
// 	}
// });

// clips.sort(function (a, b) {
//     return a - b;
// });



// /Users/blaze/node_modules/ffmpeg-static/bin/darwin/x64/ffmpeg -f concat -i <(for f in ./audio/*.wav; do echo "file '$PWD/$f'"; done) -c copy audio/output.wav; /Users/blaze/node_modules/ffmpeg-static/bin/darwin/x64/ffmpeg -i audio/output.wav -b:a 160k -filter:a "atempo=1.25" audio/article.m4a; rm audio/output.wav; open audio/article.m4a

// var ffmpeg = new FFmpeg({
//     global: {'-y': null},
//     input: {
//         '-i ': "audio/db73fa4560a06c388b8817a4037af276_00.wav"
//     },
//     output: {
//         'audio/db73fa4560a06c388b8817a4037af276_00.m4a'
//     }
// });
// ffmpeg.start();
// ffmpeg.on('progress', function(progress) {
// 	console.log(progress);
// })




console.log(clips);






				}


					})

			}, function(error) {
			    console.log('Promise rejected.');
			    console.log(error.message);
			});


		}


}  
});

function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}


function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}




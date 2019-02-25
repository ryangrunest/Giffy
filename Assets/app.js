// API Key stored in variable
var apiKey = 'OklNWDgRRQiw4ic01MryDgVNHJVWPHtJ';

// string of topics
var topics = ['Michael Scott', 'Kanye West', 'Friends', 'Obama', 'Jeff Goldblum', 'Tame Impala'];




// loop through buttons array and append to buttons div
function loadTopicsButtons() {
	$('.buttons-div').text('');
	topics.forEach(topic => {
	var storedElement = $('<button>').attr('class', 'btn m-1 gif-buttons').attr('value', topic).text(topic);
	$('.buttons-div').append(storedElement);
	});
};
loadTopicsButtons();

$('#clear-button').on('click', function() {
	topics = [];
	loadTopicsButtons();
	$('.images-div').text('');
})

// button click to load images
$('.buttons-div').on('click', '.gif-buttons', function() {
	var value = $(this).attr('value');
	console.log(value);
	// save query URL
	var queryURL = `https://api.giphy.com/v1/gifs/search?q=${value}&api_key=${apiKey}&limit=10`;
	// ajax request
	$.ajax({
		url: queryURL,
		method: 'GET',
		success: function(response) {
			console.log(response);
			$('.images-div').text('');
			// console.log(response);
			// console.log(response.data.length);
			for (var i = 0; i < response.data.length; i++) {
				// create div to append all data to
				var imageDiv = $('<div>').attr('class', 'card');
				// create textbody for text to be appended to
				var textBody = $('<div>').attr('class', 'card-body');
				// create rating text element to append to textbody
				var ratingDiv = $('<p>').text(`Rating: '${response.data[i].rating}'`);
				// create div with date the gif was created
				var dateDiv = $('<p>').text(`Date Created: ${response.data[i].import_datetime}`);
				// store source url from response in variable
				var source = response.data[i].source;
				// create new div for source
				var sourceText = $('<a>').attr('href', source).text(`Source: ${source}`).attr('target', '_blank');
				// create image element
				var newImg = $('<img>').attr('src', response.data[i].images.original_still.url).attr('class', 'card-img-top');
				// add attributes to images for click event handling
				newImg.attr('fixed', response.data[i].images.original_still.url);
				newImg.attr('animated', response.data[i].images.original.url);
				newImg.attr('value', 'off');
				newImg.attr('id', 'gif');
				// append all text to the textbody
				textBody.append(ratingDiv, dateDiv, sourceText);
				// append text body and image to card
				imageDiv.append(newImg, textBody);
				// add element to dom
				$('.images-div').append(imageDiv);
			};
		},
		error: function() {
			alert('Error loading page. Please try again later.');
		}
	});
});


// add click functionality for gifs to change from animated to still
$('.images-div').on('click', '#gif', function() {
	if ($(this).attr('value') === 'off') {
		$(this).attr('value', 'on').attr('src', $(this).attr('animated'));

	} else if ($(this).attr('value') === 'on') {
		$(this).attr('value', 'off').attr('src', $(this).attr('fixed'));

	}
});

var inputText;
// submit button functionality
$('#submit').on('click', function() {
	inputText = $('#inputGif').val();
	topics.push(inputText);
	loadTopicsButtons();
})





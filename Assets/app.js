// API Key stored in variable
var apiKey = 'OklNWDgRRQiw4ic01MryDgVNHJVWPHtJ';

// string of topics
var topics = ['Michael Scott', 'Kanye West', 'Friends', 'Obama', 'Jeff Goldblum', 'Tame Impala'];




// loop through buttons array and append to buttons div
function loadTopicsButtons() {
	$('.buttons-div').text('');
	topics.forEach(topic => {
	var storedElement = $('<button>').attr('class', 'btn btn-dark col m-1 gif-buttons').attr('value', topic).text(topic);
	$('.buttons-div').append(storedElement);
	});
};
loadTopicsButtons();



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
			$('.images-div').text('');
			// console.log(response);
			// console.log(response.data.length);
			for (var i = 0; i < response.data.length; i++) {
				var imageDiv = $('<div>');
				var newImg = $('<img>').attr('src', response.data[i].images.original_still.url);
				var ratingDiv = $('<p>').text(`Rating: '${response.data[i].rating}'`);
				newImg.attr('fixed', response.data[i].images.original_still.url);
				newImg.attr('animated', response.data[i].images.original.url);
				newImg.attr('value', 'off');
				newImg.attr('id', 'gif');
				imageDiv.append(ratingDiv, newImg);
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





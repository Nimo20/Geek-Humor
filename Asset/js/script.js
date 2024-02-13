

// event listener that links to html code 
document.addEventListener('DOMContentLoaded', function () {
    // button & container elements from html code
    var generateBtn = document.getElementById('btn');
    var resultContainer = document.getElementById('humor-container');

    // event listener with fx that is triggered when button is clicked
    generateBtn.addEventListener('click', function () {
        // promise.all = fx that fetches data from the 2 APIs (at random)
        Promise.all([getUserJoke(), getUserEmoji()])
            .then(function (results) {
                // results[0] is the jokeResult, and results[1] is the emojiResult
                var jokeResult = results[0];
                var emojiResult = results[1];
                // Displays results in the humor container
                displayResult(emojiResult.htmlCode[0] + '<br>' + jokeResult);
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
                displayResult('?');
            });
    });

    // fx to get a random geek joke
    function getUserJoke() {
        // geek joke API  
        var apiUrl = 'https://geek-jokes.sameerkumar.website/api';
        return fetch(apiUrl)
            .then(function (response) {
                // if result is valid, joke is displayed
                if (response.ok) {
                    return response.text();
                    // if result is not valid, error message is displayed 
                } else {
                    console.error('Error fetching a geek joke:', response.statusText);
                    return 'Sorry, could not fetch a geek joke at the moment.';
                }
            })
            // in case of errors with fetch request
            .catch(function (error) {
                console.error('Unable to connect to the geek joke API', error);
                return 'Sorry, could not fetch a geek joke at the moment.';
            });

    }

    // fx to get a random emoji
    function getUserEmoji() {
        // emojihub API 
        var apiUrl = 'https://emojihub.yurace.pro/api/random';
        return fetch(apiUrl)
            .then(function (response) {
                // if result is valid, random emoji is displayed
                if (response.ok) {
                    return response.json();
                    // if result is not valid, error message is displayed 
                } else {
                    console.error('Error fetching random emoji:', response.statusText);
                    return { htmlCode: ['?'] };
                }
            })
            // in case of errors with fetch request
            .catch(function (error) {
                console.error('Unable to connect to the emoji API', error);
                return { htmlCode: [':question:'] };
            });
    }

    // fx to display results 
    function displayResult(result) {
        // Clears previous joke/emoji in the result container by setting it to an empty string
        resultContainer.innerHTML = '';
        // Displays the results in the result container
        resultContainer.innerHTML = result;
    }
});
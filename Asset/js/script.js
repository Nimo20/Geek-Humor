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

    
});
// Variables
let sentences = [
    'ten ate neite ate nee enet ite ate inet ent eate',
    'Too ato too nOt enot one totA not anot tOO aNot',
    'oat itain oat tain nate eate tea anne inant nean',
    'itant eate anot eat nato inate eat anot tain eat',
    'nee ene ate ite tent tiet ent ine ene ete ene ate'
];
let sentIndex = (-1); // Current sentence in array (set to -1 b/c we increment when loading the sentence)
let blockIndex = 0; // Character in sentence 

let words = 54; // Total number of words in sentences
let mistakes = 0; // Variable to keep track of mistakes
let startTime = -1; // Set to =1 so it can check when we first press a key

// Display only the lowercase keyboard initially
$(document).ready(function () {
    // Show the lowercase, hide uppercase
    $("#keyboard-lower-container").show();
    $("#keyboard-upper-container").hide();
    // Load first sentence
    loadSentence();
});

// Function to show uppercase keyboard when shift key is pressed and hide lowercase
$(document).keydown(function (e) {
    if (e.which == 16) {
        $("#keyboard-lower-container").hide();
        $("#keyboard-upper-container").show();
    }
});

// Function to show lowercase keyboard when shift key is released and hide uppercase
$(document).keyup(function (e) {
    if (e.which == 16) {
        $("#keyboard-lower-container").show();
        $("#keyboard-upper-container").hide();
    }
});

// Use keypress b/c we don't want keys such as shift, backspace, etc
//We can use keycodes (ex. e.which)
$(document).keypress(function (e) {
    //If startTime is -1, set startTime to a new date object
    if (startTime == -1) {
        startTime = new Date();
    }
    // Get element whose ID corresponds with the keycode of the key pressed
    let key = $("#" + e.which);
    // Set key background to yellow
    key.css('background-color', 'yellow');
    // Check to see if the key is the correct key in the sentence
    let letter = String.fromCharCode(e.which);
    // If key pressed is correct, create a new checkmark and put it in #feedback
    if (letter === sentences[sentIndex].charAt(blockIndex)) {
        let glyph = $("<span class='glyphicon glyphicon-ok'></span>");
        $("#feedback").append(glyph);
        // Else, add a red-x and increment the number of mistakes
    } else {
        mistakes++;
        let glyph = $("<span class='glyphicon glyphicon-remove'></span>");
        $("#feedback").append(glyph);
    }
    // Move the yellow block along to the next character that we are on
    moveBlock();
    // Add keyup even to set the elements background color back to default
    $(document).keyup(function (event) {
        key.css('background-color', '#f5f5f5');
    });
});

// Load sentence from the sentence array at current index (sentIndex)
function loadSentence() {
    // Increcment which sentence we're on
    sentIndex++;
    // Empty the #feedback div of all the checkmarks and red-x's
    $("#feedback").empty();
    // If we've reached the last sentence in the array, end the game
    if (sentIndex >= sentences.length) {
        endGame();
        // Else load the first letter in the sentence in #target-letter and set #sentence's text to the next one
    } else {
        $("#target-letter").text(sentences[sentIndex].charAt(0));
        $("#sentence").text(sentences[sentIndex]);
    }
};

// Move the highlighted block to the right every time we type
function moveBlock() {
    // Add 17.5 px to the existing left value of our yellow-block div
    $("#yellow-block").css("left", "+=17.5px");
    // Increment the blockIndex variable
    blockIndex++;
    // Set #target-letter's text to the next letter in our loadSentence
    $("#target-letter").text(sentences[sentIndex].charAt(blockIndex));
    //If the block is at the end of the sentence, load the next senttence and reset
    if (blockIndex >= sentences[sentIndex].length) {
        loadSentence();
        $("#yellow-block").css("left", "17.5px");
        blockIndex = 0;
    }
};

//WPM = numberOfWords / minutes - 2 * numberOfMistakes

// Run endGame if we have reached the max number of sentences
function endGame() {
    // Calculate the words per minute
    let minutes = new Date().getMinutes() - startTime.getMinutes();
    let wpm = words / (minutes < 1 ? 1 : minutes) - 2 * mistakes;
    // Create an end game message
    let endMessage = "Congratulations, you won! " +
        "\nYour WPM is " + wpm +
        "\nWould you like to play again?";
    // Prompt user with a confirm/cancel box and save their response to a variable
    let playAgain = confirm(endMessage);
    // If playAgain is true, reload the webpage
    if (playAgain == true) {
        location.reload();
    }
};
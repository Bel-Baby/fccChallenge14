const listOfAllDice = document.querySelectorAll(".die");
//The next step is to select all of the elements responsible for displaying the scores.Use the querySelectorAll() method to access all of the input elements inside the #score-options div element and assign that result to a constant called scoreInputs.Then use the querySelectorAll() method to access all of the span elements inside the #score-options div element and assign that result to a constant called scoreSpans.
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");

const currentRoundText = document.getElementById("current-round");
const currentRoundRollsText = document.getElementById("current-round-rolls");

const totalScoreText = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");

const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");

const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let isModalShowing = false;

//Each time the user rolls the dice, you will need to keep track of all of the dice values.Use let to create a variable called diceValuesArr and assign it the value of an empty array.
let diceValuesArr = [];

//Throughout the game, you will need to keep track of the current score, total score, number of rolls and which round the player is on.Use let to declare three variables named rolls, score, and totalScore and set all of their values to the number 0.Then, use let to declare a variable named round and assign it the number 1.
let rolls = 0;
let score = 0;
let totalScore = 0;
let round = 1;

//When the user clicks on the Roll the dice button, five random die numbers should be generated and displayed on the screen. For the next few steps, you will build out this roll dice algorithm.Start by creating an arrow function called rollDice.
const rollDice = () => {
    //Each time the user rolls the dice, the list of previous dice values should be reset.Inside your rollDice function, reassign an empty array to your diceValuesArr variable.
    diceValuesArr = [];

    //When the user rolls the dice, you will need to generate 5 random numbers representing each die value.To start, create a for loop that will loop a total of 5 times.
    for (let i = 0; i < 5; i++) {
        //For each iteration of the for loop, you will need to generate a random number that represents one of the six possible values found on a die.Use Math.random() to generate a random number ranging between 1 and 6 inclusive. Make sure to round that result down to the nearest whole integer. Then assign the entire result to a const variable called randomDice.
        const randomDice = Math.floor(Math.random() * 6) + 1;
        //Next, push your randomDice value to the end of the diceValuesArr array.
        diceValuesArr.push(randomDice);
    }
    //The next step is display the five random dice values on the screen.Below your for loop, use the forEach method on the listOfAllDice variable to loop through each of the dice. For the callback function, use dice and index for the parameters.
    listOfAllDice.forEach((dice, index) => {
        //Inside your callback function, use the textContent property on the dice parameter and assign it the value of diceValuesArr[index].
        dice.textContent = diceValuesArr[index];
    });
}

//If you try to roll the dice a few times, you probably noticed that the rolls and round count do not change. To fix this, you will need to update the text content for both of those values.Start by creating an arrow function called updateStats.
const updateStats = () => {
    //Inside your updateStats function, update the text content for the currentRoundRollsText by assigning rolls to currentRoundRollsText.textContent.Below that, update the text content for the currentRoundText by assigning round to currentRoundText.textContent.
    currentRoundRollsText.textContent = rolls;
    currentRoundText.textContent = round;
}

//Each time you roll the dice, you could end up with a "Three of a kind", "Four of a kind", "Full house", "Straight" or a random combination of numbers. Based on the outcome, you can make a selection and add points to your score.Start by creating an arrow function called updateRadioOption that takes optionNode and score as parameters.
const updateRadioOption = (optionNode, score) => {
    //To enable the radio buttons, you should set the disabled property on scoreInputs[optionNode] to false.
    scoreInputs[optionNode].disabled = false;
    //Next, you will need to update the radio button's value to the current score.
    scoreInputs[optionNode].value = score;
    //To display the current score, update the text content for the span element next to the radio button to be the following template literal: , score = ${score}.
    scoreSpans[optionNode].textContent = `, score = ${score}`;
}

//When you roll the dice and make a selection, you are not able to keep the score you selected and move onto the next round. In the next few steps, you will build out an algorithm that keeps track of and displays each score for all six rounds of the game.Start by creating an arrow function called updateScore that has two parameters called selectedValue and achieved.
const updateScore = (selectedValue, achieved) => {
    //The selectedValue parameter represents the option the user chose during that round.To update the score, you will need to use the += compound assignment operator to add the selectedValue to the totalScore. Make sure to wrap your selectedValue parameter inside a parseInt since this string value needs to be converted to an integer.
    totalScore += parseInt(selectedValue);

    //Next, set the text content of totalScoreText to the value of totalScore.Below that, append the following template literal to the scoreHistory element's HTML: <li>${achieved} : ${selectedValue}</li>.
    totalScoreText.textContent = totalScore;
    scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
}

//If you roll the dice and get a "Three of a kind" or "Four of a kind", then you can get a score totalling the sum of all five dice values. For the next few steps, you will build out an algorithm that tracks any duplicates found in the diceValuesArr and displays a score next to the first two radio buttons.Start by creating an arrow function called getHighestDuplicates that has a parameter called arr.
const getHighestDuplicates = arr => {
    //To detect if a roll result is a "Three of a kind" or a "Four of a kind", you will need to count the number of occurrences for each unique number in the arr.Inside your getHighestDuplicates function, create a const variable called counts and assign it an empty object.
    const counts = {};

    //Below your counts variable, create a for...of loop that will iterate through your arr. The variable name for the for...of loop should be called num.
    for (const num of arr) {
        //For each iteration in the arr, you will need to check if the current number exists in the counts object.Inside your for...of loop, add an if statement to check if the num key exists in the counts object. If so, increment the value of counts[num] by 1.Below your if statement, include an else clause that assigns 1 to counts[num] for the first occurrence of that number in the counts object.
        if (counts[num]) {
            counts[num]++;
        } else {
            counts[num] = 1;
        }
    }
    //The next step is to keep track of when a particular number appears three or four times within the arr.Use let to create a highestCount variable and assign it the value of 0.
    let highestCount = 0;

    //Next, create another for...of loop that loops through the arr. The variable name for the for...of loop should be called num.
    for (const num of arr) {
        //For each iteration of the loop, you will need to get the current duplicate count for each number in the arr.Create a const variable called count and assign it the value of counts[num].
        const count = counts[num];

        //To detect if the dice roll produced a "Three of a kind", you will need to create an if statement to check if the current count is greater than or equal to 3 and greater than the current highest count. If so, assign count to the highestCount variable.
        if (count >= 3 && count > highestCount) {
            highestCount = count;
        }
        //To detect if the dice roll produced a "Four of a kind", you will need to create an if statement to check if the current count is greater than or equal to 4 and greater than the current highest count. If so, assign count to the highestCount variable.
        if (count >= 4 && count > highestCount) {
            highestCount = count;
        }
    }
    //If the user rolls a "Three of a kind" or "Four of a kind", then they will receive a score totalling the sum of all five dice values.Use the reduce method on diceValuesArr. For the callback function, use a and b as parameters. Within the callback function, return the sum of a and b. For the initial value, use the number 0.Finally, assign the entire result to a const variable called sumOfAllDice.
    const sumOfAllDice = diceValuesArr.reduce((a, b) => {
        return a + b;
    }, 0);

    //If the highest number of duplicates is 4 or more, then you will want to enable the radio button for the "Four of a kind" option and display the score next to it.Add an if statement that checks if highestCount is greater than or equal to 4. If so, call the updateRadioOption and pass in the number 1 and sumOfAllDice for the arguments.
    if (highestCount >= 4) {
        updateRadioOption(1, sumOfAllDice);
    }

    //If the highest number of duplicates is 3 or more, then you will want to enable the radio button for the "Three of a kind" option and display the score next to it.Add an if statement that checks if highestCount is greater than or equal to 3. If so, call the updateRadioOption and pass in the number 0 and sumOfAllDice for the arguments.
    if (highestCount >= 3) {
        updateRadioOption(0, sumOfAllDice);
    }
    //If the user does not get a "Three of a kind" or "Four of kind", then they will not receive any points for that round.At the end of your getHighestDuplicates function, call the updateRadioOption function with the arguments of 5 and 0.
    updateRadioOption(5, 0);
}

//If the user rolls a "Three of a kind" and a pair, then they can receive 25 points for that round. This is known as a full house.For the next few steps you will build out an algorithm to check for both a "Three of a kind" and a pair and display that option on the screen.Start by creating an arrow function called detectFullHouse with arr for the parameter name.Inside the detectFullHouse function, create a const variable called counts and assign it an empty object.
const detectFullHouse = (arr) => {
    const counts = {};
    //To count the occurrences for each number, use a for...of loop to iterate through every element of the arr. The variable name for the for...of loop should be called num.
    for (const num of arr) {
        //Inside your for...of loop, use a ternary operator to check if counts[num] is truthy. If so, then increment the count by one, otherwise initialize counts[num] with a value of 1.Assign the entire result of your ternary to counts[num].
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    //If the counts object has a value of the number 3, then that means the user rolled a Three of a kind.Start by using the Object.values() method and pass in counts for the argument. This will create an array of only the counts values.Then chain the includes method and pass in the number 3. This will check if 3 is inside this new array.Lastly, assign that result to a const variable called hasThreeOfAKind.
    const hasThreeOfAKind = Object.values(counts).includes(3);

    //If the counts object has a value of the number 2, then that means the user has rolled a pair.Start by using the Object.values() method and pass in counts for the argument.Then chain the includes method and pass in the number 2. This will check if 2 is inside this new array.Lastly, assign that result to a const variable called hasPair.
    const hasPair = Object.values(counts).includes(2);

    //If the user has rolled both a pair and Three of a kind, then they have received a Full house resulting in 25 points.Add an if statement to check if both hasThreeOfAKind and hasPair are true. If so, call the updateRadioOption and pass in the numbers 2 and 25.
    if (hasThreeOfAKind && hasPair) {
        updateRadioOption(2, 25);
    }
    //If the user did not get a Full house then the option for None of the above should be enabled with 0 points awarded.Below your if statement, call the updateRadioOption function and pass in the numbers 5 and 0 for the arguments.
    updateRadioOption(5, 0);
}

//For the last portion of the game, you will need to create an algorithm that checks for the presence of a straight.A small straight is when four of the dice have consecutive values(Ex. 1234) resulting in a score of 30 points. A large straight is when all five dice have consecutive values(Ex. 12345) resulting in a score of 40 points.Start by creating an arrow function called checkForStraights that has arr for the parameter name.
const checkForStraights = (arr) => {
    //To check for a small or large straight, you will need to first sort the list of numbers in the array.Use the sort method on the arr parameter and pass in a callback function. For the callback function, use a and b for the parameters and implicitly return a - b.Assign that entire result to a const variable called sortedNumbersArr.
    const sortedNumbersArr = arr.sort((a, b) => a - b);

    //To check for only unique numbers, you will need to use a Set on your sortedNumbersArr. Convert that result into an array using the spread operator.Lastly, assign that entire result to a const variable called uniqueNumbersArr.
    const uniqueNumbersArr = [...new Set(sortedNumbersArr)];

    //Next, use the join method on the uniqueNumbersArr and assign that result to a const variable called uniqueNumbersStr. For the join method use an empty string for the separator.
    const uniqueNumbersStr = uniqueNumbersArr.join("");

    //There are a total of 3 possibilities for a small straight: "1234", "2345", and "3456".Create a const variable called smallStraightsArr and assign it the value of an array containing the three string values listed above.
    const smallStraightsArr = ["1234", "2345", "3456"];

    //There are only two possibilities for a large straight: "12345" and "23456".Create a const variable called largeStraightsArr and assign it the value of an array containing the two string values listed above.
    const largeStraightsArr = ["12345", "23456"];

    //If the user rolls a small straight, then the Small straight radio button option should be enabled with a score of 30 points.Start by creating an if statement to check if uniqueNumbersStr is included in the smallStraightsArr. If so, call the updateRadioOption with 3 and 30 for the arguments.
    if (smallStraightsArr.includes(uniqueNumbersStr)) {
        updateRadioOption(3, 30);
    }
    //If the user rolls a large straight, then the Large straight radio button option should be enabled with a score of 40 points.Start by creating an if statement to check if uniqueNumbersStr is included in the largeStraightsArr. If so, call the updateRadioOption with 4 and 40 for the arguments.
    if (largeStraightsArr.includes(uniqueNumbersStr)) {
        updateRadioOption(4, 40);
    }
    //If the user does not get a small or large straight, call the updateRadioOption function and pass in the numbers 5 and 0 for the arguments.
    updateRadioOption(5, 0);
}

//Before each dice roll, you will need to reset the values for the score inputs and spans so a new value can be displayed.Start by creating an arrow function called resetRadioOption.
const resetRadioOption = () => {
    //For each of the score inputs, you will need to disable the input and remove its checked attribute.Start by using a forEach on the scoreInputs. For the callback function, use input for the parameter name.
    scoreInputs.forEach((input) => {
        //Inside your callback function, set the input's disabled property to true and the checked property to false.
        input.disabled = true;
        input.checked = false;
    });
    //For each of the score span elements, you will need to reset the text content.Start by adding a forEach to your scoreSpans variable. For the callback function, use span for the parameter name.Inside the callback function, set text content for each span to an empty string.
    scoreSpans.forEach((span) => {
        span.textContent = "";
    });
}

//If you go through six rounds of the game, you should see the alert show up with your final score. But when you dismiss the alert, you are able to keep playing for more rounds past the original six. To fix this, you will need to reset the game.Start by creating an arrow function called resetGame.
const resetGame = () => {
    //Inside your resetGame function, reassign the diceValuesArr variable to an array of five zeros.Below that, reassign the variables score, totalScore and rolls to 0.Lastly, reassign the round variable to 1.
    diceValuesArr = [0, 0, 0, 0, 0];
    score = 0;
    totalScore = 0;
    round = 1;
    rolls = 0;
    //To reset each of the dice values to show 0, apply a forEach method to the listOfAllDice variable. For your callback function, use dice and index as parameters.
    listOfAllDice.forEach((dice, index) => {
        //Inside your callback function, update the dice text content by assigning it the value of diceValuesArr[index].
        dice.textContent = diceValuesArr[index];
    });
    //Next, update the score history, total, rounds and rolls text.Start by updating the text content for the totalScoreText by assigning it the value of totalScore. Below that, update the HTML content for the scoreHistory by assigning it an empty string.Below that, update the text content for the currentRoundRollsText by assigning it the rolls variable.Lastly, update the currentRoundText text content by assigning it the round variable.
    totalScoreText.textContent = totalScore;
    scoreHistory.innerHTML = "";
    currentRoundRollsText.textContent = rolls;
    currentRoundText.textContent = round;
    //The last part of your resetGame function is to call the resetRadioOption function. This will reset all of the radio buttons.
    resetRadioOption();
}

//Now it is time to test out the rollDice function.Add an addEventListener() method on the rollDiceBtn element and pass in a click event for the first argument and an empty arrow function for the second argument.
rollDiceBtn.addEventListener("click", () => {
    //For each round in the game, users are allowed to roll the dice a maximum of three times.Inside your callback function, add an if statement to check if rolls is strictly equal to the number 3.If the condition is true, show an alert() to display the message You have made three rolls this round. Please select a score..
    if (rolls === 3) {
        alert("You have made three rolls this round. Please select a score.");
    }//If the rolls limit has not been reached, then the user can still roll the dice in that round.Add an else clause below your if statement. Inside the else clause, increment rolls by one and then call the rollDice function.
    else {
        rolls++;
        //To see the results of your resetRadioOption function, you will need to call the function inside the rollDiceBtn callback function.
        resetRadioOption();
        rollDice();
        //To see the round and rolls values update on the screen, call your updateStats function inside the else clause of the rollDiceBtn event listener.
        updateStats();
        //To test out selecting a radio button option, call the updateRadioOption function and pass in the numbers 0 and 10 for the arguments.Roll the dice again and you should see that the first radio button is enabled and displays a current score of 10.
        //updateRadioOption(0, 10);//Now that you have verified the updateRadioOption function works, remove the function call from your else clause.

        //Now it is time to see the result of your getHighestDuplicates function.Inside the else clause of the rollDiceBtn callback function, call the getHighestDuplicates function and pass in diceValuesArr for the argument.
        getHighestDuplicates(diceValuesArr);

        //To see the results of your detectFullHouse function, call your detectFullHouse function inside the rollDiceBtn event listener and pass in the diceValuesArr variable for the argument.
        detectFullHouse(diceValuesArr);

        //To see the results of your checkForStraights function, call your checkForStraights function inside the rollDiceBtn event listener and pass in the diceValuesArr variable for the argument.
        checkForStraights(diceValuesArr);
    }
});


//When the user clicks on the Show rules button, the rules for the game should display on the screen. When they click on the button again, the rules should be hidden. In the next few steps, you will build out the toggle functionality to show and hide the rules.Start by using the addEventListener() method on the rulesBtn. For the first argument, pass in a click event and for the second argument pass in an empty arrow function.
rulesBtn.addEventListener("click", () => {
    //Every time the user clicks on the rules button, the current boolean value for the isModalShowing variable should toggle between true and false.Use the logical NOT operator(!) in front of your isModalShowing variable to invert the value and reassign that to the isModalShowing variable.
    isModalShowing = !isModalShowing;

    //If isModalShowing is true, then you will need to show the rules and update the rulesBtn text.Start by adding an if statement to check if isModalShowing is truthy. Inside your if statement, update the text content for the rulesBtn by assigning it the string value of Hide Rules.Below that, update the display property for your rulesContainer by assigning it the string value of block.
    if (isModalShowing) {
        rulesBtn.textContent = "Hide Rules";
        rulesContainer.style.display = "block";
    }//If isModalShowing is false, then you will need to hide the rules and update the rulesBtn text.Below your if statement, add an else clause. Inside your else clause, update the text content for the rulesBtn by assigning it the string value of Show Rules.Below that, update the display property for your rulesContainer by assigning it the string value of none.
    else {
        rulesBtn.textContent = "Show Rules";
        rulesContainer.style.display = "none";
    }
});

//After a user makes a selection, they should be able to keep that score and move onto the next round.Add an event listener to your keepScoreBtn variable that takes in a click event for the first argument and an empty arrow function for the second argument.
keepScoreBtn.addEventListener("click", () => {
    //When a radio button is checked, you will need to save its value and id.Inside your event listener function, create two let variables called selectedValue, and achieved.
    let selectedValue;
    let achieved;
    //To figure out which selection was made, you will need to loop through each radio button to see which one has the checked attribute.Use a for...of loop to loop through each of the scoreInputs. The variable name for the for...of loop should be called radioButton.
    for (const radioButton of scoreInputs) {
        //If the current radio button inside the loop has the checked attribute, then you will need to get its value and id.Add an if statement inside your for...loop, with a condition of radioButton.checked.Inside your if statement, assign radioButton.value to selectedValue and assign radioButton.id to achieved.At the bottom of your if statement, add the break keyword to ensure that you break out of the loop when the selected radio button was found.
        if (radioButton.checked) {
            selectedValue = radioButton.value;
            achieved = radioButton.id;
            break;
        }
    }
    //If the user makes a selection, then the rounds, rolls and scores should be updated.Add an if statement, to check if selectedValue is truthy. If so, reassign the number 0 to rolls and increment round by 1.Then, call the updateStats and resetRadioOption functions. And lastly, call the updateScore function and pass in selectedValue and achieved for the arguments.
    if (selectedValue) {
        rolls = 0;
        round++;
        updateStats();
        resetRadioOption();
        updateScore(selectedValue, achieved);
        //At this point in the game, you are able to roll the dice, make a selection and play for a few rounds. However, you should notice that there is no end to the game and there are infinite rounds.According to the rules, there should be a total of six rounds and then the game ends with the final score.Inside the if statement for your keepScoreBtn event listener, add a new if statement to check if round is greater than the number 6.
        if (round > 6) {
            //Inside your if statement, add a setTimeout function that takes in a callback function and a delay set to 500 milliseconds.Inside your setTimeout function, add an alert with the message of Game Over! Your total score is ${totalScore}.
            setTimeout(() => {
                alert(`Game Over! Your total score is ${totalScore}`);
                //To reset the game after six rounds, you will need to call your resetGame function inside the keepScoreBtn event listener.
                resetGame();
            }, 500);
        }
    }//If you try to click on the keep score button without making a selection, then nothing happens.To fix this, add an else clause to your if statement, and place an alert inside. For your alert, use the following message: "Please select an option or roll the dice".
    else {
        alert("Please select an option or roll the dice");
    }
});
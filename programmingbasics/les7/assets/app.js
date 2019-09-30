//Array that holds the lap times for exercise 1 and 3
const lapRounds = [2.99, 3.00, 3.01, 4.01, 2.79, 2.88, 3.10, 4.12];

//Exercise 1: Random Element
function randomElement(array) {
    //Math.random gives random number between 0 and 1.
    //Mult by length to get random number between 0 and length;
    //Floor so its a whole number
    //return value
    return array[Math.floor(Math.random() * array.length)];
}
//log the random element :)
console.log(randomElement(lapRounds));


//Exercise 2: 2D array
//The 2d array that holds the records
const allMyRecords = [
    ["The Who - Pinball Wizard", "Rolling Stones - Exile on main street", "Police - Message in a bottle"],
    ["De Dijk - Alle 40 Goed", "Het Goede Doel - Belgie", "Doe Maar - skunk"]
];


function logging2D(array) {
    //loop through every element in the "first dimension" of the array
    for (let i = 0; i < array.length; i++) {
        //for every one of those elements, loop through their elements
        for (let j = 0; j < array[i].length; j++) {
            //log that element
            console.log(array[i][j]);
        }
    }
}
//Execute function
logging2D(allMyRecords);


//Exercise 3: Filter
//Take a argument 'time' and return it when it's less than 4.
function checkTime(value) {
    return value < this;
}
//Create a new array called filteredArray and fill it with the elements of lapRounds that are returned by checkTime.
const filteredArray = lapRounds.filter(checkTime, 4);
//Show the array
console.table(filteredArray);

//  The filter function is better because it's way faster to use and more easily reuseable.
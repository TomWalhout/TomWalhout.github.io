function even(getal) {
    //Geef een getal als input
    //var om resultaat in op te slaan
    let even;
    //Als getal deelbaar is door 2 is het een even getal
    if (getal % 2 == 0) {
        even = "even";
    } else {
        even = "oneven"
    }
    //print het resultaat
    console.log(`${getal} is ${even}`);
}


function deleteString(input) {
    let pos = input.indexOf(" not");
    input = input.slice(0, pos) + input.slice(pos + 4, input.length);
    console.log(input);
}


function compare(num, str) {
    //Comparing a number to a string doesn't work very well because they're different datatypes.
    //"1400" is not the same as 1400 and definitely not the same as "Ik woon in Naboo".
    if (num == str) {
        console.log("Yup :)");
    } else {
        console.log("Nup :(");
    }
}
even(50);
deleteString("Programming is not so cool");
compare(1400, "Ik woon in Naboo");
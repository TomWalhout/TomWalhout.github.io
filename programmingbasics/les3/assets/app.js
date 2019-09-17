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
    input = input.replace(" not", "");
    console.log(input);
}


function compare(num, str) {
    /* Comparing a number to a string doesn't work very well because they're different datatypes.
    "1400" is not the same as 1400 and definitely not the same as "Ik woon in Naboo".
    If you made 1400 a string and you add them together you'd get "1400Ik woon in Naboo". \
    If you made the string a number you'd get NaN. 
    Long story short, don't compare different datatypes with each other. 
    (Maybe use === to ensure the datatypes are the same)*/
    if (num == str) {
        console.log(`Yup, ${num} is hetzelfde als ${str}`);
    } else {
        console.log(`Nope, "${num}" is niet hetzelfde als "${str}"`);
    }
}
even(50);
deleteString("Programming is not so cool");
compare(1400, "Ik woon in Naboo");
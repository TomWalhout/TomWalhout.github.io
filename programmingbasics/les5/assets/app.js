//kijk voor reeks getallen of deelbaar door 4
i = 0;
let stop = 20;
//zolang i minder is dan 20
while (i < stop) {
    //als i deelbaar is door 4
    if (i % 4 == 0) {
        console.log(`${i} is deelbaar door vier.`);
    } else {
        console.log(`${i} is niet deelbaar door vier`);
    }
    //tel 1 bij i op
    i++;
}

//Fibonacci
let fib1 = 1;
let fib2 = 1;
i = 0;
//log de eerste twee getallen buiten de loop
console.log(fib1);
console.log(fib2);

while (i < 8) {
    //tel 1 bij i op
    i++;
    //Een tijdelijke var om het volgende cijfer in op te slaan
    let temp = fib1 + fib2;
    //het eerste getal is nu het tweede
    fib1 = fib2;
    //het nieuwe getal is nu getal 2
    fib2 = temp;
    //log het nieuwe getal zodat de reeks verder gaat
    console.log(fib2);
}


//Tel array op
let array = [2, 4, 8, 9, 12, 13];
//var om resultaat in op te slaan
let result = 0;
let message = "";

//net zo vaak als dat er elementen in het array zitten
for (let i = 0; i < array.length; i++) {
    //tel de waarde van dit element bij result op.
    result += array[i];
    //Voeg het toe aan de opmerking
    message += " " + array[i] + " +";
}
//Let het resultaat zien
console.log(message + " = " + result);
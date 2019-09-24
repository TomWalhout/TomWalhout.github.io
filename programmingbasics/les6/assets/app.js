//functions

Fibonacci(1, 1, 20);
//declareer functie
function Fibonacci(fib1, fib2, amount) {
    //log de eerste twee getallen buiten de loop
    console.log(fib1);
    console.log(fib2);
    let i = 0;
    while (i < amount) {
        //tel 1 bij amount op
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
    console.log("Tot zover de Fibonacci");
}

//Countdown
countdown(2019);

function countdown(year) {
    //Tel van 10 tot 1
    for (let i = 10; i > 0; i--) {
        console.log(i);
    }
    //Gelukkig nieuwjaar
    console.log(`Happy ${year}!`);
    console.log("Tot zover de countdown")
}

//Hoisting
hoistingTest();

function hoistingTest() {
    //De var x is nog niet definieerd. JS haalt de declaratie naar boven
    x = 3;
    //y is ook nog niet definieerd. JS haalt wel de declaratie maar niet de initatie naar boven, dus y = null
    //null is geen getal dus 3 + null = NaN. Dit is ook wat je ziet in de console.
    x = y + 2;

    //Pas nadien de vars declareren. 
    var x;
    var y = 5;
    console.log(x);
    //Werkt niet met let/const

    //TL;DR De init blijft staan, een declaratie gaat naar boven.
}
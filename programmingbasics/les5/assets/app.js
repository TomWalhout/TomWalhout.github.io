//kijk voor reeks getallen of deelbaar door 4
i = 0;
let stop = 20;
while (i < stop) {
    if (i % 4 == 0) {
        console.log(`${i} is deelbaar door vier.`);
    } else {
        console.log(`${i} is niet deelbaar door vier`);
    }
    i++;
}

//Fibonacci
let fib1 = 1;
let fib2 = 1;
i = 0;
console.log(fib1);
console.log(fib2);
while (i < 8) {
    i++;
    let temp = fib1 + fib2;
    fib1 = fib2;
    fib2 = temp;
    console.log(temp);
}

//Tel array op
let array = [2, 4, 8, 9, 12, 13];
let result = 0;
let message = "";
for (let i = 0; i < array.length; i++) {
    result += array[i];
    message += " " + array[i] + " +";
}
console.log(message + " = " + result);
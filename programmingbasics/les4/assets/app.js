let currentAction = "Boolean";

if (currentAction == "Calculating") {
    let num = 0;
    let nextNum = num + 3;
    console.log(`${num} + 3 = ${nextNum}`);
    num = nextNum;
    nextNum = num - 50;
    console.log(`${num} - 50 = ${nextNum}`);
    num = nextNum;
    nextNum = num * 27;
    console.log(`${num} * 27 = ${nextNum}`);
    num = nextNum;
    nextNum = num / 4;
    console.log(`${num} / 4 = ${nextNum}`);

} else if (currentAction == "Strings") {
    let str = "This is a test string :)";
    console.log(str.toUpperCase());
    console.log(`The string "${str}" is ${str.length} chars long.`);
    console.log(`${str} contains the word "${str.match("test")}"`);
    console.log(`${str.substring(0, 14)} is the beginning of ${str}`);
    console.log(`The 9th char in ${str} is ${str.charAt(8)}`);

} else if (currentAction == "Boolean") {
    let cijfer = 5.4;
    console.log(`Je hebt een ${cijfer} gehaald.`)
    if (cijfer >= 5.5) {
        console.log("Dat is voldoende.");
    } else {
        console.log("Dat is onvoldoende.....");
    }

} else {
    console.log("lol no idea...");
}

let result;
console.log("Met if statements:");
for (let i = 0; i < 10; i += 0.1) {
    console.log(`${i} is ${resultCalc(i)}`);

}

function resultCalc(cijfer) {
    if (cijfer >= 9) {
        result = "uitmuntend";
    } else if (cijfer >= 7 && cijfer < 9) {
        result = "goed";
    } else if (cijfer >= 6 && cijfer < 7) {
        result = "voldoende";
    } else if (cijfer < 6) {
        result = "onvoldoende";
    }
    return result;
}
console.log("Met switch:");
for (let i = 0; i < 10; i++) {
    console.log(`${i} is ${switchResult(i)}`);
}


function switchResult(cijfer) {
    switch (cijfer) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            result = "onvoldoende";
            break;
        case 6:
            result = "voldoende";
            break;
        case 7:
        case 8:
            result = "goed";
            break;
        case 9:
        case 10:
            result = "uitmuntend";
            break;
    }
    return result;
}


let purchasedBook = true;
let job = "teacher";
let inTrain = false;

if (purchasedBook && inTrain && job == "teacher") {
    console.log("Finally I can enjoy my book");
} else if (purchasedBook && job == "teacher") {
    console.log("If only I was in the train so I could read my book...");
} else if (inTrain && job == "teacher") {
    console.log("I should buy a book to read");
} else if (inTrain && purchasedBook) {
    console.log("I'm not a teacher so apperently I'm not allowed to read in the train?");
} else {
    console.log("There are things missing from my life...");
}
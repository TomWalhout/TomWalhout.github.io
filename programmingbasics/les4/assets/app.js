//Var voor resultaat
let result;
console.log("Met if statements:");
//laat alle mogelijkheden zien
for (let i = 0; i < 10; i += 0.1) {
    console.log(`${i} is ${resultCalc(i)}`);

}
//Als het cijfer hoger is dan 9 dan uitmuntend, tussen 7 en 9 dan goed etc...
function resultCalc(cijfer) {
    if (cijfer >= 9) {
        result = "uitmuntend";
    } else if (cijfer >= 7 && cijfer < 9) { //&& < cijfer 9 is eigenlijk overbodig omdat in dat geval de bovenste statement gepakt wordt 
        result = "goed";
    } else if (cijfer >= 6 && cijfer < 7) {
        result = "voldoende";
    } else if (cijfer < 6) {
        result = "onvoldoende";
    }
    //Geef resultaat terug
    return result;
}

//Zelfde opdracht maar met switch
console.log("Met switch:");
//Laat alle resultaten zien
for (let i = 0; i < 10; i++) {
    console.log(`${i} is ${switchResult(i)}`);
}

//Deze werkt alleen met ints want 100 cases is te veel. 
//Kijk wat het cijfer is en geef het bijbehoorende resultaat
//Deze opdracht is onzin om met switch te doen ¯\_(ツ)_/¯
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
    //Geef het resultaat terug
    return result;
}


//Init vars
let purchasedBook = true;
let job = "teacher";
let inTrain = false;

//Check for combinations of vars and give the corresponding comment.
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
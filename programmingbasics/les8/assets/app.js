let me = {
    name: "Anoniem",
    age: 3141592,
    previousDiploma: "VWO",
    vervoer: {
        wielen: 2,
        naam: "Zundapp"
    },
    namen: ["Finn de poes", "mama", "papa", "Jesse", "Sanne"],

    vervoerFunction: function(v) {
        if (v == 0) {
            return this.vervoer.wielen;
        } else {
            return this.vervoer.naam;
        }
    }
};

console.log(`Mijn favoriete vervoersmiddels is de ${me.vervoerFunction(1)} en die heeft ${me.vervoerFunction(0)} wielen.`)



me.namen.forEach(function(v) {
    console.log(v);
});



//Exercise 1: Lap Rounds
//The original array
const lapRound = [55.99, 63.00, 63.01, 54.01, 62.79, 52.88, 53.10, 54.12];
//Since the values are laprounds, the only thing that really makes sense is numbering them
const lapRounds = {
    //key: value,
    lap1: 55.99,
    lap2: 63,
    lap3: 63.01,
    lap4: 54.01,
    lap5: 62.79,
    lap6: 52.88,
    lap7: 53.10,
    lap8: 54.12
}

//Exercise 2: Teachers
//Given array
const teachers = [{
        name: "Loek",
        profession: "Teacher",
        brand: "Linux"
    },
    {
        name: "Daan",
        profession: "Teacher",
        brand: "Arduino"
    },
    {
        name: "Rimmert",
        profession: "Teacher",
        brand: "Apple"
    }
];

//Loop through every object in teachers
teachers.forEach(function(value) {
    // give the profession property from value (which is the current teacher)
    // etc 
    console.log(`I have a ${value.profession} named ${value.name} and he likes to work on a ${value.brand} computer.`);
});

//Exercise 3: salary
//adding  properties
for (let i = 0; i < teachers.length; i++) {
    //A hypothetical 40 hours a week
    teachers[i].hoursPerWeek = Math.floor(Math.random() * 40) + 38;
    //Monthly salary 
    teachers[i].salary = 3500;
    //salary is a function that returns an hourly salary based on hours per week and salary 
    teachers[i].salaryPerHour = function() {
        // 12 months in a year = 52 weeks so month to week is * 12 / 52 which is not / 4
        // Then divide by hoursPerWeek and done 
        return teachers[i].salary * 12 / 52 / teachers[i].hoursPerWeek;
    }
}

teachers.forEach(function(value, index, arr) {
    console.log(`${value.name} verdient ${value.salaryPerHour()} per uur`);
})
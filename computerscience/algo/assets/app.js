const array = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

function e1() {
    array.forEach(function(value) {
        console.log(value);
    });
}

//e1();

function e2() {
    array.forEach(function(value, index) {
        if (index % 2 == 1) {
            console.log(value);
        }
    });
}

// e2();

function e4() {
    array.forEach(function(value, index) {
        console.log(value.charAt(0));
    });
}

e4();
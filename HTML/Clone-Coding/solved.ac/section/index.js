

function hoisting(x) {

    console.log(x); // 1

    var x;

    console.log(x); // 2

    var x = 2;

    console.log(x); // 3
}

hoisting(1) // 호출
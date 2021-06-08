let car = {
    wheel: 4,
    engine: 2,
    color: {
        sheet: 'brown',
        handle: 'black',
        outlook: 'white',
    }
}

let bike = JSON.parse(JSON.stringify(car));

console.log(car)
console.log(bike)

console.log(car === bike)

car.color.handle = 'red';

console.log(car)
console.log(bike)





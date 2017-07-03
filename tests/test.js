const sorter = require('../index')

let argument = [{
    "name": "Alex"
},{
    "name": "Derek"
},{
    "name": "Ayush",
    "age": 23
},{
    "name": "Ayush",
    "age": 22
},{
    "name": "sam",
    "age": 23,
    "country" : {
        "name":"United States of America",
        "code":"US",
    }
},{
    "name": "sam",
    "age": 23,
    "country" : {
        "name":"France",
        "code":"FR",
    }
},{
    "name": "Brian"
},{

}];


let expectedResult = [ {},
  { name: 'sam',
    age: 23,
    country: { name: 'United States of America', code: 'US' } },
  { name: 'sam', age: 23, country: { name: 'France', code: 'FR' } },
  { name: 'Derek' },
  { name: 'Brian' },
  { name: 'Ayush', age: 22 },
  { name: 'Ayush', age: 23 },
  { name: 'Alex' } ];


if(JSON.stringify(sorter.doSort(argument,{'name':-1,'age':1,'country.name':-1})) === JSON.stringify(expectedResult)) {
    console.log('Test Passed');
} else {
    console.log('Test Failed');
}

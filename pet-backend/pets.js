
var Pet = require('./petClass');

module.exports = {
    pets: [
        new Pet(1, 1, "Buddy", "dog", "alive", "2019-10-07"), 
        new Pet(4, 1, "Lisa", "dog", "alive", "2022-04-13"), 
        new Pet(2, 2, "Elmo", "cat", "deceased", "2008-12-22"), 
        new Pet(5, 2, "Lily", "dog", "alive", "2016-05-30"), 
        new Pet(6, 2, "Kenny", "cat", "alive", "2018-02-09"), 
        new Pet(3, 3, "Rose", "cat", "alive", "2023-06-01")
    ],
    nextId: 7
}
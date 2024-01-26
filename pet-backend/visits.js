
var Visit = require('./visitClass');

module.exports = {
    visits: [
        new Visit(1, 2, "2023-10-26", ""),
        new Visit(2, 3, "2023-10-29", ""),
        new Visit(3, 4, "2023-11-01", ""),
        new Visit(4, 5, "2023-11-02", ""),
        new Visit(5, 5, "2023-11-06", ""),
        new Visit(6, 1, "2023-11-06", ""),
        new Visit(7, 3, "2023-11-07", ""),
        new Visit(8, 3, "2023-11-08", ""),
    ],
    nextId: 9
};
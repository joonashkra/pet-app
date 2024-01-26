
var Visit = require('./visitClass');
const visits = require('./visits');


module.exports = function(req, res, checkAuthHeader, visits, pets) {
    var user;
    try {
        user = checkAuthHeader(req);
    }
    catch(e)
    {
        res.statusCode = 401;
        res.json();
    }

    if(req.body.date === undefined)
    {
        res.status(400).json({"error": "Required parameter 'date' was not provided."});
        return;
    }

    if(req.body.petId === undefined)
    {
        res.status(400).json({"error": "Required parameter 'petId' was not provided."});
        return;
    }

    if(user > 0 && req.body.comment === undefined)
    {
        res.status(400).json({"error": "Required parameter 'comment' was not provided."});
        return;
    }

    var petId = req.body.petId;
    if(Number.isInteger(petId) === false)
    {
        res.statusCode = 400;
        res.json("Invalid parameter value: petId");
        return;
    }

    var allPets;
    switch(user) {
        case 0: allPets = pets.pets; break;
        case 1: allPets = pets.pets.filter(p => p.ownerId === 1); break;
        case 2: allPets = pets.pets.filter(p => p.ownerId === 2); break;
        case 3: allPets = pets.pets.filter(p => p.ownerId === 3); break;
    }

    var pet = allPets.find((p) => p.id === petId);
    if(pet === undefined)
    {
        res.status(404).json("A pet with the specified ID=" + petId+" could not be found.");
        return;
    }
    
    var newVisit = new Visit(visits.nextId++, petId, req.body.date, req.body.comment);
    visits.visits.push(newVisit);

    res.json({
        "message": "Visit successfully created",
        "visit": newVisit
    });
}
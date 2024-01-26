
var Pet = require('./petClass');


module.exports = function(req, res, checkAuthHeader, pets) {
    var user;
    try {
        user = checkAuthHeader(req);
    }
    catch(e)
    {
        res.statusCode = 401;
        res.json();
    }

    if(req.body.name === undefined)
    {
        res.status(400).json({"error": "Required parameter 'name' was not provided."});
        return;
    }

    if(req.body.petType === undefined)
    {
        res.status(400).json({"error": "Required parameter 'petType' was not provided."});
        return;
    }

    if(req.body.dob === undefined)
    {
        res.status(400).json({"error": "Required parameter 'dob' was not provided."});
        return;
    }

    if(req.body.ownerId === undefined)
    {
        res.status(400).json({"error": "Required parameter 'ownerId' was not provided."});
        return;
    }

    var newPet = new Pet(pets.nextId++, req.body.ownerId, req.body.name, req.body.petType, "alive", req.body.dob);
    pets.pets.push(newPet);

    res.json({
        "message": "Pet successfully created",
        "pet": newPet
    });
}
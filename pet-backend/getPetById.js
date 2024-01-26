


module.exports = function(req, res, checkAuthHeader, pets) {
    var allPets;
    try {
        var user = checkAuthHeader(req);
        
        switch(user) {
            case 0: allPets = pets.pets; break;
            case 1: allPets = pets.pets.filter(p => p.ownerId === 1); break;
            case 2: allPets = pets.pets.filter(p => p.ownerId === 2); break;
            case 3: allPets = pets.pets.filter(p => p.ownerId === 3); break;
        }
    }
    catch(e)
    {
        console.log(e);
        res.statusCode = 401;
        res.json();
    }

    var petId = parseInt(req.params.petId);
    console.log("Fetching pet by ID: " + petId);

    if(Number.isInteger(petId) === false)
    {
        res.statusCode = 400;
        res.json("Invalid parameter value: petId");
        return;
    }

    if(petId < 1) {
        res.statusCode = 400;
        res.json("petId must be >= 1.");
        return;
    }

    var pet = allPets.find((p) => p.id === petId);
    if(pet !== undefined)
    {
        res.json(pet);
        return;
    }
    else {
        res.status(404).json("A pet with the specified ID=" + petId+" could not be found.");
    }
}
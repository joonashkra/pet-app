
var Pet = require('./petClass');


module.exports = function(req, res, checkAuthHeader, pets) {

    try {
        var user = checkAuthHeader(req);
        
        if(user !== 0) {
            res.status(403).json({"error": "You do not have permission to do this."});
            return;
        }
    }
    catch(e)
    {
        console.log(e);
        res.statusCode = 401;
        res.json();
    }

    var petId = parseInt(req.params.petId);
    var allPets = pets.pets;

    if(req.body.status === undefined)
    {
        res.status(400).json({"error": "Required parameter 'status' was not provided."});
        return;
    }

    var newStatus = req.body.status;
    if(newStatus !== "alive" && newStatus !== "deceased" && newStatus !== "missing" && newStatus !== "other") {
        res.status(422).json({"error": "Invalid value provided for parameter 'status'."});
        return;
    }

    var doctorsComment = req.body.comment;

    var pet = allPets.find((p) => p.id === petId);
    if(pet === undefined) {
        res.status(404).json({"error": "The pet with ID=" + petId + " could not be found."});
        return;
    }
    
    pet.status = req.body.status;
    if(doctorsComment !== undefined) {
        pet.doctorsComment = doctorsComment;
    }

    res.json({
        "message": "Pet successfully updated",
        "pet": pet
    });
}



module.exports = function(req, res, checkAuthHeader, visits, pets) {
    try {
        var user = checkAuthHeader(req);

        if(user === 0)
        {
            res.json(visits.visits);
            return;
        }
        else {
            var pets = pets.pets.filter(p => p.ownerId === user);
            var petIds = pets.map(p => p.id);
            //console.log(petIds);
            var visits = visits.visits.filter(v => petIds.includes(v.petId));

            res.json(visits);
        }
    }
    catch(e)
    {
        console.log(e);
        res.statusCode = 401;
        res.json();
    }
}
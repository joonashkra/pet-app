
module.exports = function(req, res, checkAuthHeader, pets) {
    try {
        var user = checkAuthHeader(req);
        
        switch(user) {
            case 0: res.json(pets.pets); return;
            case 1: res.json(pets.pets.filter(p => p.ownerId == 1)); return;
            case 2: res.json(pets.pets.filter(p => p.ownerId == 2)); return;
            case 3: res.json(pets.pets.filter(p => p.ownerId == 3)); return;
        }
    }
    catch(e)
    {
        console.log(e);
        res.statusCode = 401;
        res.json();
    }
}
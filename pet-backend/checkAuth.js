

class UnknownTokenError extends Error {

}

module.exports = function(req) {
    var authHeader = req.headers.authorization;
    if(authHeader === undefined || authHeader.startsWith("Bearer ") === false) {
        throw Error("Invalid token");
    }

    var token = authHeader.substring(7);
    if(token.localeCompare(doctorToken) === 0)
    {
        return 0;
    }
    else if(token.localeCompare(owner1Token) === 0)
    {
        return 1;
    }
    else if(token.localeCompare(owner2Token) === 0)
    {
        return 2;
    }
    else if(token.localeCompare(owner3Token) === 0)
    {
        return 3;
    }
    
    throw UnknownTokenError("Unknown token");
}


const doctorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng";
const owner1Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.QAtAc6Imr2-NDhRpPcobJfjA20vh_bDk3wMhL_-46Fw";
const owner2Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.DA59WWIUeZ-4v4XVyrbXqd9z1I-YlZRCz45oCuyU2T0";
const owner3Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Iiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.zqF-TVZor-FIGK_o3_5exzGJy1MuwkscYLjyS9pawVM";
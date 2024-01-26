module.exports = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if(email === "doctor@pets.com" && password === "Pet1234")
    {
        res.json(
            {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImRvY3RvciIsImlhdCI6MTUxNjIzOTAyMn0.0_MKcjJoHX-Vsjb4vVlWZLZMY-45nMQ22MTXUCAQgng",
                "id": 0
            }
            );
    }
    else if(email === "owner1@test.com" && password === "qwerty")
    {
        res.json(
            {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.QAtAc6Imr2-NDhRpPcobJfjA20vh_bDk3wMhL_-46Fw",
                "id": 1
            }
            );
    }
    else if(email === "owner2@woof.net" && password === "Bark!")
    {
        res.json(
            {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.DA59WWIUeZ-4v4XVyrbXqd9z1I-YlZRCz45oCuyU2T0",
                "id": 2
            }
        );
    }
    else if(email === "owner3@abc.org" && password === "_Dog2023")
    {
        res.json(
            {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0Iiwicm9sZSI6InBldF9vd25lciIsImlhdCI6MTUxNjIzOTAyMn0.zqF-TVZor-FIGK_o3_5exzGJy1MuwkscYLjyS9pawVM",
                "id": 3
            }
        );
    }
    else {
        res.statusCode = 401;
        res.json("The submitted credentials could not be validated. Please check your input.");
    }
}


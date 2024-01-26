module.exports = function(req, res, checkAuthHeader, users) {
    try {
        var user = checkAuthHeader(req);
        
        if(user !== 0) {
            // Don't allow anyone but the doctor to list users in the customer registry
            res.status(403).json({"error": "You do not have permission to do this."});
            return;
        }

        res.json(users.users);
    }
    catch(e)
    {
        console.log(e);
        res.statusCode = 401;
        res.json();
    }
}
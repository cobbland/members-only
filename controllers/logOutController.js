// functions
async function postLogOut(req, res, next) {
    req.logOut(function(err) {
        if (err) {
            return next(err)
        }
        res.redirect('/');
    }); 
}

//exports
module.exports = {
    postLogOut,
}
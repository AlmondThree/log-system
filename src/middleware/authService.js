const authenticationAPIKey = (req, res, next) => {
    let authHeader = req.header("x-api-key");

    if(authHeader == 'rwuy6434tgdgjhtiojiosi838tjue3') {next()} else {res.status(401); res.send({message:'Unauthorize access'});}

}

module.exports = {authenticationAPIKey}
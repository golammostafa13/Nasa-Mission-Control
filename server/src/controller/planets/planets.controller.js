const { getPlanets } = require("../../models/planets.model");


function httpGetPlanets(req, res){
    console.log(getPlanets());
    return res.status(200).json(getPlanets());
}

module.exports = {
    httpGetPlanets,
}
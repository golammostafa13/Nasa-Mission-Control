const { getLaunches, addNewLaunch, abortLaunchWithId, existLaunchWithId } = require('../../models/launches.model');

function httpGetLaunches(req, res){
    return res.status(200).json(getLaunches());
}

function httpAbortLaunch(req, res){
    const id = Number(req.params.id);
    
    if(!existLaunchWithId(id)){
        return res.status(404).json({
            error: "Launch Not Found",
        });
    }else{
        const deleted = abortLaunchWithId(id);
        return res.status(200).json(deleted);
    }
}

function httpAddNewLaunch(req, res){
    let launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.target || !launch.launchDate){
        return res.status(400).json({
            error: 'Missing launch information',
        });
    }

    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

module.exports = {
    httpGetLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}
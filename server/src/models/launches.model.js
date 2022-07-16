const launches = new Map();
let flightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('July 15, 2022'),
    target: 'Kepler-442 b',
    customers: ['Mim', 'Mostafa'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function getLaunches(){
    return Array.from(launches.values());
}

function existLaunchWithId(id){
    // id is equal to flightNumber
    return launches.has(id);
}

function abortLaunchWithId(id) {
    console.log(id);
    const deleted = launches.get(id);
    deleted.upcoming = false;
    deleted.success = false;
    return deleted;
}

function addNewLaunch(launch){
    flightNumber++;
    launches.set(
        flightNumber,
        Object.assign(launch, {
            flightNumber,
            upcoming: true,
            success: true,
            customers: ['NASA', 'NOAA'],
        })
    );
}

module.exports = {
    existLaunchWithId,
    getLaunches,
    addNewLaunch,
    abortLaunchWithId,
}
const http = require('http');
const app = require('./app.js');
const { loadPlanet } = require('./models/planets.model.js');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer(){
    await loadPlanet();
    server.listen(PORT, () => {
        console.log(`server is listening at ${PORT}...`);
    });
}

startServer();
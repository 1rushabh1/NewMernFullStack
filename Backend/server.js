const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors({
    origin: "https://newmernfullstack-1.onrender.com",
    credentials: true
}));


const server = http.createServer(app);

initializeSocket(server);

server.listen(port,"0.0.0.0",() => {
    console.log(`Server is running on port ${port}`);
});
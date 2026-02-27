const http = require('http');
const app = require('./app');  
const port = process.env.PORT || 8100;     

const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`Server is Running On port ${port}`);
});
const http = require('http')
const app = require('./app')
const {initSocket} = require('./socket')
const port = process.env.PORT || 3000

const server = http.createServer(app);

initSocket(server);

server.listen(port, function(){
  console.log(`Server is running on port ${port}`)
})
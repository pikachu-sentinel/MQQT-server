// var mqtt = require('mqtt')
// var client  = mqtt.connect('mqtt://localhost:1884')

// client.on('connect', function () {
//   client.subscribe('process/state', function (err) {
//     if (!err) {
//       console.log("Subscribed to 'process/state' topic")
//     }
//   })
// })

// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
// })

const express = require('express');
const app = express();
app.use(express.json());

let clientStatuses = {};

app.post('/report-status', (req, res) => {
    let clientId = req.body.clientId;
    let status = req.body.status;

    // Store the status update
    clientStatuses[clientId] = status;

    console.log(`Received status from client ${clientId}: ${status}`);
    res.send('Status update received');
});

app.get('/status', (req, res) => {
    res.json(clientStatuses);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
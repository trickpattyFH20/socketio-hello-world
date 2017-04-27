(() => {
    console.log( 'node server started at: ' + new Date().toLocaleString() );
    console.log( 'visit http://localhost:8000 in your browser' );
    const socketio = require('socket.io');
    const http = require('http');
    const fs = require('fs');
    const server = http.createServer().listen(8080);

    const io = socketio(server);

    io.on('connection', socket => {

        socket.emit('woohoo_yay_websockets', {
            foo: 'bar'
        });

        setTimeout(() => {
            socket.emit('another_example_event', {
                baz: '123',
                moar: '456'
            });
        }, 2000);

    });

    const index = fs.readFileSync('index.html');

    http.createServer( (req, res) => {
        res.writeHead(200, {'Content-Type': 'html'});
        res.end(index);
    }).listen(8000);

})();

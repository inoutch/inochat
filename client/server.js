const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

function createServer() {
    const server = express();
    server.get('/rooms/add', (req, res) => app.render(req, res, '/rooms/add'));
    server.get('/rooms/show', (req, res) => app.render(req, res, '/rooms/show'));
    server.get('/rooms/:id', (req, res) => {
        const params = { id: req.params.id };
        return app.render(req, res, '/rooms/show', params);
    });
    server.get('*', (req, res) => handle(req, res));
    return server;
}

app.prepare().then(() => {
    const server = createServer();
    server.listen(port);
});
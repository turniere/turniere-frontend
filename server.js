const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get('/t/:code', (req, res) => {
            const actualPage = '/tournament';
            const queryParam = { code: req.params.code };
            app.render(req, res, actualPage, queryParam);
        });

        server.get('/t/:code/fullscreen', (req, res) => {
            const actualPage = '/tournament-fullscreen';
            const queryParam = { code: req.params.code };
            app.render(req, res, actualPage, queryParam);
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(3000, (err) => {
            if (err) throw err;
        });
    })
    .catch(() => {
        process.exit(1);
    });

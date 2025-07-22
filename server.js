

// server.js
import express from 'express'
import next from 'next';
import bodyParser from 'body-parser'

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();




app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json({ limit: '30mb' }));
  server.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));


  server.use((req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    next();
  });


  server.use(express.static(process.cwd() + '/public'));



  // Default Next.js handler (handles everything else, including pages and API routes)
  server.all('{/*path}', (req, res) => {
    return handle(req, res);
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});

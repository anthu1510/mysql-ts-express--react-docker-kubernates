import dotEnv from 'dotenv';
import http from 'http';
import app from './app';

dotEnv.config();
const port: number = Number(process.env.PORT) || 7070;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

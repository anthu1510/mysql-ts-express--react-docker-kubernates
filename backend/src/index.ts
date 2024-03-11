import 'dotenv/config';
import env from './utils/validateEnv';
import http from 'http';
import app from './app';

const port = env.PORT;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

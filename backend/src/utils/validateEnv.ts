import { cleanEnv, num, port, str } from 'envalid';

export default cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: port(),
  DATABASE_URL: str(),
  COOKIE_EXPIRE_TIME: num(),
  ACCESS_TOKEN_EXPIRE_TIME: str(),
  REFRESH_TOKEN_EXPIRE_TIME: str(),
  ACCESS_TOKEN_SECRET: str(),
  REFRESH_TOKEN_SECRET: str()
});

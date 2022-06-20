import dotenv from 'dotenv'
dotenv.config()

const DB_URL = `${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_DBNAME}`;
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

export {
  DB_URL,
  PORT,
  API_VERSION
}
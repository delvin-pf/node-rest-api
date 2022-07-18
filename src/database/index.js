import Sequelize from 'sequelize';
import 'dotenv/config';

const dbConfig = JSON.parse(process.env.DATABASE);

const database = new Sequelize(dbConfig);

try {
  database.authenticate();
  console.log('Database connection successfull')
} catch (error) {
  throw new Error('Database connection refused', error)  
}


export default database;
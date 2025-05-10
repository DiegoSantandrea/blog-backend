import { config } from "dotenv";
config();

import app from './configs/server.js'; // Asegúrate de que esta ruta sea correcta

import { registerSocketServer } from './src/io/io.js';

const server = new app();
server.listen();
registerSocketServer(server); // Asegúrate de pasar el servidor correcto


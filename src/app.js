import express from "express";
import routes from "./routes/index.js";
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRoutes from "./routes/views.routes.js";

const PORT = 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", handlebars.engine()); //inicia plantilla
app.set("views", __dirname + "/views"); //rutas que se encuentran las vistas
app.set("view engine", "handlebars"); //motor que utilizaremos , las vistas
app.use(express.static("public"));

app.use("/api", routes); // ruta de la appi
app.use("/", viewsRoutes); //ruta de las vistas

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`); //ruta de la vista
});

//configuracion de socket
export const io = new Server(httpServer);

io.on("connection", async (Socket) => {
  console.log("Nuevo usuario conectado");
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT, mongoDBURL } from "./config.js";
import ContactRoutes from "./routes/contactRoutes.js";
import contactService from "./services/contactService.js";
import { log } from "console";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export { io };

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

io.on("connection", (socket) => {
  socket.on("updateContact", async (data) => {
    const updatedContact = await contactService.updateContact(
      data.id,
      data.updatedData
    );

    socket.broadcast.emit("contactUpdated", updatedContact);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database.");
    httpServer.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/contacts", ContactRoutes);

import express from "express";
import path from "path";
import http from "http";
import cors from "cors";

// SERVER CONFIG
const PORT = process.env.PORT || 5001;
const app = express();
http.createServer(app).listen(PORT, () => console.log(`Listening on ${PORT}\n`));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "*" }));

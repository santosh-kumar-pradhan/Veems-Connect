import express from 'express';
import {createServer} from 'node:http';

import { Server } from 'socket.io';

import mongoose from 'mongoose';
import connectToSocket from './controller/socketManger.js';

import cors from 'cors';
import userRoutes from "./routes/users.routes.js"

const app = express();
const server=createServer(app);
const io=connectToSocket(server);


app.set("port",(process.env.PORT||8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);

const start=async()=>{
    const connectionDb=await mongoose.connect("mongodb+srv://santoshkumarpradhan660:veem1234@cluster0.3gytb7a.mongodb.net/")

    console.log(`MONGO Connected DB HOST: ${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("Listening On PORT 8000")
    });
}

start()
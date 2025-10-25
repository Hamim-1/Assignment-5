import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVArs } from "./app/config/env";
let server: Server;
const startServer = async () => {
    try {
        mongoose.connect(envVArs.DB_URL);
        console.log("Connected to DB");

        server = app.listen(5000, () => {
            console.log("Server is listening to port 5000");

        })

    } catch (error) {
        console.log(error);

    }
}

(async () => {
    await startServer();
})()

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    if (server) {
        console.log("Server Shutting down for unhandled error");

        server.close(() => {
            process.exit(1);
        })
    } else {
        process.exit(1)
    }

})


process.on("uncaughtException", (err) => {
    if (server) {
        console.log("Server Shutting down for unCaught error", err);

        server.close(() => {
            process.exit(1);
        })
    } else {
        process.exit(1)
    }

})


process.on("SIGTERM", () => {
    if (server) {
        console.log("SIGTERM signal recived... Server shitting down");

        server.close(() => {
            process.exit(1);
        })
    } else {
        process.exit(1)
    }

})


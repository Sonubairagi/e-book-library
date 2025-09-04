import app from "./src/app.ts";
import { config } from "./src/config/config.ts";
import connectDB from "./src/config/db.ts";
import createDebug from "debug";

const startServer = async () => {
    //Debug Setup
    const debug = createDebug("app:server");
    debug("Starting server...");

    //Database connection
    await connectDB();
    const port = config.port || 3000;

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
};

startServer();

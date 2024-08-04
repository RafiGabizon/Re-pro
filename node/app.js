const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { routesInit } = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

routesInit(app);

const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;

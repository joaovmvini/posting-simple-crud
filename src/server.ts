import e = require("express");
import routes from "./routes";

const express = e;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(require("path").resolve("public")));
app.use(routes);

app.listen(3000, () => console.log("listening port 3000..."));

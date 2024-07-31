//npm start: web server cua nodejs
//npm run watch
const express = require("express");
const morgan = require("morgan");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const path = require("path");

const route = require("./routes");

app.use(express.static(path.join(__dirname, "public")));
//HTTP logger
//app.use(morgan('combined'))
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//Template engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
    }),
);
   app.set("view engine", "hbs");
            app.set("views", path.join(__dirname, "resources/views"));

//Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

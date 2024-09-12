//npm start: web server cua nodejs
//npm run watch
const express = require("express");
const morgan = require("morgan");
const axios = require('axios');
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const path = require("path");
const methodOverride = require('method-override')

const SortMiddleware = require('./app/middlewares/SortMiddleware')
const CryptoPriceMiddleware = require('./app/middlewares/CryptoPriceMiddleware');

const route = require("./routes");
const db = require("./config/db");

//connect to db
db.connect()

app.use(express.static(path.join(__dirname, "public")));
//HTTP logger
//app.use(morgan('combined'))
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(methodOverride('_method'))

//custom middleware
app.use(SortMiddleware); 
app.use(CryptoPriceMiddleware);

//Template engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: require('./helpers/handlebars')
    }),
);
   app.set("view engine", "hbs");
            app.set("views", path.join(__dirname, 'resources','views'));

//Route init
route(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//npm start: web server cua nodejs
//npm run watch
const express = require("express");
const morgan = require("morgan");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;
const path = require("path");
const methodOverride = require('method-override')

const SortMiddleware = require('./app/middlewares/SortMiddleware')

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

//Template engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        helpers: {
            sum: (a,b) => a+b,
            sortable: (field, sort) =>{
                const  sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-up-wide-short',
                };                
                const types ={
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                    <i class="${icon}"></i>
                </a>`
            }
        }
    }),
);
   app.set("view engine", "hbs");
            app.set("views", path.join(__dirname, 'resources','views'));

//Route init
route(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

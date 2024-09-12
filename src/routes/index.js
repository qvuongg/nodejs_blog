const newsRouter = require("./news");
const meRouter = require("./me");
const coursesRouter = require("./courses");
const authRouter = require("./auth");
const siteRouter = require("./site");
// const headerRouter = require('./header');

function route(app) {
    // app.use('/', headerRouter); // Sử dụng 
    app.use("/news", newsRouter);
    app.use("/courses", coursesRouter);
    app.use("/me", meRouter);
    app.use("/auth", authRouter)
    app.use("/", siteRouter);

    

}

module.exports = route;

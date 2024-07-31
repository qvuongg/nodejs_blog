class SiteController {
    // Get /home/search
    search(req, res) {
        res.render("search");
    }
    // Get /home
    index(req, res) {
        res.render("home");
    }
}
module.exports = new SiteController();

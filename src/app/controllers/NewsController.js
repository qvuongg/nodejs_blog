class NewsController {
    show(req, res) {
        res.send("se la news/slug");
    }
    // Get /news/detail
    show2(req, res) {
        res.send("se la news/detail news");
    }
    // Get /news
    index(req, res) {
        res.send("Trang chủ tin tức");
    }
}
module.exports = new NewsController();

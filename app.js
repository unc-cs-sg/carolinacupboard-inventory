let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    morgan      = require("morgan"),
    config      = require("./config/server"),
    ejs         = require("ejs"),
    authService = require("./services/authorization-service");

app.engine("html", ejs.renderFile);

/*
 * Set up server parsing and logging
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
   
app.use(morgan(config.logging));

app.use(express.static('/views'));
app.use("/static", express.static("static"));

var middle = function(req, res, next) {
    var uid = req.get("HTTP_UID");
    console.log(uid);
    res.send(uid);
}

/*
 *Register routes on api 
 */
app.use("/", require("./controllers/index"));

app.get("/", function(req, res) {
    // let onyen = req.header("uid");
    let onyen = "austinyw";
    let userType = authService.getUserType(onyen);
    console.log(req.headers);
    res.render("index.ejs", {onyen: onyen, userType: userType});
});

app.get("/entry", function(req, res) {
    res.render("admin/entry.ejs");
});
  
app.get("/entry/scan", function(req, res) {
    res.render("admin/entry-scan.ejs");
});
  
app.get("/entry/search", function(req, res) {
    res.render("admin/entry-search.ejs");
});
  
app.get("/entry/manual", function(req, res) {
    res.render("admin/entry-manual.ejs", {response: null});
});
  
app.get("/approve", function(req, res) {
    res.render("admin/approve.ejs");
});
  
app.get("/removal", function(req, res) {
    res.render("admin/removal.ejs");
});
  
app.get("/preorder", function(req, res) {
    res.render("user/preorder.ejs");
});
  
app.get("/cart", function(req, res) {
    res.render("user/cart.ejs");
});
  
app.get("/history", function(req, res) {
    res.render("user/history.ejs");
});

module.exports = app;
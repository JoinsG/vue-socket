var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var mongodbClass = require("./mongodb/connect")
var webSoc = require('./WebSocket')
var {
    user,
    friend,
    userandfriendsmssage
} = require("./mongodb/schema");
module.exports = function (app) {
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
  

    app.use(bodyParser.json());
    app.all("*", function (req, res, next) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header("Access-Control-Allow-Origin", "*");
        //允许的header类型
        res.header("Access-Control-Allow-Headers", "content-type");
        res.header("Access-control-Allow-Headers", "xCors");
        //跨域允许的请求方式 
        res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
        if (req.method.toLowerCase() == 'options')
            res.send(200); //让options尝试请求快速结束
        else
            next();
    })


    app.get('/test', (req, res) => {
       
        res.send({
            code: 1
        })
    })


  
}
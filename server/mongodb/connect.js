const mongoose = require("mongoose");
let mo = null;
class mongodbClass {
    constructor(address, username, password) {
        if (!mongodbClass.createMongodb) {
            mo = this;
        } else {
            return mo;
        }

    }
    mongodbConnect() {
        if (this.connect) {
            console.log('数据库已经连接');
            return
        }
        this.connect = mongoose.createConnection(
            "mongodb://127.0.0.1:27017/vue-socket", {
                useNewUrlParser: true, //使用新的url解析
                useUnifiedTopology: true //新的服务器发现和监视引擎
            }
        )
        this.connect.on("open", () => {
            console.log('当mongodb成功连接数据库之后会打印这个日志');
        })
        this.connect.on("close", (error) => {
            console.log('如果连接断开了,会接收到这个消息', error);
        })
        this.connect.on("error", (error) => {
            console.log('如果连接失败了,会把失败的原因传递给', error);
        })
    }
    mongodbClose() {
        this.connect.close(function () {
            console.log('关闭连接')
        })
    }
    static createMongodb(address, username, password) {
        if (!mo) {
            mo = new mongodbClass(address, username, password)
            return mo
        }
        return mo
    }
}

mongodbClass.createMongodb().mongodbConnect();

module.exports = mo.connect





// // //连接数据库

// var mongoose = require('mongoose');

// //useNewUrlParser这个属性会在url里识别验证用户所需的db,未升级前是不需要指定的,升级到一定要指定。

// mongoose.connect('mongodb://127.0.0.1:27017/vue-socket', {
//     useNewUrlParser: true
// }, function (err) {
//     if (err) {

//         console.log(err);
//         return;
//     }
//     console.log('数据库连接成功')
// });

// module.exports = mongoose;
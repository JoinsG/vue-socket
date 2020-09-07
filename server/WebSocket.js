var WebSocket = require('ws');
var {UserCheck,updateUserMessage} =require('./router/userUtils/userUtils')
var wss = new WebSocket.Server({
    port: 9000
});

class socketWatch {
    constructor() {
        this.socketClient = {}
        this.client = wss.clients
    }


    checkWssIsHas(id) {
        if (this.client.has(id)) {
            return true
        }
        this.socketClient[id] = null
        return false
    }

    acceptMessage(val){
        updateUserMessage(val.messageId,val.messageData)
        if(this.checkWssIsHas(val.to)){
            this.socketClient[val.to].send(val.message)
        }
    }
}
const Sw = new socketWatch()

wss.on('connection', function (ws) {
    console.log('server: 收到连接');
    ws.on('message', function (message) {
        console.log('server: 收到消息', message);
        let msgData = JSON.parse(message);
        if (msgData.type) {
            Sw.socketClient[msgData.userId] = ws
        }else{
            Sw.acceptMessage(msgData)
        }
    });
    
    ws.on("error", function (message) {
        console.log("出错了")
    })
    ws.on("close", function (message) {
        console.log(message);
        console.log("关闭成功!")
        ws.close()
    })
})
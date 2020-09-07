var {
    user,
    friend,
    userandfriendsmssage
} = require("../mongodb/schema");
var promiseTryCatch = require("./../../utils/promiseTryCatch")

var {
    UserCheck
} = require("./userUtils/userUtils")

function serRes(res, data) {
    return res.send({
        ...data
    })
}

var User = function (app) {
    app.get('/user/check', async (req, res) => {
        let {
            username,
            password
        } = req.query;
        let [success, err] = await promiseTryCatch(
            user.findOne({
                '_id': username
            })
        )
        if (success) {
            res.send({
                code: 1,
                success
            })
        } else {
            res.send({
                code: 0,
                err
            })
        }
    })


    app.post('/user/createUser', async (req, res) => {
        let {
            username,
            password
        } = req.body;


        if (await UserCheck([{
                username
            }])) {
            res.send({
                status: 0,
                errInfo: '该用户已经存在！'
            })
        } else {
            let createUser = await promiseTryCatch(user.create({
                username: username,
                password: password
            }))

            if (createUser[0]) {
                let createFriend = await promiseTryCatch(friend.create({
                    userId: createUser[0]._id,
                    friends: []
                }))
                if (createFriend[0]) {
                    res.send({
                        status: 1,
                        data: createFriend[0]
                    })
                } else {
                    res.send({
                        status: 0,
                        errInfo: '创建用户朋友列表失败'
                    })
                }

            } else {
                res.send({
                    status: 0,
                    errInfo: '创建用户失败'
                })
            }
        }

    })
    app.post('/user/addFriend', async (req, res) => {
        let {
            userId,
            friendID
        } = req.body;
        console.log(req.body);
        
        let userFr = await promiseTryCatch(userandfriendsmssage.create({}))
        let b = await promiseTryCatch(friend.update({
            "userId": userId
        }, {
            $push: {
                "friends": {
                    'friendId': friendID,
                    'messages': userFr[0]._id
                }
            }
        }))
        res.send({
            data:b
        })
    })
    // ObjectId("5f3e91ab77c62d5ab068733d")
    app.get('/user/getFriendInfo', async (req, res) => {
        // ObjectId("5f3e8f1c735af8468cecb82a")
        friend.find({
            "_id": '5f3e95bb37c6d75944e1b632'
        }).populate(["userId", "friends.friendId"]).then(doc => {
            res.send({
                doc
            })
        })

    })
    //获取朋友列表
    app.get('/user/friends', async (req, res) => {
        let {
            id
        } = req.query;
        console.log(req.query);
        console.log(req.params);
        console.log(req.body);

        [success, err] = await promiseTryCatch(friend.findOne({
            'userId': id
        }))
        console.log(success);

        if (success) {
            res.send({
                success
            })
        } else {
            res.send({
                err
            })
        }
    })

    app.post('/user/login', async (req, res) => {
        let {
            username,
            password
        } = req.body;
        let [success, err] = await promiseTryCatch(user.find({
            "username": username,
            "password": password
        }))
        let data = {};
        if (success) {
            data = {
                success,
                code: 1
            }
        } else {
            data = {
                err,
                code: 0
            }
        }
        res.send(data)
    })

}
module.exports = User
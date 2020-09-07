// var mongoose = require('./connect');
var mongoose = require('mongoose');

var db = require('./connect')

// let users = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         default: '某某'
//     },
//     password: {
//         type: String,
//         required: true,
//         default: '12345'
//     },
// });

var users = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        default: '某某'
    },
    password: {
        type: String,
        required: true,
        default: '12345'
    },
});


let friends = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' //这里首字母一定不能大写，不然当后续使用populate时候会导致无法关联查询
    },
    friends: [{
        friendId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user' //这里首字母一定不能大写，不然当后续使用populate时候会导致无法关联查询
        },
        messages: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userandfriendsmssage' //这里首字母一定不能大写，不
        }
    }],
})

let userandfriendsmssages = new mongoose.Schema({
    messages: [{
        from: {
            type: String,
        },
        to: {
            type: String,
        },
        messages: {
            type: String
        }
    }]
})
var user = db.model('user', users);
var friend = db.model('friend', friends);
var userandfriendsmssage = db.model('userandfriendsmssage', userandfriendsmssages);

// let user = mongoose.model('user', users)
// let friend = mongoose.model('friend', friends)
// let userandfriendsmssage = mongoose.model('userandfriendsmssage', userandfriendsmssages)


module.exports = {
    user,
    friend,
    userandfriendsmssage
}


// var UserSchema=mongoose.Schema({
//     name:String,
//     age:Number,
//     status:{
//         type:Number,
//         default:1   
//     }
// })



// module.exports=mongoose.model('User',UserSchema,'user');
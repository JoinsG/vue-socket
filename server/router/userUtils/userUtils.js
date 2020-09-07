var {
    user,
    friend,
    userandfriendsmssage
} = require("./../../mongodb/schema");

var promiseTryCatch = require("./../../../utils/promiseTryCatch");
var UserCheck = async function (options) {
    let [success, err] = await promiseTryCatch(
        user.findOne(...options)
    )
    if (success !== null) {
        return true;
    } else {
        return false;
    }
}


var updateUserMessage = async function (id, message) {
    let [success, err] = await promiseTryCatch(
        userandfriendsmssage.findOne({
            '_id': id,
        }, {
            $push: {
                'message': message
            }
        })
    )
    return [success, err]
}

module.exports = {
    updateUserMessage,
    UserCheck

}
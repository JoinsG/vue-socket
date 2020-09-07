promiseTryCatch =async function (cb) {
    let success, err;
    try {
        await cb.then(res => {
            success = res;
        })
        return [success, undefined]
    } catch {
        return [undefined, err]
    }
}

module.exports = promiseTryCatch
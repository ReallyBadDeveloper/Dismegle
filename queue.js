var queue = [];
exports.startQueue = (threadid, userid) => {
    for (var i in queue) {
        if (queue[i].uid === userid) {
            return 'ALREADY_IN_QUEUE';
        } else {
            queue.push({
                channelid: threadid,
                uid: userid,
                connection: undefined
            });
        }
    }
    for (var i in queue) {
        if (!queue[i].connection) {
            if (queue[i].uid === userid) {
                return;
            } else {
                queue[i].connection = {
                    u2id: userid,
                    channel2id: threadid
                };
            }
        }
    }
}

/*
    queue object format:
    {
        channelid: int,
        uid: int,
        connection: undefined / {
            u2id: int,
            channel2id: int
        }
    }
*/

exports.getQueue = () => {

}
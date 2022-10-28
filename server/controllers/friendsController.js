const friends = require('../model/friendsModel')
const User = require('../model/userModel')

module.exports.getFriends = async (req, res,next) => {
    const {id_user} = req.body
    try{
        var query = [{'$match':{'id_user': id_user}},{'$unwind': '$friends'},{'$replaceWith':'$friends'},{'$group':{'_id':'$id_friend'}},{'$lookup':{'from':'users','localField':'_id','foreignField':'_id','as':'user'}},{'$unwind':'$user'},{'$replaceWith':'$user'}]
        console.log(query)
        const friendAcepted = await friends.aggregate(query);
        res.json(friendAcepted)
    }
    catch (ex) {
        next(ex)
    }
}
//Add friend
// db.friends.update({'id_user':1},{'$push':{'friends': {'id_room':4,'id_friend':4}}})

module.exports.addFriends = async (req, res, next) => {
    const {id_user, id_friend, id_room} = req.body
    try {
        var query = {'$push':{'friends': {'id_room': id_room,'id_friend': id_friend}}};
        var query2 = {'$push':{'friends': {'id_room': id_room,'id_friend': id_user}}};
        console.log(query)
        const status = await friends.findOne({'id_user': id_user}).updateOne(query) ;
        const status2 = await friends.findOne({'id_user': id_friend}).updateOne(query2) ;
        if(status && status2) {
            console.log("Wellcome! We was being friend")
            res.json(status)
        } else {
            console.log("add friend falled")
            req.json({})
        }
    }catch (ex) {
        next(ex)
    }
}
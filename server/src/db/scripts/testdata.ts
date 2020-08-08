const Room = require('../../models/room');
const User = require('../../models/user');
const Message = require('../../models/message');
const moniker = require('moniker');

require('../mongoose');

const populateTestData = async () => {
    try {
        await Message.deleteMany();
        await Room.deleteMany();
        await User.deleteMany();

        const user = await new User({
            name: "David Dietrick",
            email: "djdietrick@gmail.com",
            password: "password"
        }).save();
    
        let names = moniker.generator([moniker.noun, moniker.noun]);
        let email = moniker.generator([moniker.adjective]);
        let roomNames = moniker.generator([moniker.adjective, moniker.verb]);
        let ids = [];
        for(let i = 0; i < 21; i++) {
            const newUser = await new User({
                name: names.choose(),
                email: `${email.choose()}@gmail.com`,
                password: "password"
            }).save();
            ids.push(newUser._id);
        }

        for(let i = 0; i < 5; i++) {
            user.friends.push({
                id: ids[i],
                status: "ACCEPTED"
            });
        }

        await user.save();
    
        for(let i = 0; i < 5; i++) {
            await new Room({
                name: roomNames.choose(),
                members: [user._id,
                    ...ids.slice(0, 7)],
                admins: [user._id]
            }).save();
        }

        console.log("Created test data");
    } catch(e) {
        console.error(e);
    }
}

populateTestData();
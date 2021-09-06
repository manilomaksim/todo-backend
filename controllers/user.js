const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.send({
            users,
            success: true
        });
    }
    catch (err) {
        res.status(401).send({ success: false, message: err.toLocaleString() });
    }
}

module.exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const passwordToSave = bcrypt.hashSync(password, salt);

    const newUser = new User({email, password: passwordToSave});
    try {
        await newUser.save();
        res.send({
            success: true
        });
    }
    catch (err) {
        res.error(err.toLocaleString());
    }
}

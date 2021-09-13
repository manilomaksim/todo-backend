const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user){
            return res.status(401).json({ success: false, message: 'Email is not exist' })
        }
        try {
            const isCorrect = await bcrypt.compare(password, user.password);
            if (!isCorrect) {
                return res.json({ success: false, message: 'Incorrect password' });
            }
            const { _id } = user;
            const jwtUserToken = jwt.sign({ _id, email: user.email }, process.env.RSA_PRIVATE_KEY);
            res.send({
                success: true,
                token: jwtUserToken
            })
        } catch (error) {
            return res.json({ success: false, message: error });
        }
    }
    catch (err){
        res.error(err.toLocaleString());
    }
}

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

const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        // fallback to 10 if process.env.SALT_ROUNDS is missing or invalid
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        });

        const signUpUser = await user.save();
        const token = await user.getJWT();

        res.cookie("token", token);
        res.json({ message: "Sign Up successfully", signUpUser });

    } catch (err) {
        res.send("Error : " + err.message);
    }
};

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
        }

        const token = await user.getJWT();

        res.cookie("token", token);
        res.json({
            message: "Login Successfully",
            user: user
        });

    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const logout = (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout successfully!!");
};

module.exports = { signup, login, logout };

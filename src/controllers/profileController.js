const { validateEditProfileData } = require("../utils/validation");

const viewProfile = async (req, res) => {
    try {
        const loggedInUser = req.user;
        res.json({ loggedInUser });
    } catch (err) {
        res.status(400).send("Error: " + err);
    }
};

const editProfile = async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => {
            loggedInUser[key] = req.body[key];
        });
        await loggedInUser.save();
        res.json({ message: "Updated Successful", loggedInUser });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

module.exports = { viewProfile, editProfile };

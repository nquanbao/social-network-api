const {User, Thought} = require('../models');

module.exports = {
    async getUsers (req,res) {
        try{
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneUser (req,res) {
        try{
            const user = await User.findOne({_id: req.parameter.userId})
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteUser(rep,res) {
        try {
            const user = await User.findOneAndDelete({_id: req.parameter.userId});

            if(!user) {
                res.status(404).json({ message: 'No user with that ID' });
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
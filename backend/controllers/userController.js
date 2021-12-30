const asyncHandler = require('express-async-handler');
const { User, match } = require('../models/userModels');
const application = require('../models/ApplicationModels')
const generateToken = require('../utils/generateToken');

var ObjectId = require('mongoose').Types.ObjectId;
const Seats = require('../models/seatModel');



module.exports = {
    registerUser: asyncHandler(async (req, res) => {

        const { userName, email, password } = req.body;

        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400)
            throw new Error("User already exist !")
        } else {
            const UserToRegister = await User.create({
                userName,
                email,
                password,
            })

            if (UserToRegister) {
                res.status(200).json({
                    _id: UserToRegister._id,
                    name: UserToRegister.userName,
                    email: UserToRegister.email,
                    isAdmin: UserToRegister.isAdmin,
                    token: generateToken(UserToRegister._id)
                })
            } else {
                res.status(400)
                throw new Error("Error Occured !!")
            }
        }


    }),
    authUser: asyncHandler(async (req, res) => {

        const { email, password } = req.body;
        const userToLogin = await User.findOne({ email })


        if (userToLogin && (await userToLogin.matchPassword(password))) {
            res.json({
                _id: userToLogin._id,
                name: userToLogin.userName,
                email: userToLogin.email,
                isAdmin: userToLogin.isAdmin,
                pic: userToLogin.pic,
                token: generateToken(userToLogin._id)
            })
        } else {
            res.status(400)
            throw new Error("User Not Found");
        }
    }),

    createApplication: async (req, res) => {
        const {
            userId,
            name,
            address,
            city,
            pic,
            state,
            email,
            phoneno,
            companyName,
            team,
            products,
            problem,
            solution,
            value,
            competitors,
            revenue,
            marketSize,
            marketPlan,
            incubation,
            proposal
        } = req.body

        const newApplication = await application.create({
            userId,
            name,
            pic,
            address,
            city,
            state,
            email,
            phoneno,
            companyName,
            team,
            products,
            problem,
            solution,
            value,
            competitors,
            revenue,
            marketSize,
            marketPlan,
            incubation,
            proposal
        })
        if (newApplication) {
            res.status(200).json({
                _id: newApplication._id,
                userId: newApplication.userId,
                name: newApplication.name,
            })
        } else {
            res.status(400)
            throw new Error("Error Occured !!")
        }
    },
    getUserApplications: (req, res) => {
        application.find({ userId: new ObjectId(req.params.userId) }).then((data) => {
            console.log("the data is : ", data)
            res.status(200).json({ data })
        }).catch((err) => {
            console.log("the error is : ", err.message)
        })
    },
    deleteApplication: async (req, res) => {
        var appToDelete = await application.findOne({ _id: new ObjectId(req.params.appId) })
        Seats.updateOne({ _id: new ObjectId(appToDelete.seatId) }, { applicationId: null, isActive: false }).then((updatedResult) => {
            application.remove({ _id: new ObjectId(req.params.appId) }).then((data) => {
                res.status(200).json({ data })
            }).catch((err) => {
                console.log("the error in delting file is : ", err);
            })
        })

    }
}

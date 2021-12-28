const ApplicationModels = require('../models/ApplicationModels')
const SeatModels = require('../models/seatModel')
var ObjectId = require('mongoose').Types.ObjectId;
const { v4: uuidv4 } = require('uuid');

module.exports = {
    fetchApps: async (req, res) => {
        var apps = await ApplicationModels.find()
        res.status(200).json({ apps })
    },
    fetchSingleApplication: async (req, res) => {
        var app = await ApplicationModels.findOne({ _id: ObjectId(req.params.appId) })
        res.status(200).json({ app })
    },

    acceptApplication: async (req, res) => {
        var result = await ApplicationModels.updateOne({ _id: ObjectId(req.params.appId) }, { $set: { status: 'Accepted' } })
        res.status(200).json({ result })
    },
    rejectApplication: async (req, res) => {
        var result = await ApplicationModels.updateOne({ _id: ObjectId(req.params.appId) }, { $set: { status: 'Rejected' } })
        res.status(200).json({ result })
    },
    fetchPendingApps: async (req, res) => {
        var data = await ApplicationModels.find({ status: 'Accepted' })
        res.status(200).json({ data })
    },
    addSeats: async (req, res) => {
        var data = await SeatModels.create({ seatId: uuidv4() })
        res.status(200).json({ data })
    },
    fetchSeats: async (req, res) => {
        var data = await SeatModels.find({})
        res.status(200).json({ data })
    }
}

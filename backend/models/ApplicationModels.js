const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({
    userId:{
        type : mongoose.Types.ObjectId,
        required : true,
    },
    status: {
        type: String,
        default:"Pending",
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    products: {
        type: String,
        required: true,
    },

    problem: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    competitors: {
        type: String,
        required: true,
    },
    revenue: {
        type: String,
        required: true,
    },

    marketSize: {
        type: String,
        required: true,
    },
    incubation: {
        type: String,
        required: true,
    },
    proposal: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true
    }
)

const application = mongoose.model('Applications' , applicationSchema)

module.exports = application
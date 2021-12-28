const mongoose = require('mongoose')

const seatSchema = mongoose.Schema({

    seatId :{
        type : String,
        required : true,
    },
    applicationId: {
        type: mongoose.Types.ObjectId,
        default : null,
    },
    isActive : {
        type : Boolean,
        default : false
    }
})


const Seats = mongoose.model('Seats' , seatSchema)

module.exports = Seats
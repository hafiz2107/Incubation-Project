const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI )
        console.log(`Mongo DB Connected ${connect.connection.host}`)
    }catch(error){
        console.log("THe error in connection : ",error)
        process.exit()
    }
}
module.exports = connectDb 
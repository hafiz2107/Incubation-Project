const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    pic: {
        type: String,
        required: true,
        default: 'https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1640239884~hmac=8440e10b511356eca93bba5c467f4e08',
    },

},
    {
        timestamps: true
    }
);



userSchema.pre('validate', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}




const User = mongoose.model('User', userSchema)

module.exports = { User }
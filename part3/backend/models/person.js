const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
})
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
mongoose.set('strictQuery',false)

console.log('connecting to', url)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        require: true,
    },
    number: {
        type: String,
        minLength: 3,
        validate: {
            validator: function(v) {
                return /^\d{3}-\d{5,}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        require: true,
    }
})
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)
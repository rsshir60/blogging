//{ fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }

const mongoose = require ("mongoose")


const authorSchema = new mongoose.Schema(
{ 

firstName : {
    type: String,
    required: true
},
LastName:{
    type: String,
    required: true
},
Title: {
    type: String,
    required: true,
    enum : ["Mr", "Mrs", "Miss"]
},
Email:{
    type: String,
    required: true,
    unique: true
},
Password: {
    type: String,
    required: true
}
},
 {timestamps: true });

module.exports = mongoose.model('Author', authorSchema)

const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema ({
  
title: {
    type: String,
    required: true
},
body: {
    type: String,
    required: true
},
authorId: {
    type: objectId,
    required: true,
    ref: "Author"
},
tags: {
    type: [String],
},
category: {
    type: String,
    required: true

},
subCategory: {
    type: [String],
},
isDeleted: {
    type: Boolean,
    default: false
},
isPublished: {
    type: Boolean,
    default: false
} 
},
{ timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)
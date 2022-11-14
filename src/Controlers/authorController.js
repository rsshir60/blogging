const authorModel = require("../Models/authorModel")

const passValid=/^[a-zA-Z0-9@]{6,10}$/

function isEmail(email) {

    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (email !== '' && email.match(emailFormat)) { return true; }
    return false;
}

function stringVeri(value) {
    if (typeof value !== "string" || value.length == 0) {
        return false
    }
    return true
}

const createAuthor = async (req, res) => {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ msg: "Please Enter details" })
        }
        let { firstName, LastName, Title, Email, Password } = data
        if (!firstName) {
            return res.status(400).send({ msg: "Firstname is required" })
        }
        if (firstName) {
            if (!stringVeri(firstName)) {
                return res.status(400).send({ msg: "Name should be string" })
            }
        }
            if (LastName) {
                if (!stringVeri(LastName)) {
                    return res.status(400).send({ msg: "Lastname should be string" })
                }
            }
                if (Title) {
                    if (!stringVeri(Title)) {
                        return res.status(400).send({ msg: "Title should be string" })
                    } if (Title != "Mr" && Title != "Miss" && Title != "Mrs"){
                    return res.status(400).send({ msg: "please write valid title" })
                    }
                }
                        let validP=passValid.test(Password)
                        if (!validP) 
                        { return res.status(400).send({ status:false,msg:" Incorrect password, it should be 6 digit with atlest one special character, alphabet and number."})}

            
                    if (!isEmail(Email)) {
                        return res.status(400).send({ msg: "Please Enter Valid Email" })
                    }
                    let savedata = await authorModel.create(data)
                    res.status(201).send({ data: savedata })
                }
                 catch (err) {
                    res.status(500).send({ error: err.message, status: false })
                }

            }    
            module.exports = { createAuthor }
const authorModel = require("../Models/authorModel")
const jwt = require("jsonwebtoken");

const passValid = /^[a-zA-Z0-9@]{6,10}$/

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
            return res.status(400).send({ status: false, msg: "Please Enter details" })
        }
        let { firstName, LastName, Title, Email, Password } = data
        if (!firstName) {
            return res.status(400).send({ status: false, msg: "Firstname is required" })
        }
        if (firstName) {
            if (!stringVeri(firstName)) {
                return res.status(400).send({ status: false, msg: "Name should be string" })
            }
        }
        if (LastName) {
            if (!stringVeri(LastName)) {
                return res.status(400).send({ status: false, msg: "Lastname should be string" })
            }
        }
        if (Title) {
            if (!stringVeri(Title)) {
                return res.status(400).send({ status: false, msg: "Title should be string" })
            } if (Title != "Mr" && Title != "Miss" && Title != "Mrs") {
                return res.status(400).send({ status: false, msg: "please write valid title" })
            }
        }
        let validP = passValid.test(Password)
        if (!validP) { return res.status(400).send({ status: false, msg: " Incorrect password, it should be 6 digit with atlest one special character, alphabet and number." }) }


        if (!isEmail(Email)) {
            return res.status(400).send({ status: false, msg: "Please Enter Valid Email" })
        }
        let savedata = await authorModel.create(data)
        res.status(201).send({ data: savedata })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message, })
    }

}

const login = async function (req, res) {

    let mail = req.body.Email
    let pass = req.body.password
    if (Object.keys(req.body).length < 1) return res.status(400).send({ msg: "Enter the Data" })

    if (!isEmail(mail)) {
        return res.status(400).send({ msg: "Enter Email-Id" })
    }

    if (!pass) return res.status(400).send({ status: false, msg: "enter password" })

    let userData = await authorModel.findOne({ Email: mail, Password: pass })
    if (!userData) {
        res.status(400).send({ status: false, msg: "invalid email or password" })
    }
    else {
        let token = jwt.sign(
            {
                ID: userData._id.toString()
            }, "#group20");

        console.log(userData._id)
        res.status(201).send({ status: true, msg: token })
    }
}



module.exports.login = login;
module.exports.createAuthor = createAuthor 
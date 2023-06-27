//require express
const express = require('express');
const router = express.Router({ caseSensitive: true });
//require nodemailer for sending email
const nodemailer = require('nodemailer');
//require dotenv for storing sensitive data
const dotenv = require('dotenv');

//load in secret variable
dotenv.config({ vaerbose: true });

//transporter to setup nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Gmail,
        pass: process.env.Gmailpwd,
    }
});

//route to send the email
router.post("/email", ((req, res) => {

    //compose the email
    var mailOptions = {
        from: req.body.email,
        to: "realtywebsolutions@gmail.com",
        subject: "Message from " + req.body.name + " Email: " + req.body.email,
        text: req.body.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (info) {
            res.send("sent")
        }
        if (error) {
            res.send("An error occured!")
        }
    });


}))


//route to send the contact email
router.post("/email2", ((req, res) => {


    //compose the email
    var mailOptions = {
        from: req.body.contact.email,
        to: "realtywebsolutions@gmail.com",
        subject: "Message from " + req.body.contact.name + " Email: " + req.body.contact.email,
        text: req.body.contact.message + req.body.service
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (info) {
            res.send("sent")
        }

        if (error) {
            res.send("An error occured!")
        }
    });


}))


//route to join email waitlist
router.post("/email3", ((req, res) => {


    //compose the email
    var mailOptions = {
        from: req.body.email,
        to: "realtywebsolutions@gmail.com",
        subject: " Email: " + req.body.email,
        text: "this is a waitlis email"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (info) {
            res.send("sent")
        }

        if (error) {
            res.send("An error occured!")
        }
    });


}))

//export rouer
module.exports = router
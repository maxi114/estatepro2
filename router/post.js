//require express
const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');//store the secret 
const mongoose = require('mongoose');
const multer = require('multer');

//require path
const path = require('path')

//require fs to delete uploaded files
const fs = require('fs');

//require the client, image & property models
const Client = require("../models/Client");
const Property = require("../models/property");
const Image = require("../models/image")

//get the router 
const router = express.Router({ caseSensitive: true })

// Multer configuration
const storage = multer.diskStorage({
    // Destination to store image     
    destination: './PropertyImages/',
    filename: (req, file, cb) => {

        cb(null, file.fieldname + ',' + Date.now() + path.extname(file.originalname));
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    },
});

const upload = multer({ storage: storage });

//route to upload the property information
router.post("/upload", upload.any(), ((req, res) => {

    // Access the uploaded files using req.files
    const uploadedFiles = req.files;

    // Access other data
    const client = JSON.parse(req.body.client);
    const property = JSON.parse(req.body.property);
    const amenities = JSON.parse(req.body.amenities);

    //store the path of the uploaded files in case of deletion
    upfiles = []

    //loop through the uploaded files and get their path
    for (var i = 0; i < uploadedFiles.length; i++) {

        upfiles.push(uploadedFiles[i].path)

    }

    //function to delete the uploaded files
    const delfile = (file) => {

        //loop through the uploaded files path
        for (var i = 0; i < file.length; i++) {

            fs.unlink(file[i], (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("deleted")
                }
            })
        }
    }

    //call the delete files function
    delfile(upfiles)

    //check if client exists
    Client.find({Email: client.Email})
    .then(data =>{

        //if client does not exists
        if(data.length > 0){

            //get the client schema
            const clientt = new Client();

            //upload client info to database
            clientt.Name = client.Name;
            clientt.Email = client.Email;
            clientt.Phone = client.Phone;

            //get the property schema
            const propertyy = new Property();

            //upload the property info to the database
            propertyy.Email = client.Email;
            propertyy.Title = property.Title;
            propertyy.PropertyType = property.PropertyType;
            propertyy.ListingType = property.ListingType;
            propertyy.Location = property.Location;
            propertyy.Bathrooms = property.Bathrooms;
            property.Bedrooms = property.Bedrooms;
            propertyy.ListingPrice = property.ListingPrice;
            propertyy.Parking = property.Parking;
            propertyy.BuildingSqft = property.BuildingSqft;
            propertyy.LandSqft = property.LandSqft;
            propertyy.ListingDescription = property.ListingDescription;

            //check if property provides amenities
            if(amenities.outdoor == TRUE){
                propertyy.Amenities.Outdoor = TRUE
            }
            else{}

            propertyy.Amenities.Outdoor = amenities.outdoor
            propertyy.Amenities.Pool = amenities.pool
            propertyy.Amenities.Vigilance = amenities.vigilance
            propertyy.Amenities.Laundry = amenities.Laundry
            propertyy.Amenities.SecurityCameras = amenities.SecurityCameras
            propertyy.Amenities.Pets = amenities.Pets
            propertyy.Amenities.DishWasher = amenities.DishWasher
            propertyy.Amenities.Internet = amenities.Internet
            propertyy.Amenities.Elevator = amenities.Elevator
            propertyy.Amenities.Jacuzzi = amenities.Jacuzzi
            propertyy.Amenities.Solar = amenities.solar
            propertyy.Amenities.Garage = amenities.garage

            propertyy.save(function (err, document){
                if(document){
                    console.log(document)
                }
                else{
                    console.log(err)
                }
            })
        }

        //if client exists
        else{

        }
    })
    // Add your logic to process the files and data
    /*console.log('Files received:', uploadedFiles);
    console.log('Client data:', client);
    console.log('Property data:', property);
    console.log('Amenities data:', amenities);*/

}))

module.exports = router

(function () {
    //define the controller and set the
    const app = angular.module('app', ['ngRoute', 'angular-jwt']);

    //include cross domains
    app.config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true)

        //home page
        $routeProvider.when('/', {
            templateUrl: "./home.html",
            controller: "HomeController",
            controllerAs: "vm",
        })

        //about page
        $routeProvider.when('/about', {
            templateUrl: "./about.html",
            controller: "AboutController",
            controllerAs: "vm",
        })

        //post page
        $routeProvider.when('/post', {
            templateUrl: "./post.html",
            controller: "PostController",
            controllerAs: "vm",
        })

        //properties page
        $routeProvider.when('/properties', {
            templateUrl: "./property.html",
            controller: "PropertyController",
            controllerAs: "vm",
        })

    });

    //function to post the properties

    const propertiess = (response) => {
        const data = response.data

        //array to store images
        var images = [];

        //loop through the data
        for (var i = 0; i < data.length; i++) {

            //loop through the images
            for (var p = 0; p < data[i].filepath.length; p++) {

                if (p == 0) {
                    //store the images in an array
                    images.push(
                        "<div class=\"carousel-item active\">" +
                        "<img src=\"./" + data[i].filepath[p] + "\" class=\"d-block w-100\" alt=\"...\">" +
                        "</div>"
                    );
                }

                else {
                    //store the images in an array
                    images.push(
                        "<div class=\"carousel-item\">" +
                        "<img src=\"./" + data[i].filepath[p] + "\" class=\"d-block w-100\" alt=\"...\">" +
                        "</div>"
                    );
                }

                //store the images in an array


            }

            images = images.join("")
            //Send the data to client side for viewing
            $(
                "<div class = \"hld\">" +
                "<div class =\"card\" style =\"width: 100%; border: none;\" >" +
                "<div id=\"carouselExampleIndicators" + i + "\" class=\"carousel slide\">" +
                "<div class=\"card-img-top carousel-inner\">" +
                images +
                "</div>" +
                "</div>" +
                " <button class=\"carousel-control-prev\" type=\"button\" data-bs-target=\"#carouselExampleIndicators" + i + "\" data-bs-slide=\"prev\">" +
                "<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>" +
                "<span class=\"visually-hidden\">Previous</span>" +
                "</button>" +
                "<button class=\"carousel-control-next\" type=\"button\" data-bs-target=\"#carouselExampleIndicators" + i + "\" data-bs-slide=\"next\">" +
                "<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>" +
                "<span class=\"visually-hidden\">Next</span>" +
                "</button>" +
                "</div>" +
                " <div class=\"card-body\">" +
                "<br>" +
                "<div class=\"line2\" ></div>" +

                "<h5 class=\"card-title\">$ " + data[i].dataaa.ListingPrice + "</h5>" +
                "<p class=\"card-text\">Home in " + data[i].dataaa.Location + "</p>" +

                "<div class=\"line3\"></div>" +
                "<br>" +
                " <div class=\"card-body row align-items-center\" style = \"margin-left: 3px\" >" +
                "<div class=\"card-link\" style=\" margin-right: 30px\">" +
                "<img src=\"./images/sqftimg.png\" class = \"linkimg\" alt=\"\" srcset=\"\">" +
                "<p class = \"linktxt\"> " + data[i].dataaa.BuildingSqft + " sqft </p>" +
                "</div>" +

                "<div class=\"card-link\" style=\" margin-right: 30px\">" +
                "<img src=\"./images/bermimg.png\" class = \"linkimg linkimg1\" alt=\"\" srcset=\"\">" +
                "<p class = \"linktxt linktxt1\"> " + data[i].dataaa.Bathrooms + " </p>" +
                "</div>" +

                "<div class=\"card-link\">" +
                "<img src=\"./images/bahroomimg.png\" class = \"linkimg linkimg1\" alt=\"\" srcset=\"\">" +
                "<p class = \"linktxt linktxt1\"> " + data[i].dataaa.Bedrooms + " </p>" +
                "</div>" +
                "</div>" +

                "</div>" +
                "</div>" +
                "</div>"
            ).appendTo(".divpr")

            images = []
        }
    }
    //home controller
    app.controller("HomeController", HomeController);
    function HomeController($location, $scope, $window, $http) {

        var vm = this

    }

    //about controller
    app.controller("AboutController", AboutController);
    function AboutController($location, $scope, $window, $http) {

        var vm = this

    }

    //properties controller
    app.controller("PropertyController", PropertyController);
    function PropertyController($location, $scope, $window, $http) {

        var vm = this

        //when user clicks the property filter
        $(".pll").on('change', function () {
            $(".spinner-border").show()
            $(".hld").remove()
            $("#nod").hide()
            var pr = this.value

            var pr2 = $(".pl").val()

            if (pr2 == "") {

                $http.post("/post/filter", {
                    fil: pr
                })
                    .then((response) => {
                        
                        if (response.data == "nothing"){
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").show()
                        }
                        else{
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").hide()
                            //showcase the properties
                            propertiess(response)
                        }

                    })

            }

            else {

                $http.post("/post/filter2", {
                    fil: pr,
                    fil2: pr2
                })
                    .then((response) => {
                        if (response.data == "nothing"){
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").show()
                        }
                        else{
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").hide()
                            //showcase the properties
                            propertiess(response)
                        }
                    })
            }

        })

        //when user clicks the listing type filter
        $(".pl").on('change', function () {
            $(".spinner-border").show()
            $(".hld").remove();
            $("#nod").hide();

            var ch = this.value

            var ch2 = $(".pll").val()

            if (ch2 == "") {

                $http.post("/post/filterr", {
                    fil: ch
                })
                    .then((response) => {
                        if (response.data == "nothing"){
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").show()
                        }
                        else{
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").hide()
                            //showcase the properties
                            propertiess(response)
                        }
                    })

            }
            else {
                console.log(ch + " " + ch2)
                $http.post("/post/filter2", {
                    fil: ch2,
                    fil2: ch
                })
                    .then((response) => {
                        if (response.data == "nothing"){
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").show()
                        }
                        else{
                            $(".spinner-border").hide()
                            $(".hld").remove()
                            $("#nod").hide()
                            //showcase the properties
                            propertiess(response)
                        }
                    })
            }


        })

        //route to get all the properties from the database
        $http.post('/post/properties', {
            DataSend: "get posted properties"
        })
            .then((response) => {

                if (response.data.length > 0) {
                    $(".spinner-border").hide()
                    $(".hld").remove()
                    //showcase the properties
                    propertiess(response)
                }
                else {
                    $(".hld").remove()
                    $("#nod").show()
                }

            })

    }

    //post controller
    app.controller("PostController", PostController);
    function PostController($location, $scope, $window, $http) {

        var vm = this

        //to store files that are being previewd
        var myFiles = [];

        //preview pictures before uploading

        if (window.File && window.FileList && window.FileReader) {
            $("#file").on("change", function (e) {

                var files = e.target.files,
                    filesLength = files.length;
                for (var i = 0; i < filesLength; i++) {

                    var f = files[i]

                    if (files[i].type.includes("image")) {
                        myFiles.push(f);
                    }
                    else {
                        //alert
                        alert("Upload images only. Video uploads not supported yet.")
                        return;
                    }

                    //if there is a video show the loading circle
                    /*if (f.type.includes("video")) {
                        //show the div holding the loading circle
                        document.querySelector('.iver').style.display = 'flex';
                    }*/

                    (function (file) {
                        var fileReader = new FileReader();
                        fileReader.onload = (function (e) {

                            //to acces the file name and file typre of the files
                            var filename = file.name;
                            var filetype = file.type;


                            //image file
                            if (filetype.includes("image")) {

                                //hide the videos may take longer to load text
                                $("#imgt").hide();

                                $("<div class=\"imgpreview\">" +
                                    "<img id=\"img\" src=\"" + e.target.result + "\" title=\"" + filename + "\"/>" +
                                    "<br/><a class=\"remove\">x</a>" +
                                    "</div>").appendTo(".images");

                            }

                            //video file
                            /*if (filetype.includes("video")) {

                                //hide the videos may take longer to load text
                                $("#imgt").hide();

                                $("<div class = \"imgpreview\">" + "<video src=\"" + e.target.result + "\"  title=\"" + filename + "\" width=\"100%\" height=\"100%\" controls>" +
                                    "</video>" + "<br/><button class=\"remove\">x</button>" + "</div>"
                                ).appendTo(".images");

                                //hide the div holding loading cirlce
                                $('.iver').hide();
                            }*/


                            $(".remove").click(function () {
                                $(this).parent("div").remove();
                                var name = $(this).parents('div')[0].children[0].title;

                                for (var i = 0; i < myFiles.length; i++) {

                                    if (myFiles[i].name == name) {
                                        myFiles.splice(i, 1);
                                    }
                                }

                            });

                        });

                        fileReader.readAsDataURL(f);

                    }(files[i]));

                }

            });



        } else {
            alert("Your browser doesn't support to File API")
        }

        //when user clicks submit my property
        $("#sbtf").on("click", () => {



            $(".error").html("")
            $(".error2").html("")
            $(".error1").html("")

            //----------------validate client info--------------------

            //check to see if client info is filled out
            if (!vm.client) {
                $(".error").html("Please fill out your information below.")
                return
            }

            //if client name is not filled
            if (!vm.client.Name) {
                $(".error").html("Please fill out your Full Name")
                return
            }

            //if client email is not filled
            if (!vm.client.Email) {
                $(".error").html("Please fill out your Email Address below in the correct format.")
                return
            }

            //------------------validate property info-------------

            //check to see if property info is filled out
            if (!vm.property) {
                $(".error2").html("Please fill out your property information below.")
                return
            }

            //if property title is not filled out
            if (!vm.property.Title) {
                $(".error2").html("Please fill out your property title below.")
                return
            }

            //if property type is not filled
            if (!vm.property.PropertyType) {
                $(".error2").html("Please select your property type below.")
                return
            }

            //if property listing is not selected
            if (!vm.property.ListingType) {
                $(".error2").html("Please select your listing type below.")
                return
            }

            //if property location is not filled
            if (!vm.property.Location) {
                $(".error2").html("Please fill out your property Location below.")
                return
            }

            //if number of bathrooms is not filled
            if (!vm.property.Bathrooms) {
                $(".error2").html("Fill out the number of bathrooms in the property below.")
                return
            }

            //if number of bedrooms is not filled
            if (!vm.property.Bedrooms) {
                $(".error2").html("Please fill out the number of bedrooms below.")
                return
            }

            //if listing price is missing
            if (!vm.property.ListingPrice) {
                $(".error2").html("Please fill out your Listing price below.")
                return
            }

            //if parking info is missing
            if (!vm.property.Parking) {
                $(".error2").html("Please fill out the parking information below.")
                return
            }

            //if building sqft is missing
            if (!vm.property.BuildingSqft) {
                $(".error2").html("Please fill out your property SQFT information below.")
                return
            }

            //if land sqft is missing
            if (!vm.property.LandSqft) {
                $(".error2").html("Please fill out the lands SQFt below.")
                return
            }

            //if property description is missing
            if (!vm.property.description) {
                $(".error2").html("Please fill out the property description below.")
                return
            }


            //chek if there are images
            if (myFiles.length == 0) {
                $(".error1").html("Please upload images of your property.")
                return
            }

            var formData = new FormData();

            // Append each file to the FormData object
            for (var i = 0; i < myFiles.length; i++) {
                formData.append(vm.client.Email + "," + vm.property.Title, myFiles[i]);
            }

            // Append other data to the FormData object
            formData.append('client', JSON.stringify(vm.client));
            formData.append('property', JSON.stringify(vm.property));
            formData.append('amenities', JSON.stringify(vm.amenities));


            //send the data to the router
            $http.post('/post/upload', formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(function (response) {
                    // Handle the response
                    console.log(response.data);
                })
                .catch(function (error) {
                    // Handle the error
                    console.error(error);
                });
        })

    }


}())
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

    });

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

            console.log(vm.client)
            console.log(vm.property)
            console.log(vm.amenities)
        })

    }


}())
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

        //contact page
        $routeProvider.when('/contact', {
            templateUrl: "/contact.html",
            controller: "ContactController",
            controllerAs: "vm",
        })

    });

    //home controller
    app.controller("HomeController", HomeController);
    function HomeController($location, $scope, $window, $http) {

        var vm = this

        //hide the spin btn
        $("#spin3").hide()
        $(".error").html("")


        //when user clicks get started
        $(".gtstbtn").click(function () {
            href = "/contact"
        })

        //when user clicks Message
        $(".btnn3").on("click", () => {

            //validate user inpt

            //check to see if the information is all enterd
            if (!vm.contact) {
                $(".error").html("Please fill out the information below.")
                return
            }

            //if user hasnt input their name send an error
            if (!vm.contact.name) {
                $(".error").html("Dont forget to type in your name")
                return
            }

            //if user hasnt input their email send an error
            if (!vm.contact.email) {
                $(".error").html("type in your email so we can get back to you")
                return
            }

            //if user hasnt input their message send an error
            if (!vm.contact.message) {
                $(".error").html("Give us a brief description of how we could assist you and we will get to you asap!")
                return
            }

            //remove the error message
            $(".error").html("")

            //hide the message btn
            $(".btn").hide()

            //show the loading circle
            $("#spin3").show()

            //post the info to the server
            $http.post("/api/email", vm.contact)
                .then((res) => {

                    //if the email is sent
                    if (res.data == "sent") {

                        //hide the loading circle
                        $("#spin3").hide()

                        //change the message btn to sent
                        $(".btn").html("Sent")

                        //change the background and text color
                        $(".btn").css({ "background-color": "green", "color": "white" })

                        //show the button
                        $(".btn").show()
                    }

                    //when an error occurs
                    if (res.data = "An error occured!") {
                        $(".btn").html("Sent")
                        //change the background and text color
                        $(".btn").css({ "background-color": "red", "color": "white" })
                        //show the button
                        $(".btn").show()
                    }

                    setTimeout(() => {
                        location.href = "/"
                    }, 1500)
                })

        })

    }

    //contact controller
    app.controller("ContactController", ContactController);
    function ContactController($location, $scope, $window, $http) {

        var vm = this

        //when user clicks submit
        $(".btnsub").on("click", () => {

            $('.error').html("")

            //variable checked
            var service = ""


            if ($("#new").is(':checked')) {

                service = "New"

            }

            if ($("#experience").is(':checked')) {

                service = "Experience"

            }

            //check to see if the information is all enterd
            if (!vm.contact) {
                $(".error").html("Please fill out the information below.")
                return
            }

            //if user hasnt input their name send an error
            if (!vm.contact.name) {
                $(".error").html("Dont forget to type in your name")
                return
            }

            //if user hasnt input their email send an error
            if (!vm.contact.email) {
                $(".error").html("type in a valid email so I can get back to you")
                return
            }

             //check if radio button is clicked
             if(service == ""){
                $(".error").html("Select the service that you would like below .")
                return
            }

            //if user hasnt input their message send an error
            if (!vm.contact.message) {
                $(".error").html("write down any requests that you may have about your website and I will get back to you.")
                return
            }

            //post info to the server
            $http.post("/api/email2",{
                contact: vm.contact,
                service: service
            })
            .then((res)=>{

                console.log(res.data)
                if(res.data == "sent"){
                    
                    $(".btnsub").html("Sent")
                    $(".btnsub").css({"background-color":"green", "color": "white", "border": "solid 1px green",})
                    $(".btnsub").css({})

                    setTimeout(() => {
                        $(".contact-form").hide();
                        location.href = "/"
                    }, 3000)

                }

                if(res.data == "An error occured!" ){
                    $(".error").html("an error occured!")
                }
            })

        })
    }

}())
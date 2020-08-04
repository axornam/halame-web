$("document").ready(() => { //This method is intended to load when the page is ready
    /////////////////////////////////////////////////////////////////////////////////////
    // This function will handle sign up form submission events
    // Supposed to prevent the page from reloading
    $("#su_form").on("submit", function (e) {
        console.log("signup form submitted");
        e.preventDefault();
        e.stopPropagation();

        // Retrieve all information from the forms
        const username = document.getElementById('up_name').value;
        const email = document.getElementById('up_email').value;
        const password = document.getElementById('up_pass').value;

        //Clear the forms after retrieving all the information
        $("#up_name").text("");
        $("#up_email").text("");
        $("#up_pass").text("");

        console.log("username", username, "password", password, "email", email);

        //This function creates a user with firebase authenctication
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                //do some cool stuff
                const userObject = {
                    id: firebase.auth().currentUser.uid,
                    imageURL: "default",
                    username: username
                };

                console.log("User was created");
                console.log("Currently Created user is:", firebase.auth().currentUser.uid);

                // This function pushes currently created users details into the realtime database
                firebase.database().ref("Users").push(userObject)
                    .then(() => {
                        console.log("User Data was pushed into the database");
                        // This method call sets the persistence state to session and the automatically log
                        // the user into halame chat application
                        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                            .then(() => {
                                //handle all logic related to adding the registered user to the database
                                //Which may incude but not limited to auto login and dashboard redirection
                                return firebase.auth().signInWithEmailAndPassword(email, password)
                                    .then((success) => {
                                        console.log("Login ", success.message)
                                        window.location.replace("message.html")
                                    }).catch((error) => {
                                        console.log("Login, ", error.message);
                                    });
                            });
                    }).catch((error) => {
                        //Handle all potetial errors while pushing to the database
                    });

            }).catch((error) => {
                console.log("could not sign the user up", error);
                //handle all potential errors
            });

    });// Sign up form submission ends here



    //////////////////////////////////////////////////////////////////////////////////////
    // This function is supposed to handle sign in form submission events
    // Supposed to prevent the page from reloading
    $("#li_form").on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("sigin form submitted");

        // get the current values of the input fields into constants
        const email = document.getElementById("in_email").value;
        const pass = document.getElementById("in_password").value;

        // clear the input fields
        $("#in_email").text("");
        $("#in_password").text("");

        console.log("email, ", email, "password", pass);

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(email, pass)
                    .then((success) => {
                        console.log(success);
                        //Send User to the Dash 
                        window.location.replace("message.html");

                        console.log("Signed in User id ", firebase.auth().currentUser.uid);

                    }).catch((error) => {
                        console.log(error.message);
                        //handle potential errors here
                    });

            }).catch(() => {
                console.log("soemthings happend");
            })

    });//Sign In form submission ends here


    //////////////////////////////////////////////////////////////////////////////


});// page ready function ends here
$("document").ready(() => {// This method is inteded to run when the page is ready
    //////////////////////////////////////////////////////////////////////////////
    //This is the function that logs the user out of the page and redirects them to login
    console.log("Message Page is loaded");

    //Declare some globals
    var myUserId;
    var currentUserId;

    displayAllUsers();

    //Update Current DataBase and Dom with recent messages
    firebase.database().ref("Chats").on("value", (snapshot) => {
        console.log("New Data ", snapshot);
    })

    //Set click listener to the logout button inside the page
    $("#log_out").on("click", () => {
        let id = firebase.auth().currentUser.uid;
        console.log("Login Button Clicked");

        firebase.auth().signOut().then(() => {
            console.log(id, " has logged out");
            window.location.replace("index.html");
        }).catch((error) => {
            console.log("Something Happened while logging out");
        });
    });

    //////////////////////////////////////////////////////////////////////////////////////
    // This function will be responsible for displaying all the users from the database
    //////////////////////////////////////////////////////////////////////////////////////
    function displayAllUsers() {
        // Get A reference to the users item to be displayed
        var userItem = document.getElementById("userItem");

        //do some cool stuff
        let ref = firebase.database().ref("Users");
        ref.on("value", (snapshot) => { // Add value Event Listener to the realtime database for changes
            snapshot.forEach((snap) => {
                // console.log(snap.val());

                //check to see if the id of snapshot is not equal to our singed in id
                if (snap.val().id !== firebase.auth().currentUser.uid) {
                    // make sure to add image links later
                    userItem.innerHTML +=
                        "<div class=\"user\">" +
                        "<div class=\"user-image\"></div>" +
                        "<div class=\"user-details\">" + snap.val().username + "</div>" +
                        "<div id=\"user_id\" style=\"display: none\">" + snap.val().id + "</div>" +
                        "</div >" + "<hr/>"
                }
                // console.log("ID: ", snap.val().id);
                // console.log("SIGNED ID: ", firebase.auth().currentUser.uid);
            });
            // console.log("Somethings Changed inside the database");
        });
    }

    ////////////////////////////////////////////////////////////////////////
    // get all user and add click listeners to all of them
    ////////////////////////////////////////////////////////////////////////
    $(document.body).on("click", ".user", function (event) {
        //Set the message area title to name of whoever is clicked on
        let name = $(this).find(".user-details").text();
        $(".name").text(name); // Set The chat area heading the the currently Selected User name

        currentUserId = $(this).find("#user_id").text(); // get the id from the currently selected chat item;
        console.log("USER Id: ", currentUserId);

        myUserId = firebase.auth().currentUser.uid; // GEt My Id from firebase auth
        console.log("MY USER ID ", myUserId);

        displayUserRelatedMessage(myUserId, currentUserId, "default");
    });


    ////////////////////////////////////////////////////////////////////
    /// Display User Related Messages
    //////////////////////////////////////////////////////////////////
    function displayUserRelatedMessage(my_id, user_id, imageURL) {
        console.log("The Fuction Has Been Called")
        firebase.database().ref("Chats").on("value", (snapshot) => {
            let chatHTML = "";
            snapshot.forEach((snap) => {
                let childSnap = snap.val();
                console.log("Child Snap ", childSnap);
                if (childSnap.sender == currentUserId && childSnap.receiver == myUserId) {
                    chatHTML += '<div class="message-block received-message">' +
                        '<div class="user-icon"></div>' +
                        '<div class="message">' + childSnap.message + '</div>' +
                        '</div>';
                }
                else if (childSnap.receiver == currentUserId && childSnap.sender == myUserId) {
                    chatHTML += '<div class="message-block">' +
                        '<div class="user-icon"></div>' +
                        '<div class="message">' + childSnap.message + '</div>' +
                        '</div>';
                }

                $(".message-container").html(chatHTML);
            })
        });
    }


    //////////////////////////////////////////////////////////////////
    /// Send User Related Message
    //////////////////////////////////////////////////////////////////
    $("#send-btn").on("click", (e) => {
        e.preventDefault();
        const msgData = {
            sender: myUserId,
            receiver: currentUserId,
            message: document.getElementById("input-field").value
        };

        console.log(msgData);
        //Send the message to firebase database
        firebase.database().ref("Chats").push().set(msgData)
            .then((success) => {
                console.log(success);
                console.log("messages were pushed into the database")
            }).catch((error) => {
                console.log(error);
                console.log("an error occured while pushing the messaeges")
            });

        //clear the message input field
        document.getElementById("input-field").value = ""
    });

    ///////////////////////////////////////////////////////////////////////
    /// Send Group Related Messages
    ///////////////////////////////////////////////////////////////////////

});
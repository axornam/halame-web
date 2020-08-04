$("document").ready(function () {

    // the purpose of the script is to add ui functionality to the 
    // current working web page 

    //Automatically disable the messgage view once page is loaded
    $("form").on("submit", function (e) {
        e.preventDefault()
    });


    //Toggle Between Sign in and sign up
    $('a').on('click', (e) => {
        var v = document.getElementById("sign-up-form");
        var w = document.getElementById("sign-in-form");
        e.preventDefault();

        if (v.style.display === "none") {
            v.style.display = '';
            w.style.display = 'none';
        } else {
            v.style.display = 'none';
            w.style.display = '';
        }
    });
});

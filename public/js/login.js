var userInput = $(".new-user");

$("#user-form").on("submit", function(event) {
    event.preventDefault();

    var newUser = {
        username: userInput.val().trim()
    };
    console.log(newUser);
    loginUser(newUser.username);
});


function loginUser(username) {
    $.post("/api/user", {
        username: username
    }).then(function() {
        window.location.replace("/game");
    }).catch(function (err) {
        console.log(err);
    }) 
};
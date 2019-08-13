var topics = ["pizza", "doughnut", "sushi"];
var GiphCount = 10;
var cutOffRating = "PG";

function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn");
        newButton.addClass("food-drinks");
        newButton.text(topics[i]);
        $("#button-container").append(newButton);
    }
    $(".food-drinks").unbind("click");

    $(".food-drinks").on("click", function() {
        $(".gif-image").unbind("click");
        $("#gif-container").empty();
        $("#gif-container").removeClass("dotted-border");
        populateGIFContainer($(this).text());
    });

}

function addButton(show) {
    if (topics.indexOf(show) === -1) {
        topics.push(show);
        $("#button-container").empty();
        renderButtons();
    }
}

function populateGIFContainer(show) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + show +
            "&api_key=ply5E9bKDzlYiGwQgtC7bpSEyryYg6LM=" + cutOffRating + "&limit=" + numberOfGIFs,
        method: "GET"
    }).then(function(response) {
        response.data.forEach(function(element) {
            newDiv = $("<div>");
            newDiv.addClass("individual-gif-container");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gif-container").append(newDiv);
        });

        $("#gif-container").addClass("dotted-border");
        $(".gif-image").unbind("click");
        $(".gif-image").on("click", function() {
            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            } else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"));
            }
        });
    });
}

$(document).ready(function() {
    renderButtons();
    $("#submit").on("click", function() {
        event.preventDefault();
        addButton($("#foods").val().trim());
        $("#foods").val("");
    });
});
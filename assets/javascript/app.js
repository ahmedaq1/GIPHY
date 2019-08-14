$(document).ready(function() {

    var topic = ["pizza", "sushi", "pasta"];


    function displayGifButtons() {
        $("#button-container").empty();
        for (var i = 0; i < topic.length; i++) {
            var button = $("<button>");
            button.addClass("food");
            button.addClass("btn btn-primary")
            button.attr("data-name", topic[i]);
            button.text(topic[i]);
            $("#button-container").append(button);
        }
    }


    function addNewButton() {
        $("#add-foody").on("click", function() {
            var food = $("#food-input").val().trim();
            if (food == "") {
                return false;
            }
            topic.push(food);

            displayGifButtons();
            return false;
        });
    }



    function displayGifs() {
        var food = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

        .done(function(response) {
            console.log(queryURL);
            $("#gif-container").empty();
            var results = response.data;
            if (results == "") {
                alert("Sorry Giphy for you!");
            }
            for (var i = 0; i < results.length; i++) {
                var giphyDiv = $("<div>");
                var giphyRating = $("<p>").text("Rating " + results[i].rating);
                giphyDiv.append(giphyRating);
                var giphyImage = $("<img>");
                giphyImage.attr("src", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                giphyImage.attr("data-animate", results[i].images.fixed_height.url);
                giphyImage.attr("data-state", "still");
                giphyImage.addClass("image");
                giphyDiv.append(giphyImage);
                $("#gif-container").prepend(giphyDiv);
            }
        });
    }

    displayGifButtons();
    addNewButton();

    $(document).on("click", ".food", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });

});
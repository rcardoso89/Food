var generateFavs = function(result) {
    // console.log(result)
  $("#favorites").empty();

  // console.log(result);
  for(var i = 0; i < 4; i++){

    //Define recipe Item with props
    var recipeItem = result[i];
    // console.log(recipeItem);
    // console.log(typeof(JSON.parse(recipeItem)))
    //Define Jquery Dom elements
    var favButton = $("<a>")
    var colDiv = $("<div>");
    var cardDiv = $("<div>");
    var cardBlock = $("<div>");
    var title = $("<h4>");
    var img = $("<img>");
    var dietLabels = $("<p>");
    var fullRecipe = $("<a>");

    //Add attributes to elements
    favButton.attr({
    name: recipeItem.label,
    class: "favButton",
    });

    colDiv.attr({
    class: "col-md-3 col-sm-6",
    });

    cardDiv.attr({
    class: "card recipeCard",
    });

    img.attr({
    src: recipeItem.image,
    alt: recipeItem.label,
    class: "card-img-top"
    })

    cardBlock.attr({
    class: "card-block",
    style: "text-align:center"
    });

    title.attr({
    class: "card-title",
    style: "font-weight: bold;"
    })

    title.text(recipeItem.label);


    dietLabels.attr({
    style: "font-weight:bold;color:black"
    })

    console.log(recipeItem.dietLabels);
    dietLabels.text("Diet Labels : " + recipeItem.dietLabels);

    fullRecipe.attr({
    href: recipeItem.url,
    class: "btn btn-primary card-btn",
    target: "_blank"
    });

    fullRecipe.text("Full Recipe")

    colDiv.append(cardDiv);
    cardDiv.append(img);
    cardDiv.append($("<hr>"))
    cardBlock.append(title);
    cardBlock.append($("<hr>"));
    cardBlock.append(dietLabels);
    cardBlock.append($("<hr>"));
    cardBlock.append(fullRecipe);


    cardDiv.append(cardBlock)

    $("#favorites").append(colDiv);
  }
};

var myFavs = [
  {
    image: "https://www.edamam.com/web-img/b76/b76a48e89abc9d8dc83c0fd011a30e7a.jpg",
    label: "Steak &amp; Eggs Rancheros" ,
    dietLabels: "Low-Carb",
    url: "http://www.finecooking.com/recipes/steak-eggs-rancheros.aspx"
  },
  {
    image: "https://www.edamam.com/web-img/b33/b33541d0c45da177396b15918c07c38d.jpg",
    label:"Sunday Brunch: Steak, Eggs, And Sunny Side-Up Asparagus",
    dietLabels: "Low-Carb",
    url: "http://www.seriouseats.com/recipes/2010/05/sunday-brunch-steak-and-eggs-and-asparagus-cheese-recipe.html"
  },
  {
    image:"https://www.edamam.com/web-img/31f/31f36c43d9330cff1957f9b59bcfaf9c.jpg" ,
    label: "Steak, Egg &amp; Blue Cheese Salad",
    dietLabels: "Low-Carb",
    url:"http://www.finecooking.com/recipes/steak-egg-blue-cheese-salad.aspx"
  },
  {
    image: "https://www.edamam.com/web-img/14b/14b22dac0fbcfe358c03f93b2b78e0eb.jpg",
    label: "Chicken Fried Steak With Country Gravy",
    dietLabels: "Low-Carb",
    url: "http://norecipes.com/blog/2008/12/14/chicken-fried-steak-with-country-gravy/"
  }
];

$(document).ready(function(){
  $.get("api/user").done(function(result) {
    console.log(result);
    typeof(result);
    if (result) {
      $.get("/api/favorites/" + result.user, function(result){
        console.log(result)
        if(result === "NO Favorites" || result.length < 5){
            console.log("we are in no favs ")
          generateFavs(myFavs);
        } else {
            console.log("we are in there are favs")
          generateFavs(result);
        }
      })
    }
  })
});
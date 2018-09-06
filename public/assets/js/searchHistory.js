$(document).ready(function(){
    $.get("api/user").done(function(result){
        if (typeof result === "object"){
            $.get("/api/history/" + result.user,function(data){
              console.log(data);
              if (typeof data === "object"){
                var searchHistory = $("<h1/>");
                searchHistory.addClass("text-center")
                searchHistory.attr("href","#history");
                searchHistory.attr("data-toggle", "collapse");
                searchHistory.text("Search History");
                var searchList = $("<div id='history'/>");
                for (let i = 0; i < data.length; i++){
                    if (i > 4){
                      break;
                    }
                    var search = $("<div/>");
                    search.addClass("text-center");
                    var anch = $("<a class='search-history'/>").text(data[data.length-1-i].item);
                    anch.attr("href","#");
                    search.append(anch);
                    searchList.append(search)
                }
  
                $("#history-form").after(searchList);
                $("#history-form").after(searchHistory);
            }
          });
        }
      });
  
    $(".search-history").click(function(){
      event.preventDefault();
      var ingredients = $(this).text();
      console.log(ingredients);
      var food = {
        foods: ingredients.split(" ")
      }
    //   $.post("api/recipesearch/",food)
    //   .done(displayRecipes); 
  
    });
})
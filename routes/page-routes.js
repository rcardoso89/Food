
module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/recipeSearch/:ingredients?', function(req, res){
    res.render('recipesearch');
  });

}

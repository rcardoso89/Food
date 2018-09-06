var supertest = require("supertest");
var should = require("chai").should();
var expect = require("chai").expect;

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin


describe("Favorites PUT test",function(){
  // #1 REGISTER USER
  it("#1 POST test for user registration",function(done){
    server
    .post('/api/registeruser')
    .send({username : "okapoor@gmail.com", password: "omtest"})
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.equal(200)
      expect(res.body.username).to.equal("okapoor@gmail.com");
      expect(res.body.password).to.equal("omtest");
      done();
    });
  });
//
   //   userid: req.session.passport.user.toString(),
   //   label: req.body.label,
      // dietLabels: req.body.dietLabels,
      // url: req.body.url,
      // image: req.body.image,

  // #2 Test Favorites POST
  it("POST test for favorites",function(done){
    server
    .post('/api/favorites')
    .send({userid : "10", label: "omtestitem",img: "http://testimage.com",url:"http://testrecipe.com",dietLabels:"tomatoes"})
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.equal(200);
      done();
    });
  });

  //#3 GET request on homepage
  it("GET request on homepage",function(done){
    server
    .get('/')
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.equal(200);
      done();
    });
  });


  it("GET request on history with no data",function(done){
    server
    .get('/api/history/testinvalid')
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.equal(200);
      expect(res.text).to.equal("No History available for user");
      done();
    });
  });

  // it("GET request on favorites WITH data",function(done){
  //   server
  //   .get('/api/favorites/okapoor@gmail.com')
  //   .expect(200)
  //   .end(function(err,res){
  //     expect(res.status).to.equal(200);
  //     expect(res.body[0].username).to.equal("okapoor@gmail.com");
  //     done();
  //   });
  // });
});
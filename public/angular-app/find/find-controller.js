angular.module('cdfinance').controller("FindController", FindController);

function FindController($http, $window, AuthFactory, jwtHelper, $location) {

  var vm = this;
      
      vm.isLoggedIn = function(){
        if (AuthFactory.isLoggedIn){
        return true;
        }else{
        return false;
        }
      };
      
  console.log("findController");
  vm.find = function() {
    var symbol = vm.symbol.toUpperCase();
    console.log(symbol)
    
    $http.get("/api/stocks/" + symbol).then(function(response) {
      console.log("found stock")
      var stockprice = response.data.price
      vm.stockprice = stockprice;
      vm.error = null;
    }).catch(function(error) {
      if (error) {
        vm.error = error;
      }
    })
  }
  
  vm.buy = function(){
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          var username = decodedToken.username;
          var data = {"symbol" : vm.symbol.toUpperCase(), "amount": vm.amount, "price": vm.stockprice}

      $http.post('/api/users/'+ username +"/stocks", data).then(function(response) {
        //check the responses
      }).catch(function(error) {
        console.log(error);
      })
  }
}
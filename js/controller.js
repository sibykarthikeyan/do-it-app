myapp.controller('doitController',function($scope,$http){
	
	
	$scope.data = {};
		
	var FromDate = new Date();
	console.log('clicked ghgv hgh submit' + FromDate);
	$scope.doItInfo= function(){
		console.log('clicked submit' + FromDate);
		var data = {'info':'Welcome to nuy rainbow','did':'467e7077c3809b26','cdate':FromDate};//JSON.stringify($scope.user);
		console.log('data json:', + data);
		$http({
				url: 'http://localhost:8080/',
			method: 'POST',
			data: data
		}).then(function (httpResponse) {
			console.log('response:', httpResponse);
			console.log('json response:', JSON.parse(httpResponse));
		})
   };
   
   $scope.myFilter = function (category) { 
    return category.did === '467e7077c3809b26'; 
   };
   
   $scope.enableCustomerDirective = false;
   $scope.IsVisible = true;
   $scope.addDoItClick = function(){
	$scope.enableCustomerDirective = true; 
	$scope.IsVisible = false;
   };
  
   $http({
	   url: 'http://localhost:8080/',
	   method: 'GET', 
	   }).success(function(response) {
		   console.log('got response get ' + JSON.parse(response));
		   $scope.categories = JSON.parse(response); 
		  
		   //if($scope.categories[did] === '467e7077c3809b27')
		   var last = $scope.categories[$scope.categories.length - 1];
		   var indexCounter = $scope.categories.length - 1 ; 
		   console.log('mere phari' + last);
				for(var i = 1; i <= indexCounter; i++) {
					 console.log('dsvddv' + last);
				  $scope.categories.push(last + i);
				}
	   });
	   
});




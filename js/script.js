(function(){
  var newAJAX = new XMLHttpRequest();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=butterfly&format=json&origin=*"

  newAJAX.open('GET', url);
  newAJAX.send();
  newAJAX.responseType = 'json';

  newAJAX.onload = function(){
    results = newAJAX.response;
    console.log(results);
  }
})();

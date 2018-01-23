//(function(){
//  var newAJAX = new XMLHttpRequest();
//  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=butterfly&format=json&origin=*"
//
//  newAJAX.open('GET', url);
//  newAJAX.send();
//  newAJAX.responseType = 'json';
//
//  newAJAX.onload = function(){
//    results = newAJAX.response;
//    console.log(results);
//  }
//})();

document.getElementById("sbtn").onclick = box;
let resDisp = document.getElementById("container");

function box(){
  let search = document.getElementById("searchBox").value;
  let hasChild = resDisp.querySelector("#container ul") != null;
  if(hasChild){
    let ul = document.querySelector("#container ul");
    ul.parentNode.removeChild(ul);
  }
  else{
    alert("No UL");
  }
  wikiSearch(search);
}

function wikiSearch(search){
  let newAJAX = new XMLHttpRequest();
  let url = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*"

  newAJAX.open('GET', url+"&search="+search);
  newAJAX.send();
  newAJAX.responseType = 'json';

  newAJAX.onload = function(){
    results = newAJAX.response;
//    console.log(results);
    displayResults(results);
  }

}

function displayResults(results){
  let resArr = [];
  let ul = document.createElement('ul');

  for(let i=0; i<(results[1].length>10 ? 10 : results[1].length); i++){
    let a = document.createElement('a');
    let li = document.createElement('li');
    a.href = results[3][i];
    a.text = results[1][i];
    a.setAttribute("target", "_blank");
    li.appendChild(a);
    ul.appendChild(li);
    resDisp.appendChild(ul);
  }



//  alert(resArr[1]);
}










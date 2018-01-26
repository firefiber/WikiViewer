let wikiLink = "http://en.wikipedia.org/?curid="; //Used to put in the page ID for full URL
let resDisp = document.getElementById("container"); //Div where results are displayed

let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("sbtn");
let randomBtn = document.getElementById("rbtn");

// Pressing "ENTER" or clicking button - initiates API call
$(document).ready(function(){
  searchBtn.onclick = sbox;
  searchBox.addEventListener("keyup", function(event){
      event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      if (event.keyCode === 13){
        searchBtn.click();
      }
    })
})

// Stores user search text, removes previous search items, if any.
function sbox(){
  let searchText = document.getElementById("searchBox").value;
  let errorMsg = document.getElementById("error");

  if (searchText !== ""){
    let hasChild = resDisp.querySelector("#container ul") != null;

    if(hasChild){
      let ul = document.querySelector("#container ul");
      ul.parentNode.removeChild(ul);
    }
    wikiSearch(searchText);
  }
}

// Initiates API call with search text
function wikiSearch(search){
  let newAJAX = new XMLHttpRequest();
  let page = 0;
  let url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info|pageimages&piprop=thumbnail|name&list=search&generator=search&inprop=url&srlimit=10&sroffset=0&srprop=snippet&gsrlimit=10&gsroffset=0"

  newAJAX.open('GET', url+"&srsearch="+search+"&gsrsearch="+search);
  newAJAX.send();
//  newAJAX.responseType = 'json';

  newAJAX.onload = function(){
    results = JSON.parse(newAJAX.responseText);
//    console.log(results);
    displayResults(results);
  }
}

// Displays the results, title and snippet, along with URL to page
function displayResults(results){
  let snippets = results.query.search;
  let urls = results.query.pages;
  let imgArr = [];

  let ul = document.createElement('ul');

//  console.log(snippets);
  console.log(urls);

  const arr = [];
  for(let key in urls){
    arr.push(urls[key]);
  }

  arr.sort(function(i,j){
    return i.index - j.index;
  });

  console.log(arr);

  for(let i=0; i<(snippets.length>10 ? 10 : snippets.length); i++){
    let a = document.createElement('a');
    let li = document.createElement('li');
    let p = document.createElement('p');

    a.href = wikiLink+snippets[i].pageid;
    a.text = snippets[i].title + ": ";
    a.setAttribute("target", "_blank");

    p.innerHTML = snippets[i].snippet;

    li.appendChild(a);
    li.appendChild(p);
    ul.appendChild(li);
    resDisp.appendChild(ul);
  }
//  alert(resArr[1]);
}
















// TODO[x]: Add a "random article" functionality
// TODO: Get list of wikipedia API endpoints
// TODO: Find a way to get user language, and change API endpoint to that language
// TODO: Remove all "console-log"s and "alert"s before final push
// FUTURE: Change to jQuery








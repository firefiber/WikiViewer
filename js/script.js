let resDisp = document.getElementById("container");
let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("sbtn");

// Pressing "ENTER" or clicking button - initiates API call
searchBtn.onclick = sbox;
searchBox.addEventListener("keyup", function(event){
    event.preventDefault();
    if (event.keyCode === 13){
      searchBtn.click();
    }
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
  let url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=info&list=search&generator=search&inprop=url&srlimit=10&sroffset=1&srprop=snippet&gsrlimit=10&gsroffset=1"

  newAJAX.open('GET', url+"&srsearch="+search+"&gsrsearch="+search);
  newAJAX.send();
  newAJAX.responseType = 'json';

  newAJAX.onload = function(){
    results = newAJAX.response;
//    console.log(results);
    displayResults(results);
  }
}

// Displays the results, title and snippet, along with URL to page
function displayResults(results){
  let snippets = results.query.search;
  let urls = results.query.pages;
  let urlArr = [];

  let ul = document.createElement('ul');

  console.log(snippets);
  console.log(urls);

  for (let key in urls){
    urlArr.push(urls[key].fullurl);
  }

  console.log(urlArr);
  console.log(snippets[0].title);

  for(let i=0; i<(urlArr.length>10 ? 10 : urlArr.length); i++){
    let a = document.createElement('a');
    let li = document.createElement('li');
    let p = document.createElement('p');

    a.href = urlArr[i];
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


// TODO: Find a way to get user language, and change API endpoint to that language
// FUTURE: Change to jQuery








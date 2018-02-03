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

// Initiates API call with search text, segregates recieved data before displaying it.
function wikiSearch(search){
  let newAJAX = new XMLHttpRequest();
  let page = 0;
  let urlOld = "https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&prop=extracts|info|images&generator=search&exsentences=2&exintro=1&inprop=url&imlimit=2&gsrlimit=10&gsroffset=0&gsrsearch=Mozart"

  let url = "https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&prop=extracts|info|images|pageimages&generator=search&exchars=120&exintro=1&inprop=url&imlimit=2&piprop=original|name&gsrlimit=10&gsroffset=0"

  newAJAX.open('GET', url+"&gsrsearch="+search);
  newAJAX.send();

  newAJAX.onload = function(){
    rawData = JSON.parse(newAJAX.responseText);
    dataSort(rawData);
  }

  //Takes the 'query' bit of the response obj, converts it to an array,
  //sorts array by the 'index' of each item, low to high
  function dataSort(rawData){
    let rObj = rawData.query.pages;
    let rArr = [];

    for(let key in rObj){
      rArr.push(rObj[key]);
    }
    rArr.sort(function(i,j){
      return i.index - j.index;
    })
    console.log(rArr);
    displayResults(rArr);
  }
}

// Displays the results, title and snippet, along with URL to page
function displayResults(results){
  let imgLoc = "https://commons.wikimedia.org/wiki/Special:FilePath/";
  let ul = document.createElement('ul');

  for(let i=0; i<(results.length>10 ? 10 : results.length); i++){
    let a = document.createElement('a');
    let img = document.createElement('img');
    let li = document.createElement('li');
    let p = document.createElement('p');

//    if(results[i].pageimage || results[i].original || results[i].images){
//      if(results[i].pageimage){
//        img.src=imgLoc+results[i].pageimage;
//        li.appendChild(img);
//      }
//
//      else if(results[i].original){
//        console.log("Has original image");
//      }
//
//      else console.log("Has images array");
//    }

    a.href = results[i].fullurl;
    a.text = results[i].title + ": ";
    a.setAttribute("target", "_blank");

    p.innerHTML = results[i].extract;

    li.appendChild(a);
    li.appendChild(p);
    ul.appendChild(li);
    resDisp.appendChild(ul);
  }

}
















// TODO[x]: Add a "random article" functionality
// TODO: Display images next to search results
// TODO: Get list of wikipedia API endpoints
// TODO: Find a way to get user language, and change API endpoint to that language
// TODO: Remove all "console-log"s and "alert"s before final push
// FUTURE: Change to jQuery








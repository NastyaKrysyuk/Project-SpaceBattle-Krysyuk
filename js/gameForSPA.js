"use strict"

createGamePage();

function createGamePage(){
const wrapper = document.getElementById('wrapper');
let canvas=document.createElement('canvas');
canvas.id="mycanvas";
wrapper.appendChild(canvas);
wrapper.appendChild(createScore())
}

// function createLives(){
// for (let i; i<=3;i++){
//   let img=document.createElement('img');
//   img.src="./img/live.png";
// }
// }

function createScore(){
let score=document.createElement('div');
score.className="score";
score.textContent="Score:";
let span=document.createElement('span');
span.id="score";
score.appendChild(span);
return score;
}


// function createBackground(className) {
//   let base = document.createElement('div');
//   base.className = className;
//   return base;
// }

// function createLogo() {
//   let logo = document.createElement("object");
//   logo.type = "image/svg+xml";
//   logo.data = "img/logo/double-ringed-orb.svg"
//   return logo;
// }

// function createNavigation(classNameList,classNameNav) {
//   let navgation=document.createElement('nav');
//   let list=document.createElement('ul')
//   list.className=classNameList;
//   navgation.className=classNameNav;
//   list.appendChild(createItem("Start game"))
//   list.appendChild(createItem("Choose a hero"))
//   list.appendChild(createItem("Choose a background"))
//   list.appendChild(createItem("Rules and controls"))
//   list.appendChild(createItem("Records"))
//   navgation.appendChild(list);
//   return navgation;
// }

// function createItem(title){
//   let item=document.createElement('li');
//   let href=document.createElement('a');
//   href.textContent=title;
//   item.appendChild(href);
//   return item;
// }

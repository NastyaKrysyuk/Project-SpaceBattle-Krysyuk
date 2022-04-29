"use strict"

createChooseHeroPage();
function createChooseHeroPage() {
  const wrapper = document.getElementById("wrapper");
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
  wrapper.appendChild(createContainer("choose","text-content","Choose a hero",createForm));
}

function createBackground(className) {
  let base = document.createElement('div');
  base.className = className;
  return base;
}

function createContainer(classNameContainer,classNameTitle,caption,callback){
  let container=document.createElement('div');
  let title=document.createElement('h1');
  container.className=classNameContainer;
  title.className=classNameTitle;
  title.textContent=caption;
  container.appendChild(title);
  container.appendChild(callback());
  container.appendChild(createButtonOK("OK"));
  return container;
}
 


function createForm(){
  let form=document.createElement('form');
  form.appendChild(createInput("character1","character","character1",true));
  form.appendChild(createLabel("character1","img/character.png"));
  form.appendChild(createInput("character2","character","character2",false));
  form.appendChild(createLabel("character2","img/character/alien-stare.png"));
  form.appendChild(createInput("character3","character","character3",false));
  form.appendChild(createLabel("character3","img/character1.png"));
  return form;
}

function createInput(id,name,value,checked) {
let input= document.createElement('input');
input.type="radio";
input.id=id;
input.name=name;
input.value=value;
input.checked=checked;
return input;
}

function createLabel(htmlFor,imgSrc){
let label=document.createElement('label');
let img=document.createElement('img');
label.htmlFor=htmlFor;
img.src=imgSrc;
label.appendChild(img);
return label;
}

function createButtonOK(caption){
  let buttonOK=document.createElement('a');
  buttonOK.textContent=caption;
  return buttonOK;
}
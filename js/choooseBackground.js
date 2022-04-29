"use strict"

createChooseBackgroundPage();
function createChooseBackgroundPage() {
  const wrapper = document.getElementById("wrapper");
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
  wrapper.appendChild(createContainer("choose","text-content","choose a background", createForm));
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
function createF(){
  
}
function createForm(){
  let form=document.createElement('form');
  form.appendChild(createInput("background1","background","background1",true));
  form.appendChild(createLabel("background1","img/background/background1.jpg"));
  form.appendChild(createInput("background2","background","background2",false));
  form.appendChild(createLabel("background2","img/background/background2.jpg"));
  form.appendChild(createInput("background3","background","background3",false));
  form.appendChild(createLabel("background3","img/background/background3.jpg"));
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
img.className="background-img";
img.src=imgSrc;
label.appendChild(img);
return label;
}

function createButtonOK(caption){
  let buttonOK=document.createElement('a');
  buttonOK.textContent=caption;
  return buttonOK;
}
"use strict"

createRecordPage();

function createRecordPage(){
const wrapper = document.getElementById('wrapper');
wrapper.appendChild(createBackground("stars"));
wrapper.appendChild(createBackground("twinkling"));
wrapper.appendChild(createContainer("choose","text-content","Records"));
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
  // container.appendChild(callback());
  container.appendChild(createButtonOK("OK"));
  return container;
}

function createButtonOK(caption){
  let buttonOK=document.createElement('a');
  buttonOK.textContent=caption;
  return buttonOK;
}
"use strict"

createRulsPage();

function createRulsPage(){
const wrapper = document.getElementById('wrapper');
wrapper.appendChild(createBackground("stars"));
wrapper.appendChild(createBackground("twinkling"));
wrapper.appendChild(createContainer("choose","text-content","Rules and controls", createTextContent));
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
  container.appendChild(callback(" Nisi doloribus quisquam doloremque voluptatem facilis sunt quod, eos eligendi temporibus facere nemo est sequi totam eius obcaecati perferendis rem aliquam molestiae."));
  container.appendChild(createButtonOK("OK"));
  return container;
}

function createTextContent(textContent){
  let rulsAndControls= document.createElement("p");
  rulsAndControls.textContent=textContent;
  return rulsAndControls;
}

function createButtonOK(caption){
  let buttonOK=document.createElement('a');
  buttonOK.textContent=caption;
  return buttonOK;
}
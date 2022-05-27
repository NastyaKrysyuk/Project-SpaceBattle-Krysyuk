// import {switchToGame, switchToMain,switchToHero,switchToBackground,switchToRules,switchToRecords} from 'SPA.js';
const wrapper = document.getElementById("wrapper");

function saveSelection(key) {
  var selection = document.getElementsByTagName('input');
  for (var i = 0; i <= selection.length; i++) {
    if (selection[i].checked == true) {
      var value = selection[i].value;
      localStorage.setItem(key, value);
    }
  }
}
function createBackgroundApp() {
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
}
//GAME_________________________________________________________________________________________
function createGamePage() {
  let wrapper = document.getElementById('wrapper');
  let canvas = document.createElement('canvas');
  canvas.id = "mycanvas";
  wrapper.style.height = "100%"
  wrapper.style.height = "100%"
  wrapper.appendChild(canvas);
  wrapper.appendChild(createScore())
  wrapper.appendChild(createLives("lives"));
  wrapper.appendChild(createButtonOK("Back", switchToMain, "score butBack"));
}

function createScore() {
  let score = document.createElement('div');
  score.className = "score";
  score.textContent = "Score:";
  let span = document.createElement('span');
  span.textContent = '0';
  span.id = "score";
  score.appendChild(span);
  return score;
}

function createLives(className) {
  let lives = document.createElement("div")
  lives.className = className;
  for (let i = 1; i <= 3; i++) {
    let img = document.createElement('img');
    img.src = "img/life.png";
    lives.appendChild(img)
  }
  return lives;
}

//MAIN PAGE____________________________________________________________________________________

function createMainPage() {
  createBackgroundApp();
  wrapper.appendChild(createLogo());
  wrapper.appendChild(createNavigation("main-nav__items", "main-nav"));
}

function createBackground(className) {
  let base = document.createElement('div');
  base.className = className;
  return base;
}

function createLogo() {
  let logo = document.createElement("object");
  logo.type = "image/svg+xml";
  logo.data = "img/logo/double-ringed-orb.svg"
  return logo;
}

function createNavigation(classNameList, classNameNav) {
  let navgation = document.createElement('nav');
  let list = document.createElement('ul')
  list.className = classNameList;
  navgation.className = classNameNav;
  list.appendChild(createItem("Start game", switchToGame))
  list.appendChild(createItem("Choose a hero", switchToHero))
  list.appendChild(createItem("Choose a background", switchToBackground))
  list.appendChild(createItem("Rules and controls", switchToRules))
  list.appendChild(createItem("Records", switchToRecords))
  navgation.appendChild(list);
  return navgation;
}

function createItem(title, hashChange) {
  let item = document.createElement('li');
  let href = document.createElement('a');
  href.textContent = title;
  href.onclick = hashChange;
  item.appendChild(href);
  return item;
}

//CHOOSE HERO________________________________________

function createChooseHeroPage() {
  createBackgroundApp();
  wrapper.appendChild(createContainer("choose", "text-content", "Choose a hero", createFormHero, "character"));
}

function createContainer(classNameContainer, classNameTitle, caption, callback, key, arg) {
  let container = document.createElement('div');
  let title = document.createElement('h1');
  container.className = classNameContainer;
  title.className = classNameTitle;
  title.textContent = caption;
  container.appendChild(title);
  container.appendChild(callback(arg));
  container.appendChild(createButtonOK("OK", switchToMain));
  container.appendChild(createButtonSave("SAVE", key));
  return container;
}

function createFormHero() {
  let form = document.createElement('form');
  form.name = "myform"
  form.appendChild(createInput("character1", "character", "character", true));
  form.appendChild(createLabel("character1", "img/character.png"));
  form.appendChild(createInput("character2", "character", "character1", false));
  form.appendChild(createLabel("character2", "img/character1.png"));
  form.appendChild(createInput("character3", "character", "character2", false));
  form.appendChild(createLabel("character3", "img/character2.png"));
  return form;
}

function createInput(id, name, value, checked) {
  let input = document.createElement('input');
  input.type = "radio";
  input.id = id;
  input.name = name;
  input.value = value;
  input.checked = checked;
  return input;
}

function createLabel(htmlFor, imgSrc, className) {
  let label = document.createElement('label');
  let img = document.createElement('img');
  label.htmlFor = htmlFor;
  img.src = imgSrc;
  img.className = className;
  label.appendChild(img);
  return label;
}

function createButtonOK(caption, callback, className) {
  let buttonOK = document.createElement('a');
  buttonOK.className = className;
  buttonOK.textContent = caption;
  buttonOK.onclick = callback;
  return buttonOK;
}

function createButtonSave(caption, key) {
  let buttonSave = document.createElement('a');
  buttonSave.textContent = caption;
  buttonSave.addEventListener('click', saveSelection.bind(this, key), false);
  return buttonSave;
}

//CHOOSE BACKGROUND________________________________________

function createChooseBackgroundPage() {
  createBackgroundApp();
  wrapper.appendChild(createContainer("choose", "text-content", "choose a background", createFormBackground, "background"));
}

function createFormBackground() {
  let form = document.createElement('form');
  form.name = "myform"

  form.appendChild(createInput("background1", "background", "background", true));
  form.appendChild(createLabel("background1", "img/background/background1.png", "background-img"));
  form.appendChild(createInput("background2", "background", "background1", false));
  form.appendChild(createLabel("background2", "img/background/background2.png", "background-img"));
  form.appendChild(createInput("background3", "background", "background2", false));
  form.appendChild(createLabel("background3", "img/background/background3.png", "background-img"));
  return form;
}


//Rules and controls________________________________________

function createRulesPage() {
  createBackgroundApp();
  wrapper.appendChild(createTextContent("text-content"))
  wrapper.appendChild(createButtonOK("OK", switchToMain));
}

function createTextContent(className) {
  let container = document.createElement('div');
  let caption = document.createElement("h1");
  caption.className = className;
  caption.textContent = "Rules";
  container.id = "wrap-records";
  container.appendChild(caption);
  $.ajax("js/records.html",
    {
      type: "GET",
      cache: false,
      dataType: "html",
      success: function (content) {
        container.innerHTML += content;
      },
    }
  );
  return container;
}

//Records________________________________________

function createRecordPage() {
  createBackgroundApp();
  wrapper.appendChild(containerForRecords("text-content"));
  wrapper.appendChild(createButtonOK("OK", switchToMain));
}

function containerForRecords(className) {
  let container = document.createElement('div');
  let caption = document.createElement("h1");
  caption.className = className;
  caption.textContent = "Records";
  container.id = "wrap-records";
  container.appendChild(caption)
  let playersRef = firebase.database().ref("list/");
  playersRef.on("child_added", function (data) {
    const newPlayer = data.val();
    container.innerHTML += `<p>${newPlayer.name} : ${newPlayer.score}</p>`;
  })
  return container;
}

export {createGamePage, createMainPage,createChooseHeroPage,createChooseBackgroundPage,createRulesPage,createRecordPage};
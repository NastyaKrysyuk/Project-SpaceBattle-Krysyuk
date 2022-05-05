window.onhashchange = renderNewState;
function renderNewState() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    state = { page: 'Main' };
  } else {
    state = JSON.parse(state);
  }
  document.getElementById('wrapper').innerHTML = '';

  switch (state.page) {
    case 'Game':
      createGamePage();
      break;
    case 'Main':
      createMainPage();
      break;
    case 'ChooseHero':
      createChooseHeroPage();
      break;
    case 'ChooseBackground':
      createChooseBackgroundPage();
      break;
    case 'Rules':
      createRulsPage();
      break;
    case 'Records':
      createRecordPage();
      break;
  }
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}
function switchToGame() {
  switchToState({ page: 'Game' });
}
function switchToMain() {
  switchToState({ page: 'Main' });
}
function switchToHero() {
  switchToState({ page: 'ChooseHero' });
}
function switchToBackground() {
  switchToState({ page: 'ChooseBackground' });
}
function switchToRules() {
  switchToState({ page: 'Rules' });
}
function switchToRecords() {
  switchToState({ page: 'Records' });
}

renderNewState();

//GAME_________________________________________________________________________________________
function createGamePage() {
  let wrapper = document.getElementById('wrapper');
  let canvas = document.createElement('canvas');
  canvas.id = "mycanvas";
  wrapper.style.height="100%"
  wrapper.style.height="100%"
  wrapper.appendChild(canvas);
  wrapper.appendChild(createScore())
  wrapper.appendChild(createLives("lives"))
}

function createScore() {
  let score = document.createElement('div');
  score.className = "score";
  score.textContent = "Score:";
  let span = document.createElement('span');
  span.id = "score";
  score.appendChild(span);
  return score;
}

function createLives(className){
  let lives=document.createElement("div")
  lives.className=className;
for (let i=1; i<=3;i++){
  let img=document.createElement('img');
  img.src="img/live.png";
  lives.appendChild(img)
}
return lives;
}


//MAIN PAGE____________________________________________________________________________________

function createMainPage() {
  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
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
  list.appendChild(createItem("Start game",switchToGame))
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
  const wrapper = document.getElementById("wrapper");
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
  wrapper.appendChild(createContainer("choose", "text-content", "Choose a hero", createFormHero));
}

function createContainer(classNameContainer, classNameTitle, caption, callback, argsCollback) {
  let container = document.createElement('div');
  let title = document.createElement('h1');
  container.className = classNameContainer;
  title.className = classNameTitle;
  title.textContent = caption;
  container.appendChild(title);
  container.appendChild(callback(argsCollback));
  container.appendChild(createButtonOK("OK", switchToMain));
  return container;
}

function createFormHero() {
  let form = document.createElement('form');
  form.appendChild(createInput("character1", "character", "character1", true));
  form.appendChild(createLabel("character1", "img/character.png"));
  form.appendChild(createInput("character2", "character", "character2", false));
  form.appendChild(createLabel("character2", "img/character/alien-stare.png"));
  form.appendChild(createInput("character3", "character", "character3", false));
  form.appendChild(createLabel("character3", "img/character1.png"));
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

function createButtonOK(caption, hashChange) {
  let buttonOK = document.createElement('a');
  buttonOK.textContent = caption;
  buttonOK.onclick = hashChange;
  return buttonOK;
}

//CHOOSE BACKGROUND________________________________________

function createChooseBackgroundPage() {
  const wrapper = document.getElementById("wrapper");
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
  wrapper.appendChild(createContainer("choose", "text-content", "choose a background", createFormBackground));
}

function createFormBackground() {
  let form = document.createElement('form');
  form.appendChild(createInput("background1", "background", "background1", true));
  form.appendChild(createLabel("background1", "img/background/background1.jpg", "background-img"));
  form.appendChild(createInput("background2", "background", "background2", false));
  form.appendChild(createLabel("background2", "img/background/background2.jpg", "background-img"));
  form.appendChild(createInput("background3", "background", "background3", false));
  form.appendChild(createLabel("background3", "img/background/background3.jpg", "background-img"));
  return form;
}


//Rules and controls________________________________________

function createRulsPage() {
  const textContent = "Nisi doloribus quisquam doloremque voluptatem facilis sunt quod, eos eligendi temporibus facere nemo est sequi totam eius obcaecati perferendis rem aliquam molestiae."
  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
  wrapper.appendChild(createContainer("choose", "text-content", "Rules and controls", createTextContent, textContent));
}

function createTextContent(textContent) {
  let rulsAndControls = document.createElement("p");
  rulsAndControls.textContent = textContent;
  return rulsAndControls;
}

//Records________________________________________

function createRecordPage() {
  const wrapper = document.getElementById('wrapper');
  wrapper.appendChild(createBackground("stars"));
  wrapper.appendChild(createBackground("twinkling"));
  wrapper.appendChild(createContainer("choose", "text-content", "Records"));
}

// function createContainer(classNameContainer,classNameTitle,caption,callback){
//   let container=document.createElement('div');
//   let title=document.createElement('h1');
//   container.className=classNameContainer;
//   title.className=classNameTitle;
//   title.textContent=caption;
//   container.appendChild(title);
//   // container.appendChild(callback());
//   container.appendChild(createButtonOK("OK",switchToMain));
//   return container;
// }

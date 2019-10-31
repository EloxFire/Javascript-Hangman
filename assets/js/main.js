
//*********************************************//
/* Nom du programme : JEU DU PENDU / HANGMAN   */
/* Nom de l'auteur : Enzo Avagliano / EloxFire */
/* Version du programme : 1.0                  */
/* First Release Date : 04/11/19               */
//*********************************************//



/* VARIABLES
*  Liste de mots
*  Index mot séléctioné
*  Tableau des underscores
*  Tableau des lettres correctes
*  Tableau des lettres incorrectes
*  Tableau des lettres déjà proposées
*  Nombre de vie restantes
*  Nombre de victoires
*  Nombre de défaites
*  i = index pour l'image de la potence a afficher
*  DOM de la potence
*  DOM de l'image de la potence
*  DOM du texte d'informations de jeu
*  DOM des lettres déjà proposées
*  DOM des underscores
*  DOM win
*  DOM lose
*/

let randomNumber;
let selectedWord;
let key;
let underscores = [];
let rightLetters = [];
let wrongLetters = [];
let proposedLetters = [];
let lives;
let winStrike = 0;
let loseStrike = 0;
let i;
let potenceDOM = document.getElementById('potence');
let imgDOM = document.getElementById('image');
let gameTextDOM = document.getElementById('playerInfos');
let proposedLettersDOM = document.getElementById('proposedLetters');
let underscoreDOM = document.getElementById('wordLetters');
let winStrikeDOM = document.getElementById('winStrikeDOM');
let loseStrikeDOM = document.getElementById('loseStrikeDOM');
let resetButtonDOM = document.getElementById('resetButton');


/*
* Fonction afin d'adapter le nombre d'Underscore au nombre de lettres du mot
* sélectioné
*
* On retourne le tableau a la fin
*/
function makeUnderscores(){
  for (let i = 0; i < selectedWord.length; i++) {
    underscores.push('_');
    underscoreDOM.innerHTML = underscores;
  }
  console.log("Mot choisi :", selectedWord);
  console.log(underscores);
  console.log(" ");
  return underscores;
}

function checkIfLetterIsContained(){
  if(selectedWord.includes(key) && lives > 0){
    proposedLetters.push(key);
    rightLetters.push(key);
    underscores[selectedWord.indexOf(key)] = key;

    underscoreDOM.innerHTML = underscores;
    proposedLettersDOM.innerHTML = proposedLetters;
    gameTextDOM.innerHTML = "Il vous reste " + lives + " vies."
  }else {
    i++;
    lives--;
    wrongLetters.push(key);
    proposedLetters.push(key);
    proposedLettersDOM.innerHTML = proposedLetters;
    gameTextDOM.innerHTML = "Il vous reste " + lives + " vies."

    // Gestion des images de la potence
    if(i < 6){
      imgDOM.src = `assets/img/potence${i}.png`;
    }else{
      imgDOM.src = `assets/img/perdu.png`;
      resetButtonDOM.style.display = "block";
    }
  }
  console.log("Lettre proposée :", key);
  console.log("Lettres déjà proposées :", proposedLetters);
  console.log("Lettres correctes :", rightLetters);
  console.log("Lettres incorrectes :", wrongLetters);
  console.log("Index potence :", i);
  console.log(" ");
}

function checkIfWordIsFound(){
  if(underscores.join('') === selectedWord && lives > 0){
    console.log("YOU WIN");
    console.log("Index potence :", i);
    console.log(" ");
    imgDOM.src = `assets/img/win.png`;
    resetButtonDOM.style.display = "block";
  }
}

function reset(){
  gameLoop();
}


function gameLoop(){
  while(rightLetters.length > 0){
    rightLetters.pop();
  }
  while(wrongLetters.length > 0){
    wrongLetters.pop();
  }
  while(proposedLetters.length > 0){
    proposedLetters.pop();
  }
  while(underscores.length > 0){
    underscores.pop();
  }
  underscoreDOM.innerHTML = underscores;
  proposedLettersDOM.innerHTML = "Ø";
  resetButtonDOM.style.display = "none";
  selectedWord = data.mots[Math.floor(Math.random() * (data.mots.length - 0) + 0)];
  lives = 6;
  i = 0;
  imgDOM.src = `assets/img/potence${i}.png`;
  makeUnderscores();
  if(underscores.join('') !== selectedWord && lives > 0){
    document.addEventListener('keypress', function(e){
      key = String.fromCharCode(e.keyCode).toUpperCase();
      checkIfLetterIsContained();
      checkIfWordIsFound();
    });
  }else {
    console.log("AÏE, ERREUR");
  }
}

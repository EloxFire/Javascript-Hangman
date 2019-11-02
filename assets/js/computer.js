
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
*  i = index pour l'image de la potence a afficher
*  Nombre de vie restantes
*  Tableau des lettres correctes
*  Tableau des lettres incorrectes
*  Tableau des lettres déjà proposées
*  Nombre de victoires
*  Nombre de défaites
*  DOM de la potence
*  DOM de l'image de la potence
*  DOM du texte d'informations de jeu
*  DOM des lettres déjà proposées
*  DOM des underscores
*  DOM win
*  DOM lose
*  DOM Button de reset
*  DOM Texte de reset
*  DOM Input utilisateur pour mode de jeu Ordi Guess
*/

let randomNumber;
let selectedWord;
let key;
let i;
let lives;
let underscores = [];
let rightLetters = [];
let wrongLetters = [];
let proposedLetters = [];
let winStrike = 0;
let loseStrike = 0;
let potenceDOM = document.getElementById('potence');
let imgDOM = document.getElementById('image');
let gameTextDOM = document.getElementById('playerInfos');
let proposedLettersDOM = document.getElementById('proposedLetters');
let underscoreDOM = document.getElementById('wordLetters');
let winStrikeDOM = document.getElementById('winStrikeDOM');
let loseStrikeDOM = document.getElementById('loseStrikeDOM');
let resetButtonDOM = document.getElementById('resetButton');
let resetTextDOM = document.getElementById('resetText');
let wordInput = document.getElementById('wordInput');


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

/*
* Verification pour ne pas pouvoir proposer une lettre déjà proposée
* (Oui je suis gentil quand meme)
*/
function checkIfLetterIsAlreadyProposed(){
  if(proposedLetters.includes(key)){
    console.log("Lettre dejà proposée !");
    console.log(" ");
    return;
  }else {
    checkIfLetterIsContained();
    checkIfWordIsFound();
  }
}

/*
* Verification des lettres pour voir si elles corespondent à la proposition du
* joueur
*/
function checkIfLetterIsContained(){
  if(selectedWord.includes(key) && lives > 0){
    proposedLetters.push(key);
    rightLetters.push(key);

    // Gestion de plusieurs meme lettres
    for (let l = 0; l < selectedWord.length; l++) {
      if(selectedWord.charAt(l) == key){
        underscores[l] = key;
      }
    }

    // Update des elements HTML pour l'interface.
    underscoreDOM.innerHTML = underscores;
    proposedLettersDOM.innerHTML = proposedLetters;
    gameTextDOM.innerHTML = "Il vous reste " + lives + " vies."
  }else {
    i++; // Etat de la potence.
    lives--;
    wrongLetters.push(key);
    proposedLetters.push(key);
    proposedLettersDOM.innerHTML = proposedLetters;
    gameTextDOM.innerHTML = "L'ordinateur possède " + lives + " vies."

    // Gestion des images de la potence
    if(i < 6){
      imgDOM.src = `assets/img/potence${i}.png`; // IMage de la potence en fonction de son état
    }else{
      lives = 0;
      loseStrike++;
      imgDOM.src = `assets/img/perdu.png`;

      console.log("YOU LOSE");
      console.log("FIN DU JEU !");
      console.log(" ");

      resetButtonDOM.style.display = "block";
      resetTextDOM.innerHTML = "Le mot à deviner était : " + selectedWord;
      resetTextDOM.style.display = "block";
      loseStrikeDOM.innerHTML = "Défaites : " + loseStrike;
      return;
    }
  }

  console.log("Lettre proposée par l'ordi :", key);
  console.log("Etat du mot :", underscores);
  console.log("Lettres déjà proposées :", proposedLetters);
  console.log("Lettres correctes :", rightLetters);
  console.log("Lettres incorrectes :", wrongLetters);
  console.log("Index potence :", i);
  console.log("Victoires :", winStrike);
  console.log("Défaites :", loseStrike);
  console.log(" ");
}

/*
* Fonction de verification de si le mot est trouvé ou pas
*/
function checkIfWordIsFound(){
  if(underscores.join('') === selectedWord && lives > 0){
    winStrike++;
    console.log("YOU WIN");
    console.log("Index potence :", i);
    console.log("Victoires :", winStrike);
    console.log("Défaites :", loseStrike);
    console.log(" ");
    imgDOM.src = `assets/img/win${i}.png`;
    resetButtonDOM.style.display = "block";
    winStrikeDOM.innerHTML = "Victoires : " + winStrike;
  }
}

function makeAGuess(){
  key = listeMots.alphabet_ordi[Math.floor(Math.random() * (listeMots.alphabet_ordi.length - 0) + 0)];
}

function resetComputer(){
  computerGameLoop();
}

/*
* Loop du jeu adaptée pour l'ordinateur
*/
function computerGameLoop(){
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

  lives = 6;
  i = 0;

  underscoreDOM.innerHTML = underscores;
  proposedLettersDOM.innerHTML = "Ø";
  resetButtonDOM.style.display = "none";
  gameTextDOM.innerHTML = "Il vous reste " + lives + " vies."
  imgDOM.src = `assets/img/potence${i}.png`;

  selectedWord = wordInput.value;
  makeUnderscores();

  if(underscores.join('') !== selectedWord && lives > 0){
    setTimeout(function(){
      console.log(" ");
      makeAGuess();
      checkIfLetterIsAlreadyProposed();
    }, 2000);
  }else {
    console.log("AÏE, ERREUR");
  }
}

// barre de navigation fixe

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $("#navbar").addClass("fixed-navbar");
    } else {
      $("#navbar").removeClass("fixed-navbar");
    }
  });
});

// Section application
// Sélectionner tous les boutons
const appButtons = document.querySelectorAll(".app-button");

// Sélectionner les éléments de la section de téléchargement
const downloadGif = document.querySelector(".download-gif img");
const downloadText = document.querySelector(".download-text-content p");
const downloadButton = document.querySelector(
  ".download-text-content .btn-download"
);

let isButtonClicked = false; // Drapeau pour indiquer si un bouton a été cliqué
let appCurrentIndex = 0; // Index du bouton actuel dans la section application

// Fonction pour changer vers le bouton suivant
function goToNextButton() {
  if (!isButtonClicked) {
    const nextIndex = (appCurrentIndex + 1) % appButtons.length;
    setActiveButton(nextIndex);
  }
}

// Fonction pour définir un bouton actif
function setActiveButton(index) {
  const button = appButtons[index];
  const text = button.getAttribute("data-text");
  const gif = button.getAttribute("data-gif");
  const download = button.getAttribute("data-download");

  downloadGif.src = gif;
  downloadText.textContent = text;
  downloadButton.setAttribute("data-download", download);

  appButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  appCurrentIndex = index;
}

// Ajouter un écouteur d'événement à chaque bouton
appButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    isButtonClicked = true;
    setActiveButton(index);

    setTimeout(() => {
      isButtonClicked = false;
    }, 3000);
  });
});

// Définir l'intervalle pour la transition automatique
setInterval(goToNextButton, 2000); // Modifier la valeur selon vos besoins

// Section creation
// Sélection des éléments nécessaires
const creaTitles = document.querySelectorAll(".crea-title");
const creaSubtexts = document.querySelectorAll(".crea-subtext");
const creaImages = document.querySelectorAll(".crea-image img");

let creaCurrentIndex = 0; // Index du bouton actuel dans la section creation

// Fonction pour mettre à jour le contenu en fonction de l'index
function updateContent(index) {
  // Masquer tous les sous-titres et images
  creaSubtexts.forEach((subtext) => (subtext.style.display = "none"));
  creaImages.forEach((image) => (image.style.display = "none"));

  // Afficher le sous-titre et l'image correspondants à l'index
  creaSubtexts[index].style.display = "block";
  creaImages[index].style.display = "block";
}

// Fonction pour passer à l'index suivant de manière cyclique
function goToNextIndex() {
  creaCurrentIndex = (creaCurrentIndex + 1) % creaTitles.length;
  updateContent(creaCurrentIndex);
}

// Mise en place de la transition automatique
let autoTransition = setInterval(goToNextIndex, 5000); // Changement toutes les 5 secondes

// Ajout d'événements click sur les titres
creaTitles.forEach((title, index) => {
  title.addEventListener("click", function () {
    clearInterval(autoTransition); // Arrêter la transition automatique
    creaCurrentIndex = index;
    updateContent(creaCurrentIndex);
    autoTransition = setInterval(goToNextIndex, 5000); // Redémarrer la transition automatique
  });
});

// Initialisation avec le contenu par défaut
updateContent(creaCurrentIndex);

// Section commentaire
// Sélection des éléments nécessaires
const commentContainer = document.querySelector(".comment-container");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

// Tableau de commentaires
const comments = [
  {
    image: "chemin_vers_image1.jpg",
    text: "Commentaire 1",
  },
  {
    image: "chemin_vers_image2.jpg",
    text: "Commentaire 2",
  },
  {
    image: "chemin_vers_image3.jpg",
    text: "Commentaire 3",
  },
  // Ajoutez les autres commentaires ici
];

let currentCommentIndex = 0;

// Fonction pour afficher le commentaire actuel
function displayCurrentComment() {
  const currentComment = comments[currentCommentIndex];
  const commentImage = document.createElement("img");
  commentImage.src = currentComment.image;
  commentImage.alt = "Personne";
  const commentText = document.createElement("p");
  commentText.textContent = currentComment.text;

  commentContainer.innerHTML = "";
  commentContainer.appendChild(commentImage);
  commentContainer.appendChild(commentText);

  // Masquer les commentaires précédents/suivants
  const allComments = document.querySelectorAll(".comment");
  allComments.forEach((comment, index) => {
    comment.style.display = index === currentCommentIndex ? "block" : "none";
  });
}

// Événement lors du clic sur la flèche gauche
arrowLeft.addEventListener("click", () => {
  currentCommentIndex--;
  if (currentCommentIndex < 0) {
    currentCommentIndex = comments.length - 1;
  }
  displayCurrentComment();
});

// Événement lors du clic sur la flèche droite
arrowRight.addEventListener("click", () => {
  currentCommentIndex++;
  if (currentCommentIndex >= comments.length) {
    currentCommentIndex = 0;
  }
  displayCurrentComment();
});

// Affichage initial du premier commentaire
displayCurrentComment();

// Section FAQ
// Sélection des éléments nécessaires
const faqItems = document.querySelectorAll(".faq-item");

// Fonction pour afficher ou masquer la réponse
function toggleAnswer() {
  const answer = this.nextElementSibling;
  const toggleIcon = this.querySelector(".faq-toggle");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    toggleIcon.textContent = "+";
  } else {
    // Masquer toutes les autres réponses
    faqItems.forEach((item) => {
      const otherAnswer = item.querySelector(".faq-answer");
      const otherToggleIcon = item.querySelector(".faq-toggle");
      if (otherAnswer !== answer) {
        otherAnswer.style.display = "none";
        otherToggleIcon.textContent = "+";
      }
    });

    answer.style.display = "block";
    toggleIcon.textContent = "-";
  }
}

// Ajout de l'événement de clic à chaque question
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", toggleAnswer);
});

// Affichage par défaut du premier commentaire
toggleAnswer.call(faqItems[0].querySelector(".faq-question"));

//menu deroulant footer

// Récupérer tous les éléments avec la classe "dropdown-toggle"
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

// Ajouter un gestionnaire d'événement clic à chaque élément
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    // Récupérer la liste déroulante associée à l'élément cliqué
    const dropdownList = toggle.nextElementSibling;

    // Basculer la classe "open" sur la liste déroulante
    dropdownList.classList.toggle("open");
  });
});

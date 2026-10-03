let articles = JSON.parse(localStorage.getItem("articles")) || [
    {
        titre: "Une actualité d'Afrique",
        texte: "Voici notre première information sur l'Afrique.",
        categorie: "Afrique"
    },
    {
        titre: "Une actualité du monde",
        texte: "Voici une information internationale.",
        categorie: "Monde"
    },
    {
        titre: "Une actualité sportive",
        texte: "Voici une information sur le sport.",
        categorie: "Sport"
    }
];

const boutons = document.querySelectorAll("nav button");
const listeArticles = document.querySelector("#liste-articles");
const titreRubrique = document.querySelector("#titre-rubrique");

const formulaire = document.querySelector("#formulaire-article");
const champTitre = document.querySelector("#titre");
const champTexte = document.querySelector("#texte");
const champCategorie = document.querySelector("#categorie");

function afficherArticles(categorie = "Toutes") {
    listeArticles.innerHTML = "";

    const articlesFiltres = articles.filter(function (article) {
        return categorie === "Toutes" || article.categorie === categorie;
    });

    articlesFiltres.forEach(function (article) {
        const bloc = document.createElement("article");

        bloc.innerHTML = `
            <h3>${article.titre}</h3>
            <p>${article.texte}</p>
            <small>Rubrique : ${article.categorie}</small>
        `;

        listeArticles.appendChild(bloc);
    });

    titreRubrique.textContent = categorie;
}

boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        afficherArticles(bouton.textContent);
    });
});

formulaire.addEventListener("submit", function (evenement) {
    evenement.preventDefault();

    const nouvelArticle = {
        titre: champTitre.value.trim(),
        texte: champTexte.value.trim(),
        categorie: champCategorie.value
    };

    articles.push(nouvelArticle);

    localStorage.setItem("articles", JSON.stringify(articles));

    formulaire.reset();
    afficherArticles();

    alert("Article ajouté et sauvegardé !");
});

afficherArticles();
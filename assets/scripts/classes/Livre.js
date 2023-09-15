import GestionnaireLibrairie from "./GestionnaireLibrairie.js";

export class Livre {
    constructor(donneesLivre, index) {
        this.containerListeLivre = GestionnaireLibrairie.instance.conteneurHTML.querySelector("[data-liste-livre]");
        this.index = index;
        this.titre = donneesLivre.titre;
        this.auteur = donneesLivre.auteur;
        this.description = donneesLivre.description;
        this.prix = donneesLivre.prix;
        this.editeur = donneesLivre.editeur
        this.nouveaute = donneesLivre.nouveaute;
        this.categorie = donneesLivre.categorie;
        this.image = donneesLivre.image;
        

        this.init();
    }

    init() {
        this.injecterHTML();
    }
    /**
     * Injecte un élément HTML représentant un livre à la fin de la liste de livres.
     */
    injecterHTML() {
        const livreHTML = `
                        <article class="container-livre" data-index-livre="${this.index}" data-categorie="${this.categorie}" data-nouveaute="${this.nouveaute}">
                            <picture
                            ><img src="${this.image}" alt="${this.titre}"
                            /></picture>
                            <div class="container-livre-text">
                            <h2>${this.titre}</h2>
                            <div>
                                <strong>${this.prix} $</strong>
                                <button data-btn-panier=${this.index}>Ajouter</button>
                            </div>
                            </div>
                            <div data-modal-livre></div>  
                        </article>`;
        this.containerListeLivre.insertAdjacentHTML('beforeend', livreHTML);

        const element = this.containerListeLivre.lastElementChild;
        const boutonPanier = element.querySelector("[data-btn-panier]");
        // Ajoute un gestionnaire d'événements au bouton "Ajouter" pour enregistrer le livre dans le panier.
        boutonPanier.addEventListener(
            "click",
            function (e) {
                e.preventDefault();
                GestionnaireLibrairie.instance.enregistrerPanier(this);
                }.bind(this));
    }
    }



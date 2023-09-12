import GestionnaireLibrairie from "./GestionnaireLibrairie.js";
import GestionnaireDonnees from "./GestionnaireDonnees.js";


export class PanierAchat {
    constructor() {
        this.panier = [];

        this.modalBtn = GestionnaireLibrairie.instance.conteneurHTML.querySelector(".btn-panier");
        this.panierModal = GestionnaireLibrairie.instance.conteneurHTML.querySelector(".panier-modal");

        this.afficherPanier = this.afficherPanier.bind(this);
        this.init();
    }

    init() {
        this.modalBtn.addEventListener("click", this.afficherPanier);
        
    }

    ajouterAuPanier(livre) {
        //Ajouter un livre au panier
        this.panier.push(livre);
        //On rafrachit la liste des items du panier avec la méthode setPanierHTML()
        this.setPanierHTML(this.panier);
    }

    setPanierHTML() {
        //On vide la liste des items du panier
        // Si le panier est vide, afficher un message
        if (this.panier.length === 0) {
            const msgVide = "Le panier est vide";
            this.panierModal.innerHTML = msgVide;
        }

        // Sinon, afficher les items du panier
        let tableHTML = '';

        this.panier.forEach(function (article) {
            tableHTML += `
                <tr>
                    <td>${article.titre}</td>
                    <td>${article.prix} $</td>
                </tr>
            `;
        });
        const tableBody = this.panierModal.querySelector('tbody');
        tableBody.innerHTML = tableHTML;
    }

    afficherPanier() {
        //Afficher le panier avec CSS
        this.panierModal.classList.toggle("invisible");
    }

    calculerSousTotal() {
    //additionner chaque prix des articles dans panier;
    }
    calculerTaxes() {}
    calculerTotal() {}
}

import GestionnaireLibrairie from "./GestionnaireLibrairie.js";

export class PanierAchat {
    constructor() {
        this.panier = [];

        this.modalBtn = GestionnaireLibrairie.instance.conteneurHTML.querySelector(".btn-panier");
        this.panierModal = GestionnaireLibrairie.instance.conteneurHTML.querySelector(".panier-modal");

        this.afficherPanier = this.afficherPanier.bind(this);
        //On récupère les éléments HTML
        this.init();
    }

    init() {
        this.modalBtn.addEventListener("click", this.afficherPanier);
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
        console.log(this.panier);
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

    ajouterAuPanier(livre) {
        //Ajouter un livre au panier
        this.panier.push(livre);
        this.setPanierHTML(this.panier);
        //On rafrachit la liste des items du panier avec la méthode setPanierHTML()
    }

    afficherPanier() {
        //Afficher le panier avec CSS
        this.panierModal.classList.toggle("invisible");
    }

    calculerSousTotal() {}
    calculerTaxes() {}
    calculerTotal() {}
}

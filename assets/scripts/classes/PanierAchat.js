import GestionnaireLibrairie from "./GestionnaireLibrairie.js";


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
        let nouveauLivre;
        this.panier.forEach(function (article) {
            if (livre.titre !== article.titre){
                nouveauLivre = livre;
            }
        })
        this.panier.push(nouveauLivre);
        this.setPanierHTML(this.panier);
        }


    setPanierHTML() {

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

        const containerTotal = this.panierModal.querySelector("[data-prix]");
        containerTotal.innerHTML = this.calculerTotal() + " $";

        const thLivre = this.panierModal.querySelector("[data-th-livre]");
        if(this.panier.length + 1){thLivre.innerHTML("Livres")};
    }

    afficherPanier() {
        if (this.panier.length == 0) {
            const msgVide = "Il n'y a aucun livre dans votre panier.";
            this.panierModal.innerHTML = msgVide;
        }
        
        this.panierModal.classList.toggle("invisible");
    }

    calculerTotal() {
    let totalPrix = 0;
        this.panier.forEach(function (article){
            totalPrix += article.prix
        })
        return totalPrix;
    }
}

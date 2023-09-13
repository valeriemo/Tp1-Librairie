import GestionnaireLibrairie from "./GestionnaireLibrairie.js";


export class PanierAchat {
    constructor() {
        this.panier = [];

        this.modalBtn = GestionnaireLibrairie.instance.conteneurHTML.querySelector(".btn-panier");
        this.panierModal = GestionnaireLibrairie.instance.conteneurHTML.querySelector(".panier-modal");
        this.afficherPanier = this.afficherPanier.bind(this);
        this.divMsg = this.panierModal.querySelector("[data-msg]");
        this.tablePanier = this.panierModal.querySelector("[data-table]");
        this.init();
    }

    init() {
        this.modalBtn.addEventListener("click", this.afficherPanier);
        
    }

    ajouterAuPanier(livre) {
        console.log(livre.titre);
        console.log('le panier',this.panier)

        // PROBLEME ICI - je veux eviter que le meme livre entre 2 fois dans le panier
        console.log(this.panier.length);
        const livreDejaPresent = this.panier.some(function (article) {
            return livre.titre === article.titre;
        });
        
        if (!livreDejaPresent) {
            this.panier.push(livre);
        }
        
        console.log('panier a la fin ajouterpanier', this.panier);
// POURQUOI il ne s'ajoute pas ???
        this.setPanierHTML(this.panier);
    }


    setPanierHTML() {
        // Enlever le msg de panier vide si visible
        if(!this.divMsg.classList.contains("invisible")){
            this.divMsg.classList.add("invisible");
        }

        let tableHTML = '';
        console.log('panier dans set panier',this.panier);
        this.panier.forEach(function (article) {
            tableHTML += `
                <tr>
                    <td>${article.titre}</td>
                    <td>${article.prix} $</td>
                </tr>
            `;
        });
        console.log(this.panierModal);
        const tableBody = this.panierModal.querySelector('tbody');
        console.log(tableBody);
        tableBody.innerHTML = tableHTML;

        const containerTotal = this.panierModal.querySelector("[data-prix]");
        containerTotal.innerHTML = this.calculerTotal() + " $";

        const thLivre = this.panierModal.querySelector("[data-th-livre]");
        if(this.panier.length + 1){thLivre.innerHTML = "Livres"};
    }

    afficherPanier() {
        if (this.panier.length == 0) {
            const msgVide = "Il n'y a aucun livre dans votre panier.";
            this.divMsg.innerHTML = msgVide;
            this.tablePanier.classList.add('invisible');
        } else {
            this.tablePanier.classList.remove('invisible');
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

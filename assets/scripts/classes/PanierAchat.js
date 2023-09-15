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
    /**
     * Ajoute un livre au panier.
     *
     * @param {object} livre - L'objet représentant le livre à ajouter au panier.
     */
    ajouterAuPanier(livre) {

         // Vérifie si le livre est déjà présent dans le panier en utilisant la méthode `some`.
        const livreDejaPresent = this.panier.some(function (article) {
            return livre.titre === article.titre;
        });
        if (!livreDejaPresent) {
            this.panier.push(livre);
        }
        // Mise a jour du panier 
        this.setPanierHTML(this.panier);
    }

    
    /**
     * Met à jour l'affichage du panier avec les livres dans le panier.
     */
    setPanierHTML() {
        // Enlever le msg de panier vide si visible
        if(!this.divMsg.classList.contains("invisible")){
            this.divMsg.classList.add("invisible");
        }

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
        // Appelle la fonction calculerTotal() pour le total
        containerTotal.innerHTML = this.calculerTotal() + " $";

        // Gestion du pluriel du mot "livre"
        const thLivre = this.panierModal.querySelector("[data-th-livre]");
        if(this.panier.length + 1){thLivre.innerHTML = "Livres"};
    }

    /**
     * Affiche ou masque le panier en fonction du contenu du panier
     */
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

    /**
     * Calcule le total de tous les articles dans le panier
     * 
     * @returns {number} Le total des prix
     */
    calculerTotal() {
    let totalPrix = 0;
        this.panier.forEach(function (article){
            totalPrix += article.prix
        })
        return totalPrix;
    }
}

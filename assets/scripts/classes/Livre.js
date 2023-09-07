export class Livre {
    constructor(donneesLivre, index) {
        //Comme il n'y a pas de base de données, on doit créer un index pour chaque livre
        //Cet index sera utilisé pour identifier le livre dans le panier d'achat
        //Et récupérer les informations du livre dans la liste des livres
        this.containerListeLivre = document.querySelector("[data-liste-livre]");
        
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

    injecterHTML() {
        //Ce code n'est pas complet, vous devez vous l'approprier en fonction de votre projet
        //Vous pouvez utiliser les attributs data-* pour stocker des informations dans le HTML
        //Ex: data-index-livre, data-categorie, data-nouveaute, etc.
        //Le CSS doit être adapté en conséquence
        const livreHTML = `
                        <article class="container-livre" data-index-livre="${this.index}" data-categorie="${this.categorie}" data-nouveaute="${this.nouveaute}">
                            <picture
                            ><img src="${this.image}" alt="${this.image}"
                            /></picture>
                            <div class="container-livre-text">
                            <h2>${this.titre}</h2>
                            <div>
                                <strong>${this.prix} $</strong>
                                <button data-btn-panier=${this.index}>Ajouter</button>
                            </div>
                            </div>
                        </article>`;

        //On injecte le HTML dans la liste du gestionnaire de librairie
        this.containerListeLivre.insertAdjacentHTML('beforeend', livreHTML);

        const element = this.containerListeLivre.lastElementChild;
        const boutonPanier = element.querySelector("[data-btn-panier]");

        
        boutonPanier.addEventListener(
            "click",
            function () {
                //AJOUTER LIVRE AU PANIER
                // GestionnaireLibrairie.instance.panier.ajouterAuPanier();

                const donnees = {
                    detail:this,
                }
                /**
                 * librairieApp_ajouterPanier envoie de la donnee
                 */
                const evenement = new CustomEvent("librairieApp_ajouterPanier", donnees);
                
                document.dispatchEvent(evenement);

                }.bind(this));
                console.log(element, boutonPanier);
        // Ajouter l'événement sur le bouton d'ajout au panier

        // Ajouter l'événement sur les filtres
    }
    



    afficherDetails() {
        //Afficher les détails du livre dans la modale
    }

    }



import { listeLivres } from "../../../data/listeLivres.js";
import { PanierAchat } from "./PanierAchat.js";
import { LivreModal } from "./modal.js";
// Ou devrais-je sauvegarder mes données ?
import GestionnaireDonnees from "./GestionnaireDonnees.js";
import { Livre } from "./Livre.js";
/**
 * Classe GestionnaireLibrairie
 * contient la liste des livres et implémente le patron Singleton
 */
export default class GestionnaireLibrairie {
    constructor(conteneurHTML) {
        if (GestionnaireLibrairie.instance == null) {
            GestionnaireLibrairie.instance = this;
        } else {
            throw new Error("Impossible d'instancier plus d'une fois GestionnaireLibrairie");
        }

        this.conteneurHTML = conteneurHTML;
        this.listeObjetsLivres = [];
        // Conteneur de tous les livres:
        this.listeHTML = this.conteneurHTML.querySelector("[data-liste-livre]");
        // Btn filtre:
        this.btnCategorie = this.conteneurHTML.querySelector("[data-liste-filtre]");
        // On initialise le panier d'achat
        this.panierAchat = new PanierAchat();
        // ** A faire **
        // On initialise la boite modale de détails de livre
        // ** A faire **
        // On initialise les valeurs et les événements

        this.init();
    }

    init() {
        listeLivres.forEach((element, index) => {
            const livre = new Livre(element, index);
            this.listeObjetsLivres.push(livre);
        });

        this.conteneursLivre = this.listeHTML.querySelectorAll(".container-livre");

        this.conteneursLivre.forEach(function (conteneur) {
            conteneur.addEventListener('click', function(e){
                if(e.target.closest("[data-btn-panier]")!=null){
                    return;
                }
                console.log(conteneur);
                const modalLivre = new LivreModal(conteneur);
            });
        });
        
        this.btnCategorie.addEventListener('click', function (e) {
            if (e.target.dataset.filtreCategorie == 'litterature') {
                this.filtrerListeLivres('Littérature', e);
            } else if (e.target.dataset.filtreCategorie == 'art de vivre') {
                this.filtrerListeLivres('Art de vivre', e);
            } else if (e.target.dataset.filtreCategorie == 'bd, jeunesse, humour') {
                this.filtrerListeLivres('BD, Jeunesse, Humour', e);
            } else if (e.target.dataset.filtreCategorie == 'culture et societe') {
                this.filtrerListeLivres('Culture et société', e);
            } else if (e.target.dataset.filtreCategorie == 'loisirs, tourisme, nature') {
                this.filtrerListeLivres('Loisirs, Tourisme, Nature', e);
            } else if (e.target.dataset.filtreCategorie == 'savoir et science') {
                this.filtrerListeLivres('Savoir et science', e)
            } else if (e.target.dataset.filtreCategorie == 'nouveaute') {
                this.filtrerNouveautes('nouveaute', e)
            } else if (e.target.dataset.filtreCategorie == 'tous'){
                this.filtrerListeLivres('tous', e);
            }
        }.bind(this));


        this.chargerPanier();
    }


    filtrerListeLivres(filtre, evenement) {

        const elementsAvantFiltres = this.listeHTML.querySelectorAll(".container-livre");
        if (filtre == 'tous') {
            elementsAvantFiltres.forEach((element) => {
                if (element.classList.contains('invisible')){
                    element.classList.remove('invisible');
                }
            });
        } else {
            elementsAvantFiltres.forEach((element) => {
                if (element.classList.contains('invisible')){
                    element.classList.remove('invisible');
                }
            });
            elementsAvantFiltres.forEach((element) => {
                if (element.dataset.categorie !== filtre) {
                    element.classList.add('invisible');
                }
            });
        }
    }

    filtrerNouveautes(evenement) {
        const elementsAvantFiltres = this.listeHTML.querySelectorAll(".container-livre");
            elementsAvantFiltres.forEach((element) => {
                if (element.classList.contains('invisible')){
                    element.classList.remove('invisible');
                }
            });
            elementsAvantFiltres.forEach((element) => {
                if (element.dataset.nouveaute == 'false') {
                    element.classList.add('invisible');
                }
            });
    }
    

    enregistrerPanier(nouveauLivre) {
        this.panierAchat.ajouterAuPanier(nouveauLivre);
        const donneePanier = this.panierAchat.panier;
        const donneesLocales = GestionnaireDonnees.enregistrerDonneesLocales("panier", donneePanier);
        //Récupérer le contenu du panier d'achat
        //Enregistrer le panier dans session storage
    }

    chargerPanier() {
        const donneesLocales = GestionnaireDonnees.recupererDonneesLocales("panier");
        this.panierAchat.panier = donneesLocales;
        this.panierAchat.setPanierHTML();
        console.log("test");
        //Charger le panier du session storage
        //Remplir le panier d'achat avec les données du session storage
        //Afficher le panier d'achat
    }
}
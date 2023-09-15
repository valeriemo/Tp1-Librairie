import { listeLivres } from "../../../data/listeLivres.js";
import { PanierAchat } from "./PanierAchat.js";
import { LivreModal } from "./modal.js";
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
        this.listeHTML = this.conteneurHTML.querySelector("[data-liste-livre]");
        this.btnCategorie = this.conteneurHTML.querySelector("[data-liste-filtre]");

        this.panierAchat = new PanierAchat();

        this.init();
    }

    /**
     * Initialise l'app
     * Création des objets Livre pour chaque element de la liste livre
     * Ajout de gestionnaire d'événement sur le conteneur livre et bouton de filtre
     */
    init() {
        listeLivres.forEach((element, index) => {
            const livre = new Livre(element, index);
            this.listeObjetsLivres.push(livre);
        });

        this.conteneursLivre = this.listeHTML.querySelectorAll(".container-livre");

        this.conteneursLivre.forEach(function (conteneur) {
            conteneur.addEventListener('click', function(e){
                // Vérifie si un bouton "Ajouter au panier" a été cliqué.
                if(e.target.closest("[data-btn-panier]")!=null){
                    return; // si oui ne rien faire
                }
                const modalLivre = new LivreModal(conteneur);
            });
        });
        // Ajout du gestionnaire d'événements sur le bouton de filtre par catégorie
        this.btnCategorie.addEventListener('click', function (e) {
            e.preventDefault();
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
                this.filtrerNouveautes();
            } else if (e.target.dataset.filtreCategorie == 'tous'){
                this.filtrerListeLivres('tous', e);
            }
        }.bind(this));

        // Je ramasse la donnée si il y en a pour la mettre dans le panier
        this.chargerPanier();
    }

    /**
     * 
     * @param {string} filtre La catégorie de filtre
     */
    filtrerListeLivres(filtre) {

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

    /**
     * Filtre la liste des livres pour afficher les nouveautés
     */
    filtrerNouveautes() {
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
    
    /**
     * Enregistre un nouveau livre dans le panier
     * @param {object} nouveauLivre Les données du nouveau livre à ajouter
     */
    enregistrerPanier(nouveauLivre) {
        this.panierAchat.ajouterAuPanier(nouveauLivre);
        const donneePanier = this.panierAchat.panier;
        const donneesLocales = GestionnaireDonnees.enregistrerDonneesLocales("panier", donneePanier);
    }

    /**
     * Ramasse les données locales si présente
     */
    chargerPanier() {
        const donneesLocales = GestionnaireDonnees.recupererDonneesLocales("panier");
        if (donneesLocales !== null){
            this.panierAchat.panier = donneesLocales;
            this.panierAchat.setPanierHTML();
        }
    }
}
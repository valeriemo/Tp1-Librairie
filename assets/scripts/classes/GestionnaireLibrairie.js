import { listeLivres } from "../../../data/listeLivres.js";
import { PanierAchat } from "./PanierAchat.js";
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
        // On assigne l'instance à la propriété instance de la classe
        // La propriété instance est statique, elle appartient à la classe et non à l'instance
        // A faire

        this.conteneurHTML = conteneurHTML;

        // On initialise les propriétés
        this.selectionFiltre = null;
        this.listeObjetsLivres = [];
        // Conteneur de tous les livres:
        this.listeHTML = this.conteneurHTML.querySelector("[data-liste]");


        // On initialise le panier d'achat
        this.panierAchat = new PanierAchat();
        // ** A faire **

        // On initialise la boite modale de détails de livre
        // ** A faire **

        // On initialise les valeurs et les événements
        this.init();
    }

    init() {
        // On crée un objet livre pour chaque livre de la liste
        // Afficher la liste des livres au chargement de la page à chaque création de new livre
        listeLivres.forEach((element, index) => {
            const livre = new Livre(element, index);
            this.listeObjetsLivres.push(livre);
        });

        
    }

    onHandleClick(e) {
        //Si on clique sur le bouton d'ajout au panier, on ajoute le livre au panier
        //Si on clique ailleurs sur la liste, on affiche les détails du livre avec la modale
    }


    filtrerListeLivres(filtre, evenement) {}

    enregistrerPanier() {
        //Récupérer le contenu du panier d'achat
        //Enregistrer le panier dans session storage
    }

    chargerPanier() {
        //Charger le panier du session storage
        //Remplir le panier d'achat avec les données du session storage
        //Afficher le panier d'achat
    }
}
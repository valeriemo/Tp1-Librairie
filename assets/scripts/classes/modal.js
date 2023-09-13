import { listeLivres } from "../../../data/listeLivres.js";
import GestionnaireLibrairie from "./GestionnaireLibrairie.js";


export class LivreModal {
    constructor(conteneur) {
            this.conteneur = conteneur;
            this.listeHTML = GestionnaireLibrairie.instance.conteneurHTML.querySelector("[data-liste-livre]")
            this.modalLivre = GestionnaireLibrairie.instance.conteneurHTML.querySelector("[data-modal]");
            this.index = this.conteneur.dataset.indexLivre;
            this.divModal = conteneur.querySelector("[data-modal-livre]");
            
            this.setHTML = this.setHTML.bind(this)
            this.init();
    }

    init() {
        const data = listeLivres[this.index];
        this.setHTML(data);
    }

    setHTML(data) {
        //Modifier le texte de la boite modale
        const HTMLModal = `<div data-modal class="livre-modal">
                                <picture>
                                <img src="${data.image}" alt="${data.titre}" />
                                </picture>
                                <div>
                                    <div>
                                        <hgroup>
                                            <h4>Titre : </h4>
                                            <p>${data.titre}</p>
                                        </hgroup>
                                        <hgroup>
                                            <h4>Auteur : </h4>
                                            <p>${data.auteur}</p>
                                        </hgroup>
                                        <hgroup>
                                            <h4>Éditeur : </h4>
                                            <p>${data.editeur}</p>
                                        </hgroup>
                                        <hgroup>
                                            <h4>Pages : </h4>
                                            <p>${data.page}</p>
                                        </hgroup>
                                    </div>
                                <p>${data.description}</p>
                                </div>
                            </div>`;
        this.divModal.insertAdjacentHTML('beforeend', HTMLModal);
        this.afficher();
    }

    afficher() {
        if (this.divModal.classList.contains("invisible")){
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }

        this.divModal.classList.toggle("invisible");
    }
}

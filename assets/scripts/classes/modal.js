import { listeLivres } from "../../../data/listeLivres.js";


export class LivreModal {
    constructor(conteneur) {
            //Initialiser les propriétés
            this.conteneur = conteneur;
            this.listeHTML = document.querySelector("[data-liste-livre]");
            this.modalLivre = document.querySelector("[data-modal]");
            this.index = this.conteneur.dataset.indexLivre;
            this.divModal = this.conteneur.querySelector("[data-modal-livre]");
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
        this.afficher()
    }

    afficher() {
        //Afficher la boite modale avec le CSS
        this.divModal.classList.toggle("invisible");

        //Bloquer le scroll de la page
        //- On peut utiliser la propriété overflow: hidden; sur le body
        //- et mettre la propriété height: 100vh; sur le body
        //Ex: document.body.style.overflow = "hidden";
    }

    cacher() {
        //Cacher la boite modale avec le CSS
        this.divModal.classList.add('invisible');

        //Débloquer le scroll de la page
        //Ex: document.body.style.overflow = "";
    }
}

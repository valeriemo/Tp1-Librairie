import GestionnaireLibrairie from "./classes/GestionnaireLibrairie.js";

/**
 * Lance l'app en créant un instance de GestionnaireLibrairie
 */
(function () {
    const app = new GestionnaireLibrairie(document.querySelector("[data-librairie]"));
})();

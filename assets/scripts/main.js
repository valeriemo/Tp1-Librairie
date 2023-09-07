import GestionnaireLibrairie from "./classes/GestionnaireLibrairie.js";
import GestionnaireDonnees from "./classes/GestionnaireDonnees.js";

(function () {
    //initialiser le Gestionnaire de librairie
    const app = new GestionnaireLibrairie(document.querySelector("[data-librairie]"));
    // utilisation d'un fonction static:pas besoin d'instanciancier un objet pour avoir acces a la classe
    // test d'enresgistrement locale
    
    //GestionnaireDonnees.enregistrerDonneesLocales("patate", "betterave");
    //const obj = GestionnaireDonnees.recupererDonneesLocales("patate");

    //console.log(GestionnaireLibrairie.instance);
})();

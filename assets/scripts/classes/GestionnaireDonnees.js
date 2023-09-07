export default class GestionnaireDonnees {
    // fonction statique disponible partout sans avoir à faire new
    //LocalStorage
    static enregistrerDonneesLocales(cle, valeur) {
        const chaineJson = JSON.stringify(valeur);
        localStorage.setItem(cle, chaineJson);
    }

    static recupererDonneesLocales(cle) {
        const chaineEnregistree = localStorage.getItem(cle);
        const objConverti = JSON.parse(chaineEnregistree);
        return objConverti;
    }

    static supprimerDonneesLocales(cle) {
        localStorage.removeItem(cle);
    }

    static supprimerToutesDonneesLocales() {
        localStorage.clear();
    }

    //SessionStorage
    static enregistrerDonneesSession(cle, valeur) {
        const chaineJson = JSON.stringify(valeur);
        sessionStorageStorage.setItem(cle, chaineJson);
    }

    static recupererDonneesSession(cle) {
        const chaineEnregistree = sessionStorage.getItem(cle);
        const objConverti = JSON.parse(chaineEnregistree);
        return objConverti;
    }

    static supprimerDonneesSession(cle) {}

    static supprimerToutesDonneesSession() {
        sessionStorage.clear();
    }
}

// auteur: Nicolas Chourot


//
// Call back de keypress pour retenir uniquement les caractères alphabétiques
//
function textInputAlphaFilter(event){
    // expression régulière pour accepter que les caractères alphabétiques
    let regExp = new RegExp("^[a-zA-Z-àÀâÂäÄçÇéÉèÈêÊëËìÌîÎïÏòÒôÔöÖùÙûÛüÜ '.''']+$");
    // saisir le caractère
    let key = String.fromCharCode(event.which );

    // si n'est pas un contrôle et backspace
    if ((event.which !== 0) && (event.which !== 8)) {
        // filtrer le caractère
        if (!regExp.test(key)) {
            // annuler la propagation de l'événement
            event.preventDefault();
        }
    }
}

//
// utilisée par la classe ValidationProvider, détient la référence sur
// un élément et sa méthode de validation. Affiche un message d'erreur
// lorsque non valide.
//
class ValidationControl {
    constructor(elementId, validationTask) {
        // conserver l'élément à valider
        this.domElement = document.getElementById(elementId);
        if (this.domElement != null) {
            if (validationTask != undefined || validationTask != null) {
                // conserver sa méthode de validation qui
                // retourne une chaine vide si valide sinon un message d'erreur
                this.validationTask = validationTask;
                // insérér un message d'erreur masqué
                if (this.domElement != null) {
                    this.errorIndicator = document.createElement("div");
                    this.errorIndicator.style.display = "none";
                    this.errorIndicator.style.color = "red";
                    this.errorIndicator.textContent = "test";
                    this.domElement.insertAdjacentElement("afterend", this.errorIndicator);
                }
            }
            else {
                console.log("ValidationControl: validationTask inexistant");
            }
        }
        else{
            console.log("ValidationControl: controlId inexistant");
        }
    }

    // démasquer le message d'erreur
    showError(message) {
        this.errorIndicator.style.display = "block";
        this.errorIndicator.textContent = message;
    }

    // masquer le message d'erreur
    hideError() {
        this.errorIndicator.style.display = "none";
    }

    // Mettre à jour la visibilité du message d'erreur
    // retourne vrai si valide
    isValid() {
        // vérifier la validité
        let errorMessage = this.validationTask();
        // mettre à jour la visibilité du message d'erreur
        if (errorMessage !== "") {
            this.showError(errorMessage);
        }
        else {
            this.hideError();
        }
        // un message d'erreur vide indique qu'il n'y a pas d'erreur
        return errorMessage === "";
    }
}

//
// Automatiser la validation d'un ensemble d'éléments de formulaire
//
class ValidationProvider{
    constructor(formId) {
        // initialiser la liste de ValidationControl
        this.validationControls = [];
        // conserver la référence sur le formulaire
        this.form = document.getElementById(formId);
        // Ajouter un call back de l'événement submit au formulaire
        if (formId !== undefined)
            this.form.addEventListener("submit", (e) => { this.submit(e);});
    }

    isValid() {
        let formValid = true;
        this.validationControls.forEach( validationControl => {
            if (!validationControl.isValid()) {
                formValid = false;
            }
        });
        return formValid;
    }

    reset() {
        this.validationControls.forEach( validationControl => {
            validationControl.hideError();
        });
    }

    // Call back de l'événement submit
    submit(e) {
        if (!this.isValid()) {
            // empêcher la soumission
            e.preventDefault();
        }
        else {
            // Cette portion qui indique que le formulaire est valide
            // est présente que pour des fins pédagogiques.
            // Il faudrait la retirer en production.
            alert("Formulaire valide");
        }
    }

    // Call back de l'événement change pour un des ValidationControls ciblé
    changed(e){
        this.validationControls.forEach((validationControl) => {
            if (validationControl.domElement.id === e.target.id) {
                validationControl.isValid();
            }
        });
    }

    // ajout d'un ValidationControl
    // todo: ajouter la référence sur un tâche de validation à la soumission
    addControl(elementId, validationTask){
        let validationControl = new ValidationControl(elementId, validationTask);
        if (validationControl.domElement != null && (validationTask != undefined || validationTask != null)) {
            this.validationControls.push(validationControl);
            if (validationControl.domElement.tagName === "INPUT" ||
                validationControl.domElement.tagName === "TEXTAREA") {
                validationControl.domElement.addEventListener("input", (e) => { this.changed(e); });
                validationControl.domElement.addEventListener("blur", (e) => { this.changed(e); });
            }
            else
                validationControl.domElement.addEventListener("change", (e) => { this.changed(e); });
        }
    }
}
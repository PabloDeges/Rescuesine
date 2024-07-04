const { getAmoutOfIngredientsForRecipe, getRecipeIDsByIngredientAndTag, getRecipeByID } = require("./searchRecipe.controller");

/**
 * nimmt als parameter ein element.
 * element ist ein iterable mit namen von zutaten-IDs
 * uebergeordnete funktion, die das vorfiltern vor evtl spaetere andere nachsortierungen haengt
 */
async function filterRecipes(ingredients, tags, protocol, host) {
    let firstSort = await filterRecipesByIngredients(ingredients, tags);
    let secondSort = await orderRecipesByAmoutIngredientsLeft(firstSort);
    //erstellen der liste, welche alle infromationen enthaelt, die benoetigt werden um die rezept-karte anzuzeigen
    let sortedRecipes = [];
    for(let index in secondSort) {
        //besorgen der zusaetzlichen informationen aus der datenbank
        sortedRecipes.push(await getRecipeByID(secondSort[index], protocol, host));
    }
    return sortedRecipes;
}

/**
 * nimmt als parameter ein element.
 * element ist ein iterable mit namen von zutaten-IDs
 * die funktion sorgt fuer eine vorsortierung von daten
 * fuer alle zutaten des uebergebenen iterables werden alle ids von rezepten aus der db geholt, in denen diese vorkommt
 * anschliessend werden die haeufigkeiten des vorkommens einer id gezaehlt und in einem dict gespeichert
 * dieses dict wird umgespeichert, wodurch die haueefigkeit des vorkommens als key dient und diesem ein array an rezept-ids als value zugewiesen ist, die mit dieser haeufigkeit vorkommen
 * das umgespeicherte dict enthaelt in relevanzklassen (menge der vorhandenen zutaten im rezept) eingeteilte rezeptids
 * diese relevanzklassen werden zurueckgegeben
 */
async function filterRecipesByIngredients(ingredients, tags) {
    let dictRecipes = {};
    let dictOrderedRecipes = {};

    /*
    * mode bestimmt die art der filterung
    * 0 bedeutet, dass weder zutaten, noch tags uebergeben wurden
    * 1 bedeutet, dass keine zutaten, aber tags uebergeben wurden
    * 2 bedeutet, dass zutaten, aber keine tags uebergeben wurden
    * 3 bedeutet, dass sowohl zutaten, als auch tags uebergeben wurden
    */
    let mode;
    if (ingredients.length == 0) {
        if (tags.length == 0) {
            mode = 0;
        }
        else {
            mode = 1;
        }
    }
    else if (tags.length == 0) {
        mode = 2;
    }
    else {
        mode = 3;
    }

    //bei einem mode ohne zutaten, wird nicht ueber diese iteriert.
    //hier werden alle rezepte der anfrage gleichwertig zurueckgegeben.
    if (mode < 2) {
        let recipesIDs = await getRecipeIDsByIngredientAndTag(ingredients, tags, mode);
        dictOrderedRecipes[1] = recipesIDs;
    }
    else {

        //iterieren ueber alle zutaten des uebergebenen iterables
        for (let i = 0; i < ingredients.length; i++) {
            //alle rezepte in denen die akteulle zutat vorkommt aus der db holen
            let recipesIDs = await getRecipeIDsByIngredientAndTag(ingredients[i], tags, mode);
            //zutat wird uebersprungen, wenn keine rezepte dazu existieren
            if(recipesIDs == null) {
                continue;
            }
            //iterieren ueber alle gefundenen rezepte, keine iteration falls nichts gefunden
            for (let n = 0; n < recipesIDs.length; n++) {
                if (dictRecipes[recipesIDs[n]] === undefined) {
                    dictRecipes[recipesIDs[n]] = 1;
                } else {
                    dictRecipes[recipesIDs[n]] += 1;
                }
            }
        }

        for(let id in dictRecipes) {
            //ist eine relevanzklasse (menge der enthaltenen relevanten zutaten) nicht enthalten wird diese angelegt
            //sonst wird die jeweilige klasse um die id des rezepts erweitert
            if (dictOrderedRecipes[dictRecipes[id]] === undefined) {
                dictOrderedRecipes[dictRecipes[id]] = [id];
            } else {
                dictOrderedRecipes[dictRecipes[id]].push(id);
            }
        }
    }

    //rueckgabe der rezepte, eingeteilt in relevanzklassen
    return dictOrderedRecipes;
}


/**
 * nimmt als parameter ein element.
 * das Element ist ein dictionary mit ganzzahligen haeufigkeiten als key und einem array an rezept-ids als value
 * die funktion nimmt alle Elemente und sortiert innerhalb der values jeden keys die zugehoerigen rezepte nach der menge ihrer verwendeten zutaten
 * die ergebnisse der einzelnen umsortierungen innerhalb eines key-value spaces werden anschließend aneinandergehaengt
 * dieses array wird zurueckgegeben, die sortierung ist erst nach anzahl der vorkommenen zutaten und dann nach gesamtzahl noetiger zutaten
 */
async function orderRecipesByAmoutIngredientsLeft(relevanceClasses) {
    finishedOrder = [];

    //durchlaufen aller relevanzklassen des uebergebenen dicts
    //rueckwerts durchlaufen, da dict immer nach groesse aufsteigend sortiert sind
    let keys = Object.keys(relevanceClasses).reverse();
    for(let k in keys) {
        //in der schleife werden nicht die konkreten keys durchgeganen, sondern nur die indicecs, darum heir das umschreiben zu den konkreten werden
        i = keys[k];
        recipesInClass = {};
        //durchlaufen aller rezepte der aktuellen relevanzklasse
        for(let n = 0; n < relevanceClasses[i].length; n++) {
            //speichern der id der rezepte, sowie der anzahl der zutaten dieses rezepts
            let recipeID = relevanceClasses[i][n];
            let numOfIngredients = await getAmoutOfIngredientsForRecipe(recipeID);
            //die anzahl der benoetigten zutaten werden als keys hinterlegt, die rezept-ids als array im value
            if (recipesInClass[numOfIngredients] === undefined) {
                recipesInClass[numOfIngredients] = [recipeID];
              } else {
                recipesInClass[numOfIngredients].push(recipeID);
              }
        }
        addIDs(recipesInClass, finishedOrder);
    }
    return finishedOrder;
}


/**
 * nimmt als paramter zwei elemente.
 * erstes ist ein dict mit haeufigkeitszahlen als key und einem array aus rezept-ids als value, alias: from
 * zweites ist eine liste, in die die rezept-ids eingfuegt werden sollen, alias: to
 * die Funktion fuegt der liste "to" die rezept-ids aus "from" absteigend nach dem key in gleicher reihenfolge wie im jeweiligen value-array hinterlegt hinzu
 */
async function addIDs(from, to) {
    //durchlaufen aller keys (also anz zutaten) in aufsteigender reihenfolge
    let keys = Object.keys(from);
    for(let k in keys) {
        //in der schleife werden nicht die konkreten keys durchgeganen, sondern nur die indicecs, darum heir das umschreiben zu den konkreten werden
        i = keys[k];
        //durchlaufen des arrays im value des aktuellen keys
        for (let n = 0; n < from[i].length; n++) {
            to.push(from[i][n]);
        }
    }
}

module.exports = {
    filterRecipes
  };
const { getAmoutOfIngredientsForRecipe, getRecipeIDsByIngredient, getRecipeByID } = require("./searchRecipe.controller");

/**
 * nimmt als parameter ein element.
 * element ist ein iterable mit namen von zutaten-IDs
 * uebergeordnete funktion, die das vorfiltern vor evtl spaetere andere nachsortierungen haengt
 */
async function filterRecipes(ingredients, protocol, host) {
    let firstSort = await filterRecipesByIngredients(ingredients);
    let secondSort = await orderRecipesByAmoutIngredientsLeft(firstSort);
    let sortedRecipes = [];
    for(let index in secondSort) {
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
async function filterRecipesByIngredients(ingredients) {
    let dictRecipes = {};
    //iterieren ueber alle zutaten des uebergebenen iterables
    for (let i = 0; i < ingredients.length; i++) {
        //alle rezepte in denen die akteulle zutat vorkommt aus der db holen
        let recipesIDs = await getRecipeIDsByIngredient(ingredients[i]);
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

    let dictOrderedRecipes = {};
    //iterieren ueber alle vorherig herausgesuchten rezepte
    for(let id in dictRecipes) {
        //ist eine relevanzklasse (menge der enthaltenen relevanten zutaten) nicht enthalten wird diese angelegt
        //sonst wird die jeweilige klasse um die id des rezepts erweitert
        if (dictOrderedRecipes[dictRecipes[id]] === undefined) {
            dictOrderedRecipes[dictRecipes[id]] = [id];
          } else {
            dictOrderedRecipes[dictRecipes[id]].push(id);
          }
    }

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
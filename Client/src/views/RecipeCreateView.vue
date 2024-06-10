<script setup>
import { ref, onMounted } from 'vue';

import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()


// TODO: nur in liste vorkommende zutaten auswählen lassen
function search(input) {
    if (input.length < 1) { return [] }
    return ingredient_list.filter(ing => {
        return ing.toLowerCase()
            .startsWith(input.toLowerCase())
    })
};

async function getFormData() {
    const recipe = new FormData();

    let recipe_title = document.getElementById('recipe_title').value;
    let recipe_desc = document.getElementById('recipe_desc').value;
    let recipe_time = document.getElementById('recipe_time').value;
    let recipe_price = document.getElementById('recipe_price').value;

    recipe.append("name", recipe_title);
    recipe.append("steps", recipe_desc);
    recipe.append("preparationtime", recipe_time);
    recipe.append("pricecategory", recipe_price)

    let recipe_tags = getRadioButtonSelection();
    recipe.append("tags", JSON.stringify(recipe_tags));

    for(let index_ingredient_obj in selectedIngredients.value) {
        let ingredient_name = selectedIngredients.value[index_ingredient_obj].ingredient_name;
        await fetch("http://127.0.0.1:3000/ingredient/" + ingredient_name)
        .then(response => {
            if (!response.ok) {
                throw new Error("Keine gueltige Antwort erhalten");
            }
            return response.json();
        })
        .then(data => {
            selectedIngredients.value[index_ingredient_obj]._id = data;
        })
        .catch(error => {
            console.error("Fehler", error);
        })
    }

    recipe.append("ingredients", JSON.stringify(selectedIngredients.value));

    let fakeCreator = {_id: "6655d96e4716420c3a843d58", name: "MannisRezepte1848"};

    recipe.append("creator", JSON.stringify(fakeCreator));

    recipe.append("picture", document.getElementById('rcv_image').files[0]);


    fetch("http://127.0.0.1:3000/recipe", {
        method: 'POST',
        body: recipe,
    })
    .then(res => res.json())
    .then(data => {});

    router.push("/");
}

function isValueNotYetInArray(arrayOfObjects, value) {
    // Check if any object in the array has the specified value for the specified key
    return !arrayOfObjects.some(obj => obj["name"] === value);
}

function getRadioButtonSelection() {

    let tags = document.getElementsByClassName('tag');
    let selected_tags = []

    for (let i = 0; i < 8; i++) {
        if (tags[i].checked) {
            let tag = { name: tags[i].value}
            selected_tags.push(tag)
        }

    }

    return selected_tags

}

function addIngredientToList() {
    let ingredient_name = document.getElementById('rcv_ing_title').value;
    let ingredient_menge = document.getElementById('rcv_ing_menge').value;
    let ingredient_einheit = document.getElementById('rcv_ing_einheit').value;

    if (ingredient_name && isValueNotYetInArray(selectedIngredients.value, ingredient_name)) {
        selectedIngredients.value.push({ "name": ingredient_name, "amount": ingredient_menge, "unit": ingredient_einheit })

        document.getElementById('rcv_ing_title').value = ' ';
        document.getElementById('rcv_ing_menge').value = ' ';
    }
    else {
        alert("Zutat leer oder bereits hinzugefügt!")
    }


}


let selectedIngredients = ref([]);
let ingredient_list = [];

onMounted(() => fetchIngredients());

function fetchIngredients() {
    fetch("http://127.0.0.1:3000/ingredient")
        .then(response => {
            if (!response.ok) {
                throw new Error("Keine gueltige Antwort erhalten");
            }
            return response.json();
        })
        .then(data => {
            for (let d in data) {
                ingredient_list.push(data[d].name);
            }
        })
        .catch(error => {
            console.error("Fehler", error);
        })
}

function removeIngredient(index) {
    selectedIngredients.value.splice(index, 1);
};





</script>

<template>
    <div class="rcv_main_outer">

        <h2 class="topmargin slogan">Teile in nur 7 Schritten dein Lieblingsrezept mit der Welt</h2>

        <div class="rcv_main topmargin">
            <label for="recipe_title">Rezeptnamen eingeben</label>
            <input type="text" name="recipe_title" id="recipe_title" class="rcv_textinput"
                placeholder="Nudeln mit Tomatensoße">

            <label for="tags">Tags hinzufügen</label>
            <div class="rcv_tags">
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_pasta" name="tag_pasta" value="Pasta"
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_pasta" class="pointer_on_hover">Pasta</label>
                </div>
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_onepot" name="tag_onepot" value="OnePot"
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_onepot" class="pointer_on_hover">One-Pot</label>
                </div>
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_veggie" name="tag_veggie" value="Veggie"
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_veggie" class="pointer_on_hover">Veggie</label>
                </div>
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_vegan" name="tag_vegan" value="Vegan"
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_vegan" class="pointer_on_hover">Vegan</label>
                </div>
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_chicken" name="tag_chicken" value="Hühnchen"
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_chicken" class="pointer_on_hover">Hühnchen</label>
                </div>
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_fish" name="tag_fish" value="Fisch"
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_fish" class="pointer_on_hover">Fisch</label>
                </div>
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_beef" name="tag_beef" value="Rindfleisch"
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_beef" class="pointer_on_hover">Rindfleisch</label>
                </div>
                <div class="rcv_tag pointer_on_hover">
                    <input type="checkbox" id="tag_highprotein" name="tag_highprotein" value="HighProtein       "
                        class="sidemargin tag pointer_on_hover">
                    <label for="tag_highprotein" class="pointer_on_hover">High-Protein</label>
                </div>

            </div>

            <label class="topmargin">Zutaten hinzufügen</label>
            <div class="selected-ingredients">
                <span v-for="(ingredient, index) in selectedIngredients" :key="index"
                    class="ingredient-tag pointer_on_hover">
                    {{ ingredient["amount"] + ingredient["unit"] + " " +
                        ingredient["name"] }}
                    <span class="remove-ingredient pointer_on_hover" @click="removeIngredient(index)">x</span>
                </span>
            </div>

            <div class="rcv_ing_row">
                <autocomplete :search="search" class="rcv_search_bar" placeholder="Zutat hinzufügen" autoSelect=True
                    submitOnEnter=True id="rcv_ing_title"></autocomplete>
                <div class="outline">
                    <input type="text" placeholder="Mengenangabe hier.." class="mengenangabe" id="rcv_ing_menge">
                    <select name="einheit" id="rcv_ing_einheit">
                        <option value="stueck">stueck</option>
                        <option value="ml">ml</option>
                        <option value="g">g</option>
                        <option value="el">EL</option>
                        <option value="tl">TL</option>
                        <option value="cup">Cup</option>

                    </select>
                    <button class="rcv_ingbutton" @click="addIngredientToList">Zutat hinzufügen</button>
                </div>
            </div>

            <label for="recipe_desc" class="topmargin">Wie wird dein Rezept zubereitet?</label>
            <textarea name="recipe_desc" id='recipe_desc' class="rcv_textinput rcv_textinput_big"
                placeholder="Schritt 1: Zwiebeln kleinschneiden, Schritt 2: ..."></textarea>


            <div class="outline">
                <label for="recipe_time" class="slider_label">Die Zubereitung dauert weniger als: </label>
                <output>0min</output>
                <input type="range" id="recipe_time" name="recipe_time" min="15" max="120" step="15"
                    oninput="this.previousElementSibling.value =  this.value + 'min'">

            </div>

            <div class="outline">
                <label for="recipe_price" class="slider_label ">Die Zutaten kosten weniger als: &nbsp; &nbsp;</label>
                <output>0€</output>
                <input type="range" id="recipe_price" name="recipe_price" min="10" max="100" step="10"
                    oninput="this.previousElementSibling.value =  this.value + '€' ">

            </div>

            <div class="img_upload outline">
                <label for="rcv_image">Bild hochladen: </label>
                <input type="file" src="" alt="" name="rcv_image" accept="image/png, image/jpeg" capture="environment" id="rcv_image">

            </div>

            <button class="rcv_submit pointer_on_hover" @click="getFormData">Rezept veröffentlichen</button>


        </div>
    </div>
</template>

<style scoped>
output {
    font-weight: bold;
}

.whitespace {
    white-space: pre;
}

.slider_label {
    margin-right: 0.5rem;
}

.outline {
    background-color: white;
    border-radius: 0.5rem;
    padding: 0 1rem;
    border: 1px solid black;
    padding: 1rem;
    width: 35vw;
    min-width: 25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 1rem 0;
}



.rcv_titel {
    background-color: var(--color-lightgreen);
    color: white;
    padding: 0 0.5rem;
    border-radius: 1rem;

}

.ingredient-tag {
    color: white;
    background-color: var(--color-red);
    display: inline-block;
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
}

.pointer_on_hover:hover {
    cursor: pointer;
}

.topmargin {
    margin-top: 2rem;
}

.sidemargin {
    margin-right: 0.5rem;
}

.rcv_main_outer {

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}

.rcv_main {
    width: 60vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

}


.rcv_textinput {
    height: 2rem;
    width: 60vw;
    border-radius: 0.5rem;
    border: 1px black solid;
    padding: 1rem;
    margin-bottom: 1rem;
    max-width: 60vw;
    min-width: 60vw;
}

.rcv_textinput_big {
    min-height: 15rem;
}


.rcv_tags {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

}

.rcv_ingbutton {
    background-color: var(--color-darkgreen);
    border-radius: 0.5rem;
    border: 2px solid var(--color-darkgreen);
    padding: 0.5rem;
    color: white;
    font-weight: bold;
}

.rcv_ingbutton:hover {
    background-color: white;
    border: 2px solid var(--color-darkgreen);
    color: var(--color-darkgreen);

}

.rcv_tag {
    background-color: var(--color-darkgreen);
    color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: 10vw;
    min-width: 8rem;
    margin: 0.5rem 2vw;
}


.rcv_submit {
    margin-top: 2rem;
    margin-bottom: 4rem;
    background-color: var(--color-darkgreen);
    color: white;
    font-weight: bold;
    padding: 1.2rem 2rem;
    border-radius: 1rem;
    border: 2px solid var(--color-darkgreen);
}

.rcv_submit:hover {
    background-color: white;
    border-color: var(--color-darkgreen);
    color: var(--color-darkgreen);
}

.rcv_search_bar {
    margin-bottom: 1rem;
}



@media screen and (max-width: 750px) {
    .rcv_main {
        width: 80vw;

    }

    .rcv_textinput {
        width: 80vw;
        max-width: 80vw;
        min-width: 80vw;
    }

    .slogan {
        font-size: 1.2rem;
    }

}
</style>

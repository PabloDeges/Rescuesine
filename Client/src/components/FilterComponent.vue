<script setup>
import { onMounted, ref } from 'vue';
import { updateRecipesOnMainPage } from '../manageMainPageRecipes';

function toggleFilter() {
    let x = document.getElementById("filter_form_id");

    if (x.style.display === "flex") {
        x.style.display = "none";
    }
    else {
        x.style.display = "flex";
    }
}

function getRadioButtonSelection() {

    let tags = document.getElementsByClassName('tag');
    let selected_tags = []

    for (let i = 0; i < 8; i++) {
        if (tags[i].checked) {
            let tag = { $elemMatch: { "name": tags[i].value } };
            selected_tags.push(tag)
        }
    }
    return selected_tags
}

let ingredient_list = [];

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

const selectedIngredients = ref([]);
onMounted(() => fetchIngredients());

function enableButton() {
    let x = document.getElementById('submit_button_id');
    x.classList.remove('disabled_button');
}

function disableButton() {
    let x = document.getElementById('submit_button_id');
    x.classList.add('disabled_button');
}

function search(input) {
    if (input.length < 1) { return [] }
    return ingredient_list.filter(ing => {
        return ing.toLowerCase()
            .startsWith(input.toLowerCase())
    })
};

function onSubmit(result) {

    enableButton();

    let ingredient = result;
    if (ingredient && !selectedIngredients.value.includes(ingredient)) {
        selectedIngredients.value.push(ingredient);
    }
};

function removeIngredient(index) {
    selectedIngredients.value.splice(index, 1);
    if (selectedIngredients.value.length == 0) {
        disableButton();
    }
};

function submitForm() {

    let selectedTags = getRadioButtonSelection();

    // Send the selectedIngredients array to the backend
    fetch("http://127.0.0.1:3000/recipe/filtered", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ing: selectedIngredients.value, tags: selectedTags })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Keine gueltige Antwort erhalten");
            }
            return response.json();
        })
        .then(data => {
            updateRecipesOnMainPage(data);
        })
        .catch(error => {
            console.error("Fehler", error);
        })
};

</script>

<template>
    <div class="container">
        <div class="filter_button_container">
            <button class="filter_button" id="filter" @click="toggleFilter()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 17 16" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M7.17375 2.39015H15.5334C16.0239 2.39015 16.4216 2.78782 16.4216 3.27835C16.4216 3.76888 16.0239 4.16654 15.5334 4.16654H7.17375C6.80707 5.20032 5.81982 5.94292 4.66194 5.94292C3.50406 5.94292 2.51678 5.20032 2.15013 4.16654H0.896005C0.405474 4.16654 0.0078125 3.76888 0.0078125 3.27835C0.0078125 2.78782 0.405474 2.39015 0.896005 2.39015H2.15013C2.51681 1.35637 3.50406 0.61377 4.66194 0.61377C5.81982 0.61377 6.80707 1.35637 7.17375 2.39015ZM3.77465 3.27873C3.77465 3.76848 4.17309 4.16693 4.66284 4.16693C5.15259 4.16693 5.55103 3.76848 5.55103 3.27873C5.55103 2.78898 5.15259 2.39054 4.66284 2.39054C4.17309 2.39054 3.77465 2.78898 3.77465 3.27873ZM7.17375 12.338H15.5334C16.0239 12.338 16.4216 12.7357 16.4216 13.2262C16.4216 13.7168 16.0239 14.1144 15.5334 14.1144H7.17375C6.80707 15.1482 5.81982 15.8908 4.66194 15.8908C3.50406 15.8908 2.51678 15.1482 2.15013 14.1144H0.896005C0.405474 14.1144 0.0078125 13.7168 0.0078125 13.2262C0.0078125 12.7357 0.405474 12.338 0.896005 12.338H2.15013C2.51681 11.3043 3.50406 10.5617 4.66194 10.5617C5.81982 10.5617 6.8071 11.3043 7.17375 12.338ZM3.77465 13.2264C3.77465 13.7161 4.17309 14.1146 4.66284 14.1146C5.15259 14.1146 5.55103 13.7161 5.55103 13.2264C5.55103 12.7366 5.15259 12.3382 4.66284 12.3382C4.17309 12.3382 3.77465 12.7366 3.77465 13.2264ZM15.5334 7.36416H14.2793C13.9126 6.33037 12.9254 5.58777 11.7675 5.58777C10.6096 5.58777 9.62235 6.33037 9.25567 7.36416H0.896005C0.405474 7.36416 0.0078125 7.76182 0.0078125 8.25235C0.0078125 8.74288 0.405474 9.14054 0.896005 9.14054H9.25567C9.62232 10.1743 10.6096 10.9169 11.7675 10.9169C12.9254 10.9169 13.9126 10.1743 14.2793 9.14054H15.5334C16.0239 9.14054 16.4216 8.74288 16.4216 8.25235C16.4216 7.76182 16.0239 7.36416 15.5334 7.36416ZM11.7683 9.14069C11.2786 9.14069 10.8801 8.74225 10.8801 8.2525C10.8801 7.76275 11.2786 7.36431 11.7683 7.36431C12.2581 7.36431 12.6565 7.76275 12.6565 8.2525C12.6565 8.74225 12.2581 9.14069 11.7683 9.14069Z"
                        fill="#FFFFFF"></path>
                </svg>
                <p class="filter_button_text">Zutaten filtern</p>
            </button>
        </div>
    </div>
    <div class="filter_form" id="filter_form_id">
        <div class="filter_form_center">
            <div class="selected-ingredients">
                <span v-for="(ingredient, index) in selectedIngredients" :key="index" class="ingredient-tag">
                    {{ ingredient }}
                    <span class="remove-ingredient" @click="removeIngredient(index)">x</span>
                </span>
            </div>

            <div class="center">
                <div class="ingredient-search">
                    <autocomplete :search="search" class="search_bar_filters" placeholder="Zutat suchen" autoSelect=True
                        submitOnEnter=True id="filter_autocomplete_bar" @submit="onSubmit"></autocomplete>
                </div>

                <div class="rcv_tags">
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_pasta" name="tag_pasta" value="Pasta"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_pasta" class="pointer_on_hover">Pasta</label>
                    </div>
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_onepot" name="tag_onepot" value="OnePot"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_onepot" class="pointer_on_hover">One-Pot</label>
                    </div>
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_veggie" name="tag_veggie" value="Veggie"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_veggie" class="pointer_on_hover">Veggie</label>
                    </div>
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_vegan" name="tag_vegan" value="Vegan"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_vegan" class="pointer_on_hover">Vegan</label>
                    </div>
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_fleisch" name="tag_fleisch" value="Fleisch"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_fleisch" class="pointer_on_hover">Fleisch</label>
                    </div>
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_fish" name="tag_fish" value="Fisch"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_fish" class="pointer_on_hover">Fisch</label>
                    </div>
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_suppe" name="tag_suppe" value="Suppe"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_suppe" class="pointer_on_hover">Suppe</label>
                    </div>
                    <div class="rcv_tag pointer_on_hover">
                        <input type="checkbox" id="tag_highprotein" name="tag_highprotein" value="HighProtein"
                            class="sidemargin tag pointer_on_hover" @click="enableButton">
                        <label for="tag_highprotein" class="pointer_on_hover">HighProtein</label>
                    </div>
                </div>
                <button @click="submitForm" class="disabled_button submit_button" id="submit_button_id">Rezepte
                    Filtern</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter_button {
    border: none;
}

.filter_button_text {
    font-family: "Josefin Sans", sans-serif;
    font-size: 0.8rem;
    font-weight: bold;
}

.rcv_tags {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 60%;
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

.sidemargin {
    margin-right: 0.5rem;
}

#filter_form_id {
    display: none;
    align-items: center;
    justify-content: center;
}

.filter_button_container {
    height: 5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 4rem;
}

.filter_button {
    width: 11rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-red);
    padding: 1rem 1.5rem;
    color: white;
    font-weight: bold;
    border-radius: 1rem;
    text-align: center;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.filter_button:hover {
    background-color: rgb(210, 49, 49);
    cursor: pointer;
}

.selected-ingredients {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.ingredient-tag {
    color: white;
    display: inline-block;
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--color-red);
    border-radius: 1rem;
}

.remove-ingredient {
    margin-left: 1rem;
    cursor: pointer;
    color: white;
}

.ingredient-search {
    margin-bottom: 1rem;
}

.search_bar_filters {
    width: 40vw;
    min-width: 20rem;
}

.submit_button {
    color: white;
    font-weight: bold;
    border: 2px solid transparent;
    background-color: var(--color-darkgreen);
    padding: 0.8rem 1rem;
    border-radius: 1rem;
    margin: 1rem 0;
}

.submit_button:hover {
    color: var(--color-darkgreen);
    font-weight: bold;
    background-color: white;
    border: 2px solid var(--color-darkgreen);
}

.disabled_button {
    background-color: grey;
    color: white;
    border: 2px solid grey;
}

.disabled_button:hover {
    background-color: grey;
    color: white;
    border: 2px solid grey;
}

@media screen and (max-width: 710px) {
    .filter_button_container {
        justify-content: center;
    }

    .rcv_tags {
        width: 100%;
    }

    .rcv_tag {
        margin: 0.5rem 1vw;
    }
}
</style>
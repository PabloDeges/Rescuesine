import { ref } from 'vue'

const recipes = ref([]);

export function updateRecipesOnMainPage(newRecipes) {
    recipes.value = newRecipes;
}

export function getRecipesOnMainPage() {
    return recipes;
}
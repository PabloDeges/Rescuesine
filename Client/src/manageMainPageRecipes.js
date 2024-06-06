import { ref } from 'vue'

export const recipes = ref([]);

export function updateRecipesOnMainPage(newRecipes) {
    recipes.value = newRecipes
}
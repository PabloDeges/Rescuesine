<script setup>
import RecipeComponent from '../components/RecipeComponent.vue';
</script>


<template>
    <RecipeComponent class="HeaderBar"
    :recipe_-i-d= $route.params.ident
    />
    <div class="RecipeDetails">
        <div class="descContainerWrapper">
            <div class="descContainer">
            <h2 class="ingredients">Zutaten</h2>
                <p v-if="rezept" v-for="ingredient in rezept.ingredients" class="ingredientList">
                    {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }} </p>
                <h2 class="zubereitung_titel">Zubereitung</h2>
                    <p v-if="rezept" class="preparation"> {{ rezept.steps }} </p>
        </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
const rezept = ref();
export default {
  mounted() {
    const ident = this.$route.params.ident;

    
 onMounted( fetch("http://127.0.0.1:3000/recipe/"+ident)
  .then(response => {
    if (!response.ok) {
      throw new Error("Keine gueltige Antwort erhalten");
    }
    return response.json();
  })
  .then(data => {
    rezept.value = data;

  })
  .catch(error => {
    console.error("Fehler", error);
  }))
  }
}



</script>

<style>

.descContainerWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;


}

.descContainer {
    width: 70%;
}

.descContainer h2{
    text-align: center;
    font-weight: bold;
    font-size: 200%;
    padding-top: 20px
}
.descContainer p{
    text-align: center;
    font-size: 140%
}

.recipeShortInformation{
    height: 40%;
    margin-inline-start: 1rem;
}
.textInformationRecipe{
    size: 20%;
    padding-right: 4%;
}
.recipeIconInfos{
    padding-left: 4%
}
.preparation {
    margin-bottom: 6rem;
    /* width: 60%; */ 
} 
</style>
<script setup>
import { ref } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import CardComponent from './components/CardComponent.vue'

let json_data = {
  data: [{"recipe_title" : "Fischstäbchen mit Kartoffelpüree",
  "recipe_author" : "manfred_kocht33",
  "recipe_price" : "10",
  "recipe_time" : "3000"},

  {"recipe_title" : "Butter Chicken mit Knoblauchnaan",
  "recipe_author" : "liselotte1990",
  "recipe_price" : "20",
  "recipe_time" : "40"},

]
}

const recipes = ref([
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },
  {recipe_title: json_data.data[0].recipe_title, recipe_author: json_data.data[0].recipe_author, recipe_price: json_data.data[0].recipe_price, recipe_time: json_data.data[0].recipe_time },
  {recipe_title: json_data.data[1].recipe_title, recipe_author: json_data.data[1].recipe_author, recipe_price: json_data.data[1].recipe_price, recipe_time: json_data.data[1].recipe_time },

])

</script>

<template>

  <HeaderComponent />

  <div class="filter_button">
    <p>INSERT FILTER BUTTON HERE</p>
  </div>

  <div class="recipe_card_list">
    <!-- <CardComponent class="card_component" recipe_title="blablabla" recipe_author="manfred_kocht33" recipe_price="10" recipe_time="20" />
    <CardComponent class="card_component" recipe_title="Butter Chicken mit Knoblauchnaan" recipe_author="liselotte1990" recipe_price="20" recipe_time="40" />
    <CardComponent class="card_component" recipe_title="Nudeln mit Tomatensoße" recipe_author="andreas45" recipe_price="20" recipe_time="30" />
    <CardComponent class="card_component" recipe_title="TK Pizza" recipe_author="league_liebhaber" recipe_price="5" recipe_time="10" /> -->

    <CardComponent class="card_component"
      v-for="r in recipes"
      :recipe_title="r.recipe_title"
      :recipe_author="r.recipe_author"
      :recipe_price="r.recipe_price"
      :recipe_time="r.recipe_time"
    />
  </div>


</template>

<style scoped>

  .filter_button {
    height: 5rem;
    background-color: rgba(128, 128, 128, 0.155);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .recipe_card_list {
    
    width: 80vw;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .card_component {
      margin: 1rem 0rem;
    width: calc(50% - 3vw);
  }

  }


</style>

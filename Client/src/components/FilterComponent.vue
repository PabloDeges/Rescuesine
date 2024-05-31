<template>
  <div class="container">
    <div class="filter_button_container">
      <div class="filter_button" id="filter">
        <i class="fa-solid fa-sliders"></i>
        <p>Zutaten filtern</p>
      </div>
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
        <input type="text" v-model="searchTerm" @input="searchIngredients" placeholder="Zutat suchen" class="search_bar_filters" />
      </div>

      <div class="dropdowns">
        <select v-model="selectedFruit" @change="addIngredient" class="dropdown">
          <option disabled value="">Früchte</option>
          <option v-for="fruit in fruits" :key="fruit">{{ fruit }}</option>
        </select>

        <select v-model="selectedVegetable" @change="addIngredient" class="dropdown">
          <option disabled value="">Gemüse</option>
          <option v-for="vegetable in vegetables" :key="vegetable">{{ vegetable }}</option>
        </select>

        <select v-model="selectedFruit" @change="addIngredient" class="dropdown">
          <option disabled value="">Fleisch und Fisch</option>
          <option v-for="fruit in fruits" :key="fruit">{{ fruit }}</option>
        </select>

        <select v-model="selectedCondiment" @change="addIngredient" class="dropdown">
          <option disabled value="">Gewürze</option>
          <option v-for="condiment in condiments" :key="condiment">{{ condiment }}</option>
        </select>
      </div>

      <button @click="submitForm" class="disabled_button submit_button" id="submit_button_id">Rezepte Filtern</button>
    </div>
      </div>
  </div>
</template>


<style scoped>


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
  background-color: white;
  border-radius: 1rem;
  border: 1px solid black;
  padding: 1rem;
  width: 40vw;
  min-width: 20rem;
}

.dropdowns {
margin-bottom: 1rem;

}

.dropdown {
  margin: 0.5rem;
}

.submit_button {
  color: white;
  font-weight: bold;
  border: 2px solid transparent;
  background-color: var(--color-darkgreen);
  padding: 0.8rem 1rem;
  border-radius: 1rem;
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
  border: 1px solid grey;
}

.disabled_button:hover {
  background-color: grey;
  color: white;
  border: 1px solid grey;
}



@media screen and (max-width: 750px) {
  .filter_button_container {
    justify-content: center;
  }


}




</style>

<script>
import { ref } from 'vue';

window.addEventListener('load', function () {

  console.log("page successfully loaded, filter logic hooked")
  const filter = document.getElementById('filter');

  filter.addEventListener('click', show_filter_options);

  function show_filter_options() {
    let x = document.getElementById("filter_form_id");

    if (x.style.display === "flex") {
      x.style.display = "none";

    }
    else {
      x.style.display = "flex";
    }
  }

});

export default {
  setup() {
    const searchTerm = ref('');
    const selectedFruit = ref('');
    const selectedVegetable = ref('');
    const selectedCondiment = ref('');
    const selectedIngredients = ref([]);
    const fruits = ref(['Apple', 'Banana', 'Cherry']);
    const vegetables = ref(['Carrot', 'Broccoli', 'Spinach']);
    const condiments = ref(['Salt', 'Pepper', 'Ketchup']);

    const searchIngredients = () => {
      // ajax kram hinzufügen...
    };

    const enableButton = () => {
      let x = document.getElementById('submit_button_id');
      console.log(x)
      x.classList.remove('disabled_button');
    }

    const addIngredient = (event) => {

      console.log("addIngredientCalled")

      enableButton();

      const ingredient = event.target.value;
      if (ingredient && !selectedIngredients.value.includes(ingredient)) {
        selectedIngredients.value.push(ingredient);
      }
      clearSelection();
    };

    const clearSelection = () => {
      selectedFruit.value = '';
      selectedVegetable.value = '';
      selectedCondiment.value = '';
    };

    const removeIngredient = (index) => {
      selectedIngredients.value.splice(index, 1);
    };

    const submitForm = () => {
      // Send the selectedIngredients array to the backend
      console.log('Selected Ingredients:', selectedIngredients.value);
    };

    return {
      searchTerm,
      selectedFruit,
      selectedVegetable,
      selectedCondiment,
      selectedIngredients,
      fruits,
      vegetables,
      condiments,
      searchIngredients,
      addIngredient,
      clearSelection,
      removeIngredient,
      submitForm,
    };
  },
};
</script>





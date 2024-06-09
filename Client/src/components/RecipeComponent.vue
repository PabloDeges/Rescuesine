<template>
    <div class="previewBar">
        <div class="previewBackground center" id="meinBild" >
            <!--<img src= {{ dish.picture }} alt="" class="recipe_image">-->
            <div class="recipeInformationContainer">
                <h1 v-if="dish" class="title">{{ dish.name }}</h1>
                <h1 v-else class="title"></h1>
                <div class="layout_infobox">
                    <img src="../assets/user_icon.png" class="userIconRecipe recipeShortInformation recipeIconInfos">
                    <p v-if="dish" class="textInformationRecipe recipeShortInformation">{{ dish.creator.name }}</p>
                    <p v-else class="title"></p>
                    <img src="../assets/price_icon.png" class="priceIconRecipe recipeShortInformation recipeIconInfos">
                    <p v-if="dish" class="textInformationRecipe recipeShortInformation"> {{ dish.pricecategory }}€</p>
                    <p v-else class="title"></p>
                    <img src="../assets/time_icon.png" class="timeIconRecipe recipeShortInformation recipeIconInfos">
                    <p v-if="dish" class="textInformationRecipe recipeShortInformation">{{ dish.preparationtime }}min</p>
                    <p v-else class="title"></p>
                </div>
            </div>
            <div class="tagBoxesContainer">
                <div v-if="dish" v-for="tag in dish.tags" >
                    <img src="../assets/Price Tag.png" alt="">
                    <p>{{ tag.name }} </p>
                </div>
            </div>
        </div>
    </div>
    <div class="headerInformation">
        <div class="markRecipe interactions">
            <img src="../assets/Bookmark.png">
            <p>Favorisieren</p>
        </div>
        <div class="shareRecipe interactions">
            <img src="../assets/Share.png">
            <p>Teilen</p>
        </div>
        <!-- <div class="likeRecipe thumbs">
            <img src="../assets/Thumbs Up.png">
        </div>
        <div class="dislikeRecipe thumbs">
            <img src="../assets/Thumbs Down.png">
        </div> -->
    </div>
</template>

<script>

let backGround = document.getElementById("meinBild");
console.log(backGround);

</script>


<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps(['recipe_ID'])
const dish = ref();

function fetchDetailedRecipe() {
  fetch("http://127.0.0.1:3000/recipe/"+props.recipe_ID)
  .then(response => {
    if (!response.ok) {
      throw new Error("Keine gueltige Antwort erhalten");
    }
    return response.json();
  })
  .then(data => {
    dish.value = data;
    //backGround.style.backgroundImage = dish.value.picture
    
  })
  .catch(error => {
    console.error("Fehler", error);
  })
}
onMounted( () => fetchDetailedRecipe() );


</script>

<style scoped>

.recipeShortInformation {
    height: 40%;
}

.layout_infobox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
}

.title {
    padding-top: 0.5rem;
    color: black;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.previewBar{
    display: flex;
    align-items: center;
    transform: translate(0%);
}
.previewBackground{
    background-image: url('../assets/burger.jpg'); /* change to img tag in html */
    background-size: cover;
    background-attachment: fixed;
  background-position: center; 
    width: 100%;
    height: 25rem;
    display: flex;
    border-radius: 0 0 2rem 2rem;
}
.previewBackground h1{
    text-align: center;
    /*position: relative;
    top: 0;
    left: 40%;*/
    display: flex;
    justify-content: center;
    align-items: flex-start;

}
.recipeInformationContainer{
    /* display: flex;
    justify-content: center; */
    background-color: white;
    /* object-fit: cover; */
    width: 40vw;
    height: 30%;
    min-width: 35rem;
    border: 1px;
    border-style: solid;
    border-color: black;

    margin-bottom: 4rem;
 /*Position der Infobox hardcoded. muss angepasst werden*/
}
.tagBoxesContainer{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.tagBoxesContainer div{

    display: flex;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    background-color: var(--color-red);
    border-radius: 0.5rem;
    padding-right: 2.5rem;
    margin-left: 1rem;
}
.tagBoxesContainer div p{
    padding-left: 25px;
    color: white;
    font-weight: bold;
}
.tagBoxesContainer div img{
    margin-left: 15%;
}

.thumbs{
    margin-left: auto;
    margin-right: 0;
}
.likeRecipe{
    padding-left: 75%;
}
.dislikeRecipe{
    height: 5%;
}
.headerInformation{
    display: flex;
    padding-right: 1%;
}
.interactions{
    display: flex;
    overflow: hidden;
    padding: 0.5rem 1rem;
    align-items: center;
    border: 2%;
    border-style: solid;
    border-color: black;
    background-color: white;
    margin: 1rem;
    border-radius: 0.25rem;


}

.markRecipe {
    width: 10vw;
    min-width: 8.5rem;

}

.headerInformation img {
    height: 1.5rem;
    margin-right: 0.25  rem;
}

</style>
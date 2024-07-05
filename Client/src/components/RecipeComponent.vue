<template>
    <div class="previewBar">
        <div class="previewBackground center" id="meinBild" ref="myImageDiv" >
            <div class="recipeInformationContainer">
                <h1 v-if="dish" class="title">{{ dish.name }}</h1>
                <h1 v-else class="title"></h1>
                <div class="layout_infobox">
                    <div class="info_bundle center">
                        <img src="../assets/user_icon.png" class="userIconRecipe recipeShortInformation recipeIconInfos">
                    <p v-if="dish" class="textInformationRecipe recipeShortInformation">{{ dish.creator.name }}</p>
                    <p v-else class="title"></p>
                    </div>
                    <div class="info_bundle center">
                        <img src="../assets/price_icon.png" class="priceIconRecipe recipeShortInformation recipeIconInfos">
                    <p v-if="dish" class="textInformationRecipe recipeShortInformation"> {{ dish.pricecategory }}€</p>
                    <p v-else class="title"></p>
                    </div>
                    <div class="info_bundle center"> 
                        <img src="../assets/time_icon.png" class="timeIconRecipe recipeShortInformation recipeIconInfos">
                        <p v-if="dish" class="textInformationRecipe recipeShortInformation">{{ dish.preparationtime }}min</p>
                        <p v-else class="title"></p>
                </div>
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

        <button v-if="loggedIn" @click="addToFavs()" class="markRecipe interactions" id="fav_button">
            <img src="../assets/Bookmark.png" >
            <p class="shareText">Favorisieren</p>
        </button>

        <button @click="removefromFavs()" class="markRecipe interactions fav_active" id="fav_button_active">
            <img src="../assets/bookmark_white.png">
            <p class="shareText" >Favorisiert!</p>
        </button>

        <div class="tooltip">
            <button @click="shareRecipe()" class="shareRecipe interactions" >
                <span class="tooltiptext" id="myTooltip">Link kopieren</span>
                <img src="../assets/Share.png">
                <p class="shareText shareTextActive">Teilen</p>
            </button>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['recipe_ID'])
const dish = ref();
const myImageDiv = ref(null);

let loggedIn = getCookie("resc_user_token");

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
    let imagePath = dish.value.picture;
    if (myImageDiv.value) {
    myImageDiv.value.style.backgroundImage = `url(${imagePath})`;
    checkIfSaved()
  }
  })
  .catch(error => {
    console.error("Fehler", error);
  })
}

function checkIfSaved() {

    fetch("http://127.0.0.1:3000/recipe/isfav/" + props.recipe_ID, {
    headers: {
            'Authorization': `Bearer ${getCookie("resc_user_token")}`
        },})
  .then(response => {
    if (!response.ok) {
      throw new Error("Keine gueltige Antwort erhalten");
    }
    return response.json();
  })
  .then(data => {
    if(data.isfav) {
        updateButtonState()    
    }
  }
  )
  .catch(error => {
    console.error("Fehler", error);
  })

}


onMounted( () => {fetchDetailedRecipe(); } );

function shareRecipe() {

   // Copy the text inside the text field
  navigator.clipboard.writeText(document.URL);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Link erfolgreich kopiert!";

}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function addToFavs() {
    fetch("http://127.0.0.1:3000/profile/saverecipe", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getCookie("resc_user_token")}`,
        'Content-Type': 'application/json' },
        body: JSON.stringify({ id: props.recipe_ID }),
    })
    .then(res => res.json())
    .then(data => {})
    .then(updateButtonState());
}

function removefromFavs() {
    fetch("http://127.0.0.1:3000/profile/unsaverecipe", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getCookie("resc_user_token")}`,
        'Content-Type': 'application/json' },
        body: JSON.stringify({ id: props.recipe_ID }),
    })
    .then(res => res.json())
    .then(data => {})
    .then(updateButtonState());
}

function updateButtonState() {
    let y = document.getElementById("fav_button")
    let z = document.getElementById("fav_button_active")

   if(y.style.display == "flex"){
    y.style.display = "none";
   z.style.display = "flex";
   } else{
    y.style.display = "flex";
   z.style.display = "none";
   }
}


</script>


<style scoped>



.recipeShortInformation {
    height: 40%;
}

.layout_infobox {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
}

.title {
    padding-top: 0.5rem;
    color: black;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
}

.center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.recipeIconInfos {
    width: 1.2rem;
}

.info_bundle {
    flex-direction: row;

}

.previewBar{
    display: flex;
    align-items: center;
    transform: translate(0%);
}
.previewBackground{
     background-image: url('../assets/burger.jpg');  /* jetzt nur noch ein placeholder falls bild nicht läd */
    background-size: cover;
    background-attachment: fixed;
  background-position: center; 
    width: 100%;
    /* height: 25rem; */
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
    margin-top: 5rem;
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
    margin-bottom: 5rem;
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
    cursor: pointer;

}

.markRecipe {
    width: 10vw;
    min-width: 8.5rem;

}

.headerInformation img {
    height: 1.5rem;
    margin-right: 0.25rem;
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 10rem;
  background-color: var(--color-red);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0.5rem;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
  font-weight: bold;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--color-red) transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.shareText{
    font-family: "Josefin Sans", sans-serif; 
    font-size: 0.9rem;
}   

.fav_active {
    background-color: var(--color-darkgreen);
    color: white;
    display: none;
}



@media screen and (max-width: 750px) {

.recipeShortInformation{
    height: 40%;
    margin-inline-start: 0.4rem;
}
.recipeInformationContainer {
    width: 90%;
    min-width: 90%;
}
.layout_infobox {
    flex-direction: column;
    margin-bottom: 0.5rem;
}
.tagBoxesContainer {
    flex-direction: column;
    align-items: center;

}
.tagBoxesContainer div {
    margin-bottom: 1rem;
}
}
</style>

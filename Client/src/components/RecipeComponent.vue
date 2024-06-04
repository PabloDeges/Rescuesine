<template>
    <div class="previewBar">
        <div class="previewBackground center">
            
            <div class="recipeInformationContainer">
                <h1 class="title">Vorrübergehender Titel</h1>
                <div class="layout_infobox">
                    <img src="../assets/user_icon.png" class="userIconRecipe recipeShortInformation recipeIconInfos">
                    <p class="textInformationRecipe recipeShortInformation">{{ recipe_author }}</p>
                    <img src="../assets/price_icon.png" class="priceIconRecipe recipeShortInformation recipeIconInfos">
                    <p class="textInformationRecipe recipeShortInformation">{{ recipe_price }}€</p>
                    <img src="../assets/time_icon.png" class="timeIconRecipe recipeShortInformation recipeIconInfos">
                    <p class="textInformationRecipe recipeShortInformation">{{ recipe_time }}min</p>
                </div>
            </div>
            <div class="tagBoxesContainer">
                <div>
                    <img src="../assets/Price Tag.png" alt="">
                    <p>Klassiker</p>
                </div>
                <div>
                    <img src="../assets/Price Tag.png" alt="">
                    <p>Schnell</p>
                </div>
                <div>
                    <img src="../assets/Price Tag.png" alt="">
                    <p>Einfach</p>
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

<script setup>
    defineProps(['recipe_title', 'recipe_image', 'recipe_author', 'recipe_price', 'recipe_time'])
</script>

<style>

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
    height: 30px;
    align-items: center;
    justify-content: center;
    background-color: var(--color-red);
    border-radius: 1rem;
    padding-right: 2.5rem;
    margin-left: 1rem;
}
.tagBoxesContainer div p{
    padding-left: 25px;
    color: white;
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
<template>
    <div class="previewBar">
        <div class="previewBackground">
            <h1>Burger des Jahrtausends</h1>
            <div class="recipeInformationContainer">
                <img src="../assets/user_icon.png" class="userIconRecipe recipeShortInformation recipeIconInfos">
                <p class="textInformationRecipe recipeShortInformation">manfred_kocht33</p>
                <img src="../assets/price_icon.png" class="priceIconRecipe recipeShortInformation recipeIconInfos">
                <p class="textInformationRecipe recipeShortInformation">5$</p>
                <img src="../assets/time_icon.png" class="timeIconRecipe recipeShortInformation recipeIconInfos">
                <p class="textInformationRecipe recipeShortInformation">10min</p>
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
            <img src="../assets/Bookmark.png"></img>
            <p>Als Favorit markieren</p>
        </div>
        <div class="shareRecipe interactions">
            <img src="../assets/Share.png"></img>
            <p>Teilen</p>
        </div>
        <div class="likeRecipe thumbs">
            <img src="../assets/Thumbs Up.png"></img>
        </div>
        <div class="dislikeRecipe thumbs">
            <img src="../assets/Thumbs Down.png"></img>
        </div>
    </div>
    <div class="RecipeDetails">
        <div class="ingredientContainer">
            <h2 class="ingredients">Zutaten</h2>
                <div class="ingredientList">
                    <p>400g Hackfleisch <br>2TL Salz<br>2TL Pfeffer<br>Bratfett</p>
                </div>
                <h2 class="preperation">Zubereitung</h2>
                <p>1. Wasser mit Salz aufsetzen, derweil Kartoffeln schälen und in kleine Stücke schneiden. 
Die Kartoffeln nun ins Wasser geben und weich kochen. Die Butter hinzu geben und mit einem         Stampfer vermengen und zerstampfen, mit Salz und Pfeffer abschmecken.</p>
                    <p>2. Eine Pfanne mit Butter erhitzen und gefrorene Fischstäbchen hinzugeben. 
So lange braten bis die Fischstäbchen goldbraun angebraten sind. Optional mit Salz und Zitrone verfeinern.</p>
                        <p>3. Den gefrorenen Rahmspinat im Topf auf mittlerer Hitze erwärmen und einige Minuten köcheln lassen. Mit Pfeffer abschmecken.</p>
        </div>

    </div>
</template>

<style>
.previewBar{
    display: flex;
    align-items: center;
    transform: translate(0%);
}
.previewBackground{
    background-image: url('../assets/burger.jpg');
    background-size: cover;
    width: 100%;
    height: 25rem;
    display: flex;
    opacity: 70%;
    border-radius: 2rem;
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
    display: flex;
    justify-content: center;
    background-color: white;
    object-fit: cover;
    position: relative;
    width: 30%;
    height: 20%;
    border: 1px;
    border-style: solid;
    border-color: black;
    place-items: center;
    font-size: 160%;
    left: 20%;
    margin-top: 158px; /*Position der Infobox hardcoded. muss angepasst werden*/
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
    background-color: #FA4659;
    border-radius: 1rem;
    padding-right: 2.5rem;
}
.tagBoxesContainer div p{
    padding-left: 25px;
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
    padding-left: 1%;
    padding-right: 10px;
    max-width: 9%;
    align-items: center;
    border: 2%;
    border-style: solid;
    border-color: black;
    background-color: white;
    margin: 10px;
}
.ingredientContainer h2{
    text-align: center;
    font-weight: bold;
    font-size: 200%;
    padding-top: 20px
}
.ingredientContainer p{
    text-align: center;
    font-size: 140%
}

.recipeShortInformation{
    height: 40%;
    margin: auto;
}
.textInformationRecipe{
    size: 20%;
    padding-right: 4%;
}
.recipeIconInfos{
    padding-left: 4%
}


</style>
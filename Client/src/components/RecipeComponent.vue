<template>
    <div class="previewBar">
        <div class="previewBackground">
            <h1 class="recipeTitle">Burger des Jahrtausends</h1>
            <div class="recipeInformationContainer">
                <img src="../assets/user_icon.png" class="userIconRecipe recipeShortInformation recipeIconInfos">
                <p class="textInformationRecipe recipeShortInformation">manfred_kocht33</p>
                <img src="../assets/price_icon.png" class="priceIconRecipe recipeShortInformation recipeIconInfos">
                <p class="textInformationRecipe recipeShortInformation">5$</p>
                <img src="../assets/time_icon.png" class="timeIconRecipe recipeShortInformation recipeIconInfos">
                <p class="textInformationRecipe recipeShortInformation">10min</p>
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
                <h2 class="preparation">Zubereitung</h2>
                <p>1. Wasser mit Salz aufsetzen, derweil Kartoffeln schälen und in kleine Stücke schneiden. 
Die Kartoffeln nun ins Wasser geben und weich kochen. Die Butter hinzu geben und mit einem         Stampfer vermengen und zerstampfen, mit Salz und Pfeffer abschmecken.</p>
                    <p>2. Eine Pfanne mit Butter erhitzen und gefrorene Fischstäbchen hinzugeben. 
So lange braten bis die Fischstäbchen goldbraun angebraten sind. Optional mit Salz und Zitrone verfeinern.</p>
                        <p>3. Den gefrorenen Rahmspinat im Topf auf mittlerer Hitze erwärmen und einige Minuten köcheln lassen. Mit Pfeffer abschmecken.</p>
        </div>

    </div>
</template>

<style>
.ingredientList p{
    text-align: center;
    font-size: 120%;
}
.ingredientContainer h2{
    text-align: center;
    font-weight: bold;
    font-size: 200%;
    padding-top: 20px
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
.previewBackground{
    background-image: url('../assets/burger.jpg');
    background-size: cover;
    width: 100%;
    height: 25rem;
    display: flex;
    opacity: 70%;
    border-radius: 2rem;
}
.recipeInformationContainer{
    display: flex;
    align-items: baseline;
    background-color: white;
    margin: auto;
    object-fit: cover;
    position: center;
    width: 30%;
    height: 20%;
    border: 1px;
    border-style: solid;
    border-color: black;
    place-items: center;
    font-size: 160%;
}
.userIconRecipe{

}
.priceIconRecipe{
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
.recipeTitle{
}

.previewBar{

}
</style>
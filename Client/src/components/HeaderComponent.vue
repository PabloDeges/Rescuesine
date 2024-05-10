<template>
    <div class="header">
            <img src="../assets/logo.png" class="logo-img" alt="">
        <div class="box-right">
            <p class="appname">RESCUESINE</p>
            <input class="search-bar" type="text" placeholder="Rezepte durchsuchen">
                <div class="buttons">
                    <div class="button">Rezept erstellen</div>
                    <div class="button">Profil</div>
                </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>  

.header {
    display: flex;
}
.logo-img {
    width: 6rem;
    height: 6rem;
}
.appname {
    font-weight: bold;
    font-size: 2rem;
    color: white;
    padding: 2rem;
}
.search-bar {
    height: 3.5rem;
    font-size: 1rem;
    color: var(--color-grey);
    border: 2px solid var(--color-grey);
    padding: 1rem 2rem;
    width: 35vw;
    border-radius: 1rem;
    
}


.button {
    background-color: var(--color-darkgreen);
    padding: 0.8rem 2.5rem;
    border-radius: 1rem;
    color: var(--color-white);
    font-weight: bold;


}
.buttons {
    display: flex;
    justify-content: space-between;
    width: 24vw;
    height: 3rem;
    margin-right:1.5rem;
}


.box-right {
    display: flex;
    background-color: var(--color-lightgreen);
    width:100%;
    align-items: center;
    justify-content: space-between;
    height: 6rem;
}

@media (max-width:580px)  {
    .appname {
        visibility: hidden;
        display: none;
    }

}
/* (TODO) Responsive => only logo, searchbar and hamburger menu visible */

    
</style>



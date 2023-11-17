function fetchMakeupProducts(selectedBrand) {
    return fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${selectedBrand}`)
        .then((response) => response.json());
}


const favorites = [];

function addToFavorites(product) {
    favorites.push(product);
    updateFavoritesDisplay();
}

function removeFromFavorites(product) {
    const index = favorites.findIndex((p) => p.id === product.id);
    if (index !== -1) {
        favorites.splice(index, 1);
        updateFavoritesDisplay();
    }
}

function updateFavoritesDisplay() {
    
    const favoritesContainer = document.getElementById("favoritesContainer");
    favoritesContainer.innerHTML = "";

    favorites.forEach((product) => {

        const imageElement = document.createElement("img");
        imageElement.src = product.image_link;
        imageElement.alt = product.name;
        imageElement.style.width = "150px"; // Adjust the width as needed

        const productDiv = document.createElement("div");
        productDiv.classList.add("box");

        const brandPara = document.createElement("p");
        brandPara.textContent = `Brand: ${product.brand}`;

        const namePara = document.createElement("p");
        namePara.textContent = `Name: ${product.name}`;

        const pricePara = document.createElement("p");
        pricePara.textContent = `Price: ${product.price}`;

        const categoryPara = document.createElement("p");
        categoryPara.textContent = `Category: ${product.category}`;

        const colorPara = document.createElement("p");
        colorPara.textContent = `Color: ${product.product_color}`;

        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove from Favorites";
        removeButton.addEventListener("click", () => removeFromFavorites(product));

        productDiv.appendChild(imageElement);
        productDiv.appendChild(brandPara);
        productDiv.appendChild(namePara);
        productDiv.appendChild(pricePara);
        productDiv.appendChild(categoryPara);
        productDiv.appendChild(colorPara);
        productDiv.appendChild(removeButton);

        favoritesContainer.appendChild(productDiv);
    });
}

function buttonClicked() {
    var selectedBrand = document.getElementById("brandDropdown").value;

    fetchMakeupProducts(selectedBrand)
        .then((data) => {
            // Display makeup products
            document.getElementById("productContainer").innerHTML = "";
            data.forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("box");

                const imageElement = document.createElement("img");
                imageElement.src = product.image_link;
                imageElement.alt = product.name;
                imageElement.style.width = "150px"; // Adjust the width as needed

                const brandPara = document.createElement("p");
                brandPara.textContent = `Brand: ${product.brand}`;

                const namePara = document.createElement("p");
                namePara.textContent = `Name: ${product.name}`;

                const pricePara = document.createElement("p");
                pricePara.textContent = `Price: ${product.price}`;

                const categoryPara = document.createElement("p");
                categoryPara.textContent = `Category: ${product.category}`;

                const colorPara = document.createElement("p");
                colorPara.textContent = `Color: ${product.product_color}`;


                const addToFavoritesButton = document.createElement("button");
                addToFavoritesButton.textContent = "Add to Favorites";
                addToFavoritesButton.addEventListener("click", () => addToFavorites(product));

                productDiv.appendChild(imageElement);
                productDiv.appendChild(brandPara);
                productDiv.appendChild(namePara);
                productDiv.appendChild(pricePara);
                productDiv.appendChild(categoryPara);
                productDiv.appendChild(colorPara);
                productDiv.appendChild(addToFavoritesButton);

                document.getElementById("productContainer").appendChild(productDiv);
            });
        });
}




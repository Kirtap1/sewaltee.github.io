const products = [
    { 
        id: 1,
        name1: "the",
        name2: "Gloob",
        price: "€120",
        image: "assets/theGloob.jpg",
        description: "Minimalist desk lamp with adjustable brightness and warm/cool light settings. Perfect for modern workspaces.",
        specs: [
            "Height: 45cm",
            "Material: Aluminum & silicone",
            "Power: USB-C rechargeable",
            "Wattage: 15W LED"
        ],
        url: "product.html?id=1"
    },
    { 
        id: 2,
        name1: "the",
        name2: "Indiqa",
        price: "€150",
        image: "assets/theIndiqa.jpg",
        description: "Industrial-chic pendant light with dimmable LED array. Ideal for kitchen islands or dining areas.",
        specs: [
            "Diameter: 40cm",
            "Material: Steel & glass",
            "Installation: Ceiling mounted",
            "Wattage: 25W LED"
        ],
        url: "product.html?id=2"
    },
    { 
        id: 3,
        name1: "the",
        name2: "Stern",
        price: "€90",
        image: "assets/theStern.jpg",
        description: "Portable table lamp with wireless charging base and touch controls. IP54 water resistant.",
        specs: [
            "Height: 35cm",
            "Material: Concrete & rubber",
            "Features: Wireless charger",
            "Battery: 8h runtime"
        ],
        url: "product.html?id=3"
    },
];

function loadLamps() {
    const lampsContainer = document.getElementById("lamps");
    lampsContainer.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("a"); // Change to anchor tag
        card.href = product.url;
        card.classList.add("product-card");

        // Background image container
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageContainer.style.backgroundImage = `url(${product.image})`;

        // Overlay text for long hover
        const overlayText = document.createElement("div");
        overlayText.opacity = "0"; // Initially hidden

        // Create info bar
        const infoBar = document.createElement("div");
        infoBar.classList.add("info-bar");

        const productName = document.createElement("span");
        productName.classList.add("product-name");

        if (product.name1 && product.name2) {
            const name1Span = document.createElement("span");
            name1Span.classList.add("name1");
            name1Span.textContent = product.name1;

            const name2Span = document.createElement("span");
            name2Span.classList.add("name2");
            name2Span.textContent = product.name2;

            productName.appendChild(name1Span);
            productName.appendChild(document.createTextNode(" ")); // Space between words
            productName.appendChild(name2Span);
        } else {
            productName.textContent = product.name;
        }
        
        const productPrice = document.createElement("span");
        productPrice.classList.add("product-price");
        productPrice.setAttribute("data-price", product.price);
        productPrice.textContent = product.price;

        // Create Add to Cart button
        const addToCartButton = document.createElement("button");
        addToCartButton.dataset.product = JSON.stringify(product);
        addToCartButton.classList.add("add-product-to-cart");

        // Update click handler
        addToCartButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const product = JSON.parse(e.target.dataset.product);
            Cart.addItem(product);
            
            // Visual feedback
            addToCartButton.classList.add("clicked");
            cartIcon.classList.remove("fa-shopping-cart");
            cartIcon.classList.add("fa-check");
        });

        // Create the initial cart icon for the button
        const cartIcon = document.createElement("i");
        cartIcon.classList.add("fa", "fa-shopping-cart"); // Font Awesome cart icon
        addToCartButton.appendChild(cartIcon);

        // Button click event to change to "Added to Cart" with tick symbol
        addToCartButton.addEventListener("click", () => {
            addToCartButton.classList.add("clicked"); // Adds the "clicked" class for color and background change
            
            cartIcon.classList.remove("fa-shopping-cart"); // Remove cart icon
            cartIcon.classList.add("fa-check"); // Add tick icon
        });

        // Timer for blur effect (handled in JS)
        let hoverTimeout;
        card.addEventListener("mouseenter", () => {
            hoverTimeout = setTimeout(() => {
                imageContainer.classList.add("blurred");
            }, 1000);
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimeout);
            imageContainer.classList.remove("blurred");
            overlayText.style.opacity = "0"; // Hide text
        });

        // Append elements
        imageContainer.appendChild(overlayText);
        card.appendChild(imageContainer);
        infoBar.appendChild(productName);
        infoBar.appendChild(productPrice);
        infoBar.appendChild(addToCartButton); // Append the Add to Cart button
        card.appendChild(infoBar);
        lampsContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", loadLamps);
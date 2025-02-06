document.addEventListener("DOMContentLoaded", () => {
    let menuSec = document.querySelector(".menu-section");
    let loadingMessage = document.createElement("div");
    loadingMessage.classList.add("loading-message");
    loadingMessage.textContent = "Processing your order...";
    menuSec.appendChild(loadingMessage);
    loadingMessage.style.display = "none"; 
    function getMenu() {
        let menuContainer = document.createElement("div");
        menuContainer.classList.add("menu-container");
        menuSec.appendChild(menuContainer);

        fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json")
            .then(res => res.json()) 
            .then(data => {
                data.forEach(e => {
                    let imageUrl = "https://plus.unsplash.com/premium_photo-1683619761468-b06992704398?q=80&w=1565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Default image if no match found

                    let card = document.createElement("div");
                    card.classList.add("card");
                    card.innerHTML = 
                        `<img src="${imageUrl}" alt="${e.name}">
                        <h3>${e.name}</h3>
                        <p class="price">Price: $${e.price}</p>`;

                    menuContainer.appendChild(card); 
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    getMenu(); 

    function takeOrder() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const selectedItems = [];
                const items = document.querySelectorAll('.card');
                const randomIndices = [];


                while (randomIndices.length < 3) {
                    const randomIndex = Math.floor(Math.random() * items.length);
                    if (!randomIndices.includes(randomIndex)) {
                        randomIndices.push(randomIndex);
                        selectedItems.push(items[randomIndex].innerText);
                    }
                }

                console.log("Order placed: ", selectedItems);
                resolve({ items: selectedItems, totalPrice: Math.floor(Math.random() * 30) + 10 });
            }, 1500);
        });
    }

    function orderPrep(order) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Order is being prepared...");
                resolve(order);
            }, 1500);
        });
    }

   
    function payOrder(order) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`Order of ${order.items.join(", ")} is paid! Total: $${order.totalPrice}`);
                resolve();
            }, 1000);
        });
    }

    function thankyouFnc() {
        console.log("Thank you for your order!");
        alert("Thank you for your order!"); 
    }

    
    function simulateOrderProcess() {
        loadingMessage.style.display = "block"; 

        takeOrder()
            .then(order => {
                return orderPrep(order);
            })
            .then(order => {
                return payOrder(order);
            })
            .then(() => {
                thankyouFnc();
                loadingMessage.style.display = "none"; 
            })
            .catch(error => {
                console.error("Error processing order:", error);
                loadingMessage.style.display = "none"; 
            });
    }

   
    simulateOrderProcess(); 
});
function toggleMenu() {
    const linkSection = document.querySelector(".link-section");
    linkSection.classList.toggle("show");
}

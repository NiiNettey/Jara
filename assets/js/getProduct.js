$(document).ready(function () {
    $.get("./backend/getProducts.php", function (data) {
        let productsHTML = "";

        data.forEach((product) => {
            productsHTML += `
            <div class="product">
                <figure class="product-media">
                    <a href="product.html">
                        <img src="${product.image_path}" alt="${product.name}" class="product-image" />
                    </a>

                    <div class="product-action-vertical">
                        <a href="#" class="btn-product-icon btn-wishlist btn-expandable">
                            <span>add to wishlist</span>
                        </a>
                    </div>

                    <div class="product-action">
                        <a href="#" class="btn-product btn-cart" title="Add to cart">
                            <span>add to cart</span>
                        </a>
                    </div>
                </figure>

                <div class="product-body">
                    <div class="product-cat">
                        <a href="#">${product.category}</a>
                    </div>
                    <h3 class="product-title">
                        <a href="product.html">${product.name}</a>
                    </h3>
                    <div class="product-price">GHc${product.price}</div>
                </div>
            </div>`;
        });

        $("#product_data").html(productsHTML); 

     
        $("#product_data").owlCarousel('destroy');
        $("#product_data").owlCarousel({
            nav: false,
            dots: true,
            margin: 20,
            loop: false,
            responsive: {
                0: { items: 2 },
                480: { items: 2 },
                768: { items: 3 },
                992: { items: 4 },
                1280: { items: 5, nav: true }
            }
        });

    })
    .fail(function (xhr, status, error) {
        console.error("Error: " + error);
    });
});

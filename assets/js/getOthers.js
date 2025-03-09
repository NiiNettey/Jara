$(document).ready(function () {
    $.ajax({
        url: "./backend/getOthers.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.error) {
                console.error("Error: " + data.error);
                return;
            }

            var carousel = $(".container.clothing .owl-carousel");
            carousel.trigger("destroy.owl.carousel"); 
            carousel.empty(); 

            $.each(data, function (index, product) {
                var productHtml = `
                    <div class="product">
                        <figure class="product-media">
                            <a href="product.html">
                                <img src="${product.img}" alt="${product.pName}" class="product-image" />
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
                                <a href="#">${product.cat}</a>
                            </div>
                            <h3 class="product-title">
                                <a href="product.html">${product.pName}</a>
                            </h3>
                            <div class="product-price">Ghc${product.price}</div>
                        </div>
                    </div>`;

                carousel.append(productHtml);
            });

           
            carousel.owlCarousel({
                nav: false,
                dots: true,
                margin: 20,
                loop: false,
                responsive: {
                    0: { items: 1 },
                    480: { items: 2 },
                    768: { items: 3 },
                    992: { items: 4 },
                    1280: { items: 5, nav: true }
                }
            });
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error: " + error);
        }
    });
});

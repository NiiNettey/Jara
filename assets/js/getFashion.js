$(document).ready(function () {
    function loadFashionProducts() {
        $.get("./backend/getFashion.php", function (data) {
            if (data.error) {
                console.error("Error:", data.error);
                return;
            } 

            let productHTML = "";
            data.forEach(product => {
                productHTML += `
                <div class="product">
                    <figure class="product-media">
                        <a href="product.html">
                            <img src="${product.image_path}" alt="${product.name}" class="product-image"/>
                        </a>
                        <div class="product-action-vertical">
                            <a href="#" class="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                        </div>
                        <div class="product-action">
                            <a href="#" class="btn-product btn-cart" title="Add to cart"><span>add to cart</span></a>
                        </div>
                    </figure>
                    <div class="product-body">
                        <div class="product-cat">
                            <a href="#">${product.category}</a>
                        </div>
                        <h3 class="product-title">
                            <a href="product.html">${product.name}</a>
                        </h3>
                        <div class="product-price">
                            <span class="new-price">GHc${product.price}</span>
                        </div>
                    </div>
                </div>`;
            });

            let $carousel1 = $(".furniture #furn-new-tab .owl-carousel");
            let $carousel2 = $(".furniture #furn-featured-tab .owl-carousel");

         
            $carousel1.html(productHTML);
            $carousel2.html(productHTML);

       
            [$carousel1, $carousel2].forEach($carousel => {
                $carousel.trigger("destroy.owl.carousel").removeClass("owl-loaded");
                $carousel.owlCarousel({
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
            });
        }).fail(function (xhr, status, error) {
            console.error("AJAX Error:", error);
        });
    }

    loadFashionProducts();
});

$(document).ready(function () {
  $.get("./backend/getElectronics.php", function (data) {
    let productHTML = "";

  
    data.forEach((product) => {
      productHTML += `
            <div class="product">
                <figure class="product-media">
                    <a>
                        <img src="${product.image_path}" alt="${product.name}" class="product-image"/>
                    </a>

                    <div class="product-action-vertical">
                        <a class="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                    </div>

                    <div class="product-action">
                        <a href="#" class="btn-product btn-cart" data-id="${product.id}" title="Add to cart">
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
                    <div class="product-price">
                        <span class="new-price">GHc${product.price}</span>
                    </div>
                </div>
            </div>`;
    });

   
    let $carousel = $(".electronics .owl-carousel");
    $carousel.html(productHTML);

    
    if ($carousel.hasClass("owl-loaded")) {
      $carousel.trigger("destroy.owl.carousel");
      $carousel.removeClass("owl-loaded");
    }


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
        1280: { items: 5, nav: true },
      },
    });
  }).fail(function (xhr, status, error) {
    console.error("Error fetching electronics products: " + error);
  });

  
  $(document).on("click", ".btn-cart", function (e) {
    e.preventDefault();
    let product_id = $(this).data("id");
    console.log(product_id);
    

    $.post(
      "./backend/addToCart.php",
      {
        product_id: product_id,
        quantity: 1,
      },
      function (response) {
        console.log("Server Response:", response);
      }
    ).fail(function (xhr, status, error) {
      console.error("Error: " + error);
    });
  });
});

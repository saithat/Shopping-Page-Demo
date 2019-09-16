$(document).ready(function() {

    endpoint =  "https://api.punkapi.com/v2/beers";
    
    $.getJSON(endpoint, function(data){
        Display((data));

    })

    function Display(data)
        {
            let beerHtml = data.map(
                beer =>
                `
                <div class="col-auto mb-3 beer-card">
                    <div class="card"> 
                        <img src="${beer.image_url}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="beer-name">${beer.name}</h5>
                            <p class="card-text">${beer.description}</p>
                            <button type="button" class="add-to-cart mt-auto btn btn-lg btn-block btn-outline-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
                `
            );
        $('.card-deck').append(beerHtml);
        }


    

   $('.card-deck').on('click', '.add-to-cart', function(){
        let cartImage = $(this).closest(".card").find("img").attr("src");
        console.log(cartImage);
        let cartName = $(this).closest('.card-body').find('.beer-name').text();

        let cartHTML = 
        `
        <tr class="cart-element">
            <td>${cartName}</td>
            <td><img class="cart-image" src="${cartImage}"/> </td>
            <td>
                    <button type="button" class="removal btn btn-danger">
                        Remove
                    </button>  
            </td>
        </tr>
        `;

    $('.cart-table').append(cartHTML);
    });

    $('.cart-table').on('click', '.removal', function() {
        $(this).closest('.cart-element').remove();
      });

    var currentPage = 1;+

    $("#loadMore").click(function(){
        currentPage++;
        $.getJSON(endpoint+"?page="+currentPage, function(data){
            Display(data);
        })
    });
});

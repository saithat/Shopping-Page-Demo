$(document).ready(function() {

    endpoint =  "https://api.punkapi.com/v2/beers";
    
    $.getJSON(endpoint, function(data){
        console.log(data)
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
     //function addToCart(){
         //alert("button pressed!");
        let cartImage = $(this).closest(".card").find("img").attr("src");
        console.log(cartImage);
        let cartName = $(this).closest('.card-body').find('.beer-name').text();
        //console.log(cartName);

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

        //console.log(cartHTML);
    $('.cart-table').append(cartHTML);
    });
     // }

    $('.cart-table').on('click', '.removal', function() {
        //console.log("about to remove");
        $(this).closest('.cart-element').remove();
        //console.log("tried to delete");
      });

    var currentPage = 1;+

    $("#loadMore").click(function(){
        currentPage++;
        $.getJSON(endpoint+"?page="+currentPage, function(data){
            Display(data);
        })
    });
});
/*
function addToCart(){
    let cartImage = $(this).closest(".card").find(".card-img-top").attr("src");
    console.log($(this).closest(".card"));
    //console.log(cartImage);
    let cartName = $(this).closest('.card-body').find('.beer-name').text();
    console.log(cartName);

    let cartHTML = 
    `
    <tr>
        <td>${cartName}</td>
        <td><img class="cart-image img-fluid img-thumbnail" src="${cartImage}"></img><\td>
        <td>
            <div class="removal>
            <a href="#" class="btn btn-danger btn-sm">
            <i class="fa fa-times"></i>
            </div>
        </td>
    </tr>
    `;
$('.table-body').append(cartHTML);
//});

 }*/
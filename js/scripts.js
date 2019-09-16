$(document).ready(function() {
    // all custom jQuery will go here

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


    $('button').click(function(){
        let cartImage = $(this).closest(".card").find(".card-img-top").attr("src");
        console.log($(this).closest(".card"));
        //console.log(cartImage);
        let cartName = $(this).closest('.card-body').find('.beer-name').text();
        console.log(cartName);

        let cartHTML = 
        `
        <tr>
            <td>${cartName}</td>
            <td><img class="cart-image" src="${cartImage}"></img><\td>
            <td>
                <div class="removal>
                    <button type="button" class="btn btn-danger removal">
                        Remove
                    </button>
                </div>
            </td>
        </tr>
        `;
    $('.table-body').append(cartHTML);
    });

    $('.removal').click(function() {
        $(this).closest('tr').reomve();
      });

    var currentPage = 1;

    $("#loadMore").click(function(){
        currentPage++;
        $.getJSON(endpoint+"?page="+currentPage, function(data){
            Display(data);
        })
    });
});

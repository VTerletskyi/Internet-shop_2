$(document).ready(function (){
    let form = $('#form_buying_product')
    console.log(form);


    function basketUpdating(product_id, nmb, is_delete){
        let data = {};
        data.product_id = product_id;
        data.nmb = nmb;
        let csrf_token = $('#form_buying_product [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;

        if (is_delete){
            data["is_delete"] = true;
        }

        let url = form.attr("action");

    console.log(data)
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            cache: true,
            success: function (data){
                console.log("OK");
                console.log(data.products_total_nmb);
                if (data.products_total_nmb || data.products_total_nmb == 0){
                    $('$basket_total_nmb').text("(" + data.products_total_nmb + ")");
                    console.log(data.products);
                    $('.basket-items ul').html("");
                    $.each(data.products, function (k, v){
                        $('.basket-items ul').append('<li>'+ v.product_name +', '+v.nmb+ ' шт '+' по '+ v.product_price +' грн  '+
                            '<a class="delete-item" href="" data-product_id="'+v.id+'">x</a>'+
                            '</li>');
                    })
                }
            },
            error: function (){
                console.log("error")
            }
        })

    }


    form.on('submit', function (e){
        e.preventDefault();
        console.log('123');
        let nmb = $('#number').val();
        console.log(nmb);
        let submit_btn = $('#submit_btn');
        let product_id = submit_btn.data("product_id");
        let name = submit_btn.data("name");
        let price = submit_btn.data("price");
        console.log(product_id);
        console.log(name);


        basketUpdating(product_id, nmb, is_delete=false)


    })

    function shovingBasket(){
        $('basket-items').removeClass('hidden');
    }

    // $('.basket-container').on('click', function (e){
    //     e.preventDefault();
    //     shovingBasket()
    // })

    $('.basket-container').mouseover(function (){
        shovingBasket()
    })

    // $('.basket-container').mouseout(function (){
    //     shovingBasket()
    // })

    $(document).on('click', '.delete-item', function(e){
        e.preventDefault();
        product_id = $(this).data("product_id")
        nmb = 0;
        basketUpdating(product_id, nmb, is_delete=true)
    });

    function calculatingBasketAmount(){
        let total_order_amount = 0;
        $('.total-product-in-basket-amount').each(function (){
            total_order_amount += parseInt($(this).text());
        });
        console.log(total_order_amount);
        $('#total_order_amount').text(total_order_amount);
    }

    $(document).on('change', "product-in-basket-nmb", function (){
        let current_nmb = $(this).val();
        console.log(current_nmb);
        let current_tr = $(this).closest('tr');
        let current_price = parseInt(current_tr.find('.product-price').text());
        let total_amount = current_nmb * current_price;
        current_tr.find('.total-product-in-basket-amount').text(total_amount)

        calculatingBasketAmount();
    })
    calculatingBasketAmount();
})

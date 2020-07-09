require.config({
    paths: {
        jquery: './jquery.min',
        product: './lib/product',
        cookie: './cookie'
    },
    shim: {}
});

require(['jquery', 'product'], function($, product) {

    product.render(function(id, price) {

        // console.log(id, price)
        $('.addnum').on('click', function() {
            let num = $('.num').html();
            num++;
            if (num > 5) num = 5;
            $('.num').html(num);
            // console.log(num)
        });
        // console.log(num)
        $('.delnum').on('click', function() {
            let num = $('.num').html();
            num--;
            if (num < 1) num = 1;
            $('.num').html(num);
        });
        $('.addshop').on('click', function() {
            product.addItem(id, price, $('.num').html());
            alert('加入购物车成功')
        })
    });
});

// $(function() {
//     let num = 1;
//     $('add').on('click', function() {
//         num++;
//         $('.num').html() = num;
//     });
//     $('del').on('click', function() {
//         num--;
//         if (num < 0) num = 1;
//         $('.num').html() = num;
//     });


// });
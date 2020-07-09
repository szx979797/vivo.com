require.config({
    paths: {
        jquery: './jquery.min',
        shopcar: './lib/shopcar',
        cookie: './cookie',
        product: './lib/product'
    }
});

require(['jquery', 'shopcar', 'product'], function($, shopcar, product) {
    // shopcar.render();

    shopcar.render(function(shop, price) {

        // console.log(JSON.parse(document.cookie.split('=')[1])[0].id)

        let id = JSON.parse(document.cookie.split('=')[1])[0].id
        let num = JSON.parse(document.cookie.split('=')[1])[0].num;
        console.log($('.addnum'))
        $('.addnum').on('click', function() {
            // num = shop[0].num;
            console.log(num)
            num++;
            if (num > 5) num = 5;
            $(this).prev().html(num);
            product.addItem(id, price, num);
            // console.log(id, price, num)
            // location.reload()

        });
        // console.log(num)
        $('.delnum').on('click', function() {
            // num = shop[0].num;
            num--;
            if (num < 1) num = 1;
            $(this).next().html(num);
            product.addItem(id, price, num);
            // location.reload()

        });

        $('.add').on('click', function() {
            alert('添加成功')
        });

        $('.del').on('click', function(ev) {
            ev.target.parentNode.parentNode.remove();
        })

        $('.checkboxall').on('click', function() {
            if ($('.checkboxall').is(":checked")) {
                $("input[type='checkbox']").removeAttr("checked");
                console.log(1)
            } else {
                $("input[type='checkbox']").prop("checked", true);
                console.log(2)
            }
        })

        $('.delall').on('click', function() {

        })


    });
});
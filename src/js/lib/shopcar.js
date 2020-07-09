let basUrl = "http://localhost/vivo.com";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let shop = cookie.get('shop');
            console.log(shop);
            if (shop) {
                shop = JSON.parse(shop);
                console.log(shop)
                let idlist = shop.map(elm => elm.id).join();
                $.ajax({
                    type: "get",
                    url: `${basUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: "json",
                    success: function(res) {
                        console.log(res);
                        let tempstr = '';
                        let pricenum = 0;
                        let priceall = '';

                        res.forEach(elm => {
                            let pic = JSON.parse(elm.src);


                            let arr = shop.filter(val => val.id == elm.id);

                            // console.log(arr[0].num);

                            tempstr += `
                            <tr class="trlist">
                                <td class="first-child">
                                    <input type="checkbox">
                                    <img src="${basUrl}/src/${pic[1].src}" alt="${pic[1].title}">
                                </td>
                                <td class="second-child">
                                    <a href="#">
                                        ${elm.name}
                                    </a>
                                    <span>${pic[1].color}</span>
                                </td>
                                <td>${elm.price}</td>
                                <td class="fouth-child">
                                    <div class="number">
                                        <a href="javascript:;" class="delnum">-</a>
                                        <span class="num">${arr[0].num}</span>
                                        <a href="javascript:;" class="addnum">+</a>
                                    </div>
                                </td>
                                    <td>${pic[1].sale}</td>
                                    <td>${parseInt(pic[1].subtotal*arr[0].num)}</td>
                                    <td>${pic[1].subtotal*arr[0].num}</td>
                                    <td class="last-child">
                                    <div class="add">加入到收藏夹</div>
                                    <div class="del">删除</div>
                                </td>
                            </tr>`;

                            pricenum += parseInt(pic[1].subtotal * arr[0].num);
                            console.log(parseInt(pic[1].subtotal * arr[0].num))
                            priceall = `
                            <span>已选商品 1件，合计（不含运费）：
                                <i>¥${pricenum}.00</i>
                            </span>
                            <span>
                                ( 商品总价： ¥ ${pricenum}.00 优惠： ¥ 0.00 )
                            </span>
                            `


                        });
                        $('.table-shop').append(tempstr);
                        $('.priceall').html(priceall)
                            // console.log(res.price)
                        callback && callback(shop, res.price)

                    }
                });
            }
        }
    }
});
let baseUrl = "http://localhost/vivo.com";

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let id = location.search.split("=")[1];
            console.log(id)
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function(res) {
                    // console.log(res.src)
                    let pic = JSON.parse(res.src);
                    // console.log(pic[2]['title'].split(','))



                    let temp = `
                    <div class="content-top">
            <span>商城首页</span>
            <span class="iconfont icon-dibudaohanglan-1"></span>
            <span>配件产品</span>
            <span class="iconfont icon-dibudaohanglan-1"></span>
            <span class="last-child">
                ${res.name}
            </span>

        </div>
        <div class="content-left">
            <div class="fixbox">
                <div class="big">
                    <img src="${baseUrl}/src/${pic[2]['src'][0]}" alt="${baseUrl}/src/${pic[2]['title'].split(',')[0]}">
                </div>
                <div class="small">
                    <img src="${baseUrl}/src/${pic[2]['src'][1]}" alt="${baseUrl}/src/${pic[2]['title'].split(',')[1]}">
                    <img src="${baseUrl}/src/${pic[2]['src'][2]}" alt="${baseUrl}/src/${pic[2]['title'].split(',')[1]}">
                    <img src="${baseUrl}/src/${pic[2]['src'][3]}" alt="${baseUrl}/src/${pic[2]['title'].split(',')[1]}">
                    <img src="${baseUrl}/src/${pic[2]['src'][4]}" alt="${baseUrl}/src/${pic[2]['title'].split(',')[1]}">
                </div>
                <div class="cell">
                    收藏商品（7289人收藏） 分享

                </div>
            </div>
        </div>
        <div class="content-right">
            <h2 class="title">${res.name}</h2>
            <p class="text">${pic[2].text}</p>
            <div class="active">
                <div class="act-top">
                    <span class="act-top-left">
                        <i>抢购预告</i> 抢购价￥${res.price}，明天00:00开始
                    </span>
                    <span class="act-top-left">
                        更多活动 <span class="iconfont icon-dibudaohanglan-1"></span>
                    </span>
                </div>
                <div class="act-mid">
                    <span class="act-mid-left">
                        <i>￥</i> 
                        <span>${res.price}</span>
                    </span>
                    <span class="act-mid-right">
                        <i>积分</i> 购买即送<i>${res.price}</i>积分
                    </span>
                </div>
            </div>
            <div class="sup">
                <span class="sup-left">
                    商品支持：
                </span>
                <a href=""><span class="iconfont icon-xin"></span>花呗分期</a>
                <a href=""><span class="iconfont icon-xin"></span>以旧换新</a>
                <a href=""><span class="iconfont icon-xin"></span>积分抵现</a>
            </div>
            <div class="color">
                <h2>颜色</h2>
                <div>
                    <i></i>
                    <span>${pic[1].color}</span>
                </div>
            </div>
            <div>
                <div class="shop-type">
                    <h2>选择套餐</h2>
                    <div>
                        <div>官方标配</div>
                        <div class="box">胶囊数据线闪充套装
                            <i class="iii">￥148</i>
                            <i>省￥30</i>
                        </div>
                        <div class="box">直冲数据线闪充套装
                            <i class="iii">￥148</i>
                            <i>省￥30</i>
                        </div>
                    </div>
                </div>
                <div class="number">
                    <h2>数量</h2>
                    <div class="add">
                        <i class="delnum">-</i>
                        <i class="num">1</i>
                        <i class="addnum">+</i>
                    </div>
                    <span>（仅限购5件）</span>
                </div>
                <div class="pay">
                    <h2><span class="iconfont icon-xin"></span>支持分期付款</h2>
                    <div class="type">
                        <div>
                            <span>￥40.57 * 3期<br>手续费0.9元/期</span>
                            <i></i>
                        </div>
                        <div>
                            <span>￥40.57 * 3期<br>手续费0.9元/期</span>
                            <i></i>
                        </div>
                        <div>
                            <span>￥40.57 * 3期<br>手续费0.9元/期</span>
                            <i></i>
                        </div>
                        <div>
                            <span>￥40.57 * 3期<br>手续费0.9元/期</span>
                            <i></i>
                        </div>
                    </div>
                    <div class="box-bot">
                        <div class="pirce-box2">
                            <span>￥${res.price}</span>
                            <span>${pic[2].type}</span>
                        </div>
                        <div class="boot">
                            <div class="addshop">加入购物车</div>
                            <div>立即购买</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
                    `;

                    $('#content').append(temp);

                    callback && callback(res.id, res.price);
                }
            });
        },
        addItem: function(id, price, num) {
            let shop = cookie.get('shop');
            console.log(shop)
            let product = {
                id: id,
                price: price,
                num: num
            }

            if (shop) {
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = [];
                shop.push(product);
            }

            cookie.set('shop', JSON.stringify(shop), 1);
        }
    }
});
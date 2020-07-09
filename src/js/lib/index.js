let baseUrl = "http://localhost/vivo.com"; // 基础路径 必须是绝对路径

define(['jquery'], function($) {
    return {
        render: function() {
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        // console.log(elm.pic);
                        let pic = JSON.parse(elm.src);
                        console.log(pic[0].src);
                        temp += `<a href="${baseUrl}/src/html/product.html?id=${elm.id}">
                        <div class="nice-more-lit">
                            <img src="${baseUrl}/src/${pic[0].src}" alt="${baseUrl}/src/${pic[0].title}">
                            <p class="name">
                                ${elm.name}
                            </p>
                            <p class="feature"> ${elm.feature}</p>
                            <p class="price"><dfn>￥</dfn> ${elm.price}</p>
        
                        </div>
                    </a>`;
                    });

                    $('.nice-more-list').append(temp);

                }
            });
        }
    }
});
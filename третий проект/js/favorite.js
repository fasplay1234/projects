function init() {
    //вычитуем файл goods.json
    // $.getJSON("goods.json", product);
    $.post(
        "admin/core.php",
        {
            "action" : "loadGoods"
        },
        product
    );
}

function product(data) {
    //вывод на страницу
    data = JSON.parse(data);
    console.log(data);
    var out = "";
    var favorite = {};
    if (localStorage.getItem('favorite')) {
            //если есть - расшифровываю и записываю в переменную cart
            favorite = JSON.parse(localStorage.getItem('favorite'));
            for (var id in favorite) {
                out += '<div class="product">';
                out += '<div class="product_teddybrown">';
                out += '<div class="product_brown_img">';
                out += '<img src="images/'+data[id].img+'" alt="">';
                out += '</div>';
                out += `<p class="product_brown_title">${data[id].name}</p>`;
                out += `<p class="product_brown_descr">${data[id].desc}</p>`;
                out += '<div class="product_brown_footer">';
                out += `<p class="product_brown_price">${data[id].price}</p>`;
                // out += `<a href="product.html\#${key}">Просмотреть</a>`;
                out += '</div>';
                out += '</div>';
                out += '</div>';
        }
        $('.product').html(out);
    } else {
            $('.product').html('Добавьте товар');
        }
}

$(document).ready(function(){
    init();
    // loadCart();
})


// $(document).ready(function(){
//     $("header").hide(3000);
// })
// $("logo").hide(3000);
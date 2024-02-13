// переменная количества товара в корзине
var cart = {};

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
    for (var key in data) {
        out += '<div class="product">';
        out += '<div class="product_teddybrown">';
        out += '<div class="product_brown_img">';
        out += '<img src="images/'+data[key].img+'" alt="">';
        out += '</div>';
        out += `<p class="product_brown_title">${data[key].name}</p>`;
        out += `<p class="product_brown_descr" style="line-height:20px;">${data[key].desc}</p>`;
        out += '<div class="product_brown_footer">';
        out += `<p class="product_brown_price" style="line-height:25px;">${data[key].price}</p>`;
        out += `<button class="product_brown_btn" data-id="${key}">В корзину</button><br>`;
        out += `<button class="product_brown_btn_favorite" data-id="${key}">&hearts;</button>`;
        out += '</div>';
        out += '</div>';
        out += '</div>';
    }
    $('.product').html(out);
    $('.product_brown_btn').on('click', addToCart);
    $('.product_brown_btn_favorite').on('click', addToFavorite);
}

function addToFavorite() {
    //добавить товар в избранное
    var favorite = {};
    if (localStorage.getItem('favorite')) {
        //если есть - расшифровываю и записываю в переменную cart
        favorite = JSON.parse(localStorage.getItem('favorite'));
    }
    alert('Добавлено в избранное');
    var id = $(this).attr('data-id');
    favorite[id] = 1;
    localStorage.setItem('favorite', JSON.stringify(favorite));
}

function addToCart(){
    //добавление товара в корзину
    var id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1; //если товара в корзине нет - делаем равным 1
    } else {
        cart[id]++; //елси товар есть - увеличиваем на 1
    }
    // showMiniCart();
    saveCart();
}

function saveCart() {
    //сохраняет корзину в localstorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзина в строку
}

// function showMiniCart() {
//     //показывает мини корзину
//     var out="";
//     for (var key in cart){
//         out += key +'---'+ cart[key];
//     }
//     $('.link_cart').html(out);
// }

// function loadCart() {
//     //проверка есть ли в localstorage запись cart
//     if (localStorage.getItem('cart')) {
//         //если есть - расшифровываю и записываю в переменную cart
//         cart = JSON.parse(localStorage.getItem('cart'));
//         showMiniCart();
//     }
// }

$(document).ready(function(){
    init();
    // loadCart();
})


// $(document).ready(function(){
//     $("header").hide(3000);
// })
// $("logo").hide(3000);

// let search = document.querySelector('.search_unput');
//     searchSubmit = document.querySelector('.search_submit');
//     information = document.querySelectorAll('.product');

//     searchFunction=(text)=>{
//         information.forEach(element => {
//             if(element.textContent==text){
//                 element.style="animation:animationElemnts 15s;";
//                 console.log(elemnt);
//             }
//         });
//     }
// searchSubmit.addEventListener('click', (e)=>{
//     e.preventDefault();
//     searchFunction(search);
// });

$(document).ready(function () {
    // обрабатываем нажатие на кнопку
    $("#submit").click(function () {
      // очищаем переменную, в которой будет наш поисковый запрос
      var term = "";
      // и переменную, которая отвечает за количество найденных совпадений
      var n = "0";
      // убираем всю подсветку из прошлого поиска, если она была
      $('body').removeHighlight();
      // скрываем блок с текстом о количестве найденных результатов
      $(".results").hide().empty();
      // с помощью магии jQuery берём текст из строки поиска и кладём его в переменную term
      term = $('#term').attr('value');
      // если строка поиска пустая — выводим сообщение
      if ($('#term').val() == "") {
        $(".results").fadeIn().append("Вы ничего не ввели :(");
        return false;
        // иначе, если в строке поиска что-то было…
      } else {
        // в блоке content, где у нас находится весь текст, плагином подсвечиваем все найденные совпадения (если совпадений не будет — не будет и подсветки)
        $('.product_teddybrowne').highlight(term);
        // берём количество совпадений
        n = $("span.highlight").length;
        // если совпадений нет — в разделе results пишем, что ничего не нашли
        if (n == 0) {
          $(".results").fadeIn().append("Ничего такого в тексте нет");
          // иначе в том же разделе пишем число совпадений  
        } else {
          $(".results").fadeIn().append('Найдено совпадений:' + n);
        }
        return false;
      }
    });
  });

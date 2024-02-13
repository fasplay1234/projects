var cart = {};
function loadCart() {
    //проверка есть ли в localstorage запись cart
    if (localStorage.getItem('cart')) {
        //если есть - расшифровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    } else {
        $('.cart').html('Корзина пуста');
    }
}

function showCart() {
    if (!isEmpty(cart)) {
        $('.cart').html('Корзина пуста');
    } else {
        $.post(
            "admin/core.php",
            {
                "action" : "loadGoods"
            },
            function (data) {
            var goods = JSON.parse(data);
            var out = '';
            for (var id in cart) {
                out += `<button data-id="${id}" class="del_products">X</button>`;
                out += `<img src="images\\${goods[id].img }">`;
                out += ` ${goods[id].name }`;
                out += `  <button data-id="${id}" class="minus_products">-</button>  `;
                out += ` ${cart[id] } `;
                out += `  <button data-id="${id}" class="plus_products">+</button>  `;
                out += cart[id]*goods[id].price;
                out += `<br>`;
            }
            $('.cart').html(out);
            $('.del_products').on('click', delProducts);
            $('.plus_products').on('click', plusProducts);
            $('.minus_products').on('click', minusProducts);
        });
    }
}

function delProducts() {
    //удалить товар из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}

function plusProducts() {
    //добавляет товар в корзине
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}

function minusProducts() {
    //уменьшает товар в корзине
    var id = $(this).attr('data-id');
    if (cart[id] == 1) {
        delete cart[id];
    } else {
        cart[id]--;
    }
    saveCart();
    showCart();
}


function saveCart() {
    //сохраняет корзину в localstorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзина в строку
}

function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object) {
      if (object.hasOwnProperty(key)) return true;
        return false;
    }
}

function buy() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data) {
                        alert('Заказ отправлен');
                    } 
                    // else {
                    //     alert('Повторите заказ');
                    // }
                }
            );
        } else {
            alert('Корзина пустая');
        }

    } else {
        alert('Заполните поля!');
    } 
}
$(document).ready(function() {
    loadCart();
    $('.buy').on('click', buy); //отправляет заяку
});
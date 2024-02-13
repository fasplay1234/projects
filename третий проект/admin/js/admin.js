function init() {
    $.post(
        "core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

function showGoods(data) {
    data = JSON.parse(data);
    console.log(data);
    var out ='<select>';
    out += '<option data-id="0">Новый товар</option>'
    for (var id in data) {
        out += `<option data-id="${id}">${data[id].name}</option>`;
    }
    out +='</select>';
    $('.products_out').html(out);
    $('.products_out select').on('change', selectGoods);
}

function selectGoods(){
    var id = $('.products_out select option:selected').attr('data-id');
    $.post(
        "core.php",
        {
            "action" : "selectOneGoods",
            "gid" : id
        },
        function(data){
            data = JSON.parse(data);
            $('#gname').val(data.name);
            $('#gcost').val(data.price);
            $('#gdesc').val(data.desc);
            $('#gorder').val(data.ord);
            $('#gimg').val(data.img);
            $('#gid').val(data.id);
        }
    );
}

function saveToDb() {
    var id = $('#gid').val();
    console.log(id);
    if (id!=""){
        $.post(
            "core.php",
            {
                "action" : "updateGoods",
                "id" : id,
                "gname" : $('#gname').val(),
                "gcost" : $('#gcost').val(),
                "gdesc" : $('#gdesc').val(),
                "gorder" : $('#gorder').val(),
                "gimg" : $('#gimg').val()
            },
            function(data){
                if (data==1) {
                    alert('Запись добавлена');
                    init();
                } else {
                    console.log(data);
                }
            }
        );
    } else {
        console.log('new');
        $.post(
            "core.php",
            {
                "action" : "newGoods",
                "id" : 0,
                "gname" : $('#gname').val(),
                "gcost" : $('#gcost').val(),
                "gdesc" : $('#gdesc').val(),
                "gorder" : $('#gorder').val(),
                "gimg" : $('#gimg').val()
            },
            function(data){
                if (data==1) {
                    alert('Запись добавлена');
                    init();
                } else {
                    console.log(data);
                }
            }
        );
    }
}

$(document).ready(function() {
    init();
    $('.add_to_db').on('click', saveToDb);
});
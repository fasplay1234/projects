<?php
$servername = "localhost";
$username = "root";
$password = "mysql";
$dbname = "teddybearworld";

function connect() {
    $conn = mysqli_connect("localhost", "root", "mysql", "teddybearworld");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    mysqli_set_charset($conn, "utf8");
    return $conn;
}

function init(){
    //выводит список товаров
    $conn = connect();
    $sql = "SELECT id, name FROM brown_bear";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    $out = array();
    while($row = mysqli_fetch_assoc($result)) {
        $out[$row["id"]] = $row;
    }
    echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function selectOneGoods(){
    $conn = connect();
    $id = $_POST["gid"];
    $sql = "SELECT * FROM brown_bear WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result) ;
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function updateGoods(){
    $conn = connect();
    $id = $_POST["id"];
    $name = $_POST["gname"];
    $cost = $_POST["gcost"];
    $desc = $_POST["gdesc"];
    $img = $_POST["gimg"];
    $ord = $_POST["gorder"];

    $sql = "UPDATE brown_bear SET `name` = '$name', `price` = '$cost', `desc` = '$desc', `ord` = '$ord', `img` = '$img' WHERE id= '$id' ";

    if (mysqli_query($conn, $sql)) {
        echo "1";
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }

    mysqli_close($conn);
    writeJSON();
}

function newGoods(){
    $conn = connect();
    $name = $_POST["gname"];
    $cost = $_POST["gcost"];
    $desc = $_POST["gdesc"];
    $img = $_POST["gimg"];
    $ord = $_POST["gorder"];

    $sql = "INSERT INTO brown_bear (`name`, `price`, `desc`, `ord`, `img`) VALUES ('$name', '$cost', '$desc', '$ord', '$img')";

        if (mysqli_query($conn, $sql)) {
        echo "1";
        } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }

    mysqli_close($conn);
    writeJSON();
}

function writeJSON(){
    $conn = connect();
    $sql = "SELECT * FROM brown_bear";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
    $out = array();
    while($row = mysqli_fetch_assoc($result)) {
        $out[$row["id"]] = $row;
    }
    $a = file_put_contents ('../goods.json', json_encode($out));
    echo 'write+'.$a;
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function loadgoods() {
    $conn = connect();
    $sql = "SELECT * FROM brown_bear";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
        } else {
            echo "0";
        }
        mysqli_close($conn);
}
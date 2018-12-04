<?php

include "connection.php";

// $dataJSON = file_get_contents('php://input');
// $data = json_encode($dataJSON);
$data = $_POST;
$req = $data->request;

if($req == 2 ){
    $isbn = $data->isbn;
    $judul = $data->judul;
    $pengarang = $data->pengarang;
    $harga = $data->harga;
    $kategori = $data->kategori;
    $rating = $data->rating;

    $cek = $connect->query("SELECT * FROM buku WHERE isbn ='" .$isbn. "' ");
    if(mysqli_num_rows($cek) == 0) {
        $connect->query("INSERT INTO buku VALUES (' ','$isbn','$judul','$pengarang','$harga','$rating','$kategori')");
        echo '<script>alert("Sukses Memasukan Data")</script>';
    }else {
        echo 'Data sudah ada';
    }
}else {
    // print("belum memasukan data");
}
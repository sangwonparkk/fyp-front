<?php

  define("DB_HOST", "mydb");
  define("USERNAME", "dummy");
  define("PASSWORD", "c3322b");
  define("DB_NAME", "db3322");
  $conn=mysqli_connect(DB_HOST, USERNAME, PASSWORD, DB_NAME) or die('Error! '. mysqli_connect_error($conn));

  $usertype = $_GET['usertype'];
  $email = $_GET['email'];
  $query = "SELECT * FROM account WHERE useremail = '$email' AND usertype = '$usertype'";
  $result = mysqli_query($conn, $query) or die('Error! ' . mysqli_error($conn));
  if (mysqli_num_rows($result) > 0) {
      print "true";
  } else {
      print "false";
  }


  mysqli_free_result($result);
  mysqli_close($conn);    
  

?>
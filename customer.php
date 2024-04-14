<?php

session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit();
}

$_SESSION['result'] = "";

start();

function start() {
    display_customer_page();
}

# Includes the autoloader for libraries installed with composer
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Storage\StorageClient;
use google\appengine\api\cloud_storage\CloudStorageTools;

# Your Google Cloud Platform project ID
$projectId = 'intrepid-stock-411303';

# Instantiates a client
$storage = new StorageClient([
    'projectId' => $projectId,
    'keyFilePath' => 'intrepid-stock-411303-15174ccc4745.json'
]);

# The name for the new bucket
$bucket = $storage->bucket('file-bucket93');

// $options = ['gs_bucket_name' => $bucket];
// $upload_url = CloudStorageTools::createUploadUrl('/upload/handler', $options);

foreach ($bucket->objects() as $object) {
    // echo "https://storage.googleapis.com/".$bucket->name()."/".$object->name().'<br>';
    $_SESSION['result'] =  "<p>Your file \"".$object->name()."\" has been uploaded.</p>";
}

// echo $upload_url;


if(isset($_POST['submit'])) {

    $file = file_get_contents($_FILES['file']['tmp_name']);
    $objectName = $_FILES["file"]["name"];

    $object = $bucket->upload($file, [
        'name' => $objectName
    ]);

    echo "Your file \"".$objectName."\" has been uploaded.";
}


function display_customer_page() {
  ?>
  <html>
  <head>
    <title>Decentralized Machine Learning Platform</title>
    <link rel="stylesheet" type="text/css" href="./customer.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <script src='https://cdn.jsdelivr.net/npm/bignumber.js@9.1.2/bignumber.min.js'></script>
    <script src="./script.js" type="text/javascript"></script>
  </head>
  <body>
    <div class="container">

    <h1>Decentralized Machine Learning Platform</h1>
    <div id="login-container">
      <p id="login-title">Logged into Customer account: <?php echo $_SESSION['user']?></p>
      <a href="login.php?action=signout" class="button logout">Logout</a>
    </div>
        <h3>1. Choose a file to run ML on:</h3>
        <div class="inside-container">
            <form action="" method="post" enctype="multipart/form-data">
                <input type="file" name="file" id="fileinput" />
                <input
                    type="button"
                    value="Pay"
                    name="pay"
                    id="pay-button"
                    onclick="payFunction();"
                />
                <br />
                <br />
                <input
                type="submit"
                value="Upload"
                name="submit"
                id="submit-button"
                disabled
                />
            </form>
            <p><?php echo $_SESSION['result'] ?></p>
        </div>
        <h3>2. Wait for the model to show up:</h3>
        <div class="inside-container model-container">
            <input type="button" value="Check" id="check-button">
            <div id="link-container">
                <div id="modelLink">
                    <a href="https://storage.googleapis.com/file-bucket93/model.json" download>Download Model File</a>
                </div>
                <div id="weightLink">
                    <a href="https://storage.googleapis.com/file-bucket93/model.h5" download>Download Weight File</a>
                </div>
            </div>
        </div>
    </div>
  </body>
  </html>
  <?php
}    

?>
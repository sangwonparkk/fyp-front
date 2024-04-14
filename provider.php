<?php

session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit();
}

start();

function start() {
    display_register_page();
}


function display_register_page() {
  ?>
  <html>
  <head>
    <title>Node Provider Register</title>
    <link rel="stylesheet" href="./provider.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    <script src='https://cdn.jsdelivr.net/npm/bignumber.js@9.1.2/bignumber.min.js'></script>
    <script src="./script.js"></script>
  </head>
  <body>
    <div class="container">
    <h1>Decentralized Machine Learning Platform</h1>
    <div id="login-container">
      <p id="login-title">Logged into Node Provider account: <?php echo $_SESSION['user']?></p>
      <a href="login.php?action=signout" class="button logout">Logout</a>
    </div>
      <h3>1. Input a username and click join:</h3>
      <div class="inside-container">
        <form action="#">
          <label for="username">Username:</label>
          <input type="text" name="username" id="username-textfield">
          <input
            type="button"
            value="Join"
            name="join"
            id="join-button"
            onclick="joinFunction(); getUserFunction();"
          />
        </form>
      </div>
    </div>
  </body>
</html>

  <?php
}    

?>
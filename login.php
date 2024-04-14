<?php

session_start();
start();

function start() {
    if(isset($_POST['type']) && $_POST['type'] == 'login') {
        // echo "<script>alert('inside login');</script>";
        // echo "<script>console.log('inside login');</script>";
        $auth = authenticate();
        if($auth === true) {
            if (isset($_POST['usertype']) && $_POST['usertype'] == 'provider') {
                // display provider page
                display_provider_page();
            } else {
                // display customer page
                display_customer_page();
            }
        } else {
            // display login page with error message
            // use check.php
            display_login_page($auth);
        }
    } 
    else if (isset($_POST['type']) && $_POST['type'] == 'register') {
        $reg = register();
        if($reg === true) {
            if (isset($_POST['usertype']) && $_POST['usertype'] == 'provider') {
                // display provider page
                display_provider_page();
            } else {
                // display customer page
                display_customer_page();
            }
        } else {
            // display login page with error message
            display_login_page($reg);
        }
    }
    else if (isset($_GET['action']) && $_GET['action'] == 'signout') {
            // obtain a GET request with query string action=signout
            logout();
    } else {
        // echo "<script>alert('else');</script>";
        // echo "<script>console.log('else');</script>";
        // is a GET request, Already authenticated. has session cookie
        if (authenticate()) {
            display_customer_page();
        } else {
            display_login_page();
        }
    }
}

function display_login_page($msg="") {
    ?>
    <html>
    <head>
    <title>Decentralized Machine Learning Platform</title>
    <link rel="stylesheet" type="text/css" href="./login.css" />

    <!-- <link rel="shortcut icon" href="#"> -->
    </head>
    <body>
        <h1>Decentralized Machine Learning Platform</h1>
        <div class="container">
            <div id="login-container">
                <form action='login.php' method='post'>
                    <fieldset name="type">
                        <legend>Login</legend>
                        <input type="hidden" name="type" value="login">
                        <label for="usertype">Type of User:</label>
                        <select name="usertype" id="usertype">
                            <option value="customer">Customer</option>
                            <option value="provider">Provider</option>
                        </select>
                        <label for="user">Email:</label>
                        <input type='email' name='user' id="login-email" onblur="checkFunction('login');">
                        <label for="password">Password:</label>
                        <input type='password' name='password' id='login-password'>
                        <input type='submit' name='login' value="Login" id="loginBtn" onclick="return checkFilledFunction('login');">
                        <p>Click <a href="#" id="register-link" onclick="showRegistrationForm();">here</a> to register an account</p>
                        <div class="error-msg" id="login-error"><?php echo $msg ?></div>
                    </fieldset>
                </form>
            </div>
            <div id="register-container" class="hidden">
                <form action='login.php' method='post'>
                    <fieldset name="type">
                        <legend>Registration</legend>
                        <input type="hidden" name="type" value="register">
                        <label for="usertype">Type of User:</label>
                        <select name="usertype" id="usertype">
                            <option value="customer">Customer</option>
                            <option value="provider">Provider</option>
                        </select>
                        <label for="user">Email:</label>
                        <input type='email' name='user' id="register-email">
                        <label for="password">Password:</label>
                        <input type='password' name='password' id='register-password'>
                        <label for="confirmpassword">Confirm password:</label>
                        <input type='password' name='confirmpassword' id='confirm-password'>
                        <input type='submit' name='register' value="Register" id="registerBtn" onclick="return checkFilledFunction('register');">
                        <p>Click <a href="#" id="login-link">here</a> for login</p>
                        <div class="error-msg" id="register-error"><?php echo $msg ?></div>
                    </fieldset>
                </form>
            </div>
        </div>
    </body>
    <script src="login.js" type="application/javascript"></script>

    <?php
}


function authenticate() {
    if (isset($_SESSION['user'])) {
        return true;
    }
    if (isset($_POST['user']) && isset($_POST['password']) && isset($_POST['usertype'])) {
        $type = $_POST['usertype'];
        $email = $_POST['user'];
        $password = $_POST['password'];
        $conn = mysqli_connect('mydb', 'dummy', 'c3322b', 'db3322') or die('Error! '. mysqli_connect_error($conn));
        $query = "SELECT * FROM account WHERE useremail = '$email' AND usertype = '$type'";
        $result = mysqli_query($conn, $query) or die('Error! ' . mysqli_error($conn));
        
        if (mysqli_num_rows($result) > 0) {
            // User with the specified email exists
            // Check if the password is correct
            $query = "SELECT * FROM account WHERE useremail = '$email' AND password = '$password'";
            $result = mysqli_query($conn, $query) or die('Error! ' . mysqli_error($conn));
            if (mysqli_num_rows($result) > 0) {
                // User with specified email and password exists
                $_SESSION['user'] = $email;
                // session_write_close();
                return true;
            } else {
                // Email exists but password is incorrect
                return "Failed to login. Incorrect password!";
            }
        } else {
            // User with the specified email does not exist
            return "Failed to login. Unknown user!";
        }
    }
}


function display_customer_page() {
    header('location: customer.php');
}

function display_provider_page() {
    header('location: provider.php');
}

function register() {
    if (isset($_POST['user']) && isset($_POST['password'])) {
        $type = $_POST['usertype'];
        $email = $_POST['user'];
        $password = $_POST['password'];
        $conn = mysqli_connect('mydb', 'dummy', 'c3322b', 'db3322') or die('Error! '. mysqli_connect_error($conn));
        // check if email exists
        $query = "SELECT * FROM account WHERE useremail = '$email' AND usertype = '$type'";
        $result = mysqli_query($conn, $query) or die('Error! ' . mysqli_error($conn));
        if (mysqli_num_rows($result) > 0) {
            // User with the specified email exists
            return "Failed to register. Already registered before!";

        } else {
            $query = "INSERT INTO account values (NULL,'$type','$email', '$password')";
            $result = mysqli_query($conn, $query) or die('Error! ' . mysqli_error($conn));
            if ($result) {
                // Registration successful
                $_SESSION['user'] = $email;
                // session_write_close();
                return true;
            } else {
                // Registration failed
                return "Failed to register. Please try again!";
            }
        }
    }
}


function logout() {
    if(isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time()-3600, '/');
    }
    session_unset();
    session_destroy();
    header('location: login.php');
}
?>
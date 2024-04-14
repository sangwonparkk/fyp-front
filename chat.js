var myName = "";

function getNameFromPHP(email) {
  myName = getName(email);
}

function getChatFunction() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      elem.innerHTML = newvalue;
    }
  };
  // Define request
  xmlhttp.open("GET", "chatmsg.php?time=", true);
  // Set request header
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send request
  xmlhttp.send();
}

function trimString(str) {
  return str.trim().replace(/\n/g, " ");
}

function getName(email) {
  var modifiedEmail = email.replace("@connect.hku.hk", "");
  return modifiedEmail;
}

function getOneHourChat() {
  var timeNow = Date.now();
  var oneHourAgo = timeNow - 3600000;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      var chatBox = document.getElementById("chat-messages");

      for (var i = 0; i < data.length; i++) {
        var n = data[i].person;
        var m = data[i].message;
        var milliseconds = Number(data[i].time);
        var date = new Date(milliseconds);
        var d = date.toLocaleTimeString();

        var div = document.createElement("div");
        if (n == myName) {
          div.className = "chat-message-self";
        } else {
          div.className = "chat-message";
        }
        var name = document.createElement("p");
        name.className = "chat-name";
        name.innerHTML = n;
        var message = document.createElement("p");
        message.className = "chat-text";
        message.innerHTML = m;
        var da = document.createElement("p");
        da.className = "chat-date";
        da.innerHTML = d;
        div.appendChild(name);
        div.appendChild(da);
        div.appendChild(message);
        chatBox.appendChild(div);
      }
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };
  // Define request
  xmlhttp.open("GET", "chatmsg.php?time=" + oneHourAgo, true);
  // Set request header
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send request
  xmlhttp.send();
}

// getOneHourChat();

// Every 5 seconds update the chat
setInterval(function () {
  var timeNow = Date.now();
  //   var oneHourAgo = timeNow - 3600000;
  var fiveSecAgo = timeNow - 5000;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      var chatBox = document.getElementById("chat-messages");

      for (var i = 0; i < data.length; i++) {
        var n = data[i].person;
        var m = data[i].message;
        var milliseconds = Number(data[i].time);
        var date = new Date(milliseconds);
        var d = date.toLocaleTimeString();

        var div = document.createElement("div");
        if (n == myName) {
          div.className = "chat-message-self";
        } else {
          div.className = "chat-message";
        }
        var name = document.createElement("p");
        name.className = "chat-name";
        name.innerHTML = n;
        var message = document.createElement("p");
        message.className = "chat-text";
        message.innerHTML = m;
        var da = document.createElement("p");
        da.className = "chat-date";
        da.innerHTML = d;
        div.appendChild(name);
        div.appendChild(da);
        div.appendChild(message);
        chatBox.appendChild(div);
      }
      if (data != false) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    } else if (xmlhttp.status == 401) {
      window.location.href = "login.php";
    }
  };
  // Define request
  xmlhttp.open("GET", "chatmsg.php?time=" + fiveSecAgo, true);
  // Set request header
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Send request
  xmlhttp.send();
}, 5000);

function sendMessage(email) {
  myName = getName(email);
  var msg = document.getElementById("input-message").value;
  var date = Date.now();
  if (msg == "") {
    return false;
  } else {
    msg = trimString(msg);
    // Send the message using AJAX post
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("input-message").value = "";
        return true;
      }
    };
    // Define request
    xmlhttp.open("POST", "chatmsg.php", true);
    // Set request header
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );

    // Send request
    xmlhttp.send("time=" + date + "&message=" + msg + "&person=" + myName);

    return true;
  }
}

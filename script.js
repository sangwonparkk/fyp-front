const Web3 = window.Web3;

let payment = 0;
async function payFunction() {
  var input = document.getElementById("fileinput");
  if (!input.files) {
    // This is VERY unlikely, browser support is near-universal
    console.error(
      "This browser doesn't seem to support the `files` property of file inputs."
    );
  } else if (!input.files[0]) {
    addPara("Please select a file before clicking 'Load'");
  } else {
    var file = input.files[0];
    var filesize = (file.size / 1024).toFixed(2);
    payment = (filesize * 0.0001).toFixed(2);
  }
  if (payment != 0) {
    if (typeof window.ethereum !== "undefined") {
      await ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      const result = await transfer(
        web3,
        accounts,
        "0xfd2289297D77Ce670f3D6764333fF95EEdaaD309",
        "0xfd2289297D77Ce670f3D6764333fF95EEdaaD309",
        payment
      );
      console.log(result);
      if (result[0] == "Error") {
        addPara(result[1]);
      } else {
        addPara(
          "Payment of " +
            payment +
            " DMLtokens is successful! Here is the transaction hash: " +
            result[1]
        );
        //send transaction result to be stored in db

        document.getElementById("submit-button").disabled = false;
        document.getElementById("pay-button").disabled = true;
      }
    } else {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      const result = await transfer(
        web3,
        accounts,
        "0xfd2289297D77Ce670f3D6764333fF95EEdaaD309",
        "0xfd2289297D77Ce670f3D6764333fF95EEdaaD309",
        payment
      );
      console.log(result);
      if (result[0] == "Error") {
        addPara(result[1]);
      } else {
        addPara(
          "Payment of " +
            payment +
            " DMLtokens is successful! Here is the transaction hash: " +
            result[1]
        );
        document.getElementById("submit-button").disabled = false;
        document.getElementById("pay-button").disabled = true;
      }
    }
  }
}

async function transfer(web3, sender, recipient, contract, amount) {
  try {
    // Get the number of tokens to transfer (convert from wei to token decimals)
    const tokenCrt = new web3.eth.Contract(
      [
        {
          inputs: [
            { internalType: "address", name: "initialOwner", type: "address" },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
        {
          inputs: [
            { internalType: "uint256", name: "length", type: "uint256" },
          ],
          name: "ECDSAInvalidSignatureLength",
          type: "error",
        },
        {
          inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
          name: "ECDSAInvalidSignatureS",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "allowance", type: "uint256" },
            { internalType: "uint256", name: "needed", type: "uint256" },
          ],
          name: "ERC20InsufficientAllowance",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
            { internalType: "uint256", name: "balance", type: "uint256" },
            { internalType: "uint256", name: "needed", type: "uint256" },
          ],
          name: "ERC20InsufficientBalance",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "approver", type: "address" },
          ],
          name: "ERC20InvalidApprover",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "receiver", type: "address" },
          ],
          name: "ERC20InvalidReceiver",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "sender", type: "address" },
          ],
          name: "ERC20InvalidSender",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
          ],
          name: "ERC20InvalidSpender",
          type: "error",
        },
        {
          inputs: [
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          name: "ERC2612ExpiredSignature",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "signer", type: "address" },
            { internalType: "address", name: "owner", type: "address" },
          ],
          name: "ERC2612InvalidSigner",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "currentNonce", type: "uint256" },
          ],
          name: "InvalidAccountNonce",
          type: "error",
        },
        { inputs: [], name: "InvalidShortString", type: "error" },
        {
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "OwnableInvalidOwner",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
          ],
          name: "OwnableUnauthorizedAccount",
          type: "error",
        },
        {
          inputs: [{ internalType: "string", name: "str", type: "string" }],
          name: "StringTooLong",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [],
          name: "EIP712DomainChanged",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [],
          name: "DOMAIN_SEPARATOR",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
          ],
          name: "balanceOf",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
          name: "burn",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          name: "burnFrom",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "eip712Domain",
          outputs: [
            { internalType: "bytes1", name: "fields", type: "bytes1" },
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "version", type: "string" },
            { internalType: "uint256", name: "chainId", type: "uint256" },
            {
              internalType: "address",
              name: "verifyingContract",
              type: "address",
            },
            { internalType: "bytes32", name: "salt", type: "bytes32" },
            {
              internalType: "uint256[]",
              name: "extensions",
              type: "uint256[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "owner", type: "address" }],
          name: "nonces",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
            { internalType: "uint8", name: "v", type: "uint8" },
            { internalType: "bytes32", name: "r", type: "bytes32" },
            { internalType: "bytes32", name: "s", type: "bytes32" },
          ],
          name: "permit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      contract
    );
    const tokenDecimals = await tokenCrt.methods.decimals().call();
    console.log(Number(tokenDecimals));
    console.log(amount);
    amount = amount * Math.pow(10, Number(tokenDecimals));
    //amount = BigNumber(amount);

    // Transfer tokens from the owner's account to the recipient
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 150000;
    const nonce = await web3.eth.getTransactionCount(sender[0], "latest");

    const txObject = {
      gasLimit: Web3.utils.toHex(gasLimit),
      gasPrice: Web3.utils.toHex(gasPrice),
      from: sender[0],
      to: recipient,
      data: tokenCrt.methods.transfer(recipient, amount).encodeABI(),
    };

    // Sign and send the transaction
    const signedTx = await web3.eth.sendTransaction(txObject);
    // const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return ["Success", signedTx.transactionHash];
  } catch (error) {
    return ["Error", error];
  }
}

async function joinFunction() {
  //ask node provider to stake eth to join the network
  //once payment is confirmed information of the user will be stored in db
  if (typeof window.ethereum !== "undefined") {
    await ethereum.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const recipient = "0x7772eC29eac2962C79C96F82ACD432F5d2204fFb";
    const exist = await fetch(
      `http://localhost:3000/api/getWorkerNode/${getUserFunction()}`
    );
    if (exist.status == 200) {
      addPara("Username already exists");
      return;
    } else {
      const txObject = {
        from: accounts[0],
        to: recipient,
        value: parseInt(web3.utils.toWei("0.001", "ether")).toString(16),
      };
      console.log(txObject);
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txObject],
      });
      console.log(txHash);
      try {
        const bd = {
          walletAddress: accounts[0],
          username: getUserFunction(),
          status: "good",
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bd),
        };
        fetch(
          "https://dml-layer2-backend.onrender.com/api/createNodeProvider",
          options
        )
          .then((response) => {
            console.log("Response status:", response.status);
            console.log("Response statusText:", response.statusText);
            console.log("Response headers:", response.headers);
          })
          .catch((error) => console.error(error));
        addPara("Joined!");
        return txHash.transactionHash;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
}

function getUserFunction() {
  userID = document.getElementById("username-textfield").value;
  return userID;
}

// $('#fileinput').on('change', function() {
//     console.log('This file size is: ' + this.files[0].size / 1024 / 1024 + "MiB");
//   });

function addPara(text) {
  var p = document.createElement("p");
  p.textContent = text;
  main = document.getElementById("main");
  main.appendChild(p);
}

const { Storage } = require("@google-cloud/storage");
const path = require("path");

var modelLink = document.getElementById("modelLink");
var weightLink = document.getElementById("weightLink");

async function checkModelFile(fileName) {
  var strg = new Storage();
  let file = null;
  let ifExist = false;
  // while (!ifExist) {
  //   console.log("Checking if file exists");
  //   file = await strg.bucket("file-bucket93").file("model.json");
  //   ifExist = (await file.exists())[0]; // (await brackets)
  // }

  console.log("Checking if model file exists");
  file = await strg.bucket("file-bucket93").file(fileName);
  ifExist = (await file.exists())[0]; // (await brackets)
  // console.log("File exists");
  if (ifExist) {
    console.log("File exists");
    let link = "https://storage.googleapis.com/file-bucket93/" + fileName;
    modelLink.innerHTML = `<a href=${link} download>Download Model File</a>`;
    clearInterval(modelIntervalID);
    return;

    // const serviceKey = path.join(
    //   __dirname,
    //   "./intrepid-stock-411303-15174ccc4745.json"
    // );
    // const storageConf = { keyFilename: serviceKey };

    // const storage = new Storage(storageConf);

    // const downlaodOptions = {
    //   destination: __dirname + "/" + fileName,
    // };

    // try {
    //   let res = await storage
    //     .bucket("file-bucket93")
    //     .file(fileName)
    //     .download(downlaodOptions);
    //   console.log("Model file downloaded");
    //   clearInterval(modelIntervalID);
    //   return;
    // } catch (err) {
    //   console.log(err);
    // }
  } else {
    console.log("File does not exist yet");
  }
}

async function checkWeightFile(fileName) {
  var strg = new Storage();
  let file = null;
  let ifExist = false;
  // while (!ifExist) {
  //   console.log("Checking if file exists");
  //   file = await strg.bucket("file-bucket93").file("model.json");
  //   ifExist = (await file.exists())[0]; // (await brackets)
  // }

  console.log("Checking if weight file exists");
  file = await strg.bucket("file-bucket93").file(fileName);
  ifExist = (await file.exists())[0]; // (await brackets)
  // console.log("File exists");
  if (ifExist) {
    console.log("File exists");
    let link = "https://storage.googleapis.com/file-bucket93/" + fileName;
    weightLink.innerHTML = `<a href=${link} download>Download Weight File</a>`;
    clearInterval(weightIntervalID);
    return;

    // const serviceKey = path.join(
    //   __dirname,
    //   "./intrepid-stock-411303-15174ccc4745.json"
    // );
    // const storageConf = { keyFilename: serviceKey };

    // const storage = new Storage(storageConf);

    // const downlaodOptions = {
    //   destination: __dirname + "/" + fileName,
    // };

    // try {
    //   let res = await storage
    //     .bucket("file-bucket93")
    //     .file(fileName)
    //     .download(downlaodOptions);
    //   console.log("Weight file downloaded");
    //   clearInterval(weightIntervalID);
    //   return;
    // } catch (err) {
    //   console.log(err);
    // }
  } else {
    console.log("File does not exist yet");
  }
}

function checkModelandWeight() {
  modelIntervalID = setInterval(function () {
    checkModelFile("model.json");
  }, 5000);

  weightIntervalID = setInterval(function () {
    checkWeightFile("model.h5");
  }, 5000);

  // checkFile().catch(console.error);
  console.log("End of script");
}

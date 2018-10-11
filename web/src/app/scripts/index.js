
/// Import the page's CSS. Webpack will know what to do with it.
//  import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import TransferEther_artifacts from '../../build/contracts/TransferEther.json'
var TransferEther = contract(TransferEther_artifacts);
var accounts;
var account;

const App = {
    start: function () {
        // Bootstrap the contract abstraction for Use.
        TransferEther.setProvider(web3.currentProvider);
        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];
        });
    },

    setStatus: function (message) {
        var status = document.getElementById("status");
        status.innerHTML = message;
    },

    Transfer: function () {
        var Value = parseFloat(document.getElementById("value").value);
        var From = document.getElementById("From").value;
        var To = document.getElementById("To").value;
        var realVal = Value * Math.pow(10, 18)
        TransferEther.deployed().then(function (instance) {
            return instance.Transfer(To, { from: From, value: realVal })
        }).then(function (e) {
            var tx = e.tx;
            var gas = e.receipt.gasUsed;
            var status = e.receipt.status;
            document.getElementById("tx").value = tx;
            document.getElementById("gas").value = gas;
            document.getElementById("status").value = status;
            console.log(e);
        });
    },

    getBalance: function () {
        var AccountAddress = document.getElementById("user").value;
        TransferEther.deployed().then(function (instance) {
            return instance.getBalance(AccountAddress)
        }).then(function (e) {
            localStorage.setItem("payment", e);
            var Ether = localStorage.getItem("payment");
            document.getElementById("result").value = Ether * Math.pow(10, -18);
        });
    },

    fileUploadOnchange: function(){
        var stringLab = document.getElementById('fileLable');
        var file = document.getElementById('file-upload').files[0];
        App.fileUpload(file, function(hash){
            console.log("ipfs hash", hash); 
            document.getElementById('fileLable').innerHTML = hash; 
            console.log(account);
            TransferEther.deployed().then(function (instance) {
                instance.store(hash, {from: account});
            }).then(function (e) {
                console.log(e);
            })      
        });
    },

    fileUpload: function (file, callback) {
        console.log("file details ...", file);
        
        if (file == undefined) {
            callback("NA");
        }
        else {
            var reader = new FileReader();
            reader.onload = function (e) {
                const buffer = Buffer.from(e.target.result);
                var request = new XMLHttpRequest();
                request.open('POST', "http://" + location.hostname + "/ipfsgateway/ipfs/", true);
                //request.open('POST',"http://192.168.0.116:5001/ipfs", true);
                request.setRequestHeader("Content-type", "text/plain");
                request.send(buffer);
                request.onreadystatechange = function () {
                    if (request.readyState == this.HEADERS_RECEIVED) {
                        var fileHash = request.getResponseHeader("Ipfs-Hash");
                        callback(fileHash)
                    }
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
};

window.App = App;

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn(
            'Using web3 detected from external source.' +
            ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
            ' ensure you\'ve configured that source properly.' +
            ' If using MetaMask, see the following link.' +
            ' Feel free to delete this warning. :)' +
            ' http://truffleframework.com/tutorials/truffle-and-metamask'
        )
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider)
    } else {
        console.warn(
            'No web3 detected. Falling back to http://127.0.0.1:7545.' +
            ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
            ' Consider switching to Metamask for development.' +
            ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
        )
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://'+location.hostname+'/'+'jsonrpc'));
    }

    App.start()
})

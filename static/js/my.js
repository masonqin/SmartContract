

var dappAddress = "n1eeDdo8r76no5VDvhrocR3THBgCjmXZQs3";

var NebPay = require("nebpay");
var nebPay = new NebPay();

var nebulas = require("nebulas"),
    Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));

function getContract(){

    var from = Account.NewAccount().getAddressString()
    var value = "0"
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var callFunction = "getContract"
    var contractName = document.getElementById("contract_name_g").value

    var callArgs = "[" + "\"" + contractName + "\"" + "]"; 
    var contract = {
        "function": callFunction,
        "args": callArgs
    }

    neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (response) {
        console.log("response of get: " + response)
        document.getElementById("txResult_g").innerHTML = response.result
        var responseObj = JSON.parse(response.result)
        document.getElementById("contract_detail_g").innerHTML = responseObj.contractDetail
        document.getElementById("contract_author_g").innerHTML = responseObj.author
        document.getElementById("contract_signer_g").innerHTML = responseObj.signer
        document.getElementById("contract_signed_g").innerHTML = responseObj.signed

    }).catch(function (err) {
        console.log("error:" + err.message)
    })
}

function createContract(){

    var to = dappAddress;
    var value = "0";
    var callFunction = "createContract"

    var contractName = document.getElementById("contract_name_c").value;
    var contracDetail = document.getElementById("contract_detail_c").value;
    var contractPreSigner = document.getElementById("contract_presigner_c").value;
    var contractPassword = document.getElementById("contract_presignerpwd_c").value;

    var callArgs = "[" + "\"" + contractName + "\"," + "\"" + contracDetail + "\"," + "\"" + contractPreSigner + "\"," + "\"" + contractPassword + "\"" + "]"; 

    nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: createResult
    });
}

function createResult(response) {
    console.log("response of create: " + response)
    // document.getElementById("txResult_c").innerHTML = response.result
}

function signContract(){

    var to = dappAddress;
    var value = "0";
    var callFunction = "signContract"

    var contractName = document.getElementById("contract_name_s").value;
    var contractPreSigner = document.getElementById("contract_presigner_s").value;
    var contractPassword = document.getElementById("contract_presignerpwd_s").value;

    var callArgs = "[" + "\"" + contractName + "\"," + "\"" + contractPreSigner + "\"," + "\"" + contractPassword + "\"" + "]"; 

    nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: createResult
    });
}

function signResult(response) {
    console.log("response of sign: " + response)
    // document.getElementById("txResult_s").innerHTML = response.result
}

$("#tabs a").click(function (e) {
    e.preventDefault();
    $("#tabs li").removeClass("ccc");
    $(this).parent().addClass("ccc");
    $("#content div").removeClass("show");
    $("#" + $(this).attr("title")).addClass("show");
    $(this).addClass("current");
});

$("#tabs a").hover(function () {
    if (!$(this).parent().hasClass("current")) {
        $(this).parent().addClass("hoverItem");
    }
}, function () {
    $(this).parent().removeClass("hoverItem");
});

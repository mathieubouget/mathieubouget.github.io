contractaddress = '0x0b67e7c9f5d64d6290f7fe2173e9b5b7091d1bdd';

function startContract(contract){
    $("#setSanctionné").on("click",function(){
        var sanctionne = $("#sanctionné").val();
        contract.methods.setSanctionne (sanctionne).send( {from: ethereum.selectedAddress}).then( function(tx) {
            console.log("Sanction : ", tx);
        });
    });
    $("#startsanction").on("click",function(){
        contract.methods.sanction ().call( {from: ethereum.selectedAddress}).then( function(tx) {
            alert(tx);
        });
    });
}
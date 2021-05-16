//contractaddress = '0x4026B973005D0AE850d822A456510A3218517100';
function startContract(contract){

    $("#affiche").on("click",function(){
        $("#imagepixel").text("");
        showNextPixel(0);
    });

    function showNextPixel(i){
        contract.methods.getPixel (i).call( {from: ethereum.selectedAddress}).then( function(tx) {
            if(i%10 === 0 && i !== 0) {
                $("#imagepixel").append('<div style="width: 30px; height: 30px;"></div></div><div style="width: 30px; height: 30px;' +
                    'float: left; background-color: rgb(' +
                    tx.red + ',' + tx.green + ',' + tx.blue + ');>"' + i + '</div>');
            } else {
                $("#imagepixel").append('<div style="width: 30px; height: 30px;float: left;background-color: rgb(' +
                    tx.red+','+tx.green+','+tx.blue+');>"'+i+'</div>');
            }
            if(i<99){
                showNextPixel(i+1);
            }
        });
    }
    String.prototype.convertToRGB = function(){
        if(this.length != 6){
            throw "Only six-digit hex colors are allowed.";
        }

        var aRgbHex = this.match(/.{1,2}/g);
        var aRgb = [
            parseInt(aRgbHex[0], 16),
            parseInt(aRgbHex[1], 16),
            parseInt(aRgbHex[2], 16)
        ];
        return aRgb;
    }
    $("#buyPixel").on("click",function(){
        var newprice = $("#newprice").val();
        var id = $("#idx").val() + $("#idy").val();
        var value = $("#value").val();
        contract.methods.buyPixel (id, newprice).send( {from: ethereum.selectedAddress, value: value}).then( function(tx) {
            console.log(tx);
        });
    });
    $("#colorbutton").on("click",function(){
        var color = $("#colorfield").val();
        var rgb = (color.substr(1)).convertToRGB();
        var red = rgb[0];
        var green = rgb[1];
        var blue = rgb[2];
        var id = $("#idx").val() + $("#idy").val();

        contract.methods.setPixelColor (id, red, green, blue).send( {from: ethereum.selectedAddress}).then( function(tx) {
            console.log(tx);
        });
    });
    $("#getPixel").on("click",function(){
            var id = $("#idx").val() + $("#idy").val();
            console.log(id);
            contract.methods.pixels (id).call( {from: ethereum.selectedAddress}).then( function(tx) {
                console.log(tx);
                if(tx.price == 0) tx.price = 1;
                $("#pixelstatus").text("le pixel appartient à "+tx.owner+", il est au prix de "+tx.price+" wei," +
                    "la couleur est rouge: "+tx.red+", vert: "
                    +tx.green+", bleue: "+tx.blue+".");
            });
    });
}
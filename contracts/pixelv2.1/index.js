function startContract(contract){
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
    $("#buyRectangle").on("click",function(){
        var value = $("#value").val();
        var Rect3 = [
            $("#id").val(),
            $("#x0").val(),
            $("#y0").val(),
            $("#x1").val(),
            $("#y1").val()
        ];
        var Rect4 = [
            $("#newprice").val(),
            $("#x0").val(),
            $("#y0").val(),
            $("#x1").val(),
            $("#y1").val()
        ];
        contract.methods.buyRect ([Rect3],Rect4)
        .send( {from: ethereum.selectedAddress, value: value}).then( function(tx) {
            console.log(tx);
        });
    });

    $("#getVente").on("click",function(){
            contract.methods.rectStack ($("#id").val()).call( {from: ethereum.selectedAddress}).then( function(tx) {
                console.log(tx);
                if(tx.price == 0) tx.price = 1;
                $("#pixelstatus").text("la vente appartient à "+tx.owner+", elle est au prix de "+tx.price+" wei," +
                    "ses coordonnées sont : "+tx.x0+","+tx.y0+","+tx.x1+","+tx.y1+".");
            });
            contract.methods.children ($("#id").val(),$("#numenfant").val()).call( {from: ethereum.selectedAddress}).then( function(tx) {
                console.log(tx);
            });
    });

    $("#affiche").on("click",function(){
        $("#imagepixel").html("");
        contract.methods.colorindex ().call( {from: ethereum.selectedAddress}).then( function(rs) {
            showNextRect(0,rs);
            console.log(rs);
        });
    });

    function showNextRect(i,rs){
        contract.methods.colorStack (i).call( {from: ethereum.selectedAddress}).then( function(tx) {
            if(i < rs) {
                $("#imagepixel").append('<rect x="'+tx.x0+'" y="'+tx.y0+'" width="'+(tx.x1-tx.x0-(-1))+'" height="'+(tx.y1-tx.y0-(-1))+
                    '" fill="rgb('+tx.red+','+tx.green+','+tx.blue+')" />');
                // le -(-1) c'est parce que sinon javascript considère ça comme une chaîne de caractère avec le +
                console.log(tx);
                $("#cont").html($("#cont").html()); 
                showNextRect(i+1,rs);
            }
        });
    }

    $("#colorize").on("click",function(){
        var rgb = ($("#col").val().substr(1)).convertToRGB();
        var Rect2 = [
                rgb[0],
                rgb[1],
                rgb[2],
                $("#x0").val(),
                $("#y0").val(),
                $("#x1").val(),
                $("#y1").val()
        ];
        contract.methods.colorize ([Rect2], $("#id").val())
        .send( {from: ethereum.selectedAddress}).then( function(tx) {
            console.log(tx);
        });
    });
}
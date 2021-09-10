
window.addEventListener('load', function() {
    document.body.innerHTML += `<canvas id='fingerprint' style="display:none;" width='200' height='40' style='border:1px solid #000000;'></canvas>`;   

    var canvas = document.getElementById("fingerprint");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.rect(10, 20, 150, 100);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.arc(20, 20, 20, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();   
    ctx.closePath();

    // copied from fingerprint.js code to render text to canvas
    // which will be used as part of the hash.
    txt = 'abz190#$%^@£éú';
    ctx.textBaseline = "top";
    ctx.font = '17px "Arial 17"';
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "rgb(255,5,5)";
    ctx.rotate(.03);
    ctx.fillText(txt, 4, 17);
    ctx.fillStyle = "rgb(155,255,5)";
    ctx.shadowBlur=8;
    ctx.shadowColor="red";
    ctx.fillRect(20,12,100,5);

    // simple hashing function suggested by fingerprint.js
    src = canvas.toDataURL();
    hash = 0;

    for (i = 0; i < src.length; i++) {
	    char = src.charCodeAt(i);
	    hash = ((hash<<5)-hash)+char;
	    hash = hash & hash;
    }

    var fingerprint = hash;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               console.log("ExileJS: Fingerprinted and user not banned.")
           }
           else if (xmlhttp.status == 403) {
              console.log("ExileJS: Fingerprint is blacklisted")
              document.write("Your browser has been blacklisted from this game. If you think this may be a mistake, please contact the domain Admin.");
           }
           
        }
    }

        xmlhttp.open("POST", "/exile", true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send("fingerprint="+fingerprint);

});

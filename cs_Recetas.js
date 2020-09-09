/**
* Client Function to call Suitelet
*/
function callSuitelet() {
    var id = nlapiGetRecordId();
    var inRecord = nlapiLoadRecord('supportcase', id);
    var medResp = inRecord.getFieldValue('custevent202') || null;
    var tipoReceta = inRecord.getFieldValue('custevent203') || null;

    if (medResp != null && tipoReceta != null) {
        nlapiLogExecution('DEBUG', 'CS| Value id on client script: ', 'value id: ' + id);
        //Pass Purchase Order Id (paramname = poid)
        var urlOpen = nlapiResolveURL('SUITELET', 'customscript894', 'customdeploy1') + '&poid=' + id;
        window.open(urlOpen, '_blank');
        return true;
    } else {
        console.log('Filtro Recetas' + id);
        alert('No se ha registrado el campo Médico responsable de Receta o el campo tipo de Receta!!');
    }
}
function callSuiteletM() {
    var id = nlapiGetRecordId();
    var inRecord = nlapiLoadRecord('supportcase', id);
    var medResp = inRecord.getFieldValue('custevent202') || null;
    var tipoReceta = inRecord.getFieldValue('custevent203') || null;

    if (medResp != null && tipoReceta != null) {
        nlapiLogExecution('DEBUG', 'CS| Value id on client script: ', 'value id: ' + id);
        //Pass Purchase Order Id (paramname = poid)
        var urlOpen = nlapiResolveURL('SUITELET', 'customscript1023', 'customdeploy1') + '&poid=' + id;
        window.open(urlOpen, '_blank');
        return true;
    } else {
        console.log('Filtro Recetas' + id);
        alert('No se ha registrado el campo Médico responsable de Receta o el campo tipo de Receta!!');
    }

}
function callSuiteletD() {
    //var canv = document.getElementById("sig-canvas2");
    // '<canvas id="sig-canvas2" width="325" height="490" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>'+

    var imgDat = null;
    var id = nlapiGetRecordId();
    var caseRec = nlapiLoadRecord("SUPPORTCASE", id);
    //var casenumberVal = caseRec.getFieldValue("casenumber");
    //var imgName = id + "_" + casenumberVal + "_ImagenZonasCabeza.png";
    var imgCabezaYPintura_Base64 = caseRec.getFieldValue("custevent511");
    if (imgCabezaYPintura_Base64 == null || imgCabezaYPintura_Base64 == "") {
        var urlPintura = caseRec.getFieldValue("custevent512");
        if (urlPintura != null && urlPintura != "") {
            var canv = document.createElement("CANVAS");
            canv.width = "325";
            canv.height = "490";
            var ctx = canv.getContext("2d");
            var imageObj1 = new Image();
            var imageObj2 = new Image();
            imageObj1.src = "https://3559763.app.netsuite.com/core/media/media.nl?id=2339447&c=3559763&h=ca9d3ce929846103685e" // cabeza
            imageObj1.onload = function () {
                ctx.drawImage(imageObj1, 0, 0); //ctx.drawImage(imageObj1, 0, 0, 328, 526);
                imageObj2.src = urlPintura;
                imageObj2.onload = function () {
                    ctx.drawImage(imageObj2, 0, 0); //ctx.drawImage(imageObj2, 15, 85, 300, 300);
                    imgDat = canv.toDataURL("image/png");
                    console.log('imgDat: ' + imgDat);
                    caseRec.setFieldValue('custevent511', imgDat);
                    nlapiSubmitRecord(caseRec);
                    //document.write('<img src="' + imgDat + '"> </img>');
                }
            };
        }
    }

    /*var img1 = salesRepRec.getFieldValue("custevent313");
    var file_image1 = nlapiLoadFile(img1);
            var image_url1 = file_image1.getValue();
  alert(image_url1);*/

    //nlapiLogExecution('DEBUG', 'img1', 'value img1: ' + img1);
    /*var record = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
var img_Valoracion2 = record.getFieldValue('custevent313');
console.log('img_Valoracion2: ' + img_Valoracion2);
    var img_Valoracion3 = record.getFieldValue('custevent315');
    var img_Valoracion4 = record.getFieldValue('custevent316');*/

    //Pass Purchase Order Id (paramname = poid)
    //window.location = nlapiResolveURL('SUITELET', 'customscript1024', 'customdeploy1')+'&poid='+id;
    var urlOpen = nlapiResolveURL('SUITELET', 'customscript1024', 'customdeploy1') + '&poid=' + id;
    window.open(urlOpen, '_blank');
    return true;
}

function callSuiteletEXH() {
    var id = nlapiGetRecordId();
    nlapiLogExecution('DEBUG', 'CS| Value id on client script: ', 'value id: ' + id);
    //Pass Purchase Order Id (paramname = poid)
    var urlOpen = nlapiResolveURL('SUITELET', 'customscript1046', 'customdeploy1') + '&poid=' + id;
    window.open(urlOpen, '_blank');
    return true;
}
function callSuiteletCon() {
    var id = nlapiGetRecordId();
    nlapiLogExecution('DEBUG', 'CS| Value id on client script: ', 'value id: ' + id);
    //Pass Purchase Order Id (paramname = poid)
    var urlOpen = nlapiResolveURL('SUITELET', 'customscript1047', 'customdeploy1') + '&poid=' + id;
    window.open(urlOpen, '_blank');
    return true;
}
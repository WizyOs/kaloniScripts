/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record','N/log','N/render','N/xml'],

function(record,log,render,xmlMod) {

    function onRequest(context) {
      //log.debug('method: ', context.request.method);
      var recId = context.request.parameters.recordCaseId;
      var caso = record.load({type: 'transferorder', id: recId});
	  var sucursal = caso.getValue({fieldId: 'transferlocation'});
      var emp = caso.getText({fieldId: 'employee'});
       var mergeRecord = record.load({
            type: 'location',
            id: sucursal,
            isDynamic: true
            });
           var address = mergeRecord.getText({
             fieldId: "mainaddress_text"
           });
      var subsidiaryText = caso.getValue({fieldId: 'subsidiary'});
      var fecha = caso.getText({fieldId: 'trandate'});
      var Npedido = caso.getText({fieldId: 'tranid'});
      var guia = caso.getText({fieldId: 'memo'});
      var imageBack = getImageBackGround(sucursal);

                var itemDetailsObj = new Object();
                var numLines = caso.getLineCount({
                    sublistId : 'item'
                }); // to get sublist line number
      log.debug('total: ', numLines);


      //caso.save();
      var fecha = new Date();
    fecha = fecha.getDate() + "/" + (fecha.getMonth() +1) + "/" + fecha.getFullYear();

      var avisoMexico = "<p style=\"font-family:'Aria', sans-serif\" font-size=\"20px\" align=\"left\"><b>ORDEN DE TRANSLADO</b></p>";
      avisoMexico += '<p style="width:25%;color:#000000;sans-serif;align:left">Kaloni Holding Group SC<br />Av. Vasco de Quiroga 3900 Torre B Piso 4<br />Col. Lomas de Santa Fe<br />México DF 053000<br />México</p>';
      avisoMexico += '<p style="width:25%;color:#000000;sans-serif;align:right"><b>Fecha:</b> '+fecha+'<br /><b>N. de Pedido:</b> '+Npedido+'<br /><b>Nota:</b> '+guia+'<br /><b>Empleado:</b> '+emp+'</p>';
      avisoMexico += '<p style="width:25%;color:#000000;sans-serif;align:left"><b>Envío a:</b><br />'+address+'</p>';
      avisoMexico += "<table style=\"width:100%;font-size:11px; font-family:'Aria', sans-serif\">";
      avisoMexico += '<tr><td color=\"#FFFFFF\" background-color=\"#346094\"><b>ARTÍCULO</b></td><td color=\"#FFFFFF\" background-color=\"#346094\"><b>CANTIDAD</b></td><td color=\"#FFFFFF\" background-color=\"#346094\"><b>UNIDAD</b></td></tr>';
      if (numLines > 0) {
                    for (var i = 0; i < numLines; i++) {
                        itemDetailsObj.item = caso.getSublistText({
                            sublistId : 'item',
                            fieldId : 'item',
                            line : i
                        });
                        itemDetailsObj.amount = caso.getSublistValue({
                            sublistId : 'item',
                            fieldId : 'amount',
                            line : i
                        });
                      itemDetailsObj.idArt = caso.getSublistValue({
                            sublistId : 'item',
                            fieldId : 'item',
                            line : i
                        });
                      var articulo = record.load({type: 'inventoryitem', id: itemDetailsObj["idArt"]});
                      var unity = articulo.getText({fieldId: 'saleunit'});

                        itemDetailsObj.quantity = caso.getSublistValue({
                            sublistId : 'item',
                            fieldId : 'quantity',
                            line : i
                        });
                      itemDetailsObj.description = caso.getSublistValue({
                            sublistId : 'item',
                            fieldId : 'description',
                            line : i
                        });
                  avisoMexico += '<tr><td><b>'+itemDetailsObj["item"]+'</b></td><td><b>'+itemDetailsObj["quantity"]+'</b></td><td><b>'+unity+'</b></td></tr>';
                    }
                }
      avisoMexico += '</table>';



      var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
      xml += '<pdf>\n';
      xml += '<body background-image="'+xmlMod.escape({xmlText : imageBack})+'" >';

      if(subsidiaryText == "Mexico"){
        xml += avisoMexico;
      }else{
        xml += avisoMexico;
      }


      xml += '</body></pdf>';
      context.response.renderPdf({xmlString: xml});
    }

    function getImageBackGround(sucursal){
      var imageBack = "";
      if(sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28")
      {
         imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
      }
      else
      {
        if(sucursal == "22") // Altavista KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
        if(sucursal == "35") // Can-Cun KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
        if(sucursal == "36") // Chihuahua KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
        if(sucursal == "23") // Guadalajara KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
        if(sucursal == "24") // Monterrey KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
        if(sucursal == "25") // Polanco KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
        if(sucursal == "37") // Puebla KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
        if(sucursal == "21") // Santa FE KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
        if(sucursal == "26") // Satelite KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
        if(sucursal == "27") // Tijuana KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
        if(sucursal == "28") // Veracruz KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
         //imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
      }
      return imageBack;
    }



    return {
        onRequest: onRequest
    };

});

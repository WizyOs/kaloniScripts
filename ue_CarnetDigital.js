	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
	*/
define(['N/record','N/render','N/xml', 'N/file', 'N/email', 'N/url', 'N/https',"N/encode"], function(record,render,xmlMod,file,email,url,https,encode) {

    function afterSubmit(context) {
        log.debug('DEBUG', 'Running afterSubmit');
        var currentRecord = context.newRecord;
        var prefijo = currentRecord.getValue({fieldId: 'custevent70'});

        // Condition that will run the codes only on Creation.
        if((prefijo == "12") && (context.type == 'create'))
        {
          	var companyId = currentRecord.getValue({fieldId: 'company'});
            var cliente = record.load({type: 'customer', id: companyId});
            var subsidiary = cliente.getValue({fieldId: 'subsidiary'});
            if(subsidiary == "6")
            {
			  var numExpediente = cliente.getValue({fieldId: 'entityid'});
              var emaildir = cliente.getValue({fieldId: 'email'});
              var altname = cliente.getValue({fieldId: 'altname'});
              var phone = cliente.getValue({fieldId: 'phone'});

              var eventid = currentRecord.id;
              var eventRec = record.load({type: 'CalendarEvent', id: eventid});
              var sucursalText = eventRec.getText({fieldId: 'custevent2'});

              var sucursal = currentRecord.getValue({fieldId: 'custevent2'});
              var imageBack = getImageBackGround(sucursal);
              var sucursalLocation = getSucursalLocation(sucursal);
              var sucursalPhone = getSucursalPhone(sucursal);

              /*var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
              xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
              xml += '<pdf>\n';
              xml += '<body background-image="'+xmlMod.escape({xmlText : imageBack})+'" >';

              xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p style="width:35%;background-color:#346094;color:#FFFFFF;font-family:Aria, sans-serif;align:center">CARNET DIGITAL</p>';*/
              var imgKaloni = "https://soportekaloni.com/consentimiento/kaloni.png";
              var imgUser = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2220323&c=3559763&h=a8ffbbfec4de87a0a110&fcts=20190708155408&whence=';
              var base64Encoded = encode.convert({string: companyId, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
              var calif = 'https://efactory-kaloni.com/survey_kaloni/index.php?id=' + base64Encoded;

              /*var xml = '<table style="width:100%;font-size:14px;font-family:Aria,sans-serif;">';
              xml += '<tr>';
              xml += '<td colspan="2" align="center"><img src="'+xmlMod.escape({xmlText : imgKaloni})+'" width="200" height="50" /></td>';
              xml += '</tr>';
              xml += '<tr>';
              xml += '<td rowspan="5" width="150"><img src="'+xmlMod.escape({xmlText : imgUser})+'" width="100" height="100" /></td>';
              xml += '<td><b>Nombre del cliente:</b> '+altname+'</td>';
              xml += '</tr>';
              xml += '<tr>';
              xml += '<td><b>Número de expediente:</b> '+numExpediente+'</td>';
              xml += '</tr>';
              xml += '<tr>';
              xml += '<td><b>Email:</b> '+emaildir+'</td>';
              xml += '</tr>';
              xml += '<tr>';
              xml += '<td><b>Teléfono:</b> '+phone+'</td>';
              xml += '</tr>';
              xml += '<tr>';
              xml += '<td><b>Sucursal:</b> '+sucursalText+'</td>';
              xml += '</tr>';
              xml += '</table>';*/
              

var xml = '<table style=" border-radius: 10% !important; width:100%;font-size:14px;font-family:Aria,sans-serif ; max-width: 400px;border-collapse:collapse;">'+
'        <tbody style="-webkit-box-shadow: 5px 5px 5px 3px rgba(0,0,0,0.44);'+
'        -moz-box-shadow: 5px 5px 5px 3px rgba(0,0,0,0.44);'+
'        box-shadow: 5px 5px 5px 3px rgba(0,0,0,0.44);   border-radius:10px; margin-bottom: 10px; ">'+
'            <tr style=" margin-bottom: 40px !important;">'+
'                <td colspan="2" align="right" style=" margin-top:10px !important; margin-bottom: 40px !important;">'+
'                    <img src="'+xmlMod.escape({xmlText : imgKaloni})+'" width="200" height="50" class="CToWUd" />'+
'                    <hr style="max-width: 80%; margin-left:auto;margin-right:auto">'+
'                </td>'+
'            </tr>'+
'            <tr style="margin-top:20px !important; background-size: contain;min-height: 150px !important;">'+
'                <td rowspan="5" style="min-height: 100px !important">'+
'                    <img src="'+xmlMod.escape({xmlText : imgUser})+'"'+
'                        width="80" height="80" class="CToWUd" style="'+
'                        border-radius: 100%;'+
'                        -webkit-box-shadow: -3px -3px 3px 3px rgba(0,0,0,0.44);'+
'                        -moz-box-shadow: -3px -3px 3px 3px rgba(0,0,0,0.44);'+
'                        box-shadow: -3px -3px 3px 3px rgba(0,0,0,0.44); margin-left: 25px !important;'+
'                        " />'+
'                </td>'+
'                <td><b>Nombre del cliente:</b> '+altname+'</td>'+
'            </tr>'+
'            <tr>'+
'                <td><b>Número de expediente:</b> '+numExpediente+'</td>'+
'            </tr>'+
'            <tr>'+
'                <td>'+
'                    <b>Email:</b>'+
'                    <a href="mailto:'+emaildir+'" target="_blank">'+emaildir+'</a>'+
'          </td>'+
'        </tr>'+
'        <tr>'+
'          <td><b>Teléfono:</b> '+phone+'</td>'+
'        </tr>'+
'        <tr>'+
'          <td><b>Sucursal:</b> '+sucursalText+'</td>'+
'        </tr>'+
'      </tbody>'+
'    </table>';
              

              xml += '<a href="https://kaloni.mx/" target="_blank"><img src="https://efactory-kaloni.com/SENDWA/images/web.png" width="30px" height="30px"></a>&nbsp;&nbsp;&nbsp;';
              xml += '<a href="'+sucursalLocation+'" target="_blank"><img src="https://efactory-kaloni.com/SENDWA/images/location.png" width="30px" height="30px"></a>&nbsp;&nbsp;&nbsp;';
              xml += '<img src="https://efactory-kaloni.com/SENDWA/images/phone.png" width="30px" height="30px">&nbsp;&nbsp;<label style="color: black;font-size:large;"><b>'+sucursalPhone+'</b></label>';
              /*xml += '<br/> <br/> <br/> <a style="text-decoration: none;padding: 10px;font-weight:400;font-size: 15px;color: #ffffff;background-color: #1883ba;border-radius: 6px;border: 2px solid #0016b0;" href="'+calif+'">Califica nuestro servicio!...</a>';*/

              /*xml += '</body></pdf>';

              var pdfFile = render.xmlToPdf({xmlString: xml});
              pdfFile.name = numExpediente + '_Carnet Digital.pdf';
              pdfFile.folder = -4;
              var idfile = pdfFile.save();

              var fileObj = file.load({id: idfile});*/

              var mail = email.send({
                 author: 198528, // -5 author
                 recipients: ['acolin@kaloni.com'], // recipient ,'afigueroa@kaloni.com'
                 subject: 'Carnet Digital',
                 body: xml
                 //attachments: [fileObj]
              });
            }
        }
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
      }
      return imageBack;
    }

    function getSucursalLocation(sucursal){
          var sucLocation = "";
          if(sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28")
          {
             sucLocation = "https://goo.gl/maps/i9b3yuVXEuGsJYZ5A";
          }
          else
          {
            if(sucursal == "22") // Altavista KHG
              sucLocation = "https://goo.gl/maps/3TDm4uRvT1sDDzTt6";
            if(sucursal == "35") // Can-Cun KHG
              sucLocation = "https://goo.gl/maps/3L72dfsxfeJsopAx5";
            if(sucursal == "36") // Chihuahua KHG
              sucLocation = "https://goo.gl/maps/iYX39bktRJ9FixyC6";
            if(sucursal == "23") // Guadalajara KHG
              sucLocation = "https://goo.gl/maps/YPSuwkmXGiUmDoDL6";
            if(sucursal == "24") // Monterrey KHG
              sucLocation = "https://goo.gl/maps/jbDMARYyCDw7MXES8";
            if(sucursal == "25") // Polanco KHG
              sucLocation = "https://goo.gl/maps/B8aW1QZkhyfH3jvx9";
            if(sucursal == "37") // Puebla KHG
              sucLocation = "https://goo.gl/maps/D31VuS9Ff4C3Zexh7";
            if(sucursal == "21") // Santa FE KHG
              sucLocation = "https://goo.gl/maps/i9b3yuVXEuGsJYZ5A";
            if(sucursal == "26") // Satelite KHG
              sucLocation = "https://goo.gl/maps/z9zef2WBNiKQLm3KA";
            if(sucursal == "27") // Tijuana KHG
              sucLocation = "https://goo.gl/maps/RmzbmHSd6z8CKcTc8";
            if(sucursal == "28") // Veracruz KHG
              sucLocation = "https://goo.gl/maps/ep3aag6Hjaa6Gvux5";
          }
          return sucLocation;
        }

    function getSucursalPhone(sucursal)
  	{
         var phone = "";
         if(sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28")
         {
             phone = "5022 – 1056";
         }
         else
         {
            if(sucursal == "22") // Altavista KHG
               phone = "01 (55) 5550 – 3001";
            if(sucursal == "35") // Can-Cun KHG
               phone = "01 (998) 5002-030";
            if(sucursal == "36") // Chihuahua KHG
               phone = "(01) 614 42 55 363";
            if(sucursal == "23") // Guadalajara KHG
               phone = "01 (33) 1493 – 0650";
            if(sucursal == "24") // Monterrey KHG
               phone = "01 (81) 1454 – 0256";
            if(sucursal == "25") // Polanco KHG
               phone = "01 (55) 5203 – 8052";
            if(sucursal == "37") // Puebla KHG
               phone = "01 (22) 2379 – 0130";
            if(sucursal == "21") // Santa FE KHG
               phone = "5022 – 1056";
            if(sucursal == "26") // Satelite KHG
               phone = "01 (55) 5393 – 8215";
            if(sucursal == "27") // Tijuana KHG
               phone = "01 (664) 634 – 7064";
            if(sucursal == "28") // Veracruz KHG
               phone = "01 (22) 9273 – 1400";
         }
         return phone;
   }

    return {
        afterSubmit: afterSubmit
    }
});
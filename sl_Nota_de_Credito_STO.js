/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/email', 'N/file', 'N/log', 'N/redirect', 'N/render','N/https'], // 'N/record', 'N/render', 'N/xml', 'N/runtime', 'N/config'
function(record, email, file, log, redirect, render,https){

    function onRequest(context)
    {
    	try
        {
            var creditMemoId = context.request.parameters.creditMemoId;
          log.debug('creditMemoId: ', creditMemoId);
			if(creditMemoId != "" && creditMemoId != null)
            {
 			  var creditmemo = record.load({type:'creditmemo', id:creditMemoId, isDynamic:true});
              var tranid = creditmemo.getValue({fieldId: 'tranid'});
              var location = creditmemo.getValue({fieldId: 'location'});
              var locationText = creditmemo.getText({fieldId: 'location'});
              var subtotalField = creditmemo.getValue({fieldId: 'subtotal'});
              log.debug('subtotalField: ', subtotalField);
              var discounttotalField = creditmemo.getValue({fieldId: 'discounttotal'});
              log.debug('discounttotalField: ', discounttotalField);
              var taxtotalField = creditmemo.getValue({fieldId: 'taxtotal'});
              log.debug('taxtotalField: ', taxtotalField);
              var totalField = creditmemo.getValue({fieldId: 'total'});
              log.debug('totalField: ', totalField);

              var ncf_Modificado = creditmemo.getValue({fieldId: 'custbody157'}); // NCF MODIFICADO:
              var rnc_Cliente = creditmemo.getValue({fieldId: 'custbody158'}); // RNC CLIENTE:
              var nombre_o_RZ_cliente = creditmemo.getValue({fieldId: 'custbody160'}); // NOMBRE O RAZÓN SOCIAL CLIENTE:
              log.debug('ncf_Modificado: ', ncf_Modificado);
              log.debug('rnc_Cliente: ', rnc_Cliente);
              log.debug('nombre_o_RZ_cliente: ', nombre_o_RZ_cliente);
              var fecha = "";
              var xmlrequest = '<?xml version="1.0" encoding="UTF-8"?>';
              xmlrequest += '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="urn:miserviciowsdl" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
              xmlrequest += '	<SOAP-ENV:Body>';
              xmlrequest += '		<ns1:getDateNow>';
              xmlrequest += '			<miparametro xsi:type="xsd:string">America/Santo_Domingo</miparametro>'; // America/Mexico_City | America/Santo_Domingo
              xmlrequest += '		</ns1:getDateNow>';
              xmlrequest += '	</SOAP-ENV:Body>';
              xmlrequest += '</SOAP-ENV:Envelope>';





              
              //Set up Headers
              var headers = {};
              headers['User-Agent-x'] = 'SuiteScript-Call';
              headers['Content-Type'] = 'text/xml; charset=utf-8';
              headers['Content-Length']= 'length';
              headers['SOAPAction'] = 'https://efactory-kaloni.com/SENDWA/WebServiceSOAP/dateNow.php/getDateNow';
              var url2 = 'https://efactory-kaloni.com:443/SENDWA/WebServiceSOAP/dateNow.php';
              var cont = https.post({url: url2, headers: headers, body: xmlrequest});
              log.debug('msg code', cont.code); log.debug('msg body', cont.body);
              if(cont.code == "200")
              {
                 var position = cont.body.indexOf('xsd:string">');
                 if(position >= 0)
                 {
                    fecha = cont.body.substring(position + 12, position + 31);
                    log.debug('fecha: ', fecha);
                    var fechaSplit = fecha.split(' ');
                    fecha = fechaSplit[0];
                    log.debug('fecha: ', fecha);
                 }
              }
       		  var regex = new RegExp("/", "g");
              fecha = fecha.replace(regex, '-');
       		  log.debug('fecha2: ', fecha);
              
              var fileObj = file.load({id:'EXP_STO/Nota_de_Crédito/folios_nota_de_crédito.txt'});
              var fileOrigen = {id:fileObj.id, name:fileObj.name, folder:fileObj.folder, fileType:fileObj.fileType, contents:fileObj.getContents()};
			  var folios = fileObj.getContents().split(',');
              var ncf = "";
              var cont_folios = 0;

              for(var b = 0; b < folios.length; b++)
              {
                 var resArr = folios[b].substring(folios[b].length - 3, folios[b].length);
                 if(resArr != "|ok" && ncf == ""){ncf = folios[b];} //break;
                 if(resArr != "|ok"){cont_folios++}
              }
              log.debug('cont_folios: ', cont_folios);

              if(cont_folios <= 5){
                email.send({author:198528, recipients:['acolin@kaloni.com'], subject:"Notas de Crédito STO DO", body:"Solo hay "+cont_folios+" folios disponibles, debes tramitar nuevos folios!!"});
              }
              log.debug('ncf: ', ncf);

              if(ncf != "" && ncf != null && fecha.indexOf('202') >= 0)
              {
				var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body>';
              	xml += "<table style=\"width:100%;\"><tr><td background-color=\"#5DDCD0\"><br/> <br/></td></tr></table>";
      			xml += '<p></p><p></p><p></p>';
           		xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
                xml += '<tr><td align="left" color="black" font-size="20px"><b>KALONI HAIR SRL</b></td> <td align="right" color="black" font-size="25px"><b>Nota de Crédito</b></td></tr>';
                xml += '<tr><td align="left" color="black"><b>Sucursal '+locationText+'</b></td> <td align="right"><b>NCF: '+ncf+'</b></td></tr>';
                /*xml += '<tr><td align=\"left\" color=\"black\"><b>Dirección: Ave. lope de vega Esquina Rafael <br /> Augusto Sanchez #28 Piantini</b></td> <td></td></tr>';
                xml += '<tr><td align=\"left\" color=\"black\"><b>Teléfono: 809-683-6641</b></td> <td> </td></tr>';*/
                xml += '<tr><td align="left" color="black"><b>RNC: 131737315</b></td> <td align="right" color="red"><b>NCF modificado: '+ncf_Modificado+'</b></td></tr>';
                xml += '<tr><td align="left" color="black"><b>FECHA: '+fecha+'</b></td></tr></table>';

              	xml += '<p></p><p></p>';
      			xml += "<table style=\"width:100%;\"><tr><td color=\"#5DDCD0\">_________________________________________________________________________________________</td></tr></table>";

           		xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td color=\"black\"><b>RNC CLIENTE: '+rnc_Cliente+' <br/> NOMBRE O RAZÓN SOCIAL: '+nombre_o_RZ_cliente+' </b></td></tr></table>';

      			xml += "<table style=\"width:100%;\"><tr><td color=\"#5DDCD0\">_________________________________________________________________________________________</td></tr></table>";
           		xml += '<p></p>';

              	xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" color=\"#FFFFFF\" background-color=\"#5DDCD0\"><b>CANT.</b></td>';
      			xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#5DDCD0\"><b>DESCRIPCION</b></td>';
      			xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#5DDCD0\"><b>ITBIS</b></td>';
      			xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#5DDCD0\"><b>VALOR</b></td></tr>';

                var item_Lines = creditmemo.getLineCount({sublistId : 'item'});

                if(item_Lines > 0)
                {
                  for(var i = 0; i < item_Lines; i++)
                  {
                    /*var valor_codigo = invoice.getSublistValue({sublistId:'item', fieldId:'item', line:i}); // codigo item
                    var valor_units_display = invoice.getSublistValue({sublistId:'item', fieldId:'units_display', line:i}); // unidades
                    var valor_taxrate1 = invoice.getSublistValue({sublistId:'item', fieldId:'taxrate1', line:i}); // porcentaje impuesto aplicado
                    var valor_itemtype = invoice.getSublistValue({sublistId:'item', fieldId:'itemtype', line:i}); // itemtype
                    var valor_amount = invoice.getSublistValue({sublistId:'item', fieldId:'amount', line:i}); // precio total item (precio unitario item * cantidad)
                    if(valor_amount == null || valor_amount == ""){valor_amount = (valor_rate * valor_quantity);}*/
                    var valor_quantity = creditmemo.getSublistValue({sublistId:'item', fieldId:'quantity', line:i}); // cantidad
                    if(valor_quantity == null || valor_quantity == ""){valor_quantity = 1;}
                    //if(valor_quantity != "" && valor_quantity != null){log.debug('valor_quantity: ', valor_quantity);}

                    var valor_rate = creditmemo.getSublistValue({sublistId:'item', fieldId:'rate', line:i}); // precio unitario item
                    //if(parseFloat(valor_rate) > 0){log.debug('valor_rate: ', parseFloat(valor_rate));}
                    //log.debug('isNaN(parseFloat(valor_rate)): ', isNaN(parseFloat(valor_rate)));

                    var valor_description = creditmemo.getSublistText({sublistId:'item', fieldId:'description', line:i}); //descripcion
                    //if(valor_description != "" && valor_description != null){log.debug('valor_description: ', valor_description);}

                    var valor_tax1amt = creditmemo.getSublistValue({sublistId:'item', fieldId:'tax1amt', line:i}); // impuesto aplicado
                    //if(parseFloat(valor_tax1amt) >= 0){log.debug('valor_tax1amt: ', parseFloat(valor_tax1amt));}
                    //log.debug('isNaN(parseFloat(valor_tax1amt)): ', isNaN(parseFloat(valor_tax1amt)));

                    var valor_grossamt = creditmemo.getSublistValue({sublistId:'item', fieldId:'grossamt', line:i}); // (precio total item + impuesto aplicado)
                    //if(valor_grossamt != "" && valor_grossamt != null){log.debug('valor_grossamt: ', valor_grossamt);}
                    
                    if(valor_quantity != "" && valor_quantity != null && isNaN(parseFloat(valor_rate)) == false && valor_description != "" && valor_description != null && isNaN(parseFloat(valor_tax1amt)) == false && parseFloat(valor_tax1amt) >= 0 && valor_grossamt != "" && valor_grossamt != null)
                    {
                      xml += '<tr><td align=\"center\">' + valor_quantity + ' x ' + valor_rate + '</td>';
                      xml += '<td align=\"center\">' + valor_description + '</td>';
                      xml += '<td align=\"center\">' + valor_tax1amt + '</td>';
                      xml += '<td align=\"center\">' + valor_grossamt + '</td></tr>';
                    }
                    else
                    {
                      log.debug('valor_quantity ', valor_quantity);
                      log.debug('valor_description ', valor_description);
                      log.debug('valor_tax1amt ', valor_tax1amt);
                      log.debug('valor_grossamt ', valor_grossamt);
                      log.debug('Error 1: ', 'Falta algún dato necesario para hacer la Nota de crédito!!');
                      redirect.toRecord({type : 'creditmemo', id : creditMemoId});
                      return;
                      break;
                    }
                  }
                }
          		xml += '</table>';

      			xml += "<table style=\"width:100%;\"><tr><td color=\"#5DDCD0\">_________________________________________________________________________________________</td></tr></table>";
           		xml += '<p></p>';
              
              	if(subtotalField != "" && subtotalField != null && isNaN(parseFloat(taxtotalField)) == false && totalField != "" && totalField != null)
                {
                  if(isNaN(parseFloat(discounttotalField)) == false){discounttotalField = parseFloat(discounttotalField)}else{discounttotalField=0}
                  xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
                  xml += '<tr><td width=\"70%\" align=\"right\">SUBTOTAL</td><td align=\"right\">   '+subtotalField+' </td></tr>';
                  xml += '<tr><td width=\"70%\" align=\"right\">DESC</td><td align=\"right\">   '+discounttotalField+' </td></tr>';
                  //itibsImpuesto = (itibsImpuesto).toFixed(2);
                  //nlapiLogExecution('DEBUG', 'itibsImpuesto', itibsImpuesto);
                  //if(taxtotalField != "" && taxtotalField != null)
                      xml += '<tr><td width=\"70%\" align=\"right\">ITBIS</td><td align=\"right\">  '+taxtotalField+' </td></tr>';
                  //else
                      //xml += '<tr><td width=\"70%\" align=\"right\"><b>ITBIS</b></td><td align=\"right\">  '+itibsImpuesto+' </td></tr>';

                  xml += '<tr><td width=\"70%\" align=\"right\"><b>TOTAL</b></td><td align=\"right\">  '+totalField+' </td></tr></table>';
                }
                else
                {
               

                  log.debug('Error 2: ', 'Falta algún dato necesario para hacer la Nota de crédito!!');
                  redirect.toRecord({type : 'creditmemo', id : creditMemoId});
                  return;
                }
				xml += '<p></p><p></p>';
              	xml += '</body>\n</pdf>';
				log.debug('xml',xml);
                var pdfFile = render.xmlToPdf({xmlString: xml});
                log.debug('pdfFile: ', pdfFile.getContents());
                var newFile = file.create({name:tranid+'.pdf', fileType:pdfFile.fileType, contents:pdfFile.getContents(), encoding:file.Encoding.UTF8, folder:'4883155', isOnline:false});
                var new_nc_pdf_id = newFile.save();
                log.debug('new_nc_pdf_id: ', new_nc_pdf_id);
                if(new_nc_pdf_id != "" && new_nc_pdf_id != null)
                {
                  fileOrigen.contents = fileOrigen.contents.replace(ncf, ncf+'|'+tranid+'|ok');
                  var update_txt_folios = file.create({name:fileOrigen.name, fileType:fileObj.fileType, contents:fileOrigen.contents, encoding:file.Encoding.UTF8, folder:fileObj.folder, isOnline:false});
                  var update_txt_folios_id = update_txt_folios.save();
                  log.debug('update_txt_folios_id: ', update_txt_folios_id);
                  if(update_txt_folios_id != "" && update_txt_folios_id != null)
                  {
                    var pdf_generated = file.load({id:new_nc_pdf_id});
                    creditmemo.setValue({fieldId: 'custbody156', value: ncf});
                    creditmemo.setValue({fieldId: 'custbody159', value: pdf_generated.url});
                    creditmemo.setValue({fieldId: 'custbody161', value: pdf_generated.getContents()});
                    creditmemo.save({enableSourcing: false, ignoreMandatoryFields: true});
                    redirect.toRecord({type:'creditmemo', id:creditMemoId});
                    //return;
                  }
                }
              }
              else
              {
                log.debug('Notas de Crédito STO DO: ', 'Folios Agotados o fecha incorrecta!!');
              }
            }
        }catch(e){
            log.debug('Exception: ', e);
        }
        // context.response.renderPdf({ xmlString: xml});
    }

    return {
        onRequest: onRequest
    };

});

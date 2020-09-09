/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/https', 'N/file', 'N/log', 'N/redirect', 'N/render', 'N/xml', 'N/search'],
function(record, https, file, log, redirect, render, xmlref, search){

    function onRequest(context)
    {
    	try
        {
            var invoiceId = context.request.parameters.invoiceId;
			/*var date = new Date(); // hora del servidor Los Angeles California (Hotario cambia en Marzo)
            var day = (date.getDate()<10?'0':'') + date.getDate(); // date.getDate()
            var month = date.getMonth();
            month++; //var month = ('0' + (date.getMonth() + 1)).slice(-2);
            month = (month<10?'0':'') + month;
            var year = date.getFullYear();
            var dateToday =  day + '/' + month + '/' + year;*/
            
            var dateToday = "";
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
            //log.debug('msg code', cont.code); log.debug('msg body', cont.body);
            if(cont.code == "200")
            {
               var position = cont.body.indexOf('xsd:string">');
               if(position >= 0)
               {
                  var fecha = cont.body.substring(position + 12, position + 31);
                  log.debug('fecha: ', fecha);
                  var fechaSplit = fecha.split(' ');
                  fecha = fechaSplit[0]
                  if(fecha.indexOf('202') >= 0)
                  {
                     dateToday = fecha;
                     log.debug('dateToday: ', dateToday);
                  }
               }
            }

			if(invoiceId != "" && invoiceId != null && dateToday != "")
            {
              var invoice = record.load({type:'invoice', id:invoiceId, isDynamic:true});
              var sucursalField = invoice.getText({fieldId: 'location'});
              var tranidField = invoice.getValue({fieldId: 'tranid'});
              var entityField = invoice.getValue({fieldId: 'entity'});
              var custbody_cfdi_rfc = invoice.getValue({fieldId: 'custbody_cfdi_rfc'});
              var tipoFacturaField = invoice.getText({fieldId: 'custbody65'});
              var tipoFacturaHidden = tipoFacturaField;
              var vencimiento_Secuencia = "";
              var txtFolios_Id = "";
              var parentFolderDestination = "";

              if(tipoFacturaField == "De crédito fiscal")
              {
                  tipoFacturaField = "Factura de <br/> crédito fiscal";
                  txtFolios_Id = "1823847"; // folios_crédito_fiscal_test.txt = 6262399 | folios_crédito_fiscal.txt = 1823847
                  var rango_foliosCreditoFiscal = file.load({id:'1825513'}); // rango_de_folios.txt = 1825513
                  rango_foliosCreditoFiscal = rango_foliosCreditoFiscal.getContents();
                  var rango_vencimiento = rango_foliosCreditoFiscal.split(',');
                  vencimiento_Secuencia = rango_vencimiento[1];
                  parentFolderDestination = "1256324"; // Factura_de_Crédito_Fiscal = 1256324
              }
              else if(tipoFacturaField == "De consumo")
              {
                  tipoFacturaField = "Factura de <br/> consumo";
                  txtFolios_Id = "1823846"; // folios_consumo_test.txt = 6262348 | folios_consumo.txt = 1823846
                  var rango_foliosConsumo = file.load({id:'1825511'}); // rango_de_folios.txt = 1825511
                  rango_foliosConsumo = rango_foliosConsumo.getContents();
                  var rango_vencimiento = rango_foliosConsumo.split(',');
                  vencimiento_Secuencia = rango_vencimiento[1];
                  parentFolderDestination = "1266433"; // Factura_de_Consumo = 1266433
              }

              //Totales
              var subtotalField = invoice.getValue({fieldId: 'subtotal'});
              log.debug('subtotalField: ', subtotalField);
              //subtotalField = deleteComas(subtotalField);
              var discounttotalField = invoice.getValue({fieldId: 'discounttotal'});
              log.debug('discounttotalField: ', discounttotalField);
              if(discounttotalField == null || discounttotalField == ""){discounttotalField = 0;}

              var taxtotalField = invoice.getValue({fieldId: 'taxtotal'});
              log.debug('taxtotalField: ', taxtotalField);
              //taxtotalField = deleteComas(taxtotalField);
              var totalField = invoice.getValue({fieldId: 'total'});
              log.debug('totalField: ', totalField);
              //totalField = deleteComas(totalField);

              if(entityField != null && entityField != "")
              {
                //Cliente
                var cusRecord = record.load({type:'Customer', id:entityField, isDynamic:true});
                var altnameField = cusRecord.getValue({fieldId: 'altname'});

                // GetFolio
                var fileFolios = file.load({id:txtFolios_Id});
                var dataCopyOld = fileFolios.getContents();
                var nameCopyOld = fileFolios.name;
                var folderIdCopyOld = fileFolios.folder;
                var fileTypeCopyOld = fileFolios.fileType;

                var folios = dataCopyOld.split(',');
                var folio = "";

                for(var b = 0; b < folios.length; b++)
                {
                  var resArr = folios[b].substring(folios[b].length - 3, folios[b].length);
                  if(resArr != "|ok")
                  {
                     folio = folios[b];
                     break;
                  }
                }

                if(folio != "")
                {
                  var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body>';
                  xml += "<table style=\"width:100%;\"><tr><td background-color=\"#346094\"><br/> <br/></td></tr></table>";

                  xml += '<p></p><p></p><p></p>';

                  xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
                  xml += '<tr><td align=\"left\" color=\"#6a5acd\"><b>KALONI HAIR SRL</b></td> <td align=\"right\" color=\"black\" font-size=\"20px\"><b>' + tipoFacturaField + '</b></td></tr>';
                  xml += '<tr><td align=\"left\" color=\"black\"><b>Sucursal '+ sucursalField +'</b></td> <td align=\"right\"><b>NCF: ' + tranidField + '</b></td></tr>';
                  xml += '<tr><td align=\"left\" color=\"black\"><b>Dirección: Ave. lope de vega Esquina Rafael <br /> Augusto Sanchez #28 Piantini</b></td> <td align=\"right\"><b>Vencimiento secuencia: ' + vencimiento_Secuencia + '</b></td></tr>';
                  xml += '<tr><td align=\"left\" color=\"black\"><b>Teléfono: 809-683-6641</b></td> <td align=\"right\"><b>No. Folio: '+ folio +'</b></td></tr>';
                  xml += '<tr><td align=\"left\" color=\"black\"><b>RNC: 131737315</b></td></tr>';
                  xml += '<tr><td align=\"left\" color=\"black\"><b>FECHA: '+ dateToday +' </b></td></tr></table>';

                  xml += '<p></p><p></p><p></p><p></p>';
                  xml += "<table style=\"width:100%;\"><tr><td color=\"#346094\">_________________________________________________________________________________________</td></tr></table>";

                  xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
                  xml += '<tr><td color=\"black\"><b>RNC CLIENTE: ' + custbody_cfdi_rfc + ' <br/> NOMBRE O RAZÓN SOCIAL: ' + altnameField + '</b></td></tr></table>';

                  xml += "<table style=\"width:100%;\"><tr><td color=\"#346094\">_________________________________________________________________________________________</td></tr></table>";
                  xml += '<p></p>';

                  xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
                  xml += '<tr><td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>CANT</b></td>';
                  xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>DESCRIPCION</b></td>';
                  xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>ITBIS</b></td>';
                  xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>VALOR</b></td></tr>';

                  var boolValue = true;
                  var itibsImpuesto = 0;
                  var conVal = invoice.getLineCount({sublistId : 'item'});
                  if(conVal > 0)
                  {
                    for (var i = 0; i < conVal; i++)
                    {
                      //precioUnitario = precioUnitario.toFixed(2);
                      log.debug('Item #', i);
                      var currentDescription = invoice.getSublistText({sublistId:'item', fieldId:'description', line:i}); // descripcion
                      if(currentDescription == null || currentDescription == ""){boolValue = false;}
                      log.debug('currentDescription: ', currentDescription);
                      var currentAmount = invoice.getSublistValue({sublistId:'item', fieldId:'amount', line:i}); // monto total (cantidad * precio unitario) item
                      if(isNaN(parseFloat(currentAmount)) == true){boolVal = false;}
                      log.debug('currentAmount: ', currentAmount);
                      //currentAmount = deleteComas(currentAmount);
                      var currentQuantity = invoice.getSublistValue({sublistId:'item', fieldId:'quantity', line:i}); // cantidad
                      if(isNaN(parseInt(currentQuantity)) == true){currentQuantity = 1;}
                      log.debug('currentQuantity: ', currentQuantity);
                      var currentRate = invoice.getSublistValue({sublistId:'item', fieldId:'rate', line:i}); // precio unitario item
                      if(isNaN(parseFloat(currentRate)) == true){boolValue = false;}
                      log.debug('currentRate: ', currentRate);
                      //currentRate = deleteComas(currentRate);
                      if(currentQuantity == 1 || currentQuantity == "1"){currentRate = currentAmount;}
                      var currentTax1amt = invoice.getSublistValue({sublistId:'item', fieldId:'tax1amt', line:i}); // impuesto aplicado
                      if(isNaN(parseFloat(currentTax1amt)) == true){boolValue = false;}
                      log.debug('currentTax1amt: ', currentTax1amt);
                      itibsImpuesto = itibsImpuesto + parseFloat(currentTax1amt);
                      var currentGrossamt = invoice.getSublistValue({sublistId:'item', fieldId:'grossamt', line:i}); // (precio total item + impuesto aplicado)
                      if(isNaN(parseFloat(currentGrossamt)) == true){boolValue = false;}
                      log.debug('currentGrossamt: ', currentGrossamt);

                      if(boolValue)
                      {
                         xml += '<tr><td align=\"center\">' + currentQuantity + ' x ' + currentRate.toFixed(2) + '</td>';
                      	 xml += '<td align=\"center\">' + currentDescription + '</td>';
                         xml += '<td align=\"center\">' + currentTax1amt.toFixed(2) + '</td>';
                         xml += '<td align=\"center\">' + currentAmount.toFixed(2) + '</td></tr>';
                      }
                      else
                      {
                        log.debug('Error 1: ', 'Falta algún dato necesario para hacer la Factura!!');
                        redirect.toRecord({type : 'invoice', id : invoiceId});
                        return;
                        break;
                      }
                    }
                  }
                  xml += '</table>';

                  xml += "<table style=\"width:100%;\"><tr><td color=\"#346094\">_________________________________________________________________________________________</td></tr></table>";
                  xml += '<p></p>';

                  var boolValue2 = true;
                  if(isNaN(parseFloat(subtotalField)) == false && isNaN(parseFloat(discounttotalField)) == false && isNaN(parseFloat(taxtotalField)) == false && isNaN(parseFloat(itibsImpuesto)) == false && isNaN(parseFloat(totalField)) == false)
                  {
					xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
                    xml += '<tr><td width=\"70%\" align=\"right\"><b>SUBTOTAL</b></td><td align=\"right\">  ' + subtotalField.toFixed(2) + '</td></tr>';
                    xml += '<tr><td width=\"70%\" align=\"right\"><b>DESC</b></td><td align=\"right\">  ' + discounttotalField.toFixed(2) + '</td></tr>';
                    itibsImpuesto = (itibsImpuesto).toFixed(2);
                    if(isNaN(parseFloat(taxtotalField)) == false)
                    {
                      xml += '<tr><td width=\"70%\" align=\"right\"><b>ITBIS</b></td><td align=\"right\">  ' + taxtotalField.toFixed(2) + '</td></tr>';
                      log.debug('ITBIS field option: ', taxtotalField);
                    }
                    else
                    {
                      xml += '<tr><td width=\"70%\" align=\"right\"><b>ITBIS</b></td><td align=\"right\">  ' + itibsImpuesto + '</td></tr>';
                      log.debug('ITBIS calculated option: ', itibsImpuesto);
                    }

                    xml += '<tr><td width=\"70%\" align=\"right\"><b>TOTAL</b></td><td align=\"right\">  ' + totalField.toFixed(2) + '</td></tr></table>';
                  }
                  else
                  {
                    boolValue2 = false;
                    log.debug('Error 2: ', 'Falta algún dato necesario para hacer la Factura!!');
                    redirect.toRecord({type : 'invoice', id : invoiceId});
                    return;
                  }
                  xml += '<p></p><p></p>';
                  xml += '</body>\n</pdf>';

                  if(boolValue == true && boolValue2 == true)
                  {
                    //context.response.renderPdf({ xmlString: xml});
                    var pdfFile = render.xmlToPdf({xmlString: xml});
                    var newFile = file.create({name:tranidField+'.pdf', fileType:pdfFile.fileType, contents:pdfFile.getContents(), encoding:file.Encoding.UTF8, folder:parentFolderDestination, isOnline:false}); // 1133040 = EXP_STO
                    var new_invoice_pdf_id = newFile.save();
                    if(new_invoice_pdf_id != "" && new_invoice_pdf_id != null)
                    {
                      dataCopyOld = dataCopyOld.replace(folio, folio+'|'+tranidField+'|ok');
                      var update_txt_folios = file.create({name:nameCopyOld, fileType:fileTypeCopyOld, contents:dataCopyOld, encoding:file.Encoding.UTF8, folder:folderIdCopyOld, isOnline:false});
                      var update_txt_folios_id = update_txt_folios.save();
                      log.debug('update_txt_folios_id: ', update_txt_folios_id);
                      if(update_txt_folios_id != "" && update_txt_folios_id != null)
                      {
                        var pdf_generated = file.load({id:new_invoice_pdf_id});
                        invoice.setValue({fieldId: 'custbody73', value: pdf_generated.url});
                        invoice.setValue({fieldId: 'custbody66', value: tipoFacturaHidden});
                        invoice.save({enableSourcing: false, ignoreMandatoryFields: true});
                        log.debug('PDF created id and name: ', new_invoice_pdf_id +' '+ tranidField+'.pdf');
                        redirect.toRecord({type:'invoice', id:invoiceId});
                        return;
                      }
                    }
                  }
                  else
                  {
                    log.debug('Error 3: ', 'Falta algún dato necesario para hacer la Factura!!');
                    redirect.toRecord({type : 'invoice', id : invoiceId});
                    return;
                  }
                }
                else
                {
                  if(tipoFacturaHidden == "De crédito fiscal")
                  {
                    log.debug('Menssage Log 1: ', 'No hay folios disponibles para Facturas de crédito fiscal en STO DO');
                  	redirect.toRecord({type : 'invoice', id : invoiceId});
                   	return;
                  }else if(tipoFacturaHidden == "De consumo"){
                    log.debug('Menssage Log 2: ', 'No hay folios disponibles para Facturas de consumo en STO DO');
                  	redirect.toRecord({type : 'invoice', id : invoiceId});
                   	return;
                  }
                }
              }
              else
              {
                log.debug('Menssage Log 3: ', 'La Factura no tiene cliente asignado!!');
                redirect.toRecord({type : 'invoice', id : invoiceId});
                return;
              }
            }
            else
            {
              log.debug('Error 4: ', 'No llegó el parametro invoiceId o fecha!!');
              return;
            }
        }catch(e){
            log.debug('Exception: ', e);
        }
    }

    return {
        onRequest: onRequest
    };

});

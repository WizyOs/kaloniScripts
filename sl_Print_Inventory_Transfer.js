/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/email', 'N/file', 'N/log', 'N/redirect', 'N/render', 'N/xml', 'N/search'], // 'N/record', 'N/render', 'N/xml', 'N/runtime', 'N/config'
function(record, email, file, log, redirect, render, xmlref, search){

    function onRequest(context)
    {
    	try
        {
            var inventorytransferId = context.request.parameters.inventorytransferId;
			if(inventorytransferId != "" && inventorytransferId != null)
            {
 			  var inventorytransfer = record.load({type:'inventorytransfer', id:inventorytransferId, isDynamic:true});
              var trandate = inventorytransfer.getText({fieldId: 'trandate'});
              var postingperiod = inventorytransfer.getText({fieldId: 'postingperiod'});
              var tranid = inventorytransfer.getValue({fieldId: 'tranid'});
              var memo = inventorytransfer.getValue({fieldId: 'memo'});
              var location = inventorytransfer.getText({fieldId: 'location'});
              var transferlocation = inventorytransfer.getText({fieldId: 'transferlocation'});

              var subsidiary = inventorytransfer.getText({fieldId: 'subsidiary'});
              var department = inventorytransfer.getText({fieldId: 'department'});
			  var transactionnumber = inventorytransfer.getValue({fieldId: 'transactionnumber'});
              var _class = inventorytransfer.getValue({fieldId: 'class'});

              var spaceVar = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
              var lineSep = "__________________________________________________________________________________________________________";
			  var footerPDF = "<macro id=\"myfooter\">";
              footerPDF += "<p align=\"right\">Page <pagenumber/> of <totalpages/></p>";
              footerPDF += "</macro>";

              var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n';
              xml += '<pdf>\n';
              xml += "<head>";
              xml += "<macrolist>";
              xml += "<macro id=\"myheader\">";
              xml += "<p></p><p></p>";
              //xml += "<p align=\"left\">This is the Document Header</p>";
              //xml += "<img src='"+imageUrl+"' width='150' height='50' />";
              xml += "</macro>";
              xml += footerPDF;
              xml += "</macrolist>";
              xml += "</head>";
              xml += '<body style="background-image:url(\'https://efactory-kaloni.com/SENDWA/images/membreteSN.jpg\');background-size:cover;background-repeat:no-repeat;" header=\"myheader\" header-height=\"20mm\" footer=\"myfooter\" footer-height=\"20mm\" footer-width=\"100%\">';

              xml += '<p></p><p></p>';
              xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\"><tr> <td><b>FECHA:</b> "+trandate+"</td> <td><b>UBICACIÓN DE ORIGEN:</b>  "+location+"</td> </tr> <tr> <td><b>PERIODO CONTABLE:</b> "+postingperiod+"</td> <td><b>UBICACIÓN DE DESTINO:</b> "+transferlocation+"</td> </tr> <tr> <td><b>REF. N.°:</b> "+tranid+"</td> <td><b>NOTA:</b> "+memo+"</td> </tr></table>";
              xml += '<p></p>';
              xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\"><tr> <td><b>SUBSIDIARIA:</b> "+subsidiary+"</td> <td><b>DEPARTAMENTO:</b>  "+department+"</td> </tr> <tr> <td><b>NÚMERO DE TRANSACCIÓN:</b> "+transactionnumber+"</td> <td><b>CLASE:</b> "+_class+"</td> </tr></table>";

              xml += "<table style=\"width:100%;\"><tr><td><b>_________________________________________________________________________________________</b></td></tr></table>";

              xml += "<table border='1' style=\"width:100%; font-size:12px; font-family:'Aria', sans-serif\">";
              xml += '<tr><td border="1px" color=\"black\" background-color=\"#5DDCD0\"><b>ARTÍCULO</b></td>';
              xml += '<td border="1px" color=\"black\" background-color=\"#5DDCD0\"><b>DESCRIPCIÓN</b></td>';
              xml += '<td border="1px" color=\"black\" background-color=\"#5DDCD0\"><b>UNIDADES</b></td>';
              xml += '<td border="1px" color=\"black\" background-color=\"#5DDCD0\"><b>CANT. DISPONIBLE</b></td>';
              xml += '<td border="1px" color=\"black\" background-color=\"#5DDCD0\"><b>CANT. PARA TRASLADO</b></td></tr>';

              var item_Lines = inventorytransfer.getLineCount({sublistId : 'inventory'});
              if(item_Lines > 0)
              {
                 for(var i = 0; i < item_Lines; i++)
                 {
                    var item_display = inventorytransfer.getSublistValue({sublistId:'inventory', fieldId:'item_display', line:i});
                    xml += '<tr><td border="1px">' + item_display + '</td>';
                    var description = inventorytransfer.getSublistValue({sublistId:'inventory', fieldId:'description', line:i});
                    xml += '<td border="1px">' + description + '</td>';
				    var units_display = inventorytransfer.getSublistValue({sublistId:'inventory', fieldId:'units_display', line:i});
                    xml += '<td border="1px">' + units_display + '</td>';
                    var quantityonhand = inventorytransfer.getSublistValue({sublistId:'inventory', fieldId:'quantityonhand', line:i});
                    xml += '<td border="1px">' + quantityonhand + '</td>';
                    var adjustqtyby = inventorytransfer.getSublistValue({sublistId:'inventory', fieldId:'adjustqtyby', line:i});
                    xml += '<td border="1px">' + adjustqtyby + '</td></tr>';
                 }
              }
              xml += '</table>';

              xml += '</body>\n</pdf>';
			  context.response.renderPdf({xmlString: xml});

                  /*
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
                      invoice.setValue({fieldId: 'custbody156', value: ncf});
                      invoice.setValue({fieldId: 'custbody159', value: pdf_generated.url});
                      invoice.setValue({fieldId: 'custbody161', value: pdf_generated.getContents()});
                      invoice.save({enableSourcing: false, ignoreMandatoryFields: true});
                      redirect.toRecord({type:'invoice', id:invoiceId});
                      //return;
                    }
                  }
                  */

            }
          	else
            {
              log.debug('Error: ', 'Error al generar PDF');
              redirect.toRecord({type : 'inventorytransfer', id : inventorytransferId});
            }
        }catch(e){
            log.debug('Exception: ', e);
        }
    }

    return {
        onRequest: onRequest
    };

});

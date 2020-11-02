/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/email', 'N/file', 'N/log', 'N/redirect', 'N/render', 'N/xml', 'N/search'], // 'N/record', 'N/render', 'N/xml', 'N/runtime', 'N/config'
  function (record, email, file, log, redirect, render, xmlref, search) {

    function onRequest(context) {
      try {
        var invoiceId = context.request.parameters.invoiceId;
        if (invoiceId != "" && invoiceId != null) {
          var invoice = record.load({
            type: 'invoice',
            id: invoiceId,
            isDynamic: true
          });
          log.debug("Q",invoice);
          var tranid = invoice.getValue({
            fieldId: 'tranid'
          });
          log.debug('tranid: ', tranid);
          var location = invoice.getValue({
            fieldId: 'location'
          });
          var locationText = invoice.getText({
            fieldId: 'location'
          });
          var subtotalField = invoice.getValue({
            fieldId: 'subtotal'
          });
          log.debug('subtotalField: ', subtotalField);
          var discounttotalField = invoice.getValue({
            fieldId: 'discounttotal'
          });
          log.debug('discounttotalField: ', discounttotalField);
          var taxtotalField = invoice.getValue({
            fieldId: 'taxtotal'
          });
          log.debug('taxtotalField: ', taxtotalField);
          var totalField = invoice.getValue({
            fieldId: 'total'
          });
          log.debug('totalField: ', totalField);
          var entity = invoice.getValue({
            fieldId: 'entity'
          }); // cliente
          var subsidiary = invoice.getValue({
            fieldId: 'subsidiary'
          });
          var fechaReal = invoice.getValue({
            fieldId: 'custbody165'
          }); // Fecha real
          var custbody166 = invoice.getText({
            fieldId: 'custbody166'
          }); // Select valores 5 o 10
          var impuesto = subsidiary == "13" ? "20%" : "19%"; // 13-Austria 20%, 17-Alemania 19%
          var footerPDF = "";
          var dataCompanyPDF = "";
          var spaceVar = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          var spaceVar1 = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          var lineSep = "__________________________________________________________________________________________________________";
          // GetFolio
          var txtFolios = subsidiary == "13" ? "6455846" : "6369617"; // folios_Austria.txt 6455846, folios_Alemania.txt 6369617
          var fileFolios = file.load({
            id: txtFolios
          });
          var fileOrigen = {
            id: fileFolios.id,
            name: fileFolios.name,
            folder: fileFolios.folder,
            fileType: fileFolios.fileType,
            contents: fileFolios.getContents()
          };
          var folios = fileOrigen.contents.split(',');
          var folio = "";
          var position = fileOrigen.contents.indexOf(tranid);
          if (position >= 0) {
            for (var b = 0; b < folios.length; b++) {
              var resPos = folios[b].indexOf(tranid);;
              if (resPos >= 0) {
                var foliosAux = folios[b].split('|');
                folio = foliosAux[0];
                break;
              }
            }
          } else {
            for (var b = 0; b < folios.length; b++) {
              var resArr = folios[b].substring(folios[b].length - 3, folios[b].length);
              if (resArr != "|ok") {
                folio = folios[b];
                break;
              }
            }
          }

          if (entity != null && entity != "" && tranid != null && tranid != "" && folio != null && folio != "") {
            var customerRec = record.load({
              type: 'customer',
              id: entity,
              isDynamic: true
            });
            var altname = customerRec.getValue({
              fieldId: 'altname'
            });
            var defaultaddress = customerRec.getValue({
              fieldId: 'defaultaddress'
            });
            var entityid = customerRec.getText({
              fieldId: 'entityid'
            }); // HG
            log.debug("altname: ", altname);
            log.debug("defaultaddress: ", defaultaddress);
            log.debug("HG: ", entityid);

            if (subsidiary == "13") {
              folio = folio.replace('AU', '');
              dataCompanyPDF = "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
              dataCompanyPDF += '<tr><td align="left" color="black" font-size="10px" width="50%"><u>Kaloni GmbH - Walfischgasse 8/18 - 1010 Wien</u></td> <td align="right" color="black" width="50%"><b>Kaloni GmbH</b></td></tr>';
              dataCompanyPDF += '<tr><td align="left" color="black" width="50%">' + altname + '</td> <td align="right" width="50%">Walfischgasse 8/18</td></tr>';
              dataCompanyPDF += '<tr><td align="left" color="black" width="50%">' + defaultaddress + '</td> <td align="right" width="50%">1010 Wien</td></tr></table>';
              dataCompanyPDF += "<table style=\"width:100%; font-family:'Aria', sans-serif\"><tr><td align=\"right\">Tel.: (+43) 1 512 16 87</td></tr> <tr><td align=\"right\">E-Mail: infovienna@kaloni.com</td></tr> <tr><td align=\"right\">Internet: www.kaloni.at</td></tr></table>";

              footerPDF = "<macro id=\"myfooter\">";
              //xml += "<p align=\"right\">Page <pagenumber/> of <totalpages/></p>";
              footerPDF += "<center><table font-size=\"11px\" style=\"width:100%;\"><tr><td colspan=\"2\">" + spaceVar + "<b>" + lineSep + "</b></td></tr> <tr><td>" + spaceVar + "<b>Kaloni GmbH</b></td> <td>" + spaceVar1 + "<b>Bankverbindung</b></td></tr> <tr><td>" + spaceVar + "Walfischgasse 8/18</td> <td>" + spaceVar1 + "Erste Bank der Österreichischen Sparkassen AG</td></tr> <tr><td>" + spaceVar + "1010 Wien</td> <td>" + spaceVar1 + "IBAN: AT25 2011 1828 6400 9100</td></tr> <tr><td>" + spaceVar + "ATU 71428449</td> <td>" + spaceVar1 + "BIC: GIBAATWWXXX</td></tr> </table></center>";
              footerPDF += "</macro>";
            } else {
              folio = folio.replace('AL', '');
              dataCompanyPDF = "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
              dataCompanyPDF += '<tr><td align="left" color="black" font-size="10px" width="50%"><u>Kaloni GmbH - Sonnenstr. 31 - 85609 Aschheim</u></td> <td align="right" color="black" width="50%"><b>Kaloni GmbH</b></td></tr>';
              dataCompanyPDF += '<tr><td align="left" color="black" width="50%">' + altname + '</td> <td align="right" width="50%">Sonnenstraße 31</td></tr>';
              dataCompanyPDF += '<tr><td align="left" color="black" width="50%">' + defaultaddress + '</td> <td align="right" width="50%">85609 Aschheim</td></tr></table>';
              dataCompanyPDF += "<table style=\"width:100%; font-family:'Aria', sans-serif\"><tr><td align=\"right\">Tel: (+49) 89 24418214</td></tr> <tr><td align=\"right\">E-mail: infohamburg@kaloni.com</td></tr> <tr><td align=\"right\">Internet: www.kaloni.de</td></tr></table>";

              footerPDF = "<macro id=\"myfooter\">";
              footerPDF += "<center><table font-size=\"11px\" style=\"width:100%;\"><tr><td colspan=\"2\">" + spaceVar + "<b>" + lineSep + "</b></td></tr> <tr><td>" + spaceVar + "<b>Kaloni GmbH</b></td> <td>" + spaceVar1 + "<b>Bankverbindung</b></td></tr> <tr><td>" + spaceVar + "Sonnenstraße 31</td> <td>" + spaceVar1 + "Kreissparkasse München Starnberg Ebersberg</td></tr> <tr><td>" + spaceVar + "85609 Aschheim</td> <td>" + spaceVar1 + "IBAN: DE21 7025 0150  0028 8536 79</td></tr> <tr><td>" + spaceVar + "UID DE317275209</td> <td>" + spaceVar1 + "BIC: BYLADEM1KMS</td></tr> </table></center>";
              footerPDF += "</macro>";
            }

            if (defaultaddress != "" && defaultaddress != null && altname != "" && altname != null && entityid != "" && entityid != null && footerPDF != null && footerPDF != "" && dataCompanyPDF != null && dataCompanyPDF != "") // defaultaddress != "" && defaultaddress != null &&
            {
              var fileObjImg = file.load({
                id: '5813680'
              });
              var imgURLForPDF = fileObjImg.url;
              var imageUrl = xmlref.escape({
                xmlText: 'https://3559763.app.netsuite.com' + imgURLForPDF
              }); //https://efactory-kaloni.com/SENDWA/images/kaloni_Logo.png
              log.debug('imageUrl: ', imageUrl);

              var fecha = new Date(); // pendiente obtener la real
              fecha = ('0' + fecha.getDate()).slice(-2) + "." + ('0' + (fecha.getMonth() + 1)).slice(-2) + "." + fecha.getFullYear();

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
              xml += dataCompanyPDF;
              xml += '<p></p>';
              xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\"><tr><td font-size=\"20px\"><b>Rechnung</b></td><td align=\"right\">Rechnungsdatum: " + fecha + "</td></tr><tr><td> </td><td align=\"right\">Leistungsdatum: " + fechaReal + "</td></tr><tr><td><b>Rechnung Nr. " + folio + "</b> <br /> Bitte bei Zahlungen und Schriftverkehr angeben!</td><td align=\"right\">Kundennummer: " + entityid + "</td></tr></table>";

              xml += "<table style=\"width:100%;\"><tr><td color=\"black\"><b>_________________________________________________________________________________________</b></td></tr></table>";

              xml += "<table border='1' style=\"width:100%; font-family:'Aria', sans-serif\">";
              xml += '<tr><td width=\"80%\" border="1px" color=\"black\" background-color=\"#5DDCD0\"><b>Beschreibung</b></td>';
              xml += '<td border="1px" align=\"right\" color=\"black\" background-color=\"#5DDCD0\"><b>Betrag</b></td></tr>';

              var item_Lines = invoice.getLineCount({
                sublistId: 'item'
              });
              if (item_Lines > 0) {
                for (var i = 0; i < item_Lines; i++) {
                  /*var valor_codigo = invoice.getSublistValue({sublistId:'item', fieldId:'item', line:i}); // codigo item
                  var valor_units_display = invoice.getSublistValue({sublistId:'item', fieldId:'units_display', line:i}); // unidades
                  var valor_taxrate1 = invoice.getSublistValue({sublistId:'item', fieldId:'taxrate1', line:i}); // porcentaje impuesto aplicado
                  var valor_itemtype = invoice.getSublistValue({sublistId:'item', fieldId:'itemtype', line:i}); // itemtype*/
                  var valor_quantity = invoice.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                  }); // cantidad
                  if (valor_quantity == null || valor_quantity == "") {
                    valor_quantity = 1;
                  }
                  //if(valor_quantity != "" && valor_quantity != null){log.debug('valor_quantity: ', valor_quantity);}

                  var valor_rate = invoice.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: i
                  }); // precio unitario item
                  //if(parseFloat(valor_rate) > 0){log.debug('valor_rate: ', parseFloat(valor_rate));}
                  //log.debug('isNaN(parseFloat(valor_rate)): ', isNaN(parseFloat(valor_rate)));

                  var valor_amount = invoice.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    line: i
                  }); // precio total item (precio unitario item * cantidad)
                  //if(valor_amount == null || valor_amount == ""){valor_amount = (valor_rate * valor_quantity);}

                  var valor_description = invoice.getSublistText({
                    sublistId: 'item',
                    fieldId: 'description',
                    line: i
                  }); //descripcion
                  //if(valor_description != "" && valor_description != null){log.debug('valor_description: ', valor_description);}

                  var valor_tax1amt = invoice.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'tax1amt',
                    line: i
                  }); // impuesto aplicado
                  //if(parseFloat(valor_tax1amt) >= 0){log.debug('valor_tax1amt: ', parseFloat(valor_tax1amt));}
                  //log.debug('isNaN(parseFloat(valor_tax1amt)): ', isNaN(parseFloat(valor_tax1amt)));

                  var valor_grossamt = invoice.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'grossamt',
                    line: i
                  }); // (precio total item + impuesto aplicado)
                  //if(valor_grossamt != "" && valor_grossamt != null){log.debug('valor_grossamt: ', valor_grossamt);}

                  if (valor_quantity != "" && valor_quantity != null && valor_description != "" && valor_description != null && isNaN(parseFloat(valor_tax1amt)) == false && parseFloat(valor_tax1amt) >= 0 && isNaN(parseFloat(valor_amount)) == false) {
                    xml += '<tr><td border="1px">' + valor_description + '</td>';
                    xml += '<td border="1px" align=\"right\">' + valor_amount + ' EUR</td></tr>'; // €
                  } else {
                    log.debug('Error 1: ', 'Falta algún dato necesario para hacer la Factura!!');
                    redirect.toRecord({
                      type: 'invoice',
                      id: invoiceId
                    });
                    return;
                    break;
                  }
                }
              }
              xml += '</table>';

              if (subtotalField != "" && subtotalField != null && isNaN(parseFloat(taxtotalField)) == false && totalField != "" && totalField != null) {
                if (isNaN(parseFloat(discounttotalField)) == false) {
                  discounttotalField = parseFloat(discounttotalField)
                } else {
                  discounttotalField = 0
                }
                xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
                xml += '<tr><td width=\"80%\" align=\"right\">Summe netto</td><td border="1px" align=\"right\">   ' + subtotalField + ' EUR</td></tr>';
                //xml += '<tr><td width=\"70%\" align=\"right\">DESC</td><td align=\"right\">   '+discounttotalField+' </td></tr>';
                //itibsImpuesto = (itibsImpuesto).toFixed(2);
                //nlapiLogExecution('DEBUG', 'itibsImpuesto', itibsImpuesto);
                //if(taxtotalField != "" && taxtotalField != null)
                xml += '<tr><td width=\"80%\" align=\"right\">zzgl. ' + impuesto + ' MwSt. </td><td border="1px" align=\"right\">  ' + taxtotalField + ' EUR</td></tr>';
                //else
                //xml += '<tr><td width=\"70%\" align=\"right\"><b>ITBIS</b></td><td align=\"right\">  '+itibsImpuesto+' </td></tr>';

                xml += '<tr><td width=\"80%\" align=\"right\"><b>Summe brutto</b></td><td border="1px" align=\"right\"><b>  ' + totalField + ' EUR</b></td></tr></table>';
              } else {
                log.debug('Error 2: ', 'Falta algún dato necesario para hacer la Factura!!');
                redirect.toRecord({
                  type: 'invoice',
                  id: invoiceId
                });
                return;
              }

              xml += '<p></p>';
              xml += "<table style=\"width:100%;\"><tr><td color=\"black\">Bitte begleichen Sie den Rechnungsbetrag 10 Tage vor dem geplanten OP-Tag " + custbody166 + ".</td></tr></table>";

              xml += '</body>\n</pdf>';
              context.response.renderPdf({
                xmlString: xml
              });
              if (position == -1) {
                fileOrigen.contents = fileOrigen.contents.replace(folio, folio + '|' + tranid + '|ok');
                var newFile = file.create({
                  name: fileOrigen.name,
                  fileType: fileOrigen.fileType,
                  contents: fileOrigen.contents,
                  encoding: file.Encoding.UTF8,
                  folder: fileOrigen.folder,
                  isOnline: false
                });
                newFile.save();
              }
              return;
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
            } else {
              log.debug('Error: ', 'Faltan datos para generar la Factura!!');
              redirect.toRecord({
                type: 'invoice',
                id: invoiceId
              });
              return;
            }
          } else {
            log.debug('Error: ', 'entity, tranid o folio vienen vacios!!');
          }
        }
        log.debug('Error: ', 'Error al generar PDF');
        redirect.toRecord({
          type: 'invoice',
          id: invoiceId
        });
      } catch (e) {
        log.debug('Exception: ', e);
      }
    }

    return {
      onRequest: onRequest
    };

  });

/**
 * Suitelet that changes the PO Form Type
 */
  // *********************************************************************************************************
function crearPDFinvoiceSTOdo(valid, items){
    try
    {
    //Invoice
  var inRecord = nlapiLoadRecord('invoice', valid);
  var sucursalField = inRecord.getFieldText('location');
    var tranidField = inRecord.getFieldValue('tranid');
    var entityField = inRecord.getFieldValue('entity');
    var custbody_cfdi_rfc = inRecord.getFieldValue('custbody_cfdi_rfc');
    var tipoFacturaField = inRecord.getFieldText('custbody65');
  var tipoFacturaHidden = tipoFacturaField;
    var val_rangofolios = "";
    var vencimiento_Secuencia = "";
    var txtFolios_Id = "";
    var parentFolderDestination = "";

    if(tipoFacturaField == "De crédito fiscal")
    {
        tipoFacturaField = "Factura de <br/> crédito fiscal";
        txtFolios_Id = "1823847";
        var rango_foliosCreditoFiscal = nlapiLoadFile("1825513");
      rango_foliosCreditoFiscal = rango_foliosCreditoFiscal.getValue();
        var rango_vencimiento = rango_foliosCreditoFiscal.split(',');
        val_rangofolios = rango_vencimiento[0];
        vencimiento_Secuencia = rango_vencimiento[1];
        parentFolderDestination = "1256324";
    }
    else if(tipoFacturaField == "De consumo")
    {
        tipoFacturaField = "Factura de <br/> consumo";
        txtFolios_Id = "1823846";
        var rango_foliosConsumo = nlapiLoadFile("1825511");
      rango_foliosConsumo = rango_foliosConsumo.getValue();
        var rango_vencimiento = rango_foliosConsumo.split(',');
        val_rangofolios = rango_vencimiento[0];
        vencimiento_Secuencia = rango_vencimiento[1];
        parentFolderDestination = "1266433";
    }

    //Totales
    var subtotalField = inRecord.getFieldValue('subtotal');
    subtotalField = deleteComas(subtotalField);
    var discounttotalField = inRecord.getFieldValue('discounttotal');

      if(discounttotalField == null || discounttotalField == "")
        discounttotalField = "0.00";
      else
        discounttotalField = deleteComas(discounttotalField);

    var taxtotalField = inRecord.getFieldValue('taxtotal');
    taxtotalField = deleteComas(taxtotalField);
    var totalField = inRecord.getFieldValue('total');
    totalField = deleteComas(totalField);

  //Cliente
  var cusRecord = nlapiLoadRecord('Customer', entityField);
    var altnameField = cusRecord.getFieldValue('altname');

  var date = new Date(); // hora del servidor Los Angeles California (Hotario cambia en Marzo)
    var day = (date.getDate()<10?'0':'') + date.getDate(); // date.getDate()
    var month = date.getMonth();
    month++; //var month = ('0' + (date.getMonth() + 1)).slice(-2);
    month = (month<10?'0':'') + month;
    var year = date.getFullYear();
    var dateToday =  day + '/' + month + '/' + year;

    // GetFolio
  var fileFolios = nlapiLoadFile(txtFolios_Id);
    var dataCopyOld = fileFolios.getValue();
    var nameCopyOld = fileFolios.getName();
    var folderIdCopyOld = fileFolios.getFolder();
    var fileTypeCopyOld = fileFolios.getType();
    //nlapiDeleteFile('1660585');//delete the older file

    var folios = dataCopyOld.split(',');
    var folio = "";

     for (var b = 0; b < folios.length; b++)
     {
      var resArr = folios[b].substring(folios[b].length - 3, folios[b].length);
        if(resArr != "|ok")
        {
          folio = folios[b];
          break;
        }
     }

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
                var conVal = inRecord.getLineItemCount("item");
                var itibsImpuesto = 0;
                for (var i = 1; i <= conVal; i++)
                {
                  inRecord.selectLineItem("item", i);
                  var currentDescription = inRecord.getCurrentLineItemValue("item", "description");
                  var currentAmount = inRecord.getCurrentLineItemValue("item", "amount");
                  currentAmount = deleteComas(currentAmount);

                  var currentQuantity = inRecord.getCurrentLineItemValue("item", "quantity");
                  if(currentQuantity == null || currentQuantity == "")
                     currentQuantity = 1;

                  var precioUnitario = null;
                  if(currentQuantity == 1 || currentQuantity == "1"){
                    precioUnitario = currentAmount;
                    nlapiLogExecution('DEBUG', 'precioUnitario = currentAmount', precioUnitario);
                  }
                  else{
                    precioUnitario = (parseFloat(currentAmount)/parseFloat(currentQuantity));
                    nlapiLogExecution('DEBUG', 'precioUnitario normal', precioUnitario);
                    precioUnitario = precioUnitario.toFixed(2);
                    nlapiLogExecution('DEBUG', 'precioUnitario toFixed', precioUnitario);
                  }

                  precioUnitario = deleteComas(precioUnitario);
                  var currentTax1amt = inRecord.getCurrentLineItemValue("item", "tax1amt");
                  itibsImpuesto = itibsImpuesto + parseFloat(currentTax1amt);
                  var currentGrossamt = inRecord.getCurrentLineItemValue("item", "grossamt");
                  xml += '<tr><td align=\"center\">' + currentQuantity + ' x ' + precioUnitario + '</td>';
                  xml += '<td align=\"center\">' + currentDescription + '</td>';
                  xml += '<td align=\"center\">' + currentTax1amt + '</td>';
                  xml += '<td align=\"center\">' + currentAmount + '</td></tr>';
                }
            xml += '</table>';

            xml += "<table style=\"width:100%;\"><tr><td color=\"#346094\">_________________________________________________________________________________________</td></tr></table>";
              xml += '<p></p>';

        xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
        xml += '<tr><td width=\"70%\" align=\"right\"><b>SUBTOTAL</b></td><td align=\"right\">  ' + subtotalField + '</td></tr>';
            xml += '<tr><td width=\"70%\" align=\"right\"><b>DESC</b></td><td align=\"right\">  ' + discounttotalField + '</td></tr>';
            itibsImpuesto = (itibsImpuesto).toFixed(2);
            nlapiLogExecution('DEBUG', 'itibsImpuesto', itibsImpuesto);
            if(taxtotalField != "" && taxtotalField != null)
              xml += '<tr><td width=\"70%\" align=\"right\"><b>ITBIS</b></td><td align=\"right\">  ' + taxtotalField + '</td></tr>';
            else
                    xml += '<tr><td width=\"70%\" align=\"right\"><b>ITBIS</b></td><td align=\"right\">  ' + itibsImpuesto + '</td></tr>';

            xml += '<tr><td width=\"70%\" align=\"right\"><b>TOTAL</b></td><td align=\"right\">  ' + totalField + '</td></tr></table>';
        xml += '<p></p><p></p>';

            /*xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
            xml += '<tr><td width=\"70%\" align=\"left\"><b>IMPRENTA AUTORIZADA</b></td> <td align=\"right\"><b>original cliente <br/> copia vendedor</b></td></tr></table>';*/

                xml += '</body>\n</pdf>';

                var fileXMLtoPDF = nlapiXMLToPDF(xml);
            return fileXMLtoPDF;
            /*
                fileXMLtoPDF.setFolder(parentFolderDestination);
                var fileId = nlapiSubmitFile(fileXMLtoPDF);

              dataCopyOld = dataCopyOld.replace(folio, folio + '|' + tranidField + '|ok');
                var newFileFolios = nlapiCreateFile(nameCopyOld, fileTypeCopyOld, dataCopyOld);//create a new file with the same details
                newFileFolios.setFolder(folderIdCopyOld);
                var newfileIdFolios = nlapiSubmitFile(newFileFolios);

            var fileName = tranidField + '.pdf'

                var filePDF = nlapiLoadFile(fileId);
                var dataCopyOld2 = filePDF.getValue();
                var folderIdCopyOld2 = filePDF.getFolder();
                var fileTypeCopyOld2 = filePDF.getType();
                nlapiDeleteFile(fileId);//delete the older file

                var newFile = nlapiCreateFile(fileName, fileTypeCopyOld2, dataCopyOld2);
                newFile.setFolder(folderIdCopyOld2);
                var newfileId = nlapiSubmitFile(newFile);

            var newfilePDF = nlapiLoadFile(newfileId);
            var urlFile = newfilePDF.getURL();
                inRecord.setFieldValue('custbody73', urlFile);
                inRecord.setFieldValue('custbody66', tipoFacturaHidden);
                nlapiSubmitRecord(inRecord, false, true);

            nlapiLogExecution('DEBUG', 'function crearPDFinvoiceSTOdo() ', 'Value PDF id: ' + newfileId);
                return true;*/
    }
    catch(error)
    {
      var msgError = error;
      nlapiLogExecution('DEBUG', 'Error al crear PDF STO DO', msgError);
      return false;
    }
}


  // *********************************************************************************************************
function gererarPDF(request, response)
{
  try
  {
  var id = request.getParameter('poid');
    nlapiLogExecution('DEBUG', 'PDF DO: ', 'Value request id parameter: ' + id);

    var result = crearPDFinvoiceSTOdo(id);
      if(result === true || (result !== false && result !== null))
      {
        nlapiLogExecution('DEBUG', 'function gererarPDF(): ', 'Factura STO DO creada correctamente!! Invoice record id: ' + id);
        nlapiLogExecution('DEBUG', 'function gererarPDF() ', 'Submitted the STO Invoice now redirecting...');
        //nlapiSetRedirectURL('RECORD', 'invoice', id, false);
        response.setContentType('PDF','preview.pdf', 'inline');
        response.write(result.getValue());
      }
      else
      {
        nlapiLogExecution('DEBUG', ' function gererarPDF(): ', 'Factura STO DO no creada!! Invoice record id: ' + id);
        nlapiLogExecution('DEBUG', 'function gererarPDF() ', 'Submitted the STO Invoice now redirecting...');
        //nlapiSetRedirectURL('RECORD', 'invoice', id, false);
      }
  }
  catch(err2)
  {
    var msgError = err2;
  nlapiLogExecution('DEBUG', 'Error function gererarPDF()', msgError);
  }
}


  // *********************************************************************************************************

function deleteComas(textParam){
  var res = '';
  var i = 0;
  try{
      while(i<textParam.length){
     var text = textParam[i];

       if(text == 0 || text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == '-' || text == '.')
       {
        // si es diferente simplemente concatena el carácter original de la cadena original.
         res += text;
       }else{
        // si no es diferente concatena el carácter que introdujiste a remplazar
         //nlapiLogExecution('AUDIT', 'SL| No es número - ó .: ', text);
       }
       i++;
   } // Fin del while
  }
  catch(e){
    var vale = e;
    nlapiLogExecution('ERROR', 'SL| catch(e): ', vale);
  }
  return res;
}

function getFecha(){
  var valFecha = '';
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f=new Date();
    valFecha = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  return valFecha;
}

/*function gererarPDF2(request, response)
{
  try
  {
  var id = request.getParameter('poid');
  var rec = nlapiLoadRecord("invoice", id);
    var conVal = rec.getLineItemCount("item");
    nlapiLogExecution('DEBUG', 'conVal: ', conVal);

  for (var i = 1; i <= conVal; i++)
    {
    rec.selectLineItem("item", i);
    var currentLine = rec.getCurrentLineItemValue("item", "line");
    //nlapiLogExecution('DEBUG', 'currentLine: ', currentLine);
    var currentItem = rec.getCurrentLineItemValue("item", "item");
    //nlapiLogExecution('DEBUG', 'currentItem: ', currentItem);
    var currentDescription = rec.getCurrentLineItemValue("item", "description");
    //nlapiLogExecution('DEBUG', 'currentDescription: ', currentDescription);
    var currentUnits = rec.getCurrentLineItemValue("item", "units_display");
    //nlapiLogExecution('DEBUG', 'currentUnits: ', currentUnits);
    var currentQuantity = rec.getCurrentLineItemValue("item", "quantity");
    //nlapiLogExecution('DEBUG', 'currentQuantity: ', currentQuantity);
    var currentAmount = rec.getCurrentLineItemValue("item", "amount");
    //nlapiLogExecution('DEBUG', 'currentAmount: ', currentAmount);
    var currentTaxrate1 = rec.getCurrentLineItemValue("item", "taxrate1");
    //nlapiLogExecution('DEBUG', 'currentTaxrate1: ', currentTaxrate1);
    var currentTax1amt = rec.getCurrentLineItemValue("item", "tax1amt");
    //nlapiLogExecution('DEBUG', 'currentTax1amt: ', currentTax1amt);
    var currentGrossamt = rec.getCurrentLineItemValue("item", "grossamt");
    //nlapiLogExecution('DEBUG', 'currentGrossamt: ', currentGrossamt);
  }
  }
  catch(err2)
  {
    var msgError = err2;
  nlapiLogExecution('ERROR', 'Error function gererarPDF2()', msgError);
  }
}*/
                /*for (var i = 0; i < items.length; i++) {
                  try{
                    var fields1 = items[i].split('|');
                    var desc_Table = fields1[0];
                    var cant_Table = fields1[1];
                    if(cant_Table == null || cant_Table == "")
                      cant_Table = "1";
                    var precioUnit_Table = fields1[2];
                    precioUnit_Table = deleteComas(precioUnit_Table);
                    var importeSinImpuesto_Table = fields1[3];
                    importeSinImpuesto_Table = deleteComas(importeSinImpuesto_Table);
                    var importeConImpuesto_Table = fields1[4];
                    importeConImpuesto_Table = deleteComas(importeConImpuesto_Table);
             xml += '<tr><td align=\"center\">' + cant_Table + ' x ' + precioUnit_Table + '</td>';
                       xml += '<td align=\"center\">' + desc_Table + '</td>';
                       xml += '<td align=\"center\">0.00</td>';
                       xml += '<td align=\"center\">' + importeSinImpuesto_Table + '</td></tr>';
                  }
                  catch(e){
                        var vale = e;
                        nlapiLogExecution('ERROR', 'SL| catch(e): ', vale);
                  }
                }*/
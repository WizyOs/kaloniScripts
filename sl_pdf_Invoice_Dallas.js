/**
 * Suitelet that changes the PO Form Type
 */
	// *********************************************************************************************************

function crearPDFinvoiceDallas(valid, items){
  	try
    {
    //Invoice
	var inRecord = nlapiLoadRecord('invoice', valid);
	var sucursalField = inRecord.getFieldText('location');
    var tranidField = inRecord.getFieldValue('tranid');
  	var entityField = inRecord.getFieldValue('entity');
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
    var parentFolderDestination = getFolderPar(year);
    nlapiLogExecution('DEBUG', 'year: ', 'year: ' + year);
    nlapiLogExecution('DEBUG', 'parentFolderDestination: ', 'parentFolderDestination: ' + parentFolderDestination);

      var xml = '<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n<pdf>\n<body>';
              	xml += "<table style=\"width:100%;\"><tr><td background-color=\"#346094\"><br/> <br/></td></tr></table>";

      			xml += '<p></p><p></p><p></p>';

           		xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
   	 xml += '<tr><td align=\"left\" color=\"#6a5acd\"><b>KALONI HAIR DALLAS SRL</b></td> <td align=\"right\" color=\"black\" font-size=\"20px\"><b>Invoice</b></td></tr>';
      			//xml += '<td width=\"70%\"';
     xml += '<tr><td align=\"left\" color=\"black\"><b>Subsidiary '+ sucursalField +'</b></td> <td align=\"right\"><b>NCF: ' + tranidField + '</b></td></tr>';
     xml += '<tr><td align=\"left\" color=\"black\"><b>RNC: 131737315</b></td> <td align=\"right\"><b>Expiration date sequence: 31/12/2019</b></td></tr>';
     xml += '<tr><td align=\"left\" color=\"black\"><b>Date: '+ dateToday +' </b></td> <td align=\"right\"><b>Number: 123456</b></td></tr></table>';

              	xml += '<p></p><p></p><p></p><p></p>';
      			xml += "<table style=\"width:100%;\"><tr><td color=\"#346094\">_________________________________________________________________________________________</td></tr></table>";

           		xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
           		xml += '<tr><td color=\"black\"><b>RNC CUSTOMER: RNC123456HGG<br/>REGISTERED NAME: ' + altnameField + '</b></td></tr></table>';

      			xml += "<table style=\"width:100%;\"><tr><td color=\"#346094\">_________________________________________________________________________________________</td></tr></table>";
           		xml += '<p></p>';

              	xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>QUANTITY</b></td>';
      			xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>DESCRIPTION</b></td>';
      			xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>ITBIS</b></td>';
      			xml += '<td align=\"center\" color=\"#FFFFFF\" background-color=\"#346094\"><b>VALUE</b></td></tr>';
                for (var i = 0; i < items.length; i++) {
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
                }
      			xml += '</table>';

      			xml += "<table style=\"width:100%;\"><tr><td color=\"#346094\">_________________________________________________________________________________________</td></tr></table>";
           		xml += '<p></p>';

				xml += "<table style=\"width:100%; font-family:'Aria', sans-serif\">";
				xml += '<tr><td width=\"70%\" align=\"right\"><b>SUBTOTAL</b></td><td align=\"right\">  ' + subtotalField + '</td></tr>';
      			xml += '<tr><td width=\"70%\" align=\"right\"><b>DISCOUNT</b></td><td align=\"right\">  ' + discounttotalField + '</td></tr>';
      			xml += '<tr><td width=\"70%\" align=\"right\"><b>ITBIS</b></td><td align=\"right\">  0.00</td></tr>';
      			xml += '<tr><td width=\"70%\" align=\"right\"><b>TOTAL</b></td><td align=\"right\">  ' + totalField + '</td></tr></table>';
				xml += '<p></p><p></p>';

              	xml += '</body>\n</pdf>';

                var fileXMLtoPDF = nlapiXMLToPDF(xml);
                fileXMLtoPDF.setFolder(parentFolderDestination); // parentFolderDestination
                var fileId = nlapiSubmitFile(fileXMLtoPDF);

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
              	inRecord.setFieldValue('custbody72', urlFile);
              	nlapiSubmitRecord(inRecord, false, true);
      		 	nlapiLogExecution('DEBUG', 'function crearPDFinvoiceDallas() ', 'Value PDF id: ' + newfileId);
              	return true;
    }
  	catch(error)
    {
      var msgError = error;
      nlapiLogExecution('ERROR', 'Error al crear PDF Dallas', msgError);
      return false;
    }
}


	// *********************************************************************************************************
function gererarPDF(request, response)
{
  try
  {
	var id = request.getParameter('poid');
  	nlapiLogExecution('DEBUG', 'PDF Dallas: ', 'Value request id parameter: ' + id);
    var fields = id.split('_');
    var idparam = fields[0];
    var items = fields[1];
    var containsBR = false;
    var arrayItems = null;
    try{
      if(items.includes("<br>"))
  	   containsBR = true;
    }
    catch(error){
      nlapiLogExecution('ERROR', 'SL| function gererarPDF() catch(error): ', error);
    }

	if(containsBR){
  		arrayItems = items.split("<br>");
      	nlapiLogExecution('AUDIT', 'SL| function gererarPDF() items: ', items);
    }else{
      var newArray = [];
      newArray.push(items);
      arrayItems = newArray;
      nlapiLogExecution('AUDIT', 'SL| function gererarPDF() arrayItems = newArray: ', newArray);
    }
  	nlapiLogExecution('AUDIT', 'SL| function gererarPDF() arrayItems length: ', arrayItems.length);

	  var result = crearPDFinvoiceDallas(idparam, arrayItems);
      if(result === true){
        nlapiLogExecution('AUDIT', 'function gererarPDF(): ', 'PDF Invoice creada correctamente!! Invoice record id: ' + idparam);
        nlapiLogExecution('DEBUG', 'function gererarPDF() ', 'Submitted the Dallas Invoice now redirecting...');
        nlapiSetRedirectURL('RECORD', 'invoice', idparam, false);
      }else{
        nlapiLogExecution('ERROR', ' function gererarPDF(): ', 'PDF Invoice no creada!! Invoice record id: ' + idparam);
        nlapiLogExecution('ERROR', 'function gererarPDF() ', 'Submitted the Dallas Invoice now redirecting...');
        nlapiSetRedirectURL('RECORD', 'invoice', idparam, false);
      }
  }
  catch(err2)
  {
    var msgError = err2;
	nlapiLogExecution('ERROR', 'Error gererarPDF function', msgError);
  }
}

	// *********************************************************************************************************
function getFolderPar(val){
  var folderParent = "0";
      if(val == '2019')
        folderParent = '1320223';
      if(val == '2020')
        folderParent = '1321237';
  return folderParent;
}

function deleteComas(textParam){
  var res = '';
  var i = 0;
  try
  {
      while(i<textParam.length)
      {
       var text = textParam[i];
       if(text == 0 || text == 1 || text == 2 || text == 3 || text == 4 || text == 5 || text == 6 || text == 7 || text == 8 || text == 9 || text == '-' || text == '.')
       {
        // si es diferente simplemente concatena el carácter original de la cadena original.
         res += text;
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
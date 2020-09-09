/**
 * Client Function to call Suitelet
 */
function mypageInitfunction(type, form, request)
{
  	var id = nlapiGetRecordId();
  	var t = nlapiGetRecordType();
  	var rec = nlapiLoadRecord(t, id)

	 var cs_tipo_ident = rec.getFieldValue('custbody44'); // TIPO IDENTIFICACIÓN RECEPTOR (FE_CO):
     var cs_identificacion = rec.getFieldValue('custbody35'); // IDENTIFICACIÓN RECEPTOR (FE_CO):
     var cs_razon_social = rec.getFieldValue('custbody36'); // RAZÓN SOCIAL RECEPTOR (FE_CO):

     var cs_departamento = rec.getFieldValue('custbody37'); // DEPARTAMENTO RECEPTOR (FE_CO):
     var cs_municipio = rec.getFieldValue('custbody38'); // MUNICIPIO RECEPTOR (FE_CO):

     var cs_ciudad = rec.getFieldValue('custbody39'); // CIUDAD RECEPTOR (FE_CO):
     var cs_direccion = rec.getFieldValue('custbody40'); // DIRECCIÓN RECEPTOR (FE_CO):
     var cs_email = rec.getFieldValue('custbody41'); // E-MAIL RECEPTOR (FE_CO):
     var cs_telefono = rec.getFieldValue('custbody42'); // TELÉFONO RECEPTOR (FE_CO):
     var cs_regimen = rec.getFieldValue('custbody43'); // RÉGIMEN RECEPTOR (FE_CO):

     var fileTXT = rec.getFieldValue('custbody46'); // LOCAL_FILE_TXT (FE_CO):

  	if(fileTXT == null || fileTXT == '')
    {
      if(cs_tipo_ident != null && cs_tipo_ident != '' && cs_identificacion != null && cs_identificacion != '' && cs_razon_social != null && cs_razon_social != '' && cs_departamento != null && cs_departamento != '' && cs_municipio != null && cs_municipio != '' && cs_ciudad != null && cs_ciudad != '' && cs_direccion != null && cs_direccion != '' && cs_email != null && cs_email != '' && cs_telefono != null && cs_telefono != '' && cs_regimen != null && cs_regimen != '')
      {
          var itemsField = showTableData();
          nlapiLogExecution('DEBUG', 'CS| Value parameter on client script: ', 'Value InvoiceCO id: ' + id+ '_'+itemsField);
          window.location = nlapiResolveURL('SUITELET', 'customscript831', 'customdeploy1')+'&paramInCo='+id+ '_'+itemsField;
      }
      else
      {
	         alert('Los campos del cliente receptor deben de ir llenos!! \n\n pestaña "Facturación Electrónica" campos RECEPTOR (FE_CO)');
      		 //nlapiLogExecution('AUDIT', 'CS| Esta factura ya fué emitida!! ', fileTXT);
      }
    }
  	else{
       alert("Esta factura ya fué emitida!! " + fileTXT);
       nlapiLogExecution('AUDIT', 'CS| Esta factura ya fué emitida!! ', fileTXT);
    }
}

    function showTableData() {
        //document.getElementById('info').innerHTML = "";
        var myTab = document.getElementById('item_splits');
		var contenido = '';
      	var cod = '';
        // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
        for (i = 1; i < myTab.rows.length; i++) {

            // GET THE CELLS COLLECTION OF THE CURRENT ROW.
            var objCells = myTab.rows.item(i).cells;

            // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
            for (var j = 0; j < (objCells.length - 6); j++) {

              	// 0=Artículo  1=Concepto  3=Unid  4=Cant  7=PrecioUnit  8=ImporteSinImpuesto  10=%Impuesto  11=MontoImpuesto  12=ImporteConImpuesto
              	   if(j == 0 || j == 1 || j == 3 || j == 4 || j == 7 || j == 8 || j == 10 || j == 11 || j == 12)
                   {
                      var valCel = objCells.item(j).innerHTML;
                      var valCelda = valCel.trim();
                      var valCadena = valCelda.substring(0,2);

                      if(valCadena != '<a'){
                          contenido += valCelda + '|';
                      }
                      else
                      {
                           var n = valCelda.indexOf("nl?id=");
                           var ini = n+6;
                           var valid = valCelda.substring(ini, ini+10);
                           var val10 = 10;
                           for (var k = 1; k <= val10; k++){
                              var sim = k;
                              var dig = valid.substring(sim-1,k);
                              var valcod = valid.substring(0,k);
                              if(dig == 0 || dig == 1 || dig == 2 || dig == 3 || dig == 4 || dig == 5 || dig == 6 || dig == 7 || dig == 8 || dig == 9)
                                cod = valcod;
                           }
                           contenido += cod + '|';
                      }
                   }
            }
            contenido += '<br>';     // ADD A BREAK (TAG).
        }
      var resultado = contenido;
	  resultado = resultado.replace(/&nbsp;/g, '');
      var longCont = resultado.length;
      var validBR = resultado.substring(longCont-4,longCont);
      if(validBR == '<br>')
        resultado = resultado.substring(0,longCont-4);
      return resultado;
    }

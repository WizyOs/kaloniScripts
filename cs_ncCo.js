/**
 * Client Function to call Suitelet
 */
function mypageInitfunction(type, form, request)
{
  	var id = nlapiGetRecordId();
  	var t = nlapiGetRecordType();
  	var rec = nlapiLoadRecord(t, id);

  	 var cs_tipo_nota_credito = rec.getFieldValue('custbody63'); // TIPO NOTA DE CRÉDITO (NC_CO):
     var cs_concepto_nota = rec.getFieldValue('custbody64'); // CONCEPTO NOTA (NC_CO):
	   var cs_tipo_ident = rec.getFieldValue('custbody48'); // TIPO IDENTIFICACIÓN RECEPTOR (NC_CO):
     var cs_identificacion = rec.getFieldValue('custbody49'); // IDENTIFICACIÓN RECEPTOR (NC_CO):
     var cs_razon_social = rec.getFieldValue('custbody50'); // RAZÓN SOCIAL RECEPTOR (NC_CO):

     var cs_departamento = rec.getFieldValue('custbody51'); // DEPARTAMENTO RECEPTOR (NC_CO):
     var cs_municipio = rec.getFieldValue('custbody52'); // MUNICIPIO RECEPTOR (NC_CO):

     var cs_ciudad = rec.getFieldValue('custbody53'); // CIUDAD RECEPTOR (NC_CO):
     var cs_direccion = rec.getFieldValue('custbody54'); // DIRECCIÓN RECEPTOR (NC_CO):
     var cs_email = rec.getFieldValue('custbody55'); // E-MAIL RECEPTOR (NC_CO):
     var cs_telefono = rec.getFieldValue('custbody56'); // TELÉFONO RECEPTOR (NC_CO):
     var cs_regimen = rec.getFieldValue('custbody57'); // RÉGIMEN RECEPTOR (NC_CO):
  	 var cs_secuencial_FacAfectada = rec.getFieldValue('custbody58'); // SECUENCIAL FACTURA AFECTADA (NC_CO):
  	 //var cs_CUFE_FacAfectada = rec.getFieldValue('custbody59'); && cs_CUFE_FacAfectada != null && cs_CUFE_FacAfectada != ''
  	 var cs_Fecha_FacAfectada = rec.getFieldValue('custbody60'); // FECHA FACTURA AFECTADA (NC_CO):

  	var cs_location = rec.getFieldValue('location'); // LOCATION *

    var fileTXT = rec.getFieldValue('custbody62'); // LOCAL_FILE_TXT (NC_CO):

  	if(fileTXT == null || fileTXT == '')
    {
      if(cs_tipo_nota_credito != null && cs_tipo_nota_credito != '' && cs_tipo_ident != null && cs_tipo_ident != '' && cs_identificacion != null && cs_identificacion != '' && cs_razon_social != null && cs_razon_social != '' && cs_departamento != null && cs_departamento != '' && cs_municipio != null && cs_municipio != '' && cs_ciudad != null && cs_ciudad != '' && cs_direccion != null && cs_direccion != '' && cs_email != null && cs_email != '' && cs_telefono != null && cs_telefono != '' && cs_regimen != null && cs_regimen != '' && cs_secuencial_FacAfectada != null && cs_secuencial_FacAfectada != '' && cs_Fecha_FacAfectada != null && cs_Fecha_FacAfectada != '' && cs_concepto_nota != null && cs_concepto_nota != '' && cs_location != null && cs_location != '')
      {
          var itemsField = showTableData();
          nlapiLogExecution('DEBUG', 'CS| Value parameter on client script: ', 'Value Nota Credito CO id: ' + id+ '_'+itemsField);
          window.location = nlapiResolveURL('SUITELET', 'customscript877', 'customdeploy1')+'&paramNcCo='+id+ '_'+itemsField;
      }
      else
      {
	       alert('*Revisa que el campo LOCATION esté lleno!! \n\n *Revisa que los campos del cliente receptor y de la factura afectada estén llenos!! --> Pestaña "Nota de Credito" campos (NC_CO)');
      }
    }
  	else
    {
       alert("Esta Nota de Crédito ya fué emitida!! " + fileTXT);
       nlapiLogExecution('AUDIT', 'CS| Esta Nota de Crédito ya fué emitida!! ', fileTXT);
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
            for (var j = 0; j < (objCells.length - 10); j++) {

              	// 0=Artículo  1=Concepto  3=Unid  4=Cant  7=PrecioUnit  8=ImporteSinImpuesto  10=%Impuesto  11=MontoImpuesto  12=ImporteConImpuesto
              	   if(j == 0 || j == 1 || j == 2 || j == 3 || j == 6 || j == 8 || j == 9 || j == 10 || j == 11)
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
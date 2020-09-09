/**
 * Client Function to call Suitelet
 */
function callSuitelet()
{
  	var id = nlapiGetRecordId();
   	var t = nlapiGetRecordType();
  	var rec = nlapiLoadRecord(t, id);

    var cs_tipo_factura = rec.getFieldValue('custbody65'); // TIPO DE FACTURA
  	var cs_rfc = rec.getFieldValue('custbody_cfdi_rfc'); // RFC

    if(cs_tipo_factura !== null && cs_tipo_factura !== '' && cs_rfc !== null && cs_rfc !== '')
    {
      window.location = nlapiResolveURL('SUITELET', 'customscript890', 'customdeploy1')+'&poid='+id;
    }
	else
    {
      alert('Los campos "TIPO DE FACTURA" y "RNC CLIENTE" deben de ir llenos!!');
    }
}

function callSuiteletRegenerar()
{
  	var id = nlapiGetRecordId();
   	var t = nlapiGetRecordType();
  	var rec = nlapiLoadRecord(t, id)

    var cs_tipo_factura = rec.getFieldValue('custbody65'); // TIPO DE FACTURA
  	var cs_rfc = rec.getFieldValue('custbody_cfdi_rfc'); // RFC

    if(cs_tipo_factura !== null && cs_tipo_factura !== '' && cs_rfc !== null && cs_rfc !== '')
    {
      window.location = nlapiResolveURL('SUITELET', 'customscript1041', 'customdeploy1')+'&poid='+id;
    }
	else
    {
      alert('Los campos "TIPO DE FACTURA" y "RNC CLIENTE" deben de ir llenos!!');
    }
}

/*function callSuitelet()
{
	var id = nlapiGetRecordId();
   	var t = nlapiGetRecordType();
  	var rec = nlapiLoadRecord(t, id)

    var cs_tipo_factura = rec.getFieldValue('custbody65'); // TIPO DE FACTURA
  	var cs_rfc = rec.getFieldValue('custbody_cfdi_rfc'); // RFC

    if(cs_tipo_factura !== null && cs_tipo_factura !== '' && cs_rfc !== null && cs_rfc !== '')
    {
      var itemsField = showTableData();
      window.location = nlapiResolveURL('SUITELET', 'customscript890', 'customdeploy1')+'&poid='+id+ '_'+itemsField;
    }
	else
    {
      alert('Los campos "TIPO DE FACTURA" y "RNC CLIENTE" deben de ir llenos!!');
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
            for (var j = 0; j < (objCells.length - 8); j++) {

              	// 1=Concepto 4=Cant  7=PrecioUnit  8=ImporteSinImpuesto 12=ImporteConImpuesto
              	   if(j == 1 || j == 4 || j == 7 || j == 8 || j == 12)
                   {
                      var valCel = objCells.item(j).innerHTML;
                      var valCelda = valCel.trim();
                      var valCadena = valCelda.substring(0,2);

                      if(valCadena != '<a'){
                          contenido += valCelda + '|';
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
*/
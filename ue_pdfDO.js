//Define the User Event function for a beforeLoad operation.
function beforeLoadInvoiceStoDo(type, form)
{
  if(type == "view")
  {
   var newRecord = nlapiGetNewRecord();
   var tranidField = newRecord.getFieldValue('tranid');
   var locationVal = newRecord.getFieldText('location');
   var tipoFactHidden = newRecord.getFieldValue('custbody66');
   var tipoFact = newRecord.getFieldText('custbody65');
   var urlPDFfact = newRecord.getFieldValue('custbody73');
   var inRecord = nlapiLoadRecord(nlapiGetRecordType(), nlapiGetRecordId());
   nlapiLogExecution('ERROR', 'nlapiGetRecordType() _ nlapiGetRecordId() _ tranidField', nlapiGetRecordType() + ' _ ' + nlapiGetRecordId() + ' _ ' + tranidField);

   var conVal = inRecord.getLineItemCount("item");
   var boolVal = true;
   for (var i = 1; i <= conVal; i++)
   {
      inRecord.selectLineItem("item", i);
      var currentDescription = inRecord.getCurrentLineItemValue("item", "description");
      if(currentDescription == null || currentDescription == "")
        boolVal = false;

      var currentRate = inRecord.getCurrentLineItemValue("item", "rate");
       if(currentRate == null || currentRate == "")
          boolVal = false;

       var currentAmount = inRecord.getCurrentLineItemValue("item", "amount");
       if(currentAmount == null || currentAmount == "")
          boolVal = false;

       var currentTax1amt = inRecord.getCurrentLineItemValue("item", "tax1amt");
       if(currentTax1amt == null || currentTax1amt == "")
          boolVal = false;

       var currentGrossamt = inRecord.getCurrentLineItemValue("item", "grossamt");
       if(currentGrossamt == null || currentGrossamt == "")
          boolVal = false;
    }

   /* Sales Order
   var idcreatedfrom = newRecord.getFieldValue('createdfrom');
   var salesOrderRecord = nlapiLoadRecord('salesorder', idcreatedfrom);
   var orderstatus = salesOrderRecord.getFieldText('orderstatus');
   var orderstatusId = salesOrderRecord.getFieldValue('orderstatus');
   nlapiLogExecution('ERROR', 'orderstatus: ', orderstatus);
   var hasHonoraiosVal = null;
   var hasAgujasVal = null;
   var lineItemCountSalesOrden = salesOrderRecord.getLineItemCount("item");
   for(var i = 1; i <= lineItemCountSalesOrden; i++)
   {
      salesOrderRecord.selectLineItem("item", i);
      var lineItemDescription = salesOrderRecord.getCurrentLineItemValue("item", "description");
	  if(lineItemDescription != null && lineItemDescription != "")
      {
        hasHonoraiosVal = hasHonoraios(lineItemDescription);
        nlapiLogExecution('ERROR', 'hasHonoraiosVal: ', hasHonoraiosVal);
        hasAgujasVal = hasAgujas(lineItemDescription);
        nlapiLogExecution('ERROR', 'hasAgujasVal: ', hasAgujasVal);
      }
   }*/

   /*if(orderstatus == "Partially Fulfilled" && (hasHonoraiosVal == "Si existen honorarios" || hasAgujasVal == "Si existen agujas"))
   {
      createAlert("Hola te falta sacar las agujas del inventario, una vez completado esto por favor facturar!!", form);
   }else*/ if(boolVal == false && locationVal == "Santo Domingo"){
      createAlert("Llena todos los campos requeridos de los artículos a facturar!!", form);
   }else /*if(hasHonoraiosVal == "No existen honorarios" && hasAgujasVal == "No existen agujas")*/{
       if(tipoFact == "De consumo")
       {
         if(fol_Fact_Consumo_Disponibles())
         {
            if((tipoFactHidden == "" || tipoFactHidden == null) && (urlPDFfact == "" || urlPDFfact == null))
            {
               if(nlapiGetContext().getExecutionContext() == 'userinterface')
               {
                  form.setScript('customscript889');
                  form.addButton('custpage_pdfStoDo_button_view', 'Factura STO DO', 'callSuitelet()');
               }
            }
         }
         else
         {
           createAlert("No hay folios disponibles para FACTURAS DE CONSUMO !!", form);
         }
       }else if(tipoFact == "De crédito fiscal"){
         if(fol_Fact_Cred_Fiscal_Disponibles())
         {
            if((tipoFactHidden == "" || tipoFactHidden == null) && (urlPDFfact == "" || urlPDFfact == null))
            {
               if(nlapiGetContext().getExecutionContext() == 'userinterface')
               {
                  form.setScript('customscript889');
                  form.addButton('custpage_pdfStoDo_button_view', 'Factura STO DO', 'callSuitelet()');
               }
            }
         }
         else
         {
           createAlert("No hay folios disponibles para FACTURAS DE CRÉDITO FISCAL !!", form);
         }
       }
    }

  }
}

function fol_Fact_Cred_Fiscal_Disponibles()
{
  var response = false;
  var fileFolios = nlapiLoadFile("1823847");
  var folios = fileFolios.getValue();
  var result = folios.substring(folios.length - 3, folios.length);

  if(result != "|ok")
    response = true;

  return response;
}

function fol_Fact_Consumo_Disponibles()
{
  var response = false;
  var fileFolios = nlapiLoadFile("1823846");
  var folios = fileFolios.getValue();
  var result = folios.substring(folios.length - 3, folios.length);

  if(result != "|ok")
    response = true;

  return response;
}

function createAlert(textalert, form)
{
  var alert_value = '<html><body><script language="JavaScript" type="text/javascript">window.alert("' + textalert + '");</script></body></html>';
  var field = form.addField('custpage_alertfieldinvoice' ,  'inlinehtml');
  field.setDefaultValue(alert_value);
}

function hasHonoraios(paramWord)
{
  var n = false;
  var result = null;
  try
  {
    n = paramWord.indexOf("HONORARIOS");
    if(n != -1 && n >= 0)
      result = "Si existen honorarios";
    else
      result = "No existen honorarios";
  }catch(error){
    nlapiLogExecution('ERROR', 'hasHonoraios() Exception catch(): ', error);
    result = "No existen honorarios - Exception";
  }
  return result;
}

function hasAgujas(paramWord)
{
  var n = false;
  var result = null;
  try
  {
    n = paramWord.indexOf("AGUJAS");
    if(n != -1 && n >= 0)
      result = "Si existen agujas";
    else
      result = "No existen agujas";
  }catch(error){
    nlapiLogExecution('ERROR', 'hasAgujas() Exception catch(): ', error);
    result = "No existen agujas - Exception";
  }
  return result;
}
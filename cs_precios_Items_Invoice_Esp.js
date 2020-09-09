/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/currentRecord', 'N/log'],function(record, currentRec, log){

      function pageInit(context)
      {
        //context.currentRecord.setValue({fieldId: 'customform', value: '148', ignoreFieldChange: true});

        /*alert(context.mode);
        var btnEdit = document.getElementById("secondaryedit").value;
        //var tranidVal = document.getElementById("id").value;
        console.log(btnEdit);
        alert(btnEdit);
        
		var cuRec = currentRec.get();
        console.log('id1: ' + cuRec.id);
        log.debug('cuRec: ', cuRec);
        if(cuRec.type === "purchaseorder")
        {
          var tranid = currentRec.getValue({fieldId: 'tranid'});
          log.debug('tranid1: ', tranid);
        }*/
      }

    function saveRecord(context)
    {
      var createdfrom = context.currentRecord.getValue({fieldId: 'createdfrom'});
      console.log('invoice from sales order id: ' + createdfrom);
      if(createdfrom != null && createdfrom != "")
      {
        var rec_SO = record.load({type: 'salesorder', id: createdfrom});
        var createdfrom_createddate_SO = rec_SO.getText({fieldId: 'createddate'});
        console.log('createdfrom_createddate_SO: ' + createdfrom_createddate_SO);
        var dateTest_split = createdfrom_createddate_SO.split('/');
        var dateTest = dateTest_split[2].substring(0, 4) + '-' + dateTest_split[1] + '-' + dateTest_split[0];
        var resultDate = TDate(dateTest);
        console.log('resultDate: ' + resultDate);

        if(resultDate){
          var subsidiary = context.currentRecord.getValue({fieldId: 'subsidiary'});
          console.log('subsidiary: ' + subsidiary);
          if(subsidiary == "12")
          {
              var final_Message = "";
              var currentRecord = context.currentRecord;
              var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
              if(item_Lines > 0)
              {
                 for(var i = 0; i < item_Lines; i++)
                 {
                    currentRecord.selectLine({sublistId: "item", line: i});
                    //log.debug('itemInfo: ', itemInfo);
                    var current_concepto = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
                    console.log('for loop ' + i + ' - current_concepto:' + current_concepto);
                    var current_precio_unit = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "rate"});
                    console.log('for loop ' + i + ' - current_precio_unit:' + current_precio_unit);

                    if(current_concepto == "HONORARIOS MICRO INJERTO DE CABELLO ESP" && (current_precio_unit == null || current_precio_unit == "" || current_precio_unit == "0.00" || current_precio_unit == 0 || current_precio_unit < 0))
                    {
                      console.log('current_precio_unit es nulo, vacio, 0 o menor a 0');
                      alert('El precio unitario de ' + current_concepto + ' no puede ser 0, vacio o negativo!!');
                      return false;
                    }else if(current_concepto == "HONORARIOS MICRO INJERTO DE CABELLO ESP"){
                      if(current_precio_unit < 3200)
                      {
                        final_Message += 'El precio unitario de ' + current_concepto + ' es incorrecto \n';
                        console.log('El precio unitario de ' + current_concepto + ' no puede ser menor a 3,200');
                      }
                      else
                      {
                        console.log('El precio ' + current_precio_unit + ' asignado para ' + current_concepto + ' es correcto!!');
                        //return false;
                      }
                    }
                 }
              }
              else
              {
                console.log('No hay articulos: ' + item_Lines);
                return false;
              }

              if(final_Message != "" && final_Message != null){
                alert(final_Message);
                return false;
              }
          }
        }
        else
        {
           console.log("La fecha de creación de la orden de venta fue antes o igual que 2019-12-31");
           //return false;
        }
      }
      return true;
    }

    function TDate(UserDate){
        if(new Date(UserDate).getTime() <= new Date('2019-12-31').getTime())
              return false;

        return true;
    }

    return{
      pageInit: pageInit,
      saveRecord:saveRecord
    };
});
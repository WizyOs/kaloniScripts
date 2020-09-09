/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/currentRecord'],function(record, currentRec){

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
        var createdfrom_trandate_SO = rec_SO.getText({fieldId: 'trandate'});
        console.log('createdfrom_trandate_SO: ' + createdfrom_trandate_SO);
        var dateTest_split = createdfrom_trandate_SO.split('/');
        var dateTest = dateTest_split[2] + '-' + dateTest_split[1] + '-' + dateTest_split[0];
        var resultDate = TDate(dateTest);
        console.log('resultDate: ' + resultDate);

        if(resultDate)
        {
          var final_Message = "";
          var currentRecord = context.currentRecord;
          var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
          if(item_Lines > 0)
          {
             for(var i = 0; i < item_Lines; i++)
             {
                currentRecord.selectLine({sublistId: "item", line: i});

                var current_description = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
                console.log('for loop ' + i + ' - current_description:' + current_description);

                var current_precio_unit = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "rate"});
                console.log('for loop ' + i + ' - current_precio_unit:' + current_precio_unit);

                if((current_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG" || current_description == "PAQUETE BARBA COMPLETA KHG" || current_description == "PAQUETE BARBA DE CANDADO KHG" || current_description == "PAQUETE BIGOTE KHG" || current_description == "PAQUETE DE CEJAS KHG" || current_description == "PAQUETE PATILLA KHG") && (current_precio_unit == null || current_precio_unit == "" || current_precio_unit == "0.00" || current_precio_unit == 0 || current_precio_unit < 0))
                {
                  console.log('current_precio_unit es nulo, vacio, 0 o menor a 0');
                  alert('El precio unitario de los artículos no puede ser 0, vacio o negativo!!');
                  return false;

                }else if(current_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG"){
                  if(current_precio_unit < 63000)
                  {
                    final_Message += 'El precio unitario de ' + current_description + ' es incorrecto \n';
                    console.log('El precio unitario de ' + current_description + ' no puede ser menor a 63,000');
                  }
                  else
                  {
                    console.log('El precio ' + current_precio_unit + ' asignado para ' + current_description + ' es correcto!!');
                  }

                }else if(current_description == "PAQUETE BARBA COMPLETA KHG"){
                  if(current_precio_unit < 60000)
                  {
                    final_Message += 'El precio unitario de ' + current_description + ' es incorrecto \n';
                    console.log('El precio unitario de ' + current_description + ' no puede ser menor a 60,000');
                  }
                  else
                  {
                    console.log('El precio ' + current_precio_unit + ' asignado para ' + current_description + ' es correcto!!');
                  }

                }else if(current_description == "PAQUETE BARBA DE CANDADO KHG"){
                  if(current_precio_unit < 40000)
                  {
                    final_Message += 'El precio unitario de ' + current_description + ' es incorrecto \n';
                    console.log('El precio unitario de ' + current_description + ' no puede ser menor a 40,000');
                  }
                  else
                  {
                    console.log('El precio ' + current_precio_unit + ' asignado para ' + current_description + ' es correcto!!');
                  }

                }else if(current_description == "PAQUETE BIGOTE KHG"){
                  if(current_precio_unit < 30000)
                  {
                    final_Message += 'El precio unitario de ' + current_description + ' es incorrecto \n';
                    console.log('El precio unitario de ' + current_description + ' no puede ser menor a 30,000');
                  }
                  else
                  {
                    console.log('El precio ' + current_precio_unit + ' asignado para ' + current_description + ' es correcto!!');
                  }

                }else if(current_description == "PAQUETE DE CEJAS KHG"){
                  if(current_precio_unit < 30000)
                  {
                    final_Message += 'El precio unitario de ' + current_description + ' es incorrecto \n';
                    console.log('El precio unitario de ' + current_description + ' no puede ser menor a 30,000');
                  }
                  else
                  {
                    console.log('El precio ' + current_precio_unit + ' asignado para ' + current_description + ' es correcto!!');
                  }

                }else if(current_description == "PAQUETE PATILLA KHG"){
                  if(current_precio_unit < 40000)
                  {
                    final_Message += 'El precio unitario de ' + current_description + ' es incorrecto \n';
                    console.log('El precio unitario de ' + current_description + ' no puede ser menor a 40,000');
                  }
                  else
                  {
                    console.log('El precio ' + current_precio_unit + ' asignado para ' + current_description + ' es correcto!!');
                  }
                }
             }
          }
          else
          {
            console.log('item_Lines: ' + item_Lines);
            return false;
          }

          if(final_Message != "" && final_Message != null){
            alert(final_Message);
            return false;
          }
        }
        else
        {
           //alert("La fecha de creación de la orden de venta fue antes o igual que 2019-11-15");
           console.log("La fecha de creación de la orden de venta fue antes o igual que 2019-11-15");
           //return false;
        }
      }
      return true;
    }

    function TDate(UserDate){
        if(new Date(UserDate).getTime() <= new Date('2019-11-15').getTime())
              return false;

        return true;
    }

    return{
      pageInit: pageInit,
      saveRecord:saveRecord
    };
});

      /*
      var item_Lines11 = invoice.getLineCount({sublistId : 'item'});
      if(item_Lines11 > 0)
      {
        for(var i = 0; i < item_Lines11; i++)
        {
          var valor_codigo = invoice.getSublistValue({sublistId:'item', fieldId:'item', line:i}); // codigo item
          var valor_description = invoice.getSublistText({sublistId:'item', fieldId:'description', line:i}); //descripcion
          var valor_units_display = invoice.getSublistValue({sublistId:'item', fieldId:'units_display', line:i}); // unidades
          var valor_quantity = invoice.getSublistValue({sublistId:'item', fieldId:'quantity', line:i}); // cantidad
          if(valor_quantity == null || valor_quantity == "")
             valor_quantity = 1;
          var valor_rate = invoice.getSublistValue({sublistId:'item', fieldId:'rate', line:i}); // precio unitario item
          var valor_amount = invoice.getSublistValue({sublistId:'item', fieldId:'amount', line:i}); // precio total item (precio unitario item * cantidad)
          if(valor_amount == null || valor_amount == "")
             valor_amount = (valor_rate * valor_quantity);
          var valor_taxrate1 = invoice.getSublistValue({sublistId:'item', fieldId:'taxrate1', line:i}); // porcentaje impuesto aplicado
          var valor_tax1amt = invoice.getSublistValue({sublistId:'item', fieldId:'tax1amt', line:i}); // impuesto aplicado
          var valor_grossamt = invoice.getSublistValue({sublistId:'item', fieldId:'grossamt', line:i}); // (precio total item + impuesto aplicado)
          var valor_itemtype = invoice.getSublistValue({sublistId:'item', fieldId:'itemtype', line:i}); // itemtype
       */

	/*
	function fieldChanged(context)
  	{
      if(context.sublistId == 'item' && context.fieldId == 'amount')
      {
		var currentRecord = context.currentRecord;
		var sublist_amount = currentRecord.getCurrentSublistValue({sublistId:'item', fieldId:'amount'});
        console.log('sublist_amount: ' + sublist_amount);
        var sublist_description = currentRecord.getCurrentSublistValue({sublistId:'item', fieldId:'description'});
        console.log('sublist_description: ' + sublist_description);

        // HONORARIOS MICRO INJERTO DE CABELLO KHG
		if(sublist_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG")
        {
          if(sublist_amount < 63000)
          {
            currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'amount', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 63,000');
          }
          else
          {
            console.log('El precio ' + sublist_amount + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE BARBA COMPLETA KHG
		if(sublist_description == "PAQUETE BARBA COMPLETA KHG")
        {
          if(sublist_amount < 60000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'amount', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 60,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 60,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE BARBA DE CANDADO KHG
		if(sublist_description == "PAQUETE BARBA DE CANDADO KHG")
        {
          if(sublist_amount < 40000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'amount', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE BIGOTE KHG
		if(sublist_description == "PAQUETE BIGOTE KHG")
        {
          if(sublist_amount < 30000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'amount', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE DE CEJAS KHG
		if(sublist_description == "PAQUETE DE CEJAS KHG")
        {
          if(sublist_amount < 30000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'amount', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE PATILLA KHG
		if(sublist_description == "PAQUETE PATILLA KHG")
        {
          if(sublist_amount < 40000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'amount', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}
      }

      if(context.sublistId == 'item' && context.fieldId == 'custcol_precio_base_pesos')
      {
		var currentRecord = context.currentRecord;
		var sublist_precio_base = currentRecord.getCurrentSublistValue({sublistId:'item', fieldId:'custcol_precio_base_pesos'});
        console.log('sublist_precio_base: ' + sublist_precio_base);
        var sublist_description = currentRecord.getCurrentSublistValue({sublistId:'item', fieldId:'description'});
        console.log('sublist_description: ' + sublist_description);

        // HONORARIOS MICRO INJERTO DE CABELLO KHG
		if(sublist_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG")
        {
          if(sublist_precio_base < 63000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'custcol_precio_base_pesos', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 63,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 63,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE BARBA COMPLETA KHG
		if(sublist_description == "PAQUETE BARBA COMPLETA KHG")
        {
          if(sublist_precio_base < 60000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'custcol_precio_base_pesos', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 60,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 60,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE BARBA DE CANDADO KHG
		if(sublist_description == "PAQUETE BARBA DE CANDADO KHG")
        {
          if(sublist_precio_base < 40000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'custcol_precio_base_pesos', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE BIGOTE KHG
		if(sublist_description == "PAQUETE BIGOTE KHG")
        {
          if(sublist_precio_base < 30000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'custcol_precio_base_pesos', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE DE CEJAS KHG
		if(sublist_description == "PAQUETE DE CEJAS KHG")
        {
          if(sublist_precio_base < 30000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'custcol_precio_base_pesos', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 30,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}

        // PAQUETE PATILLA KHG
		if(sublist_description == "PAQUETE PATILLA KHG")
        {
          if(sublist_precio_base < 40000)
          {
			currentRecord.setCurrentSublistValue({sublistId:'item', fieldId:'custcol_precio_base_pesos', value:'0.00', ignoreFieldChange:true});
			currentRecord.commitLine({sublistId:'item'});
            console.log('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
            //alert('El precio de ' + sublist_description + ' no puede ser menor a 40,000');
          }
          else
          {
            console.log('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
            //alert('El precio ' + sublist_precio_base + ' asignado para ' + sublist_description + ' es correcto!!');
          }
		}
        
      }
	}

*/
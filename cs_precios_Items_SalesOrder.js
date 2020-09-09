/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record'],function(record){

    function saveRecord(context)
    {
      var trandate = context.currentRecord.getText({fieldId: 'trandate'});
      console.log('trandate: ' + trandate);
      if(trandate.indexOf("/") != -1)
      {
        var dateTest_split = trandate.split('/');
        var dateTest = dateTest_split[2] + '-' + dateTest_split[1] + '-' + dateTest_split[0];
        var resultDate = TDate(dateTest);
        console.log('resultDate: ' + resultDate);

        if(resultDate)
        {
          var precio_base_Message = "";
          var amount_Message = "";
          var currentRecord = context.currentRecord;
          var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
          if(item_Lines > 0)
          {
             for(var i = 0; i < item_Lines; i++)
             {
                currentRecord.selectLine({sublistId: "item", line: i});

                var current_quantity = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "quantity"});
                console.log('for loop ' + i + ' - current_quantity:' + current_quantity);

                var current_description = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
                console.log('for loop ' + i + ' - current_description:' + current_description);

                var current_precio_base = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "rate"});
                console.log('for loop ' + i + ' - current_precio_base:' + current_precio_base);

                var current_amount = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "amount"});
                console.log('for loop ' + i + ' - current_amount:' + current_amount);

                var amount_Aux = (current_quantity * current_precio_base).toFixed(2);
                console.log('for loop ' + i + ' - amount_Aux:' + amount_Aux);

                if((current_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG" || current_description == "PAQUETE BARBA COMPLETA KHG" || current_description == "PAQUETE BARBA DE CANDADO KHG" || current_description == "PAQUETE BIGOTE KHG" || current_description == "PAQUETE DE CEJAS KHG" || current_description == "PAQUETE PATILLA KHG") && (current_precio_base == null || current_precio_base == "" || current_precio_base == "0.00" || current_precio_base == 0 || current_precio_base < 0))
                {
                  console.log('current_precio_base es nulo, vacio, 0 o menor a 0');
                  alert('El campo Rate en los artículos no puede ser 0, vacio o negativo!!');
                  return false;

                }else if(current_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG"){
                  if(current_precio_base < 63000)
                  {
                    precio_base_Message += 'El campo Rate en ' + current_description + ' es incorrecto \n';
                    console.log('El campo Rate en ' + current_description + ' no puede ser menor a 63,000');
                  }
                  else
                  {
                    console.log('El valor Rate ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
                  }

                  if(current_amount != amount_Aux){
                     amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                     console.log('Amount es distinto al resultado de (quantity * rate) en: ' + current_description);
                  }

                }else if(current_description == "PAQUETE BARBA COMPLETA KHG"){
                  if(current_precio_base < 60000)
                  {
                    precio_base_Message += 'El campo Rate en ' + current_description + ' es incorrecto \n';
                    console.log('El campo Rate en ' + current_description + ' no puede ser menor a 60,000');
                  }
                  else
                  {
                    console.log('El valor Rate ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
                  }

                  if(current_amount != amount_Aux){
                     amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                     console.log('Amount es distinto al resultado de (quantity * rate) en: ' + current_description);
                  }

                }else if(current_description == "PAQUETE BARBA DE CANDADO KHG"){
                  if(current_precio_base < 40000)
                  {
                    precio_base_Message += 'El campo Rate en ' + current_description + ' es incorrecto \n';
                    console.log('El campo Rate en ' + current_description + ' no puede ser menor a 40,000');
                  }
                  else
                  {
                    console.log('El valor Rate ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
                  }

                  if(current_amount != amount_Aux){
                     amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                     console.log('Amount es distinto al resultado de (quantity * rate) en: ' + current_description);
                  }

                }else if(current_description == "PAQUETE BIGOTE KHG"){
                  if(current_precio_base < 30000)
                  {
                    precio_base_Message += 'El campo Rate en ' + current_description + ' es incorrecto \n';
                    console.log('El campo Rate en ' + current_description + ' no puede ser menor a 30,000');
                  }
                  else
                  {
                    console.log('El valor Rate ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
                  }

                  if(current_amount != amount_Aux){
                     amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                     console.log('Amount es distinto al resultado de (quantity * rate) en: ' + current_description);
                  }

                }else if(current_description == "PAQUETE DE CEJAS KHG"){
                  if(current_precio_base < 30000)
                  {
                    precio_base_Message += 'El campo Rate en ' + current_description + ' es incorrecto \n';
                    console.log('El campo Rate en ' + current_description + ' no puede ser menor a 30,000');
                  }
                  else
                  {
                    console.log('El valor Rate ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
                  }

                  if(current_amount != amount_Aux){
                     amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                     console.log('Amount es distinto al resultado de (quantity * rate) en: ' + current_description);
                  }

                }else if(current_description == "PAQUETE PATILLA KHG"){
                  if(current_precio_base < 40000)
                  {
                    precio_base_Message += 'El campo Rate en ' + current_description + ' es incorrecto \n';
                    console.log('El campo Rate en ' + current_description + ' no puede ser menor a 40,000');
                  }
                  else
                  {
                    console.log('El valor Rate ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
                  }

                  if(current_amount != amount_Aux){
                     amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                     console.log('Amount es distinto al resultado de (quantity * rate) en: ' + current_description);
                  }
                }
             }
          }
          else
          {
            console.log('item_Lines: ' + item_Lines);
            return false;
          }

          if(precio_base_Message != "" && precio_base_Message != null){
            alert(precio_base_Message);
            return false;
          }

          if(amount_Message != "" && amount_Message != null){
            alert(amount_Message);
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
      else
      {
        console.log("no hay fecha de creación!!");
      }
      return true;
    }

    function TDate(UserDate){
        if(new Date(UserDate).getTime() <= new Date('2019-11-15').getTime())
              return false;

        return true;
    }

    return{
      saveRecord:saveRecord
    };
});
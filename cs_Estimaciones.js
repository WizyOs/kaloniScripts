/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record'],function(record){

    function saveRecord(context)
    {
      var precio_base_Message = "";
      var amount_Message = "";
      var currentRecord = context.currentRecord;
      var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
      if(item_Lines > 0)
      {
         for(var i = 0; i < item_Lines; i++)
         {
            //var supervisor = context.currentRecord.getValue({fieldId: 'supervisor'});
		    currentRecord.selectLine({sublistId: "item", line: i});

            var current_quantity = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "quantity"});
            console.log('for loop ' + i + ' - current_quantity:' + current_quantity);

            var current_description = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
            console.log('for loop ' + i + ' - current_description:' + current_description);

            var current_precio_base = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "custcol_precio_base_pesos"});
            console.log('for loop ' + i + ' - current_precio_base:' + current_precio_base);

            var current_amount = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "amount"});
            console.log('for loop ' + i + ' - current_amount:' + current_amount);
           
            var amount_Aux = (current_quantity * current_precio_base).toFixed(2);
            console.log('for loop ' + i + ' - amount_Aux:' + amount_Aux);

            if((current_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG" || current_description == "PAQUETE BARBA COMPLETA KHG" || current_description == "PAQUETE BARBA DE CANDADO KHG" || current_description == "PAQUETE BIGOTE KHG" || current_description == "PAQUETE DE CEJAS KHG" || current_description == "PAQUETE PATILLA KHG") && (current_precio_base == null || current_precio_base == "" || current_precio_base == "0.00" || current_precio_base == 0 || current_precio_base < 0))
            {
              console.log('current_precio_base es nulo, vacio, 0 o menor a 0');
              alert('El precio base de los artículos no puede ser 0, vacio o negativo!!');
              return false;

            }else if(current_description == "HONORARIOS MICRO INJERTO DE CABELLO KHG"){
              if(current_precio_base < 63000)
              {
                precio_base_Message += 'El precio base de ' + current_description + ' es incorrecto \n';
                console.log('El precio base de ' + current_description + ' no puede ser menor a 63,000');
              }
              else
              {
                console.log('El precio base ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
              }

              if(current_amount != amount_Aux){
                 amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                 console.log('Amount es distinto al resultado de (quantity * precio base) en: ' + current_description);
              }

            }else if(current_description == "PAQUETE BARBA COMPLETA KHG"){
              if(current_precio_base < 60000)
              {
                precio_base_Message += 'El precio base de ' + current_description + ' es incorrecto \n';
                console.log('El precio base de ' + current_description + ' no puede ser menor a 60,000');
              }
              else
              {
                console.log('El precio base ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
              }

              if(current_amount != amount_Aux){
                 amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                 console.log('Amount es distinto al resultado de (quantity * precio base) en: ' + current_description);
              }

            }else if(current_description == "PAQUETE BARBA DE CANDADO KHG"){
              if(current_precio_base < 40000)
              {
                precio_base_Message += 'El precio base de ' + current_description + ' es incorrecto \n';
                console.log('El precio base de ' + current_description + ' no puede ser menor a 40,000');
              }
              else
              {
                console.log('El precio base ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
              }

              if(current_amount != amount_Aux){
                 amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                 console.log('Amount es distinto al resultado de (quantity * precio base) en: ' + current_description);
              }

            }else if(current_description == "PAQUETE BIGOTE KHG"){
              if(current_precio_base < 30000)
              {
                precio_base_Message += 'El precio base de ' + current_description + ' es incorrecto \n';
                console.log('El precio base de ' + current_description + ' no puede ser menor a 30,000');
              }
              else
              {
                console.log('El precio base ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
              }

              if(current_amount != amount_Aux){
                 amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                 console.log('Amount es distinto al resultado de (quantity * precio base) en: ' + current_description);
              }

            }else if(current_description == "PAQUETE DE CEJAS KHG"){
              if(current_precio_base < 30000)
              {
                precio_base_Message += 'El precio base de ' + current_description + ' es incorrecto \n';
                console.log('El precio base de ' + current_description + ' no puede ser menor a 30,000');
              }
              else
              {
                console.log('El precio base ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
              }

              if(current_amount != amount_Aux){
                 amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                 console.log('Amount es distinto al resultado de (quantity * precio base) en: ' + current_description);
              }

            }else if(current_description == "PAQUETE PATILLA KHG"){
              if(current_precio_base < 40000)
              {
                precio_base_Message += 'El precio base de ' + current_description + ' es incorrecto \n';
                console.log('El precio base de ' + current_description + ' no puede ser menor a 40,000');
              }
              else
              {
                console.log('El precio base ' + current_precio_base + ' asignado para ' + current_description + ' es correcto!!');
              }

              if(current_amount != amount_Aux){
                 amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                 console.log('Amount es distinto al resultado de (quantity * precio base) en: ' + current_description);
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

      return true;
    }

    return{
      saveRecord:saveRecord
    };
});
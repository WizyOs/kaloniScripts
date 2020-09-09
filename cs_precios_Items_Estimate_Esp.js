/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record'],function(record){
	var context_mode = null;
    var rate_base_Message = "";
    var amount_Message = "";

  	function pageInit(context)
	{
      context_mode = context.mode;
      console.log('pageInit context_mode: '+ context_mode);
    }

    function saveRecord(context)
    {
      var esMenor = null;
      console.log('saveRecord context_mode: '+ context_mode);
      if(context_mode != "create")
	  {
        var createddate = context.currentRecord.getText({fieldId: 'createddate'});
        console.log('createddate: ' + createddate);
        var dateTest_split = createddate.split('/');
        var dateTest = dateTest_split[2].substring(0, 4) + '-' + dateTest_split[1] + '-' + dateTest_split[0];
        console.log('dateTest: ' + dateTest);
        esMenor = TDate(dateTest);
        console.log('esMenor: ' + esMenor);
        if(esMenor)
        {
           console.log("La fecha de creación de la estimación fue antes que 2020-01-05");
           //return false;
        }
        else
        {
          var res = getResultado(context);
          if(res == false)
            return false;
        }
      }
      else
      {
        var res = getResultado(context);
        if(res == false)
          return false;
      }
      return true;
    }

    function TDate(UserDate){
        if(new Date(UserDate).getTime() < new Date('2020-01-05').getTime())
              return true;

        return false;
    }

    function getResultado(context){
      	  rate_base_Message = "";
          var subsidiary = context.currentRecord.getValue({fieldId: 'subsidiary'});
          if(subsidiary == "12")
          {
            var currentRecord = context.currentRecord;
            var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
            if(item_Lines > 0)
            {
               for(var i = 0; i < item_Lines; i++)
               {
                  currentRecord.selectLine({sublistId: "item", line: i});
                  var current_quantity = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "quantity"});
                  //console.log('for loop ' + i + ' - current_quantity:' + current_quantity);

                  var current_description = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
                  console.log('for loop ' + i + ' - current_description:' + current_description);

                  var current_precio_base = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "custcol_precio_base_pesos"});
                  //console.log('for loop ' + i + ' - current_precio_base:' + current_precio_base);

                  var current_rate = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "rate"});
                  console.log('for loop ' + i + ' - current_rate:' + current_rate);

                  var current_amount = currentRecord.getCurrentSublistValue({sublistId: "item", fieldId: "amount"});
                  //console.log('for loop ' + i + ' - current_amount:' + current_amount);

                  var amount_Aux = (current_quantity * current_precio_base).toFixed(2);
                  //console.log('for loop ' + i + ' - amount_Aux:' + amount_Aux);

                  if(current_description == "HONORARIOS MICRO INJERTO DE CABELLO ESP" && (current_rate == null || current_rate == "" || current_rate == "0.00" || current_rate == 0 || current_rate < 0))
                  {
                    console.log('current_rate es nulo, vacio, 0 o menor a 0');
                    alert('El campo RATE de ' + current_description + ' no puede ser 0, vacio o negativo!!');
                    return false;
                  }else if(current_description == "HONORARIOS MICRO INJERTO DE CABELLO ESP"){
                    if(current_rate < 3200)
                    {
                      rate_base_Message += 'El campo RATE de ' + current_description + ' es incorrecto \n';
                      console.log('El campo RATE de ' + current_description + ' no puede ser menor a 3,200');
                    }
                    else
                    {
                      console.log('El campo RATE ' + current_rate + ' asignado a ' + current_description + ' es correcto!!');
                      //return false;
                    }
                    /*if(current_amount != amount_Aux){
                       amount_Message += 'Amount es incorrecto en ' + current_description + ' \n';
                       console.log('Amount es distinto al resultado de (quantity * precio base) en: ' + current_description);
                    }*/
                  }
               }
            }
            else
            {
              console.log('No hay itmes: ' + item_Lines);
              return false;
            }

            if(rate_base_Message != "" && rate_base_Message != null){
              alert(rate_base_Message);
              return false;
            }

            if(amount_Message != "" && amount_Message != null){
              alert(amount_Message);
              return false;
            }
          }
        return true;
    }

    return{
      pageInit:pageInit,
      saveRecord:saveRecord
    };
});
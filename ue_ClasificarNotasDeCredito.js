/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope Public
 */
define(['N/record','N/search','N/log','N/format'], function(record,search,log,format) {
	var descriptionCurrentCreditMemo = [];

    var creditMemoId = null;
  	var recompra = false;
    var postventa = false;
    var clientesNuevos = false;
    var myDescriptions = {};

    function beforeLoad(context)
    {
      if(context.type == "view")
      {
        var currentRec = context.newRecord;
        var currentCreditMemoId = context.newRecord.id;
        var clasificacion = currentRec.getValue({fieldId: 'custbody74'});
        if(clasificacion == null || clasificacion == "")
        {
          var creditMemo_entityText = currentRec.getText({fieldId: 'entity'});
          var indexOfVal = creditMemo_entityText.indexOf("Publico en general");
          if(indexOfVal != -1)
          {
            recompra = true;
            var currentRecord = record.load({type: 'creditmemo', id: currentCreditMemoId, isDynamic: true});
            currentRecord.setValue({fieldId: "custbody74", value: 2});
            currentRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
            log.debug('Clasificación asignada:  ', 'Recompra');
          }
          else
          {
            var creditMemo_trandateText = currentRec.getText({fieldId: 'trandate'});
            log.debug("creditMemo_trandateText: ", creditMemo_trandateText);
            var creditMemo_trandateText_Split = creditMemo_trandateText.split('/');
            var dia_trandateText = creditMemo_trandateText_Split[0];
            var mes_trandateText = ('0' + creditMemo_trandateText_Split[1]).slice(-2);
            var anio_trandateText = creditMemo_trandateText_Split[2];
            var fechaText = anio_trandateText + "-" +  mes_trandateText + "-" + dia_trandateText;

            var dateMX = new Date();
            var mxCityDate = format.format({value: dateMX, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_MEXICO_CITY});
            log.debug("mxCityDate: ", mxCityDate); // 21/8/2019 5:15:05 pm
            var mxCityDate_Split = mxCityDate.split('/');
            var dia_MX = mxCityDate_Split[0];
            var mes_MX = ('0' + mxCityDate_Split[1]).slice(-2);
            var anio_MX = mxCityDate_Split[2].substring(0, 4);
            var fechaMX = anio_MX + "-" +  mes_MX + "-" + dia_MX;
            log.debug("fechaText vs fechaMX: ", fechaText.substring(0, 7) +" vs "+ fechaMX.substring(0, 7)); // 21/8/2019 5:15:05 pm

            if(fechaText.substring(0, 7) == fechaMX.substring(0, 7))
            {
                var currentRecord = record.load({type: 'creditmemo', id: currentCreditMemoId, isDynamic: true});
                var Idcliente = currentRecord.getValue({fieldId: 'entity'});

                var item_Lines1 = currentRecord.getLineCount({sublistId : 'item'});
                if(item_Lines1 > 0)
                {
                  for (var n = 0; n < item_Lines1; n++)
                  {
                     var currentRec_item_Description = currentRecord.getSublistValue({sublistId:'item', fieldId:'description', line:n});
                     log.debug("currentRec_item_Description: ", currentRec_item_Description);
                     myDescriptions[currentRec_item_Description] = 'notFound';
                  }
                }

              if(isEmpty(myDescriptions) == false)
              {
                var arrayCreditMemoIds = [];
                search.create({
                      type: search.Type.CREDIT_MEMO,
                      filters: [search.createFilter({name: 'entity', operator: search.Operator.IS, values: [Idcliente]})],
                      columns: ['internalid', 'tranid']
                }).run().each(function(result){
                      //var jsonString = JSON.stringify(result);	var obj = JSON.parse(jsonString);
                      creditMemoId = result.getValue({name: 'internalid'});
                      var existIdCreditMemo = arrayCreditMemoIds.filter(checkID);
                      if(existIdCreditMemo == null || existIdCreditMemo == "")
                      {
                        var tranId = result.getValue({name: 'tranid'});
                        if(currentCreditMemoId != creditMemoId)
                        {
                          log.debug('CreditMemo ID added to arrayCreditMemoIds: ', creditMemoId + " (" + tranId + ")");
                          arrayCreditMemoIds.push(creditMemoId);
                        }
                      }
                      else
                      {
                        //log.debug('arrayCreditMemoIds ya tiene CreditMemo ID:  ', existIdCreditMemo);
                      }
                      return true;
                });

                if(arrayCreditMemoIds.length > 0)
                {
                  for(var x = 0; x < arrayCreditMemoIds.length; x++)
                  {
                  	  var notFound_Val = false;
					  for(var key in myDescriptions)
                      {
                          if(myDescriptions[key] === "notFound")
                          {
                          	log.debug('myDescriptions: ', key + ' | ' + myDescriptions[key]);
                            notFound_Val = true;
                            break;
                          }
                      }
                      if(notFound_Val)
                      {
                        log.debug('Estoy en Nota de crédito No.:  ', x + ', consultada en el bucle!!');
                        var notaCreditoId = arrayCreditMemoIds[x];
                        var recordCreditMemo = record.load({type: 'creditmemo', id: notaCreditoId, isDynamic: true});
                        var item_Lines = recordCreditMemo.getLineCount({sublistId : 'item'});
                        if(item_Lines > 0)
                        {
                           for (var i = 0; i < item_Lines; i++)
                           {
                               var item_Description = recordCreditMemo.getSublistValue({sublistId:'item', fieldId:'description', line:i});
                               if(myDescriptions.hasOwnProperty(item_Description))
                               {
                                 log.debug('CreditMemo ID: ' + notaCreditoId, 'El cliente ya ha comprado este producto o servicio: ' + item_Description);
                                 myDescriptions[item_Description] = "found";
                                 log.debug('myDescriptions change to found: ', myDescriptions[item_Description]);
                               }
                               else
                               {
                                 log.debug('CreditMemo ID: ' + notaCreditoId, "El cliente no ha comprado este producto o servicio: " + item_Description);
                               }
                           }
                        }
                      }
                      else
                      {
                        break;
                      }
                  }

				  for(var key in myDescriptions)
                  {
                     if(myDescriptions[key] === "notFound")
                     {
                      	log.debug('definitivo notFound in myDescriptions: ', key + ' - ' + myDescriptions[key]);
                        postventa = true;
                        break;
                     }
                  }
                  if(postventa == false)
                     recompra = true;
                }
                else
                {
                  clientesNuevos = true;
                  log.debug('Cliente nuevo:  ', 'No se encontraron IDs de Nota de crédito para este cliente en arrayCreditMemoIds Array!!');
                }

                if(postventa == true && recompra == false && clientesNuevos == false)
                {
                  currentRecord.setValue({fieldId: "custbody74", value: 3});
                  currentRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
                  log.debug('Clasificación asignada:  ', 'Postventa');
                }else if(recompra == true && postventa == false && clientesNuevos == false){
                  currentRecord.setValue({fieldId: "custbody74", value: 2});
                  currentRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
                  log.debug('Clasificación asignada:  ', 'Recompra');
                }else if(clientesNuevos == true && recompra == false && postventa == false){
                  currentRecord.setValue({fieldId: "custbody74", value: 1});
                  currentRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
                  log.debug('Clasificación asignada:  ', 'Clientes nuevos');
                }else{
                  log.debug("Nota de Crédito no clasificada: ", "La Nota de Crédito no cumple con ninguna clasificación!! (postventa, recompra o clientesNuevos)");
                }
              }
              else
              {
                log.debug("Artículos ", "No hay artículos en la Nota de Crédito actual, Por lo tanto no se puede comparar con Notas de Crédito anteriores!!");
              }
            }
            else
            {
              log.debug("fechaText vs fechaMX: ", "diferente mes y año, ya no se pueden editar Notas de Crédito de meses pasados!!");
            }
          }
        }
        else
        {
          log.debug("Ya se clasificó esta Nota de Crédito: ", clasificacion);
        }
      }
    }

    function checkID(id)
    {
	    return id == creditMemoId;
  	}

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    return {
        beforeLoad: beforeLoad
    };
});
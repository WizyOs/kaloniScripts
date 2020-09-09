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
      var currentRecord = context.currentRecord;
      var doctorProcedimiento = currentRecord.getText({fieldId: 'custbody15'});
      log.debug('doctorProcedimiento: ', doctorProcedimiento);
      doctorProcedimiento = doctorProcedimiento.trim();
      log.debug('doctorProcedimiento Trim(): ', doctorProcedimiento);

      if(doctorProcedimiento == "Cierre Paquetes" || doctorProcedimiento == "Abono Paquete")
      {
          log.debug('if: ', '1');
          var itemsVal = "";
          var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
          if(item_Lines > 0)
          {
             for(var i = 0; i < item_Lines; i++)
             {
                currentRecord.selectLine({sublistId: "item", line: i});
                //log.debug('itemInfo: ', itemInfo);
                var current_concepto = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
                log.debug('current_concepto: ', current_concepto);
                current_concepto = current_concepto.trim();

				if(current_concepto != "ANTICIPO MANTENIMIENTO INTENSIVO STO" && current_concepto != "ANTICIPO MANTENIMIENTO PREVENTIVO COL" && current_concepto != "ANTICIPO MANTENIMIENTO PREVENTIVO ESP" && current_concepto != "ANTICIPO MANTENIMIENTO PREVENTIVO KHG" && current_concepto != "ANTICIPO MANTENIMIENTO PREVENTIVO STO" && current_concepto != "ANTICIPO MANTENIMIENTO PREVENTIVO BR" && current_concepto != "ANTICIPO TRATAMIENTO INTENSIVO BR" && current_concepto != "ANTICIPO TRATAMIENTO INTENSIVO COL" && current_concepto != "ANTICIPO TRATAMIENTO INTENSIVO ESP" && current_concepto != "ANTICIPO TRATAMIENTO INTENSIVO KHG" && current_concepto != "ANTICIPO TRATAMIENTO INTENSIVO STO")
                {
                   log.debug('current_concepto no valido: ', current_concepto);
                   itemsVal += current_concepto + " \n";
                }
              }

			  if(itemsVal != ""){
                 log.debug('Los artículos no corresponden con el Doctor Procedimiento, favor de validar. ', itemsVal);
                 alert('Los artículos no corresponden con el Doctor Procedimiento, favor de validar.' + itemsVal);
                 return false;
              }
          }
          else
          {
             alert('No hay artículos, favor de validar.');
             return false;
          }
      }else if(doctorProcedimiento == "Cierre Procedimiento Pagado" || doctorProcedimiento == "Procedimiento Pagado" || doctorProcedimiento == "Cierre Anticipo" || doctorProcedimiento == "Abono-Anticipo"){
           log.debug('else if: ', '2');
           var itemsVal = "";
           var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
           if(item_Lines > 0)
           {
              for(var i = 0; i < item_Lines; i++)
              {
                 currentRecord.selectLine({sublistId: "item", line: i});
                 //log.debug('itemInfo: ', itemInfo);
                 var current_concepto = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
			     log.debug('current_concepto: ', current_concepto);
                 current_concepto = current_concepto.trim();

                 if(current_concepto != "ANTICIPO MICRO INJERTO  KHG" && current_concepto != "ANTICIPO MICRO INJERTO KHG" && current_concepto != "ANTICIPO MICRO INJERTO  COL" && current_concepto != "ANTICIPO MICRO INJERTO COL" && current_concepto != "ANTICIPO MICRO INJERTO  ESP" && current_concepto != "ANTICIPO MICRO INJERTO ESP" && current_concepto != "ANTICIPO MICRO INJERTO  BR" && current_concepto != "ANTICIPO MICRO INJERTO BR" && current_concepto != "ANTICIPO MICRO INJERTO  USA" && current_concepto != "ANTICIPO MICRO INJERTO USA" && current_concepto != "ANTICIPO MICRO INJERTO  STO" && current_concepto != "ANTICIPO MICRO INJERTO STO")
                 {
                    log.debug('current_concepto no valido: ', current_concepto);
                    itemsVal += current_concepto + " \n";
                 }
               }

               if(itemsVal != ""){
                 log.debug('Los artículos no corresponden con el Doctor Procedimiento, favor de validar. ', itemsVal);
                 alert('Los artículos no corresponden con el Doctor Procedimiento, favor de validar.' + itemsVal);
                 return false;
               }
           }
           else
           {
              alert('No hay artículos, favor de validar.');
              return false;
           }
      }else if(doctorProcedimiento == "Adriana Lilia Ochoa Cortés" || doctorProcedimiento == "Andrea Alvarez" || doctorProcedimiento == "Antonio Aguilar Ceballos" || doctorProcedimiento == "Cristina Sanoja" || doctorProcedimiento == "Cristian de Jesus Clemente" || doctorProcedimiento == "Dr. Edison Alexander  Buitrago Gonzalez" || doctorProcedimiento == "Edward Castrillon" || doctorProcedimiento == "Erick Rene Ruiz Velázquez" || doctorProcedimiento == "Erika Camarena Novelo" || doctorProcedimiento == "Erika  Camarena Novelo" || doctorProcedimiento == "Gabriela Daranee Peña Ruiz de Chavez" || doctorProcedimiento == "Intercambio" || doctorProcedimiento == "Isai Francisco Morales Mendoza" || doctorProcedimiento == "Itzel Salvador" || doctorProcedimiento == "Ivan Raul Solano Perez" || doctorProcedimiento == "Johan Stevens walker Vasco" || doctorProcedimiento == "Jonathan Villanueva Fayad" || doctorProcedimiento == "Jorge Luis Guerrero Gallegos" || doctorProcedimiento == "Jose Francisco Hernandez" || doctorProcedimiento == "Jose Ivan Vazquez Aguilar" || doctorProcedimiento == "Jose Roberto Avila Avila" || doctorProcedimiento == "Juana Sofia Diaz Orozco" || doctorProcedimiento == "Keyla Flores perez" || doctorProcedimiento == "Lazaro Rivera Quiñonez khg" || doctorProcedimiento == "Loredana Gabriela Pop" || doctorProcedimiento == "Luis Fernando Guerrero Navarrete" || doctorProcedimiento == "Medicos Injerto" || doctorProcedimiento == "Paola  Stefania Nuñez Avila" || doctorProcedimiento == "Practicas" || doctorProcedimiento == "Raul Barcelo Iñiguez" || doctorProcedimiento == "Refacturacion" || doctorProcedimiento == "Referido" || doctorProcedimiento == "Retoque" || doctorProcedimiento == "Scarlett Soto Velazco"){
           log.debug('else if: ', '3');
           var itemsVal = "";
           var item_Lines = currentRecord.getLineCount({sublistId : 'item'});
           if(item_Lines > 0)
           {
              for(var i = 0; i < item_Lines; i++)
              {
                 currentRecord.selectLine({sublistId: "item", line: i});
                 //log.debug('itemInfo: ', itemInfo);
                 var current_concepto = currentRecord.getCurrentSublistText({sublistId: "item", fieldId: "description"});
			     log.debug('current_concepto: ', current_concepto);
                 current_concepto = current_concepto.trim();

                 if(current_concepto != "HONORARIOS MICRO INJERTO DE CABELLO BR" && current_concepto != "HONORARIOS MICRO INJERTO DE CABELLO ESP" && current_concepto != "HONORARIOS MICRO INJERTO DE CABELLO KHG" && current_concepto != "HONORARIOS MICRO INJERTO DE CABELLO STO" && current_concepto != "HONORARIOS MICROINJERTO DE CABELLO COL" && current_concepto != "DESCUENTO ANTICIPO MICRO INJERTO  COL" && current_concepto != "DESCUENTO ANTICIPO MICRO INJERTO  ESP" && current_concepto != "DESCUENTO ANTICIPO MICRO INJERTO  BR" && current_concepto != "DESCUENTO ANTICIPO MICRO INJERTO BR" && current_concepto != "DESCUENTO ANTICIPO MICRO INJERTO STO" && current_concepto != "DESCUENTO ANTICIPO INJERTO" && current_concepto != "PAQUETE BARBA BR" && current_concepto != "PAQUETE BARBA COL" && current_concepto != "PAQUETE BARBA COMPLETA KHG" && current_concepto != "PAQUETE BARBA COMPLETA STO" && current_concepto != "PAQUETE BARBA DE CANDADO KHG" && current_concepto != "PAQUETE BARBA DE CANDADO STO" && current_concepto != "PAQUETE BARBA ESP" && current_concepto != "PAQUETE CEJAS COL" && current_concepto != "PAQUETE CEJAS ESP" && current_concepto != "PAQUETE DE CEJA BR" && current_concepto != "PAQUETE DE CEJAS KHG" && current_concepto != "PAQUETE BIGOTE BR" && current_concepto != "PAQUETE BIGOTE COL" && current_concepto != "PAQUETE BIGOTE KHG" && current_concepto != "PAQUETE BIGOTE STO" && current_concepto != "FOLICULOS EXTRAS KHG" && current_concepto != "PAQUETE PATILLA KHG" && current_concepto != "PAQUETE PATILLA COL")
                 {
                    log.debug('current_concepto no valido: ', current_concepto);
                    itemsVal += current_concepto + " \n";
                 }
               }

               if(itemsVal != ""){
                 log.debug('Los artículos no corresponden con el Doctor Procedimiento, favor de validar. ', itemsVal);
                 alert('Los artículos no corresponden con el Doctor Procedimiento, favor de validar.' + itemsVal);
                 return false;
               }
           }
           else
           {
              alert('No hay artículos, favor de validar.');
              return false;
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
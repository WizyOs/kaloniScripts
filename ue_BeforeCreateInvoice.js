	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope SameAccount
	*/
define(['N/record', 'N/ui/serverWidget'], function(record,serverWidget) {

    function beforeLoad(context)
  	{
        // Condition that will run the codes only on Creation.
        if(context.type == 'create')
        {
            var currentRecord = context.newRecord;
        	var createdfrom = currentRecord.getValue({fieldId: 'createdfrom'});

            /*var cliente = record.load({type: 'customer', id: companyId});
            var subsidiary = cliente.getValue({fieldId: 'subsidiary'});
            if(subsidiary == "6"){}*/
          	if(createdfrom)
            {
               if(createdfrom === "")
               {
                 log.error('createdfrom: ', 'createdfrom es una cadena vacia!!');
               }
               else{
 				  var num = tryParseInt(createdfrom, null);
                  if(num !== null)
                  {
                    var recordSaleOrder = record.load({type: 'salesorder', id: createdfrom, isDynamic: true});
                    var descriptionAgujas = false;
                    var descriptionHonoraios = false;
                    var itemtype_Inventory = false;
                    var item_Lines = recordSaleOrder.getLineCount({sublistId : 'item'});
                    if(item_Lines > 0)
                    {
                       for (var i = 0; i < item_Lines; i++)
                       {
                           var item_Description = recordSaleOrder.getSublistValue({sublistId:'item', fieldId:'description', line:i});
                           log.error("Item description: ", item_Description);
                           try{
                             if(item_Description.indexOf("HONORARIOS") !== -1)
                                descriptionHonoraios = true;
                             if(item_Description.indexOf("AGUJAS") !== -1)
                                descriptionAgujas = true;
                           }catch(e){
                             log.error("Exception: ", e);
                           }
                           var val_itemtype = recordSaleOrder.getSublistValue({sublistId:'item', fieldId:'itemtype', line:i});
                           if(val_itemtype == "InvtPart")
                              itemtype_Inventory = true;
                       }
                    }

                    var links_linktype = false;
                    var links_status = false;
                    var links_type = false;
                    var links_Lines = recordSaleOrder.getLineCount({sublistId : 'links'});
                    if(links_Lines > 0)
                    {
                       for (var j = 0; j < links_Lines; j++)
                       {
                           var item_linktype = recordSaleOrder.getSublistValue({sublistId:'links', fieldId:'linktype', line:j});
                           log.error("item_linktype: ", item_linktype);
                           if(item_linktype == "Receipt/Fulfillment" || item_linktype == "Recepción/Ejecución de pedido")
                              links_linktype = true;
                           var item_status = recordSaleOrder.getSublistValue({sublistId:'links', fieldId:'status', line:j});
                           log.error("item_status: ", item_status);
                           if(item_status == "Shipped" || item_status == "Enviado")
                              links_status = true;
                           var item_type = recordSaleOrder.getSublistValue({sublistId:'links', fieldId:'type', line:j});
                           log.error("item_type: ", item_type);
                           if(item_type == "Item Fulfillment" || item_type == "Ejecución de pedido de artículo" || item_type == "Despacho de Mercaderia")
                              links_type = true;
                       }
                    }

                    if(descriptionHonoraios == true && descriptionAgujas == true && links_linktype == false && links_status == false && links_type == false)
                    {
                        //context.form.removeButton('_cancel'); // btn_multibutton_submitter
                        //context.form.getButton('custpage_pdfStoDo_button_view').updateDisplayType({displayType:'disabled'});
                        var currentForm = context.form;
                        var statusHonorarios = currentForm.addField({id: 'custpage_statushonorarios', label: 'statusHonorarios', type: 'inlinehtml'});
                        statusHonorarios.defaultValue = '<input id="statusHonorarios" name="statusHonorarios" type="hidden" value="hideSaveButton">';

                        var html = '<script>alert("No puedes guardar la factura mientras no quites las AGUJAS del inventario!!");</script>';
                        var field = currentForm.addField({
                            id: "custpage_alertonview_inventory",
                            label: "Inventory",
                            type: serverWidget.FieldType.INLINEHTML,
                        });

                        field.defaultValue = html;
                    }else if(descriptionHonoraios == true && descriptionAgujas == false && itemtype_Inventory == false){
                        var currentForm = context.form;
                        var statusHonorarios = currentForm.addField({id: 'custpage_statushonorarios', label: 'statusHonorarios', type: 'inlinehtml'});
                        statusHonorarios.defaultValue = '<input id="statusHonorarios" name="statusHonorarios" type="hidden" value="">';
                    }else{
                        var currentForm = context.form;
                        var statusHonorarios = currentForm.addField({id: 'custpage_statushonorarios', label: 'statusHonorarios', type: 'inlinehtml'});
                        statusHonorarios.defaultValue = '<input id="statusHonorarios" name="statusHonorarios" type="hidden" value="">';
                    }
                  }
               }
            }
          	else{
              log.error('createdfrom: ', 'createdfrom sin valor!!');
            }
        }
    }

    function tryParseInt(str,defaultValue) {
       var retValue = defaultValue;
       if(str !== null) {
           var n = str.length;
           if(n > 0) {
               if (!isNaN(str)) {
                   retValue = parseInt(str);
               }
           }
       }
       return retValue;
  }

    return {
        beforeLoad: beforeLoad
    }
});
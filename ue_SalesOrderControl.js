	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
define(['N/record', 'N/file', 'N/ui/serverWidget'], function(record, file, serverWidget) {

   function beforeLoad(context)
   {
     if(context.type == "view")
     {
        var saleOrderId = context.newRecord.id;
    	var recordSaleOrder = record.load({type: 'salesorder', id: saleOrderId, isDynamic: true});
        //var field_casenumber = objRecord.getValue({fieldId: 'casenumber'});

        var itemtype_Inventory = false;
       	var itemDesc_Honoraios = false;
		var item_Lines = recordSaleOrder.getLineCount({sublistId : 'item'});
        if(item_Lines > 0)
        {
           for (var i = 0; i < item_Lines; i++)
           {
               var item_Description = recordSaleOrder.getSublistValue({sublistId:'item', fieldId:'description', line:i});
               log.error("Item description: ", item_Description);
               try{
                  if(item_Description.indexOf("HONORARIOS") !== -1)
                  	itemDesc_Honoraios = true;
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

        // Si articulos trae producto del inventario y trae honorarios y no hay registros relacionados enviados
        if(itemtype_Inventory == true && itemDesc_Honoraios == true && links_linktype == false && links_status == false && links_type == false)
        {
            context.form.removeButton('nextbill');
            context.form.removeButton('billremaining');
          	var currentForm = context.form;

            var html = '<script>';
                      html += 'require([\'N/ui/message\'], function (message){';
                          html += 'var onViewMessage = message.create({';
                          html += 'title: \'Producto de Inventario \', ';
                          html += 'message: \' Los productos de esta orden de venta deben ser descontados del inventario!! <br/> Presiona el botón "Completar". \', ';
                          html += 'type: message.Type.INFORMATION';
                          html += '}); ';
                      html += 'onViewMessage.show(10000);';
                      html += '})';
                  html += '</script>';

                  var field = currentForm.addField({
                      id: "custpage_alertonview_inventory",
                      label: "Inventory",
                      type: serverWidget.FieldType.INLINEHTML,
                  });

              field.defaultValue = html;
        }

     }
   }
		return {
        beforeLoad: beforeLoad
		};
});

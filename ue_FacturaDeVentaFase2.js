/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/ui/serverWidget','N/log'], function(record,serverWidget,log) {
	var descriptionCurrentInvoice = [];

    var invoiceId = null;

    function beforeLoad(context)
    {
      if(context.type == "view")
      {
        var currentRec = context.newRecord;
        var currentInvoiceId = context.newRecord.id;
        //var invoice_entityText = currentRec.getText({fieldId: 'entity'});

        var tipoOperacion = context.form.getField({id: 'custbody77'}).defaultValue;
        log.debug('tipoOperacion: ', tipoOperacion);
        var metodoDePago = context.form.getField({id: 'custbody96'}).defaultValue;
        log.debug('metodoDePago: ', metodoDePago);
        var medioDePago = context.form.getField({id: 'custbody97'}).defaultValue;
        log.debug('medioDePago: ', medioDePago);
        var status = context.form.getField({id: 'custbody136'}).defaultValue;
        log.debug('status: ', status);
        var tipoDeIdentificacion = context.form.getField({id: 'custbody78'}).defaultValue;
        log.debug('tipoDeIdentificacion: ', tipoDeIdentificacion);
        var identificacion = context.form.getField({id: 'custbody79'}).defaultValue;
        log.debug('identificacion: ', identificacion);
        var razonSocial = context.form.getField({id: 'custbody80'}).defaultValue;
        log.debug('razonSocial: ', razonSocial);
        var nombreComercial = context.form.getField({id: 'custbody81'}).defaultValue;
        log.debug('nombreComercial: ', nombreComercial);
        var tipoDeOrganizacion = context.form.getField({id: 'custbody82'}).defaultValue;
        log.debug('tipoDeOrganizacion: ', tipoDeOrganizacion);
        var departamento = context.form.getField({id: 'custbody83'}).defaultValue;
        log.debug('departamento: ', departamento);
        var municipio = context.form.getField({id: 'custbody84'}).defaultValue;
        log.debug('municipio: ', municipio);
        var direccion = context.form.getField({id: 'custbody85'}).defaultValue;
        log.debug('direccion: ', direccion);
        var regimen = context.form.getField({id: 'custbody86'}).defaultValue;
        log.debug('regimen: ', regimen);
        var email = context.form.getField({id: 'custbody87'}).defaultValue;
        log.debug('email: ', email);
        var telefono = context.form.getField({id: 'custbody88'}).defaultValue;
        log.debug('telefono: ', telefono);
        var codigoPostal = context.form.getField({id: 'custbody89'}).defaultValue;
        log.debug('codigoPostal: ', codigoPostal);
        var obligacionesDelContribuyente = context.form.getField({id: 'custbody90'}).defaultValue;
        log.debug('obligacionesDelContribuyente: ', obligacionesDelContribuyente);
        var detallesTributarios = context.form.getField({id: 'custbody93'}).defaultValue;
        log.debug('detallesTributarios: ', detallesTributarios);

        var subsidiary = context.form.getField({id: 'subsidiary'}).defaultValue;
        log.debug('subsidiary: ', subsidiary);

        if(status != "Documento Autorizado" && subsidiary == "10")
        {
          if(tipoOperacion != null && tipoOperacion != "" && metodoDePago != null && metodoDePago != "" && medioDePago != null && medioDePago != "" && tipoDeIdentificacion != null && tipoDeIdentificacion != "" && identificacion != null && identificacion != "" && razonSocial != null && razonSocial != "" && nombreComercial != null && nombreComercial != "" && tipoDeOrganizacion != null && tipoDeOrganizacion != "" && departamento != null && departamento != "" && municipio != null && municipio != "" && direccion != null && direccion != "" && regimen != null && regimen != "" && email != null && email != "" && telefono != null && telefono != "" && codigoPostal != null && codigoPostal != "" && obligacionesDelContribuyente != null && obligacionesDelContribuyente != "" && detallesTributarios != null && detallesTributarios != "")
          {
            context.form.clientScriptFileId = 2331136;
            context.form.addButton({id:'custpage_button_facturafase2', label:'FV CO (Fase 2)', functionName:'testFunction'});
          }
          else
          {
             var currentForm = context.form;

                  var html = '<script>';
                      html += 'require([\'N/ui/message\'], function (message){';
                          html += 'var onViewMessage = message.create({';
                          html += 'title: \'Factura de Venta Colombia (Fase 2)  \', ';
                          html += 'message: \'Los campos de la sección: "Facturación Electrónica F2" deben ir llenos!! \', ';
                          html += 'type: message.Type.INFORMATION';
                          html += '}); ';
                      html += 'onViewMessage.show(10000);';
                      html += '})';
                  html += '</script>';

                  var field = currentForm.addField({
                      id: "custpage_alertonview_preimg",
                      label: "PRE-IMG",
                      type: serverWidget.FieldType.INLINEHTML,
                  });

              field.defaultValue = html;
          }
        }
      }
    }

    function checkID(id)
    {
	    return id == invoiceId;
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

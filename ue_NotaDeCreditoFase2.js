/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record','N/log','N/ui/serverWidget'], function(record,log,serverWidget) {

    function beforeLoad(context)
    {
      if(context.type == "view")
      {
        var currentRec = context.newRecord;
        var currentInvoiceId = context.newRecord.id;
        //var invoice_entityText = currentRec.getText({fieldId: 'entity'});

        var motivoDelaNC = context.form.getField({id: 'custbody98'}).defaultValue;
        log.debug('motivoDelaNC: ', motivoDelaNC);
        var metodoDePago = context.form.getField({id: 'custbody150'}).defaultValue;
        log.debug('metodoDePago: ', metodoDePago);
        var medioDePago = context.form.getField({id: 'custbody151'}).defaultValue;
        log.debug('medioDePago: ', medioDePago);
        var status = context.form.getField({id: 'custbody152'}).defaultValue;
        log.debug('status: ', status);
        var tipoIdentificacion = context.form.getField({id: 'custbody113'}).defaultValue;
        log.debug('tipoIdentificacion: ', tipoIdentificacion);
        var identificacion = context.form.getField({id: 'custbody114'}).defaultValue;
        log.debug('identificacion: ', identificacion);
        var razonSocial = context.form.getField({id: 'custbody115'}).defaultValue;
        log.debug('razonSocial: ', razonSocial);
        var nombreComercial = context.form.getField({id: 'custbody116'}).defaultValue;
        log.debug('nombreComercial: ', nombreComercial);
        var tipoDeOrganizacion = context.form.getField({id: 'custbody117'}).defaultValue;
        log.debug('tipoDeOrganizacion: ', tipoDeOrganizacion);
        var departamento = context.form.getField({id: 'custbody118'}).defaultValue;
        log.debug('departamento: ', departamento);
        var municipio = context.form.getField({id: 'custbody119'}).defaultValue;
        log.debug('municipio: ', municipio);
        var direccion = context.form.getField({id: 'custbody120'}).defaultValue;
        log.debug('direccion: ', direccion);
        var regimen = context.form.getField({id: 'custbody121'}).defaultValue;
        log.debug('regimen: ', regimen);
        var email = context.form.getField({id: 'custbody122'}).defaultValue;
        log.debug('email: ', email);
        var telefono = context.form.getField({id: 'custbody123'}).defaultValue;
        log.debug('telefono: ', telefono);
        var codigoPostal = context.form.getField({id: 'custbody124'}).defaultValue;
        log.debug('codigoPostal: ', codigoPostal);
        var obligacionesDelContribuyente = context.form.getField({id: 'custbody125'}).defaultValue;
        log.debug('obligacionesDelContribuyente: ', obligacionesDelContribuyente);
        var detallesTributarios = context.form.getField({id: 'custbody128'}).defaultValue;
        log.debug('detallesTributarios: ', detallesTributarios);
        var secuencialDocSustento = context.form.getField({id: 'custbody146'}).defaultValue;
        log.debug('secuencialDocSustento: ', secuencialDocSustento);
        var cufe = context.form.getField({id: 'custbody147'}).defaultValue;
        log.debug('cufe: ', cufe);
        var fechaDocSustento = context.form.getField({id: 'custbody148'}).defaultValue;
        log.debug('fechaDocSustento: ', fechaDocSustento);
        var descripcionDelMonto = context.form.getField({id: 'custbody149'}).defaultValue;
        log.debug('descripcionDelMonto: ', descripcionDelMonto);

        var subsidiary = context.form.getField({id: 'subsidiary'}).defaultValue;
        log.debug('subsidiary: ', subsidiary);

		if(status != "Documento Autorizado" && subsidiary == "10")
        {
          if(motivoDelaNC != null && motivoDelaNC != "" && metodoDePago != null && metodoDePago != "" && medioDePago != null && medioDePago != "" && tipoIdentificacion != null && tipoIdentificacion != "" && identificacion != null && identificacion != "" && razonSocial != null && razonSocial != "" && nombreComercial != null && nombreComercial != "" && tipoDeOrganizacion != null && tipoDeOrganizacion != "" && departamento != null && departamento != "" && municipio != null && municipio != "" && direccion != null && direccion != "" && regimen != null && regimen != "" && email != null && email != "" && telefono != null && telefono != "" && codigoPostal != null && codigoPostal != "" && obligacionesDelContribuyente != null && obligacionesDelContribuyente != "" && detallesTributarios != null && detallesTributarios != "" && secuencialDocSustento != null && secuencialDocSustento != "" && cufe != null && cufe != "" && fechaDocSustento != null && fechaDocSustento != "" && descripcionDelMonto != null && descripcionDelMonto != "")
          {
            context.form.clientScriptFileId = 2482107;
            context.form.addButton({id:'custpage_button_creditmemofase2', label:'NC CO (Fase 2)', functionName:'testFunction'});
          }
          else
          {
             var currentForm = context.form;

                  var html = '<script>';
                      html += 'require([\'N/ui/message\'], function (message){';
                          html += 'var onViewMessage = message.create({';
                          html += 'title: \'Nota de Crédito Colombia (Fase 2)  \', ';
                          html += 'message: \'Los campos de la sección: "Nota de Crédito F2" deben ir llenos!! \', ';
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

    return {
        beforeLoad: beforeLoad
    };
});

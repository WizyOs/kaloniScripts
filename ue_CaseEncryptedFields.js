	/**
	* @NApiVersion 2.x
	* @NScriptType UserEventScript
	* @NModuleScope Public
	*/
	define(['N/record', 'N/runtime', 'N/encode'], function(record, runtime, encode) {

   function beforeLoad(context) {
     if(context.type == "edit")
     {
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false});
        var customform_id = objRecord.getValue({fieldId: 'customform'});
        var userObj = runtime.getCurrentUser();
        if(userObj.role == "1139" || userObj.role == "1094") // 1097 = OSS Contabilidad KHG
        {
           if(customform_id == "14") // 14 = atención a cliente injerto
           {
              // ********************************** Primary Information
              var val_CUSTOM_FORM  = objRecord.getText({fieldId: 'customform'});
              if(val_CUSTOM_FORM != null && val_CUSTOM_FORM != "")
              {
                context.form.getField('customform').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent350').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent350').updateDisplayType({displayType:'disabled'});
              }
              var val_casenumber = objRecord.getValue({fieldId: 'casenumber'});
              if(val_casenumber != null && val_casenumber != "")
              {
                context.form.getField('casenumber').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent342').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent342').updateDisplayType({displayType:'disabled'});
              }
              var val_title = objRecord.getValue({fieldId: 'title'});
              if(val_title != null && val_title != "")
              {
                context.form.getField('title').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent343').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent343').updateDisplayType({displayType:'disabled'});
              }
              var val_company = objRecord.getText({fieldId: 'company'});
              if(val_company != null && val_company != "")
              {
                context.form.getField('company').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent344').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent344').updateDisplayType({displayType:'disabled'});
              }
              var val_status = objRecord.getText({fieldId: 'status'});
              if(val_status != null && val_status != "")
              {
                context.form.getField('status').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent345').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent345').updateDisplayType({displayType:'disabled'});
              }
              var val_sucursal = objRecord.getText({fieldId: 'custevent2'});
              if(val_sucursal != null && val_sucursal != "")
              {
                context.form.getField('custevent2').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent346').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent346').updateDisplayType({displayType:'disabled'});
              }
              // ********************************** Incident Information
              var val_INCIDENT_DATE = objRecord.getValue({fieldId: 'startdate'});
              if(val_INCIDENT_DATE != null && val_INCIDENT_DATE != "")
              {
                context.form.getField('startdate').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent347').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent347').updateDisplayType({displayType:'disabled'});
              }
              var val_starttime  = objRecord.getText({fieldId: 'starttime'});
              if(val_starttime != null && val_starttime != "")
              {
                context.form.getField('starttime').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent351').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent351').updateDisplayType({displayType:'disabled'});
              }
              var val_ENFERMERIA_EXTRACCION = objRecord.getValue({fieldId: 'custevent71'});
              if(val_ENFERMERIA_EXTRACCION != null && val_ENFERMERIA_EXTRACCION != "")
              {
                context.form.getField('custevent71').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent348').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent348').updateDisplayType({displayType:'disabled'});
              }
              var val_ENFERMERIA_IMPLANTACION = objRecord.getValue({fieldId: 'custevent72'});
              if(val_ENFERMERIA_IMPLANTACION != null && val_ENFERMERIA_IMPLANTACION != "")
              {
                context.form.getField('custevent72').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent349').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent349').updateDisplayType({displayType:'disabled'});
              }
              // ********************************** Nota Post Procedimiento
          	  var val_RESPONSABLE_TRICOTOMIA = objRecord.getValue({fieldId: 'custevent75'});
              if(val_RESPONSABLE_TRICOTOMIA != null && val_RESPONSABLE_TRICOTOMIA != "")
              {
                context.form.getField('custevent75').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent352').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent352').updateDisplayType({displayType:'disabled'});
              }
          	  var val_FECHA_POST_PRO = objRecord.getText({fieldId: 'custevent10'});
              if(val_FECHA_POST_PRO != null && val_FECHA_POST_PRO != "")
              {
                context.form.getField('custevent10').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent353').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent353').updateDisplayType({displayType:'disabled'});
              }
          	  var val_TA_POST_PRO = objRecord.getValue({fieldId: 'custevent11'});
              if(val_TA_POST_PRO != null && val_TA_POST_PRO != "")
              {
                context.form.getField('custevent11').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent354').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent354').updateDisplayType({displayType:'disabled'});
              }
          	  var val_FC_POST_PRO = objRecord.getValue({fieldId: 'custevent12'});
              if(val_FC_POST_PRO != null && val_FC_POST_PRO != "")
              {
                context.form.getField('custevent12').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent355').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent355').updateDisplayType({displayType:'disabled'});
              }
          	  var val_FR_POST_PRO = objRecord.getValue({fieldId: 'custevent13'});
              if(val_FR_POST_PRO != null && val_FR_POST_PRO != "")
              {
                context.form.getField('custevent13').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent356').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent356').updateDisplayType({displayType:'disabled'});
              }
          	  var val_INCIDENTES_DE_IMPORTANCIA = objRecord.getValue({fieldId: 'custevent14'});
              if(val_INCIDENTES_DE_IMPORTANCIA != null && val_INCIDENTES_DE_IMPORTANCIA != "")
              {
                context.form.getField('custevent14').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent357').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent357').updateDisplayType({displayType:'disabled'});
              }
          	  var val_SANGRADO_DURANTE_PROCEDIMIENTO = objRecord.getText({fieldId: 'custevent17'});
              if(val_SANGRADO_DURANTE_PROCEDIMIENTO != null && val_SANGRADO_DURANTE_PROCEDIMIENTO != "")
              {
                context.form.getField('custevent17').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent358').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent358').updateDisplayType({displayType:'disabled'});
              }
          	  var val_MEDICOS_PROCEDIMIENTO_CASO = objRecord.getText({fieldId: 'custevent28'});
              if(val_MEDICOS_PROCEDIMIENTO_CASO != null && val_MEDICOS_PROCEDIMIENTO_CASO != "")
              {
                context.form.getField('custevent28').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent359').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent359').updateDisplayType({displayType:'disabled'});
              }
          	  var val_ENFERMEROS_PROCEDIMIENTO_CASO = objRecord.getText({fieldId: 'custevent29'});
              if(val_ENFERMEROS_PROCEDIMIENTO_CASO != null && val_ENFERMEROS_PROCEDIMIENTO_CASO != "")
              {
                context.form.getField('custevent29').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent360').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent360').updateDisplayType({displayType:'disabled'});
              }
			  // ********************************** Historial Fotografico
			  var val_DISENO_IMG1 = objRecord.getText({fieldId: 'custevent82'});
              if(val_DISENO_IMG1 != null && val_DISENO_IMG1 != "")
              {
                context.form.getField('custevent82').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent361').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent361').updateDisplayType({displayType:'disabled'});
              }
			  var val_DISENO_IMG2 = objRecord.getText({fieldId: 'custevent83'});
              if(val_DISENO_IMG2 != null && val_DISENO_IMG2 != "")
              {
                context.form.getField('custevent83').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent362').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent362').updateDisplayType({displayType:'disabled'});
              }
			  var val_DISENO_IMG3 = objRecord.getText({fieldId: 'custevent84'});
              if(val_DISENO_IMG3 != null && val_DISENO_IMG3 != "")
              {
                context.form.getField('custevent84').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent363').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent363').updateDisplayType({displayType:'disabled'});
              }
			  var val_DISENO_IMG4 = objRecord.getText({fieldId: 'custevent85'});
              if(val_DISENO_IMG4 != null && val_DISENO_IMG4 != "")
              {
                context.form.getField('custevent85').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent364').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent364').updateDisplayType({displayType:'disabled'});
              }
			  var val_TEXTO_IMAGEN = objRecord.getValue({fieldId: 'custevent88'});
              if(val_TEXTO_IMAGEN != null && val_TEXTO_IMAGEN != "")
              {
                context.form.getField('custevent88').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent365').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent365').updateDisplayType({displayType:'disabled'});
              }
			  var val_IMAGEN_ANTES = objRecord.getText({fieldId: 'custevent76'});
              if(val_IMAGEN_ANTES != null && val_IMAGEN_ANTES != "")
              {
                context.form.getField('custevent76').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent366').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent366').updateDisplayType({displayType:'disabled'});
              }
			  var val_IMAGEN_DESPUES = objRecord.getText({fieldId: 'custevent77'});
              if(val_IMAGEN_DESPUES != null && val_IMAGEN_DESPUES != "")
              {
                context.form.getField('custevent77').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent367').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent367').updateDisplayType({displayType:'disabled'});
              }
			  var val_IMAGEN_FRONTAL = objRecord.getText({fieldId: 'custevent78'});
              if(val_IMAGEN_FRONTAL != null && val_IMAGEN_FRONTAL != "")
              {
                context.form.getField('custevent78').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent368').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent368').updateDisplayType({displayType:'disabled'});
              }
			  var val_EXTRA_IMG = objRecord.getText({fieldId: 'custevent81'});
              if(val_EXTRA_IMG != null && val_EXTRA_IMG != "")
              {
                context.form.getField('custevent81').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent369').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent369').updateDisplayType({displayType:'disabled'});
              }
			  var val_FIRMA_MEDICO_INJERTO = objRecord.getValue({fieldId: 'custevent87'});
              if(val_FIRMA_MEDICO_INJERTO != null && val_FIRMA_MEDICO_INJERTO != "")
              {
                context.form.getField('custevent87').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent370').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent370').updateDisplayType({displayType:'disabled'});
              }
			  var val_FIRMAR = objRecord.getValue({fieldId: 'custevent200'});
              if(val_FIRMAR != null && val_FIRMAR != "")
              {
                context.form.getField('custevent200').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent371').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent371').updateDisplayType({displayType:'disabled'});
              }
			  var val_FIRMA_DCLIENTE = objRecord.getValue({fieldId: 'custevent86'});
              if(val_FIRMA_DCLIENTE != null && val_FIRMA_DCLIENTE != "")
              {
                context.form.getField('custevent86').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent372').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent372').updateDisplayType({displayType:'disabled'});
              }
			  var val_FIRMAR_CONSENTIMIENTO = objRecord.getValue({fieldId: 'custevent268'});
              if(val_FIRMAR_CONSENTIMIENTO != null && val_FIRMAR_CONSENTIMIENTO != "")
              {
                context.form.getField('custevent268').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent373').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent373').updateDisplayType({displayType:'disabled'});
              }
			  var val_FIRMATEST = objRecord.getValue({fieldId: 'custevent201'});
              if(val_FIRMATEST != null && val_FIRMATEST != "")
              {
                context.form.getField('custevent201').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent374').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent374').updateDisplayType({displayType:'disabled'});
              }
			  var val_FIRMA_TESTIMONIAL = objRecord.getValue({fieldId: 'custevent327'});
              if(val_FIRMA_TESTIMONIAL != null && val_FIRMA_TESTIMONIAL != "")
              {
                context.form.getField('custevent327').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent375').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent375').updateDisplayType({displayType:'disabled'});
              }
              // ********************************** PRP
			  var val_RESPONSABLE = objRecord.getValue({fieldId: 'custevent113'});
              if(val_RESPONSABLE != null && val_RESPONSABLE != "")
              {
                context.form.getField('custevent113').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent376').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent376').updateDisplayType({displayType:'disabled'});
              }
			  var val_REGION_PRP2 = objRecord.getValue({fieldId: 'custevent114'});
              if(val_REGION_PRP2 != null && val_REGION_PRP2 != "")
              {
                context.form.getField('custevent114').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent377').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent377').updateDisplayType({displayType:'disabled'});
              }
			  var val_RESPONSABLE_APLICACION_PRP2 = objRecord.getValue({fieldId: 'custevent115'});
              if(val_RESPONSABLE_APLICACION_PRP2 != null && val_RESPONSABLE_APLICACION_PRP2 != "")
              {
                context.form.getField('custevent115').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent378').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent378').updateDisplayType({displayType:'disabled'});
              }
			  var val_REGION_PRP = objRecord.getValue({fieldId: 'custevent116'});
              if(val_REGION_PRP != null && val_REGION_PRP != "")
              {
                context.form.getField('custevent116').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent379').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent379').updateDisplayType({displayType:'disabled'});
              }
			  var val_RESPONSABLE_APLICACION_PRP = objRecord.getValue({fieldId: 'custevent117'});
              if(val_RESPONSABLE_APLICACION_PRP != null && val_RESPONSABLE_APLICACION_PRP != "")
              {
                context.form.getField('custevent117').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent380').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent380').updateDisplayType({displayType:'disabled'});
              }
			  var val_TIEMPO = objRecord.getValue({fieldId: 'custevent118'});
              if(val_TIEMPO != null && val_TIEMPO != "")
              {
                context.form.getField('custevent118').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent381').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent381').updateDisplayType({displayType:'disabled'});
              }
			  var val_CENTRIFUGADOS_A = objRecord.getValue({fieldId: 'custevent119'});
              if(val_CENTRIFUGADOS_A != null && val_CENTRIFUGADOS_A != "")
              {
                context.form.getField('custevent119').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent382').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent382').updateDisplayType({displayType:'disabled'});
              }
			  var val_TUBOS_OBTENIDOS = objRecord.getValue({fieldId: 'custevent120'});
              if(val_TUBOS_OBTENIDOS != null && val_TUBOS_OBTENIDOS != "")
              {
                context.form.getField('custevent120').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent383').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent383').updateDisplayType({displayType:'disabled'});
              }
			  var val_SITIO_DE_PUNCION = objRecord.getValue({fieldId: 'custevent121'});
              if(val_SITIO_DE_PUNCION != null && val_SITIO_DE_PUNCION != "")
              {
                context.form.getField('custevent121').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent384').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent384').updateDisplayType({displayType:'disabled'});
              }
			  var val_EQUIPO_UTILIZADO = objRecord.getValue({fieldId: 'custevent122'});
              if(val_EQUIPO_UTILIZADO != null && val_EQUIPO_UTILIZADO != "")
              {
                context.form.getField('custevent122').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent385').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent385').updateDisplayType({displayType:'disabled'});
              }
			  var val_NUMERO_DE_INTENTOS = objRecord.getValue({fieldId: 'custevent123'});
              if(val_NUMERO_DE_INTENTOS != null && val_NUMERO_DE_INTENTOS != "")
              {
                context.form.getField('custevent123').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent386').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent386').updateDisplayType({displayType:'disabled'});
              }
              // ************************************* H.Enfermeria
			  var val_CONSIENTE = objRecord.getText({fieldId: 'custevent89'});
              if(val_CONSIENTE != null && val_CONSIENTE != "")
              {
                context.form.getField('custevent89').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent387').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent387').updateDisplayType({displayType:'disabled'});
              }
			  var val_TRANQUILO = objRecord.getText({fieldId: 'custevent90'});
              if(val_TRANQUILO != null && val_TRANQUILO != "")
              {
                context.form.getField('custevent90').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent388').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent388').updateDisplayType({displayType:'disabled'});
              }
			  var val_ANSIOSO = objRecord.getText({fieldId: 'custevent91'});
              if(val_ANSIOSO != null && val_ANSIOSO != "")
              {
                context.form.getField('custevent91').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent389').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent389').updateDisplayType({displayType:'disabled'});
              }
			  var val_LETARGICO = objRecord.getText({fieldId: 'custevent92'});
              if(val_LETARGICO != null && val_LETARGICO != "")
              {
                context.form.getField('custevent92').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent390').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent390').updateDisplayType({displayType:'disabled'});
              }
			  var val_NERVIOSO = objRecord.getText({fieldId: 'custevent93'});
              if(val_NERVIOSO != null && val_NERVIOSO != "")
              {
                context.form.getField('custevent93').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent391').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent391').updateDisplayType({displayType:'disabled'});
              }
			  var val_ALERTA = objRecord.getText({fieldId: 'custevent94'});
              if(val_ALERTA != null && val_ALERTA != "")
              {
                context.form.getField('custevent94').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent392').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent392').updateDisplayType({displayType:'disabled'});
              }
			  var val_ORIENTADO = objRecord.getText({fieldId: 'custevent95'});
              if(val_ORIENTADO != null && val_ORIENTADO != "")
              {
                context.form.getField('custevent95').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent393').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent393').updateDisplayType({displayType:'disabled'});
              }
			  var val_OTRO = objRecord.getValue({fieldId: 'custevent96'});
              if(val_OTRO != null && val_OTRO != "")
              {
                context.form.getField('custevent96').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent394').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent394').updateDisplayType({displayType:'disabled'});
              }
			  var val_P_F_INICIO = objRecord.getText({fieldId: 'custevent97'});
              if(val_P_F_INICIO != null && val_P_F_INICIO != "")
              {
                context.form.getField('custevent97').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent395').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent395').updateDisplayType({displayType:'disabled'});
              }
			  var val_P_F_FINAL = objRecord.getText({fieldId: 'custevent98'});
              if(val_P_F_FINAL != null && val_P_F_FINAL != "")
              {
                context.form.getField('custevent98').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent396').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent396').updateDisplayType({displayType:'disabled'});
              }
			  var val_HORA_DE_INICIO_A = objRecord.getValue({fieldId: 'custevent99'});
              if(val_HORA_DE_INICIO_A != null && val_HORA_DE_INICIO_A != "")
              {
                context.form.getField('custevent99').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent397').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent397').updateDisplayType({displayType:'disabled'});
              }
			  var val_HORA_DE_TERMINO_A = objRecord.getValue({fieldId: 'custevent100'});
              if(val_HORA_DE_TERMINO_A != null && val_HORA_DE_TERMINO_A != "")
              {
                context.form.getField('custevent100').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent398').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent398').updateDisplayType({displayType:'disabled'});
              }
			  var val_ANESTESICO = objRecord.getValue({fieldId: 'custevent101'});
              if(val_ANESTESICO != null && val_ANESTESICO != "")
              {
                context.form.getField('custevent101').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent399').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent399').updateDisplayType({displayType:'disabled'});
              }
			  var val_INFILTRO = objRecord.getValue({fieldId: 'custevent102'});
              if(val_INFILTRO != null && val_INFILTRO != "")
              {
                context.form.getField('custevent102').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent400').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent400').updateDisplayType({displayType:'disabled'});
              }
			  var val_ANESTESICO_ZI = objRecord.getValue({fieldId: 'custevent103'});
              if(val_ANESTESICO_ZI != null && val_ANESTESICO_ZI != "")
              {
                context.form.getField('custevent103').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent401').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent401').updateDisplayType({displayType:'disabled'});
              }
			  var val_INFILTRO_ZI = objRecord.getValue({fieldId: 'custevent104'});
              if(val_INFILTRO_ZI != null && val_INFILTRO_ZI != "")
              {
                context.form.getField('custevent104').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent402').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent402').updateDisplayType({displayType:'disabled'});
              }
			  var val_HORA_DE_INICIO_ZI = objRecord.getValue({fieldId: 'custevent105'});
              if(val_HORA_DE_INICIO_ZI != null && val_HORA_DE_INICIO_ZI != "")
              {
                context.form.getField('custevent105').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent403').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent403').updateDisplayType({displayType:'disabled'});
              }
			  var val_HORA_DE_TERMINO_ZI = objRecord.getValue({fieldId: 'custevent106'});
              if(val_HORA_DE_TERMINO_ZI != null && val_HORA_DE_TERMINO_ZI != "")
              {
                context.form.getField('custevent106').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent404').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent404').updateDisplayType({displayType:'disabled'});
              }
			  var val_REALIZO = objRecord.getValue({fieldId: 'custevent107'});
              if(val_REALIZO != null && val_REALIZO != "")
              {
                context.form.getField('custevent107').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent405').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent405').updateDisplayType({displayType:'disabled'});
              }
			  var val_REGION = objRecord.getText({fieldId: 'custevent108'});
              if(val_REGION != null && val_REGION != "")
              {
                context.form.getField('custevent108').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent406').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent406').updateDisplayType({displayType:'disabled'});
              }
			  var val_ANTISEPTICO = objRecord.getValue({fieldId: 'custevent109'});
              if(val_ANTISEPTICO != null && val_ANTISEPTICO != "")
              {
                context.form.getField('custevent109').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent407').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent407').updateDisplayType({displayType:'disabled'});
              }
			  var val_ANTISEPTICO_2 = objRecord.getValue({fieldId: 'custevent110'});
              if(val_ANTISEPTICO_2 != null && val_ANTISEPTICO_2 != "")
              {
                context.form.getField('custevent110').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent408').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent408').updateDisplayType({displayType:'disabled'});
              }
			  var val_REGION_2 = objRecord.getText({fieldId: 'custevent111'});
              if(val_REGION_2 != null && val_REGION_2 != "")
              {
                context.form.getField('custevent111').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent409').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent409').updateDisplayType({displayType:'disabled'});
              }
			  var val_REALIZO2 = objRecord.getValue({fieldId: 'custevent112'});
              if(val_REALIZO2 != null && val_REALIZO2 != "")
              {
                context.form.getField('custevent112').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent410').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent410').updateDisplayType({displayType:'disabled'});
              }
              // ************************************* Observaciones
			  var val_OBSERVACIIONES_DEL_PROCEDIMIENTO = objRecord.getValue({fieldId: 'custevent3'});
              if(val_OBSERVACIIONES_DEL_PROCEDIMIENTO != null && val_OBSERVACIIONES_DEL_PROCEDIMIENTO != "")
              {
                context.form.getField('custevent3').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent411').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent411').updateDisplayType({displayType:'disabled'});
              }
			  var val_T_A_PRE = objRecord.getValue({fieldId: 'custevent4'});
              if(val_T_A_PRE != null && val_T_A_PRE != "")
              {
                context.form.getField('custevent4').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent412').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent412').updateDisplayType({displayType:'disabled'});
              }
			  var val_T_A_TRANS = objRecord.getValue({fieldId: 'custevent5'});
              if(val_T_A_TRANS != null && val_T_A_TRANS != "")
              {
                context.form.getField('custevent5').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent413').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent413').updateDisplayType({displayType:'disabled'});
              }
			  var val_T_A_POST = objRecord.getValue({fieldId: 'custevent6'});
              if(val_T_A_POST != null && val_T_A_POST != "")
              {
                context.form.getField('custevent6').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent414').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent414').updateDisplayType({displayType:'disabled'});
              }
			  var val_F_C_PRE = objRecord.getValue({fieldId: 'custevent7'});
              if(val_F_C_PRE != null && val_F_C_PRE != "")
              {
                context.form.getField('custevent7').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent415').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent415').updateDisplayType({displayType:'disabled'});
              }
			  var val_F_C_TRANS = objRecord.getValue({fieldId: 'custevent8'});
              if(val_F_C_TRANS != null && val_F_C_TRANS != "")
              {
                context.form.getField('custevent8').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent416').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent416').updateDisplayType({displayType:'disabled'});
              }
			  var val_F_C_POST = objRecord.getValue({fieldId: 'custevent9'});
              if(val_F_C_POST != null && val_F_C_POST != "")
              {
                context.form.getField('custevent9').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent417').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent417').updateDisplayType({displayType:'disabled'});
              }
			  var val_CORTE_CABELLO_ENFERMERIA = objRecord.getText({fieldId: 'custevent27'});
              if(val_CORTE_CABELLO_ENFERMERIA != null && val_CORTE_CABELLO_ENFERMERIA != "")
              {
                context.form.getField('custevent27').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent418').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent418').updateDisplayType({displayType:'disabled'});
              }
			  var val_CELIGO_GMAIL_MESSAGE_2 = objRecord.getValue({fieldId: 'custevent_celigo_gmail_msg_record'});
              if(val_CELIGO_GMAIL_MESSAGE_2 != null && val_CELIGO_GMAIL_MESSAGE_2 != "")
              {
                context.form.getField('custevent_celigo_gmail_msg_record').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent419').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent419').updateDisplayType({displayType:'disabled'});
              }
              // ************************************** Recetas
			  var val_DR_RESPONSABLE = objRecord.getText({fieldId: 'custevent202'});
              if(val_DR_RESPONSABLE != null && val_DR_RESPONSABLE != "")
              {
                context.form.getField('custevent202').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent420').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent420').updateDisplayType({displayType:'disabled'});
              }
			  var val_FECHA_DE_EXPEDICION = objRecord.getText({fieldId: 'custevent197'});
              if(val_FECHA_DE_EXPEDICION != null && val_FECHA_DE_EXPEDICION != "")
              {
                context.form.getField('custevent197').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent421').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent421').updateDisplayType({displayType:'disabled'});
              }
			  var val_TIPO = objRecord.getText({fieldId: 'custevent203'});
              if(val_TIPO != null && val_TIPO != "")
              {
                context.form.getField('custevent203').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent422').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent422').updateDisplayType({displayType:'disabled'});
              }
			  var val_MEDICAMENTO_1 = objRecord.getText({fieldId: 'custevent177'});
              if(val_MEDICAMENTO_1 != null && val_MEDICAMENTO_1 != "")
              {
                context.form.getField('custevent177').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent423').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent423').updateDisplayType({displayType:'disabled'});
              }
              var val_INDICACION_1 = objRecord.getValue({fieldId: 'custevent180'});
              if(val_INDICACION_1 != null && val_INDICACION_1 != "")
              {
                context.form.getField('custevent180').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent424').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent424').updateDisplayType({displayType:'disabled'});
              }
              var val_MEDICAMENTO_2 = objRecord.getText({fieldId: 'custevent178'});
              if(val_MEDICAMENTO_2 != null && val_MEDICAMENTO_2 != "")
              {
                context.form.getField('custevent178').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent425').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent425').updateDisplayType({displayType:'disabled'});
              }
              var val_INDICACION_2 = objRecord.getValue({fieldId: 'custevent181'});
              if(val_INDICACION_2 != null && val_INDICACION_2 != "")
              {
                context.form.getField('custevent181').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent426').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent426').updateDisplayType({displayType:'disabled'});
              }
              var val_MEDICAMENTO_3 = objRecord.getValue({fieldId: 'custevent179'});
              if(val_MEDICAMENTO_3 != null && val_MEDICAMENTO_3 != "")
              {
                context.form.getField('custevent179').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent427').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent427').updateDisplayType({displayType:'disabled'});
              }
              var val_INDICACION_3 = objRecord.getValue({fieldId: 'custevent182'});
              if(val_INDICACION_3 != null && val_INDICACION_3 != "")
              {
                context.form.getField('custevent182').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent428').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent428').updateDisplayType({displayType:'disabled'});
              }
              var val_SHAMPOO_CONTROL_CAIDA = objRecord.getValue({fieldId: 'custevent183'});
              if(val_SHAMPOO_CONTROL_CAIDA != null && val_SHAMPOO_CONTROL_CAIDA != "")
              {
                context.form.getField('custevent183').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent429').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent429').updateDisplayType({displayType:'disabled'});
              }
              var val_INDICACION_5 = objRecord.getValue({fieldId: 'custevent187'});
              if(val_INDICACION_5 != null && val_INDICACION_5 != "")
              {
                context.form.getField('custevent187').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent430').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent430').updateDisplayType({displayType:'disabled'});
              }
              var val_SHAMPOO_CONTROL_GRASA = objRecord.getValue({fieldId: 'custevent184'});
              if(val_SHAMPOO_CONTROL_GRASA != null && val_SHAMPOO_CONTROL_GRASA != "")
              {
                context.form.getField('custevent184').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent431').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent431').updateDisplayType({displayType:'disabled'});
              }
              var val_INDICACION_6 = objRecord.getValue({fieldId: 'custevent188'});
              if(val_INDICACION_6 != null && val_INDICACION_6 != "")
              {
                context.form.getField('custevent188').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent432').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent432').updateDisplayType({displayType:'disabled'});
              }
              var val_AGUA_GLACIAR = objRecord.getValue({fieldId: 'custevent185'});
              if(val_AGUA_GLACIAR != null && val_AGUA_GLACIAR != "")
              {
                context.form.getField('custevent185').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent433').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent433').updateDisplayType({displayType:'disabled'});
              }
              var val_INDICACION_7 = objRecord.getValue({fieldId: 'custevent189'});
              if(val_INDICACION_7 != null && val_INDICACION_7 != "")
              {
                context.form.getField('custevent189').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent434').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent434').updateDisplayType({displayType:'disabled'});
              }
              var val_ARGININA = objRecord.getValue({fieldId: 'custevent186'});
              if(val_ARGININA != null && val_ARGININA != "")
              {
                context.form.getField('custevent186').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent435').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent435').updateDisplayType({displayType:'disabled'});
              }
              var val_INDICACION_8 = objRecord.getValue({fieldId: 'custevent190'});
              if(val_INDICACION_8 != null && val_INDICACION_8 != "")
              {
                context.form.getField('custevent190').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent436').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent436').updateDisplayType({displayType:'disabled'});
              }
              var val_COMENTARIOS = objRecord.getValue({fieldId: 'custevent196'});
              if(val_COMENTARIOS != null && val_COMENTARIOS != "")
              {
                context.form.getField('custevent196').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent437').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent437').updateDisplayType({displayType:'disabled'});
              }
              var val_BARBA_CEJA = objRecord.getValue({fieldId: 'custevent204'});
              if(val_BARBA_CEJA != null && val_BARBA_CEJA != "")
              {
                context.form.getField('custevent204').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent438').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent438').updateDisplayType({displayType:'disabled'});
              }
              // *********************************** Revisiones
              var val_LAVADO_DE_24_HORAS = objRecord.getText({fieldId: 'custevent138'});
              if(val_LAVADO_DE_24_HORAS != null && val_LAVADO_DE_24_HORAS != "")
              {
                context.form.getField('custevent138').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent439').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent439').updateDisplayType({displayType:'disabled'});
              }
              var val_LAVADO_24HR_NOTA_MEDICA = objRecord.getValue({fieldId: 'custevent139'});
              if(val_LAVADO_24HR_NOTA_MEDICA != null && val_LAVADO_24HR_NOTA_MEDICA != "")
              {
                context.form.getField('custevent139').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent440').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent440').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_24HR = objRecord.getValue({fieldId: 'custevent140'});
              if(val_TX_24HR != null && val_TX_24HR != "")
              {
                context.form.getField('custevent140').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent441').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent441').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_24HR = objRecord.getValue({fieldId: 'custevent141'});
              if(val_RESPONSABLE_24HR != null && val_RESPONSABLE_24HR != "")
              {
                context.form.getField('custevent141').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent442').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent442').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_10_DIAS = objRecord.getText({fieldId: 'custevent142'});
              if(val_REVISION_10_DIAS != null && val_REVISION_10_DIAS != "")
              {
                context.form.getField('custevent142').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent443').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent443').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_10DIAS = objRecord.getValue({fieldId: 'custevent143'});
              if(val_NOTA_MEDICA_10DIAS != null && val_NOTA_MEDICA_10DIAS != "")
              {
                context.form.getField('custevent143').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent444').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent444').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_10DIAS = objRecord.getValue({fieldId: 'custevent144'});
              if(val_TX_10DIAS != null && val_TX_10DIAS != "")
              {
                context.form.getField('custevent144').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent445').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent445').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_10DIAS = objRecord.getValue({fieldId: 'custevent145'});
              if(val_RESPONSABLE_10DIAS != null && val_RESPONSABLE_10DIAS != "")
              {
                context.form.getField('custevent145').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent446').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent446').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_1_MES = objRecord.getText({fieldId: 'custevent146'});
              if(val_REVISION_1_MES != null && val_REVISION_1_MES != "")
              {
                context.form.getField('custevent146').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent447').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent447').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_1MES = objRecord.getValue({fieldId: 'custevent147'});
              if(val_NOTA_MEDICA_1MES != null && val_NOTA_MEDICA_1MES != "")
              {
                context.form.getField('custevent147').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent448').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent448').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_1MES = objRecord.getValue({fieldId: 'custevent148'});
              if(val_TX_1MES != null && val_TX_1MES != "")
              {
                context.form.getField('custevent148').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent449').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent449').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_1MES = objRecord.getValue({fieldId: 'custevent149'});
              if(val_RESPONSABLE_1MES != null && val_RESPONSABLE_1MES != "")
              {
                context.form.getField('custevent149').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent450').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent450').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_3_MESES = objRecord.getText({fieldId: 'custevent150'});
              if(val_REVISION_3_MESES != null && val_REVISION_3_MESES != "")
              {
                context.form.getField('custevent150').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent451').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent451').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_3MESES = objRecord.getValue({fieldId: 'custevent151'});
              if(val_NOTA_MEDICA_3MESES != null && val_NOTA_MEDICA_3MESES != "")
              {
                context.form.getField('custevent151').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent452').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent452').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_3MESES = objRecord.getValue({fieldId: 'custevent152'});
              if(val_TX_3MESES != null && val_TX_3MESES != "")
              {
                context.form.getField('custevent152').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent453').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent453').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_3MESES = objRecord.getValue({fieldId: 'custevent153'});
              if(val_RESPONSABLE_3MESES != null && val_RESPONSABLE_3MESES != "")
              {
                context.form.getField('custevent153').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent454').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent454').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_5_MESES = objRecord.getText({fieldId: 'custevent154'});
              if(val_REVISION_5_MESES != null && val_REVISION_5_MESES != "")
              {
                context.form.getField('custevent154').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent455').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent455').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_5MESES = objRecord.getValue({fieldId: 'custevent155'});
              if(val_NOTA_MEDICA_5MESES != null && val_NOTA_MEDICA_5MESES != "")
              {
                context.form.getField('custevent155').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent456').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent456').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_5MESES = objRecord.getValue({fieldId: 'custevent156'});
              if(val_TX_5MESES != null && val_TX_5MESES != "")
              {
                context.form.getField('custevent156').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent457').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent457').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_5MESES = objRecord.getValue({fieldId: 'custevent157'});
              if(val_RESPONSABLE_5MESES != null && val_RESPONSABLE_5MESES != "")
              {
                context.form.getField('custevent157').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent458').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent458').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_7_MESES = objRecord.getText({fieldId: 'custevent158'});
              if(val_REVISION_7_MESES != null && val_REVISION_7_MESES != "")
              {
                context.form.getField('custevent158').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent459').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent459').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_7MESES = objRecord.getValue({fieldId: 'custevent159'});
              if(val_NOTA_MEDICA_7MESES != null && val_NOTA_MEDICA_7MESES != "")
              {
                context.form.getField('custevent159').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent460').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent460').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_7MESES = objRecord.getValue({fieldId: 'custevent160'});
              if(val_TX_7MESES != null && val_TX_7MESES != "")
              {
                context.form.getField('custevent160').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent461').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent461').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_7MESES = objRecord.getValue({fieldId: 'custevent163'});
              if(val_RESPONSABLE_7MESES != null && val_RESPONSABLE_7MESES != "")
              {
                context.form.getField('custevent163').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent462').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent462').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_9_MESES = objRecord.getText({fieldId: 'custevent164'});
              if(val_REVISION_9_MESES != null && val_REVISION_9_MESES != "")
              {
                context.form.getField('custevent164').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent463').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent463').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_9_MESES = objRecord.getValue({fieldId: 'custevent165'});
              if(val_NOTA_MEDICA_9_MESES != null && val_NOTA_MEDICA_9_MESES != "")
              {
                context.form.getField('custevent165').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent464').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent464').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_9MESES = objRecord.getValue({fieldId: 'custevent166'});
              if(val_TX_9MESES != null && val_TX_9MESES != "")
              {
                context.form.getField('custevent166').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent465').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent465').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_9MESES = objRecord.getValue({fieldId: 'custevent167'});
              if(val_RESPONSABLE_9MESES != null && val_RESPONSABLE_9MESES != "")
              {
                context.form.getField('custevent167').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent466').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent466').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_12_MESES = objRecord.getText({fieldId: 'custevent168'});
              if(val_REVISION_12_MESES != null && val_REVISION_12_MESES != "")
              {
                context.form.getField('custevent168').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent467').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent467').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_12MESES = objRecord.getValue({fieldId: 'custevent169'});
              if(val_NOTA_MEDICA_12MESES != null && val_NOTA_MEDICA_12MESES != "")
              {
                context.form.getField('custevent169').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent468').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent468').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_12MESES = objRecord.getValue({fieldId: 'custevent170'});
              if(val_TX_12MESES != null && val_TX_12MESES != "")
              {
                context.form.getField('custevent170').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent469').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent469').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_12MESES = objRecord.getValue({fieldId: 'custevent171'});
              if(val_RESPONSABLE_12MESES != null && val_RESPONSABLE_12MESES != "")
              {
                context.form.getField('custevent171').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent470').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent470').updateDisplayType({displayType:'disabled'});
              }
              var val_REVISION_14_MESES = objRecord.getText({fieldId: 'custevent172'});
              if(val_REVISION_14_MESES != null && val_REVISION_14_MESES != "")
              {
                context.form.getField('custevent172').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent471').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent471').updateDisplayType({displayType:'disabled'});
              }
              var val_NOTA_MEDICA_14MESES = objRecord.getValue({fieldId: 'custevent173'});
              if(val_NOTA_MEDICA_14MESES != null && val_NOTA_MEDICA_14MESES != "")
              {
                context.form.getField('custevent173').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent472').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent472').updateDisplayType({displayType:'disabled'});
              }
              var val_TX_14MESES = objRecord.getValue({fieldId: 'custevent174'});
              if(val_TX_14MESES != null && val_TX_14MESES != "")
              {
                context.form.getField('custevent174').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent473').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent473').updateDisplayType({displayType:'disabled'});
              }
              var val_RESPONSABLE_14MESES = objRecord.getValue({fieldId: 'custevent175'});
              if(val_RESPONSABLE_14MESES != null && val_RESPONSABLE_14MESES != "")
              {
                context.form.getField('custevent175').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent474').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent474').updateDisplayType({displayType:'disabled'});
              }
           }
        }
     }

     if(context.type == "view")
     {
        var recordCaseId = context.newRecord.id;
        var objRecord = record.load({type: 'SUPPORTCASE', id: recordCaseId, isDynamic: false});
        var customform_id = objRecord.getValue({fieldId: 'customform'});
		var userObj = runtime.getCurrentUser();
        var bandera = false;
        if(userObj.role == "1139" || userObj.role == "1094") // 1097 = OSS Contabilidad KHG
        {
          if(customform_id == "14") // 14 = atención a cliente injerto
          {
            // ********************************** Primary Information
            var val_CUSTOM_FORM  = objRecord.getText({fieldId: 'customform'});
            var val_CUSTOM_FORM_b64  = objRecord.getValue({fieldId: 'custevent350'});
            if((val_CUSTOM_FORM_b64 == null || val_CUSTOM_FORM_b64 == "") && (val_CUSTOM_FORM != null || val_CUSTOM_FORM != ""))
            {
                //context.form.getField('customform').updateDisplayType({displayType:'hidden'});
                var base64_val_CUSTOM_FORM = encode.convert({string: val_CUSTOM_FORM, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                //context.form.getField('custevent350').updateDisplayType({displayType:'normal'});
                //context.form.getField('custevent350').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent350", value: base64_val_CUSTOM_FORM});
                bandera = true;
            }

            var val_starttime  = objRecord.getText({fieldId: 'starttime'});
            var val_starttime_b64  = objRecord.getValue({fieldId: 'custevent351'});
            if((val_starttime_b64 == null || val_starttime_b64 == "") && (val_starttime != null || val_starttime != ""))
            {
                //context.form.getField('starttime').updateDisplayType({displayType:'hidden'});
                var base64_val_starttime = encode.convert({string: val_starttime, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                //context.form.getField('custevent351').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent351').updateDisplayType({displayType:'hidden'});
                objRecord.setValue({fieldId: "custevent351", value: base64_val_starttime});
                bandera = true;
            }

            //var val_casenumber1 = context.form.getField({id: 'casenumber'}).defaultValue;
            var val_casenumber = objRecord.getValue({fieldId: 'casenumber'});
            var val_casenumber_b64  = objRecord.getValue({fieldId: 'custevent342'});
            if((val_casenumber_b64 == null || val_casenumber_b64 == "") && (val_casenumber != null || val_casenumber != ""))
            {
               context.form.getField('casenumber').updateDisplayType({displayType:'hidden'});
               var base64_val_casenumber = encode.convert({string: val_casenumber, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
               context.form.getField('custevent342').updateDisplayType({displayType:'normal'});
               context.form.getField('custevent342').updateDisplayType({displayType:'disabled'});
               objRecord.setValue({fieldId: "custevent342", value: base64_val_casenumber});
               bandera = true;
            }
            else
            {
			   context.form.getField('casenumber').updateDisplayType({displayType:'hidden'});
               context.form.getField('custevent342').updateDisplayType({displayType:'normal'});
               context.form.getField('custevent342').updateDisplayType({displayType:'disabled'});
            }

            var val_title = objRecord.getValue({fieldId: 'title'});
            var val_title_b64  = objRecord.getValue({fieldId: 'custevent343'});
            if((val_title_b64 == null || val_title_b64 == "") && (val_title != null || val_title != ""))
            {
                context.form.getField('title').updateDisplayType({displayType:'hidden'});
                var base64_val_title = encode.convert({string: val_title, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent343').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent343').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent343", value: base64_val_title});
                bandera = true;
            }
            else
            {
                context.form.getField('title').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent343').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent343').updateDisplayType({displayType:'disabled'});
            }

            var val_company = objRecord.getText({fieldId: 'company'});
            var val_company_b64  = objRecord.getValue({fieldId: 'custevent344'});
            if((val_company_b64 == null || val_company_b64 == "") && (val_company != null || val_company != ""))
            {
                context.form.getField('company').updateDisplayType({displayType:'hidden'});
                var base64_val_company = encode.convert({string: val_company, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent344').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent344').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent344", value: base64_val_company});
                bandera = true;
            }
            else
            {
                context.form.getField('company').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent344').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent344').updateDisplayType({displayType:'disabled'});
            }

            var val_status = objRecord.getText({fieldId: 'status'});
            var val_status_b64  = objRecord.getValue({fieldId: 'custevent345'});
            if((val_status_b64 == null || val_status_b64 == "") && (val_status != null || val_status != ""))
            {
                context.form.getField('status').updateDisplayType({displayType:'hidden'});
                var base64_val_status = encode.convert({string: val_status, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent345').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent345').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent345", value: base64_val_status});
                bandera = true;
            }
            else
            {
                context.form.getField('status').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent345').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent345').updateDisplayType({displayType:'disabled'});
            }

            var val_sucursal = objRecord.getText({fieldId: 'custevent2'});
            var val_sucursal_b64  = objRecord.getValue({fieldId: 'custevent346'});
            if((val_sucursal_b64 == null || val_sucursal_b64 == "") && (val_sucursal != null || val_sucursal != ""))
            {
                context.form.getField('custevent2').updateDisplayType({displayType:'hidden'});
                var base64_val_sucursal = encode.convert({string: val_sucursal, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent346').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent346').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent346", value: base64_val_sucursal});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent2').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent346').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent346').updateDisplayType({displayType:'disabled'});
            }

			// ********************************** Incident Information
            var val_INCIDENT_DATE = objRecord.getValue({fieldId: 'startdate'});
            var val_INCIDENT_DATE_b64  = objRecord.getValue({fieldId: 'custevent347'});
            if((val_INCIDENT_DATE_b64 == null || val_INCIDENT_DATE_b64 == "") && (val_INCIDENT_DATE != null || val_INCIDENT_DATE != ""))
            {
                context.form.getField('startdate').updateDisplayType({displayType:'hidden'});
                var base64_val_INCIDENT_DATE = encode.convert({string: val_INCIDENT_DATE, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent347').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent347').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent347", value: base64_val_INCIDENT_DATE});
                bandera = true;
            }
            else
            {
                context.form.getField('startdate').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent347').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent347').updateDisplayType({displayType:'disabled'});
            }

            var val_ENFERMERIA_EXTRACCION = objRecord.getText({fieldId: 'custevent71'});
            var val_ENFERMERIA_EXTRACCION_b64  = objRecord.getValue({fieldId: 'custevent348'});
            if((val_ENFERMERIA_EXTRACCION_b64 == null || val_ENFERMERIA_EXTRACCION_b64 == "") && (val_ENFERMERIA_EXTRACCION != null || val_ENFERMERIA_EXTRACCION != ""))
            {
                context.form.getField('custevent71').updateDisplayType({displayType:'hidden'});
                var base64_val_ENFERMERIA_EXTRACCION = encode.convert({string: val_ENFERMERIA_EXTRACCION, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent348').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent348').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent348", value: base64_val_ENFERMERIA_EXTRACCION});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent71').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent348').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent348').updateDisplayType({displayType:'disabled'});
            }

            var val_ENFERMERIA_IMPLANTACION = objRecord.getText({fieldId: 'custevent72'});
            var val_ENFERMERIA_IMPLANTACION_b64  = objRecord.getValue({fieldId: 'custevent349'});
            if((val_ENFERMERIA_IMPLANTACION_b64 == null || val_ENFERMERIA_IMPLANTACION_b64 == "") && (val_ENFERMERIA_IMPLANTACION != null || val_ENFERMERIA_IMPLANTACION != ""))
            {
                context.form.getField('custevent72').updateDisplayType({displayType:'hidden'});
                var base64_val_ENFERMERIA_IMPLANTACION = encode.convert({string: val_ENFERMERIA_IMPLANTACION, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent349').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent349').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent349", value: base64_val_ENFERMERIA_IMPLANTACION});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent72').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent349').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent349').updateDisplayType({displayType:'disabled'});
            }

            // ********************************** Nota Post Procedimiento
            var val_RESPONSABLE_TRICOTOMIA = objRecord.getValue({fieldId: 'custevent75'});
            var val_RESPONSABLE_TRICOTOMIA_b64  = objRecord.getValue({fieldId: 'custevent352'});
            if((val_RESPONSABLE_TRICOTOMIA_b64 == null || val_RESPONSABLE_TRICOTOMIA_b64 == "") && (val_RESPONSABLE_TRICOTOMIA != null || val_RESPONSABLE_TRICOTOMIA != ""))
            {
                context.form.getField('custevent75').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_TRICOTOMIA = encode.convert({string: val_RESPONSABLE_TRICOTOMIA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent352').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent352').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent352", value: base64_val_RESPONSABLE_TRICOTOMIA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent75').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent352').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent352').updateDisplayType({displayType:'disabled'});
            }

            var val_FECHA_POST_PRO = objRecord.getText({fieldId: 'custevent10'});
            var val_FECHA_POST_PRO_b64  = objRecord.getValue({fieldId: 'custevent353'});
            if((val_FECHA_POST_PRO_b64 == null || val_FECHA_POST_PRO_b64 == "") && (val_FECHA_POST_PRO != null || val_FECHA_POST_PRO != ""))
            {
                context.form.getField('custevent10').updateDisplayType({displayType:'hidden'});
                var base64_val_FECHA_POST_PRO = encode.convert({string: val_FECHA_POST_PRO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent353').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent353').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent353", value: base64_val_FECHA_POST_PRO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent10').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent353').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent353').updateDisplayType({displayType:'disabled'});
            }

            var val_TA_POST_PRO = objRecord.getValue({fieldId: 'custevent11'});
            var val_TA_POST_PRO_b64  = objRecord.getValue({fieldId: 'custevent354'});
            if((val_TA_POST_PRO_b64 == null || val_TA_POST_PRO_b64 == "") && (val_TA_POST_PRO != null || val_TA_POST_PRO != ""))
            {
                context.form.getField('custevent11').updateDisplayType({displayType:'hidden'});
                var base64_val_TA_POST_PRO = encode.convert({string: val_TA_POST_PRO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent354').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent354').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent354", value: base64_val_TA_POST_PRO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent11').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent354').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent354').updateDisplayType({displayType:'disabled'});
            }

            var val_FC_POST_PRO = objRecord.getValue({fieldId: 'custevent12'});
            var val_FC_POST_PRO_b64  = objRecord.getValue({fieldId: 'custevent355'});
            if((val_FC_POST_PRO_b64 == null || val_FC_POST_PRO_b64 == "") && (val_FC_POST_PRO != null || val_FC_POST_PRO != ""))
            {
                context.form.getField('custevent12').updateDisplayType({displayType:'hidden'});
                var base64_val_FC_POST_PRO = encode.convert({string: val_FC_POST_PRO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent355').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent355').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent355", value: base64_val_FC_POST_PRO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent12').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent355').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent355').updateDisplayType({displayType:'disabled'});
            }

            var val_FR_POST_PRO = objRecord.getValue({fieldId: 'custevent13'});
            var val_FR_POST_PRO_b64  = objRecord.getValue({fieldId: 'custevent356'});
            if((val_FR_POST_PRO_b64 == null || val_FR_POST_PRO_b64 == "") && (val_FR_POST_PRO != null || val_FR_POST_PRO != ""))
            {
                context.form.getField('custevent13').updateDisplayType({displayType:'hidden'});
                var base64_val_FR_POST_PRO = encode.convert({string: val_FR_POST_PRO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent356').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent356').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent356", value: base64_val_FR_POST_PRO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent13').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent356').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent356').updateDisplayType({displayType:'disabled'});
            }

            var val_INCIDENTES_DE_IMPORTANCIA = objRecord.getValue({fieldId: 'custevent14'});
            var val_INCIDENTES_DE_IMPORTANCIA_b64  = objRecord.getValue({fieldId: 'custevent357'});
            if((val_INCIDENTES_DE_IMPORTANCIA_b64 == null || val_INCIDENTES_DE_IMPORTANCIA_b64 == "") && (val_INCIDENTES_DE_IMPORTANCIA != null || val_INCIDENTES_DE_IMPORTANCIA != ""))
            {
                context.form.getField('custevent14').updateDisplayType({displayType:'hidden'});
                var base64_val_INCIDENTES_DE_IMPORTANCIA = encode.convert({string: val_INCIDENTES_DE_IMPORTANCIA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent357').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent357').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent357", value: base64_val_INCIDENTES_DE_IMPORTANCIA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent14').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent357').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent357').updateDisplayType({displayType:'disabled'});
            }

            var val_SANGRADO_DURANTE_PROCEDIMIENTO = objRecord.getText({fieldId: 'custevent17'});
            var val_SANGRADO_DURANTE_PROCEDIMIENTO_b64  = objRecord.getValue({fieldId: 'custevent358'});
            if((val_SANGRADO_DURANTE_PROCEDIMIENTO_b64 == null || val_SANGRADO_DURANTE_PROCEDIMIENTO_b64 == "") && (val_SANGRADO_DURANTE_PROCEDIMIENTO != null || val_SANGRADO_DURANTE_PROCEDIMIENTO != ""))
            {
                context.form.getField('custevent17').updateDisplayType({displayType:'hidden'});
                var base64_val_SANGRADO_DURANTE_PROCEDIMIENTO = encode.convert({string: val_SANGRADO_DURANTE_PROCEDIMIENTO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent358').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent358').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent358", value: base64_val_SANGRADO_DURANTE_PROCEDIMIENTO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent17').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent358').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent358').updateDisplayType({displayType:'disabled'});
            }

            var val_MEDICOS_PROCEDIMIENTO_CASO = objRecord.getText({fieldId: 'custevent28'});
            var val_MEDICOS_PROCEDIMIENTO_CASO_b64  = objRecord.getValue({fieldId: 'custevent359'});
            if((val_MEDICOS_PROCEDIMIENTO_CASO_b64 == null || val_MEDICOS_PROCEDIMIENTO_CASO_b64 == "") && (val_MEDICOS_PROCEDIMIENTO_CASO != null || val_MEDICOS_PROCEDIMIENTO_CASO != ""))
            {
                context.form.getField('custevent28').updateDisplayType({displayType:'hidden'});
                var base64_val_MEDICOS_PROCEDIMIENTO_CASO = encode.convert({string: val_MEDICOS_PROCEDIMIENTO_CASO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent359').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent359').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent359", value: base64_val_MEDICOS_PROCEDIMIENTO_CASO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent28').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent359').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent359').updateDisplayType({displayType:'disabled'});
            }

            var val_ENFERMEROS_PROCEDIMIENTO_CASO = objRecord.getText({fieldId: 'custevent29'});
            var val_ENFERMEROS_PROCEDIMIENTO_CASO_b64  = objRecord.getValue({fieldId: 'custevent360'});
            if((val_ENFERMEROS_PROCEDIMIENTO_CASO_b64 == null || val_ENFERMEROS_PROCEDIMIENTO_CASO_b64 == "") && (val_ENFERMEROS_PROCEDIMIENTO_CASO != null || val_ENFERMEROS_PROCEDIMIENTO_CASO != ""))
            {
                context.form.getField('custevent29').updateDisplayType({displayType:'hidden'});
                var base64_val_ENFERMEROS_PROCEDIMIENTO_CASO = encode.convert({string: val_ENFERMEROS_PROCEDIMIENTO_CASO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent360').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent360').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent360", value: base64_val_ENFERMEROS_PROCEDIMIENTO_CASO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent29').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent360').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent360').updateDisplayType({displayType:'disabled'});
            }

            // ********************************** Historial Fotografico
            var val_DISENO_IMG1 = objRecord.getText({fieldId: 'custevent82'});
            var val_DISENO_IMG1_b64  = objRecord.getValue({fieldId: 'custevent361'});
            if((val_DISENO_IMG1_b64 == null || val_DISENO_IMG1_b64 == "") && (val_DISENO_IMG1 != null || val_DISENO_IMG1 != ""))
            {
                context.form.getField('custevent82').updateDisplayType({displayType:'hidden'});
                var base64_val_DISENO_IMG1 = encode.convert({string: val_DISENO_IMG1, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent361').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent361').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent361", value: base64_val_DISENO_IMG1});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent82').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent361').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent361').updateDisplayType({displayType:'disabled'});
            }

            var val_DISENO_IMG2 = objRecord.getText({fieldId: 'custevent83'});
            var val_DISENO_IMG2_b64  = objRecord.getValue({fieldId: 'custevent362'});
            if((val_DISENO_IMG2_b64 == null || val_DISENO_IMG2_b64 == "") && (val_DISENO_IMG2 != null || val_DISENO_IMG2 != ""))
            {
                context.form.getField('custevent83').updateDisplayType({displayType:'hidden'});
                var base64_val_DISENO_IMG2 = encode.convert({string: val_DISENO_IMG2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent362').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent362').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent362", value: base64_val_DISENO_IMG2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent83').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent362').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent362').updateDisplayType({displayType:'disabled'});
            }

            var val_DISENO_IMG3 = objRecord.getText({fieldId: 'custevent84'});
            var val_DISENO_IMG3_b64  = objRecord.getValue({fieldId: 'custevent363'});
            if((val_DISENO_IMG3_b64 == null || val_DISENO_IMG3_b64 == "") && (val_DISENO_IMG3 != null || val_DISENO_IMG3 != ""))
            {
                context.form.getField('custevent84').updateDisplayType({displayType:'hidden'});
                var base64_val_DISENO_IMG3 = encode.convert({string: val_DISENO_IMG3, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent363').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent363').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent363", value: base64_val_DISENO_IMG3});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent84').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent363').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent363').updateDisplayType({displayType:'disabled'});
            }

            var val_DISENO_IMG4 = objRecord.getText({fieldId: 'custevent85'});
            var val_DISENO_IMG4_b64  = objRecord.getValue({fieldId: 'custevent364'});
            if((val_DISENO_IMG4_b64 == null || val_DISENO_IMG4_b64 == "") && (val_DISENO_IMG4 != null || val_DISENO_IMG4 != ""))
            {
                context.form.getField('custevent85').updateDisplayType({displayType:'hidden'});
                var base64_val_DISENO_IMG4 = encode.convert({string: val_DISENO_IMG4, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent364').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent364').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent364", value: base64_val_DISENO_IMG4});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent85').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent364').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent364').updateDisplayType({displayType:'disabled'});
            }

            var val_TEXTO_IMAGEN = objRecord.getValue({fieldId: 'custevent88'});
            var val_TEXTO_IMAGEN_b64  = objRecord.getValue({fieldId: 'custevent365'});
            if((val_TEXTO_IMAGEN_b64 == null || val_TEXTO_IMAGEN_b64 == "") && (val_TEXTO_IMAGEN != null || val_TEXTO_IMAGEN != ""))
            {
                context.form.getField('custevent88').updateDisplayType({displayType:'hidden'});
                var base64_val_TEXTO_IMAGEN = encode.convert({string: val_TEXTO_IMAGEN, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent365').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent365').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent365", value: base64_val_TEXTO_IMAGEN});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent88').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent365').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent365').updateDisplayType({displayType:'disabled'});
            }

            var val_IMAGEN_ANTES = objRecord.getText({fieldId: 'custevent76'});
            var val_IMAGEN_ANTES_b64  = objRecord.getValue({fieldId: 'custevent366'});
            if((val_IMAGEN_ANTES_b64 == null || val_IMAGEN_ANTES_b64 == "") && (val_IMAGEN_ANTES != null || val_IMAGEN_ANTES != ""))
            {
                context.form.getField('custevent76').updateDisplayType({displayType:'hidden'});
                var base64_val_IMAGEN_ANTES = encode.convert({string: val_IMAGEN_ANTES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent366').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent366').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent366", value: base64_val_IMAGEN_ANTES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent76').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent366').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent366').updateDisplayType({displayType:'disabled'});
            }

            var val_IMAGEN_DESPUES = objRecord.getText({fieldId: 'custevent77'});
            var val_IMAGEN_DESPUES_b64  = objRecord.getValue({fieldId: 'custevent367'});
            if((val_IMAGEN_DESPUES_b64 == null || val_IMAGEN_DESPUES_b64 == "") && (val_IMAGEN_DESPUES != null || val_IMAGEN_DESPUES != ""))
            {
                context.form.getField('custevent77').updateDisplayType({displayType:'hidden'});
                var base64_val_IMAGEN_DESPUES = encode.convert({string: val_IMAGEN_DESPUES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent367').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent367').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent367", value: base64_val_IMAGEN_DESPUES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent77').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent367').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent367').updateDisplayType({displayType:'disabled'});
            }

            var val_IMAGEN_FRONTAL = objRecord.getText({fieldId: 'custevent78'});
            var val_IMAGEN_FRONTAL_b64  = objRecord.getValue({fieldId: 'custevent368'});
            if((val_IMAGEN_FRONTAL_b64 == null || val_IMAGEN_FRONTAL_b64 == "") && (val_IMAGEN_FRONTAL != null || val_IMAGEN_FRONTAL != ""))
            {
                context.form.getField('custevent78').updateDisplayType({displayType:'hidden'});
                var base64_val_IMAGEN_FRONTAL = encode.convert({string: val_IMAGEN_FRONTAL, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent368').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent368').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent368", value: base64_val_IMAGEN_FRONTAL});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent78').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent368').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent368').updateDisplayType({displayType:'disabled'});
            }

            var val_EXTRA_IMG = objRecord.getText({fieldId: 'custevent81'});
            var val_EXTRA_IMG_b64  = objRecord.getValue({fieldId: 'custevent369'});
            if((val_EXTRA_IMG_b64 == null || val_EXTRA_IMG_b64 == "") && (val_EXTRA_IMG != null || val_EXTRA_IMG != ""))
            {
                context.form.getField('custevent81').updateDisplayType({displayType:'hidden'});
                var base64_val_EXTRA_IMG = encode.convert({string: val_EXTRA_IMG, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent369').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent369').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent369", value: base64_val_EXTRA_IMG});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent81').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent369').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent369').updateDisplayType({displayType:'disabled'});
            }

            var val_FIRMA_MEDICO_INJERTO = objRecord.getValue({fieldId: 'custevent87'});
            var val_FIRMA_MEDICO_INJERTO_b64  = objRecord.getValue({fieldId: 'custevent370'});
            if((val_FIRMA_MEDICO_INJERTO_b64 == null || val_FIRMA_MEDICO_INJERTO_b64 == "") && (val_FIRMA_MEDICO_INJERTO != null || val_FIRMA_MEDICO_INJERTO != ""))
            {
                context.form.getField('custevent87').updateDisplayType({displayType:'hidden'});
                var base64_val_FIRMA_MEDICO_INJERTO = encode.convert({string: val_FIRMA_MEDICO_INJERTO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent370').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent370').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent370", value: base64_val_FIRMA_MEDICO_INJERTO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent87').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent370').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent370').updateDisplayType({displayType:'disabled'});
            }

            var val_FIRMAR = objRecord.getValue({fieldId: 'custevent200'});
            var val_FIRMAR_b64  = objRecord.getValue({fieldId: 'custevent371'});
            if((val_FIRMAR_b64 == null || val_FIRMAR_b64 == "") && (val_FIRMAR != null || val_FIRMAR != ""))
            {
                context.form.getField('custevent200').updateDisplayType({displayType:'hidden'});
                var base64_val_FIRMAR = encode.convert({string: val_FIRMAR, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent371').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent371').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent371", value: base64_val_FIRMAR});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent200').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent371').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent371').updateDisplayType({displayType:'disabled'});
            }

            var val_FIRMA_DCLIENTE = objRecord.getValue({fieldId: 'custevent86'});
            var val_FIRMA_DCLIENTE_b64  = objRecord.getValue({fieldId: 'custevent372'});
            if((val_FIRMA_DCLIENTE_b64 == null || val_FIRMA_DCLIENTE_b64 == "") && (val_FIRMA_DCLIENTE != null || val_FIRMA_DCLIENTE != ""))
            {
                context.form.getField('custevent86').updateDisplayType({displayType:'hidden'});
                var base64_val_FIRMA_DCLIENTE = encode.convert({string: val_FIRMA_DCLIENTE, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent372').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent372').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent372", value: base64_val_FIRMA_DCLIENTE});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent86').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent372').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent372').updateDisplayType({displayType:'disabled'});
            }

            var val_FIRMAR_CONSENTIMIENTO = objRecord.getValue({fieldId: 'custevent268'});
            var val_FIRMAR_CONSENTIMIENTO_b64  = objRecord.getValue({fieldId: 'custevent373'});
            if((val_FIRMAR_CONSENTIMIENTO_b64 == null || val_FIRMAR_CONSENTIMIENTO_b64 == "") && (val_FIRMAR_CONSENTIMIENTO != null || val_FIRMAR_CONSENTIMIENTO != ""))
            {
                context.form.getField('custevent268').updateDisplayType({displayType:'hidden'});
                var base64_val_FIRMAR_CONSENTIMIENTO = encode.convert({string: val_FIRMAR_CONSENTIMIENTO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent373').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent373').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent373", value: base64_val_FIRMAR_CONSENTIMIENTO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent268').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent373').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent373').updateDisplayType({displayType:'disabled'});
            }

            var val_FIRMATEST = objRecord.getValue({fieldId: 'custevent201'});
            var val_FIRMATEST_b64  = objRecord.getValue({fieldId: 'custevent374'});
            if((val_FIRMATEST_b64 == null || val_FIRMATEST_b64 == "") && (val_FIRMATEST != null || val_FIRMATEST != ""))
            {
                context.form.getField('custevent201').updateDisplayType({displayType:'hidden'});
                var base64_val_FIRMATEST = encode.convert({string: val_FIRMATEST, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent374').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent374').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent374", value: base64_val_FIRMATEST});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent201').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent374').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent374').updateDisplayType({displayType:'disabled'});
            }

            var val_FIRMA_TESTIMONIAL = objRecord.getValue({fieldId: 'custevent327'});
            var val_FIRMA_TESTIMONIAL_b64  = objRecord.getValue({fieldId: 'custevent375'});
            if((val_FIRMA_TESTIMONIAL_b64 == null || val_FIRMA_TESTIMONIAL_b64 == "") && (val_FIRMA_TESTIMONIAL != null || val_FIRMA_TESTIMONIAL != ""))
            {
                context.form.getField('custevent327').updateDisplayType({displayType:'hidden'});
                var base64_val_FIRMA_TESTIMONIAL = encode.convert({string: val_FIRMA_TESTIMONIAL, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent375').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent375').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent375", value: base64_val_FIRMA_TESTIMONIAL});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent327').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent375').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent375').updateDisplayType({displayType:'disabled'});
            }

            // ********************************** PRP
            var val_RESPONSABLE = objRecord.getValue({fieldId: 'custevent113'});
            var val_RESPONSABLE_b64  = objRecord.getValue({fieldId: 'custevent376'});
            if((val_RESPONSABLE_b64 == null || val_RESPONSABLE_b64 == "") && (val_RESPONSABLE != null || val_RESPONSABLE != ""))
            {
                context.form.getField('custevent113').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE = encode.convert({string: val_RESPONSABLE, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent376').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent376').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent376", value: base64_val_RESPONSABLE});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent113').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent376').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent376').updateDisplayType({displayType:'disabled'});
            }

            var val_REGION_PRP2 = objRecord.getValue({fieldId: 'custevent114'});
            var val_REGION_PRP2_b64  = objRecord.getValue({fieldId: 'custevent377'});
            if((val_REGION_PRP2_b64 == null || val_REGION_PRP2_b64 == "") && (val_REGION_PRP2 != null || val_REGION_PRP2 != ""))
            {
                context.form.getField('custevent114').updateDisplayType({displayType:'hidden'});
                var base64_val_REGION_PRP2 = encode.convert({string: val_REGION_PRP2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent377').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent377').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent377", value: base64_val_REGION_PRP2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent114').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent377').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent377').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_APLICACION_PRP2 = objRecord.getValue({fieldId: 'custevent115'});
            var val_RESPONSABLE_APLICACION_PRP2_b64  = objRecord.getValue({fieldId: 'custevent378'});
            if((val_RESPONSABLE_APLICACION_PRP2_b64 == null || val_RESPONSABLE_APLICACION_PRP2_b64 == "") && (val_RESPONSABLE_APLICACION_PRP2 != null || val_RESPONSABLE_APLICACION_PRP2 != ""))
            {
                context.form.getField('custevent115').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_APLICACION_PRP2 = encode.convert({string: val_RESPONSABLE_APLICACION_PRP2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent378').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent378').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent378", value: base64_val_RESPONSABLE_APLICACION_PRP2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent115').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent378').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent378').updateDisplayType({displayType:'disabled'});
            }

            var val_REGION_PRP = objRecord.getValue({fieldId: 'custevent116'});
            var val_REGION_PRP_b64  = objRecord.getValue({fieldId: 'custevent379'});
            if((val_REGION_PRP_b64 == null || val_REGION_PRP_b64 == "") && (val_REGION_PRP != null || val_REGION_PRP != ""))
            {
                context.form.getField('custevent116').updateDisplayType({displayType:'hidden'});
                var base64_val_REGION_PRP = encode.convert({string: val_REGION_PRP, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent379').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent379').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent379", value: base64_val_REGION_PRP});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent116').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent379').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent379').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_APLICACION_PRP = objRecord.getValue({fieldId: 'custevent117'});
            var val_RESPONSABLE_APLICACION_PRP_b64 = objRecord.getValue({fieldId: 'custevent380'});
            if((val_RESPONSABLE_APLICACION_PRP_b64 == null || val_RESPONSABLE_APLICACION_PRP_b64 == "") && (val_RESPONSABLE_APLICACION_PRP != null || val_RESPONSABLE_APLICACION_PRP != ""))
            {
                context.form.getField('custevent117').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_APLICACION_PRP = encode.convert({string: val_RESPONSABLE_APLICACION_PRP, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent380').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent380').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent380", value: base64_val_RESPONSABLE_APLICACION_PRP});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent117').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent380').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent380').updateDisplayType({displayType:'disabled'});
            }

            var val_TIEMPO = objRecord.getValue({fieldId: 'custevent118'});
            var val_TIEMPO_b64 = objRecord.getValue({fieldId: 'custevent381'});
            if((val_TIEMPO_b64 == null || val_TIEMPO_b64 == "") && (val_TIEMPO != null || val_TIEMPO != ""))
            {
                context.form.getField('custevent118').updateDisplayType({displayType:'hidden'});
                var base64_val_TIEMPO = encode.convert({string: val_TIEMPO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent381').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent381').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent381", value: base64_val_TIEMPO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent118').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent381').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent381').updateDisplayType({displayType:'disabled'});
            }

            var val_CENTRIFUGADOS_A = objRecord.getValue({fieldId: 'custevent119'});
            var val_CENTRIFUGADOS_A_b64 = objRecord.getValue({fieldId: 'custevent382'});
            if((val_CENTRIFUGADOS_A_b64 == null || val_CENTRIFUGADOS_A_b64 == "") && (val_CENTRIFUGADOS_A != null || val_CENTRIFUGADOS_A != ""))
            {
                context.form.getField('custevent119').updateDisplayType({displayType:'hidden'});
                var base64_val_CENTRIFUGADOS_A = encode.convert({string: val_CENTRIFUGADOS_A, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent382').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent382').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent382", value: base64_val_CENTRIFUGADOS_A});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent119').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent382').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent382').updateDisplayType({displayType:'disabled'});
            }

            var val_TUBOS_OBTENIDOS = objRecord.getValue({fieldId: 'custevent120'});
            var val_TUBOS_OBTENIDOS_b64 = objRecord.getValue({fieldId: 'custevent383'});
            if((val_TUBOS_OBTENIDOS_b64 == null || val_TUBOS_OBTENIDOS_b64 == "") && (val_TUBOS_OBTENIDOS != null || val_TUBOS_OBTENIDOS != ""))
            {
                context.form.getField('custevent120').updateDisplayType({displayType:'hidden'});
                var base64_val_TUBOS_OBTENIDOS = encode.convert({string: val_TUBOS_OBTENIDOS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent383').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent383').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent383", value: base64_val_TUBOS_OBTENIDOS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent120').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent383').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent383').updateDisplayType({displayType:'disabled'});
            }

            var val_SITIO_DE_PUNCION = objRecord.getValue({fieldId: 'custevent121'});
            var val_SITIO_DE_PUNCION_b64 = objRecord.getValue({fieldId: 'custevent384'});
            if((val_SITIO_DE_PUNCION_b64 == null || val_SITIO_DE_PUNCION_b64 == "") && (val_SITIO_DE_PUNCION != null || val_SITIO_DE_PUNCION != ""))
            {
                context.form.getField('custevent121').updateDisplayType({displayType:'hidden'});
                var base64_val_SITIO_DE_PUNCION = encode.convert({string: val_SITIO_DE_PUNCION, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent384').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent384').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent384", value: base64_val_SITIO_DE_PUNCION});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent121').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent384').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent384').updateDisplayType({displayType:'disabled'});
            }

            var val_EQUIPO_UTILIZADO = objRecord.getValue({fieldId: 'custevent122'});
            var val_EQUIPO_UTILIZADO_b64 = objRecord.getValue({fieldId: 'custevent385'});
            if((val_EQUIPO_UTILIZADO_b64 == null || val_EQUIPO_UTILIZADO_b64 == "") && (val_EQUIPO_UTILIZADO != null || val_EQUIPO_UTILIZADO != ""))
            {
                context.form.getField('custevent122').updateDisplayType({displayType:'hidden'});
                var base64_val_EQUIPO_UTILIZADO = encode.convert({string: val_EQUIPO_UTILIZADO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent385').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent385').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent385", value: base64_val_EQUIPO_UTILIZADO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent122').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent385').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent385').updateDisplayType({displayType:'disabled'});
            }

            var val_NUMERO_DE_INTENTOS = objRecord.getValue({fieldId: 'custevent123'});
            var val_NUMERO_DE_INTENTOS_b64 = objRecord.getValue({fieldId: 'custevent386'});
            if((val_NUMERO_DE_INTENTOS_b64 == null || val_NUMERO_DE_INTENTOS_b64 == "") && (val_NUMERO_DE_INTENTOS != null || val_NUMERO_DE_INTENTOS != ""))
            {
                context.form.getField('custevent123').updateDisplayType({displayType:'hidden'});
                var base64_val_NUMERO_DE_INTENTOS = encode.convert({string: val_NUMERO_DE_INTENTOS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent386').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent386').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent386", value: base64_val_NUMERO_DE_INTENTOS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent123').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent386').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent386').updateDisplayType({displayType:'disabled'});
            }

            var val_CONSIENTE = objRecord.getText({fieldId: 'custevent89'});
            var val_CONSIENTE_b64 = objRecord.getValue({fieldId: 'custevent387'});
            if((val_CONSIENTE_b64 == null || val_CONSIENTE_b64 == "") && (val_CONSIENTE != null || val_CONSIENTE != ""))
            {
                context.form.getField('custevent89').updateDisplayType({displayType:'hidden'});
                var base64_val_CONSIENTE = encode.convert({string: val_CONSIENTE, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent387').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent387').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent387", value: base64_val_CONSIENTE});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent89').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent387').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent387').updateDisplayType({displayType:'disabled'});
            }

            var val_TRANQUILO = objRecord.getText({fieldId: 'custevent90'});
            var val_TRANQUILO_b64 = objRecord.getValue({fieldId: 'custevent388'});
            if((val_TRANQUILO_b64 == null || val_TRANQUILO_b64 == "") && (val_TRANQUILO != null || val_TRANQUILO != ""))
            {
                context.form.getField('custevent90').updateDisplayType({displayType:'hidden'});
                var base64_val_TRANQUILO = encode.convert({string: val_TRANQUILO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent388').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent388').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent388", value: base64_val_TRANQUILO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent90').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent388').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent388').updateDisplayType({displayType:'disabled'});
            }

            var val_ANSIOSO = objRecord.getText({fieldId: 'custevent91'});
            var val_ANSIOSO_b64 = objRecord.getValue({fieldId: 'custevent389'});
            if((val_ANSIOSO_b64 == null || val_ANSIOSO_b64 == "") && (val_ANSIOSO != null || val_ANSIOSO != ""))
            {
                context.form.getField('custevent91').updateDisplayType({displayType:'hidden'});
                var base64_val_ANSIOSO = encode.convert({string: val_ANSIOSO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent389').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent389').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent389", value: base64_val_ANSIOSO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent91').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent389').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent389').updateDisplayType({displayType:'disabled'});
            }

            var val_LETARGICO = objRecord.getText({fieldId: 'custevent92'});
            var val_LETARGICO_b64 = objRecord.getValue({fieldId: 'custevent390'});
            if((val_LETARGICO_b64 == null || val_LETARGICO_b64 == "") && (val_LETARGICO != null || val_LETARGICO != ""))
            {
                context.form.getField('custevent92').updateDisplayType({displayType:'hidden'});
                var base64_val_LETARGICO = encode.convert({string: val_LETARGICO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent390').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent390').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent390", value: base64_val_LETARGICO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent92').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent390').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent390').updateDisplayType({displayType:'disabled'});
            }

            var val_NERVIOSO = objRecord.getText({fieldId: 'custevent93'});
            var val_NERVIOSO_b64 = objRecord.getValue({fieldId: 'custevent391'});
            if((val_NERVIOSO_b64 == null || val_NERVIOSO_b64 == "") && (val_NERVIOSO != null || val_NERVIOSO != ""))
            {
                context.form.getField('custevent93').updateDisplayType({displayType:'hidden'});
                var base64_val_NERVIOSO = encode.convert({string: val_NERVIOSO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent391').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent391').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent391", value: base64_val_NERVIOSO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent93').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent391').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent391').updateDisplayType({displayType:'disabled'});
            }

            var val_ALERTA = objRecord.getText({fieldId: 'custevent94'});
            var val_ALERTA_b64 = objRecord.getValue({fieldId: 'custevent392'});
            if((val_ALERTA_b64 == null || val_ALERTA_b64 == "") && (val_ALERTA != null || val_ALERTA != ""))
            {
                context.form.getField('custevent94').updateDisplayType({displayType:'hidden'});
                var base64_val_ALERTA = encode.convert({string: val_ALERTA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent392').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent392').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent392", value: base64_val_ALERTA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent94').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent392').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent392').updateDisplayType({displayType:'disabled'});
            }

            var val_ORIENTADO = objRecord.getText({fieldId: 'custevent95'});
            var val_ORIENTADO_b64 = objRecord.getValue({fieldId: 'custevent393'});
            if((val_ORIENTADO_b64 == null || val_ORIENTADO_b64 == "") && (val_ORIENTADO != null || val_ORIENTADO != ""))
            {
                context.form.getField('custevent95').updateDisplayType({displayType:'hidden'});
                var base64_val_ORIENTADO = encode.convert({string: val_ORIENTADO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent393').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent393').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent393", value: base64_val_ORIENTADO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent95').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent393').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent393').updateDisplayType({displayType:'disabled'});
            }

            var val_OTRO = objRecord.getValue({fieldId: 'custevent96'});
            var val_OTRO_b64 = objRecord.getValue({fieldId: 'custevent394'});
            if((val_OTRO_b64 == null || val_OTRO_b64 == "") && (val_OTRO != null || val_OTRO != ""))
            {
                context.form.getField('custevent96').updateDisplayType({displayType:'hidden'});
                var base64_val_OTRO = encode.convert({string: val_OTRO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent394').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent394').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent394", value: base64_val_OTRO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent96').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent394').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent394').updateDisplayType({displayType:'disabled'});
            }

            var val_P_F_INICIO = objRecord.getText({fieldId: 'custevent97'});
            var val_P_F_INICIO_b64 = objRecord.getValue({fieldId: 'custevent395'});
            if((val_P_F_INICIO_b64 == null || val_P_F_INICIO_b64 == "") && (val_P_F_INICIO != null || val_P_F_INICIO != ""))
            {
                context.form.getField('custevent97').updateDisplayType({displayType:'hidden'});
                var base64_val_P_F_INICIO = encode.convert({string: val_P_F_INICIO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent395').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent395').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent395", value: base64_val_P_F_INICIO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent97').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent395').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent395').updateDisplayType({displayType:'disabled'});
            }

            var val_P_F_FINAL = objRecord.getText({fieldId: 'custevent98'});
            var val_P_F_FINAL_b64 = objRecord.getValue({fieldId: 'custevent396'});
            if((val_P_F_FINAL_b64 == null || val_P_F_FINAL_b64 == "") && (val_P_F_FINAL != null || val_P_F_FINAL != ""))
            {
                context.form.getField('custevent98').updateDisplayType({displayType:'hidden'});
                var base64_val_P_F_FINAL = encode.convert({string: val_P_F_FINAL, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent396').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent396').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent396", value: base64_val_P_F_FINAL});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent98').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent396').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent396').updateDisplayType({displayType:'disabled'});
            }

            var val_HORA_DE_INICIO_A = objRecord.getValue({fieldId: 'custevent99'});
            var val_HORA_DE_INICIO_A_b64 = objRecord.getValue({fieldId: 'custevent397'});
            if((val_HORA_DE_INICIO_A_b64 == null || val_HORA_DE_INICIO_A_b64 == "") && (val_HORA_DE_INICIO_A != null || val_HORA_DE_INICIO_A != ""))
            {
                context.form.getField('custevent99').updateDisplayType({displayType:'hidden'});
                var base64_val_HORA_DE_INICIO_A = encode.convert({string: val_HORA_DE_INICIO_A, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent397').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent397').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent397", value: base64_val_HORA_DE_INICIO_A});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent99').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent397').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent397').updateDisplayType({displayType:'disabled'});
            }

            var val_HORA_DE_TERMINO_A = objRecord.getValue({fieldId: 'custevent100'});
            var val_HORA_DE_TERMINO_A_b64 = objRecord.getValue({fieldId: 'custevent398'});
            if((val_HORA_DE_TERMINO_A_b64 == null || val_HORA_DE_TERMINO_A_b64 == "") && (val_HORA_DE_TERMINO_A != null || val_HORA_DE_TERMINO_A != ""))
            {
                context.form.getField('custevent100').updateDisplayType({displayType:'hidden'});
                var base64_val_HORA_DE_TERMINO_A = encode.convert({string: val_HORA_DE_TERMINO_A, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent398').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent398').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent398", value: base64_val_HORA_DE_TERMINO_A});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent100').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent398').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent398').updateDisplayType({displayType:'disabled'});
            }

            var val_ANESTESICO = objRecord.getValue({fieldId: 'custevent101'});
            var val_ANESTESICO_b64 = objRecord.getValue({fieldId: 'custevent399'});
            if((val_ANESTESICO_b64 == null || val_ANESTESICO_b64 == "") && (val_ANESTESICO != null || val_ANESTESICO != ""))
            {
                context.form.getField('custevent101').updateDisplayType({displayType:'hidden'});
                var base64_val_ANESTESICO = encode.convert({string: val_ANESTESICO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent399').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent399').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent399", value: base64_val_ANESTESICO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent101').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent399').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent399').updateDisplayType({displayType:'disabled'});
            }

            var val_INFILTRO = objRecord.getValue({fieldId: 'custevent102'});
            var val_INFILTRO_b64 = objRecord.getValue({fieldId: 'custevent400'});
            if((val_INFILTRO_b64 == null || val_INFILTRO_b64 == "") && (val_INFILTRO != null || val_INFILTRO != ""))
            {
                context.form.getField('custevent102').updateDisplayType({displayType:'hidden'});
                var base64_val_INFILTRO = encode.convert({string: val_INFILTRO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent400').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent400').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent400", value: base64_val_INFILTRO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent102').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent400').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent400').updateDisplayType({displayType:'disabled'});
            }

            var val_ANESTESICO_ZI = objRecord.getValue({fieldId: 'custevent103'});
            var val_ANESTESICO_ZI_b64 = objRecord.getValue({fieldId: 'custevent401'});
            if((val_ANESTESICO_ZI_b64 == null || val_ANESTESICO_ZI_b64 == "") && (val_ANESTESICO_ZI != null || val_ANESTESICO_ZI != ""))
            {
                context.form.getField('custevent103').updateDisplayType({displayType:'hidden'});
                var base64_val_ANESTESICO_ZI = encode.convert({string: val_ANESTESICO_ZI, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent401').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent401').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent401", value: base64_val_ANESTESICO_ZI});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent103').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent401').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent401').updateDisplayType({displayType:'disabled'});
            }

            var val_INFILTRO_ZI = objRecord.getValue({fieldId: 'custevent104'});
            var val_INFILTRO_ZI_b64 = objRecord.getValue({fieldId: 'custevent402'});
            if((val_INFILTRO_ZI_b64 == null || val_INFILTRO_ZI_b64 == "") && (val_INFILTRO_ZI != null || val_INFILTRO_ZI != ""))
            {
                context.form.getField('custevent104').updateDisplayType({displayType:'hidden'});
                var base64_val_INFILTRO_ZI = encode.convert({string: val_INFILTRO_ZI, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent402').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent402').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent402", value: base64_val_INFILTRO_ZI});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent104').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent402').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent402').updateDisplayType({displayType:'disabled'});
            }

            var val_HORA_DE_INICIO_ZI = objRecord.getValue({fieldId: 'custevent105'});
            var val_HORA_DE_INICIO_ZI_b64 = objRecord.getValue({fieldId: 'custevent403'});
            if((val_HORA_DE_INICIO_ZI_b64 == null || val_HORA_DE_INICIO_ZI_b64 == "") && (val_HORA_DE_INICIO_ZI != null || val_HORA_DE_INICIO_ZI != ""))
            {
                context.form.getField('custevent105').updateDisplayType({displayType:'hidden'});
                var base64_val_HORA_DE_INICIO_ZI = encode.convert({string: val_HORA_DE_INICIO_ZI, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent403').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent403').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent403", value: base64_val_HORA_DE_INICIO_ZI});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent105').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent403').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent403').updateDisplayType({displayType:'disabled'});
            }

            var val_HORA_DE_TERMINO_ZI = objRecord.getValue({fieldId: 'custevent106'});
            var val_HORA_DE_TERMINO_ZI_b64 = objRecord.getValue({fieldId: 'custevent404'});
            if((val_HORA_DE_TERMINO_ZI_b64 == null || val_HORA_DE_TERMINO_ZI_b64 == "") && (val_HORA_DE_TERMINO_ZI != null || val_HORA_DE_TERMINO_ZI != ""))
            {
                context.form.getField('custevent106').updateDisplayType({displayType:'hidden'});
                var base64_val_HORA_DE_TERMINO_ZI = encode.convert({string: val_HORA_DE_TERMINO_ZI, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent404').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent404').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent404", value: base64_val_HORA_DE_TERMINO_ZI});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent106').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent404').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent404').updateDisplayType({displayType:'disabled'});
            }

            var val_REALIZO = objRecord.getValue({fieldId: 'custevent107'});
            var val_REALIZO_b64 = objRecord.getValue({fieldId: 'custevent405'});
            if((val_REALIZO_b64 == null || val_REALIZO_b64 == "") && (val_REALIZO != null || val_REALIZO != ""))
            {
                context.form.getField('custevent107').updateDisplayType({displayType:'hidden'});
                var base64_val_REALIZO = encode.convert({string: val_REALIZO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent405').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent405').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent405", value: base64_val_REALIZO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent107').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent405').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent405').updateDisplayType({displayType:'disabled'});
            }

            var val_REGION = objRecord.getText({fieldId: 'custevent108'});
            var val_REGION_b64 = objRecord.getValue({fieldId: 'custevent406'});
            if((val_REGION_b64 == null || val_REGION_b64 == "") && (val_REGION != null || val_REGION != ""))
            {
                context.form.getField('custevent108').updateDisplayType({displayType:'hidden'});
                var base64_val_REGION = encode.convert({string: val_REGION, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent406').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent406').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent406", value: base64_val_REGION});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent108').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent406').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent406').updateDisplayType({displayType:'disabled'});
            }

            var val_ANTISEPTICO = objRecord.getValue({fieldId: 'custevent109'});
            var val_ANTISEPTICO_b64 = objRecord.getValue({fieldId: 'custevent407'});
            if((val_ANTISEPTICO_b64 == null || val_ANTISEPTICO_b64 == "") && (val_ANTISEPTICO != null || val_ANTISEPTICO != ""))
            {
                context.form.getField('custevent109').updateDisplayType({displayType:'hidden'});
                var base64_val_ANTISEPTICO = encode.convert({string: val_ANTISEPTICO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent407').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent407').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent407", value: base64_val_ANTISEPTICO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent109').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent407').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent407').updateDisplayType({displayType:'disabled'});
            }

            var val_ANTISEPTICO_2 = objRecord.getValue({fieldId: 'custevent110'});
            var val_ANTISEPTICO_2_b64 = objRecord.getValue({fieldId: 'custevent408'});
            if((val_ANTISEPTICO_2_b64 == null || val_ANTISEPTICO_2_b64 == "") && (val_ANTISEPTICO_2 != null || val_ANTISEPTICO_2 != ""))
            {
                context.form.getField('custevent110').updateDisplayType({displayType:'hidden'});
                var base64_val_ANTISEPTICO_2 = encode.convert({string: val_ANTISEPTICO_2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent408').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent408').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent408", value: base64_val_ANTISEPTICO_2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent110').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent408').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent408').updateDisplayType({displayType:'disabled'});
            }

            var val_REGION_2 = objRecord.getText({fieldId: 'custevent111'});
            var val_REGION_2_b64 = objRecord.getValue({fieldId: 'custevent409'});
            if((val_REGION_2_b64 == null || val_REGION_2_b64 == "") && (val_REGION_2 != null || val_REGION_2 != ""))
            {
                context.form.getField('custevent111').updateDisplayType({displayType:'hidden'});
                var base64_val_REGION_2 = encode.convert({string: val_REGION_2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent409').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent409').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent409", value: base64_val_REGION_2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent111').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent409').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent409').updateDisplayType({displayType:'disabled'});
            }

            var val_REALIZO2 = objRecord.getText({fieldId: 'custevent112'});
            var val_REALIZO2_b64 = objRecord.getValue({fieldId: 'custevent410'});
            if((val_REALIZO2_b64 == null || val_REALIZO2_b64 == "") && (val_REALIZO2 != null || val_REALIZO2 != ""))
            {
                context.form.getField('custevent112').updateDisplayType({displayType:'hidden'});
                var base64_val_REALIZO2 = encode.convert({string: val_REALIZO2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent410').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent410').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent410", value: base64_val_REALIZO2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent112').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent410').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent410').updateDisplayType({displayType:'disabled'});
            }
			// ************************************* Observaciones
            var val_OBSERVACIIONES_DEL_PROCEDIMIENTO = objRecord.getValue({fieldId: 'custevent3'});
            var val_OBSERVACIIONES_DEL_PROCEDIMIENTO_b64 = objRecord.getValue({fieldId: 'custevent411'});
            if((val_OBSERVACIIONES_DEL_PROCEDIMIENTO_b64 == null || val_OBSERVACIIONES_DEL_PROCEDIMIENTO_b64 == "") && (val_OBSERVACIIONES_DEL_PROCEDIMIENTO != null || val_OBSERVACIIONES_DEL_PROCEDIMIENTO != ""))
            {
                context.form.getField('custevent3').updateDisplayType({displayType:'hidden'});
                var base64_val_OBSERVACIIONES_DEL_PROCEDIMIENTO = encode.convert({string: val_OBSERVACIIONES_DEL_PROCEDIMIENTO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent411').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent411').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent411", value: base64_val_OBSERVACIIONES_DEL_PROCEDIMIENTO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent3').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent411').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent411').updateDisplayType({displayType:'disabled'});
            }

            var val_T_A_PRE = objRecord.getValue({fieldId: 'custevent4'});
            var val_T_A_PRE_b64 = objRecord.getValue({fieldId: 'custevent412'});
            if((val_T_A_PRE_b64 == null || val_T_A_PRE_b64 == "") && (val_T_A_PRE != null || val_T_A_PRE != ""))
            {
                context.form.getField('custevent4').updateDisplayType({displayType:'hidden'});
                var base64_val_T_A_PRE = encode.convert({string: val_T_A_PRE, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent412').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent412').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent412", value: base64_val_T_A_PRE});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent4').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent412').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent412').updateDisplayType({displayType:'disabled'});
            }

            var val_T_A_TRANS = objRecord.getValue({fieldId: 'custevent5'});
            var val_T_A_TRANS_b64 = objRecord.getValue({fieldId: 'custevent413'});
            if((val_T_A_TRANS_b64 == null || val_T_A_TRANS_b64 == "") && (val_T_A_TRANS != null || val_T_A_TRANS != ""))
            {
                context.form.getField('custevent5').updateDisplayType({displayType:'hidden'});
                var base64_val_T_A_TRANS = encode.convert({string: val_T_A_TRANS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent413').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent413').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent413", value: base64_val_T_A_TRANS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent5').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent413').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent413').updateDisplayType({displayType:'disabled'});
            }

            var val_T_A_POST = objRecord.getValue({fieldId: 'custevent6'});
            var val_T_A_POST_b64 = objRecord.getValue({fieldId: 'custevent414'});
            if((val_T_A_POST_b64 == null || val_T_A_POST_b64 == "") && (val_T_A_POST != null || val_T_A_POST != ""))
            {
                context.form.getField('custevent6').updateDisplayType({displayType:'hidden'});
                var base64_val_T_A_POST = encode.convert({string: val_T_A_POST, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent414').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent414').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent414", value: base64_val_T_A_POST});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent6').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent414').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent414').updateDisplayType({displayType:'disabled'});
            }

            var val_F_C_PRE = objRecord.getValue({fieldId: 'custevent7'});
            var val_F_C_PRE_b64 = objRecord.getValue({fieldId: 'custevent415'});
            if((val_F_C_PRE_b64 == null || val_F_C_PRE_b64 == "") && (val_F_C_PRE != null || val_F_C_PRE != ""))
            {
                context.form.getField('custevent7').updateDisplayType({displayType:'hidden'});
                var base64_val_F_C_PRE = encode.convert({string: val_F_C_PRE, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent415').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent415').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent415", value: base64_val_F_C_PRE});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent7').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent415').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent415').updateDisplayType({displayType:'disabled'});
            }

            var val_F_C_TRANS = objRecord.getValue({fieldId: 'custevent8'});
            var val_F_C_TRANS_b64 = objRecord.getValue({fieldId: 'custevent416'});
            if((val_F_C_TRANS_b64 == null || val_F_C_TRANS_b64 == "") && (val_F_C_TRANS != null || val_F_C_TRANS != ""))
            {
                context.form.getField('custevent8').updateDisplayType({displayType:'hidden'});
                var base64_val_F_C_TRANS = encode.convert({string: val_F_C_TRANS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent416').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent416').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent416", value: base64_val_F_C_TRANS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent8').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent416').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent416').updateDisplayType({displayType:'disabled'});
            }

            var val_F_C_POST = objRecord.getValue({fieldId: 'custevent9'});
            var val_F_C_POST_b64 = objRecord.getValue({fieldId: 'custevent417'});
            if((val_F_C_POST_b64 == null || val_F_C_POST_b64 == "") && (val_F_C_POST != null || val_F_C_POST != ""))
            {
                context.form.getField('custevent9').updateDisplayType({displayType:'hidden'});
                var base64_val_F_C_POST = encode.convert({string: val_F_C_POST, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent417').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent417').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent417", value: base64_val_F_C_POST});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent9').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent417').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent417').updateDisplayType({displayType:'disabled'});
            }

            var val_CORTE_CABELLO_ENFERMERIA = objRecord.getText({fieldId: 'custevent27'});
            var val_CORTE_CABELLO_ENFERMERIA_b64 = objRecord.getValue({fieldId: 'custevent418'});
            if((val_CORTE_CABELLO_ENFERMERIA_b64 == null || val_CORTE_CABELLO_ENFERMERIA_b64 == "") && (val_CORTE_CABELLO_ENFERMERIA != null || val_CORTE_CABELLO_ENFERMERIA != ""))
            {
                context.form.getField('custevent27').updateDisplayType({displayType:'hidden'});
                var base64_val_CORTE_CABELLO_ENFERMERIA = encode.convert({string: val_CORTE_CABELLO_ENFERMERIA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent418').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent418').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent418", value: base64_val_CORTE_CABELLO_ENFERMERIA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent27').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent418').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent418').updateDisplayType({displayType:'disabled'});
            }

            var val_CELIGO_GMAIL_MESSAGE_2 = objRecord.getValue({fieldId: 'custevent_celigo_gmail_msg_record'});
            var val_CELIGO_GMAIL_MESSAGE_2_b64 = objRecord.getValue({fieldId: 'custevent419'});
            if((val_CELIGO_GMAIL_MESSAGE_2_b64 == null || val_CELIGO_GMAIL_MESSAGE_2_b64 == "") && (val_CELIGO_GMAIL_MESSAGE_2 != null || val_CELIGO_GMAIL_MESSAGE_2 != ""))
            {
                context.form.getField('custevent_celigo_gmail_msg_record').updateDisplayType({displayType:'hidden'});
                var base64_val_CELIGO_GMAIL_MESSAGE_2 = encode.convert({string: val_CELIGO_GMAIL_MESSAGE_2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent419').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent419').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent419", value: base64_val_CELIGO_GMAIL_MESSAGE_2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent_celigo_gmail_msg_record').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent419').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent419').updateDisplayType({displayType:'disabled'});
            }
            // ************************************ Recetas
            var val_DR_RESPONSABLE = objRecord.getText({fieldId: 'custevent202'});
            var val_DR_RESPONSABLE_b64 = objRecord.getValue({fieldId: 'custevent420'});
            if((val_DR_RESPONSABLE_b64 == null || val_DR_RESPONSABLE_b64 == "") && (val_DR_RESPONSABLE != null || val_DR_RESPONSABLE != ""))
            {
                context.form.getField('custevent202').updateDisplayType({displayType:'hidden'});
                var base64_val_DR_RESPONSABLE = encode.convert({string: val_DR_RESPONSABLE, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent420').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent420').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent420", value: base64_val_DR_RESPONSABLE});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent202').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent420').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent420').updateDisplayType({displayType:'disabled'});
            }

            var val_FECHA_DE_EXPEDICION = objRecord.getText({fieldId: 'custevent197'});
            var val_FECHA_DE_EXPEDICION_b64 = objRecord.getValue({fieldId: 'custevent421'});
            if((val_FECHA_DE_EXPEDICION_b64 == null || val_FECHA_DE_EXPEDICION_b64 == "") && (val_FECHA_DE_EXPEDICION != null || val_FECHA_DE_EXPEDICION != ""))
            {
                context.form.getField('custevent197').updateDisplayType({displayType:'hidden'});
                var base64_val_FECHA_DE_EXPEDICION = encode.convert({string: val_FECHA_DE_EXPEDICION, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent421').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent421').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent421", value: base64_val_FECHA_DE_EXPEDICION});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent197').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent421').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent421').updateDisplayType({displayType:'disabled'});
            }

            var val_TIPO = objRecord.getText({fieldId: 'custevent203'});
            var val_TIPO_b64 = objRecord.getValue({fieldId: 'custevent422'});
            if((val_TIPO_b64 == null || val_TIPO_b64 == "") && (val_TIPO != null || val_TIPO != ""))
            {
                context.form.getField('custevent203').updateDisplayType({displayType:'hidden'});
                var base64_val_TIPO = encode.convert({string: val_TIPO, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent422').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent422').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent422", value: base64_val_TIPO});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent203').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent422').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent422').updateDisplayType({displayType:'disabled'});
            }

            var val_MEDICAMENTO_1 = objRecord.getText({fieldId: 'custevent177'});
            var val_MEDICAMENTO_1_b64 = objRecord.getValue({fieldId: 'custevent423'});
            if((val_MEDICAMENTO_1_b64 == null || val_MEDICAMENTO_1_b64 == "") && (val_MEDICAMENTO_1 != null || val_MEDICAMENTO_1 != ""))
            {
                context.form.getField('custevent177').updateDisplayType({displayType:'hidden'});
                var base64_val_MEDICAMENTO_1 = encode.convert({string: val_MEDICAMENTO_1, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent423').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent423').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent423", value: base64_val_MEDICAMENTO_1});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent177').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent423').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent423').updateDisplayType({displayType:'disabled'});
            }

            var val_INDICACION_1 = objRecord.getValue({fieldId: 'custevent180'});
            var val_INDICACION_1_b64 = objRecord.getValue({fieldId: 'custevent424'});
            if((val_INDICACION_1_b64 == null || val_INDICACION_1_b64 == "") && (val_INDICACION_1 != null || val_INDICACION_1 != ""))
            {
                context.form.getField('custevent180').updateDisplayType({displayType:'hidden'});
                var base64_val_INDICACION_1 = encode.convert({string: val_INDICACION_1, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent424').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent424').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent424", value: base64_val_INDICACION_1});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent180').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent424').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent424').updateDisplayType({displayType:'disabled'});
            }

            var val_MEDICAMENTO_2 = objRecord.getText({fieldId: 'custevent178'});
            var val_MEDICAMENTO_2_b64 = objRecord.getValue({fieldId: 'custevent425'});
            if((val_MEDICAMENTO_2_b64 == null || val_MEDICAMENTO_2_b64 == "") && (val_MEDICAMENTO_2 != null || val_MEDICAMENTO_2 != ""))
            {
                context.form.getField('custevent178').updateDisplayType({displayType:'hidden'});
                var base64_val_MEDICAMENTO_2 = encode.convert({string: val_MEDICAMENTO_2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent425').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent425').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent425", value: base64_val_MEDICAMENTO_2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent178').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent425').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent425').updateDisplayType({displayType:'disabled'});
            }

            var val_INDICACION_2 = objRecord.getValue({fieldId: 'custevent181'});
            var val_INDICACION_2_b64 = objRecord.getValue({fieldId: 'custevent426'});
            if((val_INDICACION_2_b64 == null || val_INDICACION_2_b64 == "") && (val_INDICACION_2 != null || val_INDICACION_2 != ""))
            {
                context.form.getField('custevent181').updateDisplayType({displayType:'hidden'});
                var base64_val_INDICACION_2 = encode.convert({string: val_INDICACION_2, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent426').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent426').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent426", value: base64_val_INDICACION_2});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent181').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent426').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent426').updateDisplayType({displayType:'disabled'});
            }

            var val_MEDICAMENTO_3 = objRecord.getValue({fieldId: 'custevent179'});
            var val_MEDICAMENTO_3_b64 = objRecord.getValue({fieldId: 'custevent427'});
            if((val_MEDICAMENTO_3_b64 == null || val_MEDICAMENTO_3_b64 == "") && (val_MEDICAMENTO_3 != null || val_MEDICAMENTO_3 != ""))
            {
                context.form.getField('custevent179').updateDisplayType({displayType:'hidden'});
                var base64_val_MEDICAMENTO_3 = encode.convert({string: val_MEDICAMENTO_3, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent427').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent427').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent427", value: base64_val_MEDICAMENTO_3});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent179').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent427').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent427').updateDisplayType({displayType:'disabled'});
            }

            var val_INDICACION_3 = objRecord.getValue({fieldId: 'custevent182'});
            var val_INDICACION_3_b64 = objRecord.getValue({fieldId: 'custevent428'});
            if((val_INDICACION_3_b64 == null || val_INDICACION_3_b64 == "") && (val_INDICACION_3 != null || val_INDICACION_3 != ""))
            {
                context.form.getField('custevent182').updateDisplayType({displayType:'hidden'});
                var base64_val_INDICACION_3 = encode.convert({string: val_INDICACION_3, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent428').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent428').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent428", value: base64_val_INDICACION_3});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent182').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent428').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent428').updateDisplayType({displayType:'disabled'});
            }

            var val_SHAMPOO_CONTROL_CAIDA = objRecord.getValue({fieldId: 'custevent183'});
            var val_SHAMPOO_CONTROL_CAIDA_b64 = objRecord.getValue({fieldId: 'custevent429'});
            if((val_SHAMPOO_CONTROL_CAIDA_b64 == null || val_SHAMPOO_CONTROL_CAIDA_b64 == "") && (val_SHAMPOO_CONTROL_CAIDA != null || val_SHAMPOO_CONTROL_CAIDA != ""))
            {
                context.form.getField('custevent183').updateDisplayType({displayType:'hidden'});
                var base64_val_SHAMPOO_CONTROL_CAIDA = encode.convert({string: val_SHAMPOO_CONTROL_CAIDA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent429').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent429').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent429", value: base64_val_SHAMPOO_CONTROL_CAIDA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent183').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent429').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent429').updateDisplayType({displayType:'disabled'});
            }

            var val_INDICACION_5 = objRecord.getValue({fieldId: 'custevent187'});
            var val_INDICACION_5_b64 = objRecord.getValue({fieldId: 'custevent430'});
            if((val_INDICACION_5_b64 == null || val_INDICACION_5_b64 == "") && (val_INDICACION_5 != null || val_INDICACION_5 != ""))
            {
                context.form.getField('custevent187').updateDisplayType({displayType:'hidden'});
                var base64_val_INDICACION_5 = encode.convert({string: val_INDICACION_5, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent430').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent430').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent430", value: base64_val_INDICACION_5});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent187').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent430').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent430').updateDisplayType({displayType:'disabled'});
            }

            var val_SHAMPOO_CONTROL_GRASA = objRecord.getValue({fieldId: 'custevent184'});
            var val_SHAMPOO_CONTROL_GRASA_b64 = objRecord.getValue({fieldId: 'custevent431'});
            if((val_SHAMPOO_CONTROL_GRASA_b64 == null || val_SHAMPOO_CONTROL_GRASA_b64 == "") && (val_SHAMPOO_CONTROL_GRASA != null || val_SHAMPOO_CONTROL_GRASA != ""))
            {
                context.form.getField('custevent184').updateDisplayType({displayType:'hidden'});
                var base64_val_SHAMPOO_CONTROL_GRASA = encode.convert({string: val_SHAMPOO_CONTROL_GRASA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent431').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent431').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent431", value: base64_val_SHAMPOO_CONTROL_GRASA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent184').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent431').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent431').updateDisplayType({displayType:'disabled'});
            }

            var val_INDICACION_6 = objRecord.getValue({fieldId: 'custevent188'});
            var val_INDICACION_6_b64 = objRecord.getValue({fieldId: 'custevent432'});
            if((val_INDICACION_6_b64 == null || val_INDICACION_6_b64 == "") && (val_INDICACION_6 != null || val_INDICACION_6 != ""))
            {
                context.form.getField('custevent188').updateDisplayType({displayType:'hidden'});
                var base64_val_INDICACION_6 = encode.convert({string: val_INDICACION_6, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent432').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent432').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent432", value: base64_val_INDICACION_6});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent188').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent432').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent432').updateDisplayType({displayType:'disabled'});
            }

            var val_AGUA_GLACIAR = objRecord.getValue({fieldId: 'custevent185'});
            var val_AGUA_GLACIAR_b64 = objRecord.getValue({fieldId: 'custevent433'});
            if((val_AGUA_GLACIAR_b64 == null || val_AGUA_GLACIAR_b64 == "") && (val_AGUA_GLACIAR != null || val_AGUA_GLACIAR != ""))
            {
                context.form.getField('custevent185').updateDisplayType({displayType:'hidden'});
                var base64_val_AGUA_GLACIAR = encode.convert({string: val_AGUA_GLACIAR, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent433').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent433').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent433", value: base64_val_AGUA_GLACIAR});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent185').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent433').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent433').updateDisplayType({displayType:'disabled'});
            }

            var val_INDICACION_7 = objRecord.getValue({fieldId: 'custevent189'});
            var val_INDICACION_7_b64 = objRecord.getValue({fieldId: 'custevent434'});
            if((val_INDICACION_7_b64 == null || val_INDICACION_7_b64 == "") && (val_INDICACION_7 != null || val_INDICACION_7 != ""))
            {
                context.form.getField('custevent189').updateDisplayType({displayType:'hidden'});
                var base64_val_INDICACION_7 = encode.convert({string: val_INDICACION_7, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent434').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent434').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent434", value: base64_val_INDICACION_7});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent189').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent434').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent434').updateDisplayType({displayType:'disabled'});
            }

            var val_ARGININA = objRecord.getValue({fieldId: 'custevent186'});
            var val_ARGININA_b64 = objRecord.getValue({fieldId: 'custevent435'});
            if((val_ARGININA_b64 == null || val_ARGININA_b64 == "") && (val_ARGININA != null || val_ARGININA != ""))
            {
                context.form.getField('custevent186').updateDisplayType({displayType:'hidden'});
                var base64_val_ARGININA = encode.convert({string: val_ARGININA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent435').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent435').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent435", value: base64_val_ARGININA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent186').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent435').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent435').updateDisplayType({displayType:'disabled'});
            }

            var val_INDICACION_8 = objRecord.getValue({fieldId: 'custevent190'});
            var val_INDICACION_8_b64 = objRecord.getValue({fieldId: 'custevent436'});
            if((val_INDICACION_8_b64 == null || val_INDICACION_8_b64 == "") && (val_INDICACION_8 != null || val_INDICACION_8 != ""))
            {
                context.form.getField('custevent190').updateDisplayType({displayType:'hidden'});
                var base64_val_INDICACION_8 = encode.convert({string: val_INDICACION_8, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent436').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent436').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent436", value: base64_val_INDICACION_8});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent190').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent436').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent436').updateDisplayType({displayType:'disabled'});
            }

            var val_COMENTARIOS = objRecord.getValue({fieldId: 'custevent196'});
            var val_COMENTARIOS_b64 = objRecord.getValue({fieldId: 'custevent437'});
            if((val_COMENTARIOS_b64 == null || val_COMENTARIOS_b64 == "") && (val_COMENTARIOS != null || val_COMENTARIOS != ""))
            {
                context.form.getField('custevent196').updateDisplayType({displayType:'hidden'});
                var base64_val_COMENTARIOS = encode.convert({string: val_COMENTARIOS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent437').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent437').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent437", value: base64_val_COMENTARIOS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent196').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent437').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent437').updateDisplayType({displayType:'disabled'});
            }

            var val_BARBA_CEJA = objRecord.getValue({fieldId: 'custevent204'});
            var val_BARBA_CEJA_b64 = objRecord.getValue({fieldId: 'custevent438'});
            if((val_BARBA_CEJA_b64 == null || val_BARBA_CEJA_b64 == "") && (val_BARBA_CEJA != null || val_BARBA_CEJA != ""))
            {
                context.form.getField('custevent204').updateDisplayType({displayType:'hidden'});
                var base64_val_BARBA_CEJA = encode.convert({string: val_BARBA_CEJA, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent438').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent438').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent438", value: base64_val_BARBA_CEJA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent204').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent438').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent438').updateDisplayType({displayType:'disabled'});
            }
			// *********************************** Revisiones
            var val_LAVADO_DE_24_HORAS = objRecord.getText({fieldId: 'custevent138'});
            var val_LAVADO_DE_24_HORAS_b64 = objRecord.getValue({fieldId: 'custevent439'});
            if((val_LAVADO_DE_24_HORAS_b64 == null || val_LAVADO_DE_24_HORAS_b64 == "") && (val_LAVADO_DE_24_HORAS != null || val_LAVADO_DE_24_HORAS != ""))
            {
                context.form.getField('custevent138').updateDisplayType({displayType:'hidden'});
                var base64_val_LAVADO_DE_24_HORAS = encode.convert({string: val_LAVADO_DE_24_HORAS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent439').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent439').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent439", value: base64_val_LAVADO_DE_24_HORAS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent138').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent439').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent439').updateDisplayType({displayType:'disabled'});
            }

            var val_LAVADO_24HR_NOTA_MEDICA = objRecord.getValue({fieldId: 'custevent139'});
            var val_LAVADO_24HR_NOTA_MEDICA_b64 = objRecord.getValue({fieldId: 'custevent440'});
            if((val_LAVADO_24HR_NOTA_MEDICA_b64 == null || val_LAVADO_24HR_NOTA_MEDICA_b64 == "") && (val_LAVADO_24HR_NOTA_MEDICA != null || val_LAVADO_24HR_NOTA_MEDICA != ""))
            {
                context.form.getField('custevent139').updateDisplayType({displayType:'hidden'});
                var base64_val_LAVADO_24HR_NOTA_MEDICA = encode.convert({string: val_LAVADO_DE_24_HORAS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent440').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent440').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent440", value: base64_val_LAVADO_24HR_NOTA_MEDICA});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent139').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent440').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent440').updateDisplayType({displayType:'disabled'});
            }

            var val_TX_24HR = objRecord.getValue({fieldId: 'custevent140'});
            var val_TX_24HR_b64 = objRecord.getValue({fieldId: 'custevent441'});
            if((val_TX_24HR_b64 == null || val_TX_24HR_b64 == "") && (val_TX_24HR != null || val_TX_24HR != ""))
            {
                context.form.getField('custevent140').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_24HR = encode.convert({string: val_TX_24HR, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent441').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent441').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent441", value: base64_val_TX_24HR});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent140').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent441').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent441').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_24HR = objRecord.getValue({fieldId: 'custevent141'});
            var val_RESPONSABLE_24HR_b64 = objRecord.getValue({fieldId: 'custevent442'});
            if((val_RESPONSABLE_24HR_b64 == null || val_RESPONSABLE_24HR_b64 == "") && (val_RESPONSABLE_24HR != null || val_RESPONSABLE_24HR != ""))
            {
                context.form.getField('custevent141').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_24HR = encode.convert({string: val_RESPONSABLE_24HR, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent442').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent442').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent442", value: base64_val_RESPONSABLE_24HR});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent141').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent442').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent442').updateDisplayType({displayType:'disabled'});
            }

            var val_REVISION_10_DIAS = objRecord.getText({fieldId: 'custevent142'});
            var val_REVISION_10_DIAS_b64 = objRecord.getValue({fieldId: 'custevent443'});
            if((val_REVISION_10_DIAS_b64 == null || val_REVISION_10_DIAS_b64 == "") && (val_REVISION_10_DIAS != null || val_REVISION_10_DIAS != ""))
            {
                context.form.getField('custevent142').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_10_DIAS = encode.convert({string: val_REVISION_10_DIAS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent443').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent443').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent443", value: base64_val_REVISION_10_DIAS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent142').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent443').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent443').updateDisplayType({displayType:'disabled'});
            }

            var val_NOTA_MEDICA_10DIAS = objRecord.getValue({fieldId: 'custevent143'});
            var val_NOTA_MEDICA_10DIAS_b64 = objRecord.getValue({fieldId: 'custevent444'});
            if((val_NOTA_MEDICA_10DIAS_b64 == null || val_NOTA_MEDICA_10DIAS_b64 == "") && (val_NOTA_MEDICA_10DIAS != null || val_NOTA_MEDICA_10DIAS != ""))
            {
                context.form.getField('custevent143').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_10DIAS = encode.convert({string: val_NOTA_MEDICA_10DIAS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent444').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent444').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent444", value: base64_val_NOTA_MEDICA_10DIAS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent143').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent444').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent444').updateDisplayType({displayType:'disabled'});
            }

            var val_TX_10DIAS = objRecord.getValue({fieldId: 'custevent144'});
            var val_TX_10DIAS_b64 = objRecord.getValue({fieldId: 'custevent445'});
            if((val_TX_10DIAS_b64 == null || val_TX_10DIAS_b64 == "") && (val_TX_10DIAS != null || val_TX_10DIAS != ""))
            {
                context.form.getField('custevent144').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_10DIAS = encode.convert({string: val_TX_10DIAS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent445').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent445').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent445", value: base64_val_TX_10DIAS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent144').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent445').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent445').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_10DIAS = objRecord.getValue({fieldId: 'custevent145'});
            var val_RESPONSABLE_10DIAS_b64 = objRecord.getValue({fieldId: 'custevent446'});
            if((val_RESPONSABLE_10DIAS_b64 == null || val_RESPONSABLE_10DIAS_b64 == "") && (val_RESPONSABLE_10DIAS != null || val_RESPONSABLE_10DIAS != ""))
            {
                context.form.getField('custevent145').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_10DIAS = encode.convert({string: val_RESPONSABLE_10DIAS, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent446').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent446').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent446", value: base64_val_RESPONSABLE_10DIAS});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent145').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent446').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent446').updateDisplayType({displayType:'disabled'});
            }

            var val_REVISION_1_MES = objRecord.getText({fieldId: 'custevent146'});
            var val_REVISION_1_MES_b64 = objRecord.getValue({fieldId: 'custevent447'});
            if((val_REVISION_1_MES_b64 == null || val_REVISION_1_MES_b64 == "") && (val_REVISION_1_MES != null || val_REVISION_1_MES != ""))
            {
                context.form.getField('custevent146').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_1_MES = encode.convert({string: val_REVISION_1_MES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent447').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent447').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent447", value: base64_val_REVISION_1_MES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent146').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent447').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent447').updateDisplayType({displayType:'disabled'});
            }

            var val_NOTA_MEDICA_1MES = objRecord.getValue({fieldId: 'custevent147'});
            var val_NOTA_MEDICA_1MES_b64 = objRecord.getValue({fieldId: 'custevent448'});
            if((val_NOTA_MEDICA_1MES_b64 == null || val_NOTA_MEDICA_1MES_b64 == "") && (val_NOTA_MEDICA_1MES != null || val_NOTA_MEDICA_1MES != ""))
            {
                context.form.getField('custevent147').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_1MES = encode.convert({string: val_NOTA_MEDICA_1MES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent448').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent448').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent448", value: base64_val_NOTA_MEDICA_1MES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent147').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent448').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent448').updateDisplayType({displayType:'disabled'});
            }

            var val_TX_1MES = objRecord.getValue({fieldId: 'custevent148'});
            var val_TX_1MES_b64 = objRecord.getValue({fieldId: 'custevent449'});
            if((val_TX_1MES_b64 == null || val_TX_1MES_b64 == "") && (val_TX_1MES != null || val_TX_1MES != ""))
            {
                context.form.getField('custevent148').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_1MES = encode.convert({string: val_TX_1MES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent449').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent449').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent449", value: base64_val_TX_1MES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent148').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent449').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent449').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_1MES = objRecord.getValue({fieldId: 'custevent149'});
            var val_RESPONSABLE_1MES_b64 = objRecord.getValue({fieldId: 'custevent450'});
            if((val_RESPONSABLE_1MES_b64 == null || val_RESPONSABLE_1MES_b64 == "") && (val_RESPONSABLE_1MES != null || val_RESPONSABLE_1MES != ""))
            {
                context.form.getField('custevent149').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_1MES = encode.convert({string: val_RESPONSABLE_1MES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent450').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent450').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent450", value: base64_val_RESPONSABLE_1MES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent149').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent450').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent450').updateDisplayType({displayType:'disabled'});
            }

            var val_REVISION_3_MESES = objRecord.getText({fieldId: 'custevent150'});
            var val_REVISION_3_MESES_b64 = objRecord.getValue({fieldId: 'custevent451'});
            if((val_REVISION_3_MESES_b64 == null || val_REVISION_3_MESES_b64 == "") && (val_REVISION_3_MESES != null || val_REVISION_3_MESES != ""))
            {
                context.form.getField('custevent150').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_3_MESES = encode.convert({string: val_REVISION_3_MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent451').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent451').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent451", value: base64_val_REVISION_3_MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent150').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent451').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent451').updateDisplayType({displayType:'disabled'});
            }

            var val_NOTA_MEDICA_3MESES = objRecord.getValue({fieldId: 'custevent151'});
            var val_NOTA_MEDICA_3MESES_b64 = objRecord.getValue({fieldId: 'custevent452'});
            if((val_NOTA_MEDICA_3MESES_b64 == null || val_NOTA_MEDICA_3MESES_b64 == "") && (val_NOTA_MEDICA_3MESES != null || val_NOTA_MEDICA_3MESES != ""))
            {
                context.form.getField('custevent151').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_3MESES = encode.convert({string: val_NOTA_MEDICA_3MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent452').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent452').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent452", value: base64_val_NOTA_MEDICA_3MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent151').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent452').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent452').updateDisplayType({displayType:'disabled'});
            }

            var val_TX_3MESES = objRecord.getValue({fieldId: 'custevent152'});
            var val_TX_3MESES_b64 = objRecord.getValue({fieldId: 'custevent453'});
            if((val_TX_3MESES_b64 == null || val_TX_3MESES_b64 == "") && (val_TX_3MESES != null || val_TX_3MESES != ""))
            {
                context.form.getField('custevent152').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_3MESES = encode.convert({string: val_TX_3MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent453').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent453').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent453", value: base64_val_TX_3MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent152').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent453').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent453').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_3MESES = objRecord.getValue({fieldId: 'custevent153'});
            var val_RESPONSABLE_3MESES_b64 = objRecord.getValue({fieldId: 'custevent454'});
            if((val_RESPONSABLE_3MESES_b64 == null || val_RESPONSABLE_3MESES_b64 == "") && (val_RESPONSABLE_3MESES != null || val_RESPONSABLE_3MESES != ""))
            {
                context.form.getField('custevent153').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_3MESES = encode.convert({string: val_RESPONSABLE_3MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent454').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent454').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent454", value: base64_val_RESPONSABLE_3MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent153').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent454').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent454').updateDisplayType({displayType:'disabled'});
            }

            var val_REVISION_5_MESES = objRecord.getText({fieldId: 'custevent154'});
            var val_REVISION_5_MESES_b64 = objRecord.getValue({fieldId: 'custevent455'});
            if((val_REVISION_5_MESES_b64 == null || val_REVISION_5_MESES_b64 == "") && (val_REVISION_5_MESES != null || val_REVISION_5_MESES != ""))
            {
                context.form.getField('custevent154').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_5_MESES = encode.convert({string: val_REVISION_5_MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent455').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent455').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent455", value: base64_val_REVISION_5_MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent154').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent455').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent455').updateDisplayType({displayType:'disabled'});
            }

            var val_NOTA_MEDICA_5MESES = objRecord.getValue({fieldId: 'custevent155'});
            var val_NOTA_MEDICA_5MESES_b64 = objRecord.getValue({fieldId: 'custevent456'});
            if((val_NOTA_MEDICA_5MESES_b64 == null || val_NOTA_MEDICA_5MESES_b64 == "") && (val_NOTA_MEDICA_5MESES != null || val_NOTA_MEDICA_5MESES != ""))
            {
                context.form.getField('custevent155').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_5MESES = encode.convert({string: val_NOTA_MEDICA_5MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent456').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent456').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent456", value: base64_val_NOTA_MEDICA_5MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent155').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent456').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent456').updateDisplayType({displayType:'disabled'});
            }

            var val_TX_5MESES = objRecord.getValue({fieldId: 'custevent156'});
            var val_TX_5MESES_b64 = objRecord.getValue({fieldId: 'custevent457'});
            if((val_TX_5MESES_b64 == null || val_TX_5MESES_b64 == "") && (val_TX_5MESES != null || val_TX_5MESES != ""))
            {
                context.form.getField('custevent156').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_5MESES = encode.convert({string: val_TX_5MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent457').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent457').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent457", value: base64_val_TX_5MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent156').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent457').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent457').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_5MESES = objRecord.getValue({fieldId: 'custevent157'});
            var val_RESPONSABLE_5MESES_b64 = objRecord.getValue({fieldId: 'custevent458'});
            if((val_RESPONSABLE_5MESES_b64 == null || val_RESPONSABLE_5MESES_b64 == "") && (val_RESPONSABLE_5MESES != null || val_RESPONSABLE_5MESES != ""))
            {
                context.form.getField('custevent157').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_5MESES = encode.convert({string: val_RESPONSABLE_5MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent458').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent458').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent458", value: base64_val_RESPONSABLE_5MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent157').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent458').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent458').updateDisplayType({displayType:'disabled'});
            }

            var val_REVISION_7_MESES = objRecord.getText({fieldId: 'custevent158'});
            var val_REVISION_7_MESES_b64 = objRecord.getValue({fieldId: 'custevent459'});
            if((val_REVISION_7_MESES_b64 == null || val_REVISION_7_MESES_b64 == "") && (val_REVISION_7_MESES != null || val_REVISION_7_MESES != ""))
            {
                context.form.getField('custevent158').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_7_MESES = encode.convert({string: val_REVISION_7_MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent459').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent459').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent459", value: base64_val_REVISION_7_MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent158').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent459').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent459').updateDisplayType({displayType:'disabled'});
            }

            var val_NOTA_MEDICA_7MESES = objRecord.getValue({fieldId: 'custevent159'});
            var val_NOTA_MEDICA_7MESES_b64 = objRecord.getValue({fieldId: 'custevent460'});
            if((val_NOTA_MEDICA_7MESES_b64 == null || val_NOTA_MEDICA_7MESES_b64 == "") && (val_NOTA_MEDICA_7MESES != null || val_NOTA_MEDICA_7MESES != ""))
            {
                context.form.getField('custevent159').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_7MESES = encode.convert({string: val_NOTA_MEDICA_7MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent460').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent460').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent460", value: base64_val_NOTA_MEDICA_7MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent159').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent460').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent460').updateDisplayType({displayType:'disabled'});
            }

            var val_TX_7MESES = objRecord.getValue({fieldId: 'custevent160'});
            var val_TX_7MESES_b64 = objRecord.getValue({fieldId: 'custevent461'});
            if((val_TX_7MESES_b64 == null || val_TX_7MESES_b64 == "") && (val_TX_7MESES != null || val_TX_7MESES != ""))
            {
                context.form.getField('custevent160').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_7MESES = encode.convert({string: val_TX_7MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent461').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent461').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent461", value: base64_val_TX_7MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent160').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent461').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent461').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_7MESES = objRecord.getValue({fieldId: 'custevent163'});
            var val_RESPONSABLE_7MESES_b64 = objRecord.getValue({fieldId: 'custevent462'});
            if((val_RESPONSABLE_7MESES_b64 == null || val_RESPONSABLE_7MESES_b64 == "") && (val_RESPONSABLE_7MESES != null || val_RESPONSABLE_7MESES != ""))
            {
                context.form.getField('custevent163').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_7MESES = encode.convert({string: val_RESPONSABLE_7MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent462').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent462').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent462", value: base64_val_RESPONSABLE_7MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent163').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent462').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent462').updateDisplayType({displayType:'disabled'});
            }

            var val_REVISION_9_MESES = objRecord.getText({fieldId: 'custevent164'});
            var val_REVISION_9_MESES_b64 = objRecord.getValue({fieldId: 'custevent463'});
            if((val_REVISION_9_MESES_b64 == null || val_REVISION_9_MESES_b64 == "") && (val_REVISION_9_MESES != null || val_REVISION_9_MESES != ""))
            {
                context.form.getField('custevent164').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_9_MESES = encode.convert({string: val_REVISION_9_MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent463').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent463').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent463", value: base64_val_REVISION_9_MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent164').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent463').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent463').updateDisplayType({displayType:'disabled'});
            }

            var val_NOTA_MEDICA_9_MESES = objRecord.getValue({fieldId: 'custevent165'});
            var val_NOTA_MEDICA_9_MESES_b64 = objRecord.getValue({fieldId: 'custevent464'});
            if((val_NOTA_MEDICA_9_MESES_b64 == null || val_NOTA_MEDICA_9_MESES_b64 == "") && (val_NOTA_MEDICA_9_MESES != null || val_NOTA_MEDICA_9_MESES != ""))
            {
                context.form.getField('custevent165').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_9_MESES = encode.convert({string: val_NOTA_MEDICA_9_MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent464').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent464').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent464", value: base64_val_NOTA_MEDICA_9_MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent165').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent464').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent464').updateDisplayType({displayType:'disabled'});
            }

            var val_TX_9MESES = objRecord.getValue({fieldId: 'custevent166'});
            var val_TX_9MESES_b64 = objRecord.getValue({fieldId: 'custevent465'});
            if((val_TX_9MESES_b64 == null || val_TX_9MESES_b64 == "") && (val_TX_9MESES != null || val_TX_9MESES != ""))
            {
                context.form.getField('custevent166').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_9MESES = encode.convert({string: val_TX_9MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent465').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent465').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent465", value: base64_val_TX_9MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent166').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent465').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent465').updateDisplayType({displayType:'disabled'});
            }

            var val_RESPONSABLE_9MESES = objRecord.getValue({fieldId: 'custevent167'});
            var val_RESPONSABLE_9MESES_b64 = objRecord.getValue({fieldId: 'custevent466'});
            if((val_RESPONSABLE_9MESES_b64 == null || val_RESPONSABLE_9MESES_b64 == "") && (val_RESPONSABLE_9MESES != null || val_RESPONSABLE_9MESES != ""))
            {
                context.form.getField('custevent167').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_9MESES = encode.convert({string: val_RESPONSABLE_9MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent466').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent466').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent466", value: base64_val_RESPONSABLE_9MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent167').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent466').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent466').updateDisplayType({displayType:'disabled'});
            }

            var val_REVISION_12_MESES = objRecord.getText({fieldId: 'custevent168'});
            var val_REVISION_12_MESES_b64 = objRecord.getValue({fieldId: 'custevent467'});
            if((val_REVISION_12_MESES_b64 == null || val_REVISION_12_MESES_b64 == "") && (val_REVISION_12_MESES != null || val_REVISION_12_MESES != ""))
            {
                context.form.getField('custevent168').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_12_MESES = encode.convert({string: val_REVISION_12_MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent467').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent467').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent467", value: base64_val_REVISION_12_MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent168').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent467').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent467').updateDisplayType({displayType:'disabled'});
            }

            var val_NOTA_MEDICA_12MESES = objRecord.getValue({fieldId: 'custevent169'});
            var val_NOTA_MEDICA_12MESES_b64 = objRecord.getValue({fieldId: 'custevent468'});
            if((val_NOTA_MEDICA_12MESES_b64 == null || val_NOTA_MEDICA_12MESES_b64 == "") && (val_NOTA_MEDICA_12MESES != null || val_NOTA_MEDICA_12MESES != ""))
            {
                context.form.getField('custevent169').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_12MESES = encode.convert({string: val_NOTA_MEDICA_12MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent468').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent468').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent468", value: base64_val_NOTA_MEDICA_12MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent169').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent468').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent468').updateDisplayType({displayType:'disabled'});
            }

			var val_TX_12MESES = objRecord.getValue({fieldId: 'custevent170'});
            var val_TX_12MESES_b64 = objRecord.getValue({fieldId: 'custevent469'});
            if((val_TX_12MESES_b64 == null || val_TX_12MESES_b64 == "") && (val_TX_12MESES != null || val_TX_12MESES != ""))
            {
                context.form.getField('custevent170').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_12MESES = encode.convert({string: val_TX_12MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent469').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent469').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent469", value: base64_val_TX_12MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent170').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent469').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent469').updateDisplayType({displayType:'disabled'});
            }

			var val_RESPONSABLE_12MESES = objRecord.getValue({fieldId: 'custevent171'});
            var val_RESPONSABLE_12MESES_b64 = objRecord.getValue({fieldId: 'custevent470'});
            if((val_RESPONSABLE_12MESES_b64 == null || val_RESPONSABLE_12MESES_b64 == "") && (val_RESPONSABLE_12MESES != null || val_RESPONSABLE_12MESES != ""))
            {
                context.form.getField('custevent171').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_12MESES = encode.convert({string: val_RESPONSABLE_12MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent470').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent470').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent470", value: base64_val_RESPONSABLE_12MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent171').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent470').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent470').updateDisplayType({displayType:'disabled'});
            }

			var val_REVISION_14_MESES = objRecord.getText({fieldId: 'custevent172'});
            var val_REVISION_14_MESES_b64 = objRecord.getValue({fieldId: 'custevent471'});
            if((val_REVISION_14_MESES_b64 == null || val_REVISION_14_MESES_b64 == "") && (val_REVISION_14_MESES != null || val_REVISION_14_MESES != ""))
            {
                context.form.getField('custevent172').updateDisplayType({displayType:'hidden'});
                var base64_val_REVISION_14_MESES = encode.convert({string: val_REVISION_14_MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent471').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent471').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent471", value: base64_val_REVISION_14_MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent172').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent471').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent471').updateDisplayType({displayType:'disabled'});
            }

			var val_NOTA_MEDICA_14MESES = objRecord.getValue({fieldId: 'custevent173'});
            var val_NOTA_MEDICA_14MESES_b64 = objRecord.getValue({fieldId: 'custevent472'});
            if((val_NOTA_MEDICA_14MESES_b64 == null || val_NOTA_MEDICA_14MESES_b64 == "") && (val_NOTA_MEDICA_14MESES != null || val_NOTA_MEDICA_14MESES != ""))
            {
                context.form.getField('custevent173').updateDisplayType({displayType:'hidden'});
                var base64_val_NOTA_MEDICA_14MESES = encode.convert({string: val_NOTA_MEDICA_14MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent472').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent472').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent472", value: base64_val_NOTA_MEDICA_14MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent173').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent472').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent472').updateDisplayType({displayType:'disabled'});
            }

			var val_TX_14MESES = objRecord.getValue({fieldId: 'custevent174'});
            var val_TX_14MESES_b64 = objRecord.getValue({fieldId: 'custevent473'});
            if((val_TX_14MESES_b64 == null || val_TX_14MESES_b64 == "") && (val_TX_14MESES != null || val_TX_14MESES != ""))
            {
                context.form.getField('custevent174').updateDisplayType({displayType:'hidden'});
                var base64_val_TX_14MESES = encode.convert({string: val_TX_14MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent473').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent473').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent473", value: base64_val_TX_14MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent174').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent473').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent473').updateDisplayType({displayType:'disabled'});
            }

			var val_RESPONSABLE_14MESES = objRecord.getValue({fieldId: 'custevent175'});
            var val_RESPONSABLE_14MESES_b64 = objRecord.getValue({fieldId: 'custevent474'});
            if((val_RESPONSABLE_14MESES_b64 == null || val_RESPONSABLE_14MESES_b64 == "") && (val_RESPONSABLE_14MESES != null || val_RESPONSABLE_14MESES != ""))
            {
                context.form.getField('custevent175').updateDisplayType({displayType:'hidden'});
                var base64_val_RESPONSABLE_14MESES = encode.convert({string: val_RESPONSABLE_14MESES, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
                context.form.getField('custevent474').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent474').updateDisplayType({displayType:'disabled'});
                objRecord.setValue({fieldId: "custevent474", value: base64_val_RESPONSABLE_14MESES});
                bandera = true;
            }
            else
            {
                context.form.getField('custevent175').updateDisplayType({displayType:'hidden'});
                context.form.getField('custevent474').updateDisplayType({displayType:'normal'});
                context.form.getField('custevent474').updateDisplayType({displayType:'disabled'});
            }
            if(bandera)
              objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});

          }
        }
     }
  }
		return {
        beforeLoad: beforeLoad
		};
});
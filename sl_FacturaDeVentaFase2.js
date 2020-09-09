/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/record','N/log','N/search','N/redirect','N/file','N/format','N/https','N/encode'],

function(record,log,search,redirect,file,format,https,encode) {
    var newArrayItems = [];
    var newArrayItemsDescuentos = [];

    function onRequest(context) {
      /*var userObj = runtime.getCurrentUser();  log.debug('userObj: ',userObj); var cliente = record.load({type: 'customer', id: companyId}); // , isDynamic: true caso.save();*/
      var recId = context.request.parameters.recordInvoiceId;

	  /*var dateColombia = new Date();
      var colombiaDate = format.format({value: dateColombia, type: format.Type.DATETIME, timezone: format.Timezone.AMERICA_BOGOTA}); // 28/8/2019 11:28:52 am
      var colombiaDate_Split = colombiaDate.split('/');
      var dia_Co = ('0' + colombiaDate_Split[0]).slice(-2);
      var mes_Co = ('0' + colombiaDate_Split[1]).slice(-2);
      var anio_Co = colombiaDate_Split[2].substring(0, 4);
      var folderToSaveInvoice = createFolders(mes_Co, anio_Co); // .toString()

      var colombiaHour_Split = colombiaDate_Split[2].split(' ');
      var hourAux = colombiaHour_Split[1].split(':');
      var hourAuxHH = hourAux[0].length > 1 ? hourAux[0] : "0"+hourAux[0];
      var hourAuxMM = hourAux[1].length > 1 ? hourAux[1] : "0"+hourAux[1];
      var hourAuxSS = hourAux[2].length > 1 ? hourAux[2] : "0"+hourAux[2];*/
      
      var fecha = "";
      var dia_Co = "";
      var mes_Co = "";
      var anio_Co = "";
      var hourAuxHH = "";
      var hourAuxMM = "";
      var hourAuxSS = "";
      var folderToSaveInvoice = "";
	  var xmlrequest = '<?xml version="1.0" encoding="UTF-8"?>';
      xmlrequest += '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns1="urn:miserviciowsdl" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">';
      xmlrequest += '	<SOAP-ENV:Body>';
      xmlrequest += '		<ns1:getDateNow>';
      xmlrequest += '			<miparametro xsi:type="xsd:string">America/Bogota</miparametro>'; // America/Mexico_City - America/Santo_Domingo - America/Bogota
      xmlrequest += '		</ns1:getDateNow>';
      xmlrequest += '	</SOAP-ENV:Body>';
      xmlrequest += '</SOAP-ENV:Envelope>';

      //Set up Headers
      var headers_val = {};
      headers_val['User-Agent-x'] = 'SuiteScript-Call';
      headers_val['Content-Type'] = 'text/xml; charset=utf-8';
      headers_val['Content-Length']= 'length';
      headers_val['SOAPAction'] = 'https://efactory-kaloni.com/SENDWA/WebServiceSOAP/dateNow.php/getDateNow';
      var url2 = 'https://efactory-kaloni.com:443/SENDWA/WebServiceSOAP/dateNow.php';
      var contenido = https.post({url: url2, headers: headers_val, body: xmlrequest});
      //log.debug('msg code', cont.code); log.debug('msg body', cont.body);
      if(contenido.code == "200")
      {
         var position = contenido.body.indexOf('xsd:string">');
         if(position >= 0)
         {
            fecha = contenido.body.substring(position + 12, position + 31);
            log.debug('fecha: ', fecha);
         }
      }

      if(fecha.indexOf('202') >= 0 && fecha.indexOf(':') >= 0) // "2020-03-19 04:42:09"
      {
          var colombiaDate_Split = fecha.split('-');
          dia_Co = colombiaDate_Split[2].substring(0, 2);
          mes_Co = colombiaDate_Split[1];
          anio_Co = colombiaDate_Split[0];
          log.debug('newDate: ', anio_Co+'-'+mes_Co+'-'+dia_Co);
          folderToSaveInvoice = createFolders(mes_Co, anio_Co);

          var hourAux = fecha.split(' ');
          hourAuxHH = hourAux[1].substring(0, 2);
          hourAuxMM = hourAux[1].substring(3, 5);
          hourAuxSS = hourAux[1].substring(6, 8);
          log.debug('newTime: ', hourAuxHH+':'+hourAuxMM+':'+hourAuxSS);
      }

      var invoice = record.load({type: 'invoice', id: recId});

	  // seccion01 --------------------------------------------------------------------------------------------------------------
	  // Campos que identifican a la factura (No. Elementos: 1) Obligatorio

      var tranidVal = invoice.getValue({fieldId: 'tranid'});
      var tranidValSplit = tranidVal.split('-');
      //tranidVal = tranidValSplit[1].substring(0, 1) === "0" ? (tranidValSplit[0] + tranidValSplit[1].substring(1, tranidValSplit[1].length)) : (tranidValSplit[0] + tranidValSplit[1]);
      tranidVal = tranidValSplit[0] + "" + tranidValSplit[1];
      var custbody77 = invoice.getValue({fieldId: 'custbody77'});
      if(custbody77 < 10){custbody77 = "0" + custbody77;}

      var seccion01 = "01|";
      var codigoTipoDocumento_01 = "01";
      var motivoDeLaFactura_01 = "01";
      var secuencial_01 = tranidVal; 								// ? "PREF000000123" SETP990000000 tranidVal  "SETT73"
      var fechaDeEmision_01 = anio_Co + "-" + mes_Co + "-" + dia_Co;
      var horaDeEmision_01 = hourAuxHH +":"+ hourAuxMM +":"+ hourAuxSS;
      var tipoDeOperacion_01 = custbody77;							// ? "05"
      var idReferecia_01 = ""; 						  			    // ? "18347124512"
      var fechaDeEmisionOrder_01 = "";
      var fechaVencimientoFactura_01 = fechaDeEmision_01;
      seccion01 += codigoTipoDocumento_01 +"|"+ motivoDeLaFactura_01 +"|"+ secuencial_01 +"|"+ fechaDeEmision_01 +"|"+ horaDeEmision_01 +"|"+ tipoDeOperacion_01 +"|"+ idReferecia_01 +"|"+ fechaDeEmisionOrder_01 +"|"+ fechaVencimientoFactura_01 +"\n";

	  // seccion02 ---------------------------------------------------------------------------------------------------------------
	  // Información del emisor (No. Elementos: 1) Obligatorio

      var seccion02 = "02|";
      var tipoDeIdentificacion_02 = "31";
      var identificacion_02 = "900852763";
      var razonSocial_02 = "KALONI COLOMBIA SAS";
      var nombreComercial_02 = secuencial_01.substring(0, 3) === "BOG" ? "KALONI COLOMBIA" : "KALONI COLOMBIA MEDELLIN";
      var tipoDeOrganización_02 = "1";
      var codigo_Departamento_02 = secuencial_01.substring(0, 3) === "BOG" ? "11" : "05";
      var departamento_02 = secuencial_01.substring(0, 3) === "BOG" ? "Bogotá" : "Antioquia";
      var municipio_02 = secuencial_01.substring(0, 3) === "BOG" ? "11001" : "05001";
      var ciudad_02 = secuencial_01.substring(0, 3) === "BOG" ? "BOGOTÁ, D.C." : "MEDELLÍN";
      var direccion_02 = secuencial_01.substring(0, 3) === "BOG" ? "AK 9 113 52 EDIFICIO TORRES UNIDAS 2 LC 102" : "CL 13 34 31 ED TRIANGLE";
      var codigoPais_02 = "CO";
      var nombreDelPais_02 = "Colombia";
      var regimen_02 = "05";
      var codigoPostal_02 = secuencial_01.substring(0, 3) === "BOG" ? "110911" : "050022";					// ?
      var actividadEconomica_02 = "8621;7210;8692";															// ?
      var obligacionesDelContribuyente_02 = "O-07;O-09;O-14;O-37";
      var detallesTributariosDelEmisor_02 = "01=IVA;03=ICA;06=ReteFuente";											// ?
      var NumeroDeMatriculaMercantil_02 = "12345";	// ? "2633172" : "63921302" 12345;   secuencial_01.substring(0, 3) === "BOG" ? "02574942" : "63921302"
      seccion02 += tipoDeIdentificacion_02 +"|"+ identificacion_02 +"|"+ razonSocial_02 +"|"+ nombreComercial_02 +"|"+ tipoDeOrganización_02 +"|"+ codigo_Departamento_02 +"|"+ departamento_02 +"|"+ municipio_02 +"|"+ ciudad_02 +"|"+ direccion_02 +"|"+ codigoPais_02 +"|"+ nombreDelPais_02 +"|"+ regimen_02 +"|"+ codigoPostal_02 +"|"+ actividadEconomica_02 +"|"+ obligacionesDelContribuyente_02 +"|"+ detallesTributariosDelEmisor_02 +"|"+ NumeroDeMatriculaMercantil_02 +"\n";

      // seccion03 ---------------------------------------------------------------------------------------------------------------
      // Información del receptor (No. Elementos: 1-N) Obligatorio

      var custbody78 = invoice.getText({fieldId: 'custbody78'});
      if(custbody78 === "Registro civil")
         custbody78 = "11";
      if(custbody78 === "Tarjeta de identidad")
         custbody78 = "12";
      if(custbody78 === "Cédula de ciudadanía")
         custbody78 = "13";
      if(custbody78 === "Tarjeta de extranjería")
         custbody78 = "21";
      if(custbody78 === "Cédula de extranjería")
         custbody78 = "22";
      if(custbody78 === "NIT")
         custbody78 = "31";
      if(custbody78 === "Pasaporte")
         custbody78 = "41";
      var custbody84 = invoice.getText({fieldId: 'custbody84'});
      var custbody83 = invoice.getText({fieldId: 'custbody83'});
      var custbody86 = invoice.getText({fieldId: 'custbody86'});
      if(custbody86 == "Simplificado")
        custbody86 = "04";
      if(custbody86 == "Común")
        custbody86 = "05";
      var custbody90 = invoice.getValue({fieldId: 'custbody90'});
      if(custbody90.substring(custbody90.length -1, custbody90.length) === ";")
        custbody90 = custbody90.substring(0, custbody90.length -1);
      var custbody93 = invoice.getValue({fieldId: 'custbody93'});
      if(custbody93.substring(custbody93.length -1, custbody93.length) === "+")
        custbody93 = custbody93.substring(0, custbody93.length -1);

	  var seccion03 = "03|";
      var tipoDeIdentificacion_03 = custbody78;
      var identificacion_03 = invoice.getValue({fieldId: 'custbody79'});
      var razonSocial_03 = invoice.getValue({fieldId: 'custbody80'});
      var nombreComercial_03 = invoice.getValue({fieldId: 'custbody81'});
      var tipoDeOrganizacion_03 = invoice.getValue({fieldId: 'custbody82'});
      var codigoDepartamento_03 = getCodigoDep(custbody83);
      var departamento_03 = custbody83;
      var codigo_municipio_03 = getCodigoMunicipio(custbody84);
      var ciudad_03 = custbody84;
      var direccion_03 = invoice.getValue({fieldId: 'custbody85'});
      var codigoPais_03 = "CO";
      var nombreDelPais_03 = "Colombia";
      var regimen_03 = custbody86;
      var email_03 = invoice.getValue({fieldId: 'custbody87'}); // "acolin@kaloni.com"
      var telefono_03 = invoice.getValue({fieldId: 'custbody88'});
      var codigoPostal_03 = invoice.getValue({fieldId: 'custbody89'});							// ?
      var obligacionesDelContribuyente_03 = custbody90;
      var detallesTributariosDelReceptor_03 = custbody93;
      var idAutorizado_03 = "";									// ?
      var tipoDeIdentificacion2_03 = "";						// ?
      seccion03 += tipoDeIdentificacion_03 +"|"+ identificacion_03 +"|"+ razonSocial_03 +"|"+ nombreComercial_03 +"|"+ tipoDeOrganizacion_03 +"|"+ codigoDepartamento_03 +"|"+ departamento_03 +"|"+ codigo_municipio_03 +"|"+ ciudad_03 +"|"+ direccion_03 +"|"+ codigoPais_03 +"|"+ nombreDelPais_03 +"|"+ regimen_03 +"|"+ email_03 +"|"+ telefono_03 +"|"+ codigoPostal_03 +"|"+ obligacionesDelContribuyente_03 +"|"+ detallesTributariosDelReceptor_03 +"|"+ idAutorizado_03 +"|"+ tipoDeIdentificacion2_03 +"\n";

      
      // seccion04 ---------------------------------------------------------------------------------------------------------------?
      // Cargos o Descuentos Totales (No. Elementos: 0-N)

      var seccion04_descuento = "04|";
      var seccion04_cargo = "04|";
      var razon_de_descuento_04 = "";
      var porcentaje_de_descuento_04 = 0;
      var valor_del_descuento_04 = 0;
      var monto_base_descuento_04 = 0;
      
// seccion05 ---------------------------------------------------------------------------------------------------------------?
      // Para Valores de Retención Totales (No. Elementos: 0-N)
      var seccion05_reteFuente = "";
      var valor_sin_impuesto_reteFuente_05 = 0;
      var porcentaje_impuesto_reteFuente_05 = 0;
      var total_impuesto_reteFuente_05 = 0;
      var seccion05_reteICA = "";
      var valor_sin_impuesto_reteICA_05 = 0;
      var porcentaje_impuesto_reteICA_05 = 0;
      var total_impuesto_reteICA_05 = 0;
      
      // secc_12_13_14y15
      var item_Lines11 = invoice.getLineCount({sublistId : 'item'});
      if(item_Lines11 > 0)
      {
        for(var i = 0; i < item_Lines11; i++)
        {
          var valor_codigo = invoice.getSublistValue({sublistId:'item', fieldId:'item', line:i}); // codigo item
          var valor_description = invoice.getSublistText({sublistId:'item', fieldId:'description', line:i}); //descripcion
          var valor_units_display = invoice.getSublistValue({sublistId:'item', fieldId:'units_display', line:i}); // unidades
          var valor_quantity = invoice.getSublistValue({sublistId:'item', fieldId:'quantity', line:i}); // cantidad
          if(valor_quantity == null || valor_quantity == "")
             valor_quantity = 1;
          var valor_rate = invoice.getSublistValue({sublistId:'item', fieldId:'rate', line:i}); // precio unitario item
          var valor_amount = invoice.getSublistValue({sublistId:'item', fieldId:'amount', line:i}); // precio total item (precio unitario item * cantidad)
          if(valor_amount == null || valor_amount == "")
             valor_amount = (valor_rate * valor_quantity);
          var valor_taxrate1 = invoice.getSublistValue({sublistId:'item', fieldId:'taxrate1', line:i}); // porcentaje impuesto aplicado
          var valor_tax1amt = invoice.getSublistValue({sublistId:'item', fieldId:'tax1amt', line:i}); // impuesto aplicado
          var valor_grossamt = invoice.getSublistValue({sublistId:'item', fieldId:'grossamt', line:i}); // (precio total item + impuesto aplicado)
          var valor_itemtype = invoice.getSublistValue({sublistId:'item', fieldId:'itemtype', line:i}); // itemtype
          var itemObj = {
            codigo_item:valor_codigo,
            descripcion:valor_description,
            unidades:valor_units_display,
            cantidad:valor_quantity,
            precio_unitario_item:valor_rate,
            precio_total_item:valor_amount,
            porcentaje_impuesto_aplicado:valor_taxrate1,
            impuesto_aplicado:valor_tax1amt,
            precio_total_item_mas_impuesto_aplicado:valor_grossamt,
            itemtype:valor_itemtype,
            index:i
          };
          log.debug('itemObj: ', itemObj);
          try{
             if(itemObj["descripcion"].indexOf("DESCUENTO") != -1)
               newArrayItemsDescuentos.push(itemObj);
             else
               newArrayItems.push(itemObj);
          }catch(e){
              log.debug("Exception: ", e);
          }
        }
        log.debug('newArrayItems y newArrayItemsDescuentos: ', newArrayItems.length +" y "+ newArrayItemsDescuentos.length);
      }

      if(newArrayItemsDescuentos.length > 1){
        log.debug("Descuentos > 1 en la factura: ", tranidVal + " No. de Descuentos: " + newArrayItemsDescuentos.length);
        return false;
      }

      var secc_12_13_14y15 = "";
      var numItem = 1;
      var retenciones = false;
	  var subtotal_Factura = 0;
      var taxtotal_Factura = 0;
      var total_Factura = 0;

      newArrayItems.forEach(function(element){
        /*
        -Servicios (Segmentos 70 - 94)
          85142300-9 Servicios de higiene
          85000000-9 Servicios de salud y asistencia social
          85100000-0 Servicios de salud
          85140000-2 Servicios varios de salud

        -Componentes y suministros (Segmentos 30 - 41)
          33000000-0 Equipamiento y artículos médicos, farmacéuticos y de higiene personal
          33700000-7 Productos para la higiene personal
        */
          subtotal_Factura += element["precio_total_item"];
          taxtotal_Factura += element["impuesto_aplicado"];
        
          log.debug('secc 12| element[itemtype]: (InvtPart o Service)', element["itemtype"]);
          var dianCode = "";
          var itemTypeAux = "";
          var descuentoAux = 0;

          try
          {
            itemTypeAux = element["itemtype"].substring(0, 7);
          }
          catch(e){
              log.debug("Exception: ", e);
          }

          if(itemTypeAux == "InvtPar")
            dianCode = "33000000-0";
          if(itemTypeAux == "Service")
            dianCode = "85100000-0";

          log.debug('dianCode: (InvtPart o Service)', dianCode);
		  var valorNoComercial = element["precio_total_item"].toFixed(2) < 1 ? 1 : 0;
        
        //if((element["descripcion"] === "MANTENIMIENTO PREVENTIVO COL" || element["descripcion"] === "HONORARIOS MICROINJERTO DE CABELLO COL" || element["descripcion"] === "HONORARIOS MICROINJERTO DE CABELLO COL RETOQUE") && (newArrayItemsDescuentos.length > 0)){
          if(newArrayItemsDescuentos.length > 0){
            var info_descuento = getDescuentoItem(element["descripcion"]);
            log.debug('info_descuento: ' , info_descuento.descuento + "" + info_descuento.descriptionTofind);
            var porcentajeDescuento = eval((info_descuento.descuento/element["precio_total_item_mas_impuesto_aplicado"])*100);
            if(isNaN(porcentajeDescuento))
              porcentajeDescuento = 0;
            // Copiar datos descuento a seccion 04
            razon_de_descuento_04 = info_descuento.descriptionTofind;
            porcentaje_de_descuento_04 = porcentajeDescuento.toFixed(2);
            monto_base_descuento_04 = element["precio_total_item_mas_impuesto_aplicado"];
            valor_del_descuento_04 = info_descuento.descuento;
          }
        
          secc_12_13_14y15 += "12|"+ numItem +"|"+ dianCode +"|"+ element["codigo_item"] +"|"+ element["descripcion"] +"|"+ element["cantidad"] +"|"+ element["cantidad"] +"|94|"+ element["precio_unitario_item"].toFixed(2) +"|01|"+ element["precio_total_item"].toFixed(2) +"|"+ element["unidades"] +"|"+ valor_del_descuento_04 +"|"+ valorNoComercial+"||\n";

          secc_12_13_14y15 += "13|"+ numItem +"|01|"+ element["impuesto_aplicado"].toFixed(2) +"|"+ element["porcentaje_impuesto_aplicado"].toFixed(2) +"|"+ element["precio_total_item"].toFixed(2) +"|||\n";

        //if((element["descripcion"] === "MANTENIMIENTO PREVENTIVO COL" || element["descripcion"] === "HONORARIOS MICROINJERTO DE CABELLO COL" || element["descripcion"] === "HONORARIOS MICROINJERTO DE CABELLO COL RETOQUE") && (newArrayItemsDescuentos.length > 0)){
          if(newArrayItemsDescuentos.length > 0){
		  	secc_12_13_14y15 += "14|"+ numItem +"|"+ numItem +"|False|"+ razon_de_descuento_04 +"|"+ porcentaje_de_descuento_04 +"|"+ valor_del_descuento_04 +"|"+ monto_base_descuento_04.toFixed(2) +"\n";
          }

          if(invoice.getText({fieldId: 'custbody82'}) === "Persona Jurídica")
          {
              retenciones = true;
              var val_ReteFuente = 0;
              var porcnetaje_ReteFuente = 0;
              var valor_Retefuente_Apicado = 0;
              try{
                  if(element["itemtype"] == "InvtPart"){
                      val_ReteFuente = 0.025;
                      porcnetaje_ReteFuente = 2.5;
                      valor_Retefuente_Apicado = (element["precio_total_item"]* val_ReteFuente);
                  }else if(element["itemtype"] == "Service" && element["descripcion"].indexOf("HONORARIOS") != -1){
                      val_ReteFuente = 0.11;
                      porcnetaje_ReteFuente = 11.00;
                      valor_Retefuente_Apicado = (element["precio_total_item"]* val_ReteFuente);
                  }else{
                      val_ReteFuente = 0.025;
                      porcnetaje_ReteFuente = 2.5;
                      valor_Retefuente_Apicado = (element["precio_total_item"]* val_ReteFuente);
                  }
               }catch(e){
                   log.debug("Exception: ", e);
               }
             
              // copiar valores de reteFuente a totales retenciones
              valor_sin_impuesto_reteFuente_05 += element["precio_total_item"];
              //porcentaje_impuesto_reteFuente_05 = 0;
              total_impuesto_reteFuente_05 += valor_Retefuente_Apicado;

              secc_12_13_14y15 += "15|"+ numItem +"|06|"+ element["precio_total_item"].toFixed(2) +"|"+ porcnetaje_ReteFuente.toFixed(2) +"|"+ valor_Retefuente_Apicado.toFixed(2) +"\n";

              var baseICA = 0;
              var valor_ReteICA_Aplicado = 0;
              var porcentaje_ReteICA = 0;
              try{
                if(invoice.getValue({fieldId: 'tranid'}).substring(0, 3) == "BOG"){
                    baseICA = 6.9;
                    if(element["precio_total_item"] != "0.00")
                    {
                      valor_ReteICA_Aplicado = ((element["precio_total_item"] * baseICA)/1000);
                      porcentaje_ReteICA = ((valor_ReteICA_Aplicado/element["precio_total_item"])*100);
                    }
                }else if(invoice.getValue({fieldId: 'tranid'}).substring(0, 3) == "MED"){
                    baseICA = 10;
                  	if(element["precio_total_item"] != "0.00")
                    {
                      valor_ReteICA_Aplicado = ((element["precio_total_item"] * baseICA)/1000);
                      porcentaje_ReteICA = ((valor_ReteICA_Aplicado/element["precio_total_item"])*100);
                    }
                }
              }catch(e){
                   log.debug("Exception: ", e);
              }

              valor_sin_impuesto_reteICA_05 += element["precio_total_item"];
              //porcentaje_impuesto_reteICA_05 = 0;
              total_impuesto_reteICA_05 += valor_ReteICA_Aplicado;
              secc_12_13_14y15 += "15|"+ numItem +"|07|"+ element["precio_total_item"].toFixed(2) +"|"+ porcentaje_ReteICA.toFixed(2) +"|"+ valor_ReteICA_Aplicado.toFixed(2) +"\n";
          }

          numItem++
      });
	  total_Factura = total_Factura + subtotal_Factura + taxtotal_Factura;
      log.debug('subtotal_Factura - taxtotal_Factura - total_Factura: ', subtotal_Factura +' - '+ taxtotal_Factura +' - '+ total_Factura);
      log.debug('secc_12_13_14y15: ', secc_12_13_14y15);
      //return false;
      
      // seccion04
      if(newArrayItemsDescuentos.length > 0){
      	 seccion04_descuento += "FALSE|11|"+ razon_de_descuento_04 +"|"+ porcentaje_de_descuento_04 +"|"+ valor_del_descuento_04 +"|"+ monto_base_descuento_04 +"\n";
      }

	  // seccion05
      //if(valor_sin_impuesto_reteFuente_05 != 0 && total_impuesto_reteFuente_05 != 0 && valor_sin_impuesto_reteICA_05 != 0 && total_impuesto_reteICA_05 != 0)
      if(retenciones)
      {
         if(total_impuesto_reteFuente_05 > 0 && valor_sin_impuesto_reteFuente_05 > 0)
         	porcentaje_impuesto_reteFuente_05 = ((total_impuesto_reteFuente_05/valor_sin_impuesto_reteFuente_05)*100);
         if(total_impuesto_reteICA_05 > 0 && valor_sin_impuesto_reteICA_05 > 0)
         	porcentaje_impuesto_reteICA_05 = ((total_impuesto_reteICA_05/valor_sin_impuesto_reteICA_05)*100);

     	 seccion05_reteFuente = "05|06|"+ valor_sin_impuesto_reteFuente_05.toFixed(2) +"|"+ porcentaje_impuesto_reteFuente_05.toFixed(2) +"|"+ total_impuesto_reteFuente_05.toFixed(2) +"\n";
     	 seccion05_reteICA = "05|07|"+ valor_sin_impuesto_reteICA_05.toFixed(2) +"|"+ porcentaje_impuesto_reteICA_05.toFixed(2) +"|"+ total_impuesto_reteICA_05.toFixed(2) +"\n";
      }


      // seccion10 ---------------------------------------------------------------------------------------------------------------
      // Impuestos totales (No. Elementos: 1-N)

      var subtotal = subtotal_Factura; /*invoice.getText({fieldId: 'subtotal'});
      try{ subtotal = subtotal.replace(/,/g, ''); }catch(e){log.debug("Exception: ", e);}*/
      var taxtotal = taxtotal_Factura; /*invoice.getText({fieldId: 'taxtotal'});
      try{ taxtotal = taxtotal.replace(/,/g, ''); }catch(e){log.debug("Exception: ", e);}*/
      var total = total_Factura; /*invoice.getText({fieldId: 'total'});
      try{ total = total.replace(/,/g, ''); }catch(e){log.debug("Exception: ", e);}*/
      total = eval(total);
      var porcentajeImpuestoAux = "";
	  var item_Lines = invoice.getLineCount({sublistId : 'item'});
      if(item_Lines > 0)
      {
         for(var i = 0; i < item_Lines; i++)
         {
            if(porcentajeImpuestoAux != "")
              break;

            //var item_Description = invoice.getSublistValue({sublistId:'item', fieldId:'description', line:i});
		    var item_porcentajeImpuesto = invoice.getSublistText({sublistId:'item', fieldId:'taxrate1', line:i});
             try{
                if(item_porcentajeImpuesto.indexOf("19") != -1){
                  porcentajeImpuestoAux = "19.00";
                }else if(item_porcentajeImpuesto.indexOf("5") != -1){
                  porcentajeImpuestoAux = "5.00";
                }else if(item_porcentajeImpuesto.indexOf("0.0") != -1){
                  porcentajeImpuestoAux = "0.00";
                }
             }catch(e){
                 log.debug("Exception: ", e);
             }
         }
      }

      var seccion10 = "10|";
      var códigoImpuesto_10 = "01";												// ?
      var valorSinImpuesto_10 = subtotal;
      var porcentajeImpuesto_10 = porcentajeImpuestoAux;
      var totalImpuesto_10 = taxtotal;
      var unidadDeMedida_10 = "";												// ?
      var codigoDeUnidadDeMedida_10 = "94";									// ? NIU
      var valorUnitario_10 = "";												// ?
      seccion10 += códigoImpuesto_10 +"|"+ valorSinImpuesto_10.toFixed(2) +"|"+ porcentajeImpuesto_10  +"|"+ totalImpuesto_10.toFixed(2) +"|"+ unidadDeMedida_10 +"|"+ codigoDeUnidadDeMedida_10 +"|"+ valorUnitario_10 + "\n";

      // seccion11 ---------------------------------------------------------------------------------------------------------------
      // Totales (No. Elementos: 1)

      var seccion11 = "11|";
      var subtotalFactura_11 = subtotal;
      var totalBaseImponible_11 = subtotal; // taxtotal;
      var totalMasImpuestos_11 = total;
      var totalFactura_11 = (total-valor_del_descuento_04);;
      //Falta descontar retenciones totalFactura_11 = (totalFactura_11-total_impuesto_reteICA_05); - total_impuesto_reteFuente_05? 
      //totalFactura_11 = (totalFactura_11-total_impuesto_reteICA_05);
      var descuento_11 = (valor_del_descuento_04 - 0);						// ?
      log.debug('seccion11 descuento_11 test: ', descuento_11);
      var cargos_11 = "0.00";											// ?
      var anticipos_11 = "0.00";										// ?
      var moneda_11 = "COP";
      //11		|	126050.42			|	126050.42				|	150000.00						  |		-1923949.58				|2073949.58|0.00|0.00|COP 
	  seccion11 += subtotalFactura_11.toFixed(2) +"|"+ totalBaseImponible_11.toFixed(2) +"|"+ totalMasImpuestos_11.toFixed(2) +"|"+ totalFactura_11.toFixed(2) +"|"+ descuento_11.toFixed(2) +"|"+ cargos_11 +"|"+ anticipos_11 +"|"+ moneda_11 + "\n";

      /* seccion12y13 ---------------------------------------------------------------------------------------------------------------
      // 12 Detalle de ítems (No. Elementos: 1-N)
      // 13 Impuesto de detalles (No. Elementos: 1-N)

      var seccion12y13 = "";
      var numeroDeItem_12y13 = 1;
	  var item_Lines2 = invoice.getLineCount({sublistId : 'item'});
      if(item_Lines2 > 0)
      {
         for(var j = 0; j < item_Lines2; j++)
         {
           var codigoPrincipal_12 = invoice.getSublistValue({sublistId:'item', fieldId:'item', line:j});
           var codigoAuxiliar_12 = invoice.getSublistValue({sublistId:'item', fieldId:'item', line:j});					// ?
           var descripcionProducto_12 = invoice.getSublistValue({sublistId:'item', fieldId:'description', line:j});
           var cantidad_12 = invoice.getSublistValue({sublistId:'item', fieldId:'quantity', line:j});
           if(cantidad_12 == null || cantidad_12 == "")
             cantidad_12 = 1;
           var cantidadUnidad_12 = cantidad_12				// ?
           var codigoDeUnidadMedida_12 = "94";																			// ?
           var precioUnitario_12 = invoice.getSublistText({sublistId:'item', fieldId:'rate', line:j});
           try{ precioUnitario_12 = precioUnitario_12.replace(/,/g, ''); }catch(e){log.debug("Exception: ", e);}
           var tipoPrecio_12 = "01";																					// ?
           var valorTotalItem_12 = invoice.getSublistText({sublistId:'item', fieldId:'amount', line:j});
           if(valorTotalItem_12 == null || valorTotalItem_12 == "")
             valorTotalItem_12 = (precioUnitario_12 * cantidad_12);
           try{ valorTotalItem_12 = valorTotalItem_12.replace(/,/g, ''); }catch(e){log.debug("Exception: ", e);}
           var descripcionAdicional_12 = invoice.getSublistValue({sublistId:'item', fieldId:'units_display', line:j});  // ?
           var descuentoDelItem_12 = (descripcionProducto_12 == "MANTENIMIENTO PREVENTIVO COL" || descripcionProducto_12 == "HONORARIOS MICROINJERTO DE CABELLO COL") ? valor_descuento_Aux : "0.00";
           var valorNoComercial_12 = "0.00";																			// ?
           var marca_12 = "";																							// ?
           var modelo_12 = "";																							// ?
           seccion12y13 += "12|"+ numeroDeItem_12y13 +"|"+ codigoPrincipal_12 +"|"+ codigoAuxiliar_12 +"|"+ descripcionProducto_12 +"|"+ cantidad_12 +"|"+ cantidadUnidad_12 +"|"+ codigoDeUnidadMedida_12 +"|"+ precioUnitario_12 +"|"+ tipoPrecio_12 +"|"+ valorTotalItem_12 +"|"+ descripcionAdicional_12 +"|"+ descuentoDelItem_12 +"|"+ valorNoComercial_12 +"|"+ marca_12 +"|"+ modelo_12 + "\n";

           var id_13 = "01";																							// ?
           var valorDelImpuesto_13 = invoice.getSublistText({sublistId:'item', fieldId:'tax1amt', line:j});
           try{ valorDelImpuesto_13 = valorDelImpuesto_13.replace(/,/g, ''); }catch(e){log.debug("Exception: ", e);}
           var porcentajeDelImpuesto_13 = invoice.getSublistText({sublistId:'item', fieldId:'taxrate1', line:j});
           try{ porcentajeDelImpuesto_13 = porcentajeDelImpuesto_13.replace(/%/g, '0'); }catch(e){log.debug("Exception: ", e);}
           var valorBase_13 = invoice.getSublistText({sublistId:'item', fieldId:'amount', line:j});
           try{ valorBase_13 = valorBase_13.replace(/,/g, ''); }catch(e){log.debug("Exception: ", e);}
           var unidadCantidad_13 = "";																					// ?
           var identificacionDeLaMedida_13 = "";																		// ?
           var valorDeCantidadPorUnidad_13 = "";																		// ?

           seccion12y13 += "13|"+ numeroDeItem_12y13 +"|"+ id_13 +"|"+ valorDelImpuesto_13 +"|"+ porcentajeDelImpuesto_13 +"|"+ valorBase_13 +"|"+ unidadCantidad_13 +"|"+ identificacionDeLaMedida_13 +"|"+ valorDeCantidadPorUnidad_13 + "\n";
           numeroDeItem_12y13++;
         }
      }*/

      // seccion16 --------------------------------------------------------------------------------------------------------------- // ?
      // seccion17 --------------------------------------------------------------------------------------------------------------- // ?
      // seccion18 --------------------------------------------------------------------------------------------------------------- // ?

      // seccion19 --------------------------------------------------------------------------------------------------------------- // ?
      // Pagos de la Factura (No. Elementos: 1)

      var custbody96 = invoice.getValue({fieldId: 'custbody96'});
      var custbody97 = invoice.getText({fieldId: 'custbody97'});
      custbody97 = getCodigoMedioPago(custbody97);

      var seccion19 = "19|";
      var metodoDePago_19 = "1"; //	custbody96
      var medioDePago_19 = custbody97;
      var fechaDeVencimiento_19 = fechaDeEmision_01;											// ? Obligatorio si es venta a crédito
      var identificadorDelPago_19 = "";											// ?
      seccion19 += metodoDePago_19 +"|"+ medioDePago_19 +"|"+ fechaDeVencimiento_19 +"|"+ identificadorDelPago_19 + "\n";

      var content_txt = seccion01 + seccion02 + seccion03;
      if(newArrayItemsDescuentos.length > 0){content_txt += seccion04_descuento;}
      //if(tipo_de_Elemento_cargo_04){content_txt += seccion04_cargo;}
      if(seccion05_reteFuente != "")
        content_txt += seccion05_reteFuente;
      if(seccion05_reteICA != "")
        content_txt += seccion05_reteICA;
      content_txt += seccion10 + seccion11 + secc_12_13_14y15 + seccion19;

      log.debug('content_txt: ', content_txt);

	  var headers1 = [];
	  headers1['Content-Type'] = 'application/json';

      var content_txt_base64 = encode.convert({string: content_txt, inputEncoding: encode.Encoding.UTF_8, outputEncoding: encode.Encoding.BASE_64});
      /*var nombreAdjunto = '"' + tranidVal + '"';
      var txtEncode = '"' + content_txt_base64 + '"';
	  var body1 = JSON.stringify({"txtEncode": txtEncode, "adjunto": "", "nombreAdjunto": nombreAdjunto});*/
      var body1 = {"txtEncode": content_txt_base64, "adjunto": "", "nombreAdjunto": tranidVal};
      log.debug('body1: ', body1);

      // Pruebas WA:	https://pruebas.estupendo.com.co/api/cargarDocumentoTxt
      // Producción WA: https://app.estupendo.com.co/api/cargarDocumentoTxt
      var responseAPI = https.request({method:https.Method.POST, url:'https://app.estupendo.com.co/api/cargarDocumentoTxt', header:headers1, body:body1});
      log.debug('responseAPI: ', responseAPI);
      log.debug('responseAPI.body: ', responseAPI.body);
      if(responseAPI.body.indexOf("Documento Autorizado") != -1)
      {
        var fileObj = file.create({
            name: 'FAV_'+ tranidVal + '_' + dia_Co + mes_Co + anio_Co + '_' + hourAuxHH + hourAuxMM + hourAuxSS + '.txt',
            fileType: file.Type.PLAINTEXT,
            contents: content_txt,
            encoding: file.Encoding.UTF8,
            folder: folderToSaveInvoice,
            isOnline: false
        });
        var txt_fileId = fileObj.save();

        log.debug('Status: ', 'Documento Autorizado: ' + txt_fileId.toString() + '_' + 'FAV_'+ tranidVal + '_' + dia_Co + mes_Co + anio_Co + '_' + hourAuxHH + hourAuxMM + hourAuxSS + '.txt');
        invoice.setValue({fieldId: "custbody136", value: 'Documento Autorizado'});
        invoice.save({enableSourcing: false, ignoreMandatoryFields: true});
        redirect.toRecord({type : 'invoice', id : recId});

        //context.response.write('Documento Autorizado: ' + txt_fileId.toString());
        //context.response.write(content_txt.toString());

        /*var postRequest = http.post({url:'https://pruebas.estupendo.com.co/api/cargarDocumentoTxt', body: body1, headers: headers1});
        // http://18.221.84.134/api/cargarDocumentoTxt
        log.debug('postRequest: ', postRequest.body);*/
      }
      else
      {
        invoice.setValue({fieldId: "custbody136", value: 'Documento Rechazado'});
        invoice.save({enableSourcing: false, ignoreMandatoryFields: true});
        redirect.toRecord({type : 'invoice', id : recId});
        //context.response.write('Documento Rechazado');
      }

      //var newTxt = file.load({id: txt_fileId});

	  /*var body2 = JSON.stringify({"nit": "900852763", "tipo_documento": "01", "numeral": tranidVal});
	  var postRequest2 = http.post({url:'http://18.221.84.134/api/consultarEstadoDocumento', body: body2, headers: headers1});
   	  log.debug('postRequest2: ', postRequest2);

      Response
      3.3.1. Posibles Valores
        • result:
        o true = Cuando la consulta fue exitosa
        o false = Cuando hubo errores o excepciones en la consulta
      • status: Código del estado del documento en Stupendo
        o 2 = Autorizado
        o 3 = Rechazado

      Response:{
      "result": “Estado booleano de la consulta”,
      "status": “Estado del documento”,
      "cufe": "Valor del cufe",
      "message": "Detalle de errores en el caso de documento rechazado"
      }
      */


    }

  function getCodigoMedioPago(nombreMedio){
    var codigoMedioPago = null;
        switch (nombreMedio) {
        case "Instrumento no definido":
          codigoMedioPago="1";
          break;
        case "Crédito ACH":
          codigoMedioPago="2";
          break;
        case "Débito ACH":
          codigoMedioPago="3";
          break;
        case "Reversión débito de demanda ACH":
          codigoMedioPago="4";
          break;
        case "Reversión crédito de demanda ACH":
          codigoMedioPago="5";
          break;
        case "Crédito de demanda ACH":
          codigoMedioPago="6";
          break;
        case "Débito de demanda ACH":
          codigoMedioPago="7";
          break;
        case "Mantener":
          codigoMedioPago="8";
          break;
        case "Clearing Nacional o Regional":
          codigoMedioPago="9";
          break;
        case "Efectivo":
          codigoMedioPago="10";
          break;
        case "Reversión Crédito Ahorro":
          codigoMedioPago="11";
          break;
        case "Reversión Débito Ahorro":
          codigoMedioPago="12";
          break;
        case "Crédito Ahorro":
          codigoMedioPago="13";
          break;
        case "Débito Ahorro":
          codigoMedioPago="14";
          break;
        case "Bookentry Crédito":
          codigoMedioPago="15";
          break;
        case "Bookentry Débito":
          codigoMedioPago="16";
          break;
        case "Concentración de la demanda en efectivo/Desembolso Crédito (CCD)":
          codigoMedioPago="17";
          break;
        case "Concentración de la demanda en efectivo / Desembolso (CCD) débito":
          codigoMedioPago="18";
          break;
        case "Crédito Pago negocio corporativo (CTP)":
          codigoMedioPago="19";
          break;
        case "Cheque":
          codigoMedioPago="20";
          break;
        case "Poyecto bancario":
          codigoMedioPago="21";
          break;
        case "Proyecto bancario certificado":
          codigoMedioPago="22";
          break;
        case "Cheque bancario":
          codigoMedioPago="23";
          break;
        case "Nota cambiaria esperando aceptación":
          codigoMedioPago="24";
          break;
        case "Cheque certificado":
          codigoMedioPago="25";
          break;
        case "Cheque Local":
          codigoMedioPago="26";
          break;
        case "Débito Pago Neogcio Corporativo (CTP)":
          codigoMedioPago="27";
          break;
        case "Crédito Negocio Intercambio Corporativo (CTX)":
          codigoMedioPago="28";
          break;
        case "Débito Negocio Intercambio Corporativo (CTX)":
          codigoMedioPago="29";
          break;
        case "Transferecia Crédito":
          codigoMedioPago="30";
          break;
        case "Transferencia Débito":
          codigoMedioPago="31";
          break;
        case "Concentración Efectivo / Desembolso Crédito plus (CCD+)":
          codigoMedioPago="32";
          break;
        case "Concentración Efectivo / Desembolso Débito plus (CCD+)":
          codigoMedioPago="33";
          break;
        case "Pago y depósito pre acordado (PPD)":
          codigoMedioPago="34";
          break;
        case "Concentración efectivo ahorros / Desembolso Crédito (CCD)":
          codigoMedioPago="35";
          break;
        case "Concentración efectivo ahorros / Desembolso Drédito (CCD)":
          codigoMedioPago="36";
          break;
        case "Pago Negocio Corporativo Ahorros Crédito (CTP)":
          codigoMedioPago="37";
          break;
        case "Pago Neogcio Corporativo Ahorros Débito (CTP)":
          codigoMedioPago="38";
          break;
        case "Crédito Negocio Intercambio Corporativo (CTX)":
          codigoMedioPago="39";
          break;
        case "Débito Negocio Intercambio Corporativo (CTX)":
          codigoMedioPago="40";
          break;
        case "Concentración efectivo/Desembolso Crédito plus (CCD+)":
          codigoMedioPago="41";
          break;
        case "Consiganción bancaria":
          codigoMedioPago="42";
          break;
        case "Concentración efectivo / Desembolso Débito plus (CCD+)":
          codigoMedioPago="43";
          break;
        case "Nota cambiaria":
          codigoMedioPago="44";
          break;
        case "Transferencia Crédito Bancario":
          codigoMedioPago="45";
          break;
        case "Transferencia Débito Interbancario":
          codigoMedioPago="46";
          break;
        case "Transferencia Débito Bancaria":
          codigoMedioPago="47";
          break;
        case "Tarjeta Crédito":
          codigoMedioPago="48";
          break;
        case "Tarjeta Débito":
          codigoMedioPago="49";
          break;
        case "Postgiro":
          codigoMedioPago="50";
          break;
        case "Telex estándar bancario francés":
          codigoMedioPago="51";
          break;
        case "Pago comercial urgente":
          codigoMedioPago="52";
          break;
        case "Pago Tesorería Urgente":
          codigoMedioPago="53";
          break;
        case "Nota promisoria":
          codigoMedioPago="60";
          break;
        case "Nota promisoria firmada por el acreedor":
          codigoMedioPago="61";
          break;
        case "Nota promisoria firmada por el acreedor, avalada por el banco":
          codigoMedioPago="62";
          break;
        case "Nota promisoria firmada por el acreedor, avalada por un tercero":
          codigoMedioPago="63";
          break;
        case "Nota promisoria firmada por el banco":
          codigoMedioPago="64";
          break;
        case "Nota promisoria firmada por un banco avalada por otro banco":
          codigoMedioPago="65";
          break;
        case "Nota promisoria firmada":
          codigoMedioPago="66";
          break;
        case "Nota promisoria firmada por un tercero avalada por un banco":
          codigoMedioPago="67";
          break;
        case "Retiro de nota por el por el acreedor":
          codigoMedioPago="70";
          break;
        case "Retiro de nota por el por el acreedor sobre un banco":
          codigoMedioPago="74";
          break;
        case "Retiro de nota por el acreedor, avalada por otro banco":
          codigoMedioPago="75";
          break;
        case "Retiro de nota por el acreedor, sobre un banco avalada por un tercero":
          codigoMedioPago="76";
          break;
        case "Retiro de una nota por el acreedor sobre un tercero":
          codigoMedioPago="77";
          break;
        case "Retiro de una nota por el acreedor sobre un tercero avalada por un banco":
          codigoMedioPago="78";
          break;
        case "Nota bancaria tranferible":
          codigoMedioPago="91";
          break;
        case "Cheque local traferible":
          codigoMedioPago="92";
          break;
        case "Giro referenciado":
          codigoMedioPago="93";
          break;
        case "Giro urgente":
          codigoMedioPago="94";
          break;
        case "Giro formato abierto":
          codigoMedioPago="95";
          break;
        case "Método de pago solicitado no usuado":
          codigoMedioPago="96";
          break;
        case "Clearing entre partners":
          codigoMedioPago="97";
          break;
        case "Acuerdo mutuo":
          codigoMedioPago="ZZZ";
          break;
        default:
          codigoMedioPago="00000";
          }
      return codigoMedioPago;
  }

function getCodigoDep(nombreDep){
    var codigoDep = null;
        switch (nombreDep) {
        case "Amazonas":
          codigoDep="91";
          break;
        case "Antioquia":
          codigoDep="05";
          break;
        case "Arauca":
          codigoDep="81";
          break;
        case "Atlántico":
          codigoDep="08";
          break;
        case "Bogotá":
          codigoDep="11";
          break;
        case "Bolívar":
          codigoDep="13";
          break;
        case "Boyacá":
          codigoDep="15";
          break;
        case "Caldas":
          codigoDep="17";
          break;
        case "Caquetá":
          codigoDep="18";
          break;
        case "Casanare":
          codigoDep="85";
          break;
        case "Cauca":
          codigoDep="19";
          break;
        case "Cesar":
          codigoDep="20";
          break;
        case "Chocó":
          codigoDep="27";
          break;
        case "Córdoba":
          codigoDep="23";
          break;
        case "Cundinamarca":
          codigoDep="25";
          break;
        case "Guainía":
          codigoDep="94";
          break;
        case "Guaviare":
          codigoDep="95";
          break;
        case "Huila":
          codigoDep="41";
          break;
        case "La Guajira":
          codigoDep="44";
          break;
        case "Magdalena":
          codigoDep="47";
          break;
        case "Meta":
          codigoDep="50";
          break;
        case "Nariño":
          codigoDep="52";
          break;
        case "Norte de Santander":
          codigoDep="54";
          break;
        case "Putumayo":
          codigoDep="86";
          break;
        case "Quindío":
          codigoDep="63";
          break;
        case "Risaralda":
          codigoDep="66";
          break;
        case "San Andrés y Providencia":
          codigoDep="88";
          break;
        case "Santander":
          codigoDep="68";
          break;
        case "Sucre":
          codigoDep="70";
          break;
        case "Tolima":
          codigoDep="73";
          break;
        case "Valle del Cauca":
          codigoDep="76";
          break;
        case "Vaupés":
          codigoDep="97";
          break;
        case "Vichada":
          codigoDep="99";
          break;
        default:
          codigoDep="00000";
          }
      return codigoDep;
  }

  function getCodigoMunicipio(nombreMunicipio)
  {
    var codigoMunicipio = null;
    switch (nombreMunicipio) {
	  case "MEDELLÍN":
      	codigoMunicipio="05001";
        break;
	  case "ABEJORRAL":
      	codigoMunicipio="05002";
        break;
	  case "ABRIAQUÍ":
      	codigoMunicipio="05004";
        break;
	  case "ALEJANDRÍA":
      	codigoMunicipio="05021";
        break;
 	  case "AMAGÁ":
      	codigoMunicipio="05030";
        break;
	  case "AMALFI":
		codigoMunicipio="05031";
        break;
	  case "ANDES":
      	codigoMunicipio="05034";
        break;
	  case "ANGELÓPOLIS":
      	codigoMunicipio="05036";
        break;
	  case "ANGOSTURA":
      	codigoMunicipio="05038";
        break;
	  case "ANORÍ":
      	codigoMunicipio="05040";
        break;
	  case "SANTA FÉ DE ANTIOQUIA":
      	codigoMunicipio="05042";
        break;
	  case "ANZÁ":
      	codigoMunicipio="05044";
        break;
	  case "APARTADÓ":
      	codigoMunicipio="05045";
        break;
	  case "ARBOLETES":
      	codigoMunicipio="05051";
        break;
	  case "ARGELIA":
      	codigoMunicipio="05055";
        break;
	  case "ARMENIA":
      	codigoMunicipio="05059";
        break;
	  case "BARBOSA":
      	codigoMunicipio="05079";
        break;
	  case "BELMIRA":
      	codigoMunicipio="05086";
        break;
	  case "BELLO":
      	codigoMunicipio="05088";
        break;
	  case "BETANIA":
      	codigoMunicipio="05091";
        break;
	  case "BETULIA":
      	codigoMunicipio="05093";
        break;
	  case "CIUDAD BOLÍVAR":
      	codigoMunicipio="05101";
        break;
	  case "BRICEÑO":
      	codigoMunicipio="05107";
        break;
	  case "BURITICÁ":
      	codigoMunicipio="05113";
        break;
	  case "CÁCERES":
      	codigoMunicipio="05120";
        break;
	  case "CAICEDO":
      	codigoMunicipio="05125";
        break;
	  case "CALDAS":
      	codigoMunicipio="05129";
        break;
	  case "CAMPAMENTO":
      	codigoMunicipio="05134";
        break;
	  case "CAÑASGORDAS":
      	codigoMunicipio="05138";
        break;
	  case "CARACOLÍ":
      	codigoMunicipio="05142";
        break;
    case "CARAMANTA":
      	codigoMunicipio="05145";
        break;
    case "CAREPA":
      	codigoMunicipio="05147";
        break;
	  case "EL CARMEN DE VIBORAL":
      	codigoMunicipio="05148";
        break;
	  case "CAROLINA":
      	codigoMunicipio="05150";
        break;
	  case "CAUCASIA":
      	codigoMunicipio="05154";
        break;
	  case "CHIGORODÓ":
      	codigoMunicipio="05172";
        break;
	  case "CISNEROS":
      	codigoMunicipio="05190";
        break;
	  case "COCORNÁ":
      	codigoMunicipio="05197";
        break;
	  case "CONCEPCIÓN":
      	codigoMunicipio="05206";
        break;
	  case "CONCORDIA":
      	codigoMunicipio="05209";
        break;
	  case "COPACABANA":
      	codigoMunicipio="05212";
        break;
	  case "DABEIBA":
      	codigoMunicipio="05234";
        break;
	  case "DONMATÍAS":
      	codigoMunicipio="05237";
        break;
	  case "EBÉJICO":
      	codigoMunicipio="05240";
        break;
	  case "EL BAGRE":
      	codigoMunicipio="05250";
        break;
	  case "ENTRERRÍOS":
      	codigoMunicipio="05264";
        break;
	  case "ENVIGADO":
      	codigoMunicipio="05266";
        break;
	  case "FREDONIA":
      	codigoMunicipio="05282";
        break;
	  case "FRONTINO":
      	codigoMunicipio="05284";
        break;
	  case "GIRALDO":
      	codigoMunicipio="05306";
        break;
	  case "GIRARDOTA":
      	codigoMunicipio="05308";
        break;
	  case "GÓMEZ PLATA":
      	codigoMunicipio="05310";
        break;
	  case "GRANADA":
		codigoMunicipio="05313";
        break;
	  case "GUADALUPE":
      	codigoMunicipio="05315";
        break;
	  case "GUARNE":
      	codigoMunicipio="05318";
        break;
      case "GUATAPÉ":
      	codigoMunicipio="05321";
        break;
	  case "HELICONIA":
      	codigoMunicipio="05347";
        break;
	  case "HISPANIA":
      	codigoMunicipio="05353";
        break;
	  case "ITAGÜÍ":
      	codigoMunicipio="05360";
        break;
	  case "ITUANGO":
      	codigoMunicipio="05361";
        break;
	  case "JARDÍN":
      	codigoMunicipio="05364";
        break;
	  case "JERICÓ":
      	codigoMunicipio="05368";
        break;
	  case "LA CEJA":
      	codigoMunicipio="05376";
        break;
	  case "LA ESTRELLA":
      	codigoMunicipio="05380";
        break;
	  case "LA PINTADA":
      	codigoMunicipio="05390";
        break;
	  case "LA UNIÓN":
      	codigoMunicipio="05400";
        break;
	  case "LIBORINA":
      	codigoMunicipio="05411";
        break;
	  case "MACEO":
      	codigoMunicipio="05425";
        break;
	  case "MARINILLA":
      	codigoMunicipio="05440";
        break;
	  case "MONTEBELLO":
      	codigoMunicipio="05467";
        break;
	  case "MURINDÓ":
      	codigoMunicipio="05475";
        break;
	  case "MUTATÁ":
      	codigoMunicipio="05480";
        break;
	  case "NARIÑO":
      	codigoMunicipio="05483";
        break;
	  case "NECOCLÍ":
      	codigoMunicipio="05490";
        break;
	  case "NECHÍ":
      	codigoMunicipio="05495";
        break;
	  case "OLAYA":
      	codigoMunicipio="05501";
        break;
	  case "PEÑOL":
      	codigoMunicipio="05541";
        break;
	  case "PEQUE":
      	codigoMunicipio="05543";
        break;
	  case "PUEBLORRICO":
      	codigoMunicipio="05576";
        break;
	  case "PUERTO BERRÍO":
      	codigoMunicipio="05579";
        break;
	  case "PUERTO NARE":
      	codigoMunicipio="05585";
        break;
	  case "PUERTO TRIUNFO":
      	codigoMunicipio="05591";
        break;
	  case "REMEDIOS":
      	codigoMunicipio="05604";
        break;
	  case "RETIRO":
      	codigoMunicipio="05607";
        break;
	  case "RIONEGRO":
      	codigoMunicipio="05615";
        break;
	  case "SABANALARGA":
      	codigoMunicipio="05628";
        break;
	  case "SABANETA":
      	codigoMunicipio="05631";
        break;
	  case "SALGAR":
      	codigoMunicipio="05642";
        break;
	  case "SAN ANDRÉS DE CUERQUÍA":
      	codigoMunicipio="05647";
        break;
	  case "SAN CARLOS":
      	codigoMunicipio="05649";
        break;
	  case "SAN FRANCISCO":
      	codigoMunicipio="05652";
        break;
	  case "SAN JERÓNIMO":
      	codigoMunicipio="05656";
        break;
	  case "SAN JOSÉ DE LA MONTAÑA":
      	codigoMunicipio="05658";
        break;
	  case "SAN JUAN DE URABÁ":
      	codigoMunicipio="05659";
        break;
	  case "SAN LUIS":
      	codigoMunicipio="05660";
        break;
	  case "SAN PEDRO DE LOS MILAGROS":
      	codigoMunicipio="05664";
        break;
	  case "SAN PEDRO DE URABÁ":
      	codigoMunicipio="05665";
        break;
	  case "SAN RAFAEL":
      	codigoMunicipio="05667";
        break;
	  case "SAN ROQUE":
      	codigoMunicipio="05670";
        break;
	  case "SAN VICENTE FERRER":
      	codigoMunicipio="05674";
        break;
	  case "SANTA BÁRBARA":
      	codigoMunicipio="05679";
        break;
	  case "SANTA ROSA DE OSOS":
      	codigoMunicipio="05686";
        break;
	  case "SANTO DOMINGO":
      	codigoMunicipio="05690";
        break;
	  case "EL SANTUARIO":
      	codigoMunicipio="05697";
        break;
	  case "SEGOVIA":
      	codigoMunicipio="05736";
        break;
	  case "SONSÓN":
      	codigoMunicipio="05756";
        break;
	  case "SOPETRÁN":
      	codigoMunicipio="05761";
        break;
	  case "TÁMESIS":
      	codigoMunicipio="05789";
        break;
	  case "TARAZÁ":
      	codigoMunicipio="05790";
        break;
	  case "TARSO":
      	codigoMunicipio="05792";
        break;
	  case "TITIRIBÍ":
      	codigoMunicipio="05809";
        break;
	  case "TOLEDO":
      	codigoMunicipio="05819";
        break;
	  case "TURBO":
      	codigoMunicipio="05837";
        break;
	  case "URAMITA":
      	codigoMunicipio="05842";
        break;
	  case "URRAO":
      	codigoMunicipio="05847";
        break;
	  case "VALDIVIA":
      	codigoMunicipio="05854";
        break;
	  case "VALPARAÍSO":
      	codigoMunicipio="05856";
        break;
	  case "VEGACHÍ":
      	codigoMunicipio="05858";
        break;
	  case "VENECIA":
      	codigoMunicipio="05861";
        break;
	  case "VENECIA":
      	codigoMunicipio="05861";
        break;
	  case "VIGÍA DEL FUERTE":
      	codigoMunicipio="05873";
        break;
	  case "YALÍ":
      	codigoMunicipio="05885";
        break;
	  case "YARUMAL":
      	codigoMunicipio="05887";
        break;
	  case "YOLOMBÓ":
      	codigoMunicipio="05890";
        break;
	  case "YONDÓ":
      	codigoMunicipio="05893";
        break;
	  case "ZARAGOZA":
      	codigoMunicipio="05895";
        break;
	  case "BARRANQUILLA":
      	codigoMunicipio="08001";
        break;
	  case "BARANOA":
      	codigoMunicipio="08078";
        break;
	  case "CAMPO DE LA CRUZ":
      	codigoMunicipio="08137";
        break;
	  case "CANDELARIA":
      	codigoMunicipio="08141";
        break;
	  case "GALAPA":
      	codigoMunicipio="08296";
        break;
	  case "JUAN DE ACOSTA":
      	codigoMunicipio="08372";
        break;
	  case "LURUACO":
      	codigoMunicipio="08421";
        break;
	  case "MALAMBO":
      	codigoMunicipio="08433";
        break;
	  case "MANATÍ":
      	codigoMunicipio="08436";
        break;
	  case "PALMAR DE VARELA":
      	codigoMunicipio="08520";
        break;
	  case "PIOJÓ":
      	codigoMunicipio="08549";
        break;
	  case "POLONUEVO":
      	codigoMunicipio="08558";
        break;
	  case "PONEDERA":
      	codigoMunicipio="08560";
        break;
	  case "PUERTO COLOMBIA":
      	codigoMunicipio="08573";
        break;
	  case "REPELÓN":
      	codigoMunicipio="08606";
        break;
	  case "SABANAGRANDE":
      	codigoMunicipio="08634";
        break;
	  case "SABANALARGA":
      	codigoMunicipio="08638";
        break;
	  case "SANTA LUCÍA":
      	codigoMunicipio="08675";
        break;
	  case "SANTO TOMÁS":
      	codigoMunicipio="08685";
        break;
	  case "SOLEDAD":
      	codigoMunicipio="08758";
        break;
	  case "SUAN":
      	codigoMunicipio="08770";
        break;
	  case "TUBARÁ":
      	codigoMunicipio="08832";
        break;
	  case "USIACURÍ":
      	codigoMunicipio="08849";
        break;
	  case "BOGOTÁ, D.C.":
      	codigoMunicipio="11001";
        break;
	  case "CARTAGENA DE INDIAS":
      	codigoMunicipio="13001";
        break;
	  case "ACHÍ":
      	codigoMunicipio="13006";
        break;
	  case "ALTOS DEL ROSARIO":
      	codigoMunicipio="13030";
        break;
	  case "ARENAL":
      	codigoMunicipio="13042";
        break;
	  case "ARJONA":
      	codigoMunicipio="13052";
        break;
	  case "ARROYOHONDO":
      	codigoMunicipio="13062";
        break;
	  case "BARRANCO DE LOBA":
      	codigoMunicipio="13074";
        break;
	  case "CALAMAR":
      	codigoMunicipio="13140";
        break;
	  case "CANTAGALLO":
      	codigoMunicipio="13160";
        break;
	  case "CICUCO":
      	codigoMunicipio="13188";
        break;
	  case "CÓRDOBA":
      	codigoMunicipio="13212";
        break;
	  case "CLEMENCIA":
      	codigoMunicipio="13222";
        break;
	  case "EL CARMEN DE BOLÍVAR":
      	codigoMunicipio="13244";
        break;
	  case "EL GUAMO":
       	codigoMunicipio="13248";
        break;
	  case "EL PEÑÓN":
      	codigoMunicipio="13268";
        break;
	  case "HATILLO DE LOBA":
      	codigoMunicipio="13300";
        break;
	  case "MAGANGUÉ":
      	codigoMunicipio="13430";
        break;
	  case "MAHATES":
      	codigoMunicipio="13433";
      	break;
	  case "MARGARITA":
      	codigoMunicipio="13440";
        break;
	  case "MARÍA LA BAJA":
      	codigoMunicipio="13442";
        break;
	  case "MONTECRISTO":
      	codigoMunicipio="13458";
        break;
	  case "MOMPÓS":
      	codigoMunicipio="13468";
        break;
	  case "MORALES":
      	codigoMunicipio="13473";
        break;
	  case "NOROSÍ":
      	codigoMunicipio="13490";
        break;
	  case "PINILLOS":
      	codigoMunicipio="13549";
        break;
	  case "REGIDOR":
      	codigoMunicipio="13580";
        break;
	  case "REGIDOR":
      	codigoMunicipio="13580";
        break;
	  case "RÍO VIEJO":
      	codigoMunicipio="13600";
        break;
	  case "SAN CRISTÓBAL":
      	codigoMunicipio="13620";
        break;
	  case "SAN ESTANISLAO":
      	codigoMunicipio="13647";
        break;
	  case "SAN FERNANDO":
      	codigoMunicipio="13650";
        break;
	  case "SAN JACINTO":
      	codigoMunicipio="13654";
        break;
	  case "SAN JACINTO DEL CAUCA":
      	codigoMunicipio="13655";
        break;
	  case "SAN JUAN NEPOMUCENO":
      	codigoMunicipio="13657";
        break;
	  case "SAN MARTÍN DE LOBA":
      	codigoMunicipio="13667";
        break;
	  case "SAN PABLO":
      	codigoMunicipio="13670";
        break;
	  case "SANTA CATALINA":
      	codigoMunicipio="13673";
        break;
  	case "SANTA ROSA":
      	codigoMunicipio="13683";
        break;
	  case "SANTA ROSA DEL SUR":
      	codigoMunicipio="13688";
        break;
	  case "SIMITÍ":
      	codigoMunicipio="13744";
        break;
	  case "SOPLAVIENTO":
      	codigoMunicipio="13760";
        break;
	  case "TALAIGUA NUEVO":
      	codigoMunicipio="13780";
        break;
	  case "TIQUISIO":
      	codigoMunicipio="13810";
        break;
	  case "TURBACO":
      	codigoMunicipio="13836";
        break;
	  case "TURBANÁ":
      	codigoMunicipio="13838";
        break;
	  case "VILLANUEVA":
      	codigoMunicipio="13873";
        break;
	  case "ZAMBRANO":
      	codigoMunicipio="13894";
        break;
	  case "TUNJA":
      	codigoMunicipio="15001";
        break;
	  case "ALMEIDA":
      	codigoMunicipio="15022";
        break;
	  case "AQUITANIA":
      	codigoMunicipio="15047";
        break;
	  case "ARCABUCO":
      	codigoMunicipio="15051";
        break;
	  case "BELÉN":
      	codigoMunicipio="15087";
        break;
	  case "BERBEO":
      	codigoMunicipio="15090";
        break;
	  case "BETÉITIVA":
      	codigoMunicipio="15092";
        break;
	  case "BOAVITA":
      	codigoMunicipio="15097";
        break;
	  case "BOYACÁ":
      	codigoMunicipio="15104";
        break;
	  case "BRICEÑO":
      	codigoMunicipio="15106";
        break;
	  case "BUENAVISTA":
      	codigoMunicipio="15109";
        break;
	  case "BUSBANZÁ":
      	codigoMunicipio="15114";
        break;
	  case "CALDAS":
      	codigoMunicipio="15131";
        break;
	  case "CAMPOHERMOSO":
      	codigoMunicipio="15135";
        break;
	  case "CERINZA":
      	codigoMunicipio="15162";
        break;
	  case "CHINAVITA":
      	codigoMunicipio="15172";
        break;
	  case "CHIQUINQUIRÁ":
      	codigoMunicipio="15176";
        break;
	  case "CHISCAS":
      	codigoMunicipio="15180";
        break;
	  case "CHITA":
      	codigoMunicipio="15183";
        break;
	  case "CHITARAQUE":
      	codigoMunicipio="15185";
        break;
	  case "CHIVATÁ":
      	codigoMunicipio="15187";
        break;
	  case "CIÉNEGA":
      	codigoMunicipio="15189";
        break;
	  case "CÓMBITA":
      	codigoMunicipio="15204";
        break;
	  case "COPER":
      	codigoMunicipio="15212";
        break;
	  case "CORRALES":
      	codigoMunicipio="15215";
        break;
	  case "COVARACHÍA":
      	codigoMunicipio="15218";
        break;
	  case "CUBARÁ":
      	codigoMunicipio="15223";
        break;
	  case "CUCAITA":
      	codigoMunicipio="15224";
        break;
	  case "CUÍTIVA":
      	codigoMunicipio="15226";
        break;
	  case "CHÍQUIZA":
      	codigoMunicipio="15232";
        break;
	  case "CHIVOR":
      	codigoMunicipio="15236";
        break;
	  case "DUITAMA":
      	codigoMunicipio="15238";
        break;
	  case "EL COCUY":
      	codigoMunicipio="15244";
        break;
	  case "EL ESPINO":
      	codigoMunicipio="15248";
        break;
	  case "FIRAVITOBA":
      	codigoMunicipio="15272";
        break;
	  case "FLORESTA":
      	codigoMunicipio="15276";
        break;
	  case "GACHANTIVÁ":
      	codigoMunicipio="15293";
        break;
	  case "GÁMEZA":
      	codigoMunicipio="15296";
        break;
	  case "GARAGOA":
      	codigoMunicipio="15299";
        break;
	  case "GUACAMAYAS":
      	codigoMunicipio="15317";
        break;
	  case "GUATEQUE":
      	codigoMunicipio="15322";
        break;
	  case "GUAYATÁ":
      	codigoMunicipio="15325";
        break;
	  case "GÜICÁN DE LA SIERRA":
      	codigoMunicipio="15332";
        break;
	  case "IZA":
      	codigoMunicipio="15362";
        break;
	  case "JENESANO":
      	codigoMunicipio="15367";
        break;
	  case "JERICÓ":
      	codigoMunicipio="15368";
        break;
	  case "LABRANZAGRANDE":
      	codigoMunicipio="15377";
        break;
	  case "LA CAPILLA":
      	codigoMunicipio="15380";
        break;
	  case "LA VICTORIA":
      	codigoMunicipio="15401";
        break;
	  case "LA UVITA":
      	codigoMunicipio="15403";
        break;
	  case "VILLA DE LEYVA":
      	codigoMunicipio="15407";
        break;
	  case "MACANAL":
      	codigoMunicipio="15425";
        break;
	  case "MARIPÍ":
      	codigoMunicipio="15442";
        break;
	  case "MIRAFLORES":
      	codigoMunicipio="15455";
        break;
	  case "MONGUA":
      	codigoMunicipio="15464";
        break;
	  case "MONGUÍ":
      	codigoMunicipio="15466";
        break;
	  case "MONIQUIRÁ":
      	codigoMunicipio="15469";
        break;
	  case "MOTAVITA":
      	codigoMunicipio="15476";
        break;
	  case "MUZO":
      	codigoMunicipio="15480";
        break;
	  case "NOBSA":
      	codigoMunicipio="15491";
        break;
	  case "NUEVO COLÓN":
      	codigoMunicipio="15494";
        break;
	  case "OICATÁ":
      	codigoMunicipio="15500";
        break;
	  case "OTANCHE":
      	codigoMunicipio="15507";
        break;
	  case "PACHAVITA":
      	codigoMunicipio="15511";
        break;
	  case "PÁEZ":
      	codigoMunicipio="15514";
        break;
	  case "PAIPA":
      	codigoMunicipio="15516";
        break;
	  case "PAJARITO":
      	codigoMunicipio="15518";
        break;
	  case "PANQUEBA":
      	codigoMunicipio="15522";
        break;
	  case "PAUNA":
      	codigoMunicipio="15531";
        break;
	  case "PAYA":
      	codigoMunicipio="15533";
        break;
	  case "PAZ DE RÍO":
      	codigoMunicipio="15537";
        break;
	  case "PESCA":
      	codigoMunicipio="15542";
        break;
	  case "PISBA":
      	codigoMunicipio="15550";
        break;
	  case "PUERTO BOYACÁ":
      	codigoMunicipio="15572";
        break;
	  case "QUÍPAMA":
      	codigoMunicipio="15580";
        break;
	  case "RAMIRIQUÍ":
      	codigoMunicipio="15599";
        break;
	  case "RÁQUIRA":
      	codigoMunicipio="15600";
        break;
	  case "RONDÓN":
      	codigoMunicipio="15621";
        break;
	  case "SABOYÁ":
      	codigoMunicipio="15632";
        break;
	  case "SÁCHICA":
      	codigoMunicipio="15638";
        break;
	  case "SAMACÁ":
      	codigoMunicipio="15646";
        break;
	  case "SAN EDUARDO":
      	codigoMunicipio="15660";
        break;
	  case "SAN JOSÉ DE PARE":
      	codigoMunicipio="15664";
        break;
	  case "SAN LUIS DE GACENO":
      	codigoMunicipio="15667";
        break;
	  case "SAN MATEO":
      	codigoMunicipio="15673";
        break;
	  case "SAN MIGUEL DE SEMA":
      	codigoMunicipio="15676";
        break;
	  case "SAN PABLO DE BORBUR":
      	codigoMunicipio="15681";
        break;
	  case "SANTANA":
      	codigoMunicipio="15686";
        break;
	  case "SANTA MARÍA":
      	codigoMunicipio="15690";
        break;
	  case "SANTA ROSA DE VITERBO":
      	codigoMunicipio="15693";
        break;
	  case "SANTA SOFÍA":
      	codigoMunicipio="15696";
        break;
	  case "SATIVANORTE":
      	codigoMunicipio="15720";
        break;
	  case "SATIVASUR":
      	codigoMunicipio="15723";
        break;
	  case "SIACHOQUE":
      	codigoMunicipio="15740";
        break;
	  case "SOATÁ":
      	codigoMunicipio="15753";
        break;
	  case "SOCOTÁ":
      	codigoMunicipio="15755";
        break;
	  case "SOCHA":
      	codigoMunicipio="15757";
        break;
	  case "SOGAMOSO":
      	codigoMunicipio="15759";
        break;
	  case "SOMONDOCO":
      	codigoMunicipio="15761";
        break;
	  case "SORA":
      	codigoMunicipio="15762";
        break;
	  case "SOTAQUIRÁ":
      	codigoMunicipio="15763";
        break;
	  case "SORACÁ":
      	codigoMunicipio="15764";
        break;
	  case "SUSACÓN":
      	codigoMunicipio="15774";
        break;
	  case "SUTAMARCHÁN":
      	codigoMunicipio="15776";
        break;
	  case "SUTATENZA":
      	codigoMunicipio="15778";
      	break;
	  case "TASCO":
      	codigoMunicipio="15790";
        break;
	  case "TENZA":
      	codigoMunicipio="15798";
        break;
	  case "TIBANÁ":
      	codigoMunicipio="15804";
        break;
	  case "TIBASOSA":
      	codigoMunicipio="15806";
        break;
	  case "TINJACÁ":
      	codigoMunicipio="15808";
        break;
	  case "TIPACOQUE":
      	codigoMunicipio="15810";
        break;
	  case "TOCA":
      	codigoMunicipio="15814";
        break;
	  case "TOGÜÍ":
      	codigoMunicipio="15816";
        break;
	  case "TÓPAGA":
      	codigoMunicipio="15820";
        break;
	  case "TOTA":
      	codigoMunicipio="15822";
        break;
	  case "TUNUNGUÁ":
      	codigoMunicipio="15832";
        break;
	  case "TURMEQUÉ":
      	codigoMunicipio="15835";
        break;
	  case "TUTA":
      	codigoMunicipio="15837";
        break;
	  case "TUTAZÁ":
      	codigoMunicipio="15839";
        break;
	  case "ÚMBITA":
      	codigoMunicipio="15842";
        break;
	  case "VENTAQUEMADA":
      	codigoMunicipio="15861";
        break;
	  case "VIRACACHÁ":
      	codigoMunicipio="15879";
        break;
	  case "ZETAQUIRA":
      	codigoMunicipio="15897";
        break;
	  case "MANIZALES":
      	codigoMunicipio="17001";
        break;
	  case "AGUADAS":
      	codigoMunicipio="17013";
        break;
	  case "ANSERMA":
      	codigoMunicipio="17042";
        break;
	  case "ARANZAZU":
      	codigoMunicipio="17050";
        break;
	  case "BELALCÁZAR":
      	codigoMunicipio="17088";
        break;
	  case "CHINCHINÁ":
      	codigoMunicipio="17174";
        break;
	  case "FILADELFIA":
      	codigoMunicipio="17272";
        break;
	  case "LA DORADA":
      	codigoMunicipio="17380";
        break;
	  case "LA MERCED":
      	codigoMunicipio="17388";
        break;
	  case "MANZANARES":
      	codigoMunicipio="17433";
        break;
	  case "MARMATO":
      	codigoMunicipio="17442";
        break;
	  case "MARQUETALIA":
      	codigoMunicipio="17444";
        break;
	  case "MARULANDA":
      	codigoMunicipio="17446";
        break;
	  case "NEIRA":
      	codigoMunicipio="17486";
        break;
	  case "NORCASIA":
      	codigoMunicipio="17495";
        break;
	  case "PÁCORA":
      	codigoMunicipio="17513";
        break;
	  case "PALESTINA":
      	codigoMunicipio="17524";
        break;
	  case "PENSILVANIA":
      	codigoMunicipio="17541";
        break;
	  case "RIOSUCIO":
      	codigoMunicipio="17614";
        break;
	  case "RISARALDA":
      	codigoMunicipio="17616";
        break;
	  case "SALAMINA":
      	codigoMunicipio="17653";
        break;
	  case "SAMANÁ":
      	codigoMunicipio="17662";
        break;
	  case "SAN JOSÉ":
      	codigoMunicipio="17665";
        break;
	  case "SUPÍA":
      	codigoMunicipio="17777";
        break;
	  case "VICTORIA":
      	codigoMunicipio="17867";
        break;
	  case "VILLAMARÍA":
      	codigoMunicipio="17873";
        break;
	  case "VITERBO":
      	codigoMunicipio="17877";
        break;
	  case "FLORENCIA":
      	codigoMunicipio="18001";
        break;
	  case "ALBANIA":
      	codigoMunicipio="18029";
        break;
	  case "BELÉN DE LOS ANDAQUÍES":
      	codigoMunicipio="18094";
        break;
	  case "CARTAGENA DEL CHAIRÁ":
      	codigoMunicipio="18150";
        break;
	  case "CURILLO":
      	codigoMunicipio="18205";
        break;
	  case "EL DONCELLO":
      	codigoMunicipio="18247";
        break;
	  case "EL PAUJÍL":
      	codigoMunicipio="18256";
        break;
	  case "LA MONTAÑITA":
      	codigoMunicipio="18410";
        break;
	  case "MILÁN":
      	codigoMunicipio="18460";
        break;
	  case "MORELIA":
      	codigoMunicipio="18479";
        break;
	  case "PUERTO RICO":
      	codigoMunicipio="18592";
        break;
	  case "SAN JOSÉ DEL FRAGUA":
      	codigoMunicipio="18610";
      	break;
	  case "SAN VICENTE DEL CAGUÁN":
      	codigoMunicipio="18753";
        break;
	  case "SOLANO":
      	codigoMunicipio="18756";
        break;
	  case "SOLITA":
      	codigoMunicipio="18785";
        break;
	  case "VALPARAÍSO":
      	codigoMunicipio="18860";
        break;
	  case "POPAYÁN":
      	codigoMunicipio="19001";
        break;
	  case "ALMAGUER":
      	codigoMunicipio="19022";
        break;
	  case "ARGELIA":
      	codigoMunicipio="19050";
        break;
	  case "BALBOA":
      	codigoMunicipio="19075";
        break;
	  case "BOLÍVAR":
      	codigoMunicipio="19100";
        break;
	  case "BUENOS AIRES":
      	codigoMunicipio="19110";
        break;
	  case "CAJIBÍO":
      	codigoMunicipio="19130";
        break;
	  case "CALDONO":
      	codigoMunicipio="19137";
        break;
	  case "CALOTO":
      	codigoMunicipio="19142";
        break;
	  case "CORINTO":
      	codigoMunicipio="19212";
        break;
	  case "EL TAMBO":
      	codigoMunicipio="19256";
        break;
	  case "FLORENCIA":
      	codigoMunicipio="19290";
        break;
	  case "GUACHENÉ":
      	codigoMunicipio="19300";
        break;
	  case "GUAPÍ":
      	codigoMunicipio="19318";
        break;
	  case "INZÁ":
      	codigoMunicipio="19355";
        break;
	  case "JAMBALÓ":
      	codigoMunicipio="19364";
        break;
	  case "LA SIERRA":
      	codigoMunicipio="19392";
        break;
	  case "LA VEGA":
      	codigoMunicipio="19397";
        break;
	  case "LÓPEZ DE MICAY":
      	codigoMunicipio="19418";
        break;
	  case "MERCADERES":
      	codigoMunicipio="19450";
        break;
	  case "MIRANDA":
      	codigoMunicipio="19455";
        break;
	  case "MORALES":
      	codigoMunicipio="19473";
        break;
	  case "PADILLA":
      	codigoMunicipio="19513";
        break;
	  case "PÁEZ":
      	codigoMunicipio="19517";
        break;
	  case "PATÍA":
      	codigoMunicipio="19532";
        break;
	  case "PIAMONTE":
      	codigoMunicipio="19533";
        break;
	  case "PIENDAMÓ – TUNÍA":
      	codigoMunicipio="19548";
        break;
	  case "PUERTO TEJADA":
      	codigoMunicipio="19573";
        break;
	  case "PURACÉ":
      	codigoMunicipio="19585";
        break;
	  case "ROSAS":
      	codigoMunicipio="19622";
        break;
	  case "SAN SEBASTIÁN":
      	codigoMunicipio="19693";
        break;
	  case "SANTANDER DE QUILICHAO":
      	codigoMunicipio="19698";
        break;
	  case "SANTA ROSA":
      	codigoMunicipio="19701";
        break;
	  case "SILVIA":
      	codigoMunicipio="19743";
        break;
	  case "SOTARA":
      	codigoMunicipio="19760";
        break;
	  case "SUÁREZ":
      	codigoMunicipio="19780";
        break;
	  case "SUCRE":
      	codigoMunicipio="19785";
        break;
	  case "TIMBÍO":
      	codigoMunicipio="19807";
        break;
	  case "TIMBIQUÍ":
      	codigoMunicipio="19809";
        break;
	  case "TORIBÍO":
      	codigoMunicipio="19821";
        break;
	  case "TOTORÓ":
      	codigoMunicipio="19824";
        break;
	  case "VILLA RICA":
      	codigoMunicipio="19845";
        break;
	  case "VALLEDUPAR":
      	codigoMunicipio="20001";
        break;
	  case "AGUACHICA":
      	codigoMunicipio="20011";
        break;
	  case "AGUSTÍN CODAZZI":
      	codigoMunicipio="20013";
        break;
	  case "ASTREA":
      	codigoMunicipio="20032";
        break;
	  case "BECERRIL":
      	codigoMunicipio="20045";
        break;
	  case "BOSCONIA":
      	codigoMunicipio="20060";
        break;
	  case "CHIMICHAGUA":
      	codigoMunicipio="20175";
        break;
	  case "CHIRIGUANÁ":
      	codigoMunicipio="20178";
        break;
	  case "CURUMANÍ":
      	codigoMunicipio="20228";
        break;
	  case "EL COPEY":
      	codigoMunicipio="20238";
        break;
	  case "EL PASO":
      	codigoMunicipio="20250";
        break;
	  case "GAMARRA":
      	codigoMunicipio="20295";
        break;
	  case "GONZÁLEZ":
      	codigoMunicipio="20310";
        break;
	  case "LA GLORIA":
      	codigoMunicipio="20383";
        break;
	  case "LA JAGUA DE IBIRICO":
      	codigoMunicipio="20400";
        break;
	  case "MANAURE BALCÓN DEL CESAR":
      	codigoMunicipio="20443";
        break;
	  case "PAILITAS":
      	codigoMunicipio="20517";
        break;
	  case "PELAYA":
      	codigoMunicipio="20550";
        break;
	  case "PUEBLO BELLO":
      	codigoMunicipio="20570";
        break;
	  case "RÍO DE ORO":
      	codigoMunicipio="20614";
        break;
	  case "LA PAZ":
      	codigoMunicipio="20621";
        break;
	  case "SAN ALBERTO":
      	codigoMunicipio="20710";
        break;
	  case "SAN DIEGO":
      	codigoMunicipio="20750";
        break;
	  case "SAN MARTÍN":
      	codigoMunicipio="20770";
        break;
	  case "TAMALAMEQUE":
      	codigoMunicipio="20787";
        break;
	  case "MONTERÍA":
      	codigoMunicipio="23001";
        break;
	  case "AYAPEL":
      	codigoMunicipio="23068";
        break;
	  case "BUENAVISTA":
      	codigoMunicipio="23079";
        break;
	  case "CANALETE":
      	codigoMunicipio="23090";
        break;
	  case "CERETÉ":
      	codigoMunicipio="23162";
        break;
	  case "CHIMÁ":
      	codigoMunicipio="23168";
        break;
	  case "CHINÚ":
      	codigoMunicipio="23182";
        break;
	  case "CIÉNAGA DE ORO":
      	codigoMunicipio="23189";
        break;
	  case "COTORRA":
      	codigoMunicipio="23300";
        break;
	  case "LA APARTADA":
      	codigoMunicipio="23350";
        break;
	  case "LORICA":
      	codigoMunicipio="23417";
        break;
	  case "LOS CÓRDOBAS":
      	codigoMunicipio="23419";
        break;
	  case "MOMIL":
      	codigoMunicipio="23464";
        break;
	  case "MONTELÍBANO":
      	codigoMunicipio="23466";
        break;
	  case "MOÑITOS":
      	codigoMunicipio="23500";
        break;
	  case "PLANETA RICA":
      	codigoMunicipio="23555";
        break;
	  case "PUEBLO NUEVO":
      	codigoMunicipio="23570";
        break;
	  case "PUERTO ESCONDIDO":
      	codigoMunicipio="23574";
        break;
	  case "PUERTO LIBERTADOR":
      	codigoMunicipio="23580";
        break;
	  case "PURÍSIMA DE LA CONCEPCIÓN":
      	codigoMunicipio="23586";
        break;
	  case "SAHAGÚN":
      	codigoMunicipio="23660";
        break;
	  case "SAN ANDRÉS DE SOTAVENTO":
      	codigoMunicipio="23670";
        break;
	  case "SAN ANTERO":
      	codigoMunicipio="23672";
        break;
	  case "SAN BERNARDO DEL VIENTO":
      	codigoMunicipio="23675";
        break;
	  case "SAN CARLOS":
      	codigoMunicipio="23678";
        break;
	  case "SAN JOSÉ DE URÉ":
      	codigoMunicipio="23682";
        break;
	  case "SAN PELAYO":
      	codigoMunicipio="23686";
        break;
	  case "TIERRALTA":
      	codigoMunicipio="23807";
        break;
	  case "TUCHÍN":
      	codigoMunicipio="23815";
        break;
	  case "VALENCIA":
      	codigoMunicipio="23855";
        break;
	  case "AGUA DE DIOS":
      	codigoMunicipio="25001";
        break;
	  case "ALBÁN":
      	codigoMunicipio="25019";
        break;
	  case "ANAPOIMA":
      	codigoMunicipio="25035";
        break;
	  case "ANOLAIMA":
      	codigoMunicipio="25040";
        break;
	  case "ARBELÁEZ":
      	codigoMunicipio="25053";
        break;
	  case "BELTRÁN":
      	codigoMunicipio="25086";
        break;
	  case "BITUIMA":
      	codigoMunicipio="25095";
        break;
	  case "BOJACÁ":
      	codigoMunicipio="25099";
        break;
	  case "CABRERA":
      	codigoMunicipio="25120";
        break;
	  case "CACHIPAY":
      	codigoMunicipio="25123";
        break;
	  case "CAJICÁ":
      	codigoMunicipio="25126";
        break;
	  case "CAPARRAPÍ":
      	codigoMunicipio="25148";
        break;
	  case "CÁQUEZA":
      	codigoMunicipio="25151";
        break;
	  case "CARMEN DE CARUPA":
      	codigoMunicipio="25154";
        break;
	  case "CHAGUANÍ":
      	codigoMunicipio="25168";
        break;
	  case "CHÍA":
      	codigoMunicipio="25175";
        break;
	  case "CHIPAQUE":
      	codigoMunicipio="25178";
        break;
	  case "CHOACHÍ":
      	codigoMunicipio="25181";
        break;
	  case "CHOCONTÁ":
      	codigoMunicipio="25183";
        break;
	  case "COGUA":
      	codigoMunicipio="25200";
        break;
	  case "COTA":
      	codigoMunicipio="25214";
        break;
	  case "CUCUNUBÁ":
      	codigoMunicipio="25224";
        break;
	  case "EL COLEGIO":
      	codigoMunicipio="25245";
        break;
	  case "EL PEÑÓN":
      	codigoMunicipio="25258";
        break;
	  case "EL ROSAL":
      	codigoMunicipio="25260";
        break;
	  case "FACATATIVÁ":
      	codigoMunicipio="25269";
        break;
	  case "FÓMEQUE":
      	codigoMunicipio="25279";
        break;
	  case "FOSCA":
      	codigoMunicipio="25281";
        break;
	  case "FUNZA":
      	codigoMunicipio="25286";
        break;
	  case "FÚQUENE":
      	codigoMunicipio="25288";
        break;
	  case "FUSAGASUGÁ":
      	codigoMunicipio="25290";
        break;
	  case "GACHALÁ":
      	codigoMunicipio="25293";
        break;
	  case "GACHANCIPÁ":
      	codigoMunicipio="25295";
        break;
	  case "GACHETÁ":
      	codigoMunicipio="25297";
        break;
	  case "GAMA":
      	codigoMunicipio="25299";
        break;
	  case "GIRARDOT":
      	codigoMunicipio="25307";
        break;
	  case "GRANADA":
      	codigoMunicipio="25312";
        break;
	  case "GUACHETÁ":
      	codigoMunicipio="25317";
        break;
	  case "GUADUAS":
      	codigoMunicipio="25320";
        break;
	  case "GUASCA":
      	codigoMunicipio="25322";
        break;
	  case "GUATAQUÍ":
      	codigoMunicipio="25324";
        break;
	  case "GUATAVITA":
      	codigoMunicipio="25326";
        break;
	  case "GUAYABAL DE SÍQUIMA":
      	codigoMunicipio="25328";
        break;
	  case "GUAYABETAL":
      	codigoMunicipio="25335";
        break;
	  case "GUTIÉRREZ":
      	codigoMunicipio="25339";
        break;
	  case "JERUSALÉN":
      	codigoMunicipio="25368";
        break;
	  case "JUNÍN":
      	codigoMunicipio="25372";
        break;
	  case "LA CALERA":
      	codigoMunicipio="25377";
        break;
	  case "LA MESA":
      	codigoMunicipio="25386";
        break;
	  case "LA PALMA":
      	codigoMunicipio="25394";
        break;
	  case "LA PEÑA":
      	codigoMunicipio="25398";
        break;
	  case "LA VEGA":
      	codigoMunicipio="25402";
        break;
	  case "LENGUAZAQUE":
      	codigoMunicipio="25407";
        break;
	  case "MACHETÁ":
      	codigoMunicipio="25426";
        break;
	  case "MADRID":
      	codigoMunicipio="25430";
        break;
	  case "MANTA":
      	codigoMunicipio="25436";
        break;
	  case "MEDINA":
      	codigoMunicipio="25438";
        break;
	  case "MOSQUERA":
      	codigoMunicipio="25473";
        break;
	  case "NARIÑO":
      	codigoMunicipio="25483";
        break;
	  case "NEMOCÓN":
      	codigoMunicipio="25486";
        break;
	  case "NILO":
      	codigoMunicipio="25488";
        break;
	  case "NIMAIMA":
      	codigoMunicipio="25489";
        break;
	  case "NOCAIMA":
      	codigoMunicipio="25491";
        break;
	  case "VENECIA":
      	codigoMunicipio="25506";
        break;
	  case "PACHO":
      	codigoMunicipio="25513";
        break;
	  case "PAIME":
      	codigoMunicipio="25518";
        break;
	  case "PANDI":
      	codigoMunicipio="25524";
        break;
	  case "PARATEBUENO":
      	codigoMunicipio="25530";
        break;
	  case "PASCA":
      	codigoMunicipio="25535";
        break;
	  case "PUERTO SALGAR":
      	codigoMunicipio="25572";
        break;
	  case "PULÍ":
      	codigoMunicipio="25580";
        break;
	  case "QUEBRADANEGRA":
      	codigoMunicipio="25592";
        break;
	  case "QUETAME":
      	codigoMunicipio="25594";
        break;
	  case "QUIPILE":
      	codigoMunicipio="25596";
        break;
	  case "APULO":
      	codigoMunicipio="25599";
        break;
	  case "RICAURTE":
      	codigoMunicipio="25612";
        break;
	  case "SAN ANTONIO DEL TEQUENDAMA":
      	codigoMunicipio="25645";
        break;
	  case "SAN BERNARDO":
      	codigoMunicipio="25649";
        break;
	  case "SAN CAYETANO":
      	codigoMunicipio="25653";
        break;
	  case "SAN FRANCISCO":
      	codigoMunicipio="25658";
        break;
	  case "SAN JUAN DE RIOSECO":
      	codigoMunicipio="25662";
        break;
	  case "SASAIMA":
      	codigoMunicipio="25718";
        break;
	  case "SESQUILÉ":
      	codigoMunicipio="25736";
        break;
	  case "SIBATÉ":
      	codigoMunicipio="25740";
        break;
	  case "SILVANIA":
      	codigoMunicipio="25743";
        break;
	  case "SIMIJACA":
      	codigoMunicipio="25745";
        break;
	  case "SOACHA":
      	codigoMunicipio="25754";
        break;
	  case "SOPÓ":
      	codigoMunicipio="25758";
        break;
	  case "SUBACHOQUE":
      	codigoMunicipio="25769";
        break;
	  case "SUESCA":
      	codigoMunicipio="25772";
        break;
	  case "SUPATÁ":
      	codigoMunicipio="25777";
        break;
	  case "SUSA":
      	codigoMunicipio="25779";
        break;
	  case "SUTATAUSA":
      	codigoMunicipio="25781";
        break;
	  case "TABIO":
      	codigoMunicipio="25785";
        break;
	  case "TAUSA":
      	codigoMunicipio="25793";
        break;
	  case "TENA":
      	codigoMunicipio="25797";
        break;
	  case "TENJO":
      	codigoMunicipio="25799";
        break;
	  case "TIBACUY":
      	codigoMunicipio="25805";
        break;
	  case "TIBIRITA":
      	codigoMunicipio="25807";
        break;
	  case "TOCAIMA":
      	codigoMunicipio="25815";
        break;
	  case "TOCANCIPÁ":
      	codigoMunicipio="25817";
        break;
	  case "TOPAIPÍ":
      	codigoMunicipio="25823";
        break;
	  case "UBALÁ":
      	codigoMunicipio="25839";
        break;
	  case "UBAQUE":
      	codigoMunicipio="25841";
        break;
	  case "VILLA DE SAN DIEGO DE UBATÉ":
      	codigoMunicipio="25843";
        break;
	  case "UNE":
      	codigoMunicipio="25845";
        break;
	  case "ÚTICA":
      	codigoMunicipio="25851";
        break;
	  case "VERGARA":
      	codigoMunicipio="25862";
        break;
	  case "VIANÍ":
      	codigoMunicipio="25867";
        break;
	  case "VILLAGÓMEZ":
      	codigoMunicipio="25871";
        break;
	  case "VILLAPINZÓN":
      	codigoMunicipio="25873";
        break;
	  case "VILLETA":
      	codigoMunicipio="25875";
        break;
	  case "VIOTÁ":
      	codigoMunicipio="25878";
        break;
	  case "YACOPÍ":
      	codigoMunicipio="25885";
        break;
	  case "ZIPACÓN":
      	codigoMunicipio="25898";
        break;
	  case "ZIPAQUIRÁ":
      	codigoMunicipio="25899";
        break;
	  case "QUIBDÓ":
      	codigoMunicipio="27001";
        break;
	  case "ACANDÍ":
      	codigoMunicipio="27006";
        break;
	  case "ALTO BAUDÓ":
      	codigoMunicipio="27025";
        break;
	  case "ATRATO":
      	codigoMunicipio="27050";
        break;
	  case "BAGADÓ":
      	codigoMunicipio="27073";
        break;
	  case "BAHÍA SOLANO":
      	codigoMunicipio="27075";
        break;
	  case "BAJO BAUDÓ":
      	codigoMunicipio="27077";
        break;
	  case "BOJAYÁ":
      	codigoMunicipio="27099";
        break;
	  case "EL CANTÓN DEL SAN PABLO":
      	codigoMunicipio="27135";
        break;
	  case "CARMEN DEL DARIÉN":
      	codigoMunicipio="27150";
        break;
	  case "CÉRTEGUI":
      	codigoMunicipio="27160";
        break;
	  case "CONDOTO":
      	codigoMunicipio="27205";
        break;
	  case "EL CARMEN DE ATRATO":
      	codigoMunicipio="27245";
        break;
	  case "EL LITORAL DEL SAN JUAN":
      	codigoMunicipio="27250";
        break;
	  case "ISTMINA":
      	codigoMunicipio="27361";
        break;
	  case "JURADÓ":
      	codigoMunicipio="27372";
        break;
	  case "LLORÓ":
      	codigoMunicipio="27413";
        break;
	  case "MEDIO ATRATO":
      	codigoMunicipio="27425";
        break;
	  case "MEDIO BAUDÓ":
      	codigoMunicipio="27430";
        break;
    case "MEDIO SAN JUAN":
       	codigoMunicipio="27450";
        break;
	  case "NÓVITA":
      	codigoMunicipio="27491";
        break;
	  case "NUQUÍ":
      	codigoMunicipio="27495";
        break;
	  case "RÍO IRÓ":
      	codigoMunicipio="27580";
        break;
	  case "RÍO QUITO":
      	codigoMunicipio="27600";
        break;
	  case "RIOSUCIO":
      	codigoMunicipio="27615";
        break;
	  case "SAN JOSÉ DEL PALMAR":
      	codigoMunicipio="27660";
        break;
	  case "SIPÍ":
      	codigoMunicipio="27745";
        break;
	  case "TADÓ":
      	codigoMunicipio="27787";
        break;
	  case "UNGUÍA":
      	codigoMunicipio="27800";
        break;
	  case "UNIÓN PANAMERICANA":
      	codigoMunicipio="27810";
        break;
	  case "NEIVA":
      	codigoMunicipio="41001";
        break;
	  case "ACEVEDO":
      	codigoMunicipio="41006";
        break;
	  case "AGRADO":
      	codigoMunicipio="41013";
        break;
	  case "AIPE":
      	codigoMunicipio="41016";
        break;
	  case "ALGECIRAS":
      	codigoMunicipio="41020";
        break;
	  case "ALTAMIRA":
      	codigoMunicipio="41026";
      	break;
	  case "BARAYA":
      	codigoMunicipio="41078";
        break;
	  case "CAMPOALEGRE":
      	codigoMunicipio="41132";
        break;
	  case "COLOMBIA":
      	codigoMunicipio="41206";
        break;
	  case "ELÍAS":
      	codigoMunicipio="41244";
        break;
	  case "GARZÓN":
      	codigoMunicipio="41298";
        break;
	  case "GIGANTE":
      	codigoMunicipio="41306";
        break;
	  case "GUADALUPE":
      	codigoMunicipio="41319";
        break;
	  case "HOBO":
      	codigoMunicipio="41349";
        break;
	  case "ÍQUIRA":
      	codigoMunicipio="41357";
        break;
	  case "ISNOS":
      	codigoMunicipio="41359";
        break;
	  case "LA ARGENTINA":
      	codigoMunicipio="41378";
        break;
	  case "LA PLATA":
      	codigoMunicipio="41396";
        break;
	  case "NÁTAGA":
      	codigoMunicipio="41483";
        break;
	  case "OPORAPA":
      	codigoMunicipio="41503";
        break;
	  case "PAICOL":
      	codigoMunicipio="41518";
        break;
	  case "PALERMO":
      	codigoMunicipio="41524";
        break;
	  case "PALESTINA":
      	codigoMunicipio="41530";
        break;
	  case "PITAL":
      	codigoMunicipio="41548";
        break;
	  case "PITALITO":
      	codigoMunicipio="41551";
        break;
	  case "RIVERA":
      	codigoMunicipio="41615";
        break;
	  case "SALADOBLANCO":
      	codigoMunicipio="41660";
        break;
	  case "SAN AGUSTÍN":
      	codigoMunicipio="41668";
        break;
	  case "SANTA MARÍA":
      	codigoMunicipio="41676";
        break;
	  case "SUAZA":
      	codigoMunicipio="41770";
        break;
	  case "TARQUI":
      	codigoMunicipio="41791";
        break;
	  case "TESALIA":
      	codigoMunicipio="41797";
        break;
	  case "TELLO":
      	codigoMunicipio="41799";
        break;
	  case "TERUEL":
      	codigoMunicipio="41801";
        break;
	  case "TIMANÁ":
      	codigoMunicipio="41807";
        break;
	  case "VILLAVIEJA":
      	codigoMunicipio="41872";
        break;
	  case "YAGUARÁ":
      	codigoMunicipio="41885";
        break;
	  case "RIOHACHA":
      	codigoMunicipio="44001";
        break;
	  case "ALBANIA":
      	codigoMunicipio="44035";
        break;
	  case "BARRANCAS":
      	codigoMunicipio="44078";
        break;
	  case "DIBULLA":
      	codigoMunicipio="44090";
        break;
	  case "DISTRACCIÓN":
      	codigoMunicipio="44098";
        break;
	  case "EL MOLINO":
      	codigoMunicipio="44110";
        break;
	  case "FONSECA":
      	codigoMunicipio="44279";
        break;
	  case "HATONUEVO":
      	codigoMunicipio="44378";
        break;
	  case "LA JAGUA DEL PILAR":
      	codigoMunicipio="44420";
        break;
	  case "MAICAO":
      	codigoMunicipio="44430";
        break;
	  case "MANAURE":
      	codigoMunicipio="44560";
        break;
	  case "SAN JUAN DEL CESAR":
      	codigoMunicipio="44650";
        break;
	  case "URIBIA":
      	codigoMunicipio="44847";
        break;
	  case "URUMITA":
      	codigoMunicipio="44855";
        break;
	  case "VILLANUEVA":
      	codigoMunicipio="44874";
        break;
	  case "SANTA MARTA":
      	codigoMunicipio="47001";
        break;
	  case "ALGARROBO":
      	codigoMunicipio="47030";
        break;
	  case "ARACATACA":
      	codigoMunicipio="47053";
        break;
	  case "ARIGUANÍ":
      	codigoMunicipio="47058";
        break;
	  case "CERRO DE SAN ANTONIO":
      	codigoMunicipio="47161";
        break;
	  case "CHIVOLO":
      	codigoMunicipio="47170";
        break;
	  case "CIÉNAGA":
      	codigoMunicipio="47189";
        break;
	  case "CONCORDIA":
      	codigoMunicipio="47205";
        break;
	  case "EL BANCO":
      	codigoMunicipio="47245";
        break;
	  case "EL PIÑÓN":
      	codigoMunicipio="47258";
        break;
	  case "EL RETÉN":
      	codigoMunicipio="47268";
        break;
	  case "FUNDACIÓN":
      	codigoMunicipio="47288";
        break;
	  case "GUAMAL":
      	codigoMunicipio="47318";
        break;
	  case "NUEVA GRANADA":
      	codigoMunicipio="47460";
        break;
	  case "PEDRAZA":
      	codigoMunicipio="47541";
        break;
	  case "PIJIÑO DEL CARMEN":
      	codigoMunicipio="47545";
        break;
	  case "PIVIJAY":
      	codigoMunicipio="47551";
        break;
	  case "PLATO":
      	codigoMunicipio="47555";
        break;
	  case "PUEBLOVIEJO":
      	codigoMunicipio="47570";
        break;
	  case "REMOLINO":
      	codigoMunicipio="47605";
        break;
	  case "SABANAS DE SAN ÁNGEL":
      	codigoMunicipio="47660";
        break;
	  case "SALAMINA":
      	codigoMunicipio="47675";
        break;
	  case "SAN SEBASTIÁN DE BUENAVISTA":
      	codigoMunicipio="47692";
        break;
	  case "SAN ZENÓN":
      	codigoMunicipio="47703";
        break;
	  case "SANTA ANA":
      	codigoMunicipio="47707";
        break;
	  case "SANTA BÁRBARA DE PINTO":
      	codigoMunicipio="47720";
        break;
    case "SITIONUEVO":
          codigoMunicipio="47745";
          break;
    case "TENERIFE":
          codigoMunicipio="47798";
          break;
    case "ZAPAYÁN":
          codigoMunicipio="47960";
          break;
    case "ZONA BANANERA":
          codigoMunicipio="47980";
          break;
    case "VILLAVICENCIO":
          codigoMunicipio="50001";
          break;
    case "ACACÍAS":
          codigoMunicipio="50006";
          break;
    case "BARRANCA DE UPÍA":
          codigoMunicipio="50110";
          break;
    case "CABUYARO":
          codigoMunicipio="50124";
          break;
    case "CASTILLA LA NUEVA":
          codigoMunicipio="50150";
          break;
    case "CUBARRAL":
          codigoMunicipio="50223";
          break;
    case "CUMARAL":
          codigoMunicipio="50226";
          break;
    case "EL CALVARIO":
          codigoMunicipio="50245";
          break;
    case "EL CASTILLO":
          codigoMunicipio="50251";
          break;
    case "EL DORADO":
          codigoMunicipio="50270";
          break;
    case "FUENTEDEORO":
          codigoMunicipio="50287";
          break;
    case "GRANADA":
          codigoMunicipio="50313";
          break;
    case "GUAMAL":
          codigoMunicipio="50318";
          break;
    case "MAPIRIPÁN":
          codigoMunicipio="50325";
          break;
    case "MESETAS":
          codigoMunicipio="50330";
          break;
    case "LA MACARENA":
          codigoMunicipio="50350";
          break;
    case "URIBE":
          codigoMunicipio="50370";
          break;
    case "LEJANÍAS":
          codigoMunicipio="50400";
          break;
    case "PUERTO CONCORDIA":
          codigoMunicipio="50450";
          break;
    case "PUERTO GAITÁN":
          codigoMunicipio="50568";
          break;
    case "PUERTO LÓPEZ":
          codigoMunicipio="50573";
          break;
    case "PUERTO LLERAS":
          codigoMunicipio="50577";
          break;
    case "PUERTO RICO":
          codigoMunicipio="50590";
          break;
    case "RESTREPO":
          codigoMunicipio="50606";
          break;
    case "SAN CARLOS DE GUAROA":
          codigoMunicipio="50680";
          break;
    case "SAN JUAN DE ARAMA":
          codigoMunicipio="50683";
          break;
    case "SAN JUANITO":
          codigoMunicipio="50686";
          break;
    case "SAN MARTÍN":
          codigoMunicipio="50689";
          break;
    case "VISTAHERMOSA":
          codigoMunicipio="50711";
          break;
    case "PASTO":
          codigoMunicipio="52001";
          break;
    case "ALBÁN":
          codigoMunicipio="52019";
          break;
    case "ALDANA":
          codigoMunicipio="52022";
          break;
    case "ANCUYÁ":
          codigoMunicipio="52036";
          break;
    case "ARBOLEDA":
          codigoMunicipio="52051";
          break;
    case "BARBACOAS":
          codigoMunicipio="52079";
          break;
    case "BELÉN":
          codigoMunicipio="52083";
          break;
    case "BUESACO":
          codigoMunicipio="52110";
          break;
    case "COLÓN":
          codigoMunicipio="52203";
          break;
    case "CONSACÁ":
          codigoMunicipio="52207";
          break;
    case "CONTADERO":
          codigoMunicipio="52210";
          break;
    case "CÓRDOBA":
          codigoMunicipio="52215";
          break;
    case "CUASPÚD":
          codigoMunicipio="52224";
          break;
    case "CUMBAL":
          codigoMunicipio="52227";
          break;
    case "CUMBITARA":
          codigoMunicipio="52233";
          break;
    case "CHACHAGÜÍ":
          codigoMunicipio="52240";
          break;
    case "EL CHARCO":
          codigoMunicipio="52250";
          break;
    case "EL PEÑOL":
          codigoMunicipio="52254";
          break;
    case "EL ROSARIO":
          codigoMunicipio="52256";
          break;
    case "EL TABLÓN DE GÓMEZ":
          codigoMunicipio="52258";
          break;
    case "EL TAMBO":
          codigoMunicipio="52260";
          break;
    case "FUNES":
          codigoMunicipio="52287";
          break;
    case "GUACHUCAL":
          codigoMunicipio="52317";
          break;
    case "GUAITARILLA":
          codigoMunicipio="52320";
          break;
    case "GUALMATÁN":
          codigoMunicipio="52323";
          break;
    case "ILES":
          codigoMunicipio="52352";
          break;
    case "IMUÉS":
          codigoMunicipio="52354";
          break;
    case "IPIALES":
          codigoMunicipio="52356";
          break;
    case "LA CRUZ":
          codigoMunicipio="52378";
          break;
    case "LA FLORIDA":
          codigoMunicipio="52381";
          break;
    case "LA LLANADA":
          codigoMunicipio="52385";
          break;
    case "LA TOLA":
          codigoMunicipio="52390";
          break;
    case "LA UNIÓN":
          codigoMunicipio="52399";
          break;
    case "LEIVA":
          codigoMunicipio="52405";
          break;
    case "LINARES":
          codigoMunicipio="52411";
          break;
    case "LOS ANDES":
          codigoMunicipio="52418";
          break;
    case "MAGÜÍ":
          codigoMunicipio="52427";
          break;
    case "MALLAMA":
          codigoMunicipio="52435";
          break;
    case "MOSQUERA":
          codigoMunicipio="52473";
          break;
    case "NARIÑO":
          codigoMunicipio="52480";
          break;
    case "OLAYA HERRERA":
          codigoMunicipio="52490";
          break;
    case "OSPINA":
          codigoMunicipio="52506";
          break;
    case "FRANCISCO PIZARRO":
          codigoMunicipio="52520";
          break;
      case "POLICARPA":
          codigoMunicipio="52540";
          break;
      case "POTOSÍ":
          codigoMunicipio="52560";
          break;
      case "PROVIDENCIA":
          codigoMunicipio="52565";
          break;
      case "PUERRES":
          codigoMunicipio="52573";
          break;
      case "PUPIALES":
          codigoMunicipio="52585";
          break;
      case "RICAURTE":
          codigoMunicipio="52612";
          break;
      case "ROBERTO PAYÁN":
          codigoMunicipio="52621";
          break;
      case "SAMANIEGO":
          codigoMunicipio="52678";
          break;
      case "SANDONÁ":
          codigoMunicipio="52683";
          break;
      case "SAN BERNARDO":
          codigoMunicipio="52685";
          break;
      case "SAN LORENZO":
          codigoMunicipio="52687";
          break;
      case "SAN PABLO":
          codigoMunicipio="52693";
          break;
      case "SAN PEDRO DE CARTAGO":
          codigoMunicipio="52694";
          break;
      case "SANTA BÁRBARA":
          codigoMunicipio="52696";
          break;
      case "SANTACRUZ":
          codigoMunicipio="52699";
          break;
      case "SAPUYES":
          codigoMunicipio="52720";
          break;
      case "TAMINANGO":
          codigoMunicipio="52786";
          break;
      case "TANGUA":
          codigoMunicipio="52788";
          break;
      case "SAN ANDRÉS DE TUMACO":
          codigoMunicipio="52835";
          break;
      case "TÚQUERRES":
          codigoMunicipio="52838";
          break;
      case "YACUANQUER":
          codigoMunicipio="52885";
          break;
      case "CÚCUTA":
          codigoMunicipio="54001";
          break;
      case "ÁBREGO":
          codigoMunicipio="54003";
          break;
      case "ARBOLEDAS":
          codigoMunicipio="54051";
          break;
      case "BOCHALEMA":
          codigoMunicipio="54099";
          break;
      case "BUCARASICA":
          codigoMunicipio="54109";
          break;
      case "CÁCOTA":
          codigoMunicipio="54125";
          break;
      case "CÁCHIRA":
          codigoMunicipio="54128";
          break;
      case "CHINÁCOTA":
          codigoMunicipio="54172";
          break;
      case "CHITAGÁ":
          codigoMunicipio="54174";
          break;
      case "CONVENCIÓN":
          codigoMunicipio="54206";
          break;
      case "CUCUTILLA":
          codigoMunicipio="54223";
          break;
      case "DURANIA":
          codigoMunicipio="54239";
          break;
      case "EL CARMEN":
          codigoMunicipio="54245";
          break;
      case "EL TARRA":
          codigoMunicipio="54250";
          break;
      case "EL ZULIA":
          codigoMunicipio="54261";
          break;
      case "GRAMALOTE":
          codigoMunicipio="54313";
          break;
      case "HACARÍ":
          codigoMunicipio="54344";
          break;
      case "HERRÁN":
          codigoMunicipio="54347";
          break;
      case "LABATECA":
          codigoMunicipio="54377";
          break;
      case "LA ESPERANZA":
          codigoMunicipio="54385";
          break;
      case "LA PLAYA":
          codigoMunicipio="54398";
          break;
      case "LOS PATIOS":
          codigoMunicipio="54405";
          break;
      case "LOURDES":
          codigoMunicipio="54418";
          break;
      case "MUTISCUA":
          codigoMunicipio="54480";
          break;
      case "OCAÑA":
          codigoMunicipio="54498";
          break;
      case "PAMPLONA":
          codigoMunicipio="54518";
          break;
      case "PAMPLONITA":
          codigoMunicipio="54520";
          break;
      case "PUERTO SANTANDER":
          codigoMunicipio="54553";
          break;
      case "RAGONVALIA":
          codigoMunicipio="54599";
          break;
      case "SALAZAR":
          codigoMunicipio="54660";
          break;
      case "SAN CALIXTO":
          codigoMunicipio="54670";
          break;
      case "SAN CAYETANO":
          codigoMunicipio="54673";
          break;
      case "SANTIAGO":
          codigoMunicipio="54680";
          break;
      case "SARDINATA":
          codigoMunicipio="54720";
          break;
      case "SILOS":
          codigoMunicipio="54743";
          break;
      case "TEORAMA":
          codigoMunicipio="54800";
          break;
      case "TIBÚ":
          codigoMunicipio="54810";
          break;
      case "TOLEDO":
          codigoMunicipio="54820";
          break;
      case "VILLA CARO":
          codigoMunicipio="54871";
          break;
      case "VILLA DEL ROSARIO":
          codigoMunicipio="54874";
          break;
      case "ARMENIA":
          codigoMunicipio="63001";
          break;
      case "BUENAVISTA":
          codigoMunicipio="63111";
          break;
      case "CALARCÁ":
          codigoMunicipio="63130";
          break;
      case "CIRCASIA":
          codigoMunicipio="63190";
          break;
      case "CÓRDOBA":
          codigoMunicipio="63212";
          break;
      case "FILANDIA":
          codigoMunicipio="63272";
          break;
      case "GÉNOVA":
          codigoMunicipio="63302";
          break;
      case "LA TEBAIDA":
          codigoMunicipio="63401";
          break;
      case "MONTENEGRO":
          codigoMunicipio="63470";
          break;
      case "PIJAO":
          codigoMunicipio="63548";
          break;
      case "QUIMBAYA":
          codigoMunicipio="63594";
          break;
      case "SALENTO":
          codigoMunicipio="63690";
          break;
      case "PEREIRA":
          codigoMunicipio="66001";
          break;
      case "APÍA":
          codigoMunicipio="66045";
          break;
      case "BALBOA":
          codigoMunicipio="66075";
          break;
      case "BELÉN DE UMBRÍA":
          codigoMunicipio="66088";
          break;
      case "DOSQUEBRADAS":
          codigoMunicipio="66170";
          break;
      case "GUÁTICA":
          codigoMunicipio="66318";
          break;
      case "LA CELIA":
          codigoMunicipio="66383";
          break;
      case "LA VIRGINIA":
          codigoMunicipio="66400";
          break;
      case "MARSELLA":
          codigoMunicipio="66440";
          break;
      case "MISTRATÓ":
          codigoMunicipio="66456";
          break;
      case "PUEBLO RICO":
          codigoMunicipio="66572";
          break;
      case "QUINCHÍA":
          codigoMunicipio="66594";
          break;
      case "SANTA ROSA DE CABAL":
          codigoMunicipio="66682";
          break;
      case "SANTUARIO":
          codigoMunicipio="66687";
          break;
      case "BUCARAMANGA":
          codigoMunicipio="68001";
          break;
      case "AGUADA":
          codigoMunicipio="68013";
          break;
      case "ALBANIA":
          codigoMunicipio="68020";
          break;
      case "ARATOCA":
          codigoMunicipio="68051";
          break;
      case "BARBOSA":
          codigoMunicipio="68077";
          break;
      case "BARICHARA":
          codigoMunicipio="68079";
          break;
      case "BARRANCABERMEJA":
          codigoMunicipio="68081";
          break;
      case "BETULIA":
          codigoMunicipio="68092";
          break;
      case "BOLÍVAR":
          codigoMunicipio="68101";
          break;
      case "CABRERA":
          codigoMunicipio="68121";
          break;
      case "CALIFORNIA":
          codigoMunicipio="68132";
          break;
      case "CAPITANEJO":
          codigoMunicipio="68147";
          break;
      case "CARCASÍ":
          codigoMunicipio="68152";
          break;
      case "CEPITÁ":
          codigoMunicipio="68160";
          break;
      case "CERRITO":
          codigoMunicipio="68162";
          break;
      case "CHARALÁ":
          codigoMunicipio="68167";
          break;
      case "CHARTA":
          codigoMunicipio="68169";
          break;
      case "CHIMA":
          codigoMunicipio="68176";
          break;
      case "CHIPATÁ":
          codigoMunicipio="68179";
          break;
      case "CIMITARRA":
          codigoMunicipio="68190";
          break;
      case "CONCEPCIÓN":
          codigoMunicipio="68207";
          break;
      case "CONFINES":
          codigoMunicipio="68209";
          break;
      case "CONTRATACIÓN":
          codigoMunicipio="68211";
          break;
      case "COROMORO":
          codigoMunicipio="68217";
          break;
      case "CURITÍ":
          codigoMunicipio="68229";
          break;
      case "EL CARMEN DE CHUCURÍ":
          codigoMunicipio="68235";
          break;
      case "EL GUACAMAYO":
          codigoMunicipio="68245";
          break;
      case "EL PEÑÓN":
          codigoMunicipio="68250";
          break;
      case "EL PLAYÓN":
          codigoMunicipio="68255";
          break;
      case "ENCINO":
          codigoMunicipio="68264";
          break;
      case "ENCISO":
          codigoMunicipio="68266";
          break;
      case "FLORIÁN":
          codigoMunicipio="68271";
          break;
      case "FLORIDABLANCA":
          codigoMunicipio="68276";
          break;
      case "GALÁN":
          codigoMunicipio="68296";
          break;
      case "GÁMBITA":
          codigoMunicipio="68298";
          break;
      case "GIRÓN":
          codigoMunicipio="68307";
          break;
      case "GUACA":
          codigoMunicipio="68318";
          break;
      case "GUADALUPE":
          codigoMunicipio="68320";
          break;
      case "GUAPOTÁ":
          codigoMunicipio="68322";
          break;
      case "GUAVATÁ":
          codigoMunicipio="68324";
          break;
      case "GÜEPSA":
          codigoMunicipio="68327";
          break;
      case "HATO":
          codigoMunicipio="68344";
          break;
      case "JESÚS MARÍA":
          codigoMunicipio="68368";
          break;
      case "JORDÁN":
          codigoMunicipio="68370";
          break;
      case "LA BELLEZA":
          codigoMunicipio="68377";
          break;
      case "LANDÁZURI":
          codigoMunicipio="68385";
          break;
      case "LA PAZ":
          codigoMunicipio="68397";
          break;
      case "LEBRIJA":
          codigoMunicipio="68406";
          break;
      case "LOS SANTOS":
          codigoMunicipio="68418";
          break;
      case "MACARAVITA":
          codigoMunicipio="68425";
          break;
      case "MÁLAGA":
          codigoMunicipio="68432";
          break;
      case "MATANZA":
          codigoMunicipio="68444";
          break;
      case "MOGOTES":
          codigoMunicipio="68464";
          break;
      case "MOLAGAVITA":
          codigoMunicipio="68468";
          break;
      case "OCAMONTE":
          codigoMunicipio="68498";
          break;
      case "OIBA":
          codigoMunicipio="68500";
          break;
      case "ONZAGA":
          codigoMunicipio="68502";
          break;
      case "PALMAR":
          codigoMunicipio="68522";
          break;
      case "PALMAS DEL SOCORRO":
          codigoMunicipio="68524";
          break;
      case "PÁRAMO":
          codigoMunicipio="68533";
          break;
      case "PIEDECUESTA":
          codigoMunicipio="68547";
          break;
      case "PINCHOTE":
          codigoMunicipio="68549";
          break;
      case "PUENTE NACIONAL":
          codigoMunicipio="68572";
          break;
      case "PUERTO PARRA":
          codigoMunicipio="68573";
          break;
      case "PUERTO WILCHES":
          codigoMunicipio="68575";
          break;
      case "RIONEGRO":
          codigoMunicipio="68615";
          break;
      case "SABANA DE TORRES":
          codigoMunicipio="68655";
          break;
      case "SAN ANDRÉS":
          codigoMunicipio="68669";
          break;
      case "SAN BENITO":
          codigoMunicipio="68673";
          break;
      case "SAN GIL":
          codigoMunicipio="68679";
          break;
      case "SAN JOAQUÍN":
          codigoMunicipio="68682";
          break;
      case "SAN JOSÉ DE MIRANDA":
          codigoMunicipio="68684";
          break;
      case "SAN MIGUEL":
          codigoMunicipio="68686";
          break;
      case "SAN VICENTE DE CHUCURÍ":
          codigoMunicipio="68689";
          break;
      case "SANTA BÁRBARA":
          codigoMunicipio="68705";
          break;
      case "SANTA HELENA DEL OPÓN":
          codigoMunicipio="68720";
          break;
      case "SIMACOTA":
          codigoMunicipio="68745";
          break;
      case "SOCORRO":
          codigoMunicipio="68755";
          break;
      case "SUAITA":
          codigoMunicipio="68770";
          break;
      case "SUCRE":
          codigoMunicipio="68773";
          break;
      case "SURATÁ":
          codigoMunicipio="68780";
          break;
      case "TONA":
          codigoMunicipio="68820";
          break;
      case "VALLE DE SAN JOSÉ":
          codigoMunicipio="68855";
          break;
      case "VÉLEZ":
          codigoMunicipio="68861";
          break;
      case "VETAS":
          codigoMunicipio="68867";
          break;
      case "VILLANUEVA":
          codigoMunicipio="68872";
          break;
      case "ZAPATOCA":
          codigoMunicipio="68895";
          break;
      case "SINCELEJO":
          codigoMunicipio="70001";
          break;
      case "BUENAVISTA":
          codigoMunicipio="70110";
          break;
      case "CAIMITO":
          codigoMunicipio="70124";
          break;
      case "COLOSÓ":
          codigoMunicipio="70204";
          break;
      case "COROZAL":
          codigoMunicipio="70215";
          break;
      case "COVEÑAS":
          codigoMunicipio="70221";
          break;
      case "CHALÁN":
          codigoMunicipio="70230";
          break;
      case "EL ROBLE":
          codigoMunicipio="70233";
          break;
      case "GALERAS":
          codigoMunicipio="70235";
          break;
      case "GUARANDA":
          codigoMunicipio="70265";
          break;
      case "LA UNIÓN":
          codigoMunicipio="70400";
          break;
      case "LOS PALMITOS":
          codigoMunicipio="70418";
          break;
      case "MAJAGUAL":
          codigoMunicipio="70429";
          break;
      case "MORROA":
          codigoMunicipio="70473";
          break;
      case "OVEJAS":
          codigoMunicipio="70508";
          break;
      case "PALMITO":
          codigoMunicipio="70523";
          break;
      case "SAMPUÉS":
          codigoMunicipio="70670";
          break;
      case "SAN BENITO ABAD":
          codigoMunicipio="70678";
          break;
      case "SAN JUAN DE BETULIA":
          codigoMunicipio="70702";
          break;
      case "SAN MARCOS":
          codigoMunicipio="70708";
          break;
      case "SAN ONOFRE":
          codigoMunicipio="70713";
          break;
      case "SAN PEDRO":
          codigoMunicipio="70717";
          break;
      case "SAN LUIS DE SINCÉ":
          codigoMunicipio="70742";
          break;
      case "SUCRE":
          codigoMunicipio="70771";
          break;
      case "SANTIAGO DE TOLÚ":
          codigoMunicipio="70820";
          break;
      case "TOLÚ VIEJO":
          codigoMunicipio="70823";
          break;
      case "IBAGUÉ":
          codigoMunicipio="73001";
          break;
      case "ALPUJARRA":
          codigoMunicipio="73024";
          break;
      case "ALVARADO":
          codigoMunicipio="73026";
          break;
      case "AMBALEMA":
          codigoMunicipio="73030";
          break;
      case "ANZOÁTEGUI":
          codigoMunicipio="73043";
          break;
      case "ARMERO":
          codigoMunicipio="73055";
          break;
      case "ATACO":
          codigoMunicipio="73067";
          break;
      case "CAJAMARCA":
          codigoMunicipio="73124";
          break;
      case "CARMEN DE APICALÁ":
          codigoMunicipio="73148";
          break;
      case "CASABIANCA":
          codigoMunicipio="73152";
          break;
      case "CHAPARRAL":
          codigoMunicipio="73168";
          break;
      case "COELLO":
          codigoMunicipio="73200";
          break;
      case "COYAIMA":
          codigoMunicipio="73217";
          break;
      case "CUNDAY":
          codigoMunicipio="73226";
          break;
      case "DOLORES":
          codigoMunicipio="73236";
          break;
      case "ESPINAL":
          codigoMunicipio="73268";
          break;
      case "FALAN":
          codigoMunicipio="73270";
          break;
      case "FLANDES":
          codigoMunicipio="73275";
          break;
      case "FRESNO":
          codigoMunicipio="73283";
          break;
      case "GUAMO":
          codigoMunicipio="73319";
          break;
      case "HERVEO":
          codigoMunicipio="73347";
          break;
      case "HONDA":
          codigoMunicipio="73349";
          break;
      case "ICONONZO":
          codigoMunicipio="73352";
          break;
      case "LÉRIDA":
          codigoMunicipio="73408";
          break;
      case "LÍBANO":
          codigoMunicipio="73411";
          break;
      case "SAN SEBASTIÁN DE MARIQUITA":
          codigoMunicipio="73443";
          break;
      case "MELGAR":
          codigoMunicipio="73449";
          break;
      case "MURILLO":
          codigoMunicipio="73461";
          break;
      case "NATAGAIMA":
          codigoMunicipio="73483";
          break;
      case "ORTEGA":
          codigoMunicipio="73504";
          break;
      case "PALOCABILDO":
          codigoMunicipio="73520";
          break;
      case "PIEDRAS":
          codigoMunicipio="73547";
          break;
      case "PLANADAS":
          codigoMunicipio="73555";
          break;
      case "PRADO":
          codigoMunicipio="73563";
          break;
      case "PURIFICACIÓN":
          codigoMunicipio="73585";
          break;
      case "RIOBLANCO":
          codigoMunicipio="73616";
          break;
      case "RONCESVALLES":
          codigoMunicipio="73622";
          break;
      case "ROVIRA":
          codigoMunicipio="73624";
          break;
      case "SALDAÑA":
          codigoMunicipio="73671";
          break;
      case "SAN ANTONIO":
          codigoMunicipio="73675";
          break;
      case "SAN LUIS":
          codigoMunicipio="73678";
          break;
      case "SANTA ISABEL":
          codigoMunicipio="73686";
          break;
      case "SUÁREZ":
          codigoMunicipio="73770";
          break;
      case "VALLE DE SAN JUAN":
          codigoMunicipio="73854";
          break;
      case "VENADILLO":
          codigoMunicipio="73861";
          break;
      case "VILLAHERMOSA":
          codigoMunicipio="73870";
          break;
      case "VILLARRICA":
          codigoMunicipio="73873";
          break;
      case "CALI":
          codigoMunicipio="76001";
          break;
      case "ALCALÁ":
          codigoMunicipio="76020";
          break;
      case "ANDALUCÍA":
          codigoMunicipio="76036";
          break;
      case "ANDALUCÍA":
          codigoMunicipio="76036";
          break;
      case "ANSERMANUEVO":
          codigoMunicipio="76041";
          break;
      case "ARGELIA":
          codigoMunicipio="76054";
          break;
      case "BOLÍVAR":
          codigoMunicipio="76100";
          break;
      case "BUENAVENTURA":
          codigoMunicipio="76109";
          break;
      case "GUADALAJARA DE BUGA":
          codigoMunicipio="76111";
          break;
      case "BUGALAGRANDE":
          codigoMunicipio="76113";
          break;
      case "CAICEDONIA":
          codigoMunicipio="76122";
          break;
      case "CALIMA":
          codigoMunicipio="76126";
          break;
      case "CANDELARIA":
          codigoMunicipio="76130";
          break;
      case "CARTAGO":
          codigoMunicipio="76147";
          break;
      case "DAGUA":
          codigoMunicipio="76233";
          break;
      case "EL ÁGUILA":
          codigoMunicipio="76243";
          break;
      case "EL CAIRO":
          codigoMunicipio="76246";
          break;
      case "EL CERRITO":
          codigoMunicipio="76248";
          break;
      case "EL DOVIO":
          codigoMunicipio="76250";
          break;
      case "FLORIDA":
          codigoMunicipio="76275";
          break;
      case "GINEBRA":
          codigoMunicipio="76306";
          break;
      case "GUACARÍ":
          codigoMunicipio="76318";
          break;
      case "JAMUNDÍ":
          codigoMunicipio="76364";
          break;
      case "LA CUMBRE":
          codigoMunicipio="76377";
          break;
      case "LA UNIÓN":
          codigoMunicipio="76400";
          break;
      case "LA VICTORIA":
          codigoMunicipio="76403";
          break;
      case "OBANDO":
          codigoMunicipio="76497";
          break;
      case "PALMIRA":
          codigoMunicipio="76520";
          break;
      case "PRADERA":
          codigoMunicipio="76563";
          break;
      case "RESTREPO":
          codigoMunicipio="76606";
          break;
      case "RIOFRÍO":
          codigoMunicipio="76616";
          break;
      case "ROLDANILLO":
          codigoMunicipio="76622";
          break;
      case "SAN PEDRO":
          codigoMunicipio="76670";
          break;
      case "SEVILLA":
          codigoMunicipio="76736";
          break;
      case "TORO":
          codigoMunicipio="76823";
          break;
      case "TRUJILLO":
          codigoMunicipio="76828";
          break;
      case "TULUÁ":
          codigoMunicipio="76834";
          break;
      case "ULLOA":
          codigoMunicipio="76845";
          break;
      case "VERSALLES":
          codigoMunicipio="76863";
          break;
      case "VIJES":
          codigoMunicipio="76869";
          break;
      case "YOTOCO":
          codigoMunicipio="76890";
          break;
      case "YUMBO":
          codigoMunicipio="76892";
          break;
      case "ZARZAL":
          codigoMunicipio="76895";
          break;
      case "ARAUCA":
          codigoMunicipio="81001";
          break;
      case "ARAUQUITA":
          codigoMunicipio="81065";
          break;
      case "CRAVO NORTE":
          codigoMunicipio="81220";
          break;
      case "FORTUL":
          codigoMunicipio="81300";
          break;
      case "PUERTO RONDÓN":
          codigoMunicipio="81591";
          break;
      case "SARAVENA":
          codigoMunicipio="81736";
          break;
      case "TAME":
          codigoMunicipio="81794";
          break;
      case "YOPAL":
          codigoMunicipio="85001";
          break;
      case "AGUAZUL":
          codigoMunicipio="85010";
          break;
      case "CHÁMEZA":
          codigoMunicipio="85015";
          break;
      case "HATO COROZAL":
          codigoMunicipio="85125";
          break;
      case "LA SALINA":
          codigoMunicipio="85136";
          break;
      case "MANÍ":
          codigoMunicipio="85139";
          break;
      case "MONTERREY":
          codigoMunicipio="85162";
          break;
      case "NUNCHÍA":
          codigoMunicipio="85225";
          break;
      case "OROCUÉ":
          codigoMunicipio="85230";
          break;
      case "PAZ DE ARIPORO":
          codigoMunicipio="85250";
          break;
      case "PORE":
          codigoMunicipio="85263";
          break;
      case "RECETOR":
          codigoMunicipio="85279";
          break;
      case "SABANALARGA":
          codigoMunicipio="85300";
          break;
      case "SÁCAMA":
          codigoMunicipio="85315";
          break;
      case "SAN LUIS DE PALENQUE":
          codigoMunicipio="85325";
          break;
      case "TÁMARA":
          codigoMunicipio="85400";
          break;
      case "TAURAMENA":
          codigoMunicipio="85410";
          break;
      case "TRINIDAD":
          codigoMunicipio="85430";
          break;
      case "VILLANUEVA":
          codigoMunicipio="85440";
          break;
      case "MOCOA":
          codigoMunicipio="86001";
          break;
      case "COLÓN":
          codigoMunicipio="86219";
          break;
      case "ORITO":
          codigoMunicipio="86320";
          break;
      case "PUERTO ASÍS":
          codigoMunicipio="86568";
          break;
      case "PUERTO CAICEDO":
          codigoMunicipio="86569";
          break;
      case "PUERTO GUZMÁN":
          codigoMunicipio="86571";
          break;
      case "PUERTO LEGUÍZAMO":
          codigoMunicipio="86573";
          break;
      case "SIBUNDOY":
          codigoMunicipio="86749";
          break;
      case "SAN FRANCISCO":
          codigoMunicipio="86755";
          break;
      case "SAN MIGUEL":
          codigoMunicipio="86757";
          break;
      case "SANTIAGO":
          codigoMunicipio="86760";
          break;
      case "VALLE DEL GUAMUEZ":
          codigoMunicipio="86865";
          break;
      case "VILLAGARZÓN":
          codigoMunicipio="86885";
          break;
      case "SAN ANDRÉS":
          codigoMunicipio="88001";
          break;
      case "PROVIDENCIA":
          codigoMunicipio="88564";
          break;
      case "LETICIA":
          codigoMunicipio="91001";
          break;
      case "EL ENCANTO":
          codigoMunicipio="91263";
          break;
      case "LA CHORRERA":
          codigoMunicipio="91405";
          break;
      case "LA PEDRERA":
          codigoMunicipio="91407";
          break;
      case "LA VICTORIA":
          codigoMunicipio="91430";
          break;
      case "MIRITÍ – PARANÁ":
          codigoMunicipio="91460";
          break;
      case "PUERTO ALEGRÍA":
          codigoMunicipio="91530";
          break;
      case "PUERTO ARICA":
          codigoMunicipio="91536";
          break;
      case "PUERTO NARIÑO":
          codigoMunicipio="91540";
          break;
      case "PUERTO SANTANDER":
          codigoMunicipio="91669";
          break;
      case "TARAPACÁ":
          codigoMunicipio="91798";
          break;
      case "INÍRIDA":
          codigoMunicipio="94001";
          break;
      case "BARRANCO MINAS":
          codigoMunicipio="94343";
          break;
      case "MAPIRIPANA":
          codigoMunicipio="94663";
          break;
      case "SAN FELIPE":
          codigoMunicipio="94883";
          break;
      case "PUERTO COLOMBIA":
          codigoMunicipio="94884";
          break;
      case "LA GUADALUPE":
          codigoMunicipio="94885";
          break;
      case "CACAHUAL":
          codigoMunicipio="94886";
          break;
      case "PANA PANA":
          codigoMunicipio="94887";
          break;
      case "MORICHAL":
          codigoMunicipio="94888";
          break;
      case "SAN JOSÉ DEL GUAVIARE":
          codigoMunicipio="95001";
          break;
      case "CALAMAR":
          codigoMunicipio="95015";
          break;
      case "EL RETORNO":
          codigoMunicipio="95025";
          break;
      case "MIRAFLORES":
          codigoMunicipio="95200";
          break;
      case "MITÚ":
          codigoMunicipio="97001";
          break;
      case "CARURÚ":
          codigoMunicipio="97161";
          break;
      case "PACOA":
          codigoMunicipio="97511";
          break;
      case "TARAIRA":
          codigoMunicipio="97666";
          break;
      case "PAPUNAHUA":
          codigoMunicipio="97777";
          break;
      case "YAVARATÉ":
          codigoMunicipio="97889";
          break;
      case "PUERTO CARREÑO":
          codigoMunicipio="99001";
          break;
      case "LA PRIMAVERA":
          codigoMunicipio="99524";
          break;
      case "SANTA ROSALÍA":
          codigoMunicipio="99624";
          break;
      case "CUMARIBO":
          codigoMunicipio="99773";
          break;
      default:
        codigoMunicipio="00000";
        }
    return codigoMunicipio;
  }

    function createFolders(mes_Co, anio_Co)
  	{
      var folderInvoiceToday = null;
      var parentFol = '1585339';

      var existYearFolder = false;
      var internalid_YearFolder_ToFind = null;
      var name_YearFolder_ToFind = null;

      var existMesFolder = false;
      var internalid_MesFolder_ToFind = null;
      var name_MesFolder_ToFind = null;

      var newYearFolderId = null;
      var newMesFolderId = null;
      var mes_ParentFolderToFind = null;

      //var newTxt = file.load({id: 'SuiteScripts/ScriptFactory/Facturas CO TXT/TXT FASE 2/myImageFile.jpg'});
      // buscar si existe año folder
      search.create({
             type: search.Type.FOLDER,
             filters: [search.createFilter({name: 'parent', operator: search.Operator.IS, values: [parentFol]})],
             columns: ['internalid', 'name']
      }).run().each(function(result){
             //var jsonString = JSON.stringify(result);	var obj = JSON.parse(jsonString);
             var internalid = result.getValue({name: 'internalid'});
        	 var name = result.getValue({name: 'name'});
        	 if(name == anio_Co)
             {
               existYearFolder = true;
               internalid_YearFolder_ToFind = internalid;
               name_YearFolder_ToFind = name;
             }
            return true;
      });

	  // crear nuevo año folder
      if(existYearFolder == false)
      {
        var objRecord = record.create({type: record.Type.FOLDER, isDynamic: true});
        objRecord.setValue({fieldId: 'name', value: anio_Co});
        objRecord.setValue({fieldId: 'parent', value: parentFol});
        newYearFolderId = objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
      }
      else
      {
        log.debug('año folder found: ', internalid_YearFolder_ToFind + " - " + name_YearFolder_ToFind);
      }

	  // asignar año parent forlder para buscar mes folder
      if(internalid_YearFolder_ToFind != null && newYearFolderId == null)
      {
        mes_ParentFolderToFind = internalid_YearFolder_ToFind;
      }
      else if(internalid_YearFolder_ToFind == null && newYearFolderId != null){
        mes_ParentFolderToFind = newYearFolderId;
      }

	  // buscar si existe mes folder
      search.create({
             type: search.Type.FOLDER,
             filters: [search.createFilter({name: 'parent', operator: search.Operator.IS, values: [mes_ParentFolderToFind]})],
             columns: ['internalid', 'name']
      }).run().each(function(result){
             var internalid = result.getValue({name: 'internalid'});
        	 var name = result.getValue({name: 'name'});
        	 if(name == mes_Co)
             {
               existMesFolder = true;
               internalid_MesFolder_ToFind = internalid;
               name_MesFolder_ToFind = name;
             }
            return true;
      });

	  // crear nuevo mes folder
      if(existMesFolder == false)
      {
        var objRecord = record.create({type: record.Type.FOLDER, isDynamic: true});
        objRecord.setValue({fieldId: 'name', value: mes_Co});
        objRecord.setValue({fieldId: 'parent', value: mes_ParentFolderToFind});
        newMesFolderId = objRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
      }
      else
      {
        log.debug('mes folder found: ', internalid_MesFolder_ToFind + " - " + name_MesFolder_ToFind);
      }

      // devolver mes folder id
      if(internalid_MesFolder_ToFind != null && newMesFolderId == null)
      {
         folderInvoiceToday = internalid_MesFolder_ToFind;
      }else if(internalid_MesFolder_ToFind == null && newMesFolderId != null){
         folderInvoiceToday = newMesFolderId;
      }
	  return folderInvoiceToday;
    }

  function getDescuentoItem(item){
      var desc = "";
      var descriptionTofind = "DESCUENTO";
     /*
     if(item == "MANTENIMIENTO PREVENTIVO COL"){
        descriptionTofind = "DESCUENTO ANTICIPO MANTENIMIENTO PREVENTIVO COL";
      }
      else if(item == "HONORARIOS MICROINJERTO DE CABELLO COL" || item == "HONORARIOS MICROINJERTO DE CABELLO COL RETOQUE"){
        descriptionTofind = "DESCUENTO ANTICIPO MICRO INJERTO COL";
      }
      */
      //log.debug('descriptionTofind: ', descriptionTofind);
      newArrayItemsDescuentos.forEach(function(elemento){
          //var descripcionStr = element["descripcion"].toString();
          //log.debug('descripcionStr: ', descripcionStr);
          /*if(elemento["descripcion"] == descriptionTofind)
          {*/
            var descuentoStr = elemento["precio_total_item_mas_impuesto_aplicado"].toString();
            log.debug('descuentoStr: ', descuentoStr);
            if(descuentoStr.substring(0, 1) == "-")
            {
                log.debug('descuentoStr comienza con -: ', descuentoStr);
                try{
                  desc = descuentoStr.substring(1, descuentoStr.length);
                }catch(e){
                  log.debug("Exception: ", e);
                }
            }else if(descuentoStr == "0.00" || descuentoStr == "0"){
                desc = descuentoStr;
            }
          //}
      });
      return {descuento:desc, descriptionTofind:descriptionTofind};
  }

  	function getImageBackGround(sucursal){
      var imageBack = "";
      if(sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28")
      {
       	 imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
      }
      else
      {
        if(sucursal == "22") // Altavista KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
        if(sucursal == "35") // Can-Cun KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
        if(sucursal == "36") // Chihuahua KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
        if(sucursal == "23") // Guadalajara KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
        if(sucursal == "24") // Monterrey KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
        if(sucursal == "25") // Polanco KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
        if(sucursal == "37") // Puebla KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
        if(sucursal == "21") // Santa FE KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
        if(sucursal == "26") // Satelite KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
        if(sucursal == "27") // Tijuana KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
        if(sucursal == "28") // Veracruz KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
      }
      return imageBack;
    }

    return {
        onRequest: onRequest
    };

});

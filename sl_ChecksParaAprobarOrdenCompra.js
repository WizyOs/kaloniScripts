/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/url', 'N/email', 'N/log', 'N/redirect', 'N/record', 'N/runtime'], function(url, email, log, redirect, record, runtime){

    function onRequest(context)
  	{
      // Recibe parametros before load user event on click button (context mode: view)
      var ordenCompraId = "";
      try{ordenCompraId = context.request.parameters.ordenCompraId;}catch(e){log.debug('Exception 1', e);}
      log.debug('ordenCompraId: ', ordenCompraId);
      var checkId = "";
      try{checkId = context.request.parameters.checkId;}catch(e){log.debug('Exception 2', e);}
      log.debug('checkId: ', checkId);
      var nextAprovador = "";
      try{nextAprovador = context.request.parameters.nextAprovador;}catch(e){log.debug('Exception 3', e);}
      log.debug('nextAprovador: ', nextAprovador);

      /*Recibe parametros after submit user event (context mode: create)
      var recordId = "";
      var contype_Val = "";
      try
      {
        recordId = context.request.parameters.recordId;
        var recordId_Split = recordId.split('_');
        recordId = recordId_Split[0];
        contype_Val = recordId_Split[1];
      }catch(e){
        log.debug('Exception 4', e);
      }
      log.debug('recordId: ', recordId);
      log.debug('contype_Val: ', contype_Val);*/
      /*var contype_Val = "";
      try{contype_Val = context.request.parameters.contypeVal;}catch(e){log.debug('Exception 5', e);}
      */

      if(ordenCompraId != "" && ordenCompraId != null && checkId != "" && checkId != null)
      {
        var rec = record.load({type: 'purchaseorder', id: ordenCompraId, isDynamic: true});
        var oC = rec.getValue({fieldId: 'tranid'});
		var urlCase = url.resolveRecord({recordType: 'purchaseorder', recordId: ordenCompraId, isEditMode: false});
        log.debug('urlCase test: ', urlCase); // /app/accounting/transactions/purchord.nl?id=645449&compid=3559763
        urlCase = "https://3559763.app.netsuite.com" + urlCase;
        var total = rec.getValue({fieldId: 'total'});
        var currency = rec.getValue({fieldId: 'currency'});
        if(currency == "2"){
          total = total * 20;
          log.debug('total Dolares Americanos: ', total);
        }else if(currency == "4"){
          total = total * 21;
          log.debug('total Euro: ', total);
        }else if(currency == "8"){
          total = total * 30;
          log.debug('total Libra: ', total);
        }
       	log.debug('New total: ', total);

        var subject_OC_Aprobada = 'Orden de Compra Aprobada!!';
        var body_OC_Aprobada = 'Gracias por aprobar la orden de compra: <p><a href="' + urlCase + '">' + oC + '</a></p> \n';
        var subject_OC_Nueva = 'Nueva Orden de Compra!!';
        var body_OC_Nueva = 'Nueva orden de compra para aprobación: <p><a href="' + urlCase + '">' + oC + '</a></p> \n'

        if(checkId == "rechazar")
        {
          rec.setValue({fieldId: 'approvalstatus', value: '3'});
        }
        else
        {
          if(checkId == "custbody132") // btnJorgeDiaz
          {
            rec.setValue({fieldId: checkId, value: true});
            // Jorge Diaz Zamora id = 62860
            rec.setValue({fieldId: 'custbody142', value: 'Jorge Diaz Zamora'}); // PRIMER NIVEL
            email.send({author: 103204, recipients:'jdiaz@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          if(checkId == "custbody133") // btnBrendaMontero
          {
            rec.setValue({fieldId: checkId, value: true});
            // Brenda Montero id = 1106663
            rec.setValue({fieldId: 'custbody142', value: 'Brenda Montero'}); // PRIMER NIVEL
            rec.setValue({fieldId: 'custbody143', value: 'Brenda Montero'}); // SEGUNDO NIVEL
            email.send({author: 103204, recipients:'bmontero@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          if(checkId == "custbody134") // btnEdithGuevara
          {
            rec.setValue({fieldId: checkId, value: true});
            // Miguel Angel Iñiguez Hurtado id = 1033558
            rec.setValue({fieldId: 'custbody144', value: 'Miguel Angel Iñiguez Hurtado'}); // TERCER NIVEL
            email.send({author: 103204, recipients:'miniguez@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada}); // testing

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];

                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          if(checkId == "custbody135") // btnAlejandraPorras
          {
            rec.setValue({fieldId: checkId, value: true});
            // Gabriela Alejandra Porras Odriozola id = 975540
            rec.setValue({fieldId: 'custbody144', value: 'Gabriela Alejandra Porras Odriozola'}); // TERCER NIVEL
            rec.setValue({fieldId: 'custbody145', value: 'Gabriela Alejandra Porras Odriozola'}); // CUARTO NIVEL
            email.send({author: 103204, recipients:'aporras@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          /*if(checkId == "custbody137") // btnPatriciaSanchez
          {
            rec.setValue({fieldId: checkId, value: true});
            rec.setValue({fieldId: 'custbody142', value: 'Patricia Sanchez Ayala'}); // PRIMER NIVEL
            email.send({author: 103204, recipients:'psanchez@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          if(checkId == "custbody138") // btnSilviaMata
          {
            rec.setValue({fieldId: checkId, value: true});
            // Silvia Mata Diaz id = 739490
            rec.setValue({fieldId: 'custbody142', value: 'Silvia Mata Diaz'}); // PRIMER NIVEL
            email.send({author: 103204, recipients:'smata@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }*/

          if(checkId == "custbody140") // btnZulmaAponte
          {
            rec.setValue({fieldId: checkId, value: true});
            // Zulma Aponte Casas id = 224852
            if(total > 0 && total <= 5000)
            {
               rec.setValue({fieldId: 'custbody142', value: 'Zulma Aponte Casas'}); // PRIMER NIVEL
            }else if(total > 5000 && total <= 19000){
               rec.setValue({fieldId: 'custbody142', value: 'Zulma Aponte Casas'}); // PRIMER NIVEL
               rec.setValue({fieldId: 'custbody143', value: 'Zulma Aponte Casas'}); // SEGUNDO NIVEL
            }

            email.send({author: 103204, recipients:'zgaponte@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          if(checkId == "custbody139") // btnMichelleAlcantara
          {
            rec.setValue({fieldId: checkId, value: true});
            // Michelle Alcantara Avila id = 411945
            rec.setValue({fieldId: 'custbody142', value: 'Michelle Alcantara Avila'}); // PRIMER NIVEL
            email.send({author: 103204, recipients:'malcantara@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          if(checkId == "custbody141") // btnAbrahamFigueroa
          {
            rec.setValue({fieldId: checkId, value: true});
            // Enrique Francia Campos id = 1034514
            rec.setValue({fieldId: 'custbody143', value: 'Enrique Francia Campos'}); // SEGUNDO NIVEL
            email.send({author: 103204, recipients:'efrancia@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }

          if(checkId == "custbody153") // btnOsvaldoTinoco
          {
            rec.setValue({fieldId: checkId, value: true});
            // Osvaldo Tinoco Ramirez id = 97772
            rec.setValue({fieldId: 'custbody142', value: 'Osvaldo Tinoco Ramirez'}); // PRIMER NIVEL
            email.send({author: 103204, recipients:'otinoco@kaloni.com', subject:subject_OC_Aprobada, body:body_OC_Aprobada});

            if(nextAprovador != "" && nextAprovador != null && nextAprovador.indexOf("ultAprov") != -1)
            {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
            }
            else
            {
              try
              {
                  var nextAprovador_Split = nextAprovador.split('|');
                  var nextAprovador_id = nextAprovador_Split[0];
                  var nextAprovador_mail = nextAprovador_Split[1];
                  rec.setValue({fieldId: 'nextapprover', value: nextAprovador_id});
                  email.send({author: 103204, recipients:nextAprovador_mail, subject:subject_OC_Nueva, body:body_OC_Nueva});
              }catch(e){
                  log.debug("Exception: ", e);
              }
            }
          }
        }

        rec.save({enableSourcing: false, ignoreMandatoryFields: true});
        redirect.toRecord({type : 'purchaseorder', id : ordenCompraId}); // parameters: {'custparam_test':'test'}

        //context.response.writePage(formulario);
      }
    }

    return {
        onRequest: onRequest
    };

});

/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

define(['N/record'],function(record){
	var customform = null;
    var first_startdate = null;

  	function pageInit(context)
	{
      var subject = context.currentRecord.getValue({fieldId: 'title'});
      console.log('subject: '+ subject);
      if(subject != "" && subject != "")
      {
        var newSubject = subject;
        try
        {
          newSubject = newSubject.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function(m){ return m.toUpperCase();});
          console.log('newSubject: '+ newSubject);
          context.currentRecord.setValue({fieldId: 'title', value: newSubject, ignoreFieldChange: true});
        }catch(e){
          log.debug("Exception: ", e);
        }
      }
      customform = context.currentRecord.getValue({fieldId: 'customform'});
      console.log('pageInit customform: '+ customform);
      first_startdate = context.currentRecord.getValue({fieldId: 'startdate'});
      console.log('pageInit first_startdate: '+ first_startdate);
    }

    function fieldChanged(context)
  	{
        if(context.fieldId == "custevent839"){
          if(customform == "14"){
             var procedimientos = context.currentRecord.getText({fieldId: 'custevent839'});
             if(procedimientos != "" && procedimientos != null)
             	context.currentRecord.setValue({fieldId: 'title', value: procedimientos, ignoreFieldChange: true});
          }
        }

        if(context.fieldId == "custevent197"){
          if(customform == "14"){ // || customform == "148"
             var fechaDeExpedicion = context.currentRecord.getValue({fieldId: 'custevent197'});
             if(fechaDeExpedicion != "" && fechaDeExpedicion != null){
               context.currentRecord.setValue({fieldId: 'startdate', value: fechaDeExpedicion, ignoreFieldChange: true});
             }else if(first_startdate != "" && first_startdate != null){
               context.currentRecord.setValue({fieldId: 'startdate', value: first_startdate, ignoreFieldChange: true});
             }
          }
        }
    }

    function saveRecord(context)
    {
      /*
        var final_Message = "";
        var currentRecord = context.currentRecord;
        console.log('currentRecord: ' + currentRecord);
        return false;
      */
      if(customform == "134")
      {
        var fechaNacimiento = context.currentRecord.getText({fieldId: 'custevent331'});
        console.log('fechaNacimiento: ' + fechaNacimiento);
        log.debug('fechaNacimiento: ', fechaNacimiento);
        if(fechaNacimiento.indexOf("/") != -1)
        {
         //var fecha = "13/09/1985";
         if(validarFormatoFecha(fechaNacimiento))
         {
              if(existeFecha(fechaNacimiento))
              {
                  var fechaNacimiento_split = fechaNacimiento.split('/');
                  var enteredDate = fechaNacimiento_split[2] + '/' + fechaNacimiento_split[1] + '/' + fechaNacimiento_split[0];
                  var years = new Date(new Date() - new Date(enteredDate)).getFullYear() - 1970;
                  console.log('years: ' + years);
                  log.debug('years: ', years);

                  if(years > 9 && years < 100) // result_fechaNacimiento &&
                  {
                    console.log('Correcto tu edad es: ' + years + ' años');
                    log.debug('Correcto tu edad es: ', years + ' años');
                    //return false;
                  }
                  else
                  {
                    alert('La FECHA DE NACIMIENTO es incorrecta: ' + fechaNacimiento + '\nEl rango valido de edad es de 10 a 99 años');
                    return false;
                  }
                  //alert("La FECHA DE NACIMIENTO introducida es correcta.");
              }
              else
              {
                  alert("La FECHA DE NACIMIENTO introducida no existe.");
                  return false;
              }
          }
          else
          {
             alert("El formato de la FECHA DE NACIMIENTO es incorrecto.");
             return false;
          }
        }
        else
        {
          alert('Ingresa una FECHA DE NACIMIENTO valida!!');
          return false;
        }
      }
      return true;
    }

    function existeFecha(fecha)
  	{
        var fechaf = fecha.split("/");
        var day = fechaf[0];
        var month = fechaf[1];
        var year = fechaf[2];
        var date = new Date(year,month,'0');
        if((day-0)>(date.getDate()-0))
        {
           return false;
        }
        return true;
    }

    function validarFormatoFecha(campo)
  	{
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((campo.match(RegExPattern)) && (campo!=''))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
  
    function menorAhoy(UserDate)
    {
        var today = new Date();
        console.log('today: ' + today);
        log.debug('today: ', today);

        if(new Date(UserDate).getTime() < today.getTime())
           return true; // Menor al año actual

        return false; // Mayor al año actual
    }

    return{
      pageInit:pageInit,
      fieldChanged:fieldChanged,
      saveRecord:saveRecord
    };
});
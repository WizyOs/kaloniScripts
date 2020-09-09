	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/
	define([],function() {
      /*function pageInit(context){

      }

      function postSourcing(context){
		if(context.fieldId == "supervisor"){
          var test1 = context.currentRecord.getValue({fieldId: 'custentity388'});
          alert('Valor custentity388 ' + test1);
        }
      }*/

      function fieldChanged(context)
      {
        if(context.fieldId == "custbody126")
        {
          var obligacionesDelContribuyente = context.currentRecord.getText({fieldId: 'custbody125'});
          var obligacionesDelContribuyenteLista = context.currentRecord.getText({fieldId: 'custbody126'});
          var eliminarObligacionesDelContribuyente = context.currentRecord.getValue({fieldId: 'custbody127'});
          console.log('obligacionesDelContribuyenteLista: ' + obligacionesDelContribuyenteLista);
          if(obligacionesDelContribuyenteLista != null && obligacionesDelContribuyenteLista != "")
          {
            if(eliminarObligacionesDelContribuyente)
            {
			  var obligacionesDelContribuyenteListaSplit = obligacionesDelContribuyenteLista.split(' ');
              obligacionesDelContribuyenteLista = obligacionesDelContribuyenteListaSplit[0];
              if(obligacionesDelContribuyente.indexOf(obligacionesDelContribuyenteLista) != -1)
              {
                var replaceResult = obligacionesDelContribuyente.replace(obligacionesDelContribuyenteLista +';', '');
                context.currentRecord.setValue({fieldId: 'custbody125', value: replaceResult, ignoreFieldChange: false});
                context.currentRecord.setValue({fieldId: 'custbody127', value: false, ignoreFieldChange: false});
              }
              else
              {
                alert('El campo OBLIGACIONES DEL CONTRIBUYENTE no contiene el valor: ' + obligacionesDelContribuyenteLista + ' que deseas eliminar!!');
              }
            }
            else
            {
              var obligacionesDelContribuyenteListaSplit = obligacionesDelContribuyenteLista.split(' ');
              obligacionesDelContribuyenteLista = obligacionesDelContribuyenteListaSplit[0];
              if(obligacionesDelContribuyente.indexOf(obligacionesDelContribuyenteLista) != -1)
              {
                alert('El campo OBLIGACIONES DEL CONTRIBUYENTE ya contiene este valor: ' + obligacionesDelContribuyenteLista);
              }
              else
              {
                obligacionesDelContribuyente += obligacionesDelContribuyenteLista + ";";
                context.currentRecord.setValue({fieldId: 'custbody125', value: obligacionesDelContribuyente, ignoreFieldChange: false});
              }
            }
          }
        }

        if(context.fieldId == "custbody129")
        {
          var detallesTributariosReceptor = context.currentRecord.getText({fieldId: 'custbody128'});
          var detallesTributariosReceptorLista = context.currentRecord.getText({fieldId: 'custbody129'});
          var eliminardetallesTributariosReceptor = context.currentRecord.getValue({fieldId: 'custbody130'});
          console.log('detallesTributariosReceptorLista: ' + detallesTributariosReceptorLista);
          if(detallesTributariosReceptorLista != null && detallesTributariosReceptorLista != "")
          {
            if(eliminardetallesTributariosReceptor)
            {
              if(detallesTributariosReceptor.indexOf(detallesTributariosReceptorLista) != -1)
              {
                var replaceResult = detallesTributariosReceptor.replace(detallesTributariosReceptorLista +'+', '');
                context.currentRecord.setValue({fieldId: 'custbody128', value: replaceResult, ignoreFieldChange: false});
                context.currentRecord.setValue({fieldId: 'custbody130', value: false, ignoreFieldChange: false});
              }
              else
              {
                alert('El campo DETALLES TRIBUTARIOS no contiene el valor: ' + detallesTributariosReceptorLista + ' que deseas eliminar!!');
              }
            }
            else
            {
              if(detallesTributariosReceptor.indexOf(detallesTributariosReceptorLista) != -1)
              {
                alert('El campo DETALLES TRIBUTARIOS ya contiene este valor: ' + detallesTributariosReceptorLista);
              }
              else
              {
                detallesTributariosReceptor += detallesTributariosReceptorLista + "+";
                context.currentRecord.setValue({fieldId: 'custbody128', value: detallesTributariosReceptor, ignoreFieldChange: false});
              }
            }
          }
        }

      }

		return {
      	  //pageInit: pageInit,
          //validateField: validateField,
          //saveRecord: saveRecord,
          fieldChanged: fieldChanged
          /*postSourcing: postSourcing,
          lineInit: lineInit,
          function1: function1*/
		};
});
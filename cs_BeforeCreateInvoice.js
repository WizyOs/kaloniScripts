	/**
	* @NApiVersion 2.x
	* @NScriptType ClientScript
	* @NModuleScope SameAccount
	*/
	define(['N/currentRecord', 'N/log'],
	function(currentRecord, log) {
      function pageInit(context){
        var currentRec = currentRecord.get();
        //var actValue = currentRec.getValue({fieldId: 'custpage_textfield'});

        log.error("currentRec.type:", currentRec.type);
        if(currentRec.type == "invoice")
        {
          try
          {
            var status = document.getElementById("statusHonorarios").value;
            log.error("status:", status);
            if(status == "hideSaveButton")
            {
              var td1element = document.getElementById("spn_multibutton_submitter").style.display = "none";
              var td3element = document.getElementById("spn_secondarymultibutton_submitter").style.display = "none";
              var td2element = document.getElementsByClassName("bntBgB multiBnt"); // bntBgT
              td2element[0].style.display = "none";
              console.log('td2element[0]: ' + td2element[0]);
              td2element[1].style.display = "none";
              console.log('td2element[1]: ' + td2element[1]);

              console.log('td2element.length: ' + td2element.length);
              //alert("No puedes guardar la factura mientras no quites las AGUJAS del inventario!!");
            }
          }catch(e){
            log.error("Exception: ", e.toString());
          }
        }
      }

		return {
      	  pageInit: pageInit
		};
});
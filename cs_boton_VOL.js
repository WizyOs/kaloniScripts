/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope SameAccount
*/ 

define(['N/record',  'N/currentRecord', 'N/log', 'N/runtime'], 
function(record, currentRecord, log, runtime) {
    
    function pageInit(context) {
        
    }

    function redirectToVol() {
        var currenRecordObj = currentRecord.get();
        var idCustomer = currenRecordObj.id;
        var customerObj = record.load({ type: 'customer', id: idCustomer });
        var sucursal = customerObj.getText({ fieldId: 'custentity25' });
        console.log(sucursal);
        window.open("" + "https://whereby.com/user/login" + "", "_blank");
        
    }

    return {
        pageInit: pageInit,
        redirectToVol: redirectToVol
    }
});
/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/
define(['N/url', 'N/record'], function (url, record) {

  function pageInit(context) {
  }

  function callSuiteletCons() {
    var recId = document.getElementById('id').value;
    var objRecord = record.load({ type: 'SUPPORTCASE', id: recId, isDynamic: true });
    var companyid = document.getElementById('companyid').value;


    var valURl = url.resolveScript({ scriptId: 'customscript1010', deploymentId: 'customdeploy1', params: { recordCaseId: recId, compaId: companyid } });
    //console.log('URL suitelet:', valURl);
    window.open("" + valURl + "");
  }
  
  function callSuiteletConsComps() {
    var recId = document.getElementById('id').value;
    var objRecord = record.load({ type: 'SUPPORTCASE', id: recId, isDynamic: true });
    var companyid = document.getElementById('companyid').value;
    var typeComplementaries = objRecord.getValue({ fieldId: 'custevent1079' });

    var valURl = url.resolveScript({ scriptId: 'customscript1010', deploymentId: 'customdeploy1', params: { recordCaseId: recId, compaId: companyid, typeComps: typeComplementaries } });
    //console.log('URL suitelet:', valURl);
    window.open("" + valURl + "");
  }

  function callSuiteletConsPDF() {
    var recId = document.getElementById('id').value;
    var companyid = document.getElementById('companyid').value;

    var valURl = url.resolveScript({ scriptId: 'customscript1042', deploymentId: 'customdeploy1', params: { recordCaseId: recId, compaId: companyid } });
    //console.log('URL suitelet:', valURl);
    window.open("" + valURl + "");
  }

  return {
    pageInit: pageInit,
    callSuiteletCons: callSuiteletCons,
    callSuiteletConsComps: callSuiteletConsComps,
    callSuiteletConsPDF: callSuiteletConsPDF
  };
});
/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/
define(['N/url', 'N/record'], function (url, record) {

    function pageInit(context) {
    }

    function onButtonClick() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;

        var valURl = url.resolveScript({ scriptId: 'customscript1149', deploymentId: 'customdeploy1', params: { recordCaseId: recId, compaId: companyid } });
        window.open("" + valURl + "");
    }

    function onButtonClick2() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;

        var valURl = url.resolveScript({ scriptId: 'customscript1143', deploymentId: 'customdeploy1', params: { recordCaseId: recId, compaId: companyid } });
        window.open("" + valURl + "");
    }

    return {
        pageInit: pageInit,
        onButtonClick: onButtonClick,
        onButtonClick2 : onButtonClick2
    };
});
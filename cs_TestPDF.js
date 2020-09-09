/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/
define(['N/record', 'N/url', 'N/https'], function (record, url, https) {

    function pageInit(context) {
    }

    function onButtonClick() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1164', deploymentId: 'customdeploy1', params: {recId: recId, compaId: companyid}});
        window.open("" + valURl + "", '_blank');
    }

    return {
        pageInit: pageInit,
        onButtonClick: onButtonClick
    };
});
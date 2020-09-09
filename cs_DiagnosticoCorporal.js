/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/
define(['N/record', 'N/url', 'N/https', 'N/xml', 'N/currentRecord'], function (record, url, https, xml, currentRecord) {

    function pageInit(context) {

    }

    function verExpedienteCorporal() {
        recId = document.getElementById('id').value;
        companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1181', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid } });
        window.open("" + valURl + "");
    }

    function verExpedienteProcedimiento() {
        recId = document.getElementById('id').value;
        companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1188', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid } });
        window.open("" + valURl + "");
    }

    function pintarImagenes() {
        recId = document.getElementById('id').value;
        companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1186', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid } });
        window.open("" + valURl + "");
    }
    
    function pintarImagenes_aparatologia(session, graphic) {
        recId = document.getElementById('id').value;
        companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1186', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid, session: session, graphic: graphic } });
        window.open("" + valURl + "" , "_self");
    }

    function firmaDiagnosticoBodySkin() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1223', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid } });
        window.open("" + valURl + "");
    }

    function firmaConsentimientoComplementarios() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1223', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid } });
        window.open("" + valURl + "");
    }

    function verExpedienteRostro() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1226', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid, exp: 'rostro' } });
        window.open("" + valURl + "");
    }

    function verExpedienteCuerpo() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;
        var valURl = url.resolveScript({ scriptId: 'customscript1226', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid, exp: 'cuerpo' } });
        window.open("" + valURl + "");
    }

    function verExpedienteComplementarios() {
        var recId = document.getElementById('id').value;
        var companyid = document.getElementById('companyid').value;
        var rec = record.load({ type: 'supportcase', id: recId, isDyanmic: false });
        var typeComplementaries = rec.getValue({ fieldId: 'custevent1079' });
        var valURl = url.resolveScript({ scriptId: 'customscript1226', deploymentId: 'customdeploy1', params: { recId: recId, compaId: companyid, exp: 'complementarios', typeComps: typeComplementaries } });
        window.open("" + valURl + "");
    }

    function loadimages() {       
        var recId = null;
        var mode = null;
        var valURl = null;
        var currentRec = currentRecord.get();
        var idRec = currentRec.id;
        var parentRecId = null;
        var customerId = null;
        var currentUrl = document.location.href;
        var paramsUrl = new URL(currentUrl);
        recId = idRec;
        mode = 'e';
        var rec = record.load({ type: 'supportcase', id: idRec, isDyanmic: false });
        customerId = rec.getValue({ fieldId: 'company' });
        parentRecId = rec.getValue({ fieldId: 'custevent_parentrecid'});
        cf = rec.getValue({ fieldId: 'customform'});
        valURl = url.resolveScript({ scriptId: 'customscript1231', deploymentId: 'customdeploy1', params: { customerId: customerId, recId: recId, parentRecId: parentRecId, mode: mode, cf: cf } });
        window.open("" + valURl + "" , "_self");
    }

    function loadimagesReviews(review) {
        var recId = null;
        var valURl = null;
        var currentRec = currentRecord.get();
        var idRec = currentRec.id;
        var parentRecId = null;
        var customerId = null;
        var numProc = null;
        var currentUrl = document.location.href;
        var paramsUrl = new URL(currentUrl);
        recId = idRec;
        var rec = record.load({ type: 'supportcase', id: idRec, isDyanmic: false });
        customerId = rec.getValue({ fieldId: 'company' });
        parentRecId = rec.getValue({ fieldId: 'custevent_parentrecid'});
        cf = rec.getValue({ fieldId: 'customform'});
        numProc = rec.getValue({ fieldId: 'custevent839' });
        valURl = url.resolveScript({ scriptId: 'customscript1231', deploymentId: 'customdeploy1', params: { customerId: customerId, recId: recId, parentRecId: parentRecId, review: review, cf: cf, numProc: numProc  } });
        window.open("" + valURl + "", "_blank");
    }

    function viewimagesReviews(review) {
        var recId = null;
        var valURl = null;
        var currentRec = currentRecord.get();
        var idRec = currentRec.id;
        var parentRecId = null;
        var customerId = null;
        var numProc = null;
        var currentUrl = document.location.href;
        var paramsUrl = new URL(currentUrl);
        recId = idRec;
        var rec = record.load({ type: 'supportcase', id: idRec, isDyanmic: false });
        customerId = rec.getValue({ fieldId: 'company' });
        parentRecId = rec.getValue({ fieldId: 'custevent_parentrecid'});
        cf = rec.getValue({ fieldId: 'customform'});
        numProc = rec.getValue({ fieldId: 'custevent839' });
        valURl = url.resolveScript({ scriptId: 'customscript1252', deploymentId: 'customdeploy1', params: { customerId: customerId, recId: recId, parentRecId: parentRecId, review: review, cf: cf, numProc: numProc  } });
        window.open("" + valURl + "", "_blank");
    }

    function cancelSelf() {
        var currentUrl = document.location.href;
        var paramsUrl = new URL(currentUrl);
        var recId = paramsUrl.searchParams.get("recId");
        var valURl = 'https://3559763.app.netsuite.com/app/crm/support/supportcase.nl?id=' + recId + '&whence=&';
        window.open("" + valURl + "", "_self");
    }

    function reduceimages(context) {       
        var recId = null;
        var mode = null;
        var valURl = null;
        var currentRec = currentRecord.get();
        var idRec = currentRec.id;
        var parentRecId = null;
        var currentUrl = document.location.href;
        var paramsUrl = new URL(currentUrl);

        if (idRec != '') {
            recId = idRec;
            mode = 'e';
            var rec = record.load({ type: 'supportcase', id: idRec, isDyanmic: false });
            parentRecId = rec.getValue({ fieldId: 'custevent_parentrecid'});
            cf = rec.getValue({ fieldId: 'customform'});
            console.log(cf);
            valURl = url.resolveScript({ scriptId: 'customscript1231', deploymentId: 'customdeploy1', params: { recId: recId, parentRecId: parentRecId, mode: mode, cf: cf } });
        } else if (idRec == '') {
            recId = currentRec.getValue({ fieldId: 'custevent_temptrecid' });
            idRec = paramsUrl.searchParams.get("recId");
            cf = paramsUrl.searchParams.get("cf");
            parentRecId = idRec;
            mode = 'c';
            valURl = url.resolveScript({ scriptId: 'customscript1231', deploymentId: 'customdeploy1', params: { recId: recId, parentRecId: parentRecId, mode: mode, cf: cf } });
        }
        window.open("" + valURl + "");
    }

    return ({
        pageInit: pageInit,
        verExpedienteCorporal: verExpedienteCorporal,
        verExpedienteProcedimiento: verExpedienteProcedimiento,
        pintarImagenes: pintarImagenes,
        firmaDiagnosticoBodySkin: firmaDiagnosticoBodySkin,
        firmaConsentimientoComplementarios: firmaConsentimientoComplementarios,
        verExpedienteRostro: verExpedienteRostro,
        verExpedienteCuerpo: verExpedienteCuerpo,
        verExpedienteComplementarios: verExpedienteComplementarios,
        pintarImagenes_aparatologia: pintarImagenes_aparatologia,
        loadimages: loadimages,
        loadimagesReviews: loadimagesReviews,
        viewimagesReviews: viewimagesReviews,
        cancelSelf: cancelSelf
        //reduceimages: reduceimages
        //firmaMedicoDiagnostico: firmaMedicoDiagnostico
    });
});
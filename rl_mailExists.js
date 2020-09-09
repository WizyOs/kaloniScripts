/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 *@NModuleScope Public
 */
define(['N/record', 'N/search', 'N/log'], function (record, search, log) {

    function doGet(params) {

    }

    function doPost(params) {
        //var preObjJson = JSON.stringify(params);
        objJson = JSON.parse(params);

        var jsonResponse = {};
        var email_json = objJson.email;
        messageStatus = '';

        //log.debug('Objeto JSON', objJson);
        log.debug('Mail', email_json);

        var searchMails = search.load({
            id: 'customsearch7682'
        });

        var mailFilter = search.createFilter({
            name: 'email',
            operator: search.Operator.IS,
            values: email_json
        });

        searchMails.filters.push(mailFilter);

        var results = searchMails.run().getRange({
            start: 0,
            end: 10
        });

        log.debug('Mail count', results.length);

        if (results.length > 0) {
            messageStatus = 200;
        } else {
            messageStatus = 404
        }
        
        return messageStatus;
    }

    return {
        get: doGet,
        post: doPost
    }
});
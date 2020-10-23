/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doPost(params) {
        var objJson;
        if (typeof params === "object") {
            objJson = params;
        } else {
            objJson = JSON.parse(params);
        }
        log.debug("params", objJson);

        // Entry params
        var param_email = objJson.email;
        var param_password = objJson.password;

        // Searches
        var searchCreate_passwordByEmail = search.create({
            type: search.Type.CUSTOMER,
            filters: [{
                name: "email",
                operator: "is",
                values: [param_email],
                isor: false,
                isnot: false,
                leftparens: 0,
                rightparens: 0
            }],
            columns: [{
                name: "internalid"
            }]
        });

        var searchResult_passwordByEmail = searchCreate_passwordByEmail.run().getRange({
            start: 0,
            end: 1
        });
        var obj_passwordByEmail = JSON.parse(JSON.stringify(searchResult_passwordByEmail));

        
        log.debug("params", obj_passwordByEmail[0].values.internalid[0].value);
        log.debug("params", param_password);


        try {
            var obj_customer = record.load({ 
                type: record.Type.CUSTOMER, 
                id: obj_passwordByEmail[0].values.internalid[0].value,
                isDynamic: true
            });
    
            obj_customer.setValue({
                fieldId: "custentity446",
                value: param_password,
                ignoreFieldChange: true
            });
    
            try {
                recordId = obj_customer.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
            } catch (error) {
                log.debug("error", error);
            }

            return {
                "status": "OK_SAVE_PASSWORD"
            }
        } catch (error) {
            return {
                "status": "ERROR_PASSWORD_DONT_SAVED"
            }
        }    
    }

    return {
        post: doPost
    };
});
/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doGet(params) { }

    function doPost(params) {
        var scriptObj = runtime.getCurrentScript();

        var objJson;
        if (typeof params === "object") {
            objJson = params;
        } else {
            objJson = JSON.parse(params);
        }
        log.debug("params", objJson);
        log.debug("type params", typeof objJson);
        
        // VARIABLES OBJETO JSON
        var param_country = objJson.country;
        var param_firstname = objJson.first_name;
        var param_lastname = objJson.last_name;
        var param_email = objJson.email;
        var param_mobilephone = objJson.phone_number;
        var param_homephone = objJson.phone_number;
        var param_comments = objJson.comments;
        var param_custentity138 = objJson.custentity138;
        var param_custentity25 = objJson.custentity25;
        var param_custentity135 = objJson.custentity135;
        var param_custentity139 = objJson.custentity139;
/*         var param_custentity38 = objJson.platform;
        var param_custentity134 = objJson.platform; */


        // VARIABLES GLOBALES
        var param_custentity38 = "180";
        var param_custentity134 = "Facebook";
        var param_subsidiary;
        var param_custentity30 = "67";
        var param_custentity387 = false;
        var param_globalSubscriptionStatus = "1";
        var param_custentity137;
        var param_category = "1";
        var param_custentity131 = "1";
        var param_custentity132 = "7";
        var param_custentity133 = "Facebook";
        var param_custentity136 = "Facebook";
        var param_leadsource;
        var param_custentity142 = "3";
        var param_custentity144 = "1";
        var param_currency;
        var param_custentity143;
        var param_custentity155 = true;
        var param_custentity313 = "9";
        var param_custentity_valoracion_online = false;


        // SOPORTES
        var random_ejecutivo = Math.ceil(Math.random() * 12);

        // SETTING DE VARIABLES
        if (param_country === "mx") {
            param_subsidiary = "6";
            param_custentity137 = "1";
            param_currency = "1";
            param_custentity143 = "108";
            param_leadsource = "156218";

        } else if (param_country === "co") {

            param_subsidiary = "10";
            param_custentity137 = "4";
            param_currency = "5";
            param_leadsource = "8092897";
            if (random_ejecutivo <= 4) {
                param_custentity143 = "11";
            } else if (random_ejecutivo >= 9) {
                param_custentity143 = "231";
            } else {
                param_custentity143 = "68";
            }

        } else if (param_country === "es") {

            param_subsidiary = "12";
            param_custentity137 = "2";
            param_currency = "4";
            param_leadsource = "8058843";
            if (random_ejecutivo <= 6) {
                param_custentity143 = "56";
            } else {
                param_custentity143 = "124";
            }

        } else if (param_country === "do") {

            param_subsidiary = "16";
            param_custentity137 = "7";
            param_currency = "7";
            param_custentity143 = "204";
            param_leadsource = "10357895";

        } else if (param_country === "br") {

            param_subsidiary = "11";
            param_custentity137 = "5";
            param_currency = "6";
            param_custentity143 = "";
            param_leadsource = "8078255";

        } else if (param_country === "us") {

            param_subsidiary = "15";
            param_custentity30 = "67";
            param_custentity137 = "6";
            param_leadsource = "10697380";
            param_currency = "2";
            param_custentity143 = "229";
        };

        var searchCreate_integracionFacebook = search.create({
            type: search.Type.CUSTOMER,
            filters: [
                {
                    "name": "email",
                    "operator": "is",
                    "values": [
                        param_email
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                }
            ],
            columns: [
                {
                    "name": "entityid",
                    "label": "ID",
                    "type": "text",
                    "sortdir": "ASC"
                }
            ]
        });

        var searchResults_integracionFacebook = searchCreate_integracionFacebook.run().getRange({
            start: 0,
            end: 1
        });

        var objSearchResults = JSON.parse(JSON.stringify(searchResults_integracionFacebook));

        if (objSearchResults.length > 0) {
            var idLead = objSearchResults[0].id;
            var objRecord_integracionFacebook = record.load({
                type: record.Type.LEAD,
                id: idLead,
                isDynamic: true
            });
        } else {
            var objRecord_integracionFacebook = record.create({
                type: record.Type.LEAD,
                isDynamic: true
            });
            objRecord_integracionFacebook.setValue({ fieldId: "custentity38", value: param_custentity38 });
            objRecord_integracionFacebook.setText({ fieldId: "custentity134", text: param_custentity134 });
        }

        objRecord_integracionFacebook.setValue({ fieldId: "subsidiary", value: param_subsidiary });
        objRecord_integracionFacebook.setText({ fieldId: "firstname", text: param_firstname });
        objRecord_integracionFacebook.setText({ fieldId: "lastname", text: param_lastname });
        objRecord_integracionFacebook.setText({ fieldId: "email", text: param_email });
        objRecord_integracionFacebook.setText({ fieldId: "mobilephone", text: param_mobilephone });
        objRecord_integracionFacebook.setText({ fieldId: "homephone", text: param_homephone });
        objRecord_integracionFacebook.setText({ fieldId: "comments", text: param_comments });
        objRecord_integracionFacebook.setText({ fieldId: "custentity138", text: param_custentity138 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity25", value: param_custentity25 });
        objRecord_integracionFacebook.setText({ fieldId: "custentity135", text: param_custentity135 });
        objRecord_integracionFacebook.setText({ fieldId: "custentity139", text: param_custentity139 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity30", value: param_custentity30 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity387", value: param_custentity387 });
        objRecord_integracionFacebook.setValue({ fieldId: "globalSubscriptionStatus", value: param_globalSubscriptionStatus });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity137", value: param_custentity137 });
        objRecord_integracionFacebook.setValue({ fieldId: "category", value: param_category });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity131", value: param_custentity131 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity132", value: param_custentity132 });
        objRecord_integracionFacebook.setText({ fieldId: "custentity133", text: param_custentity133 });
        objRecord_integracionFacebook.setText({ fieldId: "custentity136", text: param_custentity136 });
        objRecord_integracionFacebook.setValue({ fieldId: "leadsource", value: param_leadsource });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity142", value: param_custentity142 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity144", value: param_custentity144 });
        objRecord_integracionFacebook.setValue({ fieldId: "currency", value: param_currency });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity143", value: param_custentity143 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity155", value: param_custentity155 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity313", value: param_custentity313 });
        objRecord_integracionFacebook.setValue({ fieldId: "custentity_valoracion_online", value: param_custentity_valoracion_online });
        objRecord_integracionFacebook.setValue({ fieldId: "entitystatus", value: "17" });

        try {
            var idRecord_integracionFacebook = objRecord_integracionFacebook.save();
            log.debug("GOVERNANCE", scriptObj.getRemainingUsage());
            return {
                "RECORD_CREATED": idRecord_integracionFacebook
            }
        } catch (error) {
            log.debug("ERROR_RECORD", error);
            return {
                "ERROR_RECORD": error                
            }
        }
    }


    return {
        post: doPost
    }
});
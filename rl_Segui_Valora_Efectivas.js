/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doGet(params) { }

    function doPost(params) {
        //var objJson = JSON.parse(params);

        //var param_suc = objJson.suc;
        //var param_idCustomer = objJson.idCustomer || "";
        //var response = [];

        var searchGhost = search.load({
            id: "customsearch8176"
        });

        var searchCrate_valoracionesEfectivas = search.create({
            "type": search.Type.CUSTOMER,
            "filters": [
                {
                    "name": "subsidiary",
                    "operator": "anyof",
                    "values": [
                        "6"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "custentity25",
                    "operator": "anyof",
                    "values": [
                        "22",
                        "35",
                        "36",
                        "23",
                        "24",
                        "25",
                        "37",
                        "21",
                        "26",
                        "27",
                        "28"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "status",
                    "operator": "anyof",
                    "values": [
                        "13",
                        "17",
                        "23",
                        "26",
                        "8",
                        "39"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "custentity78",
                    "operator": "anyof",
                    "values": [
                        "@ALL@"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "custevent70",
                    "join": "event",
                    "operator": "anyof",
                    "values": [
                        "12"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "date",
                    "join": "event",
                    "operator": "within",
                    "values": [
                        "thismonthtodate"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "custevent1",
                    "join": "event",
                    "operator": "anyof",
                    "values": [
                        "4"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "title",
                    "join": "case",
                    "operator": "contains",
                    "values": [
                        "Historia Clínica"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                },
                {
                    "name": "custevent322",
                    "join": "case",
                    "operator": "anyof",
                    "values": [
                        "625788",
                        "734394",
                        "913519",
                        "489559",
                        "77721",
                        "123405",
                        "666006",
                        "863907",
                        "968035",
                        "913516",
                        "62854",
                        "858948",
                        "62853"
                    ],
                    "isor": false,
                    "isnot": false,
                    "leftparens": 0,
                    "rightparens": 0
                }
            ],
            "columns": []
        });


        var searchResult_Seguimiento = searchCrate_valoracionesEfectivas.run().getRange({
            start: 0,
            end: 1000
        });

        //var obj_result_Seguimiento = JSON.parse(JSON.stringify(searchResult_Seguimiento));

/*         for (var s in obj_result_Seguimiento) {
            if (obj_result_Seguimiento[s].values["call.status"].length > 0) {
                callStatus = obj_result_Seguimiento[s].values["call.status"][0].text;
            } else {
                callStatus = "";
            }
            response.push({
                idCustomer: obj_result_Seguimiento[s].id,
                entityid: obj_result_Seguimiento[s].values.entityid,
                altname: obj_result_Seguimiento[s].values.altname,
                email: obj_result_Seguimiento[s].values.email,
                mobilephone: obj_result_Seguimiento[s].values.mobilephone,
                call_status: callStatus,
                call_createddate: obj_result_Seguimiento[s].values["call.createddate"],
                message_subject: obj_result_Seguimiento[s].values["messages.subject"],
                message_isemailed: obj_result_Seguimiento[s].values["messages.isemailed"],
                message_senddate: obj_result_Seguimiento[s].values["messages.messagedate"]
            });
        } */

        return searchResult_Seguimiento;

    }

    return {
        //get: doGet,
        post: doPost
    };
});

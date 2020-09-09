/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doGet(params) { }

    function doPost(params) {
        var objJson;
        if (typeof params === "object") {
            objJson = params;
        } else {
            objJson = JSON.parse(params);
        }
        log.debug("params", objJson);

        // Params in JSON object
        var param_idEvent = objJson.idEvent;
        var param_startDate = objJson.startDate;
        var param_startTime = objJson.startTime;
        var param_cancellationStatus = objJson.cancellationStatus;

        // Globals
        var param_endTime;

        // SUPPORT ARRAYS
        var arr_endTime = [ // schedule arrangement set to 30 minutes
            "0000",
            "0030",
            "0100",
            "0130",
            "0200",
            "0230",
            "0300",
            "0330",
            "0400",
            "0430",
            "0500",
            "0530",
            "0600",
            "0630",
            "0700",
            "0730",
            "0800",
            "0830",
            "0900",
            "0930",
            "1000",
            "1030",
            "1100",
            "1130",
            "1200",
            "1230",
            "1300",
            "1330",
            "1400",
            "1430",
            "1500",
            "1530",
            "1600",
            "1630",
            "1700",
            "1730",
            "1800",
            "1830",
            "1900",
            "1930",
            "2000",
            "2030",
            "2100",
            "2130",
            "2200",
            "2230",
            "2300",
            "2330"
        ];

        // TODO: calculate end time of date
        if (param_endTime == "" || param_endTime == undefined) {
            for (var t in arr_endTime) {
                if (param_startTime == arr_endTime[t]) {
                    param_endTime = arr_endTime[parseInt(t) + 1];
                }
            }
        }

        // TODO: convert date in string to date in object
        //param_startDate = "30/08/2020";
        var c = objJson.startDate.split("/");
        param_startDate = parseInt(c[0]) + "/" + (parseInt(c[1]) + 1) + "/" + parseInt(c[2]);
        log.debug("fecha", param_startDate);


        try {
            // EDIT EVENT SHEDULE
            objRecord_updateEvent = record.load({ // Load an object Calendar Event
                type: record.Type.CALENDAR_EVENT,
                id: param_idEvent
            });

            if (param_cancellationStatus == true) {
                objRecord_updateEvent.setValue({
                    fieldId: "custevent1",
                    value: "9" // Por Reagendar
                });
                objRecord_updateEvent.setValue({
                    fieldId: "custevent80",
                    value: "11" // Cancelo - Por Reagendar
                });
                objRecord_updateEvent.setValue({
                    fieldId: "status",
                    value: "CANCELLED" // Cancelado
                });
            } else {
                objRecord_updateEvent.setText({ // Set fecha de evento
                    fieldId: "startdate",
                    text: param_startDate
                });
                objRecord_updateEvent.setText({ // Set hora inicial del evento
                    fieldId: "starttime",
                    text: param_startTime
                });
                objRecord_updateEvent.setText({ // Set hora final del evento
                    fieldId: "endtime",
                    text: param_endTime
                });
            }
            objRecord_updateEvent_id = objRecord_updateEvent.save({
                enableSourcing: false,
                ignoreMandatoryFields: true
            });

            return {
                //"objetctEvent": objRecord_updateEvent,
                "idEvent": objRecord_updateEvent_id
            };
        } catch (error) {
            log.error('ERR_UPDATE_EVENT', error);
            return {
                "ERR_UPDATE_EVENT": error,
                "startdate": param_startDate
            };
        }
    }

    return {
        post: doPost
    };
});
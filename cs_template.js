/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript   
 * @NModuleScope SameAccount or Public
 */

define([],
    function(){
        function pageInit(context) {
            log.debug("prueba context",context);
        }
        function lineInit() {

        }
        function fieldChanged() {

        }
        function sublistChanged() {

        }
        function postSourcing() {

        }
        function validateDelete() {

        }
        function validateField() {

        }
        function validateInsert() {

        }
        function validateLine() {

        }
        function localizationContextEnter() {

        }
        function localizationContextExit() {

        }

        return {
            pageInit: pageInit,
            lineInit: lineInit,
            fieldChanged: fieldChanged,
            sublistChanged: sublistChanged,
            postSourcing: postSourcing,
            validateDelete: validateDelete,
            validateField: validateField,
            validateInsert: validateInsert,
            validateLine: validateLine,
            localizationContextEnter: localizationContextEnter,
            localizationContextExit: localizationContextExit
        }

 });
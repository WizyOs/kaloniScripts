/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime", "N/query"],
   function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime, query) {
      function doGet(params) { 
         

         var recordLoad_vendbill = record.load({
            id: 639317,
            type: 'vendorbill'
         });

         var recordLoad_vendPayment = record.load({
            id: 655281,
            type: 'vendorpayment'
         });

         var recordLoad_journalEntry = record.load({
            id: 655282,
            type: record.Type.JOURNAL_ENTRY
         });

         return {
            vendorBill: recordLoad_vendbill,
            vendorPayment: recordLoad_vendPayment,
            journalEntry: recordLoad_journalEntry
         }
      }

      function doPost(params) {

         var objJson;
         if (typeof params === "object") {
            objJson = params;
         } else {
            objJson = JSON.parse(params);
         }
         log.debug("params", objJson);

        
      }

      return {
         get: doGet,
         post: doPost
      };
   });
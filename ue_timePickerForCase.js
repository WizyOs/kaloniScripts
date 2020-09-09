/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/log'], function(serverWidget, log) {

    function beforeLoad(context)
    {
       if(context.type == "edit")
       {
         try
         {
            // \ \ Creates a variable containing the current form
            var currentForm = context.form;
            var html = "<script>";
            /*html += "jQuery('head').append('<script type=\"text/javascript\" charset=\"utf-8\" src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js\" />');";
            html += "jQuery('head').append('<link rel=\"stylesheet\" type=\"text/css\"  href=\"https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css\" />');";
            html += "jQuery('head').append('<script type=\"text/javascript\" charset=\"utf-8\" src=\"https://cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js\" />');";
            html += 'jQuery(document).ready(function(){alert("Hello World");});';*/

            html += "jQuery('head').append('<script type=\"text/javascript\" charset=\"utf-8\" src=\"https://3559763.app.netsuite.com/core/media/media.nl?id=4288988&c=3559763&h=dbeee667d9fd2d663378&_xt=.js\" />');";
            html += "jQuery('head').append('<link rel=\"stylesheet\" type=\"text/css\"  href=\"https://3559763.app.netsuite.com/core/media/media.nl?id=4288990&c=3559763&h=297154edd5d31aa7234c&_xt=.css\" />');";
            html += "jQuery('head').append('<script type=\"text/javascript\" charset=\"utf-8\" src=\"https://3559763.app.netsuite.com/core/media/media.nl?id=4288994&c=3559763&h=ce582b1bbd83c46b62f9&_xt=.js\" />');";

            html += 'jQuery(document).ready(function(){$("#custevent99, #custevent100, #custevent105, #custevent106").timepicker({timeFormat:"h:mm p", interval:1, minTime: "6:00am", maxTime: "8:00pm", scrollbar:true});});'; // #time
            html += "</script>";
            var field = currentForm.addField({
                id: "custpage_timepicker_case", // Sets an internal ID for the new field
                label: "PRE-case", // Sets a label to the new field
                type: serverWidget.FieldType.INLINEHTML, // Sets a type to the new field using enum
            });
            field.defaultValue = html;
         }catch(e){
           log.debug('Exception log:', e);
         }
       }
    }

    return {
        beforeLoad: beforeLoad
    };
});

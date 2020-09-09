//Define the User Event function for a beforeLoad operation.
function beforeLoadCustomer(type, form)
{
 //var newRecord = nlapiGetNewRecord();
 //var subsidiaryField = newRecord.getFieldText('subsidiary');
 var rolid = nlapiGetRole();
 //nlapiLogExecution('DEBUG', 'rolid: ', rolid);

   if(rolid == "1187") // "1187 = Kaloni Hair - Injerto KHG"
   {
      form.getField('phone').setDisplayType('hidden');
      form.getField('mobilephone').setDisplayType('hidden');
      form.getField('homephone').setDisplayType('hidden');
      form.getField('email').setDisplayType('hidden');
   }
}
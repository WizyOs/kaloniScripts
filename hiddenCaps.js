//Define the User Event function for a beforeLoad operation.
function beforeLoadRegistro(type, form)
{
    //nlapiGetField('custentity391').setDisplayType('hidden');
   	// nlapiGetField('custentity387').setDisplayType('hidden');
   	 var role = nlapiGetRole();
 	//nlapiLogExecution('DEBUG', 'Rol: ', role);

   if(role == "1187") // "1187 = Kaloni Hair - Injerto KHG"
   {
      form.getField('phone').setDisplayType('hidden');
      form.getField('mobilephone').setDisplayType('hidden');
      form.getField('homephone').setDisplayType('hidden');
      form.getField('email').setDisplayType('hidden');
      form.getField('altemail').setDisplayType('hidden');
   }
  if(role == "1102") // "1187 = Kaloni Hair - Enfermeria KHG"
   {
      form.getField('phone').setDisplayType('hidden');
      form.getField('mobilephone').setDisplayType('hidden');
      form.getField('homephone').setDisplayType('hidden');
      form.getField('email').setDisplayType('hidden');
      form.getField('altemail').setDisplayType('hidden');
   }
}
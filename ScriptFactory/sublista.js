function beforeLoadSublist(type, form)
{
//Define the values of the beforeLoad type argument
if (type == 'edit' || type == 'view')
 {
 //Add a new tab to the form
 var sampleTab = form.addTab('custpage_sample_tab', 'Sample Tab');
 //Add a field to the new tab
 var newFieldEmail = form.addField('custpage_field_email', 'email', 'Alt Email', null,
'custpage_sample_tab');
 //Add a second field to the new tab
 var newFieldText = form.addField('custpage_field_text', 'textarea', 'Details', null,
 'custpage_sample_tab');
 //Add a subtab to the first tab
 var sampleSubTab = form.addSubTab('custpage_sample_subtab', 'Sample Subtab',
 'custpage_sample_tab');
 //Add a select field to the subtab
 var newSubField = form.addField('custpage_sample_field', 'select', 'My Customers', 'customer',
'custpage_sample_subtab');

 //Add a second subtab to the first tab
 var sampleSubTab = form.addSubTab('custpage_sample_subtab2', 'Second Sample Subtab',
 'custpage_sample_tab');
 //Add a field to the second subtab
 var newSubField = form.addField('custpage_sample_field2', 'select', 'My Employees', 'employee',
'custpage_sample_subtab2');
 }
}
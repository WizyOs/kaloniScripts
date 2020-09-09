function sendEmail_case{

var emailTempId = 6; // internal id of the email template created
var emailTemp = nlapiLoadRecord('emailtemplate',emailTempId); 
var emailSubj = emailTemp.getFieldValue('subject');
var emailBody = emailTemp.getFieldValue('content');
var records = new Object();
records['activity'] = 1030; //internal id of the case record
var supportcase = nlapiLoadRecord('supportcase', 1030); 
var renderer = nlapiCreateTemplateRenderer();
renderer.addRecord('case', supportcase ); 
renderer.setTemplate(emailSubj);
renderSubj = renderer.renderToString();
renderer.setTemplate(emailBody);
renderBody = renderer.renderToString();
nlapiSendEmail(-5, 'testemail@test.com', renderSubj, renderBody , null, null, records);

}
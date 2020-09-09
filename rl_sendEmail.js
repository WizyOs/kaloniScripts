function sendEmail()
{
    var fromId = -5; //Authors' Internal ID
    var toEmail = 'acolin@kaloni.com';
    var sbj = 'subject test';
    var msg = 'Pruebas User Event home';

    nlapiSendEmail(fromId, toEmail, sbj, msg, null, null, null, null, true, null, null);
}
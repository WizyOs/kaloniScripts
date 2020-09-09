function afterSubmitEmail(type)
{
//User event script deployed to purchase orders.
//Set the afterSubmit type to approve. As soon as the PO is 
//approved, an email is sent.
//if (type == 'approve')


//Get the user ID of the person approving the PO. This will be the email author.
var userId = nlapiGetUser();

//Send an email to the supervisor, K. Wolfe in this case.
var sendEmail = nlapiSendEmail(341116, 'gvasquez@kaloni.com', 'Nuevo lead', 'un nuevo cliente se agregado', null, null, 'customer', null);
}
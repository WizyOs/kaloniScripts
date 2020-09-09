function checkboxsuitelet(request, response)
{

var form = nlapiCreateForm('Invoice Page');

form.setScript('customscriptxx');

form.addButton('custpage_submit','Submit', "invoicelist();"); // add submit button which would in turn call a function named invoicelist in customscriptxxx 

var sublist = form.addSubList('custpage_mysublist','list','Invoice list');
    sublist.addMarkAllButtons(); 
    sublist.addRefreshButton(); // can make use of this method to perform refresh of list

// use sublist.addField to add fields to the sublist

 response.writePage(form);

}
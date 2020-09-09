//=================================================================================================================================
// Script File   : nsoInitializexml.js
// Script Type   : User Event
// Description   : Add button on form transaction to print cfd file
// Author        : Ivan Gonzalez - Netsoft
// Date          : 28-03-2011
//=================================================================================================================================

//--> On Before Submit Event
function nsoInitializexml_BeforeSubmit(type)
{
	if(type == 'create' || type == 'new' || type == "copy" ){
		var record = nlapiGetNewRecord();		
		nlapiSetFieldValue("custbody_cfdi_pdf", '');
		nlapiSetFieldValue("custbody_cfdixml", '');
		nlapiSetFieldValue("custbody_refpdf", '');
		nlapiSetFieldValue("custbody_uuid", '');
		nlapiSetFieldValue("custbody_cfdi_ref_xml", '');
		nlapiSetFieldValue("custbody_foliosat", '');
		nlapiSetFieldValue("custbody_refpdf", '');
	}
}


function nsoInitializerefpdf_clientevent(type, name, numline)
{		
	if(type == 'create' || type == "copy" || type == 'new'){					
		
		nlapiSetFieldValue("custbody_cfdi_pdf", '');
		nlapiSetFieldValue("custbody_cfdixml", '');
		nlapiSetFieldValue("custbody_refpdf", '');		
		nlapiSetFieldValue("custbody_uuid", '');
		nlapiSetFieldValue("custbody_cfdi_ref_xml", '');
		nlapiSetFieldValue("custbody_foliosat", '');
		nlapiSetFieldValue("custbody_refpdf", '');
	}
}

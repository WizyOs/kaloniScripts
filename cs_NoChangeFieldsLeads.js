var pageInitSubsidiary = null;
var pageInitAltname = null;
var pageInitFirstname = null;
var pageInitLastname = null;
var pageInitComments = null;
var pageInitPhone = null;
var pageInitSucursal = null;
var pageInitCanalDeOrigen = null;
var pageInitMedios = null;
var pageInitPaises = null;
var pageInitEstados = null;
var pageInitCategory = null;
var pageInitOnOfLine = null;
var pageInitTipoDeFormulario = null;
var pageInitUTMCampaing = null;
var pageInitUTMContent = null;
var pageInitUTMMedium = null;
var pageInitUTMSource = null;
var pageInitUTMTerm = null;
var pageInitCPelo = null;
var pageInitPrimaryCurrency = null;
var pageInitAvisoDePrivacidad = null;
var pageInitEjecutivaKCenter = null;
var pageInitNivel = null;
var pageInitValoracionOnline = null;
var pageInitINSITU = null;
var pageInitStatus = null;
var days = null;

function pageInitGetCurrentRecord(context){
      pageInitSubsidiary = null;
      pageInitSubsidiary = nlapiGetFieldValue('subsidiary');
  	  console.log("pageInitSubsidiary:  " + pageInitSubsidiary);

      pageInitAltname = null;
      pageInitAltname = nlapiGetFieldValue('altname');
  	  console.log("pageInitAltname:  " + pageInitAltname);

      pageInitFirstname = null;
      pageInitFirstname = nlapiGetFieldValue('firstname');
  	  console.log("pageInitFirstname:  " + pageInitFirstname);

      pageInitLastname = null;
      pageInitLastname = nlapiGetFieldValue('lastname');
  	  console.log("pageInitLastname:  " + pageInitLastname);

      pageInitComments = null;
      pageInitComments = nlapiGetFieldValue('comments');
  	  console.log("pageInitComments:  " + pageInitComments);

      pageInitPhone = null;
      pageInitPhone = nlapiGetFieldValue('phone');
  	  console.log("pageInitPhone:  " + pageInitPhone);

      pageInitSucursal = null;
      pageInitSucursal = nlapiGetFieldValue('custentity25');
  	  console.log("pageInitSucursal:  " + pageInitSucursal);

      pageInitCanalDeOrigen = null;
      pageInitCanalDeOrigen = nlapiGetFieldValue('custentity30');
  	  console.log("pageInitCanalDeOrigen:  " + pageInitCanalDeOrigen);

      pageInitMedios = null;
      pageInitMedios = nlapiGetFieldValue('custentity38');
  	  console.log("pageInitMedios:  " + pageInitMedios);

      pageInitPaises = null;
      pageInitPaises = nlapiGetFieldValue('custentity137');
  	  console.log("pageInitPaises:  " + pageInitPaises);

      pageInitEstados = null;
      pageInitEstados = nlapiGetFieldValue('custentity138');
  	  console.log("pageInitEstados:  " + pageInitEstados);

      pageInitCategory = null;
      pageInitCategory = nlapiGetFieldValue('category');
  	  console.log("pageInitCategory:  " + pageInitCategory);

      pageInitOnOfLine = null;
      pageInitOnOfLine = nlapiGetFieldValue('custentity131');
  	  console.log("pageInitOnOfLine:  " + pageInitOnOfLine);

      pageInitTipoDeFormulario = null;
      pageInitTipoDeFormulario = nlapiGetFieldValue('custentity132');
  	  console.log("pageInitTipoDeFormulario:  " + pageInitTipoDeFormulario);

      pageInitUTMCampaing = null;
      pageInitUTMCampaing = nlapiGetFieldValue('custentity135');
  	  console.log("pageInitUTMCampaing:  " + pageInitUTMCampaing);

	  pageInitUTMContent = null;
      pageInitUTMContent = nlapiGetFieldValue('custentity139');
  	  console.log("pageInitUTMContent:  " + pageInitUTMContent);

  	  pageInitUTMMedium = null;
      pageInitUTMMedium = nlapiGetFieldValue('custentity134');
  	  console.log("pageInitUTMMedium:  " + pageInitUTMMedium);

  	  pageInitUTMSource = null;
      pageInitUTMSource = nlapiGetFieldValue('custentity133');
  	  console.log("pageInitUTMSource:  " + pageInitUTMSource);

  	  pageInitUTMTerm = null;
      pageInitUTMTerm = nlapiGetFieldValue('custentity136');
  	  console.log("pageInitUTMTerm:  " + pageInitUTMTerm);

  	  pageInitCPelo = null;
      pageInitCPelo = nlapiGetFieldValue('custentity144');
  	  console.log("pageInitCPelo:  " + pageInitCPelo);

  	  pageInitPrimaryCurrency = null;
      pageInitPrimaryCurrency = nlapiGetFieldValue('currency');
  	  console.log("pageInitPrimaryCurrency:  " + pageInitPrimaryCurrency);

  	  pageInitAvisoDePrivacidad = null;
      pageInitAvisoDePrivacidad = nlapiGetFieldValue('custentity155');
  	  console.log("pageInitAvisoDePrivacidad:  " + pageInitAvisoDePrivacidad);

  	  pageInitEjecutivaKCenter = null;
      pageInitEjecutivaKCenter = nlapiGetFieldValue('custentity143');
  	  console.log("pageInitEjecutivaKCenter:  " + pageInitEjecutivaKCenter);

  	  pageInitNivel = null;
      pageInitNivel = nlapiGetFieldValue('custentity313');
  	  console.log("pageInitNivel:  " + pageInitNivel);

  	  pageInitValoracionOnline = null;
      pageInitValoracionOnline = nlapiGetFieldValue('custentity_valoracion_online');
  	  console.log("pageInitValoracionOnline:  " + pageInitValoracionOnline);

  	  pageInitINSITU = null;
      pageInitINSITU = nlapiGetFieldValue('custentity387');
  	  console.log("pageInitINSITU:  " + pageInitINSITU);

   	  pageInitStatus = null;
      pageInitStatus = nlapiGetFieldValue('entitystatus');
  	  console.log("pageInitStatus:  " + pageInitStatus);

	  var requestUrl = nlapiResolveURL('Suitelet', 'customscript1052', 'customdeploy1');
  	  console.log("requestUrl: " + requestUrl);
      var response = nlapiRequestURL(requestUrl + '&emailToFind=aig_15_krazy@hotmail.com', null, null, null); // /app/site/hosting/scriptlet.nl?script=1052&deploy=1
      console.log("response.body: " + response.body);
  	  alert("response.body: " + response.body);

      pageInitId = nlapiGetFieldValue('id');
  	  console.log("pageInitId:  " + pageInitId);
  	  var laadRecord = nlapiLoadRecord('Lead', pageInitId);
  	  var pageInitDatecreated = laadRecord.getFieldValue('datecreated');
  	  console.log("pageInitDatecreated:  " + pageInitDatecreated);
  	  //var pageInitDatecreated = nlapiGetFieldValue('datecreated');
  	  var pageInitDatecreated_Array = pageInitDatecreated.split(' ');
  	  var pi_datecreated = pageInitDatecreated_Array[0];
  	  var pi_datecreated_Array = pi_datecreated.split('/');
  	  pi_datecreated = pi_datecreated_Array[1] + "/" + pi_datecreated_Array[0] + "/" + pi_datecreated_Array[2];
      console.log("pi_datecreated:  " + pi_datecreated);

  	  var CurrentDate = new Date(); // hora del servidor Los Angeles California (Hotario cambia en Marzo)
      var day = CurrentDate.getDate();
      var month = CurrentDate.getMonth();
      month++;
      var year = CurrentDate.getFullYear();
      var dateToday =  month + '/' + day + '/' + year;
      console.log("dateToday:  " + dateToday);

  	  days = datediff(parseDate(pi_datecreated), parseDate(dateToday));
  	  console.log("days:  " + days);
}

function validateField(type, name)
{
  if(days <= 90) // 90 323
  {
	if(name === 'subsidiary')
    {
        //get the new value
        var newBodyFieldValue = nlapiGetFieldValue('subsidiary');
  		//console.log("newBodyFieldValue:  " + newBodyFieldValue);

        //find the old value
        var oldBodyFieldValue = pageInitSubsidiary;
  	    //console.log("oldBodyFieldValue:  " + oldBodyFieldValue);

        if(newBodyFieldValue !== oldBodyFieldValue)
        {
		   nlapiSetFieldValue('subsidiary', oldBodyFieldValue, false);
           //alert("This Field is not Allowed to edit");
        }
        return true ;
    }
	if(name === 'altname')
    {
        var newBodyFieldValue = nlapiGetFieldValue('altname');
        var oldBodyFieldValue = pageInitAltname;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('altname', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'firstname')
    {
        var newBodyFieldValue = nlapiGetFieldValue('firstname');
        var oldBodyFieldValue = pageInitFirstname;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('firstname', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'lastname')
    {
        var newBodyFieldValue = nlapiGetFieldValue('lastname');
        var oldBodyFieldValue = pageInitLastname;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('lastname', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'comments')
    {
        var newBodyFieldValue = nlapiGetFieldValue('comments');
        var oldBodyFieldValue = pageInitComments;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('comments', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'phone')
    {
        var newBodyFieldValue = nlapiGetFieldValue('phone');
        var oldBodyFieldValue = pageInitPhone;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('phone', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity25') // pageInitSucursal
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity25');
        var oldBodyFieldValue = pageInitSucursal;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity25', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity30') // pageInitCanalDeOrigen
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity30');
        var oldBodyFieldValue = pageInitCanalDeOrigen;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity30', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity38') // pageInitMedios
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity38');
        var oldBodyFieldValue = pageInitMedios;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity38', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity137') // pageInitPaises
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity137');
        var oldBodyFieldValue = pageInitPaises;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity137', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity138') // pageInitEstados
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity138');
        var oldBodyFieldValue = pageInitEstados;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity138', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'category') // pageInitCategory
    {
        var newBodyFieldValue = nlapiGetFieldValue('category');
        var oldBodyFieldValue = pageInitCategory;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('category', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity131') // pageInitOnOfLine
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity131');
        var oldBodyFieldValue = pageInitOnOfLine;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity131', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity132') // pageInitTipoDeFormulario
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity132');
        var oldBodyFieldValue = pageInitTipoDeFormulario;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity132', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity135') // pageInitUTMCampaing
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity135');
        var oldBodyFieldValue = pageInitUTMCampaing;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity135', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity139') // pageInitUTMContent
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity139');
        var oldBodyFieldValue = pageInitUTMContent;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity139', oldBodyFieldValue, false);

        return true ;
    }
  	if(name === 'custentity134') // pageInitUTMMedium
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity134');
        var oldBodyFieldValue = pageInitUTMMedium;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity134', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity133') // pageInitUTMSource
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity133');
        var oldBodyFieldValue = pageInitUTMSource;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity133', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity136') // pageInitUTMTerm
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity136');
        var oldBodyFieldValue = pageInitUTMTerm;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity136', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity144') // pageInitCPelo
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity144');
        var oldBodyFieldValue = pageInitCPelo;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity144', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'currency') // pageInitPrimaryCurrency
    {
        var newBodyFieldValue = nlapiGetFieldValue('currency');
        var oldBodyFieldValue = pageInitPrimaryCurrency;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('currency', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity155') // pageInitAvisoDePrivacidad
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity155');
        var oldBodyFieldValue = pageInitAvisoDePrivacidad;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity155', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity143') // pageInitEjecutivaKCenter
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity143');
        var oldBodyFieldValue = pageInitEjecutivaKCenter;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity143', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity313') // pageInitNivel
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity313');
        var oldBodyFieldValue = pageInitNivel;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity313', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity_valoracion_online') // pageInitValoracionOnline
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity_valoracion_online');
        var oldBodyFieldValue = pageInitValoracionOnline;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity_valoracion_online', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'custentity387') // pageInitINSITU
    {
        var newBodyFieldValue = nlapiGetFieldValue('custentity387');
        var oldBodyFieldValue = pageInitINSITU;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('custentity387', oldBodyFieldValue, false);

        return true ;
    }
	if(name === 'entitystatus') // pageInitStatus
    {
        var newBodyFieldValue = nlapiGetFieldValue('entitystatus');
        var oldBodyFieldValue = pageInitStatus;
        if(newBodyFieldValue !== oldBodyFieldValue)
		   nlapiSetFieldValue('entitystatus', oldBodyFieldValue, false);

        return true ;
    }
  }

  return true;
}



// new Date("dateString") is browser-dependent and discouraged, so we'll write a simple parse function for U.S. date format (which does no error checking)
function parseDate(str) {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
}
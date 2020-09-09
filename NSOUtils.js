//============================================================================================================================================================
// Script File	: Utils.js
// Script Type  : Client / User Event
// Description 	: Utils
// Author		: Gerardo A. Luna - Netsoft
// Date			: 19-06-2009
//============================================================================================================================================================


function NSOAddColumnFieldValue()
{
	
}
/*--------------- Utility Functions To Manage Script Files ---------------*/

function nsoGetFileInfo(name)
{
	var objRet = null;

	var results = nlapiSearchGlobal(name);
	
	for(var i = 0; results != null && i < results.length; i++)
	{
		if(results[i].getRecordType() == "file")
		{
			objRet = nlapiLoadFile(results[i].getId());
			break;
		}
	}
	
	return objRet;
}

/*--------------- Utility Functions To Manage Strings & Numbers ------------*/

function nsoParseFloatOrZero(f)
{
   var r=parseFloat(f);
   return isNaN(r) ? 0 : r;
}

function nsoParseIntOrZero(i)
{
   var r=parseInt(i);
   return isNaN(r) ? 0 : r;
}

function nsoReplace(texto,s1,s2){
	return texto.split(s1).join(s2);
}

function nsoIsNull(value)
{
	return (value == null) ? '' : value;
}

function nsoIsNull2(value, replaceby)
{
	return (value == null) ? replaceby : value;
}

function nsoIsNull3(value, defaul)
{
	return (value == '') ? defaul : value;
}

function nsoLTrim(s){
	// Devuelve una cadena sin los espacios del principio
	var i=0;
	var j=0;
	
	// Busca el primer caracter <> de un espacio
	for(i=0; i<=s.length-1; i++)
		if(s.substring(i,i+1) != ' ' && s.substring(i,i+1) != ''){
			j=i;
			break;
		}
	return s.substring(j, s.length);
}

function nsoRTrim(s)
{
	// Quita los espacios en blanco del final de la cadena
	var j=0;
	
	// Busca el �ltimo caracter <> de un espacio
	for(var i=s.length-1; i>-1; i--)
		if(s.substring(i,i+1) != ' ' &&  s.substring(i,i+1) != ''){
			j=i;
			break;
		}
	return s.substring(0, j+1);
}

function nsoTrim(s)
{
	return nsoLTrim(nsoRTrim(s));
}

function nsoRight(str, n)
{
      if (n <= 0)
          return "";
      else if (n > String(str).length)
          return str;
      else
   {
          var iLen = String(str).length;
          return String(str).substring(iLen, iLen - n);
      }
}

function nsoLeft(str, n)
{
   if (n <= 0)
         return "";
   else if (n > String(str).length)
         return str;
   else
         return String(str).substring(0,n);
}

function nsoFormatInteger(number, digits)
{
	var wnumber = number.toString();
	
	if (wnumber.length < digits)
	{
		for (var i = 1; i <= digits - number.toString().length; i++)
		{
			wnumber = "0" + wnumber.toString();
		}
	}
	
	return wnumber;
}

/*--------------- Utility Functions To Getting Stocks ---------------*/

function nsoGetQtyOnHand(itemrecord, location)
{
	var quantity = 0;
	
	for(var i = 1 ; i <= itemrecord.getLineItemCount('locations'); i++)
	{
		if (itemrecord.getLineItemValue('locations', 'location', i) == location)
		{
			quantity = itemrecord.getLineItemValue('locations', 'quantityonhand', i);
			quantity = isNaN(quantity) || quantity == null ? 0 : parseFloat(quantity);
			break;
		}
	}
	
	return quantity;
}

function nsoGetQtyAvailable(itemrecord, location)
{
	var quantity = 0;
	
	for(var i = 1 ; i <= itemrecord.getLineItemCount('locations'); i++)
	{
		if (itemrecord.getLineItemValue('locations', 'location', i) == location)
		{
			quantity = itemrecord.getLineItemValue('locations', 'quantityavailable', i);
			quantity = isNaN(quantity) || quantity == null ? 0 : parseFloat(quantity);
			break;
		}
	}
	
	return quantity;
}

function nsoGetQtyOnHandBySubsidiary(itemrecord, subsidiay)
{

	var quantity = 0;
	
	var location_searchresults = getSubsidiaryLocations(subsidiay, true);
	
	for(var i = 1 ; itemrecord != null && i <= itemrecord.getLineItemCount('locations'); i++)
	{
		var location = itemrecord.getLineItemValue('locations', 'location', i);
		
		if ( nsoExistsItemInSearchResults(location_searchresults, "internalid", location)  )
		{
			var qtyonhand = parseFloat(itemrecord.getLineItemValue('locations', 'quantityonhand', i));
			qtyonhand = isNaN(qtyonhand) ? 0 : qtyonhand;
			quantity += qtyonhand
		}
	}
	
	return quantity;	
}

/*--------------- Utility Functions To Getting Records ---------------*/

function nsoGetEntityRecord(id)
{
	var itemrecord = null;

	var searchresults = nlapiSearchRecord('entity', null, new nlobjSearchFilter('internalid', null, 'is', id));
	
	if (searchresults != null && searchresults.length > 0)
	{
		itemrecord = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId());
	}
	
	return itemrecord;
}

function nsoGetItemRecord(id)
{
	var itemrecord = null;

	var searchresults = nlapiSearchRecord('item', null, new nlobjSearchFilter('internalid', null, 'is', id));
	
	if (searchresults != null && searchresults.length > 0)
	{
		itemrecord = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId());
	}
	
	return itemrecord;
}

function nsoGetTranRecord(id, dynamic)
{
	var itemrecord = null;

	if (id != null && id != "")
	{
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('internalid', null, 'is', id);
		filters[1] = new nlobjSearchFilter('mainline', null, 'is', "T");		
		var searchresults = nlapiSearchRecord('transaction', null, filters, null);
		
		if (searchresults != null && searchresults.length > 0)
		{
			itemrecord = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId(), dynamic == true ? {recordmode:'dynamic'} :  null);
		}
	}
	
	return itemrecord;
}

function nsoGetSubsidiaryRecord(id)
{
	var subsidiaryrecord = null;

	if (id != null && id != "")
	{
		var filters = new Array();
		filters[0] = new nlobjSearchFilter('internalid', null, 'is', id);
		var searchresults = nlapiSearchRecord('subsidiary', null, filters, null);
		
		if (searchresults != null && searchresults.length > 0)
		{
			subsidiaryrecord = nlapiLoadRecord(searchresults[0].getRecordType(), searchresults[0].getId());
		}
	}
	
	return subsidiaryrecord;
}

function nsoGetAccountingPeriod(id)
{
	var periodRecord = null;
	
	var filters = new Array();
	
	filters[0] = new nlobjSearchFilter("internalid", null, "anyof", id, null);
	
	var results = nlapiSearchRecord("accountingperiod", null, filters, null);	
	
	if(results != null && results.length > 0)
	{
		periodRecord = nlapiLoadRecord(results[0].getRecordType(), results[0].getId());
	}
	
	return periodRecord;	
}

function nsoSearchAccountingPeriod(year, month)
{
    var period = null;
    var startdate = new Date();
    startdate.setDate(1);
    startdate.setFullYear(year);
    startdate.setMonth((month - 1))
    var enddate = nlapiAddMonths(startdate, 1);
    enddate = nlapiAddDays(enddate, -1);
    var filters = new Array();
    filters[0] = new nlobjSearchFilter("startdate", null, "onorafter", startdate, null);
    filters[1] = new nlobjSearchFilter("enddate", null, "onorbefore", enddate, null);
    var results = nlapiSearchRecord("accountingperiod", null, filters, null);
    if(results != null && results.length > 0)
    {
        period = results[0].getId();
    }
    return period;
}

function nsoGetProcessBookRecord(process, date)
{
	var procBookRecord = null;
	
	var filters = new Array();
	
	filters[0] = new nlobjSearchFilter("custrecord_procbook_date", null, "on", date, null);
	
	filters[1] = new nlobjSearchFilter("custrecord_procbook_process", null, "anyof", process, null);
	
	var results = nlapiSearchRecord("customrecord_process_book", null, filters, null);	
	
	if(results != null && results.length > 0)
	{
		procBookRecord = nlapiLoadRecord(results[0].getRecordType(), results[0].getId());
	}
	
	return procBookRecord;	
}

function nsoCreateProcessBookRecord(process, date)
{
	var day = date;
	
	var procBookRecord = null;

	if(day == null){ day = new Date(); day = nlapiDateToString(day); }
	
	procBookRecord = nsoGetProcessBookRecord(process, day);
	
	if(procBookRecord ==  null)
	{
		var procBookRecord = nlapiCreateRecord("customrecord_process_book");
		
		procBookRecord.setFieldValue("custrecord_procbook_date", day);
		
		procBookRecord.setFieldValue("custrecord_procbook_process", process);
		
		var id = nlapiSubmitRecord(procBookRecord, true);
		
		procBookRecord = nlapiLoadRecord("customrecord_process_book", id);
	}
	
	return procBookRecord;
}

function nsoCreateNoteProcessBook(typeProcessId, title, detail)
{
	var procBookRecord = nsoCreateProcessBookRecord(typeProcessId, null);
	
	var noteRecord = nlapiCreateRecord("note");
	
	noteRecord.setFieldValue("recordtype", 71); //--> Bit�cora Processos (customrecord_process_book)
	
	noteRecord.setFieldValue("record", procBookRecord.getId());
	
	noteRecord.setFieldValue("title", title);
	
	noteRecord.setFieldValue("note", detail);
	
	nlapiSubmitRecord(noteRecord);
}

function nsoGetTranLocation(recordtype, id)
{
	var location = '';
	
	if(id != null && id != "")
	{
		var searchresults = nlapiSearchRecord('transaction', null, new nlobjSearchFilter('internalid', null, 'anyof', id));
		
		if (searchresults != null && searchresults.length > 0)
		{
			location = nlapiLookupField(searchresults[0].getRecordType(),  searchresults[0].getId(), "location");
		}
	}
	
	return location;
}

function nsoExistsTranId(tranid, trantype, id)
{
	var retval = false;

	var searchresults = nlapiSearchGlobal(tranid);
	
	for ( var i = 0; searchresults != null && i < searchresults.length; i++ )
	{
		var wid = searchresults[i].getId( );
		
		var wrectype = searchresults[i].getRecordType( );

		if ( wrectype == trantype && wid != id) 
		{
			var wtraid = nlapiLookupField(wrectype, wid, "tranid");
			
			if (wtraid == tranid)
			{
				retval = true;
				break;
			}
		}
	}
	
	return retval;
}

/*--------------- Utility Functions To Manage Virtual Machines ---------------*/

function nsoExistsItem(type, field, id)
{
	var wretval = false;

	var wtot_items = nlapiGetLineItemCount(type);
	
	for ( var i = 1; i <= wtot_items ; i++ )
	{
		var wid = nlapiGetLineItemValue(type, field, i);
		
		if(wid == id)
		{
			wretval = true;
			break;
		}
	}
	
	return wretval;
}

function nsoIsCurrentLineItemDuplicated(type, fields)
{
	var isduplicated = false;
	var index = nlapiGetCurrentLineItemIndex(type);
	var count = nlapiGetLineItemCount(type);
	
	for ( var i = 1; i <= count; i++ )
	{
		if ( i != index)
		{
			isduplicated = true;
		
			for(var field in fields)
			{
				var value = nlapiGetLineItemValue(type, field, i);
				
				if ( value != fields[field])
				{
					isduplicated = false;
					break;
				}
			}
			
			if(isduplicated == true) break;
		}
	}
	
	return isduplicated;
}

/*--------------- Utility Functions To Manage Records ---------------*/

function nsoExistsItemOnRecord(record, type, field, value)
{
	var retval = false;
	
	for(var i = 1; record != null && i <= record.getLineItemCount(type); i++)
	{
		var val = record.getLineItemValue(type, field, i);
		
		if(value == val)
		{
			retval = true;
			break;
		}
	}
	
	return retval;
}

function nsoGetLineItemIndex(record, type, fields)
{
	var retval = -1;
	
	for ( var i = 1; record != null && i <= record.getLineItemCount(type); i++ )
	{
		var bexists = true;
		
		for(var field in fields)
		{
			var value = record.getLineItemValue(type, field, i);
			
			if ( value != fields[field])
			{
				bexists = false;
				break;
			}
		}
		
		if(bexists == true)
		{
			retval = i;
			break;
		}
	}
	
	return retval;
	
}

/*------------ Utility Functions To Manage Search Results ------------*/

function nsoExistsItemInSearchResults(searchresults, field, value)
{
	var retval = false;

	for ( var i = 0; searchresults != null && i < searchresults.length ; i++ )
	{
		var fieldvalue = searchresults[i].getValue(field);
		
		if (fieldvalue == value)
		{
			retval = true;
			break;
		}
	}
	
	return retval;
}

function nsoGetIndexInSearchResults(searchresults, field, value)
{
	var retval = -1;

	for ( var i = 0; searchresults != null && i < searchresults.length ; i++ )
	{
		var fieldvalue = searchresults[i].getValue(field);
		
		if (fieldvalue == value)
		{
			retval = i;
			break;
		}
	}
	
	return retval;
}

function nsoGetValueOfSearchResults(searchresults, field, value, retfield)
{
	var retval = "";

	for ( var i = 0; searchresults != null && i < searchresults.length ; i++ )
	{
		var fieldvalue = searchresults[i].getValue(field);
		
		if (fieldvalue == value)
		{
			retval = searchresults[i].getValue(retfield);
			break;
		}
	}
	
	return retval;
}

/*---------------- Utility Functions To Manage Search Columns ----------------*/
function nsoGetSearchColumn(arrcols, name, formula)
{
	var col = null;
	
	for(var k in arrcols)
	{
		if(arrcols[k].name == name && nsoIsNull(arrcols[k].formula) == nsoIsNull(formula))
		{
			col = arrcols[k];
			break;
		}
	}
	
	return col;
}

/*----------------- Utility Functions To Manage Year Records -----------------*/

function nsoGetYearRecords()
{
	var filters = new Array();
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('internalid');	
	columns[1] = new nlobjSearchColumn('name');	
	var searchresults = nlapiSearchRecord( 'customlist_year', null, null, columns );
	return searchresults;
}

function nsoGetYearId(years, year)
{
	var retval = "";
	
	for(var i = 0; years != null && i < years.length; i++)
	{
		var wname = years[i].getValue("name");
		
		if(wname == year)
		{
			retval = years[i].getId();
			break;
		}
	}
	
	return retval;
}

function nsoDiffArrays(v, c, m)
{
    var d = [], e = -1, h, i, j, k;
    for(i = c.length, k = v.length; i--;){
        for(j = k; j && (h = c[i] !== v[--j]););
        h && (d[++e] = m ? i : c[i]);
    }
    return d;
}

//diff = function(v, c, m){
//    var d = [], e = -1, h, i, j, k;
//    for(i = c.length, k = v.length; i--;){
//        for(j = k; j && (h = c[i] !== v[--j]););
//        h && (d[++e] = m ? i : c[i]);
//    }
//    return d;
//};

/*---------------- Utility Functions To Convert number to currency with delimiter ',' ----------------*/
function nsoNumberToCurrency(numb)
{ 
	var sRes = "";
	var snumb = numb.toString();
	var lResult = snumb.indexOf(".");
	if ( lResult > 1)
	{
		// tiene decimales
		var nNmb = snumb.split(".");
		for (var j, i = nNmb[0].length - 1, j = 0; i >= 0; i--, j++)
		{
			sRes = nNmb[0].charAt(i) + ((j > 0) && (j % 3 == 0)? ",": "") + sRes;
		}
		sRes = sRes +"."+ nNmb[1];
	}
	else
	{
		var nNmb = snumb;
		// numero entero
		for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++) 
			sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ",": "") + sRes; 
	}
    return sRes; 
}

function nsoFormatDateNow()
{
	var mydate = new Date();
	var year = mydate.getYear();
	if (year < 1000)
		year += 1900;
	var day = mydate.getDay();
	var month = mydate.getMonth()+1;
	if (month<10)
		month = "0" + month;
	var daym = mydate.getDate();
	if (daym<10)
		daym = "0" + daym;
	return daym + "/" + month + "/" + year;
}


//--> On Init-Page
function nsoDoNothing()
{
	
}

function formatNumber(num)
{
	if(num== null || num <= 0)
		return '';
		
	var obj    = {entero:null,decimal:null};
	num = num.toString();
	var arrnum = num.split('.');
	obj.entero = arrnum[0];
	if(arrnum[1]== null)
	{
		obj.decimal = '00';
	}
	else
	{
		obj.decimal = arrnum[1];
		if(arrnum[1].length==1)
			obj.decimal = obj.decimal + '0';
	}
	var regx = /(\d+)(\d{3})/;
	while (regx.test(obj.entero)) 
	{
		obj.entero = obj.entero.replace(regx, '$1' + ',' + '$2');
	}
	return '$ ' + obj.entero + '.' + obj.decimal;
}
	
	
//function formatNumber(num)
//{
//	var prefix = prefix || '';
//	num += '';
//	var splitStr = num.split('.');
//	var splitLeft = splitStr[0];
//	var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '.00';
//	var regx = /(\d+)(\d{3})/;
//	while (regx.test(splitLeft)) 
//	{
//		splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
//	}
//	return '$ ' + prefix + splitLeft + splitRight;
//}

function nsoFormatDateToString(wdate)
{
	var mydate = wdate;
	var year = mydate.getFullYear();
	if (year < 1000)
		year += 1900;
	var day = mydate.getDay();
	var month = mydate.getMonth()+1;
	if (month<10)
		month = "0" + month;
	var daym = mydate.getDate();
	if (daym<10)
		daym = "0" + daym;
	return daym + "/" + month + "/" + year;
}
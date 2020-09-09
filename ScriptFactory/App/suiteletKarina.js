function printItemBarcode(request, response) //printItemBarcode
{
  //retrieve the record id passed to the Suitelet
  var recId = request.getParameter('id');

  //load the record
  var recPO = nlapiLoadRecord('purchaseorder', recId);
  
  //check the number of line items
  var lineCount = recPO.getLineItemCount('item');
  
  //create a table to present the line items
  var strName = "<table width=\"400\">";
  strName += "<tr>";
  strName += "<td width=\"20\%\"><b>Item</b></td>";
  strName += "<td width=\"15\%\"><b>Rate</b></td>";
  strName += "<td width=\"30\%\" align=\"center\"><b>Barcode</b></td>";
  strName += "<td width=\"15\%\"><b>Quantity</b></td>";
  strName += "<td width=\"20\%\" align=\"center\"><b>Amount</b></td>";
  strName += "</tr>";

  //iterate through each item
  for (var x = 1; x <= lineCount; x++)
  {
    strName += "<tr><td>";

    // note the use of nlapiEscapeXML to escape any special characters, 
    // such as an ampersand (&) in any of the item names
    strName += nlapiEscapeXML(recPO.getLineItemText('item', 'item', x));
    strName += "</td>";
    strName += "<td>";
    strName += recPO.getLineItemValue('item','rate', x);
    strName += "</td>";
    strName += "<td>";
    strName += "<barcode codetype=\"code128\" showtext=\"true\" value=\"";
    strName += recPO.getLineItemValue('item','rate', x);
    strName += "\"/>";
    strName += "</td>";
    strName += "<td align=\"center\">";
    strName += recPO.getLineItemValue('item','quantity', x);
    strName += "</td>";
    strName += "<td align=\"right\">";
    strName += recPO.getLineItemValue('item','amount', x);
    strName += "</td></tr>";
  }
  strName += "</table>";  

  // build up BFO-compliant XML using well-formed HTML
  var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
  xml += "<pdf>\n<body font-size=\"12\">\n<h3>Purchase Order Items with Barcode</h3>\n";
  xml += "<p></p>";
  xml += strName;
  xml += "</body>\n</pdf>";

  // run the BFO library to convert the xml document to a PDF 
  var file = nlapiXMLToPDF( xml );

  // set content type, file name, and content-disposition (inline means display in browser)
  response.setContentType('PDF','PO_Item_Barcode.pdf', 'inline');

  // write response to the client
  response.write( file.getValue() );   
}
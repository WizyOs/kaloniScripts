function reporteGoogle1(){

		var fromId = -5; //Authors' Internal ID
		var sbj = 'Prueba ';
		var msg = 'Mensaje de prueba para mail reporteGoogle';
		var xmlString = 'Archivo de prueba para mail reporteGoogle';

		var pdfFile = nlapiXMLToPDF(xmlString);
		//attach generated PDF 
		nlapiSendEmail(fromId, 'kavila@kaloni.com', sbj, msg, null, null, null, pdfFile);

}
/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define(['N/record','N/log','N/file','N/render','N/url','N/search'],

function(record,log,file,render,url,search) {

    function onRequest(context) {
      log.debug('title', context.request.method);
      var emp = record.load({type: 'employee', id: '637079'});
      emp.save();
      /*
          var xml = '';
    xml += '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
    xml += '<pdf>';
    xml += '<head>';
    xml += '<macrolist>';
    xml += '<macro id="myheader">' + 'TEST' + '</macro>';
    xml += '</macrolist>';
    xml += '</head>';
    xml += '<body size="letter" header="myheader" header-height="20mm" footer="myfooter" footer-height="30mm" background="red">';
    xml += 'TEST';
    xml += '</body></pdf>';
      var reVar = render.xmlToPdf({xmlString: xml});
      reVar.name = 'renderPDF.pfd';
      reVar.folder = '1358206';
      var idfile = reVar.save();
      /*var urlFile = url.resolveRecord({recordType: 'file', recordId: idfile});
      log.debug('url', urlFile);
      
      // var newFile = file.create({name: 'testPDF.pdf', fileType: file.Type.PDF, contents: xml});
      var val = search.lookupFields({type: 'file', id: idfile, columns: ['url', 'name']});
      log.debug('val', val);
      context.response.renderPdf({xmlString: xml});
      */
      /*
      var file1 = file.load({id: '1919136'});
      var conFile1 = file1.getContents();
      var newFile = file.create({name: 'testPDF.pdf', fileType: file1.fileType, contents: conFile1});
      newFile.folder = '1358206';
      newFile.save();
      // context.response.writeFile({file: file1});
      context.response.writePage({pageObject: conFile1});
      */
    }

    return {

        onRequest: onRequest

    };

});

/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define([
    "N/ui/serverWidget",
    "N/url",
    "N/https",
    "N/file",
    "N/record",
    "N/xml",
    "N/runtime",
    "N/search"
  ], function(widget, url, https, file, record, xml, runtime, search) {
    function onRequest(context) {
      var arr_valueImages = [];
  
      if (context.request.method === "GET") {
        var titleForm_visalisizeImages = "Visualización de Imágenes";
  
        log.debug("context", context.request.parameters);
  
        var customerId = context.request.parameters.customerId;
        var parentRecId = context.request.parameters.parentRecId;
        var recId = context.request.parameters.recId;
        var numProc = context.request.parameters.numProc;
        var review = context.request.parameters.review;
        var customform = context.request.parameters.cf;
  
        var objRecord = record.load({
          type: "customer",
          id: customerId,
          isDynamic: false
        });
        var idCustomerText = objRecord.getText({ fieldId: "entityid" });
        var nameFolderCustomer = idCustomerText + "_FOLDER";
        var noImageObj = file.load({ id: 1592235 });
        var idRootFolder = null;
        var arr_preValueImages = new Array(24);
        arr_valueImages = new Array(24);
        var arr_nameFolderReview = [
          "R24HORAS",
          "R10DIAS",
          "R1MES",
          "R2MESES",
          "R3MESES",
          "R4MESES",
          "R5MESES",
          "R6MESES",
          "R7MESES",
          "R8MESES",
          "R9MESES",
          "R10MESES",
          "R11MESES",
          "R12MESES",
          "R13MESES",
          "R14MESES"
        ];
        var arr_titlesReview = [
          "24 HORAS",
          "10 DIAS",
          "1 MES",
          "2 MESES",
          "3 MESES",
          "4 MESES",
          "5 MESES",
          "6 MESES",
          "7 MESES",
          "8 MESES",
          "9 MESES",
          "10 MESES",
          "11 MESES",
          "12 MESES",
          "13 MESES",
          "14 MESES"
        ];
  
        if (review != "") {
          try {
            search.create({
                type: search.Type.FOLDER,
                filters: [
                  search.createFilter({
                    name: "name",
                    operator: search.Operator.IS,
                    values: [nameFolderCustomer]
                  })
                ],
                columns: ["internalid"]
              })
              .run()
              .each(function(result) {
                idRootFolder = result.getValue({ name: "internalid" });
              });
  
            //log.debug('id Client Folder', idRootFolder);
  
            search.create({
                type: search.Type.FOLDER,
                filters: [
                  search.createFilter({
                    name: "name",
                    operator: search.Operator.IS,
                    values: [arr_nameFolderReview[review - 1]],
                    isor: false
                  }),
                  search.createFilter({
                    name: "parent",
                    operator: search.Operator.IS,
                    values: [idRootFolder]
                  })
                ],
                columns: ["internalid", "name"]
              }).run().each(function(result) {
                idReviewFolder = result.getValue({ name: "internalid" });
                nameReviewFolder = result.getValue({ name: "name" });
              });
  
            log.debug(
              "id Review Folder",
              idReviewFolder + " " + nameReviewFolder
            );
  
            var searchImages = search.load({
              id: "customsearch7172"
            });
  
            var filterFolder = search.createFilter({
              name: "folder",
              operator: search.Operator.IS,
              values: [idReviewFolder]
            });
  
            var filterName = search.createFilter({
              name: "name",
              operator: search.Operator.CONTAINS,
              values: [recId + "_numProc_" + numProc + "_rev_" + review + "_"]
            });
  
            searchImages.filters.push(filterName);
            searchImages.filters.push(filterFolder);
  
            var searchResult = searchImages.run().getRange({
              start: 0,
              end: 36
            });
  
            for (var sr in searchResult) {
              name = searchResult[sr].getValue({ name: "name" });
              url = searchResult[sr].getValue({ name: "url" });
              dato = name.indexOf("image_", 0);
              punto = name.indexOf(".", 0);
              numImage = name.slice(dato + 6, punto);
              if (url != null) {
                arr_preValueImages[numImage - 1] = url;
              }
            }
  
            for (var i = 0; i < 12; i++) {
              var validateValue = arr_preValueImages[i];
              if (validateValue != null) {
                arr_valueImages[i] = arr_preValueImages[i];
              } else {
                arr_valueImages[i] = noImageObj.url;
              }
            }
  
            //log.debug("arreglo Reviews", arr_valueImages);
          } catch (error) {
            log.error("ERROR_SEARCH", error);
          }
        } else {
          try {
            var searchImages = search.load({
              id: "customsearch7172"
            });
  
            var filterFolder = search.createFilter({
              name: "folder",
              operator: search.Operator.IS,
              values: [2762933]
            });
  
            var filterName = search.createFilter({
              name: "name",
              operator: search.Operator.CONTAINS,
              values: [customerId + "_" + recId + "_"] //customerId + '_' + parentRecId + '_' + recId + '_'
            });
  
            searchImages.filters.push(filterName);
            searchImages.filters.push(filterFolder);
  
            var searchResult = searchImages.run().getRange({
              start: 0,
              end: 36
            });
  
            for (var sr in searchResult) {
              name = searchResult[sr].getValue({ name: "name" });
              url = searchResult[sr].getValue({ name: "url" });
              dato = name.indexOf("image_", 0);
              punto = name.indexOf(".", 0);
              numImage = name.slice(dato + 6, punto);
              if (url != null) {
                arr_preValueImages[numImage - 1] = url;
              }
            }
  
            for (var i = 0; i < 24; i++) {
              var validateValue = arr_preValueImages[i];
              if (validateValue != null) {
                arr_valueImages[i] = arr_preValueImages[i];
              } else {
                arr_valueImages[i] = noImageObj.url;
              }
            }
  
            //log.debug("", searchResult);
          } catch (error) {
            log.error("ERROR_SEARCH", error);
          }
        }
  
        if (customform == "14" && review != "") {
          var titleReview = arr_titlesReview[review - 1];
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          imagenesRevision = formulario.addField({
            id: "custpage_reviews_viewimages",
            label: "Imágenes",
            type: "inlinehtml"
          });
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
  
          imagenesRevision.defaultValue =
            "<body>" +
            '<h2 id="titulo" align="center">IMÁGENES PROCEDIMIENTO REVISIÓN DE ' +
            titleReview +
            "</h2>" +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 1</b></td>' +
            '<td align="center"><b>Imagen 2</b></td>' +
            '<td align="center"><b>Imagen 3</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_1" width="360px" height="360px" src="' +
            arr_valueImages[0] +
            '" /></td>' +
            '<td align="center"><img id="imagen_2" width="360px" height="360px" src="' +
            arr_valueImages[1] +
            '" /></td>' +
            '<td align="center"><img id="imagen_3" width="360px" height="360px" src="' +
            arr_valueImages[2] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 4</b></td>' +
            '<td align="center"><b>Imagen 5</b></td>' +
            '<td align="center"><b>Imagen 6</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_4" width="360px" height="360px" src="' +
            arr_valueImages[3] +
            '" /></td>' +
            '<td align="center"><img id="imagen_5" width="360px" height="360px" src="' +
            arr_valueImages[4] +
            '" /></td>' +
            '<td align="center"><img id="imagen_6" width="360px" height="360px" src="' +
            arr_valueImages[5] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 7</b></td>' +
            '<td align="center"><b>Imagen 8</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_7" width="360px" height="360px" src="' +
            arr_valueImages[6] +
            '" /></td>' +
            '<td align="center"><img id="imagen_8" width="360px" height="360px" src="' +
            arr_valueImages[7] +
            '" /></td>' +
            "</tr>" +
            "</table><br />" +
            '<h2 id="titulo" align="center">IMÁGENES PROCEDIMIENTO REVISIÓN DE ' +
            titleReview +
            " - MICROCÁMARA</h2>" +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 9</b></td>' +
            '<td align="center"><b>Imagen 10</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_9" width="360px" height="360px" src="' +
            arr_valueImages[8] +
            '" /></td>' +
            '<td align="center"><img id="imagen_10" width="360px" height="360px" src="' +
            arr_valueImages[9] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 11</b></td>' +
            '<td align="center"><b>Imagen 12</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_11" width="360px" height="360px" src="' +
            arr_valueImages[10] +
            '" /></td>' +
            '<td align="center"><img id="imagen_12" width="360px" height="360px" src="' +
            arr_valueImages[11] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            "<footer></footer>" +
            "</body>";
        } else if (customform == "14" && review == "") {
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          imagenesRevision = formulario.addField({
            id: "custpage_reviews_viewimages",
            label: "Imágenes",
            type: "inlinehtml"
          });
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
  
          imagenesRevision.defaultValue =
            "<body>" +
            '<h2 id="titulo" align="center">IMÁGENES PROCEDIMIENTO INJERTO</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 1</b></td>' +
            '<td align="center"><b>Imagen 2</b></td>' +
            '<td align="center"><b>Imagen 3</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_1" width="360px" height="360px" src="' +
            arr_valueImages[0] +
            '" /></td>' +
            '<td align="center"><img id="imagen_2" width="360px" height="360px" src="' +
            arr_valueImages[1] +
            '" /></td>' +
            '<td align="center"><img id="imagen_3" width="360px" height="360px" src="' +
            arr_valueImages[2] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 4</b></td>' +
            '<td align="center"><b>Imagen 5</b></td>' +
            '<td align="center"><b>Imagen 6</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_4" width="360px" height="360px" src="' +
            arr_valueImages[3] +
            '" /></td>' +
            '<td align="center"><img id="imagen_5" width="360px" height="360px" src="' +
            arr_valueImages[4] +
            '" /></td>' +
            '<td align="center"><img id="imagen_6" width="360px" height="360px" src="' +
            arr_valueImages[5] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 7</b></td>' +
            '<td align="center"><b>Imagen 8</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_7" width="360px" height="360px" src="' +
            arr_valueImages[6] +
            '" /></td>' +
            '<td align="center"><img id="imagen_8" width="360px" height="360px" src="' +
            arr_valueImages[7] +
            '" /></td>' +
            "</tr>" +
            "</table><br />" +
            '<h2 id="titulo" align="center">IMÁGENES ENFERMERÍA ANTES</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 9</b></td>' +
            '<td align="center"><b>Imagen 10</b></td>' +
            '<td align="center"><b>Imagen 11</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_9" width="360px" height="360px" src="' +
            arr_valueImages[8] +
            '" /></td>' +
            '<td align="center"><img id="imagen_10" width="360px" height="360px" src="' +
            arr_valueImages[9] +
            '" /></td>' +
            '<td align="center"><img id="imagen_11" width="360px" height="360px" src="' +
            arr_valueImages[10] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 12</b></td>' +
            '<td align="center"><b>Imagen 13</b></td>' +
            '<td align="center"><b>Imagen 14</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_12" width="360px" height="360px" src="' +
            arr_valueImages[11] +
            '" /></td>' +
            '<td align="center"><img id="imagen_13" width="360px" height="360px" src="' +
            arr_valueImages[12] +
            '" /></td>' +
            '<td align="center"><img id="imagen_14" width="360px" height="360px" src="' +
            arr_valueImages[13] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 15</b></td>' +
            '<td align="center"><b>Imagen 16</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_15" width="360px" height="360px" src="' +
            arr_valueImages[14] +
            '" /></td>' +
            '<td align="center"><img id="imagen_16" width="360px" height="360px" src="' +
            arr_valueImages[15] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            '<h2 id="titulo" align="center">IMÁGENES ENFERMERÍA DESPUÉS</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 17</b></td>' +
            '<td align="center"><b>Imagen 18</b></td>' +
            '<td align="center"><b>Imagen 19</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_17" width="360px" height="360px" src="' +
            arr_valueImages[16] +
            '" /></td>' +
            '<td align="center"><img id="imagen_18" width="360px" height="360px" src="' +
            arr_valueImages[17] +
            '" /></td>' +
            '<td align="center"><img id="imagen_19" width="360px" height="360px" src="' +
            arr_valueImages[18] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 20</b></td>' +
            '<td align="center"><b>Imagen 21</b></td>' +
            '<td align="center"><b>Imagen 22</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_20" width="360px" height="360px" src="' +
            arr_valueImages[19] +
            '" /></td>' +
            '<td align="center"><img id="imagen_21" width="360px" height="360px" src="' +
            arr_valueImages[20] +
            '" /></td>' +
            '<td align="center"><img id="imagen_22" width="360px" height="360px" src="' +
            arr_valueImages[21] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 23</b></td>' +
            '<td align="center"><b>Imagen 24</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_23" width="360px" height="360px" src="' +
            arr_valueImages[22] +
            '" /></td>' +
            '<td align="center"><img id="imagen_24" width="360px" height="360px" src="' +
            arr_valueImages[23] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            "<footer></footer>" +
            "</body>";
        } else if (customform == "151") {
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          imagenesRevision = formulario.addField({
            id: "custpage_reviews_viewimages",
            label: "Imágenes",
            type: "inlinehtml"
          });
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
  
          imagenesRevision.defaultValue =
            "<body>" +
            '<h2 id="titulo" align="center">IMÁGENES PROCEDIMIENTO COMPLEMENTARIO</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 1</b></td>' +
            '<td align="center"><b>Imagen 2</b></td>' +
            '<td align="center"><b>Imagen 3</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_1" width="360px" height="360px" src="' +
            arr_valueImages[0] +
            '" /></td>' +
            '<td align="center"><img id="imagen_2" width="360px" height="360px" src="' +
            arr_valueImages[1] +
            '" /></td>' +
            '<td align="center"><img id="imagen_3" width="360px" height="360px" src="' +
            arr_valueImages[2] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 4</b></td>' +
            '<td align="center"><b>Imagen 5</b></td>' +
            '<td align="center"><b>Imagen 6</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_4" width="360px" height="360px" src="' +
            arr_valueImages[3] +
            '" /></td>' +
            '<td align="center"><img id="imagen_5" width="360px" height="360px" src="' +
            arr_valueImages[4] +
            '" /></td>' +
            '<td align="center"><img id="imagen_6" width="360px" height="360px" src="' +
            arr_valueImages[5] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 7</b></td>' +
            '<td align="center"><b>Imagen 8</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_7" width="360px" height="360px" src="' +
            arr_valueImages[6] +
            '" /></td>' +
            '<td align="center"><img id="imagen_8" width="360px" height="360px" src="' +
            arr_valueImages[7] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            "<footer></footer>" +
            "</body>";
        } else if (customform == "135") {
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          imagenesRevision = formulario.addField({
            id: "custpage_reviews_viewimages",
            label: "Imágenes",
            type: "inlinehtml"
          });
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
  
          imagenesRevision.defaultValue =
            "<body>" +
            '<h2 id="titulo" align="center">IMÁGENES DIAGNOSTICO CAPILAR</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 1</b></td>' +
            '<td align="center"><b>Imagen 2</b></td>' +
            '<td align="center"><b>Imagen 3</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_1" width="360px" height="360px" src="' +
            arr_valueImages[0] +
            '" /></td>' +
            '<td align="center"><img id="imagen_2" width="360px" height="360px" src="' +
            arr_valueImages[1] +
            '" /></td>' +
            '<td align="center"><img id="imagen_3" width="360px" height="360px" src="' +
            arr_valueImages[2] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 4</b></td>' +
            '<td align="center"><b>Imagen 5</b></td>' +
            '<td align="center"><b>Imagen 6</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_4" width="360px" height="360px" src="' +
            arr_valueImages[3] +
            '" /></td>' +
            '<td align="center"><img id="imagen_5" width="360px" height="360px" src="' +
            arr_valueImages[4] +
            '" /></td>' +
            '<td align="center"><img id="imagen_6" width="360px" height="360px" src="' +
            arr_valueImages[5] +
            '" /></td>' +
            "</tr>" +
            "</table><br />" +
            '<h2 id="titulo" align="center">IMÁGENES MICROCÁMARA</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 7</b></td>' +
            '<td align="center"><b>Imagen 8</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_7" width="360px" height="360px" src="' +
            arr_valueImages[6] +
            '" /></td>' +
            '<td align="center"><img id="imagen_8" width="360px" height="360px" src="' +
            arr_valueImages[7] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 9</b></td>' +
            '<td align="center"><b>Imagen 10</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_9" width="360px" height="360px" src="' +
            arr_valueImages[8] +
            '" /></td>' +
            '<td align="center"><img id="imagen_10" width="360px" height="360px" src="' +
            arr_valueImages[9] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            "<footer></footer>" +
            "</body>";
        } else if (customform == "33") {
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          imagenesRevision = formulario.addField({
            id: "custpage_reviews_viewimages",
            label: "Imágenes",
            type: "inlinehtml"
          });
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
  
          imagenesRevision.defaultValue =
            "<body>" +
            '<h2 id="titulo" align="center">IMÁGENES APARATOLOGÍA</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 1</b></td>' +
            '<td align="center"><b>Imagen 2</b></td>' +
            '<td align="center"><b>Imagen 3</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_1" width="360px" height="360px" src="' +
            arr_valueImages[0] +
            '" /></td>' +
            '<td align="center"><img id="imagen_2" width="360px" height="360px" src="' +
            arr_valueImages[1] +
            '" /></td>' +
            '<td align="center"><img id="imagen_3" width="360px" height="360px" src="' +
            arr_valueImages[2] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 4</b></td>' +
            '<td align="center"><b>Imagen 5</b></td>' +
            '<td align="center"><b>Imagen 6</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_4" width="360px" height="360px" src="' +
            arr_valueImages[3] +
            '" /></td>' +
            '<td align="center"><img id="imagen_5" width="360px" height="360px" src="' +
            arr_valueImages[4] +
            '" /></td>' +
            '<td align="center"><img id="imagen_6" width="360px" height="360px" src="' +
            arr_valueImages[5] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 7</b></td>' +
            '<td align="center"><b>Imagen 8</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_7" width="360px" height="360px" src="' +
            arr_valueImages[6] +
            '" /></td>' +
            '<td align="center"><img id="imagen_8" width="360px" height="360px" src="' +
            arr_valueImages[7] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            "<footer></footer>" +
            "</body>";
        } else if (customform == "138") {
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          imagenesRevision = formulario.addField({
            id: "custpage_reviews_viewimages",
            label: "Imágenes",
            type: "inlinehtml"
          });
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
  
          imagenesRevision.defaultValue =
            "<body>" +
            '<h2 id="titulo" align="center">IMÁGENES DIAGNÓSITCO BODY & SKIN</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 1</b></td>' +
            '<td align="center"><b>Imagen 2</b></td>' +
            '<td align="center"><b>Imagen 3</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_1" width="360px" height="360px" src="' +
            arr_valueImages[0] +
            '" /></td>' +
            '<td align="center"><img id="imagen_2" width="360px" height="360px" src="' +
            arr_valueImages[1] +
            '" /></td>' +
            '<td align="center"><img id="imagen_3" width="360px" height="360px" src="' +
            arr_valueImages[2] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 4</b></td>' +
            '<td align="center"><b>Imagen 5</b></td>' +
            '<td align="center"><b>Imagen 6</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_4" width="360px" height="360px" src="' +
            arr_valueImages[3] +
            '" /></td>' +
            '<td align="center"><img id="imagen_5" width="360px" height="360px" src="' +
            arr_valueImages[4] +
            '" /></td>' +
            '<td align="center"><img id="imagen_6" width="360px" height="360px" src="' +
            arr_valueImages[5] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 7</b></td>' +
            '<td align="center"><b>Imagen 8</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_7" width="360px" height="360px" src="' +
            arr_valueImages[6] +
            '" /></td>' +
            '<td align="center"><img id="imagen_8" width="360px" height="360px" src="' +
            arr_valueImages[7] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            "<footer></footer>" +
            "</body>";
        } else if (customform == "148") {
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          imagenesRevision = formulario.addField({
            id: "custpage_reviews_viewimages",
            label: "Imágenes",
            type: "inlinehtml"
          });
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
  
          imagenesRevision.defaultValue =
            "<body>" +
            '<h2 id="titulo" align="center">IMÁGENES PROCEDIMIENTO QUIRÚRGICO</h2>' +
            '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
            "<tr>" +
            '<td align="center"><b>Imagen 1</b></td>' +
            '<td align="center"><b>Imagen 2</b></td>' +
            '<td align="center"><b>Imagen 3</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_1" width="360px" height="360px" src="' +
            arr_valueImages[0] +
            '" /></td>' +
            '<td align="center"><img id="imagen_2" width="360px" height="360px" src="' +
            arr_valueImages[1] +
            '" /></td>' +
            '<td align="center"><img id="imagen_3" width="360px" height="360px" src="' +
            arr_valueImages[2] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 4</b></td>' +
            '<td align="center"><b>Imagen 5</b></td>' +
            '<td align="center"><b>Imagen 6</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_4" width="360px" height="360px" src="' +
            arr_valueImages[3] +
            '" /></td>' +
            '<td align="center"><img id="imagen_5" width="360px" height="360px" src="' +
            arr_valueImages[4] +
            '" /></td>' +
            '<td align="center"><img id="imagen_6" width="360px" height="360px" src="' +
            arr_valueImages[5] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 7</b></td>' +
            '<td align="center"><b>Imagen 8</b></td>' +
            '<td align="center"><b>Imagen 9</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_7" width="360px" height="360px" src="' +
            arr_valueImages[6] +
            '" /></td>' +
            '<td align="center"><img id="imagen_8" width="360px" height="360px" src="' +
            arr_valueImages[7] +
            '" /></td>' +
            '<td align="center"><img id="imagen_9" width="360px" height="360px" src="' +
            arr_valueImages[8] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 10</b></td>' +
            '<td align="center"><b>Imagen 11</b></td>' +
            '<td align="center"><b>Imagen 12</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_10" width="360px" height="360px" src="' +
            arr_valueImages[9] +
            '" /></td>' +
            '<td align="center"><img id="imagen_11" width="360px" height="360px" src="' +
            arr_valueImages[10] +
            '" /></td>' +
            '<td align="center"><img id="imagen_12" width="360px" height="360px" src="' +
            arr_valueImages[11] +
            '" /></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><b>Imagen 13</b></td>' +
            '<td align="center"><b>Imagen 14</b></td>' +
            '<td align="center"><b>Imagen 15</b></td>' +
            "</tr>" +
            "<tr>" +
            '<td align="center"><img id="imagen_13" width="360px" height="360px" src="' +
            arr_valueImages[12] +
            '" /></td>' +
            '<td align="center"><img id="imagen_14" width="360px" height="360px" src="' +
            arr_valueImages[13] +
            '" /></td>' +
            '<td align="center"><img id="imagen_15" width="360px" height="360px" src="' +
            arr_valueImages[14] +
            '" /></td>' +
            "</tr>" +
            "</table>" +
            "<footer></footer>" +
            "</body>";
        } else {
          formulario = widget.createForm({ title: titleForm_visalisizeImages });
          formulario.defaultValue = "<body></body>";
          imagenesRevisionStyles = formulario.addField({
            id: "custpage_reviews_styles",
            label: "Imágenes",
            type: "inlinehtml"
          });
        }
  
        imagenesRevisionStyles.defaultValue =
          '<style type="text/css">' +
          "@media screen and (min-width: 320px) and (max-width: 479px) {" +
          ".imagen { width: 220px; }" +
          "    #titulo{" +
          "    padding-top: 50px;" +
          "    }" +
          "}" +
          "@media screen and (min-width: 480px) and (max-width: 599px) {" +
          ".imagen { width: 240px; }" +
          "    #titulo{" +
          "    padding-top: 50px;" +
          "    }" +
          "}" +
          "@media screen and (min-width: 600px) and (max-width: 799px) {" +
          ".imagen { width: 260px; }" +
          "    #titulo{" +
          "    padding-top: 50px;" +
          "    }" +
          "}" +
          "@media screen and (min-width: 800px) and (max-width: 767px) {" +
          ".imagen { width: 280px; }" +
          "    #titulo{" +
          "    padding-top: 50px;" +
          "    }" +
          "}" +
          "@media screen and (min-width: 768px) and (max-width: 1023px) {" +
          ".imagen { width: 300px; }" +
          "    #titulo{" +
          "    padding-top: 80px;" +
          "    }" +
          "}" +
          "@media screen and (min-width: 1024px) and (max-width: 1366px) {" +
          ".imagen { width: 320px; }" +
          "    #titulo{" +
          "    padding-top: 80px;" +
          "    }" +
          "}" +
          "@media screen and (min-width: 1366px) {" +
          ".imagen { width: 320px; }" +
          "    #titulo{" +
          "    padding-top: 80px;" +
          "    }" +
          "}" +
          ".imagen { height: auto; }" +
          "h2 {" +
          "  border-bottom: 1px solid  #5D6975;" +
          "  color: #5D6975;" +
          "  font-size: 2.4em;" +
          "  line-height: 1.4em;" +
          "  font-weight: normal;" +
          "  text-align: center;" +
          "  margin: 0 0 20px 0;" +
          "  width: 92%;" +
          "}" +
          "b {" +
          "  font-size: 12px;" +
          "}" +
          "footer {" +
          "  color: #5D6975;" +
          "  width: 100%;" +
          "  height: 60px;" +
          "  bottom: 0;" +
          "  border-top: 1px solid #C1CED9;" +
          "  padding-top: 5px 0;" +
          "  margin-top: 20px 0;" +
          "  text-align: center;" +
          "}" +
          "</style>";
  
        userObj = runtime.getCurrentUser();
        role = userObj.role;
        name = userObj.name;
  
        //log.debug('NAME AND ROLE', 'Name: ' + name + ' Role: ' + role);
  
        /**
         * //ACTION: Calls clientScript function to compress images by canvas method - Only for adminitrators
         */
  
        if (
          //role == 3 || role == 1258
          role != 0
        ) {
          var newBase64_png_compress_image_1 = formulario.addField({
            id: "custpage_image_1",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_2 = formulario.addField({
            id: "custpage_image_2",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_3 = formulario.addField({
            id: "custpage_image_3",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_4 = formulario.addField({
            id: "custpage_image_4",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_5 = formulario.addField({
            id: "custpage_image_5",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_6 = formulario.addField({
            id: "custpage_image_6",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_7 = formulario.addField({
            id: "custpage_image_7",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_8 = formulario.addField({
            id: "custpage_image_8",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_9 = formulario.addField({
            id: "custpage_image_9",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_10 = formulario.addField({
            id: "custpage_image_10",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_11 = formulario.addField({
            id: "custpage_image_11",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_12 = formulario.addField({
            id: "custpage_image_12",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_13 = formulario.addField({
            id: "custpage_image_13",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_14 = formulario.addField({
            id: "custpage_image_14",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_15 = formulario.addField({
            id: "custpage_image_15",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_16 = formulario.addField({
            id: "custpage_image_16",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_17 = formulario.addField({
            id: "custpage_image_17",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_18 = formulario.addField({
            id: "custpage_image_18",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_19 = formulario.addField({
            id: "custpage_image_19",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_20 = formulario.addField({
            id: "custpage_image_20",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_21 = formulario.addField({
            id: "custpage_image_21",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_22 = formulario.addField({
            id: "custpage_image_22",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_23 = formulario.addField({
            id: "custpage_image_23",
            type: "LONGTEXT",
            label: "Text"
          });
          var newBase64_png_compress_image_24 = formulario.addField({
            id: "custpage_image_24",
            type: "LONGTEXT",
            label: "Text"
          });
  
          newBase64_png_compress_image_1.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_2.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_3.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_4.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_5.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_6.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_7.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_8.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_9.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_10.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_11.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_12.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_13.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_14.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_15.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_16.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_17.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_18.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_19.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_20.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_21.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_22.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_23.updateDisplayType({
            displayType: "HIDDEN"
          });
          newBase64_png_compress_image_24.updateDisplayType({
            displayType: "HIDDEN"
          });
  
          formulario.addSubmitButton({ label: "Guardar imágenes comprimidas" });
          formulario.addButton({
            id: "custpage_compress_button",
            label: "Comprimir imágenes",
            functionName: "compressImages"
          });
          formulario.addButton({
            id: "custpage_exit_button",
            label: "Salir",
            functionName: "exit"
          });
          formulario.clientScriptModulePath = "SuiteScripts/cs_CompressImages.js";
        } else {
          formulario.addButton({
            id: "custpage_cancel_button",
            label: "Cancelar",
            functionName: "cancelSelf"
          });
          formulario.clientScriptModulePath =
            "SuiteScripts/cs_DiagnosticoCorporal.js";
        }
  
        context.response.writePage(formulario);
      } else {
  
        /**
         * ********************************************************************* *
         * *                                                                     *
         * *    METHOD POST ON CLIC SUBIT 'GUARDAR IMÁGENES COMPRIMIDAS          *
         * *                                                                     *
         * ********************************************************************* *
         */
        
          //ACTION: GET params from currrent context response
          var paramsEntry = context.request.parameters.entryformquerystring;
          //ACTION: CONVERT context URL to JSON schema
          var entryJSON = getJSON(paramsEntry.toString());
          //ACTION: GET specific params from entry
          recId = entryJSON.recId;
  
        //log.debug("context Req", context.request);
  
        //ACTION: GET values of custom fields from form before submit
        var objImg_1 = context.request.parameters.custpage_image_1 || null;
        var objImg_2 = context.request.parameters.custpage_image_2 || null;
        var objImg_3 = context.request.parameters.custpage_image_3 || null;
        var objImg_4 = context.request.parameters.custpage_image_4 || null;
        var objImg_5 = context.request.parameters.custpage_image_5 || null;
        var objImg_6 = context.request.parameters.custpage_image_6 || null;
        var objImg_7 = context.request.parameters.custpage_image_7 || null;
        var objImg_8 = context.request.parameters.custpage_image_8 || null;
        var objImg_9 = context.request.parameters.custpage_image_9 || null;
        var objImg_10 = context.request.parameters.custpage_image_10 || null;
        var objImg_11 = context.request.parameters.custpage_image_11 || null;
        var objImg_12 = context.request.parameters.custpage_image_12 || null;
        var objImg_13 = context.request.parameters.custpage_image_13 || null;
        var objImg_14 = context.request.parameters.custpage_image_14 || null;
        var objImg_15 = context.request.parameters.custpage_image_15 || null;
        var objImg_16 = context.request.parameters.custpage_image_16 || null;
        var objImg_17 = context.request.parameters.custpage_image_17 || null;
        var objImg_18 = context.request.parameters.custpage_image_18 || null;
        var objImg_19 = context.request.parameters.custpage_image_19 || null;
        var objImg_20 = context.request.parameters.custpage_image_20 || null;
        var objImg_21 = context.request.parameters.custpage_image_21 || null;
        var objImg_22 = context.request.parameters.custpage_image_22 || null;
        var objImg_23 = context.request.parameters.custpage_image_23 || null;
        var objImg_24 = context.request.parameters.custpage_image_24 || null;
  
        var arr_obj_images = [
          objImg_1,
          objImg_2,
          objImg_3,
          objImg_4,
          objImg_5,
          objImg_6,
          objImg_7,
          objImg_8,
          objImg_9,
          objImg_10,
          objImg_11,
          objImg_12,
          objImg_13,
          objImg_14,
          objImg_15,
          objImg_16,
          objImg_17,
          objImg_18,
          objImg_19,
          objImg_20,
          objImg_21,
          objImg_22,
          objImg_23,
          objImg_24
        ];
  
        var imageNull = 1592235;
  
        //log.debug("objeto", objImg_1);
  
        for (var index = 0; index < arr_obj_images.length; index++) {
          if (arr_obj_images[index] != null) {
            id = arr_obj_images[index].substring(
              0,
              arr_obj_images[index].indexOf("_")
            );
            log.debug("ids", id);
            if (id != imageNull) {
              base64 = arr_obj_images[index].substring(
                arr_obj_images[index].indexOf(",") + 1,
                arr_obj_images[index].length
              );
              
              //log.debug("arr_obj_images[index]" + index, arr_obj_images[index]);
  
              objOldImage = file.load(id);
              nameImage = objOldImage.name;
              folderImage = objOldImage.folder;
              
              var delobjOldImage = file.delete({
                id: id
              });
  
              var objNewImage = file.create({
                name: nameImage,
                fileType: "PNGIMAGE",
                contents: base64,
                encoding: file.Encoding.UTF8,
                folder: folderImage
              });
              //log.debug('Debug base 64 file', base64);
              //log.debug('Debug file obj', objNewImage);
  
              var idNew = objNewImage.save();
              //log.debug('Debug id File', idNew);
            }
          }
        }
        context.response.write('<html><body><script>window.open("https://3559763.app.netsuite.com/app/crm/support/supportcase.nl?id=' + recId + '&whence=&", "_self"); </script></body></html>');
      }
  
      var scriptObj = runtime.getCurrentScript();
      log.debug("Remaining governance units: " + scriptObj.getRemainingUsage());
    }
  
    //FUNCTION: getJSON() -> convert URL to JSON schema
    /**
     * getJSON -> convert URL string to JSON schema
     * @param {string} u string of url that we wants convert to JSON schema
     */
    function getJSON(u) {
      var ar_url_data = u.split("&");
  
      var json = {};
      for (var i = 0; i < ar_url_data.length; i++) {
        var ar_val = ar_url_data[i].split("=");
        json[ar_val[0]] = ar_val[1];
      }
      return json;
    }
  
    return {
      onRequest: onRequest
    };
  });
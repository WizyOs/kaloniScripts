/**

  * @NApiVersion 2.x  
  * @NScriptType Restlet
  * @NModuleScope SameAccount

  */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
  function doGet(params) {}

  function doPost(params) {
    log.debug("params", params);
    var objJson = JSON.parse(params);
    var param_idCustomer = objJson.idCustomer;
    var param_idTransaction = objJson.idTransaction;
    var param_url_file = objJson.fileLaboratory;
    var param_idFile = objJson.idFile;

    // GLOBALSE
    var laboratory_file_url;
    var laboratory_file_type;
    var fileTypeLab;
    var response = [];
    var folderLaboratory = 5478419;

    if (param_url_file != "" && param_url_file != undefined) {
      laboratory_file_url = https.get({
        url: param_url_file
      });
      laboratory_file_type = laboratory_file_url.headers["Content-Type"];
      log.debug("laboratorio file type", laboratory_file_type);

      if (laboratory_file_type == "application/pdf") {
        fileTypeLab = "PDF";
      } else if (laboratory_file_type == "image/png") {
        fileTypeLab = "PNGIMAGE";
      } else if (laboratory_file_type == "") {
        fileTypeLab = "HTMLDOC";
      }
    }

    if (param_idTransaction == "save") {

      try {
        var objNew_file_laboratory = file.create({
          name: param_idCustomer + "_laboratory_" + new Date(),
          fileType: fileTypeLab,
          contents: laboratory_file_url.body,
          encoding: file.Encoding.UTF8,
          folder: folderLaboratory
        });
        var idNew_file_laboratory = objNew_file_laboratory.save();

        response.push({
          "status": "File saved",
          "idStatus": "1",
          "idFile": idNew_file_laboratory
        });
      } catch (error) {
        response.push({
          "ERROR_SAVE_FILE": error
        })
      }

    } else if (param_idTransaction == "list") {
      var searchCreated_filesLab = search.create({
        "type": "file",
        "filters": [{
            "name": "folder",
            "operator": "anyof",
            "values": [
              folderLaboratory
            ],
            "isor": false,
            "isnot": false,
            "leftparens": 0,
            "rightparens": 0
          },
          {
            "name": "name",
            "operator": "contains",
            "values": [
              param_idCustomer + "_laboratory_"
            ],
            "isor": false,
            "isnot": false,
            "leftparens": 0,
            "rightparens": 0
          }
        ],
        "columns": [{
            "name": "name",
            "label": "Nombre",
            "type": "text",
            "sortdir": "ASC"
          },
          {
            "name": "folder",
            "label": "Carpeta",
            "type": "select",
            "sortdir": "NONE"
          },
          {
            "name": "documentsize",
            "label": "Tamaño (KB)",
            "type": "integer",
            "sortdir": "NONE"
          },
          {
            "name": "url",
            "label": "URL",
            "type": "text",
            "sortdir": "NONE"
          },
          {
            "name": "created",
            "label": "Fecha de creación",
            "type": "datetime",
            "sortdir": "NONE"
          },
          {
            "name": "modified",
            "label": "Última modificación",
            "type": "datetime",
            "sortdir": "NONE"
          },
          {
            "name": "filetype",
            "label": "Tipo",
            "type": "select",
            "sortdir": "NONE"
          }
        ]
      });

      var searchResults_filesLab = searchCreated_filesLab.run().getRange({
        start: 0,
        end: 1000
      });

      var objSearch_filesLab = JSON.parse(JSON.stringify(searchResults_filesLab));

      for (var key in objSearch_filesLab) {
        var idFile = objSearch_filesLab[key].id;
        var nameFile = objSearch_filesLab[key].values.name;
        var typeFile =  objSearch_filesLab[key].values.filetype[0].value;

        response.push({
          "idFile": idFile,
          "nameFile": nameFile,
          "typeFile": typeFile,
          //"contentFile": content_fileLaboratory
        });
      }

    } else if (param_idTransaction == "get") {
      var objLoad_file_laboratory = file.load({
        id: param_idFile
      });

      var idFile = objLoad_file_laboratory.id;
      var nameFile = objLoad_file_laboratory.name;
      var typeFile = objLoad_file_laboratory.fileType;
      var sizeFile = objLoad_file_laboratory.size;

      var content_fileLaboratory = objLoad_file_laboratory.getContents();

      response.push({
        "idFile": idFile,
        "nameFile": nameFile,
        "typeFile": typeFile,
        "sizeFile": sizeFile,
        "contentFile": content_fileLaboratory
      });
    }
    return response;

  }

  return {
    get: doGet,
    post: doPost
  };
});
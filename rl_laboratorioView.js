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
      log.debug("objParams", objJson);
      var param_idCase = objJson.idCase;
  
  
      //GLOBALES VARIABLES
      var arr_files = [];
  
      var searchGhost = search.load({
        id: "customsearch7928"
      })
  
      var searchCreate_filesLab = search.create({
        "type": "file",
        "filters": [{
            "name": "folder",
            "operator": "anyof",
            "values": [
              "5478419"
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
              param_idCase
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
  
      var searchResults_filesLab = searchCreate_filesLab.run().getRange({
        start: 0,
        end: 1000
      });
  
      obj_filesLab = JSON.parse(JSON.stringify(searchResults_filesLab));
  
      for (var k in obj_filesLab) {
        fileObj_image = file.load({
          id: obj_filesLab[k].id
        });
        file_content_image = fileObj_image.getContents();
        file_name = obj_filesLab[k].values.name;
  
        arr_files.push({
          "name": file_name,
          "image": file_content_image
        });
      }
  
  
      return arr_files;
    }
  
    return {
      get: doGet,
      post: doPost
    };
  });
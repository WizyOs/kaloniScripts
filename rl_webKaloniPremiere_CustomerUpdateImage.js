/**

    * @NApiVersion 2.x  
    * @NScriptType Restlet
    * @NModuleScope SameAccount

    */

define(["N/record", "N/log", "N/file", "N/email", "N/search", "N/ui/serverWidget", "N/format", "N/https", "N/url", "N/xml", "N/render", "N/runtime"], function (record, log, file, email, search, serverWidget, format, https, url, xml, render, runtime) {
    function doPost(params) {
        var objJson;
        if (typeof params === "object") {
            objJson = params;
        } else {
            objJson = JSON.parse(params);
        }
        log.debug("params", objJson);

        // Entry params
        var param_idCustomer = objJson.idCustomer;
        var param_url = objJson.url;


        // Global Variables
        var fileTypeImage;
        var customer_image_type;
        var folderProfileImaeges = 7325955;

        log.debug("param_idCustomer", param_idCustomer);
        log.debug("param_url", param_url);

        if (param_url != "" && param_url != undefined) {
            var customer_image_url = https.get({
              url: param_url
            });
            customer_image_type = customer_image_url.headers["Content-Type"];
            log.debug("laboratorio file type", customer_image_type);
      
            if (customer_image_type == "image/jpp" || customer_image_type == "image/webp") {
              fileTypeImage = "JPGIMAGE";
            } else if (customer_image_type == "image/png") {
              fileTypeImage = "PNGIMAGE";
            }
          }

        try {
            var obj_customer = record.load({ 
                type: record.Type.CUSTOMER, 
                id: param_idCustomer,
                isDynamic: true
            });
            var objNew_file_image = file.create({
                name: param_idCustomer + "_imageProfile_" + new Date(),
                fileType: fileTypeImage,
                contents: customer_image_url.body,
                encoding: file.Encoding.UTF8,
                folder: folderProfileImaeges
              });
              var idNew_file_imageProfile = objNew_file_image.save();   

              var obj_file_profileImage = file.load({
                  id: idNew_file_imageProfile
              })

              log.debug("idImage", idNew_file_imageProfile);
              log.debug("urlNetsuite", obj_file_profileImage.url);

              obj_customer.setValue({
                  fieldId: 'custentity447',
                  value: idNew_file_imageProfile
                });
  
            var recordId = obj_customer.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });

            return {
                "status": "OK_SAVE_IMAGE"
            }
        } catch (error) {
            return {
                "status": "ERROR_IMAGE_DONT_SAVED"
            }
        }    
    }

    return {
        post: doPost
    };
});
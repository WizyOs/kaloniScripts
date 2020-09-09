/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope Public
 */

define(["N/record", "N/url", "N/https", "N/ui/dialog"], function(
  record,
  url,
  https,
  dialog
) {
  function pageInit(context) {}

  function compressImages() {
    var imageNull = 1592235;
    var num_objects = 24;
    var counter = 0;
    var arr_length = 0;
    var arr_obj_old_images = [];
    var arr_obj_new_images = [];
    var arr_id_images = [];

    for (counter = 0; counter < num_objects; counter++) {
      var id_element = "imagen_" + (counter + 1);
      var elementObj = document.getElementById(id_element) || null;
      console.log(elementObj);
      if (elementObj !== null) {
        arr_obj_old_images[counter] = elementObj;
      }
    }

    console.log(arr_obj_old_images[6] + ' ' + arr_obj_old_images[7]);

    for (counter = 0; counter < num_objects; counter++) {
      var id_element = "custpage_image_" + (counter + 1);
      var elementObj = document.getElementById(id_element);
      arr_obj_new_images[counter] = elementObj;
    }

    console.log(arr_obj_new_images);

    for (counter = 0; counter < arr_obj_old_images.length; counter++) {
      if (arr_obj_old_images[counter] !== undefined) {
        if (getIdImageFile(arr_obj_old_images[counter].src) != undefined) {
          arr_id_images[counter] = getIdImageFile(
            arr_obj_old_images[counter].src
          );
          arr_length += 1;
        }
      }
    }

    console.log(arr_id_images + ' ' + arr_length);

    for (counter = 0; counter < arr_obj_old_images.length; counter++) {
      if (arr_id_images[counter] != imageNull) {
        var valueBase64 = compress(
          arr_obj_old_images[counter],
          100,
          500,
          "png"
        );
        arr_obj_new_images[counter].value =
          arr_id_images[counter] + "_" + valueBase64;
      }
    }

    dialog.alert({
      title: "Images Compress",
      message: "La tarea de comprimir las imagenes se ha terminado"
    });
  }

  function exit() {
    var currentUrl = document.location.href;
    var paramsUrl = new URL(currentUrl);
    var recId = paramsUrl.searchParams.get("recId");
    var valURl =
      "https://3559763.app.netsuite.com/app/crm/support/supportcase.nl?id=" +
      recId +
      "&whence=&";
    window.open("" + valURl + "", "_self");
  }

  /**
   * ********************** *
   * SUPPORT FUNCTIONS AREA *
   * ********************** *
   */

  /**
   * //FUNCTION: compress(source_img_obj, quality, maxWidth, output_format)
   * @param {object} source_img_obj image object from DOM
   * @param {int} quality indicate the final value of quality starting at one-hundred percent
   * @param {int} maxWidth maximun width of final image
   * @param {string} output_format indicate the format extension to the file, default value is PNG
   */
  function compress(source_img_obj, quality, maxWidth, output_format) {
    var mime_type = "image/jpeg";
    if (typeof output_format !== "undefined" && output_format == "png") {
      mime_type = "image/png";
    }

    maxWidth = maxWidth || 1000;
    var natW = source_img_obj.naturalWidth;
    var natH = source_img_obj.naturalHeight;
    var ratio = natH / natW;
    if (natW > maxWidth) {
      natW = maxWidth;
      natH = ratio * maxWidth;
    }

    var canvas = document.createElement("canvas");
    canvas.width = natW;
    canvas.height = natH;

    var ctx = canvas
      .getContext("2d")
      .drawImage(source_img_obj, 0, 0, natW, natH);
    var newImageData = canvas.toDataURL(mime_type, quality / 100);
    var result_image_obj = new Image();

    return newImageData;
  }

  /**
   * //FUNCTION: getIdImageFile(url)
   * @param {string} url Cabinet file URL
   */
  function getIdImageFile(url) {
    var response = undefined;

    if (url == "" || url == null) {
      response = undefined;
    } else {
      var startIndex = url.indexOf("id", 0);
      var finalIndex = url.indexOf("&", startIndex);
      response = url.substring(parseInt(startIndex) + 3, parseInt(finalIndex));
    }

    return response;
  }

  /**
   * //FUNCTION: getBase64Image(img)
   * @param {string} img URL image
   */
  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  return {
    pageInit: pageInit,
    compressImages: compressImages,
    exit: exit
  };
});

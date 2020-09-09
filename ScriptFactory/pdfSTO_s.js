function portletNameDom(request, response){

  var water = "https://system.na2.netsuite.com/core/media/media.nl?id=1577669&c=3559763&h=f4171bb824ac7553ae14";
   var recId = request.getParameter('id');
   var record = nlapiLoadRecord('Customer', recId);
   var id = record.getFieldValue('entityid');
   var name = record.getFieldValue('altname');
   var type = record.getFieldValue('isperson');
   var date = record.getFieldValue('custentity4');
   var sex = record.getFieldText('custentity_sexo');
   var state_client = record.getFieldValue('entitystatus');
   var executive = record.getFieldValue('custentity145');
   var hair = record.getFieldValue('custentity144');
   var medical = record.getFieldValue('custentity145');
   var category = record.getFieldValue('category');
   var age = record.getFieldValue('custentity149');
   var comment = record.getFieldValue('comments');
   var e_mail = record.getFieldValue('email');
   var no_exp=record.getFieldValue('custentity114');
   var curl=record.getFieldValue('custentity251');
    //datos hoja frontal
    var date_val = record.getFieldValue('custentity283');

  var Num_pros = record.getFieldValue('custentity158');
  var Num_tiras= record.getFieldValue('custentity159');
  var Day10 = record.getFieldValue('custentity160');
  var Days24 = record.getFieldValue('custentity226');
  //var Days24 = record.getFieldText('custentity226');
  var nota24horas= record.getFieldText('custentity249');
  var medicam1 = record.getFieldValue('custentity252');
  var medicam2 = record.getFieldValue('custentity253');
  var medicam3 = record.getFieldValue('custentity254');
  var medicam4 = record.getFieldValue('custentity255');
  var medicam5 = record.getFieldValue('custentity256');
  var medicam6 = record.getFieldValue('custentity257');
  var medicam7 = record.getFieldValue('custentity258');
  var medicam8 = record.getFieldValue('custentity259');
  var medicam10 = record.getFieldValue('custentity331');
  var Mes1 = record.getFieldValue('custentity161');
  var Mes3 = record.getFieldValue('custentity162');
  var Mes5 = record.getFieldValue('custentity163');
  var Mes7 = record.getFieldValue('custentity329');
  var Mes9 = record.getFieldValue('custentity164');
  var Mes12 = record.getFieldValue('custentity165');
  var Mes14 = record.getFieldValue('custentity166');
  var Ref_imp = record.getFieldValue('custentity167');
  var IDX = record.getFieldValue('custentity169');
  var TX = record.getFieldValue('custentity170');
  var nota = record.getFieldValue('custentity235');
  var nota2 = record.getFieldValue('custentity236');
  var nota3 = record.getFieldValue('custentity237');
  var nota4 = record.getFieldValue('custentity238');
  var nota5 = record.getFieldValue('custentity239');
  var nota6 = record.getFieldValue('custentity240');
  var nota7 = record.getFieldValue('custentity241');
  var nota10 = record.getFieldValue('custentity330');
  //fin datos hoja frontal
  // Area de Checkbox
   var hair = record.getFieldValue('custentity6');
   var hair_check= record.getFieldValue('custentity40');
   var alteration = record.getFieldValue('custentity13');
   var white = record.getFieldValue('custentity16');
   var hairs = record.getFieldValue('custentity15');
   var exp_file = record.getFieldValue('custentity155');
  //seccion exp clinico
   var grandfather = record.getFieldValue('custentity18');
   var father = record.getFieldValue('custentity17');
   var cirugia = record.getFieldValue('custentity19');
   var alergia = record.getFieldValue('custentity21');
   var nasal = record.getFieldValue('custentity45');
   var hipertencion = record.getFieldValue('custentity50');
   var text_hiper = record.getFieldValue('custentity51');
   var renal = record.getFieldValue('custentity52');
   var neurologic = record.getFieldValue('custentity54');
   var VIH = record.getFieldValue('custentity56');
   var artritis = record.getFieldValue('custentity58');
   var asma = record.getFieldValue('custentity59');
   var cancer = record.getFieldValue('custentity60');
   var claustrofobia = record.getFieldValue('custentity61');
   var colitis = record.getFieldValue('custentity62');
   var eczema = record.getFieldValue('custentity63');
   var epilepsia = record.getFieldValue('custentity64');
   var hipotiroidismo= record.getFieldValue('custentity65');
   var gastritis = record.getFieldValue('custentity66');
   var hipertiroidismo = record.getFieldValue('custentity67');
   var psoriasis = record.getFieldValue('custentity68');
   var smock = record.getFieldValue('custentity70');
   var alcoholismo = record.getFieldValue('custentity71');
   var toma_medicamento = record.getFieldValue('custentity73');
   var phone = record.getFieldValue('phone');
   var dataimport = record.getFieldValue('custentity72');
   var SinMetabolico= record.getFieldValue('custentity269');
  //Fin de Checkbox
  //GetText
   var cellphone = record.getFieldValue('mobilephone');
   var personal_phone = record.getFieldValue('homephone');
   var address = record.getFieldValue('defaultaddress');
   var sucursal = record.getFieldText('custentity25');
   var countrys = record.getFieldValue('custentity137');
   var city = record.getFieldValue('custentity129');
   var medios = record.getFieldText('custentity38');
   var campaign = record.getFieldText('leadsource');
   var starter_hair = record.getFieldText('custentity7');
   var since = record.getFieldText('custentity9');
   var textlost_hair = record.getFieldText('custentity10');
   var textobservation = record.getFieldText('custentity11');
   var textfrecuenci = record.getFieldText('custentity12');
   var lost = record.getFieldText('custentity10');
   var paciente_db = record.getFieldText('custentity47');
   var anestesia = record.getFieldText('custentity20');
   var Mod_pros = record.getFieldText('custentity78');
   //Fin GetText
  var res = record.getFieldValue('custentity57');
  //text exp_clinico
  var answer1 = record.getFieldValue('custentity42');
  var answer2 = record.getFieldValue('custentity43');
  var answer3 = record.getFieldValue('custentity44');
  var type_c=record.getFieldText('custentity46');
  //
  var tratamiento1 = record.getFieldValue('custentity48');
  var tratamiento2 = record.getFieldValue('custentity50');
  var tratamiento3 = record.getFieldValue('custentity53');
  var tratamiento4 = record.getFieldValue('custentity55');
  var Medic = record.getFieldValue('custentity75');
  var text_obs = record.getFieldValue('custentity79');
  var Responsable1 = record.getFieldValue('custentity260');
  var Responsable2 = record.getFieldValue('custentity261');
  var Responsable3 = record.getFieldValue('custentity262');
  var Responsable4 = record.getFieldValue('custentity263');
  var Responsable5 = record.getFieldValue('custentity264');
  var Responsable6 = record.getFieldValue('custentity265');
  var Responsable7 = record.getFieldValue('custentity266');
  var Responsable8= record.getFieldValue('custentity267');
  var Responsable10= record.getFieldValue('custentity332');

   /*  //-----------------------------------------------INICIO MUESTRA PRP------------------------------------
    var respon=record.getFieldValue('custentity214');
    var equi=record.getFieldValue('custentity215');
    var sitioPun=record.getFieldValue('custentity216');
    var no_inten =record.getFieldValue('custentity217');
    var tubos=record.getFieldValue('custentity218');
    var centrifugados=record.getFieldValue('custentity219');
    var tiempo=record.getFieldValue('custentity221');
    var responPRP1=record.getFieldValue('custentity222');
    var regionPRP1=record.getFieldValue('custentity223');
    var responPRP2=record.getFieldValue('custentity224');
    var regionPRP2=record.getFieldValue('custentity225');
    //-----------------------------------------------FIN MUESTRA PRP------------------------------------*/
   //-----------------------------------------------INICIO HOJA DIGRAMA DE ALOPECIA------------------------------------
  var type_alop = record.getFieldValue('custentity168');
  var cie = record.getFieldText('custentity270');
  var type_alop_text = record.getFieldText('custentity77');
  var DCDOA1= record.getFieldValue('custentity171');
  var DCDOB1= record.getFieldValue('custentity173');
  var DCDOC1= record.getFieldValue('custentity174');
  var DCDOpro= record.getFieldValue('custentity175');
  var DCZRA1= record.getFieldValue('custentity176');
  var DCZRB1= record.getFieldValue('custentity177');
  var DCZRC1= record.getFieldValue('custentity178');
  var DCZRpro= record.getFieldValue('custentity179');
  
  var AreaZD= record.getFieldValue('custentity172');
  var AreaZDA= record.getFieldValue('custentity180');
  var AreaZDB= record.getFieldValue('custentity181');
  var AreaZDC=record.getFieldValue('custentity182');
  var AreaZD2= record.getFieldValue('custentity183');
  var type_razurado= record.getFieldText('custentity184');
  var patologi= record.getFieldValue('custentity74');
  var image_valoration1= record.getFieldValue('custentity274');
  var image_valoration2= record.getFieldValue('custentity275');
  var image_valoration3= record.getFieldValue('custentity276');
   var image_valoration4= record.getFieldValue('custentity291');
   var consultor_val= record.getFieldText('custentity278');
 if(date_val ==null){
    date_val='';
  }

   //-----------------------------------------------FIN HOJA DIGRMA DE ALOPECIA--------------------
 try{
   var dataID="Expediente_KHG_HAIR/"+sucursal+"_EXP_KHG_HAIR/"+id+"_FOLDER/EXP_"+id+"_signDoc.pdf";

var LOADfile = nlapiLoadFile(dataID); 
  response.setContentType('PDF',"EXP_"+id+"_signDoc.pdf", 'INLINE');
   response.write(LOADfile.getValue());

 }catch(err){
  //-----------------------------------------------INICIO HOJA CONTEO FOLICULAR------------------------------------
  var idProsc=0;
   var date_pros='';
idProsc=record.getFieldValue('custentity227');
  if(idProsc!=null){
    try{
      var record2 = nlapiLoadRecord('supportcase', parseInt(idProsc));
    }
    catch(err)
    {}

    if(record2!=null){
      var textoimagnes=record2.getFieldValue('custevent88');

        var date_incid=record2.getFieldValue('startdate');
        var TA_PRE=record2.getFieldValue('custevent4');
        var FC_PRE=record2.getFieldValue('custevent7');
        var TA_TRANS=record2.getFieldValue('custevent5');
        var FC_TRANS=record2.getFieldValue('custevent8');
        var TA_POST=record2.getFieldValue('custevent6');
        var FC_POST=record2.getFieldValue('custevent9');
        var total_folic=record2.getFieldValue('custevent_ns_cuf_total');
        var IN_EXTR=record2.getFieldValue('custevent_inicio_extraccion');
        var TER_EXTR=record2.getFieldValue('custevent_termino_extraccion');
        var IN_CORT=record2.getFieldValue('custevent_inicio_corte');
        var TER_CORT=record2.getFieldValue('custevent_termino_corte');
        var IN_IMPLA=record2.getFieldValue('custevent_inicio_implantacion');
        var TER_IMPLA=record2.getFieldValue('custevent_termino_implantacion');
        var FOLI_V=record2.getFieldValue('custevent_ns_cf_total');
        var FOLI_NV=record2.getFieldValue('custevent_ns_cf_total_nv');
        var FOLI_V_NV=record2.getFieldValue('custevent_ns_cf_total_tt');
        var proyectados=record2.getFieldValue('custevent74');
        var procedimiento=record2.getFieldValue('title');
        var DATEPOST=record2.getFieldText('custevent16');
        var image_1= record2.getFieldValue('custevent76');
        var image_2= record2.getFieldValue('custevent77');
        var image_3= record2.getFieldValue('custevent78');
            var image_4= record2.getFieldValue('custevent81');
            var image_5= record2.getFieldValue('custevent82'); 
            var image_6= record2.getFieldValue('custevent83');
            var image_7= record2.getFieldValue('custevent84'); 
            var image_8= record2.getFieldValue('custevent85'); 
      
      
            
       //-----------------------------------------------INICIO HOJA ENFERMERIA------------------------------------
 var alerta=record2.getFieldValue('custevent94');
  var orientado=record2.getFieldValue('custevent95');
  var conciente=record2.getFieldValue('custevent89');
  var tranquilo=record2.getFieldValue('custevent90');
  var ansioso=record2.getFieldValue('custevent91');
  var letargico=record2.getFieldValue('custevent92');
  var nervioso=record2.getFieldValue('custevent93');
  var otro=record2.getFieldValue('custevent96');
  var foto_in=record2.getFieldText('custevent97');
  var foto_fin=record2.getFieldText('custevent98');
  var Anes_anes=record2.getFieldValue('custevent101');
  var Anes_infiltro=record2.getFieldValue('custevent102');
  var Anes_horain=record2.getFieldValue('custevent99');
  var Anes_horafin=record2.getFieldValue('custevent100');
  var Anes_anes2=record2.getFieldValue('custevent103');
  var Anes_infiltro2=record2.getFieldValue('custevent104');
  var Anes_horain2=record2.getFieldValue('custevent105');
  var Anes_horafin2=record2.getFieldValue('custevent106');
  var Anti_Realizo=record2.getFieldValue('custevent107');
  var Anti_Region=record2.getFieldValue('custevent108');
  var Antiseptico=record2.getFieldValue('custevent109');
  var Anti_Realizo2=record2.getFieldValue('custevent111');
  var Anti_Region2=record2.getFieldValue('custevent112');
  var Antiseptico2=record2.getFieldValue('custevent110');
 //-

 //-----------------------------------------------INICIO MUESTRA PRP------------------------------------
    var respon=record2.getFieldValue('custevent113');
    var equi=record2.getFieldValue('custevent122');
    var sitioPun=record2.getFieldValue('custevent121');
    var no_inten =record2.getFieldValue('custevent123');
    var tubos=record2.getFieldValue('custevent120');
    var centrifugados=record2.getFieldValue('custevent119');
    var tiempo=record2.getFieldValue('custevent118');
    var responPRP1=record2.getFieldValue('custevent117');
    var regionPRP1=record2.getFieldValue('custevent116');
    var responPRP2=record2.getFieldValue('custevent115');
    var regionPRP2=record2.getFieldValue('custevent114');
    //-----------------------------------------------FIN MUESTRA PRP------------------------------------
      
            date_pros = record2.getFieldValue('startdate');
        if(date_pros==null){
          date_pros='';
        }
      
  var firma_cli= record2.getFieldValue('custevent86');  
  if(firma_cli!=null){ var firma_cli="<img height=\"60px\" width=\"120px\" src=\""+firma_cli+"\"/>";
  } else{firma_cli="";}
  var firma_med= record2.getFieldValue('custevent87');
  if(firma_med!=null){ var firma_med="<img height=\"60px\" width=\"120px\" src=\""+firma_med+"\"/>";
  }else{firma_med="";}
           //-----------------------------------------------INICIO VARIABLES PROCEDIMIENTO------------------------------------
      
        var asigMedicos=record2.getFieldText('custevent28');
        var enfer_extra=record2.getFieldText('custevent71');
        var enfer_implan=record2.getFieldText('custevent72');
        var enfer_trico=record2.getFieldValue('custevent75');
        var apply =record2.getFieldTexts('custevent29');
      
      
          var applySublitsCount = record2.getLineItemCount('recmachcustrecord_nro_cf');
           var litsCount = record2.getLineItemCount('recmachcustrecord_nro_cfs');
            var coutControlCor=record2.getLineItemCount("recmachcustrecord_control_corte");
            var litsCount_noViables = record2.getLineItemCount('recmachcustrecord_nro_cfs_nv');
     }
  }else{
    record2=null;
  }
    //-----------------------------------------------FIN HOJA CONTEO FOLICULAR------------------------------------
  //-----------------------IMAGENES ALOPECIA-----------------------------------------

  var PDF_PRESUPUESTO= record.getFieldValue('custentity186');
  if(PDF_PRESUPUESTO!=null&&PDF_PRESUPUESTO!=""){
  var filePDFPRE = nlapiLoadFile(PDF_PRESUPUESTO);
  var DOCPDFPRE= filePDFPRE.getURL();}else{DOCPDFPRE=null;}

  var file_firma= record.getFieldValue('custentity187');
  if(file_firma!=null){
  //var fileImage = nlapiLoadFile(file_firma);
  //var urlImage= fileImage.getValue();
  var file_firma="<img height=\"60px\" width=\"120px\" src=\""+file_firma+"\"/>";
  //var file_firma="<img height=\"60px\" width=\"120px\" src=\"data:image/jpg;base64,"+file_firma+"\"/>";
  }else{file_firma="";}
  
  var firma_doc_assig= record.getFieldValue('custentity189');
   if(firma_doc_assig!=null){
  //var fileImage = nlapiLoadFile(firma_doc_assig);
  //var urlImage= fileImage.getValue();
  //var firma2="<img height=\"60px\" width=\"120px\" src=\"data:image/jpg;base64,"+firma_doc_assig+"\"/>";
  var firma_doc_assig="<img height=\"60px\" width=\"120px\" src=\""+firma_doc_assig+"\"/>";
  }else{firma_doc_assig="";}
  
  var firma_client_Injert= record.getFieldValue('custentity285');
  if(firma_client_Injert!=null){
 // var fileImage = nlapiLoadFile(firma_doc_Injert);
  //var urlImage= fileImage.getValue();
   var firma_client_Injert="<img height=\"60px\" width=\"120px\" src=\""+firma_client_Injert+"\"/>";
  //  var firma3="<img height=\"60px\" width=\"120px\" src=\"data:image/jpg;base64,"+firma_client_Injert+"\"/>";
  }else{firma_client_Injert="";}
  
   var firma_doc_Injert= record.getFieldValue('custentity271');
    
  if(firma_doc_Injert!=null){
 // var fileImage = nlapiLoadFile(firma_doc_Injert);
 // var urlImage= fileImage.getValue();
    var firma4="<img height=\"60px\" width=\"120px\" src=\"data:image/jpg;base64,"+firma_doc_Injert+"\"/>";
  }else{firma4="";}
  
  var firma_testigo1= record.getFieldValue('custentity272');
  if(firma_testigo1!=null){
  var fileImage = nlapiLoadFile(firma_testigo1);
  var urlImage= fileImage.getValue();
    var firma4="<img height=\"60px\" width=\"120px\" src=\""+firma_testigo1+"\"/>";
    //var firma4="<img height=\"60px\" width=\"120px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(urlImage)+"\"/>";
  }else{firma4="";

  var firma_testigo2= record.getFieldValue('custentity273');
  if(firma_testigo2!=null){
  //var fileImage = nlapiLoadFile(firma_testigo2);
  //var urlImage= fileImage.getValue();
     var firma5="<img height=\"60px\" width=\"120px\" src=\""+firma_testigo2+"\"/>";
    //var firma5="<img height=\"60px\" width=\"120px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(urlImage)+"\"/>";
  }else{firma5="";}
        
   if(record2!=null){
  if(image_1!=null&&image_1!=""){
  var file1 = nlapiLoadFile(image_1);
  image_1= file1.getValue();
 var imgtry ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_1)+"\"/>";
}else{
  imgtry="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}

    if(image_2!=null&&image_2!=""){
    var file2 = nlapiLoadFile(image_2);
  image_2= file2.getValue();
 var imgtry2 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_2)+"\"/>";

}else{
  imgtry2="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}
 
if(image_3!=null&&image_3!=""){
  var file3 = nlapiLoadFile(image_3);
  image_3= file3.getValue();
  var imgtry3 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_3)+"\"/>";
}else{
  imgtry3="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}

  if(image_4!=null&&image_4!=""){
  var file4 = nlapiLoadFile(image_4);
  image_4= file4.getValue();
  var imgtry4 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_4)+"\"/>";
}else{
  imgtry4="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}

if(image_5!=null&&image_5!=""){
  var file5 = nlapiLoadFile(image_5);
  image_5= file5.getValue();
var imgtry5 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_5)+"\"/>";
}else{
  imgtry5="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}

if(image_6!=null&&image_6!=""){
  var file6 = nlapiLoadFile(image_6);
  image_6= file6.getValue();
  var imgtry6 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_6)+"\"/>";
}else{
  imgtry6="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}     

if(image_7!=null&&image_4!=""){
  var file7 = nlapiLoadFile(image_7);
  image_7= file7.getValue();
  var imgtry7 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_7)+"\"/>";
}else{
  imgtry7="<p style=\"color:red\">NO HAY IMAGEN!</p>";
} 
     
if(image_8!=null&&image_4!=""){
  var file8 = nlapiLoadFile(image_8);
  image_8= file8.getValue();
  var imgtry8 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_8)+"\"/>";
}else{
  imgtry8="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}
     
  }else{
  imgtry="<p style=\"color:red\">NO HAY IMAGEN!</p>";
  imgtry2="<p style=\"color:red\">NO HAY IMAGEN!</p>";
  imgtry3="<p style=\"color:red\">NO HAY IMAGEN!</p>";
  imgtry4="<p style=\"color:red\">NO HAY IMAGEN!</p>";
  imgtry5="<p style=\"color:red\">NO HAY IMAGEN!</p>";
  imgtry6="<p style=\"color:red\">NO HAY IMAGEN!</p>";
  imgtry7="<p style=\"color:red\">NO HAY IMAGEN!</p>"; 
  imgtry8="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}
  //----------------------FIN IMAGENES ALOPECIA-----------------------------

  //----------------------Fotos Valoración----------------------------------
  
  if(image_valoration1!=null&&image_valoration1!=""){
  var file_image1 = nlapiLoadFile(image_valoration1);
 var image_url1= file_image1.getValue();
 var img_val_1 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_url1)+"\"/>";
}else{
  img_val_1="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}

    if(image_valoration2!=null&&image_valoration2!=""){
    var file_image2 = nlapiLoadFile(image_valoration2);
 var image_url2= file_image2.getValue();
 var img_val_2 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_url2)+"\"/>";

}else{
  img_val_2="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}
 
if(image_valoration3!=null&&image_valoration3!=""){
  var file_image3 = nlapiLoadFile(image_valoration3);
  var image_url3= file_image3.getValue();
  var img_val_3 ="<img height=\"250px\" width=\"250px\"  src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_url3)+"\"/>";
}else{
  img_val_3="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}
if(image_valoration4!=null&&image_valoration4!=""){
  var file_image4 = nlapiLoadFile(image_valoration4);
  var image_url4= file_image4.getValue();
  var img_val_4 ="<img height=\"250px\" width=\"250px\" src=\"data:image/jpg;base64,"+nlapiEscapeXML(image_url4)+"\"/>";
}else{
  img_val_4="<p style=\"color:red\">NO HAY IMAGEN!</p>";
}
//-----------------------Fin Fotos Valoración-------------------------------

     if(record2!=null){
var myarray=new Array();
   myarray=apply;
  //var asigEnferm=myarray[0]+"_"+myarray[1];
  var countArray=myarray.length;
  var enfermero1=""; var enfermero2="";
  if(countArray<=2){
 enfermero1=myarray[0];
  enfermero2=myarray[1];
  }
     else{
        enfermero1="";
  enfermero2="";
     }
     }

// asigEnferm=xd;
     //-----------------------------------------------FIN VARIABLES PROCEDIMIENTO------------------------------------


    var footer_image="https://system.na2.netsuite.com/core/media/media.nl?id=740506&c=3559763&h=b6a79d6f686805a642c3";
  var alopesiType="https://system.na2.netsuite.com/core/media/media.nl?id=742247&c=3559763&h=74fbf0392166942c7410";

  function checado(checks) {
var check ="";
 if (checks == "T"){
     var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
     check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path)+"\">probando</img>";
   }
  else {
    if(checks == "F") {
       var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
       check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
   }else {
     if(checks == null){
       check ="";
     }else{
       check=checks;
     }
   }
       }
   return check;
}

  function typeEstado(checks) {
var check ="";
 if (checks == 1){
     var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
     check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path)+"\">probando</img>";
   }
  else {
    if(checks == 2) {
       var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
       check ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
   }else {
     if(checks == null){
       check ="";
     }else{
       check=checks;
     }
   }
       }
   return check;
}

 function dates(varDate){
   var dates="";
   if(varDate!=null&&varDate!=""){
      var path = "https://system.na2.netsuite.com/core/media/media.nl?id=740487&c=3559763&h=e1eb9a6dd4127855a2d1";
   dates ="<img height=\"15px\" valign=\"middle\" width=\"15px\" src=\""+nlapiEscapeXML(path)+"\">probando</img>";
   }else{
       var path2 = "https://system.na2.netsuite.com/core/media/media.nl?id=740488&c=3559763&h=cf9e78c446e99e18fefb";
     dates ="<img height=\"15px\" width=\"15px\" src=\""+nlapiEscapeXML(path2)+"\"/>";
   }
   return dates;
 }
  function funt1(Num){
    var entero=parseInt(Num);
    var imageSelect="";
         imageSelect="https://system.na2.netsuite.com/core/media/media.nl?id=743291&c=3559763&h=1e56212e1db2d20cecd8";
  if(entero==1){
     imageSelect= "<img height=\"78px\" valign=\"middle\" border=\"2px\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }else{

  imageSelect= "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }
     return imageSelect;
  }
    function funt2(Num){
      var entero=parseInt(Num);
      var imageSelect="";
       imageSelect="https://system.na2.netsuite.com/core/media/media.nl?id=743292&c=3559763&h=76fba8deb7014f71c1f7";
  if(entero==2){
     imageSelect= "<img height=\"78px\" valign=\"middle\" border=\"2px\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }else{

  imageSelect= "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }
  return imageSelect;
    }
  function funt3(Num){
    var entero=parseInt(Num);
    var imageSelect="";
      imageSelect="https://system.na2.netsuite.com/core/media/media.nl?id=743293&c=3559763&h=7dec6caa816e21b8bc6e";
         if(entero==3){
     imageSelect= "<img height=\"78px\" valign=\"middle\" border=\"2px\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }else{
    
  imageSelect= "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }
    return imageSelect;
  }

    function funt4(Num){
      var entero=parseInt(Num);
      var imageSelect="";
      imageSelect="https://system.na2.netsuite.com/core/media/media.nl?id=743294&c=3559763&h=1185d5785a0770214839";
      if(entero==4){
     imageSelect= "<img height=\"78px\" valign=\"middle\" border=\"2px\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }else{
  imageSelect= "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }
      return imageSelect;
    }
      function funt5(Num){
        var entero=parseInt(Num);
         var imageSelect="";
         imageSelect="https://system.na2.netsuite.com/core/media/media.nl?id=743295&c=3559763&h=7a635732f3364dfd193f";
         if(entero==5){
     imageSelect= "<img height=\"78px\" valign=\"middle\" border=\"2px\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }else{

  imageSelect= "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }
         return imageSelect;
      }
    function funt6(Num){
      var entero=parseInt(Num);
       var imageSelect="";
       imageSelect="https://system.na2.netsuite.com/core/media/media.nl?id=743296&c=3559763&h=2d035ee0a3af4a40b135";
         if(entero==6){
     imageSelect= "<img height=\"78px\" valign=\"middle\" border=\"2px\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }else{
  imageSelect= "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }
      return imageSelect;
    }
   function funt7(Num){
     var entero=parseInt(Num);
     var imageSelect="";
      imageSelect="https://system.na2.netsuite.com/core/media/media.nl?id=743297&c=3559763&h=d1987980bf9f6bb72443";
         if(entero==7){
     imageSelect= "<img height=\"78px\" valign=\"middle\" border=\"2px\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }else{
  imageSelect= "<img height=\"78px\" valign=\"middle\" width=\"78px\" src=\""+nlapiEscapeXML(imageSelect)+"\"></img>";
  }
     return imageSelect;
   }
 // var imageSelected= typeAlopesi(type_alop);
  function DateNow(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    today = mm+'/'+dd+'/'+yyyy; // change the format depending on the date format preferences set on your account
    return today;
}
   //----------------------------------------------------------------------------------------- inicio conteo por unidad folicular----------------------------------------------

  var cadena="";
  var totalRecord=0;
  var style="style=\"background-color:#C8C8C8\"";
   var contador=0;
  var sumaH1=0;  var sumaH2=0;  var sumaH3=0;  var sumaH4=0;  var sumaH5=0;
        var countverticalH1=0;
   var countverticalH2=0;
   var countverticalH3=0;
   var countverticalH4=0;
     var countverticalH5=0;
  if(record2!=null){
for (var i = 0; i < applySublitsCount; i++) {
 var RecordNumero = record2.getLineItemValue('recmachcustrecord_nro_cf', 'custrecord_nro_cuf', i+1);
var RecordH1 = record2.getLineItemValue('recmachcustrecord_nro_cf', 'custrecord_una_hora', i+1);
  var RecordH2 = record2.getLineItemValue('recmachcustrecord_nro_cf', 'custrecord_dos_horas', i+1);
var RecordH3 = record2.getLineItemValue('recmachcustrecord_nro_cf', 'custrecord_tres_horas', i+1);
  var RecordH4 = record2.getLineItemValue('recmachcustrecord_nro_cf', 'custrecord_cuatro_horas', i+1);
var RecordH5 = record2.getLineItemValue('recmachcustrecord_nro_cf', 'custrecord_cinco_horas', i+1);
  var RecordSubtotal = record2.getLineItemValue('recmachcustrecord_nro_cf', 'custrecord_cf_sub_total', i+1);
      totalRecord+=parseInt(RecordSubtotal);
  sumaH1+=parseInt(RecordH1);
  countverticalH1+=(parseInt(RecordH1))*(i+1);
   sumaH2+=parseInt(RecordH2);
   countverticalH2+=(parseInt(RecordH2))*(i+1);
     sumaH3+=parseInt(RecordH3);
   countverticalH3+=(parseInt(RecordH3))*(i+1);
       sumaH4+=parseInt(RecordH4);
   countverticalH4+=(parseInt(RecordH4))*(i+1);
         sumaH5+=parseInt(RecordH5);
   countverticalH5+=(parseInt(RecordH5))*(i+1);
  if(contador==0){
    style="";
    contador=1;
  }else{

      style="style=\"background-color:#C8C8C8\"";
      contador=0;
  }

 if(i==00){
 cadena +="<tr>";
  cadena +="<td width=\"10\" align=\"center\"  border=\"1px\">"+checado(RecordNumero)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\"  border=\"1px\">"+checado(RecordH1)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\"  border=\"1px\">"+checado(RecordH2)+"";
  cadena +="</td>";
  cadena +="<td align=\"center\"  border=\"1px\">"+checado(RecordH3)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\"  border=\"1px\">"+checado(RecordH4)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\"  border=\"1px\">"+checado(RecordH5)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\"  border=\"1px\">"+checado(RecordSubtotal)+"";
  cadena +="</td>";

  cadena +="<td border=\"1px\" align=\"center\" valign=\"middle\" rowspan=\"5\">contaNum";
  cadena +="</td>";
  cadena +="</tr>";
  }

   if(i!=00){
     cadena +="<tr>";
  cadena +="<td width=\"10\" align=\"center\"  "+style+" border=\"1px\">"+checado(RecordNumero)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\" "+style+"  border=\"1px\">"+checado(RecordH1)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\" "+style+"  border=\"1px\">"+checado(RecordH2)+"";
  cadena +="</td>";

  cadena +="<td align=\"center\" "+style+"  border=\"1px\">"+checado(RecordH3)+"";
  cadena +="</td>";

   cadena +="<td align=\"center\" "+style+"  border=\"1px\">"+checado(RecordH4)+"";
  cadena +="</td>";
  
   cadena +="<td align=\"center\" "+style+"  border=\"1px\">"+checado(RecordH5)+"";
  cadena +="</td>";
  
   cadena +="<td align=\"center\" "+style+"  border=\"1px\">"+checado(RecordSubtotal)+"";
  cadena +="</td>";
    cadena +="<td>";
  cadena +="</td>";
  cadena +="</tr>";
   }
}
  
    cadena +="<tr>";
  
  cadena +="<td border=\"1px\">";
  cadena +="</td>";
  
  cadena +="<td align=\"center\"  border=\"1px\">"+checado(sumaH1)+"";
  cadena +="</td>";
  
  cadena +="<td align=\"center\"  border=\"1px\">"+checado(sumaH2)+"";
  cadena +="</td>";
  
   cadena +="<td align=\"center\" border=\"1px\">"+checado(sumaH3)+"";
  cadena +="</td>";
  
   cadena +="<td align=\"center\"  border=\"1px\">"+checado(sumaH4)+"";
  cadena +="</td>";
  
   cadena +="<td align=\"center\"  border=\"1px\">"+checado(sumaH5)+"";
  cadena +="</td>";
  
   cadena +="<td border=\"1px\">";
  cadena +="</td>";
    cadena +="<td>";
  cadena +="</td>";
  cadena +="</tr>";
 var rest= parseInt(FOLI_V_NV)-parseInt(FOLI_NV);
 var PERCEN1=(rest*(100))/(parseInt(FOLI_V_NV));
 var PERCEN=parseInt(PERCEN1);
    totalRecord=sumaH1+sumaH2+sumaH3+sumaH4+sumaH5;
  cadena=cadena.replace("contaNum",totalRecord);
    
    
      var cadena2="";
  var totalRecord2=0;
  var contador=0;
  var totalH1=0;  var totalH2=0;  var totalH3=0;  var totalH4=0;  var totalH5=0;
    var sumatotalfoliculo=countverticalH1+countverticalH2+countverticalH3+countverticalH4+countverticalH5;
     cadena2 +="<tr>";
  cadena2 +="<td align=\"center\" border=\"1px\" valign=\"middle\"><b>1</b>";
   cadena2 +="</td>";
  
   cadena2 +="<td align=\"center\" border=\"1px\" valign=\"middle\"><b>"+checado(countverticalH1)+"</b>";
   cadena2 +="</td>";
    cadena2 +="<td align=\"center\" border=\"1px\" valign=\"middle\"><b>"+checado(countverticalH2)+"</b>";
   cadena2 +="</td>";
    cadena2 +="<td align=\"center\" border=\"1px\" valign=\"middle\"><b>"+checado(countverticalH3)+"</b>";
   cadena2 +="</td>";

   cadena2 +="<td align=\"center\" border=\"1px\" valign=\"middle\"><b>"+checado(countverticalH4)+"</b>";
   cadena2 +="</td>";

   cadena2 +="<td align=\"center\" border=\"1px\" valign=\"middle\"><b>"+checado(countverticalH5)+"</b>";
   cadena2 +="</td>";

      cadena2 +="<td align=\"center\" border=\"1px\" rowspan=\"4\" valign=\"middle\"><b>"+sumatotalfoliculo+"</b>";
   cadena2 +="</td>";
  cadena2 +="</tr>";
    
  }
 //----------------------------------------------------------------------------------------- fin conteo por unidad folicular----------------------------------------------
   //----------------------------------------------------------------------------------------- inicio unidad folicular viables----------------------------------------------



     //----------------------------------------------------------------------------------------- fin unidad folicular----------------------------------------------
     //----------------------------------------------------------------------------------------- inicio unidad folicular no viables----------------------------------------------

    var totalNVH1=0;  var totalNVH2=0;  var totalNVH3=0;  var totalNVH4=0;  var totalNVH5=0;
  var RecordNVH1=0;  var RecordNVH2=0;  var RecordNVH3=0;  var RecordNVH4=0;  var RecordNVH5=0;
  if(record2!=null){
  for(var i=0; i<litsCount_noViables;i++){
      RecordNVH1 = record2.getLineItemValue('recmachcustrecord_nro_cfs_nv', 'custrecord_una_hora_cf_nv', i+1);
      RecordNVH2 = record2.getLineItemValue('recmachcustrecord_nro_cfs_nv', 'custrecord_dos_horas_cf_nv', i+1);
      RecordNVH3 = record2.getLineItemValue('recmachcustrecord_nro_cfs_nv', 'custrecord_tres_horas_cf_nv', i+1);
      RecordNVH4 = record2.getLineItemValue('recmachcustrecord_nro_cfs_nv', 'custrecord_cuatro_horas_cf_nv', i+1);
      RecordNVH5 = record2.getLineItemValue('recmachcustrecord_nro_cfs_nv', 'custrecord_cinco_horas_cf_nv', i+1);
    if(RecordNVH1==null)
      RecordNVH1=0;
    if(RecordNVH2==null)
      RecordNVH2=0;
    if(RecordNVH3==null)
      RecordNVH3=0;
    if(RecordNVH4==null)
      RecordNVH4=0;
      if(RecordNVH5==null)
      RecordNVH5=0;
 totalNVH1+=parseInt(RecordNVH1);
   totalNVH2+=parseInt(RecordNVH2);
     totalNVH3+=parseInt(RecordNVH3);
       totalNVH4+=parseInt(RecordNVH4);
         totalNVH5+=parseInt(RecordNVH5);
 }}

 function porcentajes(foli_viables, foli_no_viables){

   if(foli_viables!=null&&foli_viables!=""&&foli_viables!=0){
     var suma=parseInt(foli_viables)+parseInt(foli_no_viables);
   var rest= suma-parseInt(foli_no_viables);
  var PERCEN_F=(rest*(100))/(parseInt(suma));
 var PERCEN1=parseInt(PERCEN_F);

   } else{

     PERCEN1=0;
   }
   return PERCEN1+" %";
 }

     //----------------------------------------------------------------------------------------- fin unidad folicular no viables----------------------------------------------
     //----------------------------------------------------------------------------------------- inicio control de corte----------------------------------------------

  var cadena3="";

  function checkHrs(hrs){
     var hrsCheck=0;
    if(hrs!=null&&hrs!=""){
    hrsCheck= hrs;

    }else{
       hrsCheck=0;

    }

   return hrsCheck;
  }
  if(record2!=null){
  if(coutControlCor!=null){

    for(var i=0; i<coutControlCor;i++){
 var RecordCorte_Enf = record2.getLineItemText('recmachcustrecord_control_corte', 'custrecord_enfermera', i+1);
var RecordCorteH1 = record2.getLineItemValue('recmachcustrecord_control_corte', 'custrecord_hora1_cc', i+1);
  var RecordCorteH2 = record2.getLineItemValue('recmachcustrecord_control_corte','custrecord_hora2_cc', i+1);
var RecordCorteH3 = record2.getLineItemValue('recmachcustrecord_control_corte', 'custrecord_hora3_cc', i+1);
  var RecordCorteH4 = record2.getLineItemValue('recmachcustrecord_control_corte', 'custrecord_hora4_cc', i+1);
var RecordCorteH5= record2.getLineItemValue('recmachcustrecord_control_corte', 'custrecord_hora5_cc', i+1);
      var subTotal = record2.getLineItemValue('recmachcustrecord_control_corte', 'custrecord_subtotal_cc', i+1);
      if(contador==0){
    style="";
    contador=1;
  }else{
       style="style=\"background-color:#C8C8C8\"";
      contador=0;
  }

  cadena3 +="<tr height=\"60px\">";
  cadena3 +="<td width=\"120\"  align=\"center\" "+style+" border=\"1px\" valign=\"middle\"><b>"+checado(RecordCorte_Enf)+"</b>";
  cadena3 +="</td>";
  cadena3 +="<td width=\"71\"  align=\"center\" "+style+" border=\"1px\"  valign=\"middle\"><b>"+checkHrs(RecordCorteH1)+"</b>";
  cadena3 +="</td>";
  cadena3 +="<td width=\"71\"  align=\"center\" "+style+" border=\"1px\"  valign=\"middle\"><b>"+checkHrs(RecordCorteH2)+"</b>";
  cadena3 +="</td>";
  cadena3 +="<td width=\"71\"  align=\"center\" "+style+" border=\"1px\" valign=\"middle\"><b>"+checkHrs(RecordCorteH3)+"</b>";
  cadena3 +="</td>";
  cadena3 +="<td width=\"71\"  align=\"center\" "+style+" border=\"1px\" valign=\"middle\"><b>"+checkHrs(RecordCorteH4)+"</b>";
  cadena3 +="</td>";
  cadena3 +="<td width=\"71\"  align=\"center\" "+style+" border=\"1px\"  valign=\"middle\"><b>"+checkHrs(RecordCorteH5)+"</b>";
  cadena3 +="</td>";
  cadena3 +="<td width=\"71\"  align=\"center\" "+style+" border=\"1px\"  valign=\"middle\"><b>"+checkHrs(subTotal)+"</b>";
  cadena3 +="</td>";
  cadena3 +="</tr>";
    }

  }}
  // var Record2Numero = record2.getLineItemValue('recmachcustrecord_nro_cfs', 'custrecord_nro_fc', i+1);
     //----------------------------------------------------------------------------------------- fin control de corte----------------------------------------------
   var imageURL = "https://system.na2.netsuite.com/core/media/media.nl?id=743298&c=3559763&h=8560f5a4e2852363f9b4";
   var  imageDiagram ="<img width=\"180px\" height=\"300px\" src=\""+nlapiEscapeXML(imageURL)+"\"/>";

var imagebefore = "https://system.na2.netsuite.com/core/media/media.nl?id=745289&c=3559763&h=10a38a99407943c64444";
   var  imagehead ="<img width=\"183px\" height=\"183px\" align=\"center\" src=\""+nlapiEscapeXML(imagebefore)+"\"/>";
  
   var imageafter = "https://system.na2.netsuite.com/core/media/media.nl?id=745290&c=3559763&h=14700e1ccce51b00221c";
   var  imageheadcomplete ="<img width=\"183px\" height=\"183px\" align=\"center\" src=\""+nlapiEscapeXML(imageafter)+"\"/>";
  
var  strName0="<div style=\"font-size:10pt\">";
    strName0+="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">FORMATO DE VALORACIÓN</td><td width=\"33%\"></td></tr></table>";

    strName0+= "<table width=\"100%\">";
    strName0 += "<tr>";
    strName0+= "<td width=\"275\" style=\"font-family:'Aria', sans-serif\"><b>No. de Expediente: &nbsp;</b>"+ checado(id) + "</td>";
    strName0 += "</tr>";
    strName0 += "<tr>";
    strName0 += "<td width=\"275\" style=\"font-family:'Aria', sans-serif\"><b>NOMBRE: &nbsp;</b>" +  checado(name) + "</td>";
     strName0+= "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>CURP: &nbsp;</b>" + checado(curl) + "</td>";
    strName0 += "</tr>";
    strName0 += "<tr>";
    strName0 += "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>EDAD: &nbsp;</b>" + checado(age) + "</td>";     
  strName0 += "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>TELÉFONO: &nbsp;</b>" + checado(phone) + "</td>";
    strName0 += "</tr>";
    strName0 += "<tr>";
   strName0 += "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>FECHA DE NACIMIENTO: &nbsp;</b>" + checado(date) + "</td>";
    strName0 += "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>SUCURSAL: &nbsp;</b>"+ checado(sucursal) + "</td>";
    strName0 += "</tr>";
     strName0 += "<tr>";
     strName0 += "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>DIRECCIÓN: &nbsp;</b><u>" + checado(address) + "</u></td>";
    strName0 += "</tr>";
     strName0 += "<tr>";
     strName0 += "</tr>";
  strName0 += "</table>";
  strName0 += "<p width=\"100%\"  style=\"font-family:'Aria', sans-serif\"><b>COMENTARIOS: &nbsp;</b>" + checado(comment) + "</p>";

  strName0 += "<table width=\"100%\">";
    strName0 += "<tr>";
     strName0 += "<td style=\"font-family:'Aria', sans-serif\" align=\"center\" color=\"#FFFFFF\" colspan=\"2\" background-color=\"#346094\"><b>Cómo se enteró de Nosotros</b></td>";
    strName0 += "</tr>";

   strName0 += "</table>";

   strName0 += "<table width=\"100%\">";
    strName0 += "<tr>";
    strName0 += "<td width=\"50%\"  style=\"font-family:'Aria', sans-serif\">MEDIOS: &nbsp;" + checado(medios) + "</td>";
    strName0 += "<td width=\"50%\"  style=\"font-family:'Aria', sans-serif\" align=\"right\">CAMPAÑA: &nbsp;"+ checado(campaign) + "</td>";
    strName0 += "</tr>";
   strName0 += "</table>";
    strName0 += "<table width=\"100%\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"100%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" colspan=\"2\" background-color=\"#346094\" align=\"center\"><b>Datos Generales</b></td>";
     strName0 += "</tr>";
  strName0 += "</table>";
strName0 += "<br/>";
  strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">" + checado(hair) +"</td>";
     strName0 += "<td width=\"255\">Familiar con pérdida de cabello</td>";
    strName0 += "<td width=\"20\"></td>";
  strName0 += "<td width=\"255\"><p>¿Como trató la pérdida de cabello?<b>"+ checado(textlost_hair) +"</b></p></td>";
     strName0 +="</tr>";
    strName0 += "</table>";
  
  strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
  strName0 += "<td width=\"255\">Comienzo de pérdida de cabello:<b>&nbsp;"+ checado(starter_hair) +"</b></td>";
    strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Observó resultados?<b>&nbsp;"+ checado(textobservation) +"</b></td>";
     strName0 +="</tr>";
    strName0 += "</table>";
    strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">" + checado(hair_check) +"</td>";
     strName0 += "<td width=\"255\">¿Trató la pérdida de cabello?</td>";
    strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Con qué frecuencia lava su cabello?<b>&nbsp;"+ checado(textfrecuenci) +"</b></td>";
     strName0 +="</tr>";
    strName0 += "</table>";

   strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Hace cuánto tiempo?<b>&nbsp;"+ checado(since)+"</b></td>";
    strName0 += "<td width=\"20\">"+ checado(alteration) +"</td>";
     strName0 += "<td width=\"255\">Alteraciones recientes en el cuero cabelludo</td>";
     strName0 +="</tr>";
    strName0 += "</table>";

   strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">"+ checado(hairs) +"</td>";
     strName0 += "<td width=\"255\">¿Comezón en el cuero cabelludo?</td>";
    strName0 += "<td width=\"20\">"+ checado(white) +"</td>";
     strName0 += "<td width=\"255\">¿Desprendido de placa blanquesina?</td>";
     strName0 +="</tr>";
    strName0 += "</table>";
   strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">"+ checado(exp_file) +"</td>";
     strName0 += "<td width=\"255\">Expediente físico</td>";
    strName0 += "<td width=\"20\"></td>";
  strName0 += "<td width=\"255\">No. de expediente:&nbsp;<b>"+ checado(no_exp) +"</b></td>";
     strName0 +="</tr>";
    strName0 += "</table>";
   strName0 += "<br/>";
    strName0 += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif\">";
    strName0 +="<tr>";
  strName0 += "<td  width=\"100%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\"><b>Historial Clínico</b></td>";
  strName0 +="</tr>";
    strName0 += "</table>";
  strName0 += "<br/>";
  strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">" + checado(grandfather) +"</td>";
     strName0 += "<td width=\"255\">Enfermedad de importancia en abuelos<b> &nbsp;</b></td>";
    strName0 += "<td width=\"20\">"+ checado(renal)+"</td>";
     strName0 += "<td width=\"255\">¿Sufre de algún problema renal?<b>  &nbsp;</b></td>";
     strName0 +="</tr>";
    strName0 += "</table>";
  
  
  
   strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">" + checado(father) +"</td>";
     strName0 += "<td width=\"255\">Enfermedad de importancia en padres<b> &nbsp;</b></td>";
    strName0 += "<td width=\"20\"></td>";
    strName0 += "<td width=\"255\">Tratamiento:<b> &nbsp;"+ checado(tratamiento3) + "</b></td>";
     strName0 +="</tr>";
    strName0 += "</table>";
  strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Cuál?&nbsp;<b>"+ checado(answer1) + "</b></td>";
    strName0 += "<td width=\"20\">"+ checado(neurologic) + "</td>";
     strName0 += "<td width=\"255\">¿Sufre de algún problema neurológico?</td>";
     strName0 +="</tr>";
    strName0 += "</table>";

   strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">"+ checado(cirugia) + "</td>";
     strName0 += "<td width=\"255\">¿Alguna cirugía previa?</td>";
    strName0 += "<td width=\"20\"></td>";
    strName0 += "<td width=\"255\">Tratamiento:&nbsp;<b>"+checado(tratamiento4) +"</b></td>";
    strName0 +="</tr>";
    strName0 += "</table>";

     strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Cuál?&nbsp;<b>"+ checado(answer2) + "</b></td>";
     strName0 += "<td width=\"20\">"+ checado(VIH) + "</td>";
     strName0 += "<td width=\"255\">¿Se ha hecho pruebas de VIH o hepatitis?</td>";
     strName0 +="</tr>";
     strName0 += "</table>";
  
     strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Anestesia previa?&nbsp;<b>"+ checado(anestesia) + "</b></td>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">Respuesta:&nbsp;<b>"+ checado(res) +"</b></td>";
     strName0 +="</tr>";
     strName0 += "</table>";
    //strName0 += "</div>";

  // strName +="<div style=\"font-size:10pt\">";

     strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\">"+ checado(alergia) + "</td>";
     strName0 += "<td width=\"255\">¿Sufre usted de algún tipo de alergia?</td>";
     strName0 += "<td width=\"20\">"+ checado(nasal) + "</td>";
     strName0 += "<td width=\"255\">¿Ha presentado sangrado GIN. o nasal?</td>";
     strName0 +="</tr>";
     strName0 += "</table>";

     strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Cuál?&nbsp;<b>"+ checado(answer3) + "</b></td>";
     strName0 += "<td width=\"20\">"+ checado(hipertencion) + "</td>";
     strName0 += "<td width=\"255\">¿Sufre usted de hipertensión?</td>";
     strName0 +="</tr>";
     strName0 += "</table>";

     strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">¿Tiene usted diabetes?<b>&nbsp;"+ checado(paciente_db) + "</b></td>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">Tratamiento:<b>&nbsp;"+ checado(text_hiper) + "</b></td>";
     strName0 +="</tr>";
     strName0 += "</table>";
  
     strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\">Tratamiento:<b>&nbsp;"+ checado(tratamiento1) + "</b></td>";
   
     strName0 += "<td width=\"20\">"+ checado(toma_medicamento) + "</td>";
     strName0 += "<td width=\"255\">¿Toma actualmente un medicamento?</td>";
     strName0 +="</tr>";
     strName0 += "</table>";
  
     strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
  strName0 += "<td width=\"255\">¿Qué tipo de cicatrización tiene?&nbsp;<b>"+ checado(type_c) +"</b></td>";
    strName0 += "<td width=\"20\"></td>";
  strName0 += "<td width=\"255\">¿Cuál?<b>&nbsp;"+ checado(Medic) + "</b></td>";
     strName0 +="</tr>";
     strName0 +="<tr><td >"+ checado(alcoholismo) +"</td><td colspan=\"4\">¿Ingiere con frecuencia alcohol?</td></tr>";
    strName0 +="<tr><td>"+ checado(smock) +"</td><td>¿Fuma?</td></tr>";
    strName0 += "</table>";

    strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
     strName0 += "<tr>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"255\"></td>";
     strName0 += "<td width=\"20\"></td>";
     strName0 += "<td width=\"20\"></td>";
     strName0 +="</tr>";
     strName0 += "</table>";
     strName0 += "</div>";
     strName0 += "<pbr/>";
     strName0 +="<br/>";
     strName0 +="<div style=\"font-size:10pt\">";
     strName0 +="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">FORMATO DE VALORACIÓN</td><td width=\"33%\"></td></tr></table>";
  
    strName0 += "<table style=\"font-family:'Aria', sans-serif\">";
    strName0 +="<tr><td><br/></td></tr>";
    strName0 +="</table>"; 
  
    strName0 += "<table style=\"font-family:'Aria', sans-serif\">";
    strName0 +="<tr><td width=\"100%\" colspan=\"8\" style=\"background-color:#346094\" color=\"#FFFFFF\"><b>Marque la casilla si padece alguna de estas enfermedades: </b></td></tr>";
  strName0 +="<tr><td width=\"20\">"+ checado(artritis) +"</td><td width=\"117\">Artritis</td><td width=\"20\">"+ checado(claustrofobia) +"</td><td width=\"125\">Claustrofobia</td><td width=\"20\">"+ checado(epilepsia) +"</td><td width=\"117\">Epilepsia</td><td width=\"20\">"+ checado(hipertiroidismo) +"</td><td width=\"117\">Hipertiroidismo</td></tr>"
   strName0 +="<tr><td width=\"20\">"+ checado(asma) +"</td><td>Asma</td><td width=\"20\">"+ checado(colitis) +"</td><td>Colitis</td><td width=\"20\">"+ checado(hipotiroidismo) +"</td><td>Hipotiroidismo</td><td width=\"20\">"+ checado(psoriasis) +"</td><td>Psoriasis</td></tr>"
   strName0 +="<tr><td width=\"20\">"+ checado(cancer) +"</td><td>Cáncer</td><td width=\"20\">"+ checado(eczema) +"</td><td>Eczema</td><td width=\"20\">"+ checado(gastritis) +"</td><td>Gastritis</td><td width=\"20\">"+ checado(SinMetabolico) +"</td><td>Síndrome Metabólico</td></tr>"
   strName0 +="<tr><td><br/></td></tr>";
  strName0 += "</table>";
 strName0 +="</div>";

  strName0 +="<div style=\"font-size:10pt\">";
  strName0 +="<table width=\"550\" style=\"font-family:'Aria', sans-serif;\" >";
  strName0 +="<tr>";
  strName0 +="<td>";
  strName0 +="Algún otro dato que desee referirnos:";
  strName0 +="</td>";
  strName0 +="</tr>";
  strName0 +="</table>";
  strName0 +="</div>";
  
  strName0 +="<div style=\"font-size:10pt\">";
  strName0 +="<table border=\"1px\" width=\"100%\" height=\"130px\" style=\"font-family:'Aria', sans-serif;\" background-color=\"#D3D3D3\">";
  strName0 +="<tr>";
  strName0 +="<td>";
  strName0 +="<b>"+ checado(text_obs) + "</b>";
  strName0 +="</td>";
  strName0 +="</tr>";
  strName0 +="</table>";
  strName0 +="</div>";

  strName0 +="<div style=\"font-size:10pt\">";
  strName0 +="<table width=\"550\" style=\"font-family:'Aria', sans-serif;\" >";
  strName0 +="<tr>";
  strName0 +="<td>";
  strName0 +="IDX:";
  strName0 +="</td>";
  strName0 +="</tr>";
  strName0 +="</table>";
  strName0 +="</div>";
  
  strName0 +="<div style=\"font-size:10pt\">";
  strName0 +="<table border=\"1px\" width=\"100%\" height=\"130px\" style=\"font-family:'Aria', sans-serif;\" background-color=\"#D3D3D3\">";
  strName0 +="<tr>";
  strName0 +="<td>";
  strName0 +="<b>"+checado(IDX)+"</b>";
  strName0 +="</td>";
  strName0 +="</tr>";
  strName0 +="</table>";
  strName0 +="</div>";
  
  strName0 +="<div style=\"font-size:10pt\">";
  strName0 +="<table width=\"550\" style=\"font-family:'Aria', sans-serif;\" >";
  strName0 +="<tr>";
  strName0 +="<td>";
  strName0 +="TX:";
  strName0 +="</td>";
  strName0 +="</tr>";
  strName0 +="</table>";
  strName0 +="</div>";
  
  strName0 +="<div style=\"font-size:10pt\">";
  strName0 +="<table border=\"1px\" width=\"100%\" height=\"130px\" style=\"font-family:'Aria', sans-serif;\" background-color=\"#D3D3D3\">";
  strName0 +="<tr>";
  strName0 +="<td>";
  strName0 +="<b>"+checado(TX)+"</b>";
  strName0 +="</td>";
  strName0 +="</tr>";
  strName0 +="</table>";
  strName0 +="</div>";

  strName0 +="<div style=\"font-size:10pt\">";
  strName0 +="<table width=\"550\" style=\"font-family:'Aria', sans-serif;\" >";
  strName0 += "<tr>";
//  strName0 += "<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">"+firma+"";
  strName0 += "<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">"+file_firma+"";
  strName0 += "</td>";
//  strName0 +="<td style=\"font-family:'Aria', sans-serif\" align=\"center\">"+firma2+"";
  strName0 +="<td style=\"font-family:'Aria', sans-serif\" align=\"center\">"+firma_doc_assig+"";
  strName0 += "</td>";
  strName0 += "</tr>";
  strName0 += "<tr>";
 strName0 += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><u> "+ checado(name)+"</u></td>";
   strName0 += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><u> "+ checado(consultor_val)+"</u></td>";
  strName0 += "</tr>";
  strName0 += "<tr>";
  strName0 += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Nombre y Firma del Paciente</b></td>";
  strName0 += "<td width=\"300\" style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Nombre y Firma</b></td>";
  strName0 += "</tr>";
  strName0 +="</table>";
  strName0 +="</div>";
  strName0 += "<pbr/>";
  strName0 += "<br/>"; 
    strName0+="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">FORMATO DE VALORACIÓN</td><td width=\"33%\"></td></tr></table>";
  strName0 +="<div style=\"font-size:10pt\">";
  
   strName0 += "<table>";
   strName0 += "<tr>";
   strName0 += "<td width=\"550\" style=\"align:center\"></td>";
   strName0 += "</tr>";
   strName0 += "</table>";
   strName0 += "<table style=\"font-family:'Aria', sans-serif\">";
   strName0 += "<tr>";
   strName0 += "<td style=\"align:lefth\">";
   strName0 +="<ul>";
   strName0 +="<li>DIAGRAMA DE CLASIFICACIÓN TIPO AA";
   strName0 +="</li>"; 
   strName0 +="</ul>"; 
   strName0 += "</td>";
   strName0 += "</tr>";
   strName0 += "</table>";
   strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\">";
   strName0 += "<tr>";
   strName0 += "<td width=\"78\">"+funt1(type_alop)+"</td>";
   strName0 += "<td width=\"78\">"+funt2(type_alop)+"</td>";
   strName0 += "<td width=\"78\">"+funt3(type_alop)+"</td>";
   strName0 += "<td width=\"78\">"+funt4(type_alop)+"</td>";
   strName0 += "<td width=\"78\">"+funt5(type_alop)+"</td>";
   strName0 += "<td width=\"78\">"+funt6(type_alop)+"</td>";
   strName0 += "<td width=\"78\">"+funt7(type_alop)+"</td>";
   strName0 += "</tr>";
   strName0 += "<tr >";
   strName0 += "<td align=\"center\" width=\"78\">1</td>";
   strName0 += "<td align=\"center\"  width=\"78\">2</td>";
   strName0 += "<td align=\"center\"  width=\"78\">3</td>";
   strName0 += "<td align=\"center\"  width=\"78\">4</td>";
   strName0 += "<td align=\"center\"  width=\"78\">5</td>";
   strName0 += "<td align=\"center\"  width=\"78\">6</td>";
   strName0 += "<td align=\"center\"  width=\"78\">7</td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td colspan=\"5\" style=\"align:lefth\">Grado:&nbsp;<b>"+checado(type_alop)+"</b></td>";
   strName0 += "<td colspan=\"5\" style=\"align:lefth\">CIE10:&nbsp;<b>"+checado(cie)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "</table>";
 
   strName0 += "<table style=\"font-family:'Aria', sans-serif\">";
   strName0 += "<tr>";
   strName0 += "<td style=\"align:lefth\">";
   strName0 +="<ul>";
   strName0 +="<li>REGISTRO DE EVALUACIÓN DE DENSIDAD";
   strName0 +="</li>"; 
   strName0 +="</ul>"; 
   strName0 += "</td>";
   strName0 += "</tr>";
   strName0 += "</table>";
   strName0 += "<table  border=\"1px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";//
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\"  width=\"250\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante A1 </td>";
  strName0 += "<td valign=\"middle\" align=\"center\" width=\"95\"  border=\"1px\"><b>"+checado(DCDOA1)+"</b></td>";
  strName0 += "<td width=\"180\" height=\"300px\" align=\"center\" border=\"1px\" rowspan=\"8\">"+imageDiagram+" </td>";
   strName0 += "</tr>";
  strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante B1 </td>";
  strName0 += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>"+checado(DCDOB1)+"</b></td>";
   strName0 += "</tr>";
  strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante C1 </td>";
  strName0 += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>"+checado(DCDOC1)+"</b></td>";
  strName0 += "</tr>";
  strName0 += "<tr>";
  strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona donante (PROMEDIO) </td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(DCDOpro)+"</b></td>";
  strName0 += "</tr>";
   //strName += "</table>";
     //strName += "<table border=\"1px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora A </td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(DCZRA1)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora B </td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(DCZRB1)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora C </td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(DCZRC1)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Densidad de Cabellos / cm2 en zona receptora (PROMEDIO) </td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(DCZRpro)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "</table>";
   strName0 += "<table style=\"font-family:'Aria', sans-serif\" >";
   strName0 += "<tr>";
   strName0 += "<td style=\"align:lefth\" >";
   strName0 +="<ul>";
   strName0 +="<li>ÁREA DE MEDICIÓN";
   strName0 +="</li>"; 
   strName0 +="</ul>"; 
   strName0 += "</td>";
   strName0 += "</tr>";
   strName0 += "</table>";
   strName0 += "<table border=\"1px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona donante</td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(AreaZD)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora A</td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(AreaZDA)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora B</td>";
  strName0 += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>"+checado(AreaZDB)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora C</td>";
  strName0 += "<td valign=\"middle\" align=\"center\" width=\"45\" border=\"1px\"><b>"+checado(AreaZDC)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "<tr>";
   strName0 += "<td valign=\"middle\" width=\"300\" border=\"1px\">Área (cm2) en zona receptora</td>";
  strName0 += "<td valign=\"middle\" align=\"center\"  width=\"45\" border=\"1px\"><b>"+checado(AreaZD2)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "</table>";
  strName0 += "<p/>";
  //strName += "<br/>";
  strName0 += "<table  style=\"font-family:'Aria', sans-serif\" width=\"100%\" >";
   strName0 += "<tr>";
    strName0 += "<td style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" width=\"100%\" ><b>TIPOS DE ALOPECIA</b>";
   strName0 += "</td>";
   strName0 += "</tr>";
   strName0 += "</table>";
   strName0 += "<table width=\"550\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
   strName0 += "<tr>";
    strName0 += "<td width=\"30%\" align=\"center\">TIPO:&nbsp;<b>"+checado(type_alop_text)+"</b></td>";
  strName0 += "<td width=\"40%\" align=\"center\">RASURADO:&nbsp;<b>"+checado(type_razurado)+"</b></td>";
    strName0 += "<td width=\"30%\" align=\"center\">PATOLOGÍA:&nbsp;<b>"+checado(patologi)+"</b></td>";
   strName0 += "</tr>";
   strName0 += "</table >";
   strName0+="</div>";
  strName0 += "<pbr/>";
   strName0 += "<br/>";
  
   strName0+="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">FORMATO DE VALORACIÓN</td><td width=\"33%\"></td></tr></table>";

  strName0 +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
  strName0 +="<tr>";
  strName0 +="<td>";
  strName0 +="<br/>";
  strName0 +="</td>";
  strName0 +="</tr>";
  strName0 +="<tr>";
  strName0 +="<td width=\"50%\" align=\"center\">Zona donadora" + img_val_1 + "</td>";
  strName0 +="<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
  strName0 +="<td width=\"50%\" align=\"center\">Frontal" + img_val_2 + "</td>";
  strName0 +="</tr>";
  strName0 +="<tr>";
  strName0 +="<td width=\"50%\" align=\"center\">Coronilla"+ img_val_3 +"</td>";
  strName0 +="<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
  strName0 +="<td width=\"50%\"  align=\"center\">Rostro u Otro" + img_val_4 + "</td>";
  strName0 +="</tr>";
  strName0 += "</table>";

  strName0 +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" >";

  strName0 +="<tr>";
  strName0 +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
 // strName0 +="<td width=\"300px\" align=\"center\" valign=\"middle\">"+firma+"</td>";
  strName0 +="<td width=\"300px\" align=\"center\" valign=\"middle\">"+file_firma+"</td>";
  strName0 +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName0 +="</tr>";
  strName0 +="<tr>";
  strName0 +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName0 +="<td width=\"300px\" align=\"center\" valign=\"middle\"><u> "+ checado(name)+"</u></td>";
  strName0 +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName0 +="</tr>";
  strName0 +="<tr>";
  strName0 +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName0 +="<td width=\"300px\" align=\"center\" valign=\"middle\"><b>Firma del Paciente</b></td>";
  strName0 +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName0 +="</tr>";
  strName0 += "</table>";
 
  //AVISO DE PRIVACIDAD

  var  strName="<br/>";
  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" >";
  strName +="<tr>";
  strName += "<td style=\"align:center\"><b>AVISO DE PRIVACIDAD</b></td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td>";
  strName +="<br/>";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\" align=\"right\">México, D.F. a <b><u>"+  date_val + "</u></b>.</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td>";
  strName +="<br/>";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td>";
  strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">El aviso de privacidad es el documento físico, electrónico o en cualquier otro formato generado por el responsable de la base de datos que es puesto a disposición del titular, previo al tratamiento de sus datos personales. Aquí lo ponemos a su disposición para que conozca sus términos. ¿Qué datos suyos tenemos? Su nombre completo, domicilio, números telefónicos, fecha de nacimiento, correo electrónico, fotografías varias según el procedimiento y datos sobre su historial médico. ¿Para qué usamos sus datos personales en Kaloni? Para proveer los servicios y productos que ha solicitado y para mantenerle informado sobre cambios en los mismos. Para dar estrecho seguimiento al procedimiento efectuado y, evaluar la calidad del servicio que le brindamos. Usted tiene el derecho de consultar sus datos personales, rectificarlos y cancelarlos, así como de oponerse al tratamiento que les demos conforme a nuestros procedimientos. Kaloni otorga la máxima importancia a la confidencialidad y debida protección de la información personal que le es confiada.</p>";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">1. Datos del responsable";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td>";
  strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Kaloni Holding Group S.C. (Kaloni), con domicilio en Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México, es responsable de recabar sus datos personales, del uso que se le dé a los mismos y de su protección, de acuerdo con la 'Ley Federal de Protección de Datos Personales en Posesión de los Particulares'.</p>";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">2. Datos personales";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td>";
  strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Para las finalidades antes mencionadas, requerimos obtener los siguientes datos personales considerados como datos sensibles según la Ley Federal de Protección de Datos Personales en Posesión de los Particulares:</p>";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"align:lefth, font-family:'Aria', sans-serif\" font-size=\"10pt\">";
  strName +="<ul>";
  strName +="<li> Nombre completo.";
  strName +="</li>";
  strName +="<li> Fecha de nacimiento.";
  strName +="</li>";
  strName +="<li> Domicilio, calle, número interior, número exterior, colonia, municipio o delegación, entidad federativa y código postal.";
  strName +="</li>";
  strName +="<li> Teléfono fijo y teléfono móvil";
  strName +="</li>";
  strName +="<li> E-mail.";
  strName +="</li>";
  strName +="<li> Fotografías varias según el procedimiento.";
  strName +="</li>";
  strName +="<li> Historia médica: Tabaquismo, hepatitis, diabetes, sanguíneos, cirugías anteriores, estado de embarazo/lactancia, qué medicamentos toma actualmente, alcohol, tabaquismo, renales, cardiovasculares y alergias.";
  strName +="</li>";
  strName +="</ul>";
  strName +="</td>";
  strName +="</tr>";
  strName += "<tr>";
  strName +="<td style=\"align:lefth, font-family:'Aria', sans-serif\" font-size=\"10pt\">3. Medidas de seguridad y confidencialidad de la información.";
  strName +="</td>";
  strName +="</tr>";
  strName += "<tr>";
  strName += "<td>";
  strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Kaloni se compromete a implementar las medidas de seguridad físicas, administrativas y técnicas necesarias para proteger su información personal contra daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no autorizado. Asimismo, Kaloni y sus empleados, encargados y en general usuarios que tengan acceso a datos personales en el ejercicio de sus funciones o intervengan en cualquier fase del tratamiento se comprometen a guardar confidencialidad respecto de su información personal, incluso después de finalizada la relación con usted o con la empresa.</p>";
 strName += "</td>";
 strName += "</tr>";
 strName +="</table>";
 strName +="<pbr/>";
 strName +="<br/>";

 strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"> 4. Ejercicio de derechos ARCO";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td>";
 strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Usted tiene derecho de acceder, rectificar y cancelar sus datos personales, así como de oponerse al tratamiento de los mismos o revocar el consentimiento que para tal fin nos haya otorgado, a través de los procedimientos que hemos implementado. Para conocer dichos procedimientos, los requisitos y plazos, se puede poner en contacto con nuestro departamento de Legal dirigiéndose a Paola Angélica Ortiz García al teléfono (55) 5022 1056 Ext. 2300, con dirección en: Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México o visitar nuestro sitio en internet: www.kaloni.com.</p>";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Sus derechos consisten en lo siguiente:";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
 strName += "<ul>";
 strName += "<li>Acceso.- Implica poder conocer en todo momento sus datos personales en posesión de Kaloni, así como conocer el Aviso de privacidad correspondiente.";
 strName += "</li>";
 strName += "<li>Rectificación.- Si alguno de sus datos es inexacto o incompleto, podrá solicitar su modificación, adjuntando la documentación que acredite dicha corrección.";
 strName += "</li>"; 
 strName += "<li>Cancelación.- Podrá requerir cuando así lo considere la cancelación de sus datos y, en caso de ser procedente, su información personal entrará en un periodo de bloqueo para proceder posteriormente a su eliminación. Al entrar a dicho periodo, su información ya no podrá ser tratada por Kaloni.";
 strName += "</li>";
 strName += "<li>Oposición.- Podrá en todo momento y por causa legítima objetar el tratamiento de sus datos personales. Si su solicitud resulta procedente, Kaloni ya no podrá hacer uso de los mismos.";
 strName += "</li>";
 strName += "</ul>";
 strName += "</td>"; 
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">5. Transferencia de datos";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">No realizamos transferencias de sus datos personales con alguna otra empresa.";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">6. Cambios al aviso de privacidad ";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Kaloni podrá modificar el presente aviso de privacidad y sus prácticas en torno al manejo de su información personal; cualquier modificación será notificada en este mismo portal en Internet www.kaloni.com, o a través del medio de comunicación que nos haya proporcionado.Si usted desea dejar de recibir mensajes promocionales de nuestra parte o limitar el uso de sus datos, puede solicitarlo a través de los teléfonos siguientes: (55) 5022 1056 Ext. 2300, (55) 9177 3070, (55) 5292 8302, o terminación 03, o bien al correo electrónico: legal@kaloni.com, con atención a Paola Angélica Ortiz García (Departamento Legal), dirección: Avenida Vasco de Quiroga 3900, Interior 401, Col. Santa Fe, Delegación Cuajimalpa, C.P. 05348, Ciudad de México.";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Fecha de última actualización [04/07/2017]";
 strName += "</td>";
 strName += "</tr>";
 strName += "<tr>";
 strName += "<td width=\"275\">";
 strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>ATENTAMENTE</b></p>";
 strName += "</td>";
 strName +="</tr>";
 strName +="<tr>"
 strName += "<td width=\"275\">";
 strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\">"+file_firma+"</p>";
 strName += "</td>";
 strName +="</tr>";
 strName +="<tr>"
 strName += "<td width=\"275\">";
 strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\"><u>"+ checado(name)+"</u></p>";
  strName += "</td>";
  strName +="</tr>";
  strName += "<tr>";
  strName += "<td width=\"275\">";
  strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Firma del Paciente Responsable</b></p>";
  strName += "</td>";
  strName +="</tr>";
  strName +="</table>";  
  

  //INICIA HOJA DE CONTEO KHG
  //-------------------------------------------------------------------------HOJAS DE PROCEDIMIENTO----------------------------------------------
   
  if(record2!=null){
  strName +="<pbr/>";
  strName +="<br/>";
      strName+="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">HOJA DE CONTEO KHG</td><td width=\"33%\"></td></tr></table>";
  strName += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\" align=\"right\">FECHA:&nbsp;<b>"+ checado(date_pros)+"</b></p>";
  strName += "<p style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>SIGNOS VITALES:</b></p>";
  strName += "<table width=\"100%\" border=\"1px\" style=\"font-size:9pt\" >";
   strName += "<tr style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\"  background-color=\"#346094\">";
  strName += "<td width=\"50\" align=\"center\">";
   strName += "</td>";
  strName += "<td   width=\"167\" align=\"center\"><b>PRE</b>";
   strName += "</td>";
  strName += "<td  width=\"167\" align=\"center\"><b>TRANS</b>";
   strName += "</td>";
  strName += "<td width=\"167\" align=\"center\"><b>POST</b>";
   strName += "</td>";
   strName += "</tr>";
   strName += "<tr style=\"font-family:'Aria', sans-serif\">";
  strName += "<td border=\"1px\"  align=\"center\">T/A";
   strName += "</td>";
    strName += "<td border=\"1px\" align=\"center\">"+ checado(TA_PRE)+"";
   strName += "</td>";
  strName += "<td  border=\"1px\"  align=\"center\">"+ checado(TA_TRANS)+"";
   strName += "</td>";
  strName += "<td border=\"1px\"  align=\"center\">"+ checado(TA_POST)+"";
   strName += "</td>";
   strName += "</tr>";
     strName += "<tr style=\"font-family:'Aria', sans-serif\" background-color=\"#D3D3D3\">";
  strName += "<td  border=\"1px\"  align=\"center\">F.C.";
   strName += "</td>";
  strName += "<td border=\"1px\" align=\"center\">"+ checado(FC_PRE)+"";
   strName += "</td>";
  strName += "<td border=\"1px\"  align=\"center\">"+ checado(FC_TRANS)+"";
   strName += "</td>";
  strName += "<td  border=\"1px\"  align=\"center\">"+ checado(FC_POST)+"";
   strName += "</td>";
   strName += "</tr>";
   strName += "</table>";
   strName += "<table width=\"100%\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\" >";
  strName += "<tr  height=\"10px\"><td height=\"10px\"></td></tr>";
   strName += "<tr>";
  strName += "<td width=\"150\" border=\"1px\" style=\"background-color:#f4f4f4\">INFILTRACIÓN";
    strName += "</td>";
    strName += "<td width=\"100\" border=\"1px\" style=\"background-color:#f4f4f4\">";
    strName += "</td>";
  strName += "<td width=\"100\">";
   strName += "</td>";
  strName += "<td width=\"100\" border=\"1px\" style=\"background-color:#f4f4f4\">INICIO CORTE";
  strName += "</td>";
  strName += "<td width=\"100\" border=\"1px\" style=\"background-color:#f4f4f4\">"+ checado(IN_CORT)+"";
  strName += "</td>";
   strName += "</tr>";
   strName += "<tr>";
   strName += "<td  border=\"1px\" style=\"background-color:#D3D3D3\">INICIO EXTRACCIÓN";
    strName += "</td>";
    strName += "<td  border=\"1px\" style=\"background-color:#D3D3D3\">"+ checado(IN_EXTR)+"";
    strName += "</td>";
   strName += "<td >";
   strName += "</td>";
  strName += "<td  border=\"1px\" style=\"background-color:#C8C8C8\">TÉRMINO CORTE";
  strName += "</td>";
  strName += "<td  border=\"1px\" style=\"background-color:#C8C8C8\">"+ checado(TER_CORT)+"";
  strName += "</td>";
   strName += "</tr>";
  strName += "<tr>";
   strName += "<td  border=\"1px\" style=\"background-color:#C8C8C8\">TÉRMINO EXTRACCIÓN";
    strName += "</td>";
    strName += "<td  border=\"1px\"  style=\"background-color:#C8C8C8\" >"+ checado(TER_EXTR)+"";
    strName += "</td>";
   strName += "</tr>";
   strName += "</table>";
  strName += "<p align=\"center\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>CONTEO UNIDADES FOLICULARES</b></p>";
   strName +="<table width=\"100%\" border=\"1px\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
  strName +="<tr style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\"  background-color=\"#346094\">";
  strName +="<td width=\"10\" align=\"center\">";
  strName +="</td>";
  
   strName +="<td width=\"77\" align=\"center\"><b>1 HR</b>";
  strName +="</td>";
  
   strName +="<td width=\"77\" align=\"center\"><b>2 HRS</b>";
  strName +="</td>";
  
   strName +="<td width=\"77\" align=\"center\"><b>3 HRS</b>";
  strName +="</td>";
  
   strName +="<td width=\"77\" align=\"center\" ><b>4 HRS</b>";
  strName +="</td>";
  
   strName +="<td width=\"77\" align=\"center\" ><b>5 HRS</b>";
  strName +="</td>";
  
   strName +="<td width=\"77\" align=\"center\"><b>SUBTOTAL</b>";
  strName +="</td>";
  
   strName +="<td width=\"77\" align=\"center\"><b>TOTAL</b>";
  strName +="</td>";
  strName +="</tr>";
  //---------------------------------------------------------------------///ingresa lineas aqui tr///--------------------------------------------------------------
  strName+=cadena;
  
     strName +="</table>";
   
  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
    strName += "<tr  height=\"5px\"><td height=\"5px\"></td></tr>";
  strName +="<tr>";
    strName +="<td width=\"396\" >";
  strName +="</td>";
  strName +="<td width=\"77\" border=\"1px\" style=\"background-color:#f4f4f4\">HOYOS";
  strName +="</td>";
   strName +="<td width=\"77\" border=\"1px\" align=\"center\" valign=\"middle\" style=\"background-color:#f4f4f4\">"+checado(FOLI_V_NV)+"";
   strName +="</td>";
  strName +="</tr>";
   strName +="<tr>";
  strName +="<td>";
  strName +="</td>";
  strName +="<td>";
  strName +="</td>";
  strName +="<td border=\"1px\" align=\"right\" style=\"background-color:#C8C8C8\">"+checado(PERCEN)+"%";
  strName +="</td>";
  strName +="</tr>";
  strName +="</table>";
   // strName +="<p></p>";
  strName +="<table>";
  strName +="<tr>";
  strName +="<td>";
   strName +="<table width=\"400\"  style=\"font-family:'Aria', sans-serif\" font-size=\"8pt\">";
  strName +="<tr><td colspan=\"7\" align=\"center\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\" ><b>CONTEO FOLÍCULOS</b></td></tr>";
   strName +="<tr style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\"  background-color=\"#346094\">";
  
  strName +="<td width=\"10\"  align=\"center\" valign=\"middle\">";
   strName +="</td>";
  
   strName +="<td width=\"65\" align=\"center\" valign=\"middle\"><b>1 HRS</b>";
   strName +="</td>";
  
    strName +="<td width=\"65\" align=\"center\" valign=\"middle\"><b>2 HRS</b>";
   strName +="</td>";
  
    strName +="<td width=\"65\" align=\"center\" valign=\"middle\"><b>3 HRS</b>";
   strName +="</td>";
  
     strName +="<td width=\"65\" align=\"center\" valign=\"middle\"><b>4 HRS</b>";
   strName +="</td>";
  
      strName +="<td width=\"65\" align=\"center\" valign=\"middle\"><b>5 HRS</b>";
   strName +="</td>";
  
      strName +="<td width=\"65\" align=\"center\" valign=\"middle\"><b>TOTAL</b>";
   strName +="</td>";

  strName +="</tr>";
strName+=cadena2;
 
   strName +="</table>";
  
 strName +="</td>";

   strName +="<td>";
  strName +="<br/>";
    strName +="<table width=\"120\" style=\"font-family:'Aria', sans-serif\" font-size=\"8pt\">";
   strName +="<tr width=\"120\">";
  strName +="<td align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">INFILTRACIÓN";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td align=\"center\" border=\"1px\" style=\"background-color:#f4f4f4\" valign=\"middle\">---";
  strName +="</td>";
    strName +="</tr>";
  strName +="<tr>";
  strName +="<td align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">INICIO IMPLANTACIÓN";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td align=\"center\"  border=\"1px\" style=\"background-color:#f4f4f4\" valign=\"middle\">"+ checado(IN_IMPLA)+"";
  strName +="</td>";
    strName +="</tr>";
  strName +="<tr>";
  strName +="<td align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">TÉRMINO IMPLANTACIÓN";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td align=\"center\"  border=\"1px\" style=\"background-color:#f4f4f4\" valign=\"middle\">"+ checado(TER_IMPLA)+"";
  strName +="</td>";
    strName +="</tr>";
   strName +="</table>";
   strName +="</td>";
    strName +="</tr>";
  strName +="</table>";
   strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\" align=\"center\"><b>TEMPERATURA ºC</b></p>";
   strName +="<table width=\"100%\"  style=\"font-family:'Aria', sans-serif\" font-size=\"8pt\">";
   strName +="<tr height=\"5px\" >";
  strName +="<td width=\"55\" height=\"5px\" align=\"center\"  border=\"1px\" style=\"background-color:#346094\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>-4</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>-3</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>-2</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>-1</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>0</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>1</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>2</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>3</b>";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>4</b>";
  strName +="</td>";
  strName +="</tr>";
  
   strName +="<tr height=\"5px\">";
  strName +="<td width=\"55\" height=\"5px\" align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">PRE";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
  strName +="</tr>";

   strName +="<tr height=\"5px\">";
  strName +="<td width=\"55\" height=\"5px\" align=\"center\"  border=\"1px\" valign=\"middle\">TRANS";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\"  valign=\"middle\">";
  strName +="</td>";
  strName +="</tr>";
  
   strName +="<tr height=\"5px\">";
  strName +="<td width=\"55\" height=\"5px\" align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">POST";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
   strName +="<td width=\"55\"  align=\"center\"  border=\"1px\" style=\"background-color:#C8C8C8\" valign=\"middle\">";
  strName +="</td>";
  strName +="</tr>";
   strName +="</table>";
   
  
  
   strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif\" font-size=\"9pt\">";
   strName +="<tr>";
   strName +="<td width=\"275\">";
   strName +="<table>";
    strName +="<tr>";
  strName +="<td >Equipo Médico:";
  strName +="</td>";
   strName +="</tr>";
  strName +="<tr>";
  strName +="<td><b>Se utilizó la máquina para la inserción de los folículos del paciente</b>";
  strName +="</td>";
   strName +="</tr>";
    strName +="</table>";
   strName +="</td>";
    strName +="<td width=\"275\">";
  
  strName +="<table>";
  strName +="<tr>";
  strName +="<td>Extrajo:";
  strName +="</td>";
  strName +="<td><b>"+enfer_extra+"</b>";
  strName +="</td>";
  strName +="</tr>";

  strName +="<tr>";
  strName +="<td>Implantó:";
  strName +="</td>";
   strName +="<td><b>"+enfer_implan+"</b>";
  strName +="</td>";
  strName +="</tr>";
  strName +="</table>";
  
  
   strName +="</td>";
   strName +="</tr>";
   strName +="</table>";
    
  if(record2!=null){
  
strName +="<pbr/>";
   strName +="<br/>";

  strName+="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">HOJA DE CONTEO KHG</td><td width=\"33%\"></td></tr></table>";
  strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"12pt\">No. de expediente:&nbsp;<b>"+id+"</b></p>";
   strName +="<table  width=\"100%\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\" >";
    strName +="<tr>";
   strName +="<td  width=\"50\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>Hora</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>Doctor</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>Viables</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>No Viables</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>Total</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>Porcentaje</b>";
   strName +="</td>";
   strName +="</tr>";
  strName +="<tr height=\"60px\">";
   strName +="<td  width=\"50\"   align=\"center\"  border=\"1px\"  valign=\"middle\"><b>1H</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\"  valign=\"middle\"><b></b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\"  valign=\"middle\"><b>"+checado(totalH1)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"   align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+checado(totalNVH1)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+(totalH1+totalNVH1)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+porcentajes(totalH1,totalNVH1)+"</b>";
   strName +="</td>";
   strName +="</tr>";
  strName +="<tr height=\"60px\">";
   strName +="<td  width=\"50\"   align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\"  valign=\"middle\"><b>2H</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\"  valign=\"middle\"><b></b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\"  valign=\"middle\"><b>"+checado(totalH2)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"   align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\" valign=\"middle\"><b>"+checado(totalNVH2)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\" valign=\"middle\"><b>"+(totalH2+totalNVH2)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\" valign=\"middle\"><b>"+porcentajes(totalH2,totalNVH2)+"</b>";
   strName +="</td>";
   strName +="</tr>";
    strName +="<tr height=\"60px\">";
   strName +="<td  width=\"50\"   align=\"center\"  border=\"1px\"  valign=\"middle\"><b>3H</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\"  valign=\"middle\"><b></b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\"  valign=\"middle\"><b>"+checado(totalH3)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"   align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+checado(totalNVH3)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+(totalH3+totalNVH3)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+porcentajes(totalH3,totalNVH3)+"</b>";
   strName +="</td>";
   strName +="</tr>";
  strName +="<tr height=\"60px\">";
   strName +="<td  width=\"50\"   align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\"  valign=\"middle\"><b>4H</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\"  valign=\"middle\"><b></b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\"  valign=\"middle\"><b>"+checado(totalH4)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"   align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\" valign=\"middle\"><b>"+checado(totalNVH4)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\" valign=\"middle\"><b>"+(totalH4+totalNVH4)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\" style=\"background-color:#C8C8C8\"  border=\"1px\" valign=\"middle\"><b>"+porcentajes(totalH4,totalNVH4)+"</b>";
   strName +="</td>";
   strName +="</tr>";
  strName +="<tr height=\"60px\">";
   strName +="<td  width=\"50\"   align=\"center\"  border=\"1px\"  valign=\"middle\"><b>5H</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\"  valign=\"middle\"><b></b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\"  valign=\"middle\"><b>"+checado(totalH5)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"   align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+checado(totalNVH5)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+(totalH5+totalNVH5)+"</b>";
   strName +="</td>";
   strName +="<td  width=\"100\"  align=\"center\"  border=\"1px\" valign=\"middle\"><b>"+porcentajes(totalH5,totalNVH5)+"</b>";
   strName +="</td>";
   strName +="</tr>";
    strName +="</table>";
  strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"12pt\">Control de Corte</p>";
  
  strName +="<table  width=\"100%\" style=\"font-family:'Aria', sans-serif\" font-size=\"8pt\" >";
  strName +="<tr>";
  strName +="<td width=\"120\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>Nombre</b>";
  strName +="</td>";
  strName +="<td width=\"71\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>1r Hora</b>";
  strName +="</td>";
  strName +="<td width=\"71\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>2a Hora</b>";
  strName +="</td>";
  strName +="<td width=\"71\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>3a Hora</b>";
  strName +="</td>";
  strName +="<td width=\"71\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>4a Hora</b>";
  strName +="</td>";
  strName +="<td width=\"71\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>5a Hora</b>";
  strName +="</td>";
  strName +="<td width=\"71\"  align=\"center\"  border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\" valign=\"middle\"><b>Total</b>";
  strName +="</td>";
  strName +="</tr>";
  
strName+=cadena3;

  strName +="</table>";
   strName +="<br/>";
  strName +="<p style=\"font-family:'Aria', sans-serif\" font-size=\"12pt\">TOTAL DE UNIDADES FOLICULARES:&nbsp;<b>"+checado(total_folic)+"</b></p>";
  }
  //FIN HOJA DE CONTEO HCP
//-------------------------------------------- INICIO HOJA DE EFERMERIA HCP-----------------------------------------------------------------------
 if(record2!=null){
  
  strName += "<pbr/>";
  strName += "<br/>";
     strName+="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">HOJA DE ENFERMERÍA KHG</td><td width=\"33%\"></td></tr></table>";
   strName += "<p style=\"font-family: 'aria', sans-serif\" font-size=\"10pt\"><b>1.IDENTIFICACIÓN</b></p>";
  strName +="<table width=\"100%\" style=\"font-family: 'aria', sans-serif\" font-size=\"10pt\">";
  strName +="<tr>";
  strName +="<td width=\"275\">";
     strName += "<p>No.Expediente:&nbsp;<b>"+checado(id)+""+checado(alerta)+"</b></p>";
  strName +="</td>";
   strName +="<td width=\"275\">";
  strName += "<p align=\"right\">Fecha de incidente:&nbsp;<b>"+checado(date_pros)+"</b></p>";
  strName +="</td>";
  strName +="</tr>";
  strName +="</table>";

   strName += "<table width=\"100%\" style=\"font-family: 'aria', sans-serif\" font-size=\"10pt\">";
   strName += "<tr>";
   strName += "<td width=\"265\">";
  strName += "<p style=\"font-family: 'aria', sans-serif\" font-size=\"10pt\"><b>2.ESTADO DE CONCIENCIA Y FÍSICO</b></p>";
   strName += "<table width=\"115\" border=\"1px\">";
   strName += "<tr>";
  strName += "<td width=\"97\">Alerta:";
    strName += "</td>";
   // strName += "</td >";
   strName += "<td width=\"18\" valign=\"middle\">" + typeEstado(alerta) +"</td>";
   strName += "</tr>";
     strName += "<tr>";
  strName += "<td style=\"background-color:#C8C8C8\" >Orientado:";
    strName += "</td >";
   strName += "<td valign=\"middle\">" +  typeEstado(orientado) +"";
  strName += "</td >";
   strName += "</tr>";
     strName += "<tr>";
  strName += "<td>Consciente:";
    strName += "</td>";
   strName += "<td valign=\"middle\">" +  typeEstado(conciente)  +"";
  strName += "</td >";
   strName += "</tr>";
     strName += "<tr>";
  strName += "<td style=\"background-color:#C8C8C8\">Tranquilo:";
    strName += "</td>";
   strName += "<td valign=\"middle\">" + typeEstado(tranquilo)  +"";
  strName += "</td >";
   strName += "</tr>";
     strName += "<tr>";
  strName += "<td >Ansioso:";
    strName += "</td>";
   strName += "<td valign=\"middle\">" + typeEstado(ansioso )  +"";
  strName += "</td >";
   strName += "</tr>";
     strName += "<tr>";
  strName += "<td style=\"background-color:#C8C8C8\">Letárgico:";
    strName += "</td>";
   strName += "<td valign=\"middle\">" + typeEstado(letargico) +"";
  strName += "</td >";
   strName += "</tr>";
     strName += "<tr>";
  strName += "<td>Nervioso:";
    strName += "</td>";
   strName += "<td valign=\"middle\">" +  typeEstado(nervioso) +"";
  strName += "</td >";
   strName += "</tr>";
  strName += "<tr>";
  strName += "<td style=\"background-color:#C8C8C8\">Otro:&nbsp;<b>"+ typeEstado(otro)+"</b>";
    strName += "</td>";
   strName += "<td >";
  strName += "</td >";
   strName += "</tr>";
   strName += "</table>";
   strName += "</td>";
 strName += "<td width=\"10\">";
  strName += "</td>";
   strName += "<td width=\"240\">";
  strName +="<p><b>3.SIGNOS VITALES</b></p>";
  strName += "<table border=\"1px\" style=\"font-size:8pt\" >";

     strName += "<tr>";
   strName += "<td align=\"center\" border=\"1px\" width=\"60\" style=\"background-color:#346094\" color=\"#FFFFFF\"><b>Operatorio</b>";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" width=\"60\" ><b>PRE</b>";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" width=\"60\" ><b>TRANS</b>";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" width=\"60\" ><b>POST</b>";
   strName += "</td>";
   strName += "</tr>";

    strName += "<tr>";
   strName += "<td align=\"center\" border=\"1px\" style=\"background-color:#346094\" color=\"#FFFFFF\"><b>F.C.</b>";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" style=\"background-color:#C8C8C8\">"+checado(FC_PRE)+"";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" style=\"background-color:#C8C8C8\">"+checado(FC_TRANS)+"";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" style=\"background-color:#C8C8C8\">"+checado(FC_POST)+"";
   strName += "</td>";
   strName += "</tr>";

   strName += "<tr>";
   strName += "<td align=\"center\" border=\"1px\"  valign=\"middle\" style=\"background-color:#346094\" color=\"#FFFFFF\"><b>T/A mmHg</b>";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" style=\"background-color:#D3D3D3\">"+checado(TA_PRE)+"";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" style=\"background-color:#D3D3D3\">"+checado(TA_TRANS)+"";
   strName += "</td>";
   strName += "<td align=\"center\" border=\"1px\" style=\"background-color:#D3D3D3\">"+checado(TA_POST)+"";
   strName += "</td>";
  strName += "</tr>";
     strName += "</table>";
 
    strName +="<p><b>4.TOMA DE FOTOGRAFÍAS</b></p>";
   strName += "<table border=\"1px\" width=\"240\">";
   strName += "<tr>";
  strName += "<td  colspan=\"2\"  border=\"1px\" style=\"color:#FFFFFF\" background-color=\"#346094\"><b>PROTOCOLO DE FOTOGRAFÍAS</b>";
   strName += "</td>";
  strName += "<td>";
  strName += "</td>";
   strName += "</tr>";
  
   strName += "<tr>";
   strName += "<td  border=\"1px\"  width=\"30\" >Inicio";
   strName += "</td>";
  strName += "<td  border=\"1px\"  width=\"210\"><b>"+checado(foto_in)+"</b>";
  strName += "</td>";
   strName += "</tr>";
    strName += "<tr>";
   strName += "<td  border=\"1px\"  width=\"30\" style=\"background:#C8C8C8\">Final";
   strName += "</td>";
  strName += "<td  border=\"1px\"  width=\"210\" style=\"background:#C8C8C8\"><b>"+checado(foto_fin)+"</b>";
  strName += "</td>";
   strName += "</tr>";

   strName += "</table>";

   strName += "</td>";
   strName += "</tr>";
   strName += "</table>";

  strName += "<table width=\"100%\" style=\"font-family:'aria', sans-serif\" font-size=\"10pt\">";
   strName += "<tr>";
   strName += "<td width=\"270\">";
   strName += "<p><b>5.ANESTESIA</b></p>";
   strName += "<table width=\"270\" border=\"1px\">";
   strName += "<tr>";
  strName += "<td style=\"background:#346094\" color=\"#FFFFFF\"><b>Zona donadora:</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Anestésico:&nbsp;<b>"+checado(Anes_anes)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Infiltró:&nbsp;<b>"+checado(Anes_infiltro)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Hora de inicio:&nbsp;<b>"+checado(Anes_horain)+"</b>&nbsp;Hora de término:&nbsp;<b>"+checado(Anes_horafin)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#346094\" color=\"#FFFFFF\"><b>Zona a implantar:</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Anestésico:&nbsp;<b>"+checado(Anes_anes2)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Infiltró:&nbsp;<b>"+checado(Anes_infiltro2)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Hora de inicio:&nbsp;<b>"+checado(Anes_horain2)+"</b>&nbsp;Hora de término:&nbsp;<b>"+checado(Anes_horafin2)+"</b></td>";
   strName += "</tr>";

   strName += "</table>";
   strName += "</td>";
   strName += "<td width=\"10\">";
   strName += "</td>";

  strName += "<td width=\"270\">";
  strName += "<p><b>6.ANTISEPSIA</b></p>";
     strName += "<table width=\"270\" border=\"1px\">";
   strName += "<tr>";
  strName += "<td style=\"background:#346094\" color=\"#FFFFFF\"><b>Zona donadora:</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Realizó:&nbsp;<b>"+checado(Anti_Realizo)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Región:&nbsp;<b>"+checado(Anti_Region)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Antiséptico:&nbsp;<b>"+checado(Antiseptico)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#346094\" color=\"#FFFFFF\"><b>Zona a implantar:</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Realizó:&nbsp;<b>"+checado(Anti_Realizo2)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Región:&nbsp;<b>"+checado(Anti_Region2)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Antiséptico:&nbsp;<b>"+checado(Antiseptico2)+"</b></td>";
   strName += "</tr>";

   strName += "</table>";

   strName += "</td>";
   strName += "</tr>";
   strName += "</table>";

 
    strName += "<table width=\"100%\" style=\"font-family:'aria', sans-serif\" font-size=\"10pt\">";
   strName += "<tr>";
   strName += "<td width=\"270\">";
  strName += "<p><b>7.PROCEDIMIENTO</b></p>";
   strName += "<table width=\"270\" border=\"1px\">";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Médico Responsable:&nbsp;<b>"+checado(asigMedicos)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Enfermero responsable:&nbsp;<b>"+checado(enfermero1)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Enfermero responsable:&nbsp;<b>"+checado(enfermero2)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Responsable de Tricotomía:&nbsp;<b>"+checado(enfer_trico)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\" >Tipo:&nbsp;<b>"+checado(type_razurado)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Responsable de extracción:&nbsp;<b>"+checado(asigMedicos)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Hora de inicio:&nbsp;<b>"+checado(IN_EXTR)+"</b>&nbsp;Hora de término:&nbsp;<b>"+checado(TER_EXTR)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Conteo de unidades foliculares:&nbsp;<b></b></td>";
   strName += "</tr>";
    strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Hora de inicio:&nbsp;<b>"+checado(IN_CORT)+"</b>&nbsp;Hora de término:&nbsp;<b>"+checado(TER_CORT)+"</b></td>";
   strName += "</tr>";
    strName += "<tr>";
  strName += "<td>Responsable de implantación:&nbsp;<b>"+checado(enfer_implan)+"</b></td>";
   strName += "</tr>";
    strName += "<tr>";
   strName += "<td style=\"background:#C8C8C8\">Hora de inicio:&nbsp;<b>"+checado(IN_IMPLA)+"</b>&nbsp;Hora de término:&nbsp;<b>"+checado(TER_IMPLA)+"</b></td>";
   strName += "</tr>";

   strName += "</table>";
   strName += "</td>";
   strName += "<td width=\"10\">";
   strName += "</td>";

  strName += "<td width=\"270\">";
  strName += "<p><b>8.MUESTRA DE SANGRE Y PRP</b></p>";
     strName += "<table width=\"270\" border=\"1px\">";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\" >Responsable:&nbsp;<b>"+checado(respon)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Equipo utilizado:&nbsp;<b>"+checado(equi)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Sitio de punción:&nbsp;<b>"+checado(sitioPun)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Número de intentos:&nbsp;<b>"+checado(no_inten)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\" >Tubos obtenidos:&nbsp;<b>"+checado(tubos)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Centrifugados a:&nbsp;<b>"+checado(centrifugados)+"rpm</b>&nbsp;Tiempo:&nbsp;<b>"+checado(tiempo)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Responsable de PRP:&nbsp;<b>"+checado(responPRP1)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Región:&nbsp;<b>"+checado(regionPRP1)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td style=\"background:#C8C8C8\">Responsable de PRP:&nbsp;<b>"+checado(responPRP2)+"</b></td>";
   strName += "</tr>";
   strName += "<tr>";
  strName += "<td>Región:&nbsp;<b>"+checado(regionPRP2)+"</b></td>";
   strName += "</tr>";
   strName += "</table>";
   strName += "</td>";
   strName += "</tr>";
   strName += "</table>";
  strName += "<table>";
   strName += "<tr>";
   strName += "<td>";
  strName += "</td>";
   strName += "</tr>";
   strName += "</table>";
  }
    //-------------------------------------------- FIN HOJA DE EFERMERIA HCP-----------------------------------------------------------------------
if(record2!=null){
   strName +="<pbr/>";
  strName +="<br/>";
  strName+="<table width=\"100%\"><tr><td width=\"43%\"></td><td width=\"70%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">DISEÑO EN SALA DE PROCEDIMIENTO</td><td width=\"43%\"></td></tr></table>";

  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
  strName +="<tr>";
  strName +="<td>";
  strName +="<br/>";
  strName +="</td>";
  strName +="</tr>";
  strName += "<tr><td width=\"50%\" style=\"font-family:'Aria', sans-serif\" align=\"center\" font-size=\"10pt\"><b>NOMBRE DEL PACIENTE: &nbsp;</b>" + checado(name )+ "&nbsp;"+ checado(date_pros)+ "</td></tr>";
  strName +="</table>";

  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
  strName +="<tr>";
  strName +="<td width=\"50%\" align=\"center\">" + imgtry5 + "</td>";
  strName +="<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"50%\" align=\"center\">" + imgtry6 + "</td>";
  strName +="</tr>";
    strName +="<tr>";
  strName +="<td width=\"50%\" align=\"center\">" + imgtry7 + "</td>";
  strName +="<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"50%\" align=\"center\">" + imgtry8 + "</td>";
  strName +="</tr>";
  
  strName += "</table>";


  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
  strName +="<tr>";
  strName +="<td>";
  strName +="<br/>";
  strName +="</td>";
  strName +="</tr>";

  strName += "</table>";
  strName += "<p style=\"font-family:'Aria', sans-serif;\">Nota:&nbsp;<b>"+checado(textoimagnes)+"</b></p>";
   strName +="<div>";
   strName +="<table width=\"500\" style=\"font-family:'Aria', sans-serif;\" >";
  strName += "<tr>";
   strName += "<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">"+firma_cli;
  strName += "</td>";
  strName +="<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">"+firma_med;
  strName += "</td>";
  strName += "</tr>";
  strName += "<tr>";
   strName += "<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">_________________________________";
  strName += "</td>";
    strName +="<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">_________________________________";
  strName += "</td>";
  strName += "</tr>";
    strName += "<tr>";
   strName += "<td width=\"265\">";
    strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Firma del Paciente</b></p>";
   strName += "</td>";
   strName += "<td width=\"265\">";
  strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Firma del Médico</b></p>";
   strName += "</td>";
   strName += "</tr>";
   strName +="</table>";
   strName +="</div>";
  }

   //HOJA FRONTAL HAIR
 
  if(record2!=null){
   strName +="<pbr/>";
  strName +="<br/>";
  strName+="<table width=\"100%\"><tr><td width=\"33%\"></td><td width=\"34%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\" background-color=\"#346094\" align=\"center\">CASO DE PROCEDIMIENTO</td><td width=\"33%\"></td></tr></table>";

  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
  strName +="<tr>";
  strName +="<td>";
  strName +="<br/>";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td width=\"50%\" align=\"center\">Foto antes del injerto" + imgtry + "</td>";
  strName +="<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"50%\" align=\"center\">Foto despúes del injerto" + imgtry2 + "</td>";
  strName +="</tr>";
  strName += "</table>";

 strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\">";
  strName +="<tr>";
  strName +="<td>";
  strName +="<br/>";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td width=\"50%\" align=\"center\">Foto de frente" + imgtry3 + "</td>";
  strName +="<td width=\"30%\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"50%\" align=\"center\">Foto de frente 2" + imgtry4 + "</td>";
  strName +="</tr>";
  strName += "</table>";
    
  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" >";
  strName +="<tr>";
  strName +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  //strName +="<td width=\"300px\" align=\"center\" valign=\"middle\">"+firma3+"</td>";
  strName +="<td width=\"300px\" align=\"center\" valign=\"middle\">"+firma_cli+"</td>"; 
  strName +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"300px\" align=\"center\" valign=\"middle\"><u> "+ checado(name)+"</u></td>";
  strName +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"300px\" align=\"center\" valign=\"middle\"><b>Firma del Paciente</b></td>";
  strName +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="</tr>";
  strName += "</table>";
  }

//NOTA POS-PROCEDIMIENTO
  if(record2!=null){
    
   strName +="<pbr/>";
     strName +="<div style=\"font-size:10pt\">";
   strName +="<br/>";
      strName += "<p width=\"100%\" style=\"font-family:'Aria', sans-serif\" color=\"#FFFFFF\"  background-color=\"#346094\" align=\"center\"><b>NOTA POST PROCEDIMIENTO</b></p>";
   strName += "<table width=\"100%\">";
 strName += "<tr>";
    strName += "<td width=\"250\">";
     strName += "<table width=\"250\">";
    strName += "<tr><td  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>PACIENTE: &nbsp;</b>" +  checado(name )+"</td></tr>";
    strName += "<tr><td  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>FECHA DE PROCEDIMIENTO: &nbsp;</b>" +  checado(date_pros )+ "</td></tr>";
    strName += "<tr><td  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>FOLÍCULOS: &nbsp;</b>" +  checado( FOLI_V_NV) + "</td></tr>";
    strName += "<tr><td  style=\"font-family:'Aria', sans-serif\"  font-size=\"10pt\"><b>CABELLOS PROYECTADOS: &nbsp;</b>" + (proyectados )+ "</td></tr>";
    strName += "<tr><td  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>ÁREA IMPLANTADA: &nbsp;</b>" +  checado(DATEPOST )+ "</td></tr>";
    strName += "<tr><td  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>INICIO DE EXTRACCIÓN: &nbsp;</b>" + checado( IN_EXTR )+ "</td></tr>";
    strName += "<tr><td  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>INICIO DE IMPLANTACIÓN: &nbsp;</b>" +  checado(IN_IMPLA )+ "</td></tr>";
     strName += "</table>";
  strName += "</td>";
    strName += "<td width=\"250\">";
      strName += "<table width=\"250\">";
   strName += "<tr><td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>EDAD: &nbsp;</b>" + checado( age )+"</td></tr>";
 strName += "<tr><td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>UNIDADES FOLICULARES: &nbsp;</b>" +  checado( total_folic) + "</td></tr>";
 strName += "<tr><td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>TÉRMINO DE EXTRACCIÓN: &nbsp;</b>" +  checado(TER_EXTR) + "</td></tr>";
    strName += "<tr><td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>TÉRMINO DE IMPLANTACIÓN: &nbsp;</b>" +  checado(TER_IMPLA )+ "</td></tr>";
     strName += "</table>";
    
      strName += "</td>";
     strName += "</tr>";
    strName += "</table>";
    
      strName += "<table width=\"100%\">";
    strName += "<tr>";
    strName += "<td width=\"200\"  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>T/A: &nbsp;</b>" + checado( TA_PRE) + "</td>";
  strName += "<td width=\"200\"  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>F/C: &nbsp;</b>" +  checado(FC_PRE) + "</td>";
  strName += "<td width=\"200\"  style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\"><b>F/R: &nbsp;</b>" + checado(FC_TRANS )+ "</td>";
  strName += "</tr>"
  strName += "</table>";
  strName +="<br/>";
  strName += "<table width=\"100%\">";
  strName += "<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
  strName +="<p>Inicia protocolo de implante de cabello con técnica HCP se realiza tricotomía de región occipital. Personal de enfermería toma muestra de sangre para extracción de plasma.Previa administración de medicamentos, asepsia, antisepsia e infiltración de xilocaina al 1% con epinefrina en zona donadora, se realiza extracción de unidades foliculares con micro extractor folicular de 1MM. Tras ofrecerle un ligero refrigerio al paciente se realiza propuesta de diseño, mismo que se fotografía y firma de conformidad. Se procede a la colocación de las unidades foliculares para aumentar densidad. Se da por terminado el procedimiento mediante instrucción estricta de los cuidados posteriores escritas y verbales. Se da receta y cita para los próximos 10 días. Egresa paciente en perfectas condiciones.</p>";
  strName +="</td>";
  strName +="</tr>";
  strName += "</table>";

  strName +="<br/>";
  strName += "<table width=\"100%\">";
  strName += "<tr>";
  strName += "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>INCIDENTES DE IMPORTANCIA: &nbsp;</b></td>";
  strName += "</tr>";
  strName += "<tr>";
  strName += "<td><br/></td>";
  strName += "</tr>";
  strName += "<tr>";
  strName += "<td width=\"275\"  style=\"font-family:'Aria', sans-serif\"><b>EQUIPO MÉDICO ENFERMERÍA: &nbsp;</b></td>";
  strName += "</tr>";
  strName += "</table>";
 strName += "</div>";
  }
//-----FIN NOTA POST-PROCEDIMIENTO-----

 //CONSENTIMIENTO INFORMADO
  if(record2!=null){
  strName += "<pbr/>";
  strName +="<br/>";
  strName +="<br/>";
  strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" >";
  strName +="<tr>";
  strName += "<td width=\"275\">";
  strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\" font-size=\"10pt\"><b>CONSENTIMIENTO INFORMADO</b></p>";
  strName += "</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" align=\"right\" font-size=\"10pt\">Fecha:<b><u>"+ checado(date_pros) +"</u></b></td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td>";
  strName +="<br/>";
strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Nombre del paciente:     <b><u>"+ name +"</u></b></td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Procedimiento: <b><u>"+ procedimiento + "</u></b></td>"; ;
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Yo <b><u>"+ name +"</u></b>, por mi propio derecho y en pleno uso de mis facultades, de <b><u>"+ age +"</u></b> años de edad, declaro libremente que se me informó de manera amplia, clara, precisa y sencilla sobre todos los riesgos y beneficios de someterme al procedimiento de injerto de cabello; que ya he formulado todas las preguntas que he considerado necesarias y mis dudas han sido atendidas a mi entera satisfacción.</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName += "<td style=\"align:lefth, font-family:'Aria', sans-serif\" font-size=\"10pt\">He sido informado, que en atención a la idiosincrasia idiopática de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas por idiosincrasia propia a medicamentos utilizados durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos. Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere ese consentimiento, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.";
  strName += "</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Asimismo, declaro que se me informó detalladamente todos los cuidados post-procedimiento, los cuales por medio del presente, me obligo a cumplir en su totalidad, también me obligo a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo deseado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados posteriores.";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.";
  strName +="</td>";
  strName +="</tr>";
  strName += "<tr>";
  strName +="<td style=\"align:lefth, font-family:'Aria', sans-serif\" font-size=\"10pt\">Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) con la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento frente a dos testigos, por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.";
 strName += "</td>";
 strName += "</tr>";
  strName +="</table>";
  
   strName +="<table width=\"550\" style=\"font-family:'Aria', sans-serif;\" >";
   strName +="<tr>";
  strName +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
//  strName +="<td width=\"300px\" align=\"center\" valign=\"middle\">"+firma3+"</td>";
  strName +="<td width=\"300px\" align=\"center\" valign=\"middle\">"+firma_client_Injert+"</td>"; 

  strName +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"300px\" align=\"center\" valign=\"middle\"><u>"+ checado(name)+"</u></td>";
  strName +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="<td width=\"300px\" align=\"center\" valign=\"middle\"><b>Firma del Paciente</b></td>";
  strName +="<td  width=\"277px\" align=\"center\" valign=\"middle\"></td>";
  strName +="</tr>"; 
   strName +="</table>";
    
   strName +="<div>";
   strName +="<table width=\"550\" style=\"font-family:'Aria', sans-serif;\" >";
  strName += "<tr>";
   strName += "<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">"+firma4+"";
  strName += "</td>";
    strName +="<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">"+firma5+"";
  strName += "</td>";
  strName += "</tr>";
  strName += "<tr>";
   strName += "<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">_________________________________";
  strName += "</td>";
    strName +="<td  style=\"font-family:'Aria', sans-serif\" align=\"center\">_________________________________";
  strName += "</td>";
  strName += "</tr>";
    strName += "<tr>";
   strName += "<td width=\"275\">";
    strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Firma del Testigo</b></p>";
   strName += "</td>";
   strName += "<td width=\"275\">";
  strName +="<p style=\"font-family:'Aria', sans-serif\" align=\"center\"><b>Firma del Testigo</b></p>";
   strName += "</td>";
   strName += "</tr>";
   strName +="</table>";
   strName +="</div>";
  }
    
     if(record2!=null){
     strName +="<pbr/>";
  strName +="<br/>";
  strName +="<table width=\"100%\">";
  strName += "<tr>";
  strName += "<td>";
  strName += "<br/>";
  strName += "<br/>";
  strName += "</td>";
  strName += "</tr>";
  strName +="<tr>";
   strName +="<td width=\"100%\" style=\"font-family:'Aria', sans-serif\" align=\"center\" color=\"#FFFFFF\" font-size=\"10pt\" colspan=\"3\" background-color=\"#346094\">";
  strName +="<b>HOJA FRONTAL HAIR</b>";
  strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
  
  strName +="<td style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\" width=\"200px\">";
  strName +="Fecha de procedimiento: &nbsp;<b>"+ checado(date_pros) + "</b>";
  strName +="</td>";

strName +="<td width=\"100px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
strName +="Procedimiento KHR: <b>&nbsp;"+ checado(Num_pros) + "</b>";
strName +="</td>";
  
strName +="<td width=\"100px\" style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
strName +="Tiras: <b>&nbsp;"+ checado(Num_tiras) + "</b>";
strName +="</td>";
  
   strName +="</tr>";
   strName +="</table>";
  
 strName +="<table style=\"font-family:'Aria', sans-serif\" font-size=\"10pt\">";
 strName +="<tr>";

 strName +="</tr>";
  
 strName +="<tr>";
 
strName +="<td >";
strName +="<br/>";
strName +="</td>";
strName +="</tr>";
strName +="</table>";
strName +="<table  style=\"font-family:'Aria', sans-serif\" text-align=\"left\" font-size=\"10pt\">";
strName +="<tr>";
strName +="<td colspan=\"6\" >";
strName +="<b>REVISIONES EFECTUADAS</b>";
strName +="</td>";
strName +="</tr>";
strName +="<tr>";
strName +="<td>";
strName +="<br/>";
strName +="</td>";
strName +="</tr>";
strName +="</table>";

strName +="<table border=\"1px\" width=\"100%\" style=\"font-family:'Aria', sans-serif;\" background-color=\"#D3D3D3\" font-size=\"10pt\">";

   strName +="<tr>";
   strName +="<td width=\"15px\"  background-color=\"#346094\" >";
   strName +="</td>";

   strName +="<td width=\"60px\" background-color=\"#346094\" >";
   strName +="</td>";

   strName +="<td width=\"80px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
   strName +="<b>Fecha</b>";
   strName +="</td>";

   strName +="<td width=\"360px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
   strName +="<b>Notas Médicas</b>";
   strName +="</td>";
  
  strName +="<td width=\"140px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
   strName +="<b>Tratamiento</b>";
   strName +="</td>";
   strName +="</tr>";
  
  
  strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Days24)+"";
   strName +="</td>";

   strName +="<td >24 Horas";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Days24)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota24horas)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam1)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
  strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable1)+"";
    strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";
  
  
  strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Day10)+"";
   strName +="</td>";

   strName +="<td >10 Días";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Day10)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam2)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
 strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable2)+"";
    strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";
  
    
  strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Mes1)+"";
   strName +="</td>";

   strName +="<td >1 Mes";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Mes1)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota2)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam3)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
 strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable3)+"";
   strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";
 
    
  strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Mes3)+"";
   strName +="</td>";

   strName +="<td >3 Meses";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Mes3)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota3)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam4)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
 strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable4)+"";
  strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";
  
  
    strName +="</table>";
  strName +="<pbr/>";
    strName +="<br/>";
 strName +="<table border=\"1px\" width=\"100%\" style=\"font-family:'Aria', sans-serif;\" background-color=\"#D3D3D3\" font-size=\"10pt\">";
  
     strName +="<tr>";
   strName +="<td width=\"15px\"  background-color=\"#346094\" >";
   strName +="</td>";

   strName +="<td width=\"60px\" background-color=\"#346094\" >";
   strName +="</td>";

   strName +="<td width=\"80px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
   strName +="<b>Fecha</b>";
   strName +="</td>";

   strName +="<td width=\"360px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
   strName +="<b>Notas Médicas</b>";
   strName +="</td>";
  
  strName +="<td width=\"140px\" background-color=\"#346094\" color=\"#FFFFFF\" >";
   strName +="<b>Tratamiento</b>";
   strName +="</td>";
   strName +="</tr>";
  
   strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Mes5)+"";
   strName +="</td>";

   strName +="<td >5 Meses";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Mes5)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota4)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam5)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
 strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable5)+"";
   strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";

  strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Mes7)+"";
   strName +="</td>";

   strName +="<td >7 Meses";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Mes7)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota10)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam10)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
 strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable10)+"";
   strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";
  
  strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Mes9)+"";
   strName +="</td>";

   strName +="<td >9 Meses";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Mes9)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota5)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam6)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
 strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable6)+"";
 strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";
  
  strName +="<tr>";
   strName +="<td valign=\"top\">"+dates(Mes12)+"";
   strName +="</td>";

   strName +="<td >12 Meses";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Mes12)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota6)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam7)+"";
   strName +="</td>";
   strName +="</tr>";
  
  strName +="<tr>";
  strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable7)+"";
 strName +="<hr border=\"1px\"/></td>";
  strName +="</tr>";
  
    strName +="<tr>";
 
   strName +="<td valign=\"top\">"+dates(Mes14)+"";
   strName +="</td>";

   strName +="<td >14 Meses";
   strName +="</td>";

   strName +="<td >";
   strName +=""+checado(Mes14)+"";
   strName +="</td>";

   strName +="<td >";
   strName +="<p><u>"+checado(nota7)+"</u></p>";
   strName +="</td>";
  
  strName +="<td >";
   strName +=""+checado(medicam8)+"";
   strName +="</td>";
   strName +="</tr>";

  strName +="<tr>";
   strName +="<td colspan=\"5\">Nombre del Responsable: "+checado(Responsable8)+"";
   strName +="</td>";
  strName +="</tr>";
   strName +="</table>";
 
 /* strName +="<table width=\"100%\" style=\"font-family:'Aria', sans-serif;\" font-size=\"10pt\">";
  strName +="<tr>";
  strName +="<td>";
  strName +="Referencias importantes:";
  strName +="</td>";
  strName +="</tr>";
  strName +="<tr>";
  strName +="<td border=\"1px\" width=\"100%\" height=\"100px\">";
  strName +=""+checado(Ref_imp)+"";
  strName +="</td>";
   strName +="</tr>";
  strName +="</table>";*/
  }
}
  
    var xml = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">";
  xml += "<pdfset>";
xml += "<pdf>";
xml += "<head>";
xml += "<macrolist>";
xml += "<macro id=\"myheader\">";
 
    xml += "<img height=\"100px\" width=\"220px\" align=\"center\" src=\"";
var path = "https://system.na2.netsuite.com/core/media/media.nl?id=752437&c=3559763&h=76856f6be6d66be1d53c";
    xml += nlapiEscapeXML(path);
    xml += "\"></img>";

xml += "</macro>";
//xml += "<macro  id=\"myfooter\">";
//xml+="<img align=\"riegth\"  height=\"80\" width=\"540\"  src=\""+nlapiEscapeXML(footer_image)+"\"></img>";
//xml += "</macro>";
xml += "</macrolist>";
xml += "</head>";//
xml+="<body  background-image=\""+nlapiEscapeXML(water)+"\" header=\"myheader\"  header-height=\"15mm\">";
 xml+="&nbsp;";
 
 xml += strName0;
 
  xml += "</body>\n</pdf>";
 if(DOCPDFPRE!=null)
xml+="<pdf src='"+ nlapiEscapeXML(DOCPDFPRE)+"'/>";
  xml+="<pdf>";
  
  xml += "<head>";
xml += "<macrolist>";
 xml += "<macro id=\"myheader\">";
 
    xml += "<img height=\"100px\" width=\"220px\" align=\"center\" src=\"";
    
var path = "https://system.na2.netsuite.com/core/media/media.nl?id=752437&c=3559763&h=76856f6be6d66be1d53c";
    xml += nlapiEscapeXML(path);
    xml += "\"></img>";

xml += "</macro>";

xml += "</macrolist>";
xml += "</head>";//
xml+="<body  background-image=\""+nlapiEscapeXML(water)+"\"  header=\"myheader\"  header-height=\"15mm\">"+strName;
xml += "</body>\n</pdf>";
  xml += "</pdfset>";
 
     var root = nlapiXMLToPDF(xml);
     
     //----------------------se obtinene la carpet o se verifica que exista---------
var folderP = nlapiCreateRecord('folder');
var parentP = folderP.getField('parent');
var folderPath = parentP.getSelectOptions("EXP_STO");
  if(folderPath.length!=0){
     var idPath=folderPath[0].getId();
      var folderP2 = nlapiCreateRecord('folder');
      var parentP1 = folderP2.getField('parent');
      var busca=sucursal+"_HAIR";
      var folderSubP = parentP1.getSelectOptions(busca);

   if(folderSubP.length!=0){
     var idPathSub=folderSubP[0].getId();
     var folderC = nlapiCreateRecord('folder');
var parentC = folderC.getField('parent');

var folderList = parentC.getSelectOptions(id+"_FOLDER");
  if(folderList.length!=0){
    var idsfol=folderList[0].getId();

         try{
        var v=record.getFieldValue('custentity114');
    var test=parseInt(v);
   var idmy= nlapiDeleteFile(test);
         }catch(e){}
 root.setFolder(idsfol);
root.setName('EXP_'+ id +'.pdf');
var myPDFfileID = nlapiSubmitFile(root);
    var n = myPDFfileID.toString();
  var LOADfile = nlapiLoadFile(myPDFfileID);
  var urlpdf= LOADfile.getURL();

record.setFieldValue('custentity293',urlpdf);
record.setFieldValue('custentity114',n);
  nlapiSubmitRecord(record);

try{
  
  
 /*   var folder3 = nlapiCreateRecord('folder');
    folder3.setFieldValue('name',id+'_MICROCAMARA');
    folder3.setFieldValue('parent',idsfol);
    var parentFolderId = nlapiSubmitRecord(folder3,true);
     var folder4 = nlapiCreateRecord('folder');
    folder4.setFieldValue('name',id+'_FOTOS_ENFERMERIA');
    folder4.setFieldValue('parent',idsfol);
    var parentFolderId = nlapiSubmitRecord(folder4,true);
    */
   
  
  var FOLD24H = nlapiCreateRecord('folder');
    FOLD24H.setFieldValue('name','R24HORAS');
    FOLD24H.setFieldValue('parent',idsfol);
    var ID_FOL_24H= nlapiSubmitRecord(FOLD24H,true);

    
             var FMICRO24H = nlapiCreateRecord('folder');
             FMICRO24H.setFieldValue('name','MC1');
             FMICRO24H.setFieldValue('parent',ID_FOL_24H);
             var ID_FOL_24H_MICRO = nlapiSubmitRecord(FMICRO24H,true);

    var FOLD10D = nlapiCreateRecord('folder');
    FOLD10D.setFieldValue('name','R10DIAS');
    FOLD10D.setFieldValue('parent',idsfol);
    var ID_FOL_10D= nlapiSubmitRecord(FOLD10D,true);
    
              var FMICRO10D = nlapiCreateRecord('folder');
             FMICRO10D.setFieldValue('name','MC2');
             FMICRO10D.setFieldValue('parent',ID_FOL_10D);
             var ID_FOL_10D_MICRO = nlapiSubmitRecord(FMICRO10D,true);
    
    var FOLD1MES = nlapiCreateRecord('folder');
    FOLD1MES.setFieldValue('name','R1MES');
    FOLD1MES.setFieldValue('parent',idsfol);
    var ID_FOL_1MES= nlapiSubmitRecord(FOLD1MES,true);
    
              var FMICRO1MES = nlapiCreateRecord('folder');
             FMICRO1MES.setFieldValue('name','MC3');
             FMICRO1MES.setFieldValue('parent',ID_FOL_1MES);
             var ID_FOL_1MES_MICRO = nlapiSubmitRecord(FMICRO1MES,true);

    var FOLD3MESES = nlapiCreateRecord('folder');
    FOLD3MESES.setFieldValue('name','R3MESES');
    FOLD3MESES.setFieldValue('parent',idsfol);
    var ID_FOL_3MESES= nlapiSubmitRecord(FOLD3MESES,true);
    
              var FMICRO3MESES = nlapiCreateRecord('folder');
             FMICRO3MESES.setFieldValue('name','MC4');
             FMICRO3MESES.setFieldValue('parent',ID_FOL_3MESES);
             var ID_FOL_3MESES_MICRO = nlapiSubmitRecord(FMICRO3MESES,true);
    
    var FOLD5MESES = nlapiCreateRecord('folder');
    FOLD5MESES.setFieldValue('name','R5MESES');
    FOLD5MESES.setFieldValue('parent',idsfol);
    var ID_FOL_5MESES= nlapiSubmitRecord(FOLD5MESES,true);

              var FMICRO5MESES = nlapiCreateRecord('folder');
             FMICRO5MESES.setFieldValue('name','MC5');
             FMICRO5MESES.setFieldValue('parent',ID_FOL_5MESES);
             var ID_FOL_5MESES_MICRO = nlapiSubmitRecord(FMICRO5MESES,true);

    var FOLD7MESES = nlapiCreateRecord('folder');
    FOLD7MESES.setFieldValue('name','R7MESES');
    FOLD7MESES.setFieldValue('parent',idsfol);
    var ID_FOL_7MESES= nlapiSubmitRecord(FOLD7MESES,true);

              var FMICRO7MESES = nlapiCreateRecord('folder');
             FMICRO7MESES.setFieldValue('name','MC10');
             FMICRO7MESES.setFieldValue('parent',ID_FOL_7MESES);
             var ID_FOL_7MESES_MICRO = nlapiSubmitRecord(FMICRO7MESES,true);

     var FOLD9MESES = nlapiCreateRecord('folder');
    FOLD9MESES.setFieldValue('name','R9MESES');
    FOLD9MESES.setFieldValue('parent',idsfol);
    var ID_FOL_9MESES= nlapiSubmitRecord(FOLD9MESES,true);

              var FMICRO9MESES = nlapiCreateRecord('folder');
             FMICRO9MESES.setFieldValue('name','MC6');
             FMICRO9MESES.setFieldValue('parent',ID_FOL_9MESES);
             var ID_FOL_9MESES_MICRO = nlapiSubmitRecord(FMICRO9MESES,true);

    var FOLD12MESES = nlapiCreateRecord('folder');
    FOLD12MESES.setFieldValue('name','R12MESES');
    FOLD12MESES.setFieldValue('parent',idsfol);
    var ID_FOL_12MESES= nlapiSubmitRecord(FOLD12MESES,true);

             var FMICRO12MESES = nlapiCreateRecord('folder');
             FMICRO12MESES.setFieldValue('name','MC7');
             FMICRO12MESES.setFieldValue('parent',ID_FOL_12MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO12MESES,true);
    
      var FOLD14MESES = nlapiCreateRecord('folder');
    FOLD14MESES.setFieldValue('name','R14MESES');
    FOLD14MESES.setFieldValue('parent',idsfol);
    var ID_FOL_14MESES= nlapiSubmitRecord(FOLD14MESES,true);
    
              var FMICRO14MESES = nlapiCreateRecord('folder');
             FMICRO14MESES.setFieldValue('name','MC8');
             FMICRO14MESES.setFieldValue('parent',ID_FOL_14MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO14MESES,true);

}catch(e){

}

  }else{
    
    var folder2 = nlapiCreateRecord('folder');
    folder2.setFieldValue('name',id+"_FOLDER");
    folder2.setFieldValue('parent',idPathSub);
    var subFolderId = nlapiSubmitRecord(folder2,true);
    root.setFolder(subFolderId);
  root.setName('EXP_'+ id +'.pdf');
  var myPDFfileID = nlapiSubmitFile(root);
      var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(subFolderId);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);

    var folder3 = nlapiCreateRecord('folder');
    folder3.setFieldValue('name',id+'_MICROCAMARA');
    folder3.setFieldValue('parent',subFolderId);
    var parentFolderId = nlapiSubmitRecord(folder3,true);
  var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(parentFolderId);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
    var folder4 = nlapiCreateRecord('folder');
    folder4.setFieldValue('name',id+'_FOTOS_ENFERMERIA');
    folder4.setFieldValue('parent',subFolderId);
    var parentFolderId = nlapiSubmitRecord(folder4,true);
      var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(parentFolderId);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
    var folder5 = nlapiCreateRecord('folder');
    folder5.setFieldValue('name','TRATAMIENTOS');
    folder5.setFieldValue('parent',subFolderId);
    var parentFolderId = nlapiSubmitRecord(folder5,true);
      var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(parentFolderId);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
 
    
    var FOLD24H = nlapiCreateRecord('folder');
    FOLD24H.setFieldValue('name','R24HORAS');
    FOLD24H.setFieldValue('parent',subFolderId);
    var ID_FOL_24H= nlapiSubmitRecord(FOLD24H,true);
          var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_24H);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
              var FMICRO24H = nlapiCreateRecord('folder');
             FMICRO24H.setFieldValue('name','MC1');
             FMICRO24H.setFieldValue('parent',ID_FOL_24H);
             var ID_FOL_24H_MICRO = nlapiSubmitRecord(FMICRO24H,true);
              var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_24H_MICRO);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);

     var FOLD10D = nlapiCreateRecord('folder');
    FOLD10D.setFieldValue('name','R10DIAS');
    FOLD10D.setFieldValue('parent',subFolderId);
    var ID_FOL_10D= nlapiSubmitRecord(FOLD10D,true);
                  var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_10D);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
    
              var FMICRO10D = nlapiCreateRecord('folder');
             FMICRO10D.setFieldValue('name','MC2');
             FMICRO10D.setFieldValue('parent',ID_FOL_10D);
             var ID_FOL_10D_MICRO = nlapiSubmitRecord(FMICRO10D,true);
                      var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_10D_MICRO);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
    var FOLD1MES = nlapiCreateRecord('folder');
    FOLD1MES.setFieldValue('name','R1MES');
    FOLD1MES.setFieldValue('parent',subFolderId);
    var ID_FOL_1MES= nlapiSubmitRecord(FOLD1MES,true);
                          var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_1MES);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
              var FMICRO1MES = nlapiCreateRecord('folder');
             FMICRO1MES.setFieldValue('name','MC3');
             FMICRO1MES.setFieldValue('parent',ID_FOL_1MES);
             var ID_FOL_1MES_MICRO = nlapiSubmitRecord(FMICRO1MES,true);
       var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_1MES_MICRO);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
     var FOLD3MESES = nlapiCreateRecord('folder');
    FOLD3MESES.setFieldValue('name','R3MESES');
    FOLD3MESES.setFieldValue('parent',subFolderId);
    var ID_FOL_3MESES= nlapiSubmitRecord(FOLD3MESES,true);
         var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_3MESES);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
              var FMICRO3MESES = nlapiCreateRecord('folder');
             FMICRO3MESES.setFieldValue('name','MC4');
             FMICRO3MESES.setFieldValue('parent',ID_FOL_3MESES);
             var ID_FOL_3MESES_MICRO = nlapiSubmitRecord(FMICRO3MESES,true);
          var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_3MESES_MICRO);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
     var FOLD5MESES = nlapiCreateRecord('folder');
    FOLD5MESES.setFieldValue('name','R5MESES');
    FOLD5MESES.setFieldValue('parent',subFolderId);
    var ID_FOL_5MESES= nlapiSubmitRecord(FOLD5MESES,true);
        var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_5MESES);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
              var FMICRO5MESES = nlapiCreateRecord('folder');
             FMICRO5MESES.setFieldValue('name','MC5');
             FMICRO5MESES.setFieldValue('parent',ID_FOL_5MESES);
             var ID_FOL_5MESES_MICRO = nlapiSubmitRecord(FMICRO5MESES,true);
            var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_5MESES_MICRO);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);

       var FOLD7MESES = nlapiCreateRecord('folder');
    FOLD7MESES.setFieldValue('name','R7MESES');
    FOLD7MESES.setFieldValue('parent',subFolderId);
    var ID_FOL_7MESES= nlapiSubmitRecord(FOLD7MESES,true);
        var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
newAttachment.setFolder(ID_FOL_7MESES);
newAttachment.setEncoding('UTF-8');
nlapiSubmitFile(newAttachment);
    
              var FMICRO7MESES = nlapiCreateRecord('folder');
             FMICRO7MESES.setFieldValue('name','MC10');
             FMICRO7MESES.setFieldValue('parent',ID_FOL_7MESES);
             var ID_FOL_7MESES_MICRO = nlapiSubmitRecord(FMICRO7MESES,true);
            var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_7MESES_MICRO);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);
    
     var FOLD9MESES = nlapiCreateRecord('folder');
    FOLD9MESES.setFieldValue('name','R9MESES');
    FOLD9MESES.setFieldValue('parent',subFolderId);
    var ID_FOL_9MESES= nlapiSubmitRecord(FOLD9MESES,true);
     var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_9MESES);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);
    
    
              var FMICRO9MESES = nlapiCreateRecord('folder');
             FMICRO9MESES.setFieldValue('name','MC6');
             FMICRO9MESES.setFieldValue('parent',ID_FOL_9MESES);
             var ID_FOL_9MESES_MICRO = nlapiSubmitRecord(FMICRO9MESES,true);
        var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_9MESES_MICRO);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);
    
    
      var FOLD12MESES = nlapiCreateRecord('folder');
    FOLD12MESES.setFieldValue('name','R12MESES');
    FOLD12MESES.setFieldValue('parent',subFolderId);
    var ID_FOL_12MESES= nlapiSubmitRecord(FOLD12MESES,true);
       var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_12MESES);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);
    
              var FMICRO12MESES = nlapiCreateRecord('folder');
             FMICRO12MESES.setFieldValue('name','MC7');
             FMICRO12MESES.setFieldValue('parent',ID_FOL_12MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO12MESES,true);
       var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_12MESES_MICRO);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);
    
      var FOLD14MESES = nlapiCreateRecord('folder');
    FOLD14MESES.setFieldValue('name','R14MESES');
    FOLD14MESES.setFieldValue('parent',subFolderId);
    var ID_FOL_14MESES= nlapiSubmitRecord(FOLD14MESES,true);
     var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_14MESES);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);
    
              var FMICRO14MESES = nlapiCreateRecord('folder');
             FMICRO14MESES.setFieldValue('name','MC8');
             FMICRO14MESES.setFieldValue('parent',ID_FOL_14MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO14MESES,true);
        var newAttachment = nlapiCreateFile('NetSuiteInf.txt', 'PLAINTEXT', 'Archivo creado por script');
            newAttachment.setFolder(ID_FOL_12MESES_MICRO);
            newAttachment.setEncoding('UTF-8');
            nlapiSubmitFile(newAttachment);
    

  var n = myPDFfileID.toString();
  var LOADfile = nlapiLoadFile(myPDFfileID);
  var urlpdf= LOADfile.getURL();
   record.setFieldValue('custentity293',urlpdf);
record.setFieldValue('custentity114',n);
  nlapiSubmitRecord(record);
  }
  }else{
    var folderSub = nlapiCreateRecord('folder');
    folderSub.setFieldValue('name',sucursal+"_HAIR");
    folderSub.setFieldValue('parent',idPath);
    var subFolderId2 = nlapiSubmitRecord(folderSub,true);

    if(subFolderId2!=null){
var folderC = nlapiCreateRecord('folder');
var parentC = folderC.getField('parent');

var folderList = parentC.getSelectOptions(id+"_FOLDER");
  if(folderList.length!=0){
    var idsfol=folderList[0].getId();
    root.setFolder(idsfol);
root.setName('EXP_'+ id +'.pdf');
var myPDFfileID = nlapiSubmitFile(root);
    
    
   try{
         
  var FOLD24H = nlapiCreateRecord('folder');
    FOLD24H.setFieldValue('name','R24HORAS');
    FOLD24H.setFieldValue('parent',idsfol);
    var ID_FOL_24H= nlapiSubmitRecord(FOLD24H,true);
    
              var FMICRO24H = nlapiCreateRecord('folder');
             FMICRO24H.setFieldValue('name','MC1');
             FMICRO24H.setFieldValue('parent',ID_FOL_24H);
             var ID_FOL_24H_MICRO = nlapiSubmitRecord(FMICRO24H,true);
    
     var FOLD10D = nlapiCreateRecord('folder');
    FOLD10D.setFieldValue('name','R10DIAS');
    FOLD10D.setFieldValue('parent',idsfol);
    var ID_FOL_10D= nlapiSubmitRecord(FOLD10D,true);
    
              var FMICRO10D = nlapiCreateRecord('folder');
             FMICRO10D.setFieldValue('name','MC2');
             FMICRO10D.setFieldValue('parent',ID_FOL_10D);
             var ID_FOL_10D_MICRO = nlapiSubmitRecord(FMICRO10D,true);
    
    var FOLD1MES = nlapiCreateRecord('folder');
    FOLD1MES.setFieldValue('name','R1MES');
    FOLD1MES.setFieldValue('parent',idsfol);
    var ID_FOL_1MES= nlapiSubmitRecord(FOLD1MES,true);
    
              var FMICRO1MES = nlapiCreateRecord('folder');
             FMICRO1MES.setFieldValue('name','MC3');
             FMICRO1MES.setFieldValue('parent',ID_FOL_1MES);
             var ID_FOL_1MES_MICRO = nlapiSubmitRecord(FMICRO1MES,true);
    
     var FOLD3MESES = nlapiCreateRecord('folder');
    FOLD3MESES.setFieldValue('name','R3MESES');
    FOLD3MESES.setFieldValue('parent',idsfol);
    var ID_FOL_3MESES= nlapiSubmitRecord(FOLD3MESES,true);
    
              var FMICRO3MESES = nlapiCreateRecord('folder');
             FMICRO3MESES.setFieldValue('name','MC4');
             FMICRO3MESES.setFieldValue('parent',ID_FOL_3MESES);
             var ID_FOL_3MESES_MICRO = nlapiSubmitRecord(FMICRO3MESES,true);
    
     var FOLD5MESES = nlapiCreateRecord('folder');
    FOLD5MESES.setFieldValue('name','R5MESES');
    FOLD5MESES.setFieldValue('parent',idsfol);
    var ID_FOL_5MESES= nlapiSubmitRecord(FOLD5MESES,true);
    
              var FMICRO5MESES = nlapiCreateRecord('folder');
             FMICRO5MESES.setFieldValue('name','MC5');
             FMICRO5MESES.setFieldValue('parent',ID_FOL_5MESES);
             var ID_FOL_5MESES_MICRO = nlapiSubmitRecord(FMICRO5MESES,true);

     var FOLD7MESES = nlapiCreateRecord('folder');
    FOLD7MESES.setFieldValue('name','R7MESES');
    FOLD7MESES.setFieldValue('parent',idsfol);
    var ID_FOL_7MESES= nlapiSubmitRecord(FOLD7MESES,true);
    
              var FMICRO7MESES = nlapiCreateRecord('folder');
             FMICRO7MESES.setFieldValue('name','MC10');
             FMICRO7MESES.setFieldValue('parent',ID_FOL_7MESES);
             var ID_FOL_7MESES_MICRO = nlapiSubmitRecord(FMICRO7MESES,true);
    
     var FOLD9MESES = nlapiCreateRecord('folder');
    FOLD9MESES.setFieldValue('name','R9MESES');
    FOLD9MESES.setFieldValue('parent',idsfol);
    var ID_FOL_9MESES= nlapiSubmitRecord(FOLD9MESES,true);
    
              var FMICRO9MESES = nlapiCreateRecord('folder');
             FMICRO9MESES.setFieldValue('name','MC6');
             FMICRO9MESES.setFieldValue('parent',ID_FOL_9MESES);
             var ID_FOL_9MESES_MICRO = nlapiSubmitRecord(FMICRO9MESES,true);
    
      var FOLD12MESES = nlapiCreateRecord('folder');
    FOLD12MESES.setFieldValue('name','R12MESES');
    FOLD12MESES.setFieldValue('parent',idsfol);
    var ID_FOL_12MESES= nlapiSubmitRecord(FOLD12MESES,true);
    
              var FMICRO12MESES = nlapiCreateRecord('folder');
             FMICRO12MESES.setFieldValue('name','MC7');
             FMICRO12MESES.setFieldValue('parent',ID_FOL_12MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO12MESES,true);
    
      var FOLD14MESES = nlapiCreateRecord('folder');
    FOLD14MESES.setFieldValue('name','R14MESES');
    FOLD14MESES.setFieldValue('parent',idsfol);
    var ID_FOL_14MESES= nlapiSubmitRecord(FOLD14MESES,true);
    
              var FMICRO14MESES = nlapiCreateRecord('folder');
             FMICRO14MESES.setFieldValue('name','MC8');
             FMICRO14MESES.setFieldValue('parent',ID_FOL_14MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO14MESES,true);

}catch(e){
  
  
} 
    


  }else{
   var folder2 = nlapiCreateRecord('folder');
    folder2.setFieldValue('name',id+"_FOLDER");
    folder2.setFieldValue('parent',subFolderId2);
    var subFolderId = nlapiSubmitRecord(folder2,true);
    root.setFolder(subFolderId);
  root.setName('EXP_'+ id +'.pdf');
  var myPDFfileID = nlapiSubmitFile(root);
    
    
    try{
  var FOLD24H = nlapiCreateRecord('folder');
    FOLD24H.setFieldValue('name','R24HORAS');
    FOLD24H.setFieldValue('parent',subFolderId2);
    var ID_FOL_24H= nlapiSubmitRecord(FOLD24H,true);
    
              var FMICRO24H = nlapiCreateRecord('folder');
             FMICRO24H.setFieldValue('name','MC1');
             FMICRO24H.setFieldValue('parent',ID_FOL_24H);
             var ID_FOL_24H_MICRO = nlapiSubmitRecord(FMICRO24H,true);
    
     var FOLD10D = nlapiCreateRecord('folder');
    FOLD10D.setFieldValue('name','R10DIAS');
    FOLD10D.setFieldValue('parent',subFolderId2);
    var ID_FOL_10D= nlapiSubmitRecord(FOLD10D,true);
    
              var FMICRO10D = nlapiCreateRecord('folder');
             FMICRO10D.setFieldValue('name','MC2');
             FMICRO10D.setFieldValue('parent',ID_FOL_10D);
             var ID_FOL_10D_MICRO = nlapiSubmitRecord(FMICRO10D,true);
    
    var FOLD1MES = nlapiCreateRecord('folder');
    FOLD1MES.setFieldValue('name','R1MES');
    FOLD1MES.setFieldValue('parent',subFolderId2);
    var ID_FOL_1MES= nlapiSubmitRecord(FOLD1MES,true);
    
              var FMICRO1MES = nlapiCreateRecord('folder');
             FMICRO1MES.setFieldValue('name','MC3');
             FMICRO1MES.setFieldValue('parent',ID_FOL_1MES);
             var ID_FOL_1MES_MICRO = nlapiSubmitRecord(FMICRO1MES,true);
    
     var FOLD3MESES = nlapiCreateRecord('folder');
    FOLD3MESES.setFieldValue('name','R3MESES');
    FOLD3MESES.setFieldValue('parent',subFolderId2);
    var ID_FOL_3MESES= nlapiSubmitRecord(FOLD3MESES,true);
    
              var FMICRO3MESES = nlapiCreateRecord('folder');
             FMICRO3MESES.setFieldValue('name','MC4');
             FMICRO3MESES.setFieldValue('parent',ID_FOL_3MESES);
             var ID_FOL_3MESES_MICRO = nlapiSubmitRecord(FMICRO3MESES,true);
    
     var FOLD5MESES = nlapiCreateRecord('folder');
    FOLD5MESES.setFieldValue('name','R5MESES');
    FOLD5MESES.setFieldValue('parent',subFolderId2);
    var ID_FOL_5MESES= nlapiSubmitRecord(FOLD5MESES,true);
    
              var FMICRO5MESES = nlapiCreateRecord('folder');
             FMICRO5MESES.setFieldValue('name','MC5');
             FMICRO5MESES.setFieldValue('parent',ID_FOL_5MESES);
             var ID_FOL_5MESES_MICRO = nlapiSubmitRecord(FMICRO5MESES,true);

     var FOLD7MESES = nlapiCreateRecord('folder');
    FOLD7MESES.setFieldValue('name','R7MESES');
    FOLD7MESES.setFieldValue('parent',subFolderId2);
    var ID_FOL_7MESES= nlapiSubmitRecord(FOLD7MESES,true);
    
              var FMICRO7MESES = nlapiCreateRecord('folder');
             FMICRO7MESES.setFieldValue('name','MC10');
             FMICRO7MESES.setFieldValue('parent',ID_FOL_7MESES);
             var ID_FOL_7MESES_MICRO = nlapiSubmitRecord(FMICRO7MESES,true);
    
     var FOLD9MESES = nlapiCreateRecord('folder');
    FOLD9MESES.setFieldValue('name','R9MESES');
    FOLD9MESES.setFieldValue('parent',subFolderId2);
    var ID_FOL_9MESES= nlapiSubmitRecord(FOLD9MESES,true);
    
              var FMICRO9MESES = nlapiCreateRecord('folder');
             FMICRO9MESES.setFieldValue('name','MC6');
             FMICRO9MESES.setFieldValue('parent',ID_FOL_9MESES);
             var ID_FOL_9MESES_MICRO = nlapiSubmitRecord(FMICRO9MESES,true);
    
      var FOLD12MESES = nlapiCreateRecord('folder');
    FOLD12MESES.setFieldValue('name','R12MESES');
    FOLD12MESES.setFieldValue('parent',subFolderId2);
    var ID_FOL_12MESES= nlapiSubmitRecord(FOLD12MESES,true);
    
              var FMICRO12MESES = nlapiCreateRecord('folder');
             FMICRO12MESES.setFieldValue('name','MC7');
             FMICRO12MESES.setFieldValue('parent',ID_FOL_12MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO12MESES,true);
    
      var FOLD14MESES = nlapiCreateRecord('folder');
    FOLD14MESES.setFieldValue('name','R14MESES');
    FOLD14MESES.setFieldValue('parent',subFolderId2);
    var ID_FOL_14MESES= nlapiSubmitRecord(FOLD14MESES,true);
    
              var FMICRO14MESES = nlapiCreateRecord('folder');
             FMICRO14MESES.setFieldValue('name','MC8');
             FMICRO14MESES.setFieldValue('parent',ID_FOL_14MESES);
             var ID_FOL_12MESES_MICRO = nlapiSubmitRecord(FMICRO14MESES,true);

}catch(e){
  
  
}   
  }
    }
    }
    }else{
    var folderPath = nlapiCreateRecord('folder');
    folderPath.setFieldValue('name','EXP_STO');
    var parentFolderId = nlapiSubmitRecord(folderPath,true);

  }
  
 //----------------------FIN obtinene la carpet o se verifica que exista--------
    
   
  response.setContentType('PDF', 'Expediente'+id+'.pdf', 'INLINE');
   response.write(root.getValue());
}
}
}


/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/ui/serverWidget', 'N/url', 'N/https', 'N/file', 'N/record'],

  function (widget, url, https, file, record) {

    function onRequest(context) {
      var recordCase_Id = context.request.parameters.recordCaseId;
      var typeComps = context.request.parameters.typeComps;
      var objRecord = record.load({ type: 'supportcase', id: recordCase_Id });
      var IDClient = objRecord.getValue({ fieldId: 'company' });
      var fecha = objRecord.getText({ fieldId: 'startdate' });
      var edad = objRecord.getText({ fieldId: 'custevent332' });
      var cliente = null;
      try {
        cliente = record.load({ type: 'customer', id: IDClient });
      } catch (error) {
        
      }
      var field_documentIdentification = cliente.getText({ fieldId: 'custentity431' }) || '_______________';
      //var identificacion = objRecord.getValue({ field: 'custentity251'});
      var sucursalTexto = objRecord.getText({ fieldId: 'custevent2' });
      var sucReal = sucursalReal(sucursalTexto);
      var fechaNac = objRecord.getText({ fieldId: 'custevent331' });
      var edad_fechaCaso = calcYearInt(fechaNac, fecha);
      log.debug('Fechas', fechaNac + ' ' + fecha);

      /**
       * ****************** *
       * LOAD PARENT RECORD *
       * ****************** *
       */
      var arr_typeProcess = [];
      var positionArray = 0;
      var typeProcess_value = 0;
      try {
        var id_recordParent = objRecord.getValue({ fieldId: 'custevent_parentrecid' });
        id_recordParent = parseInt(id_recordParent);
        var obj_parentRecord = record.load({ type: 'supportcase', id: id_recordParent });
        typeProcess_values = obj_parentRecord.getValue({ fieldId: 'custevent1066' });
        for (var key = 0; key < typeProcess_values.length; key++) {
          positionArray = parseInt(typeProcess_values[key]);
          typeProcess_value = parseInt(typeProcess_values[key]);
          arr_typeProcess[positionArray] = typeProcess_value;
        }
        log.debug('Valores parent', 'id padre: ' + id_recordParent + ' tipo Procedimiento ' + typeProcess_value + ' position ' + positionArray + ' largo objeto ' + typeProcess_values.length);
      } catch (error) {
        log.debug('Error load parent supportcase', error);
      }
      log.debug('Debug Array', arr_typeProcess);


      var field_firmaClienteBase64 = objRecord.getValue({ fieldId: 'custevent269' }) || null;
      var field_firmaMedBase64 = objRecord.getValue({ fieldId: 'custevent485' }) || null;
      var field_firmaTestigo1Base64 = objRecord.getValue({ fieldId: 'custevent548' }) || null;
      var field_firmaTestigo2Base64 = objRecord.getValue({ fieldId: 'custevent549' }) || null;
      var signature_nullImage = file.load({ id: 4580848 });
      var field_firmaNula = 'data:image/png;base64,' + signature_nullImage.getContents();

      var field_firmaCliente = '';
      var field_firmaMedico = '';
      var field_firmaTestigo_1 = '';
      var field_firmaTestigo_2 = '';

      if (field_firmaClienteBase64 != null) {
        field_firmaCliente = field_firmaClienteBase64;
      } else {
        field_firmaCliente = field_firmaNula;
      }
      if (field_firmaMedBase64 != null) {
        field_firmaMedico = field_firmaMedBase64;
      } else {
        field_firmaMedico = field_firmaNula;
      }
      if (field_firmaTestigo1Base64 != null) {
        field_firmaTestigo_1 = field_firmaTestigo1Base64;
      } else {
        field_firmaTestigo_1 = field_firmaNula;
      }
      if (field_firmaTestigo2Base64 != null) {
        field_firmaTestigo_2 = field_firmaTestigo2Base64;
      } else {
        field_firmaTestigo_2 = field_firmaNula;
      }

      var implantesMamarios_file = file.load({ id: 5133275 });
      var implantesMamarios = 'data:image/png;base64,' + implantesMamarios_file.getContents();
      var parpadoSuperiorInferios_file = file.load({ id: 5343981 });
      var image_parpadoSuperiorInferios = 'data:image/png;base64,' + parpadoSuperiorInferios_file.getContents();


      var mergeRecord = record.load({
        type: 'customer',
        id: IDClient,
        isDynamic: true
      });
      var age = mergeRecord.getValue({
        fieldId: "custentity149"
      });
      log.debug("Edad:", age);
      var subsidiary = mergeRecord.getValue({
        fieldId: "subsidiary"
      });
      var name = mergeRecord.getValue({
        fieldId: "altname"
      });
      var cfp = mergeRecord.getValue({
        fieldId: "custentity251"
      });
      if (cfp == "" || cfp == null) {
        cfp = "____________________";
      }

      var type_rinoseptoplastia_label = objRecord.getField({ fieldId: 'custevent1181' });
      try {
        type_rinoseptoplastia_label = type_rinoseptoplastia_label.label;
        log.debug('etiqueta', 'abierto cerrado: ' + type_rinoseptoplastia_label);
      } catch (error) {
        log.debug('error', 'abierto cerrado: ' + error);
      }



      //  log.debug("name: ", nombre);
      //  log.debug("fecha: ", fecha);
      //var formulario = widget.createForm({title: 'Firma de Consentimiento'});
      var formulario = widget.createForm({ title: 'Firma de Consentimiento' });
      //var url = 'https://soportekaloni.com/consentimiento/';
      var url = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17&whence=';
      var iframeField = formulario.addField({ id: 'custpage_iframe', label: 'Page', type: 'inlinehtml' });
      /*iframeField.defaultValue = '<iframe style="display: block; height: 80vh; width: 100%; border: none;" src="' + url + '"></iframe>';*/
      var imgs = formulario.addField({ id: 'custpage_imgs', label: 'Imagenes', type: 'inlinehtml' });
      //var type_rinoseptoplastia = formulario.addField({ id: 'custpage_type_rinoseptoplastia', type: 'SELECT', label: type_rinoseptoplastia_label, source: 'customlist799' });
      var firmasCambas = formulario.addField({ id: 'custpage_firmas', label: 'Firmas', type: 'inlinehtml' });


      if (subsidiary == '6' /*|| subsidiary == '17' || subsidiary == '13'*/)///MX 6 - Alemania 17 (solo pruebas) - Austria 13 (solo pruebas)
      {
        if (typeComps == '8') {
          imgs.defaultValue = '<body>' +
            '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
            '<div id="scroll"><div id="notices">' +
            '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 60px;margin-top:20px">' +
            '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO APLICACIÓN EXTRACTOS PROTEICOS AVANZADOS DERIVADOS DE ADIPOCITOS (APPE°)</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme a la <b>aplicación de extractos proteicos avanzados DERIVADOS DE ADIPOCITOS (AAPE<sup>TM</sup>)</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p><br/>' +
            '<p id="texto">He sido informado, que en atención a la composición y tipos de reacción de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas al producto AAPETM (Extractos Proteicos Avanzados derivados de adipocitos) los cuales pueden desconocerse previamente a la administración de los mismos. Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p><br/>' +
            '<p id="texto"><b>¿En qué consiste el procedimiento?</b><br /> Por sus siglas en inglés significa extractos proteicos avanzados derivados de adipocitos, se administra de manera tópica en pequeñas dosis mediante la realización de un número variable de pequeños pinchazos en la piel (vía intradérmica), esta técnica consigue aumentar el efecto de los productos administrados por lo que las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente.</p><br/>' +
            '<p id="texto">El número de sesiones y la frecuencia de aplicación de las mismas es variable en función de la patología de tratar y de cada paciente por lo que no puede ser determinado de antemano. Los resultados se obtienen con mayor efectividad si el tratamiento realizado se complementa con otros tratamientos que potenciarán sus efectos, por ese motivo es importante que usted atienda a su Consulta de Valoración previamente.</p><br/>' +
            '<p id="texto"><b>RIESGOS.</b><br /> Las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente, por ejemplo rojez, inflamación y reacción alérgica.</p><br/>' +
            '<p id="texto">La posibilidad de hematomas es un riesgo frecuente que depende también de la toma de ciertos medicamentos por parte del paciente (e.g. aspirina y otros anticoagulantes), por tal motivo es mi deber informar al médico sobre la toma de cualquier medicación antes de ser sometido al procedimiento.</p><br/>' +
            '<p id="texto">Enrojecimiento alrededor de los pinchazos que normalmente pueden tardar unas horas o pocos días en desaparecer. Sensación de incomodidad dependiendo de la zona a tratar y de la sensibilidad personal.</p><br/>' +
            '<p id="texto"><b>BENEFICIOS.</b> La aplicación directa de los extractos proteicos avanzados puede ayudar a estimular la reparación, revitalización de la piel y el cabello.</p><br/>' +
            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b><br/>' +
            '<ul id="texto" style="list-style-type: square;">' +
            '<li><input type="checkbox" id="ask_1">Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
            '<li><input type="checkbox" id="ask_2"> Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
            '<li><input type="checkbox" id="ask_3">Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
            '<li><input type="checkbox" id="ask_4">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
            '<li><input type="checkbox" id="ask_5">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li><input type="checkbox" id="ask_6">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p><br/>' +
            '<p id="texto">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p><br/>' +
            "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">" +
            '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaCliente + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedico + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
            '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo_1 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo_2 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
            '</table>' +
            '</body>';
        } else if (typeComps == '7') {
          imgs.defaultValue = '<body>' +
            '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
            '<div id="scroll"><div id="notices">' +
            '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 60px;margin-top:20px">' +
            '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PARA INSTALACIÓN DE PRÓTESIS CAPILAR PHP</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de instalación de prótesis capilar PHP</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p><br/>' +
            '<p id="texto"><b>RIESGOS.</b> Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p><br/>' +
            '<p id="texto"><b>Reacciones alérgicas. </b> Durante la aplicación y el mantenimiento es necesaria la aplicación de ciertos productos químicos de manera tópica para poder ejecutar el procedimiento que son necesarios. sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados productos y químicos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p><br/>' +
            '<p id="texto"><b>Secuelas, signos y síntomas indeseables. </b> Al finalizar el procedimiento es posible que se generen molestias al realizar expresiones muy marcadas, es decir al sonreír, fruncir el ceño o al realizar gestos de asombro o enojo lo que no  considerada de gravedad. Es posible que exista comezón, ardor o irritación de la piel cabelluda por lo que se le sugiere acudir de inmediato la unidad médica donde se realizó la instalación o el mantenimiento.</p><br/>' +
            '<p id="texto"><b>Resultados insatisfactorios. </b> Existe la posibilidad de que la prótesis capilar llegue a despegarse de alguna parte incluso siguiendo las indicaciones y recomendaciones que el personal le hace al terminar su aplicación o mantenimiento, esto se debe a factores intrínsecos y extrínsecos  que dependen directamente de la sudoración, actividad física, ritmo de vida, humedad del medio, temperatura, enfermedades de la piel cabelluda y accidentes o incidentes directos en la prótesis.</p><br/>' +
            '<p id="texto">Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere esta carta, no es una ciencia exacta, y por tal motivo entiendo  que no es posible asegurar o garantizar un resultado exacto, ya que dicho resultado puede variar en razón de factores como cuidados del propio paciente, condiciones externas incluyendo factores fortuitos relacionados con la idiosincrasia propia de cada paciente.</p><br/>' +
            '<p id="texto"><b>BENEFICIOS.</b> Visualización inmediata y abrupta de la densidad capilar de la zona a instalar (previamente valorada) dando una pronta e inmediata solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de densidad proyectada en la valoración y preferencias de la prótesis capilar obtenida).</p><br/>' +
            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b><br/>' +
            '<ul id="texto" style="list-style-type: square;">' +
            '<li><input type="checkbox" id="ask_1">Por el presente documento, autorizo al equipo médico, los auxiliares médicos, técnicos y personal  de Kaloni Holding Group, S.C., a realizar el procedimiento de instalación /mantenimiento de la prótesis capilar PHP</li>' +
            '<li><input type="checkbox" id="ask_2">He sido también informado(a) que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la legislación Mexicana aplicable.</li>' +
            '<li><input type="checkbox" id="ask_3">Autorizo la toma de fotografías de la zona con fines clínicos.</li>' +
            '<li><input type="checkbox" id="ask_4">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos.</li>' +
            '<li><input type="checkbox" id="ask_5">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li><input type="checkbox" id="ask_6">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p><br/>' +
            '<p id="texto">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p><br/>' +
            "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">" +
            '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaCliente + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedico + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
            '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo_1 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo_2 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
            '</table>' +
            '</body>';
        } else if (typeComps == '6') {
          imgs.defaultValue = '<body>' +
            '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
            '<div id="scroll"><div id="notices">' +
            '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 60px;margin-top:20px">' +
            '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MESOTERAPIA</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>tratamiento con Mesoterapia capilar</b> en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p><br/>' +
            '<p id="texto">He sido informado, que en atención a la composición y tipos de reacción de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas a medicamentos y proteínas utilizadas durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos. Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p><br/>' +
            '<p id="texto">Es mi deber informar al médico sobre la toma de cualquier medicación antes de ser sometido al procedimiento.</p><br/>' +
            '<p id="texto"><b>¿En qué consiste el procedimiento?.</b><br /> El tratamiento con Mesoterapia o intradermoterapia consiste en la administración de pequeñas dosis de fármacos, multivitamínicos, aminoácidos y factores de crecimiento autólogos o derivados de  células madre, mediante la realización de un número variable de inyecciones en la piel cabelluda vía intradérmica o con micro punciones, esta técnica consigue aumentar el efecto de los productos administrados por lo que las posibilidades de producir efectos secundarios son muy reducidas aunque no se pueden descartar completamente.</p><br/>' +
            '<p id="texto">El número de sesiones y la frecuencia de aplicación de las mismas es variable en función del tratamiento a seguir de cada paciente por lo que no puede ser determinado de antemano. Los resultados se obtienen con mayor efectividad si el tratamiento realizado se complementa con otros tratamientos que potenciarán sus efectos, por ese motivo es importante que usted atienda a su Consulta de Valoración previamente.</p><br/>' +
            '<p id="texto"><b>RIESGOS. </b><br /> <ul id="texto" style="list-style-type: square;">' +
            '<li>Existe una posibilidad, aunque mínima, de que aparezca vitíligo, una pigmentación en la zona de tratamiento sobre todo si hay exposición solar o a lámparas UV después del mismo.</li>' +
            '<li>Existe la posibilidad de generar atrofia de la piel cabelluda debida a la idiosincrasia de cada paciente por la interacción de alguno o varios componentes de las fórmulas administradas.</li>' +
            '<li>También es posible la aparición  de hematomas, es un riesgo frecuente que depende también del consumo o la utilización de ciertos medicamentos por parte del paciente (por ejemplo el uso de ácido acetil salicílico y otros anticoagulantes). </li>' +
            '<li>Enrojecimiento en el área de la aplicación o de micropunción que normalmente pueden tardar unas horas o pocos días en desaparecer.</li>' +
            '<li>Sensación de comezón, ardor leve, dolor de cabeza  dependiendo de la zona a tratar y por la idiosincrasia de cada persona.</li>' +
            '<li>SPuede existir el riesgo de presentar complicaciones causadas por alergias causadas por uno o varios de los componentes de las fórmulas, multivitamínicos o aminoácidos utilizados.</li>' +
            '<li>Hasta pasados 3-4 días de realizado el procedimiento no debe acudir a saunas o piscinas para evitar la contaminación de los puntos de puntura.</li>' +
            '<li>La técnica debe usarse con precaución durante el embarazo.</li></ul></p><br/>' +
            '<p id="texto"><b>BENEFICIOS. </b><br /> <ul id="texto" style="list-style-type: square;"><li>La aplicación directa de este tratamiento puede ayudar a estimular la reparación, el crecimiento y la revitalización del cabello y la piel cabelluda.</li>' +
            '<li>Puede prevenir el proceso de calvicie en alopecias no cicatrizales.</li>' +
            '<li>Puede mejorar el crecimiento del cabello así como la disminución en el proceso de caída.</li>' +
            '<li>Favorece el equilibrio en las fases de recambio y el recambio folicular.</li>' +
            '<li>Puede mejorar la estructura capilar del cabello y su engrosamiento en la piel cabelluda tratada.</li></ul></p><br/>' +
            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b><br/>' +
            '<ul id="texto" style="list-style-type: square;">' +
            '<li><input type="checkbox" id="ask_1">Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
            '<li><input type="checkbox" id="ask_2">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
            '<li><input type="checkbox" id="ask_3">Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
            '<li><input type="checkbox" id="ask_4">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
            '<li><input type="checkbox" id="ask_5">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li><input type="checkbox" id="ask_6">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p><br/>' +
            '<p id="texto">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p><br/>' +
            "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">" +
            '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaCliente + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedico + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
            '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo_1 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo_2 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
            '</table>' +
            '</body>';
        } else {
          imgs.defaultValue = '<body>' +
            '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width: 95%; position: initial; margin-left: 2%; background-position: top right; background-color: aliceblue;">' +
            '<div id="scroll"><div id="notices">' +
            '<div class="notice" style="margin-left: 40px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 60px;margin-top:20px">' +
            '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo&nbsp;<b> ' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b><br/> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al procedimiento de injerto de cabello en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p><br/>' +
            '<p id="texto"><b>RIESGOS. &nbsp;</b>  Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p><br/>' +
            '<p id="texto"><b>Sangrado. &nbsp;</b> Es posible que usted presente sangrado durante o después del procedimiento. Medicamentos como aspirina o antiinflamatorios, pueden aumentar el riesgo de hemorragias, por lo tanto, no deben usarse 03 (tres) días antes del procedimiento. La hipertensión y otras enfermedades, como coagulopatías, también pueden causar un mayor sangrado. Es necesario que el paciente siga todos los cuidados recomendados para evitar el exceso de sangre en el área manipulada, lo que puede retrasar la cicatrización.</p><br/>' +
            '<p id="texto"><b>Infección. &nbsp;</b> A pesar de ser un procedimiento ambulatorio, realizado con todos los cuidados adecuados de asepsia, existe el riesgo de que aparezca un cuadro infeccioso posteriormente en la piel cabelluda tanto de zona donante como en zona a implantar. En caso de que esto ocurra, póngase en contacto con nosotros y nuestros médicos tomarán todas las medidas apropiadas, como la prescripción de antibióticos específicos para su caso.</p><br/>' +
            '<p id="texto"><b>Asimetría. &nbsp;</b> La cara humana es normalmente asimétrica por lo que puede haber variaciones entre un lado y otro tras un procedimiento de trasplante capilar.</p><br/>' +
            '<p id="texto"><b>Reacciones alérgicas. &nbsp;</b>  Durante el procedimiento es necesaria la administración de ciertos medicamentos para poder ejecutar el procedimiento como es en la anestesia que se inyecta localmente en el área a tratar, también se requieren de analgésicos y otros medicamentos que son necesarios para mantener estable al paciente, sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados fármacos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p><br/>' +
            '<p id="texto"><b>Secuelas, signos y síntomas indeseables. &nbsp;</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p><br/>' +
            '<p id="texto"><b>Resultados insatisfactorios. &nbsp;</b> El número de cabellos injertados depende, entre otros factores, de la extensión de la región receptora, de la densidad de la zona donante y de la característica estructural de los folículos y de la dermis. En algunos casos, puede ser que la cantidad de folículos aptos para la extracción no está de acuerdo con la expectativa del paciente. La decisión de someterse al tratamiento es individual y voluntaria.</p><br/>' +
            '<p id="texto"><b>Retraso en la cicatrización. &nbsp;</b> Los pacientes fumadores y diabéticos tienen un mayor riesgo de complicaciones en cuanto a la cicatrización. El uso de algunos medicamentos, también puede retrasar este proceso.</p><br/>' +
            '<p id="texto">Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p><br/>' +
            '<p id="texto"><b>BENEFICIOS. &nbsp;</b> Recuperación y restauración de la densidad capilar en la zona a implantar, solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de folículos obtenida, características de la piel del paciente y cuidados del paciente posteriores al procedimiento).</p><br/>' +
            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b><br/>' +
            '<ul id="texto" style="list-style-type: square;">' +
            '<li><input type="checkbox" id="ask_1">Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
            '<li><input type="checkbox" id="ask_2">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
            '<li><input type="checkbox" id="ask_3">Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
            '<li><input type="checkbox" id="ask_4">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
            '<li><input type="checkbox" id="ask_5">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li><input type="checkbox" id="ask_6">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p><br/>' +
            '<p id="texto">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p><br/>' +
            "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">" +
            '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaCliente + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedico + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
            '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo_1 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo_2 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
            '</table>' +
            '</body>';
        }
      }
      else if (subsidiary == '19') //ALBYA
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://3559763.app.netsuite.com/core/media/media.nl?id=5124653&c=3559763&h=778f10e080998dd8a8af) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: snow;">' +
          '<div id="scroll">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 60px;margin-top:20px">';


        if (arr_typeProcess[7] == 7) {
          imgs.defaultValue += '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PARA LIPOSUCCIÓN</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Liposucción</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p><br/>' +
            '<p id="texto"><b>¿En qué consiste el procedimiento?</b>  La Liposucción es un procedimiento encaminado a moldear el contorno corporal mediante la aspiración de grasa produciendo los probables siguientes beneficios:<br/><br/>Mejorar el contorno corporal, el cual por razones personales el paciente considera inapropiado.</br><br/>Modificar los depósitos de grasa en las diferentes partes del cuerpo disminuyendo su volumen.</br><br/>La forma y el tamaño de los depósitos de grasa pueden influir tanto en el tratamiento recomendado como en el resultado final. Si no se tiene simetría o forma antes de la cirugía, es solo probable que se consiga una mejoría después del acto quirúrgico.</br><br/>Existen varios tipos de Liposucciones tales como la seca, húmeda, tumescente, con jeringa, con máquina, con láser o la ultrasónica.</br><br/>En forma conjunta con mi médico tratante y debido a su experiencia y mi conveniencia escogemos la técnica tumescente que significa la infiltración de una solución preparada con el beneficio de disminuir la cantidad de sangre que se aspira y mejorar el dolor postoperatorio.</br><br/></p></br>' +
            '<p id="texto"><b>TRATAMIENTO ALTERNATIVO.</b> Las formas alternativas de manejo consisten en no tratar la laxitud de la cara y el cuello con Ritidectomía. Puede intentarse mejorar la laxitud cutánea, arrugas y depósitos grasos mediante otros tratamientos o cirugía, tales como peeling químico facial o la liposucción, sin embargo también existen riesgos y complicaciones potenciales asociados con las formas alternativas de tratamiento.</p><br/>' +
            '<p id="texto"><b>RIESGOS.</b> Cualquier procedimiento quirúrgico entraña un cierto grado de riesgo y es importante que usted comprenda los riesgos asociados a la liposucción. La decisión individual de someterse a una intervención quirúrgica se basa en la comparación del riesgo con el beneficio potencial. Aunque la mayoría de los pacientes no experimentan las siguientes complicaciones, usted debería discutir cada una de ellas con su cirujano plástico para asegurarse de que comprende los riesgos, complicaciones potenciales y consecuencias de la liposucción.</br></br>El paciente manifiesta que tomando en cuenta sus características personales, el médico le describió las complicaciones probables que la literatura médica reporta específicamente para el acto médico que se propone y que después de relacionarlos con los beneficios antes descritos, conjuntamente con el paciente deciden el desarrollo del acto médico propuesto, aceptando que se conocen como posibles riesgos los siguientes:</p><br/>' +
            '<p id="texto"><b>Hemorragia.</b> Es posible aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia postoperatoria, puede requerir tratamiento de emergencia para drenar la sangre acumulada, o transfusión de sangre. No debe tomar aspirina o medicación antiinflamatoria desde 10 días antes de la cirugía, puesto que pueden aumentar el riesgo de hemorragia.</p><br/>' +
            '<p id="texto"><b>Infección:</b> La infección es infrecuente tras este tipo de intervención. Si ocurre una infección, el tratamiento incluye el uso de antibióticos o cirugía adicional. Es extremadamente raro que pueda ocurrir una infección severa y producir infección bacteriana en otra parte del cuerpo.</p><br/>' +
            '<p id="texto"><b>Cambios en la sensibilidad de la piel:</b> Las zonas de liposucción están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad de la piel inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal. Ocasionalmente puede ocurrir una pérdida parcial o total de la sensibilidad de la piel aunque es muy raro.</p><br/>' +
            '<p id="texto"><b>Cicatriz cutánea:</b> La cicatrización excesiva (queloide) es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden ser inestéticas o de diferente color al de la piel circundante. El paciente podría necesitar cirugía adicional para tratar cicatrices anormales tras la cirugía o un tatuaje de la misma para igualar el color.</p><br/>' +
            '<p id="texto"><b>Retraso en la cicatrización:</b> Existe la posibilidad de una apertura (dehiscencia) de la herida o de una cicatrización retrasada. Algunas zonas pueden no curar normalmente y tardar un tiempo largo en cicatrizar. </p><br/>' +
            '<p id="texto"><b>Los fumadores</b> tienen un mayor riesgo de pérdida de piel y complicaciones de la cicatrización.</p><br/>' +
            '<p id="texto"><b>Trombolembolismo.</b> Aunque es muy raro que se presente, existe la posibilidad en que en algún momento durante o posterior a la cirugía se desprendan uno o varios pequeños trombos (coágulos) que alteren el funcionamiento de los pulmones o del cerebro por un mecanismo de obstrucción de la circulación normal produciéndose una embolia pulmonar o cerebral y casos muy raros producir la muerte. Si ocurre una embolia grasa o cualquier otra complicación pulmonar tras la liposucción el paciente podría necesitar tratamiento adicional incluyendo hospitalización.</p><br/>' +
            '<p id="texto"><b>Arrugas y pliegues en la piel:</b> Pueden existir pliegues visibles y palpables aunque es muy raro que suceda. Esto puede ser más pronunciado en pacientes con tipos de piel delgada y de mala calidad. el paciente podría necesitar tratamientos adicionales incluyendo cirugía para tratar irregularidades del contorno de la piel tras una liposucción.</p><br/>' +
            '<p id="texto"><b>Reacciones alérgicas.</b> En casos raros se han descrito alergias locales al esparadrapo, material de sutura o preparados tópicos. Pueden ocurrir en casos muy raros reacciones sistémicas, que son más graves, frente a medicaciones usadas durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p><br/>' +
            '<p id="texto"><b>Anestesia.</b> Tanto la anestesia local como la anestesia general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p><br/>' +
            '<p id="texto"><b>Asimetría.</b> Puede no conseguirse un aspecto simétrico del cuerpo tras la liposucción. Factores como el tono de la piel, prominencias óseas, y tono muscular, pueden contribuir a una asimetría normal en los rasgos corporales. Usted puede estar insatisfecho con los resultados de la cirugía. Infrecuentemente se necesita realizar cirugía adicional para mejorar los resultados.</p><br/>' +
            '<p id="texto"><b>Shock quirúrgico.</b> En raras circunstancias, este procedimiento puede causar un trauma severo, particularmente cuando se succionan áreas múltiples o extensas en un mismo tiempo. Aunque son infrecuentes las complicaciones serias, infecciones o una excesiva pérdida de fluidos pueden llevar a un problema serio o incluso la muerte. Si ocurre el paciente podría necesitar hospitalización y tratamiento adicional.</p><br/>' +
            '<p id="texto"><b>Pérdida de piel.</b> La pérdida cutánea es rara tras una liposucción. El paciente podría necesitar tratamientos adicionales, incluyendo cirugía.</p><br/>' +
            '<p id="texto"><b>Efectos a largo plazo.</b> Pueden ocurrir alteraciones posteriores en el contorno corporal como resultado del envejecimiento, pérdida o ganancia de peso, embarazo u otras circunstancias no relacionadas con la liposucción.</p><br/>' +
            '<p id="texto"><b>Necesidad de cirugía adicional.</b> Existen muchas condiciones variables además de los riesgos y complicaciones quirúrgicas potenciales que pueden influenciar los resultados a largo plazo del procedimiento. Aunque los riesgos y complicaciones son raros, los riesgos citados están particularmente asociados con el procedimiento. Pueden ocurrir otros riesgos y complicaciones, pero son todavía más infrecuentes.<br/></br>Si alguna complicación se presenta podría ser necesaria la cirugía adicional u otros tratamientos. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que pueden obtenerse.</br></br>En forma complementaria se manifiesta también, que el médico explicó el significado de la libertad prescriptiva que solicita como autorización, de tal forma que si el paciente decide otorgar su consentimiento, el médico tratante queda facultado para actuar y resolver la contingencia o emergencia que eventualmente se pudiera presentar, así como para actuar o dejar de hacerlo, si así se requiere o hay riesgos. Lo anterior, derivado del acto médico autorizado.</p></br>' +
            '<p id="texto"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado:<br/><ul><li id="texto">Mejoramiento del contorno corporal.</li></ul></p></br>' +
            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
            '<p id="texto"><ul><li id="texto">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Liposucción.</li>' +
            '<li id="texto">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
            '<li id="texto">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
            '<li id="texto">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
            '<li id="texto">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
            '<li id="texto">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
            '<li id="texto">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li id="texto">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
            '<li id="texto">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
            '<li id="texto">LOCALIZACIÓN DE LAS CICATRICES: Cicatrices muy pequeñas de 1 cm. y de 0,5 cm. en pliegues diversos según las zonas a tratar.</li>' +
            '</ul></p></br>' +
            '<p id="texto"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.<br/><br/>Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.</br><br/>Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';
        }
        if (arr_typeProcess[5] == 5) {
          imgs.defaultValue += '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PARA MAMOPLASTIA DE AUMENTO CON IMPLANTES</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Mampolastia de aumento con implantes</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p><br/>' +
            '<p id="texto"><b>¿En qué consiste el procedimiento?</b>  La mamoplastia de aumento es una operación quirúrgica destinada a aumentar el tamaño de las mamas, por una serie de motivos:<br/><br/>Para mejorar el contorno corporal de la mujer, la cual por razones personales considera demasiado pequeño el tamaño de su pecho.</br><br/>Para corregir una pérdida en el volumen mamario después de un embarazo.</br></br>Para equilibrar el tamaño de las mamas, cuando existe una diferencia significativa entre ellas.</br></br>Como técnica reconstructiva en determinadas situaciones.</br></br>La forma y el tamaño de las mamas previas a la cirugía pueden influir tanto en el tratamiento recomendado como en el resultado final. Si las mamas no tienen el mismo tamaño o forma antes de la cirugía, es poco probable que sean completamente simétricas después.</br></br>Existen varios tipos de implantes: RELLENOS DE GEL DE SILICONA, RELLENOS DE SUERO FISIOLÓGICO, DE SUPERFICIE LISA, TEXTURADA, DE FORMA REDONDA O ANATÓMICA, ETC. el médico tratante le indicará el más adecuado para  cada  caso individual.</br></br>El aumento de la mama se consigue implantando una prótesis ya sea detrás del tejido mamario subglandular debajo del músculo pectoral-submuscular y/o debajo de la aponeurosis del músculo pectoral (subfacial).  Las incisiones se realizan de forma que las cicatrices resulten lo más invisibles que sea posible, habitualmente alrededor de la parte inferior de la areola, o por debajo de la mama, o en la axila. El método de  implantación y la posición de la prótesis dependerá de sus preferencias, su anatomía y la recomendación de mi médico tratante.</p></br>' +
            '<p id="texto"><b>TRATAMIENTO ALTERNATIVO.</b> La mamoplastia de aumento es una operación quirúrgica electiva. La alternativa podría consistir en no llevar a cabo la intervención, el uso de una prótesis mamaria externa o relleno.</p><br/>' +
            '<p id="texto"><b>RIESGOS.</b> Cualquier procedimiento quirúrgico entraña un cierto grado de riesgo y es importante que usted comprenda los riesgos asociados a la mamoplastia de aumento. La decisión individual de someterse a una intervención quirúrgica se basa en la comparación del riesgo con el beneficio potencial. Aunque la mayoría de las mujeres no experimentan las siguientes complicaciones, usted debería discutir cada una de ellas con su médico tratante para asegurarse de que comprende los riesgos, complicaciones potenciales y consecuencias del aumento mamario.</p><br/>' +
            '<p id="texto"><b>Sangrado.</b>  Es posible, aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia post-operatoria, puede requerir tratamiento de urgencia para drenar la sangre acumulada, en caso muy extremo  transfusión de sangre. No debe tomar aspirina o medicamento antiinflamatorio, inhibidores coagulación, vit. E, medicamentos naturistas, ginkgo biloba desde 15 días antes de la cirugía., puesto que pueden aumentar el riesgo de  hemorragia.</p><br/>' +
            '<p id="texto"><b>Infección:</b> La infección después de la cirugía es muy rara. Si ocurre una infección, puede ser necesario tratamiento adicional, incluyendo antibióticos.</p><br/>' +
            '<p id="texto"><b>Contractura capsular.</b> El tejido cicatricial que se forma internamente alrededor del implante puede contraerse y hacer que la prótesis se haga redonda, firme y posiblemente dolorosa. La dureza excesiva de las mamas puede ocurrir al poco tiempo de la cirugía o al cabo de años. Puede esperarse que la incidencia de la contractura capsular sintomática aumenta con el tiempo. La contractura capsular puede ocurrir en un lado, en los dos o en ninguno. El tratamiento para la contractura capsular puede requerir cirugía, cambio del implante o retirada del mismo.</p><br/>' +
            '<p id="texto"><b>Cambios en la sensibilidad del pezón y la piel.</b> Las mamas están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad del pezón inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal.</p><br/>' +
            '<p id="texto"><b>Cicatrices cutáneas.</b> La cicatrización excesiva es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden ser inestéticas o de diferente color al de la piel circundante. El paciente podría necesitar cirugía adicional para tratar cicatrices anormales tras la cirugía, que puede incurrir en gastos económicos.</p><br/>' +
            '<p id="texto"><b>Implantes.</b> Los implantes mamarios, al igual que otros dispositivos médicos, pueden fallar. Pueden romperse o tener escapes. Cuando una prótesis de suero se vacía, el relleno de agua salada se absorbe por el organismo. La rotura puede ocurrir como resultado de una herida, durante una mamografía, o sin causa aparente. Las prótesis no tienen una vida ilimitada y eventualmente requerirán cirugía de recambio.</p><br/>' +
            '<p id="texto"><b>Extrusión del implante.</b> La falta de adecuada cobertura tisular o un infección puede dar como resultado la exposición y extrusión del implante. Se han visto casos de rotura de la piel con el uso de medicación esteroidea o tras radioterapia del tejido mamario. Si ocurre rotura del tejido y la prótesis se expone, es necesario su retiro.</p><br/>' +
            '<p id="texto"><b>Mamografía.</b> Si usted tiene alrededor de 35 años de edad, es recomendable realizar una mamografía y un ultrasonido preoperatorio. Usted debe informar al radiólogo de la presencia de prótesis mamarias, para que pueda realizarse los estudios mamográficos adecuados. La ecografía, mamografía especializada y la resonancia magnética pueden ser apropiados para evaluar nódulos mamarios y el estado de los implantes.</p><br/>' +
            '<p id="texto"><b>Arrugas y pliegues en la piel.</b> Pueden existir pliegues en el implante visibles y palpables. Es normal y de esperar que haya alguna arruga. Esto puede ser más pronunciado en pacientes con tejido mamario delgado.</p><br/>' +
            '<p id="texto"><b>Embarazo y lactancia.</b> No existe evidencia suficiente en cuanto a la absoluta seguridad de los implantes mamarios respecto a la fertilidad, embarazo o lactancia. Aunque no hay evidencia de ningún peligro especial de los implantes para la mujer embarazada o su hijo, continúan los estudios para buscar posibles problemas.</p><br/>' +
            '<p id="texto"><b>Calcificación.</b> Pueden formarse depósitos de calcio en el tejido que rodea la prótesis, lo que puede causar dolor, aumento de la consistencia, y puede ser visibles en la mamografía. Si esto ocurre, puede ser necesaria cirugía adicional para corregir el problema.</p><br/>' +
            '<p id="texto"><b>Actividades.</b> Las actividades y ocupaciones que implican un riesgo de traumatismo mamario, potencialmente podrían romper o dañar los implantes mamarios.</p><br/>' +
            '<p id="texto"><b>Reacciones alérgicas.</b> En casos raros se han descrito alergias locales al micropore material de sutura o preparados tópicos. Pueden ocurrir reacciones sistémicas, que son más graves, frente a medicamentos usados durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p><br/>' +
            '<p id="texto"><b>Enfermedad de la mama.</b> La literatura médica actual no demuestra un incremento en el riesgo de enfermedad mamaria o cáncer de mama en mujeres portadoras de prótesis mamarias por motivo estético o reconstructivo. La enfermedad mamaria puede aparecer independientemente de la presencia de prótesis. Es recomendable que todas las mujeres se practiquen autoexamen periódicamente, se sometan a mamografía y ultrasonido cada año si son mayores de 35 años y que consulten a su médico si descubre un bulto en la mama.</p><br/>' +
            '<p id="texto"><b>Anestesia.</b> Tanto la anestesia local como la general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p><br/>' +
            '<p id="texto"><b>Necesidad de cirugía adicional.</b> Existen muchas condiciones variables además de los riesgos y complicaciones quirúrgicas potenciales que pueden influenciar los resultados a largo plazo del procedimiento. Aunque los riesgos y complicaciones son raros, los riesgos citados están particularmente asociados con el procedimiento. Pueden ocurrir otros riesgos y complicaciones, pero son todavía más infrecuentes.</br></br>Si alguna complicación se presenta podría ser necesaria la cirugía adicional u otros tratamientos. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que pueden obtenerse.</br></br>En forma complementaria se manifiesta también, que el médico explicó el significado de la libertad prescriptiva que solicita como autorización, de tal forma que si el paciente decide otorgar su consentimiento, el médico tratante queda facultado para actuar y resolver la contingencia o emergencia que eventualmente se pudiera presentar, así como para actuar o dejar de hacerlo, si así se requiere o hay riesgos. Lo anterior, derivado del acto médico autorizado.</p><br/>' +
            '<p id="texto"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado.<br/><ul><li id="texto">Aumento del volumen mamario</li>' +
            '<li id="texto">Mejoramiento del contorno del torso</li></ul></p></br>' +
            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
            '<p id="texto"><ul><li id="texto">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Aumento mamario con implantes.</li>' +
            '<li id="texto">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
            '<li id="texto">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
            '<li id="texto">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
            '<li id="texto">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
            '<li id="texto">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
            '<li id="texto">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li id="texto">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
            '<li id="texto">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
            '<li id="texto">Estoy de acuerdo en que no se me ha dado garantía por parte de nadie en cuanto al resultado que puede ser obtenido.</li>' +
            '<li id="texto">LOCALIZACIÓN DE LAS CICATRICES: Incisión Periareolar (alrededor del pezón), Incisión Submamaria (en el surco bajo de la mama), Incisión axilar (en la axila).</li>' +
            '</ul></p></br>' +
            '<p align="center"><img src="' + implantesMamarios + '" /></p>' +
            '<p id="texto"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.</br></br>Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.</br></br>Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';
        }
        if (arr_typeProcess[1] == 1) {
          imgs.defaultValue += '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PARA BLEFAROPLASTIA / PEXIA DE CEJA.</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, lara, precisa y sencilla sobre los riesgos y beneficios de someterme al procedimiento de Blefaroplastia / Pexia de ceja en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 11550.</p><br/>' +
            '<p id="texto"><b>¿En qué consiste el procedimiento?</b>  El objetivo de la cirugía de los párpados es normalizar o  rejuvenecer la zona de alrededor de los ojos, para conseguir una mirada luminosa y natural.<br/><br/>El paciente puede presentar uno, dos o los tres componentes anatómicos siguientes alterados, que pueden ser tratados con la cirugía:</br><br/>' +
            '<ul id="texto"><li>Exceso de piel de los párpados superiores y/o inferiores.</li>' +
            '<li>Engrosamiento o hipertrofia del músculo orbicular de los párpados inferiores.</li>' +
            '<li>Herniación o protrusión de las bolsas de grasa o compartimentos graso de los párpados superiores y/o inferiores, que rodean el globo ocular.</li></ul><br/></p>' +
            '<p id="texto">Es importante el estudio preoperatorio, para determinar la posible asimetría preexistente, la laxitud o falta de soporte de los párpados,  la capacidad de lágrima, el vector del ojo en relación al maxilar, etc., para descartar contraindicaciones y evitar posibles complicaciones. En muchos casos será necesario efectuar también  una cantopexia, que es una estabilización de la comisura externa (canto externo), para evitar el “ojo redondo” o la excesiva distancia entre la pupila y el párpado inferior o “exposición escleral”. En determinadas ocasiones, también podremos efectuar una cantoplastia para conseguir unos ojos más rasgados o almendrados.</p></br>' +
            '<p id="texto">El exceso de piel de los párpados superiores suele ser tratado mediante la extirpación de la piel sobrante, con una pequeña incisión ubicada justo en el pliegue de los párpados, cuya cicatriz resulta inaparente. La bolsa grasa que aparece más frecuentemente en el párpado superior es la interna, que es posible extirpar a través de una pequeña incisión en la piel, cuya cicatriz resulta inaparente, o bien con la misma incisión que utilizaremos para eliminar la piel sobrante del párpado superior.</p></br>' +
            '<p id="texto">En algunos casos será beneficioso efectuar, al mismo tiempo, la acentuación del surco palpebral, la recolocación  de la glándula lagrimal, la eliminación de las arrugas del entrecejo debilitando el músculo corrugador, la cantopexia o incluso la eliminación de las bolsas grasas del párpado inferior, aprovechando la misma incisión del párpado superior. Para tratar las bolsas grasas de los párpados en pacientes en los que no exista exceso de la piel en el párpado inferior, es posible utilizar  la  VÍA TRANSCONJUNTIVAL. Las suturas suelen ser retiradas a los 5 días, y el paciente puede hacer vida normal pasada una semana. En ocasiones, se necesitará mantener los ojos del paciente cerrados después de la intervención mediante un apósito que será retirado después de unas horas o al día siguiente. Es muy recomendable, una vez pasados unos 7 días, efectuar ligeros masajes en la zona para facilitar la acomodación de los tejidos.</p></br>' +
            '<p id="texto">PEXIA (TRACCIÓN) DE CEJA</br></br>Se realiza una incisión dentro del cuero cabelludo de 2cm que nos permite despegar el área de la cara y cola de la ceja, esto quitará el exceso de la piel que está por fuera del párpado superior. Se dejará un punto dentro del cuero cabelludo y tardará de 15 a 20 días en caer. En ocasiones es necesario utilizar 2 incisiones igual de pequeñas cuando el exceso de piel es mayor y requerirá igualmente 2 puntos en lugar de 1. El resultado de esta intervención permite levantar ligeramente la cola de la ceja.</p></br>' +
            '<p id="texto"><b>TRATAMIENTO ALTERNATIVO.</b> Las formas alternativas de manejo consisten en no realizarse el procedimiento descrito.</p><br/>' +
            '<p id="texto"><b>RIESGOS.</b> Cualquier procedimiento quirúrgico entraña un cierto grado de riesgo y es importante que usted comprenda los riesgos asociados la  Blefaroplastia / Pexia de ceja.  La decisión individual de someterse a una intervención quirúrgica se basa en la comparación del riesgo con el beneficio potencial. Aunque la mayoría de los pacientes no experimentan las siguientes complicaciones, usted debería discutir cada una de ellas con su cirujano plástico para asegurarse de que comprende los riesgos, complicaciones potenciales y consecuencias del procedimiento.</p><br/>' +
            '<p id="texto">Las posibles complicaciones que pueden presentarse en la cirugía de los párpados normalmente son pasajeras, pero deben tenerse siempre en cuenta también, posibles complicaciones muy raras como el cúmulo de sangre o hematoma retro bulbar que debe ser tratado inmediatamente y que podría llegar a producir una ceguera; la excesiva retracción de la piel que podría dar lugar a un “ojo redondo” o exposición eschleral,  la lesión de la musculatura que podría llegar a  alterar la movilidad del globo ocular; la disminución del a capacidad de producir lágrimas que podrían dar lugar a un “ojo Seco”.</p><br/>' +
            '<p id="texto">Igualmente se manifiesta que tomando en cuenta las características personales del paciente, el médico describió las complicaciones probables que la literatura médica reporta específicamente para el acto médico que se propone y que después de relacionarlos con los beneficios antes descritos, conjuntamente con el paciente deciden el desarrollo del acto médico propuesto, aceptando que se conocen como posibles riesgos los siguientes:</p><br/>' +
            '<p id="texto"><b>Sangrado.</b>Es posible, aunque raro, que se presente un episodio de hemorragia durante o después de la cirugía. Si se desarrolla una hemorragia postoperatoria, puede requerir tratamiento de urgencia para extraer la sangre acumulada, o transfusión de sangre. No debe tomar aspirina o antiinflamatorios desde 10 días antes de la cirugía, puesto que pueden aumentar el riesgo de problemas de sangrado. La hipertensión (aumento de la presión sanguínea) que no está bien controlada médicamente puede ser causa de sangrado durante o después de la cirugía. Los acúmulos de sangre bajo la piel pueden retrasar la curación y causar cicatrización excesiva.</p><br/>' +
            '<p id="texto"><b>Infección:</b>La infección después de la cirugía es muy rara. Si ocurre una infección, puede ser necesario tratamiento adicional, incluyendo antibióticos.</p><br/>' +
            '<p id="texto"><b>Cicatrización.</b> Aunque se espera una buena curación de la herida después del procedimiento quirúrgico, pueden darse cicatrices anormales tanto en la piel como en los tejidos profundos. Las cicatrices pueden ser inestéticas o de diferente color al de la piel circundante. Existe la posibilidad de marcas visibles por las suturas. El paciente podría necesitar tratamientos adicionales para tratar la cicatrización anormal.</p><br/>' +
            '<p id="texto"><b>Problemas de sequedad ocular.</b>Después de una blefaroplastia pueden quedar alteraciones permanentes en la producción de lágrimas. Es raro que ocurra este hecho, y no es enteramente predecible. Los individuos que tienen habitualmente sequedad ocular deben tener precaución especial a la hora de considerar someterse a una blefaroplastia.</p><br/>' +
            '<p id="texto"><b>Asimetría.</b>La cara humana y la región de los párpados es asimétrica. Dicha asimetría existente no se modifica con la cirugía de párpados.</p><br/>' +
            '<p id="texto"><b>Anestesia.</b>Tanto la anestesia local como la general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier forma de anestesia o sedación quirúrgica.</p><br/>' +
            '<p id="texto"><b>Ectropión.</b>La separación entre el párpado inferior y el globo ocular es una complicación rara. El paciente podría necesitar cirugía adicional para corregir esta alteración.</p><br/>' +
            '<p id="texto"><b>Dolor crónico.</b>Un dolor de forma crónica tras una blefaroplastia es muy infrecuente.</p><br/>' +
            '<p id="texto"><b>Alteraciones.</b>La blefaroplastia es un procedimiento quirúrgico que tensa la piel flácida y las estructuras profundas del párpado. Las enfermedades y el cáncer de piel pueden desarrollarse independientemente de que se haya realizado cirugía en el párpado.</p><br/>' +
            '<p id="texto"><b>Reacciones alérgicas.</b>En casos raros se han descrito alergias locales a adhesivos, material de sutura o preparados tópicos. Pueden ocurrir reacciones sistémicas, que son más graves, frente a medicaciones usadas durante la cirugía o prescritas después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p><br/>' +
            '<p id="texto"><b>Pérdida de pestañas.</b>La pérdida de  las pestañas puede ocurrir en el párpado inferior, donde se eleva la piel durante la cirugía. La ocurrencia de este hecho no es predecible. La pérdida puede ser temporal o permanente.</p><br/>' +
            '<p id="texto"><b>Retraso en la cicatrización.</b>Existe la posibilidad de una apertura de la herida o de una cicatrización retrasada. Algunas zonas de la cara pueden no curar normalmente y tardar un tiempo largo en cicatrizar. Algunas áreas de piel pueden morir, lo que puede requerir cambios frecuentes de vendaje o cirugía posterior para eliminar el tejido no curado.</br/>Los fumadores tienen un mayor riesgo de pérdida de piel y complicaciones de la cicatrización.</p><br/>' +
            '<p id="texto"><b>Efectos a largo plazo.</b>Pueden ocurrir alteración subsecuente en el aspecto del párpado como resultado del envejecimiento, pérdida o ganancia de peso, exposición al sol, u otras circunstancias no relacionadas con la cirugía. La blefaroplastia no detiene el proceso de envejecimiento ni produce estiramiento permanente de la región de los párpados. El paciente podría necesitar cirugía en un futuro  u otros tratamientos para mantener los resultados de una blefaroplastia.</p><br/>' +
            '<p id="texto"><b>Seguro de salud.</b>Si el exceso de piel de los párpados superiores interfiere con su visión, su compañía de seguro puede cubrir la cirugía de blefaroplastia para los párpados superiores únicamente. La mayoría de las compañías de seguros excluyen la cobertura de operaciones de cirugía estética, como la blefaroplastia de los párpados inferiores, o de cualquier complicación que pudiera derivarse de la cirugía. Por favor, revise detenidamente las condiciones de su póliza de seguro.</p></br>' +
            '<p id="texto"><b>Necesidad de cirugía adicional.</b>Existen muchas condiciones variables además de los riesgos y complicaciones quirúrgicas potenciales que pueden influenciar los resultados a largo plazo obtenidos en este procedimiento. Aunque los riesgos y complicaciones son raros, los riesgos citados están particularmente asociados con el procedimiento. Pueden ocurrir otros riesgos y complicaciones, pero son todavía más infrecuentes.</p></br>' +
            '<p id="texto">Si alguna complicación se presenta podría ser necesaria la cirugía adicional u otros tratamientos. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que pueden obtenerse.</p></br>' +
            '<p id="texto">En forma complementaria se manifiesta también, que el médico explicó el significado de la libertad prescriptiva que solicita como autorización, de tal forma que si el paciente decide otorgar su consentimiento, el médico tratante queda facultado para actuar y resolver la contingencia o emergencia que eventualmente se pudiera presentar, así como para actuar o dejar de hacerlo, si así se requiere o hay riesgos. Lo anterior, derivado del acto médico autorizado.</p></br>' +
            '<p id="texto"><b>BENEFICIOS.</b>Los beneficios esperados son normalizar o  rejuvenecer la zona de alrededor de los ojos, para conseguir una mirada luminosa y natural.</p></br>' +
            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
            '<p id="texto"><ul><li id="texto">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Blefaroplastia / Pexia de ceja.</li>' +
            '<li id="texto">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
            '<li id="texto">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
            '<li id="texto">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
            '<li id="texto">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
            '<li id="texto">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
            '<li id="texto">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li id="texto">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
            '<li id="texto">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
            '<li id="texto">Estoy de acuerdo en que no se me ha dado garantía por parte de nadie en cuanto al resultado que puede ser obtenido. </li>' +
            '<li id="texto">LOCALIZACIÓN DE LAS CICATRICES: Incisión externa en surco palpebral (párpado superior), incisión externa en párpado inferior, incisión interna en conjuntiva (párpado inferior).</li>' +
            '</ul></p></br>' +
            '<p align="center"><img src="' + image_parpadoSuperiorInferios + '" /></p>' +
            '<p id="texto"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.</p><br/>' +
            '<p id="texto">Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.</p><br/>' +
            '<p id="texto">Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p><br/>';
        }
        if (arr_typeProcess[49] == 49) {
          imgs.defaultValue += '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PARA RINOSEPTOPLASTIA</h1>' +
            '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fecha + '</b></p><br/>' +
            '<p id="texto">Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con <b>' + cfp + '</b> y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al <b>procedimiento de Rinoseptoplastia</b> en Albya The New Aesthetic, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Anatole France 145, Col. Polanco, Delegación Miguel Hidalgo, Ciudad de México, C.P. 1550.</p><br/><span id="scrollhere"></span>' +
            '<p id="texto"><b>¿En qué consiste el procedimiento?</b>  La Rinoseptoplastia es un procedimiento encaminado a mejorar el aspecto estético y funcional de la nariz produciendo los siguientes probables beneficios: Mejorar la forma y proporción de la nariz y de la cara, la cual por razones personales considera inapropiada.<br/><br/>Las cirugías previas y los elementos anatómicos que se hubieran utilizado o modificado en ellas pueden influir tanto en el tratamiento recomendado como en el resultado final. Si no se tiene simetría o forma antes de la cirugía, es solo probable que se consiga una mejoría después.</br><br/>Existen varios tipos de Rinoseptoplastias, pero en general existen dos grandes grupos que consisten en las técnicas abiertas y las cerradas. En conjunto con mi médico tratante y debido a su experiencia y mi conveniencia escogemos la técnica ' +
            /* SELECTOR DE TIPO DE RINOPLASTIA */
            '<select id="typeRinoplastia" require><option value=0></option><option value=1>Abiertas</option><option value=2>Cerradas</option> *</select>' +

            '</p></br>' +
            '<p id="texto"><b>TRATAMIENTO ALTERNATIVO.</b> Las formas alternativas de manejo consisten en colocar prótesis externas para mejorar la punta nasal, o rinomodelación con rellenos biocompatibles y temporales. Existen riesgos y complicaciones potenciales asociados con las formas alternativas de tratamiento.</p><br/>' +
            '<p id="texto"><b>RIESGOS DE LA CIRUGÍA DE RINOSEPTOPLASTIA.</b> El paciente manifiesta que tomando en cuenta sus características personales, el médico le describió las complicaciones probables que la literatura médica reporta específicamente para el acto médico que se propone y que después de relacionarlos con los beneficios antes descritos, conjuntamente con el paciente deciden el desarrollo del acto médico propuesto, aceptando que se conocen como posibles riesgos los siguientes:</p><br/>' +
            '<p id="texto"><b>Hemorragia:</b>  Es posible aunque infrecuente, experimentar un episodio de sangrado durante o después de la cirugía. Si ocurre una hemorragia postoperatoria, puede requerir tratamiento de emergencia para drenar la sangre acumulada, o transfusión de sangre. No debe tomar aspirina o medicación antiinflamatoria desde 10 días antes de la cirugía, puesto que pueden aumentar el riesgo de hemorragia.</p><br/>' +
            '<p id="texto"><b>Infección:</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p><br/>' +
            '<p id="texto"><b>Cambios en la sensibilidad de la piel:</b> La nariz y la mucosa nasal están habitualmente doloridas después de la cirugía. No es raro que haya algún cambio en la sensibilidad inmediatamente después de la cirugía. Al cabo de varios meses la mayoría de las pacientes tienen una sensibilidad normal. Ocasionalmente puede ocurrir una pérdida parcial o total de la sensibilidad de la piel aunque es muy raro.</p><br/>' +
            '<p id="texto"><b>Cicatriz cutánea:</b> La cicatrización excesiva (queloide) es infrecuente. En casos raros pueden darse cicatrices anormales. Las cicatrices pueden retraerse y deformar la mucosa nasal. En este caso no existirán cicatrices externas.</p><br/>' +
            '<p id="texto"><b>Retraso en la cicatrización:</b> existe la posibilidad de una apertura (dehiscencia) de la herida o de una cicatrización retrasada. Algunas zonas pueden no curar normalmente y tardar un tiempo largo en cicatrizar.</p><br/>' +
            '<p id="texto"><b>Los fumadores</b> tienen un mayor riesgo de pérdida de piel y complicaciones de la cicatrización.</p><br/>' +
            '<p id="texto"><b>Arrugas y pliegues en la piel:</b> Pueden existir pliegues en la piel visibles y palpables aunque es muy raro que esto suceda. Esto puede ser más pronunciado en pacientes con tipos de piel delgada y de mala calidad.</p><br/>' +
            '<p id="texto"><b>Actividades y ocupaciones poco frecuentes:</b> Estas actividades y ocupaciones pueden implicar un riesgo en la evolución normal de la cirugía.</p><br/>' +
            '<p id="texto"><b>Reacciones alérgicas:</b> En casos raros se han descrito alergias locales al esparadrapo, material de sutura o preparados tópicos. Pueden ocurrir en casos muy raros reacciones sistémicas, que son más graves, frente a medicaciones usadas durante la cirugía o después. Las reacciones alérgicas pueden requerir tratamiento adicional.</p><br/>' +
            '<p id="texto"><b>Anestesia:</b> Tanto la anestesia local como la anestesia general implican un riesgo. Existe la posibilidad de complicaciones, lesiones e incluso muerte, por cualquier tipo de anestesia o sedación quirúrgica.</p><br/>' +
            '<p id="texto"><b>BENEFICIOS.</b> Como un hecho sobresaliente debe señalarse que la explicación del médico fue lo suficientemente clara para evidenciar los beneficios que el acto médico propuesto le ofrece al paciente respecto a otras opciones de manejo, sobresaliendo particularmente las siguientes ventajas positivas del procedimiento de atención antes mencionado.<br/><ul><li id="texto">Mejoramiento de la forma y proporción de la nariz y de la cara.</li>' +
            '<li id="texto">Mejoramiento de la capacidad ventilatoria.</li></ul></p></br>' +

            '<p id="texto"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b></p>' +
            '<p id="texto"><ul><li id="texto">Autorizo ​​al equipo médico, a los auxiliares médicos y de enfermería de Albya The New Aesthetic, S.C., a realizar el procedimiento de Rinoseptoplastia.</li>' +
            '<li id="texto">El Paciente otorga consentimiento para la administración de los anestésicos que se consideren necesarios o aconsejables. Comprendo que cualquier forma de anestesia entraña un riesgo y la posibilidad de complicaciones, lesiones y muy raramente, muerte.</li>' +
            '<li id="texto">Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
            '<li id="texto">Autorizo la toma de fotografías antes, durante y después de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
            '<li id="texto">Autorizo el uso de mis fotografías para fines de enseñanza, presentaciones en Congresos así como para cualquier otro fin que no sea en detrimento de mi persona y dignidad.</li>' +
            '<li id="texto">Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que el médico me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. El paciente da fe de no haber omitido o alterado datos al exponer su historial y antecedentes clínico-quirúrgicos, especialmente los referidos a alergias y enfermedades o riesgos personales.</li>' +
            '<li id="texto">Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
            '<li id="texto">El médico me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional para la protección de mi salud.</li>' +
            '<li id="texto">El paciente solicitante o responsable legal, se hará cargo de cubrir todos los honorarios médicos que se causen, y los correspondientes a servicios y materiales médicos y de curación en que se incurran durante el tratamiento solicitado según el presupuesto realizado. El coste de la cirugía resulta de diversos cargos por servicios prestados. El total incluye los honorarios del cirujano, el coste del material quirúrgico, anestesia, pruebas de laboratorio, y posibles cargos del hospital, dependiendo de dónde se realice la cirugía. Si el coste de la cirugía está cubierto por un seguro, usted puede ser responsable de pagos adicionales, deducciones y cargos no cubiertos. Puede haber costes adicionales si se dan complicaciones derivadas de la cirugía. Los cargos por cirugía secundaria o cirugía hospitalaria de día relacionados con revisión quirúrgica podrían también correr a su cargo.</li>' +
            '<li id="texto">Estoy de acuerdo en que no se me ha dado garantía por parte de nadie en cuanto al resultado que puede ser obtenido.</li>' +
            '</ul></p></br>' +
            '<p id="texto">El paciente manifiesta que se le ha informado que existen muchas condiciones variables que pueden influenciar los resultados a largo plazo de la RINOSEPTOPLASTIA y, que podría  ser necesaria una cirugía secundaria para realizar una corrección adicional. La práctica de la Medicina y la Cirugía no es una ciencia exacta, y aunque se esperan buenos resultados, no hay garantía explícita o implícita sobre los resultados que puedan obtenerse.</p></br>' +
            '<p id="texto"><b>RENUNCIA.</b> Los documentos de consentimiento informado se emplean para comunicar información acerca del tratamiento quirúrgico propuesto para una enfermedad o condición determinada, así como para mostrar los riesgos y formas alternativas de tratamiento. El proceso de consentimiento informado pretende definir los principios para dar a conocer los riesgos, que generalmente satisfacerá las necesidades de la mayoría de los pacientes en la mayoría de las circunstancias.<br/><br/>Sin embargo, no debe considerarse que los documentos de consentimiento informado incluyan todos los aspectos sobre otros métodos de tratamiento o riesgos posibles. Su Cirujano Plástico puede proporcionarle información adicional o diferente, basada en todos los hechos de su caso particular y en el estado del conocimiento médico.</br><br/>Los documentos de consentimiento informado no pretenden definir o servir como el modelo del cuidado médico. Éste será determinado basándose en todos los hechos involucrados en un caso individual, y está sujeto a cambios, puesto que el conocimiento científico y la tecnología avanzan y los modelos de práctica evolucionan.</p>';
        }
        imgs.defaultValue += "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">" +
          '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaCliente + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedico + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
          '<tr><td align="center" width="50%"><img id="myImgFirmaTestigo1" src="' + field_firmaTestigo_1 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img id="myImgFirmaTestigo2" src="' + field_firmaTestigo_2 + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
          '</table>' +
          '</div></div></div></body>';
      }
      else if (subsidiary == '10')///CO 10
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:100%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
          '<div id="notices">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 300px;margin-top:20px">' +
          '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR </h1>' +
          '<p id="texto">NOMBRE DEL PACIENTE: <b>' + name + '</b></p>' +
          '<p id="texto">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucursalTexto + ' a ' + fecha + '</b></p><br/>' +
          '<p id="texto">Dentro de las normas éticas exigidas al profesional médico en Colombia por la ley 23 de 1981 se encuentra el deber de informar adecuada y oportunamente a todos sus pacientes los riesgos que puedan derivarse del tratamiento que le será practicado, solicitando su consentimiento anticipadamente (artículo 15 y 16). Por tanto, con el presente documento escrito se pretende informar a usted y a su familia acerca del procedimiento que se le practicará, por lo cual solicitamos llene de su puño y letra los espacios en blanco.</p><br/>' +
          '<p id="texto">Yo ' + name + ' identificado con el documento ' + field_documentIdentification + ' (Escribir cédula de  ciudadanía, cédula de Extranjería, Pasaporte, etc.) N° ' + cfp + ', confirmo  que de manera voluntaria he decidido realizar un injerto de cabello en Kaloni Colombia, S.A.S.</p><br/>' +
          '<p id="texto">Confirmo que he sido informado de los riesgos del procedimiento que a continuación se describen y he realizado las preguntas necesarias sobre cada uno de ellos (Marcar el checkbox con una ✔)</p>' +
          '<p id="texto"><ol>' +
          '<li>Dolor de cabeza o sensación de picadas u hormigueo en las zonas trabajadas ( <input type="checkbox" id="ask_1"> )</li>' +
          '<li>Enrojecimiento e Irritación de las zonas trabajadas ( <input type="checkbox" id="ask_2"> )</li>' +
          '<li>Hinchazón De la Cara o de las zonas trabajadas  ( <input type="checkbox" id="ask_3"> )</li>' +
          '<li>Infecciones ( <input type="checkbox" id="ask_4"> )</li>' +
          '<li>Sangrado, Formación de Hematomas  ( <input type="checkbox" id="ask_5"> )</li>' +
          '<li>Cicatrización anormal  ( <input type="checkbox" id="ask_6"> )</li>' +
          '<li>Alteración de la pigmentación de la piel ( <input type="checkbox" id="ask_7"> )</li>' +
          '<li>Lesión de Paquetes Neurovasculares ( <input type="checkbox" id="ask_8"> )</li>' +
          '<li>Pérdida de Densidad Capilar en la zona donadora ( <input type="checkbox" id="ask_9"> )</li>' +
          '<li>Limitantes del procedimiento en la obtención de resultados y expectativas ( <input type="checkbox" id="ask_10"> )</li>' +
          '</ol></p><br/>' +
          '<p id="texto">Confirmo que he sido informado que el resultado del procedimiento de injerto de cabello no necesariamente alcanzará siempre los resultados esperados y eso dependerá de la idiosincrasia de cada persona y de eventos fortuitos que se pueden presentar.</p><br/>' +
          '<p id="texto">He sido informado claramente de las recomendaciones que debo seguir después del procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para que los implantes logren el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos. </p><br/>' +
          '<p id="texto">Durante el procedimiento se me administrará anestesia local y otros medicamentos; para lo cual he autorizado al médico que realiza el procedimiento; se me informó que los anestésicos y algunos medicamentos  pueden presentar reacciones tales como: (Marcar el checkbox con una ✔)</p>' +
          '<p id="texto"><ol>' +
          '<li>Enrojecimiento e Irritación ( <input type="checkbox" id="ask_11"> )</li>' +
          '<li>Ardor en el momento de aplicación ( <input type="checkbox" id="ask_12"> )</li>' +
          '<li>Hinchazón de la Cara y las zonas trabajadas ( <input type="checkbox" id="ask_13"> )</li>' +
          '<li>Mareo y Náuseas ( <input type="checkbox" id="ask_14"> )</li>' +
          '<li>Dolor de Cabeza ( <input type="checkbox" id="ask_15"> )</li>' +
          '<li>Malestar general ( <input type="checkbox" id="ask_16"> )</li>' +
          '<li>Reacción Alérgica y Anafilaxia ( <input type="checkbox" id="ask_17"> )</li>' +
          '</ol></p><br/>' +
          '<p id="texto">Se me informó cuales son los beneficios que puedo obtener al realizarme este procedimiento de injerto de cabellos:</p><br/>' +
          '<p id="texto">Recuperación de un Porcentaje de densidad en la zona a implantar (Dependiente de la cantidad de cabellos obtenida, el área a trabajar, características de la piel del paciente y cuidados de este posteriores al procedimiento).</p><br/>' +
          '<p id="texto">También manifiesto que se me han informado las alternativas al procedimiento de injerto de cabello que me puede ofrecer el médico tratante.</p><br/>' +
          '<p id="texto">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p><br/>' +
          '<p id="texto">Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) de la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad en presencia de mis testigos y/o familiares sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento de implante de cabello.</p><br/>' +
          '<p id="texto">He sido también informado(a) de que mis datos personales serán protegidos e incluidos en un expediente clínico, que deberá estar sometido a las garantías de la legislación aplicable. Asimismo, autorizo la toma de fotografías de la zona con fines clínicos.</p><br/>' +
          '<table style="width:100%;font-size:10px; font-family:Aria, sans-serif">' +
          '<tr><td align="center" width="50%"><img id="myImgFirmaCli" src="' + field_firmaCliente + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + name + '</b></p></td><td align="center" width="50%"><img id="myImgFirmaMed" src="' + field_firmaMedico + '" width="100" height="100" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MÉDICO RESPONSABLE O TRATANTE<br/>Médico Procedimiento</b></p></td></tr>' +
          '</table>' +
          '</body>';


      }
      else if (subsidiary == '12')///ES 12
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
          '<div id="notices">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 300px;margin-top:20px">' +
          '<h1 id="titulo" align="center">CONSENTIMIENTO INFORMADO </h1>' +
          '<p id="texto">' +
          '<b>FECHA:' + fecha + '</b></p><br/>' +
          '<p id="texto">' +
          'Yo <b>' + name + '</b>, por mi propio derecho y en pleno uso de mis facultades, de <b>' + age + '</b> años de edad, declaro libremente que se me informó de manera amplia, clara, precisa y sencilla sobre todos los riesgos y beneficios de someterme al procedimiento de injerto de cabello; que ya he formulado todas las preguntas que he considerado necesarias y mis dudas han sido atendidas a mi entera satisfacción.' +
          '</p><br />' +
          '<p id="texto">He sido informado, que en atención a la idiosincrasia idiopática de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas por idiosincrasia propia a medicamentos utilizados durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos.</p><br />' +
          '<p id="texto">' +
          'Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere ese consentimiento, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p><br />' +
          '<p id="texto">' +
          'Asimismo, declaro que se me informó detalladamente todos los cuidados post-procedimiento, los cuales por medio del presente, me obligo a cumplir en su totalidad, también me obligo a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo deseado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados posteriores.</p><br/>' +
          '<p id="texto">' +
          'Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p><br/>' +
          '<p id="texto">' +
          'Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) con la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento frente a dos testigos, por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento</p><br/>' +
          '<p id="texto"></p>' +
          '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'FIRMA DEL PACIENTE</b></p>' +
          '<p id="texto"></p>' +
          '<p id="texto"></p>' +
          '</div>' +
          '</div>' +
          '</body>';
      }
      else if (subsidiary == '11')///BR 11
      {
        imgs.defaultValue = '<body>' +
          '<div align="" style="background: url(https://soportekaloni.com/consentimiento/kaloni.png) no-repeat; width:80%; position: absolute; margin-left: 10%; background-position: top right; background-color: aliceblue;">' +
          '<div id="notices">' +
          '<div class="notice" style="margin-left: 50px!important;margin-right: 50px!important;margin-bottom: 50px;padding-bottom: 300px;margin-top:20px">' +
          '<h1 id="titulo" align="center">TERMO DE CONSENTIMENTO INFORMADO PARA O PROCEDIMENTO DE\n' +
          'TRANSPLANTE CAPILAR\n </h1>' +
          '<p id="texto">' +
          '<b>INTRODUÇÃO</b></p><br/>' +
          '<p id="texto">' +
          'Este é um documento que foi elaborado para ajudar o seu médico a lhe informar sobre a cirurgia de transplante capilar, seus riscos e alguns cuidados necessários durante todo o tratamento.' +
          '</p><br />' +
          '<b>RISCOS</b></p><br/>' +
          '<p id="texto">' +
          '<b>Sangramento.</b> É possível que você apresente sangramento durante ou após a cirurgia. Medicamentos como aspirina ou anti-inflamatórios, que podem aumentar o risco de hemorragias, não devem ser usados 03 (três) dias antes do procedimento. A hipertensão arterial e outras doenças, como coagulopatias, também podem causar um maior sangramento.</p><br/>' +
          '<p id="texto">' +
          'É preciso seguir todos os cuidados recomendados para evitar excesso de sangue na área manipulada, o que pode atrasar a cicatrização.</p><br />' +
          '<p id="texto">' +
          '<b>Infecção.</b> Apesar de ser um procedimento ambulatorial, realizado com todos os cuidados adequados de assepsia, existe o risco do surgimento de um quadro infeccioso posteriormente. Caso isso aconteça, entre em contato conosco e serão tomadas todas as medidas cabíveis, como a prescrição de antibióticos específicos para o seu caso.</p><br/>' +
          '<p id="texto">' +
          '<b>Foliculite.</b> Durante o período de cicatrização ou de crescimento dos fios implantados, podem surgir pontos de foliculite. É importante seguir as recomendações pós-procedimento para na tentativa de evitar o quadro. Pacientes com tendência à formação de quelóides, podem apresentar uma variante queloidiana de foliculite.</p><br/>' +
          '<p id="texto">' +
          '<b>Assimetria.</b> A face humana é normalmente assimétrica. Pode haver variação entre um lado e outro após um procedimento de transplante capilar.</p><br/>' +
          '<p id="texto">' +
          '<b>Anestesia.</b> A anestesia realizada durante o procedimento é local injetável, no entanto implica certos riscos como reação alérgica, edema e perda transitória da sensibilidade local.</p><br/>' +
          '<p id="texto">' +
          '<b>Resultados insatisfatórios.</b> O número de cabelos enxertados depende, entre outros fatores, da extensão da região receptora, da densidade da zona doadora e da característica estrutural dos fios (loiro, moreno, grosso, fino, liso, crespo...). Em alguns casos, pode ser que a\n' +
          'quantidade de folículos aptos para extração não esteja de acordo com a expectativa do paciente. A decisão de submeter-se ao tratamento é individual.\n</p><br/>' +
          '<p id="texto">' +
          '<b>Reações alérgicas.</b> Mesmo raras, podem ocorrer alergias locais ao material ou líquidos.</p><br/>' +
          '<p id="texto">' +
          'utilizados para assepsia. Podem ocorrer também reações sistêmicas das medicações utilizadas durante o procedimento ou prescritas para o pós. As reações alérgicas podem requerer tratamento adicional.</p><br/>' +
          '<p id="texto">' +
          '<b>Queda de cabelo.</b> Pode ocorrer perda de cabelo tanto ao redor da zona doadora como na área receptora do cabelo após alguns dias de procedimento. Esta perda se recupera em torno de 3 meses e o cabelo segue com seus ciclos normais de crescimento e queda. A ocorrência disso não é esperada e também não é frequente, mas pode causar ansiedade no paciente.</p><br/>' +
          '<p id="texto">' +
          '<b>Atraso na cicatrização.</b> Pacientes fumantes e diabéticos têm um risco maior de complicações quanto à cicatrização. O uso de alguns medicamentos, como a isotretinoína por exemplo, também pode atrasar esse processo.</p><br/>' +
          '<p id="texto">' +
          '<b>Efeitos a longo prazo.</b> O transplante capilar não detém o processo de afinamento e queda do cabelo nativo. Pode ser necessário um outro procedimento futuro ou outros tratamentos adicionais para manter os resultados.</p><br/>' +
          '<p id="texto">' +
          '<b>Número de folículos.</b> Não garantimos uma quantidade máxima de folículos extraídos, isso dependerá única e exclusivamente da sua zona doadora. Quando necessário, trabalhamos com extração máxima, ou seja, serão retirados o maior número de fios possíveis para cada caso. É importante saber que tudo o que é extraído não voltará a nascer, desta forma, devemos ter cautela para preservar esta zona e evitar falhas. Quando a indicação do seu procedimento é de máxima extração, deverá estar ciente de que poderá ser necessária uma segunda intervenção após total recuperação da região, com o intuito de melhorar a densidade ou alcançar resultados que não foram possíveis na primeira sessão. Caso seja necessário, será cobrado um novo valor de menor custo.</p><br/>' +
          '<p id="texto">' +
          '<b>NECESSIDADE DE UM PROCEDIMENTO ADICIONAL</b></p><br/>' +
          '<p id="texto">' +
          'Uma única sessão de transplante capilar pode não ser o suficiente para conseguir o resultado desejado. Quando a indicação do seu procedimento é de máxima extração, deverá estar ciente de que poderá ser necessária uma segunda intervenção após total recuperação da região, com o intuito de melhorar a densidade ou alcançar os resultados que não foram possíveis na primeira sessão. O paciente também deve ter consciência que o procedimento não detém o afinamento e a queda do cabelo nativo, o que pode requerer tratamentos adicionais. A prática da medicina não é uma ciência exata e não há garantia explícita ou implícita sobre os resultados que poderá obter. Caso seja necessário um outro procedimento, será cobrado um novo valor de menor custo.</p><br/>' +
          '<p id="texto">' +
          '<b>OBSERVAÇÕES FINAIS</b></p><br/>' +
          '<p id="texto">' +
          'Os documentos de consentimento informado são utilizados para informar sobre o tratamento médico proposto para uma condição determinada ou patologia, assim como para mostrar os riscos e possíveis complicações.</p><br/>' +
          '<p id="texto">' +
          'Porém, não se deve considerar que os documentos de consentimento informado incluam todos os aspectos sobre o procedimento. Seu médico pode proporcionar informação adicional, baseado em todos os fatos específicos do seu caso.</p><br/>' +
          '<p id="texto">' +
          'Os documentos de consentimento informado não pretendem definir ou servir como o modelo do cuidado médico. Isso será determinado com base em todos os fatos individualmente, e está sujeito a mudanças, sendo que o conhecimento científico e a tecnologia avançam e os modelos de prática também.</p><br/>' +
          '<p id="texto">' +
          'É importante que leia cuidadosamente as informações anteriores e que tenha respondido todas as suas dúvidas antes de assinar este consentimento.</p><br/>' +
          '<p id="texto">' +
          '<b>CONSENTIMENTO PARA O PROCEDIMENTO</b></p><br/>' +
          '<p id="texto">' +
          '1. Pelo presente documento, autorizo a equipe médica e os ajudantes da KALONI a realizar o seguinte procedimento: auto transplante capilar.</p><br/>' +
          '<p id="texto">' +
          '2. Confirmo o recebimento do informativo: Termo de consentimento informado para transplante capilar.</p><br/>' +
          '<p id="texto">' +
          '3. Dou o consentimento para o protocolo de fotografias que será realizado, com fins médicos, sendo que minha identidade não será revelada nas imagens.</p><br/>' +
          '<p id="texto">' +
          '4. Autorizo que sejam coletadas amostras de meu sangue para o propósito específico de utilização durante o procedimento, estando ciente que todo o material coletado será descartado após utilização.</p><br/>' +
          '<p id="texto">' +
          'Foi explicado de forma detalhada o procedimento que será realizado. Dou o consentimento para tal procedimento e no caso de existir alguma modificação da técnica a ser realizada, assim como alguma modificação na indicação primária durante o procedimento, autorizo a equipe médica a mudar o que foi exposto anteriormente, se assim a urgência for necessária.</p><br/>' +
          '<p id="texto">' +
          'Autorizo o procedimento e estou ciente dos pontos citados acima, estando satisfeito com a informação que me foi dada. São Paulo, Data: <b>' + fecha + '</b></p><br/>' +
          '<p id="texto"></p><br /><br />' +
          '<p style="text-align: center;"><img id=\"myImgFirmaCli\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'Assinatura do paciente\n</b></p>' +
          '<p id="texto">' +
          'CPF: ' + cfp + '</p><br/>' +
          '<p id="texto"></p><br /><br />' +
          '<p style="text-align: center;"><img id=\"myImgFirmaMed\" src=\"#\" width=\"200\" height=\"200\"></p>' +
          '<p style="text-align: center;"><b>' +
          'Assinatura do Médico Responsável</b></p>' +
          '<p id="texto"></p>' +
          '</div>' +
          '</div>' +
          '</body>';
      }

      firmasCambas.defaultValue = '<style type="text/css">' +
        '@media only screen and (min-width: 576px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 768px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 180px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 768px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:12px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: contain;' +
        'background-repeat: no-repeat;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 500px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 180px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 992px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:16px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 700px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 120px;' +
        '    }' +
        '}' +
        '@media only screen and (min-width: 1200px) {' +
        '    #texto{' +
        '    text-align: justify;' +
        'font-size:16px;' +
        '    }' +
        '    #fondo{' +
        'background: url(https://soportekaloni.com/consentimiento/membreteSN.jpg);' +
        'background-size: cover;' +
        'margin-left: 40px!important;' +
        'margin-right: 40px!important;' +
        'margin-bottom: 40px;' +
        'padding-bottom: 700px;' +
        'margin-top:10px;' +
        '    }' +
        '    #titulo{' +
        '    padding-top: 120px;' +
        '    }' +
        '}' +

        'h1 {' +
        '  border-bottom: 1px solid  #5D6975;' +
        '  color: #5D6975;' +
        '  font-size: 2.4em;' +
        '  line-height: 1.4em;' +
        '  font-weight: normal;' +
        '  text-align: center;' +
        '  margin: 0 0 20px 0;' +
        '}' +

        '#notices .notice {' +
        '  color: #5D6975;' +
        '  font-size: 1.2em;' +
        '}' +

        'footer {' +
        '  color: #5D6975;' +
        '  width: 100%;' +
        '  height: 30px;' +
        '  position: absolute;' +
        '  bottom: 0;' +
        '  border-top: 1px solid #C1CED9;' +
        '  padding: 8px 0;' +
        '  text-align: center;' +
        '}' +
        'body {font-family: Arial, Helvetica, sans-serif;}' +
        '.modal {' +
        '  display: none;' +
        '  position: fixed;' +
        '  z-index: 1; ' +
        '  padding-top: 100px; ' +
        '  left: 0;' +
        '  top: 0;' +
        '  width: 100%; ' +
        '  height: 100%;' +
        '  overflow: auto; ' +
        '  background-color: rgb(0,0,0); ' +
        '  background-color: rgba(0,0,0,0.4);' +
        '}' +
        '' +
        '.modal-content {' +
        '  background-color: #fefefe;' +
        '  margin: auto;' +
        '  padding: 10px;' +
        '  border: 1px solid #888;' +
        '  width: 528px;' +
        '  height: 560px;' +
        '}' +
        '' +
        '.close {' +
        '  color: #aaaaaa;' +
        '  float: right;' +
        '  font-size: 28px;' +
        '  font-weight: bold;' +
        '}' +
        '' +
        '.close:hover,' +
        '.close:focus {' +
        '  color: #000;' +
        '  text-decoration: none;' +
        '  cursor: pointer;' +
        '}' +
        '' +
        'select {' +
        '  ' +
        '}' +
        '' +
        '</style>' +

        '<div id="myModal" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DIGITAL CLIENTE</center></b>' +
        '<button id="btn_cerrarFirmaPaciente">Terminar</button>' +
        '</div>' +
        '</div>' +

        '<div id="myModalM" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DIGITAL MEDICO</center></b>' +
        '<button id="btn_cerrarFirmaMedico">Terminar</button>' +
        '</div>' +
        '</div>' +

        '<div id="myModalT1" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas-testigo1" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DIGITAL TESTIGO 1</center></b>' +
        '<button id="btn_cerrarFirmaTestigo1">Terminar</button>' +
        '</div>' +
        '</div>' +

        '<div id="myModalT2" class="modal">' +
        '<div class="modal-content">' +
        '<canvas id="sig-canvas-testigo2" width="500" height="500" style="border: 2px dotted #CCCCCC; border-radius: 5px; cursor: crosshair;">Get a better browser, bro.</canvas>' +
        '<br /> <b><center>FIRMA DIGITAL TESTIGO 2</center></b>' +
        '<button id="btn_cerrarFirmaTestigo2">Terminar</button>' +
        '</div>' +
        '</div>' +

        '<script type="application/javascript">' +
        'document.addEventListener("touchmove", function(e) {' +
        '  e.preventDefault();' +
        '},' +
        '{ passive: true });' +

        '(function() {' +
        '' +
        '    window.requestAnimFrame = (function (callback) {' +
        '        return window.requestAnimationFrame || ' +
        '                    window.webkitRequestAnimationFrame ||' +
        '                    window.mozRequestAnimationFrame ||' +
        '                    window.oRequestAnimationFrame ||' +
        '                    window.msRequestAnimaitonFrame ||' +
        '                    function (callback) {' +
        '                        window.setTimeout(callback, 1000/60);' +
        '                    };' +
        '    })();' +
        '' +
        '    var canvas = document.getElementById("sig-canvas");' +
        '    var ctx = canvas.getContext("2d");' +
        '    ctx.strokeStyle = "#222222";' +
        '    ctx.lineWith = 2;' +
        '' +
        '    var canvas2 = document.getElementById("sig-canvas2");' +
        '    var ctx2 = canvas2.getContext("2d");' +
        '    ctx2.strokeStyle = "#222222";' +
        '    ctx2.lineWith = 2;' +
        '' +
        '    var canvasT1 = document.getElementById("sig-canvas-testigo1");' +
        '    var ctxT1 = canvasT1.getContext("2d");' +
        '    ctxT1.strokeStyle = "#222222";' +
        '    ctxT1.lineWith = 2;' +
        '' +
        '    var canvasT2 = document.getElementById("sig-canvas-testigo2");' +
        '    var ctxT2 = canvasT2.getContext("2d");' +
        '    ctxT2.strokeStyle = "#222222";' +
        '    ctxT2.lineWith = 2;' +
        '' +
        '    var drawing = false;' +
        '    var mousePos = { x:0, y:0 };' +
        '    var lastPos = mousePos;' +
        '' +
        '    var drawing2 = false;' +
        '    var mousePos2 = { x:0, y:0 };' +
        '    var lastPos2 = mousePos2;' +
        '' +
        '    var drawingT1 = false;' +
        '    var mousePosT1 = { x:0, y:0 };' +
        '    var lastPosT1 = mousePosT1;' +
        '' +
        '    var drawingT2 = false;' +
        '    var mousePosT2 = { x:0, y:0 };' +
        '    var lastPosT2 = mousePosT2;' +
        '' +
        '    canvas.addEventListener("mousedown", function (e) {' +
        '        drawing = true;' +
        '        lastPos = getMousePos(canvas, e);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("mousedown", function (e) {' +
        '        drawing2 = true;' +
        '        lastPos2 = getMousePos(canvas2, e);' +
        '    }, false);' +
        '' +
        '    canvasT1.addEventListener("mousedown", function (e) {' +
        '        drawingT1 = true;' +
        '        lastPosT1 = getMousePos(canvasT1, e);' +
        '    }, false);' +
        '' +
        '    canvasT2.addEventListener("mousedown", function (e) {' +
        '        drawingT2 = true;' +
        '        lastPosT2 = getMousePos(canvasT2, e);' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("mouseup", function (e) {' +
        '        drawing = false;' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("mouseup", function (e) {' +
        '        drawing2 = false;' +
        '    }, false);' +
        '' +
        '    canvasT1.addEventListener("mouseup", function (e) {' +
        '        drawingT1 = false;' +
        '    }, false);' +
        '' +
        '    canvasT2.addEventListener("mouseup", function (e) {' +
        '        drawingT2 = false;' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("mousemove", function (e) {' +
        '        mousePos = getMousePos(canvas, e);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("mousemove", function (e) {' +
        '        mousePos2 = getMousePos(canvas2, e);' +
        '    }, false);' +
        '' +
        '    canvasT1.addEventListener("mousemove", function (e) {' +
        '        mousePosT1 = getMousePos(canvasT1, e);' +
        '    }, false);' +
        '' +
        '    canvasT2.addEventListener("mousemove", function (e) {' +
        '        mousePosT2 = getMousePos(canvasT2, e);' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("touchstart", function (e) {' +
        '        mousePos = getTouchPos(canvas, e);' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousedown", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchstart", function (e) {' +
        '        mousePos2 = getTouchPos(canvas2, e);' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousedown", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvasT1.addEventListener("touchstart", function (e) {' +
        '        mousePosT1 = getTouchPos(canvasT1, e);' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousedown", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvasT1.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvasT2.addEventListener("touchstart", function (e) {' +
        '        mousePosT2 = getTouchPos(canvasT2, e);' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousedown", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvasT2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas.addEventListener("touchend", function (e) {' +
        '        var mouseEvent = new MouseEvent("mouseup", {});' +
        '        canvas.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchend", function (e) {' +
        '        var mouseEvent = new MouseEvent("mouseup", {});' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvasT1.addEventListener("touchend", function (e) {' +
        '        var mouseEvent = new MouseEvent("mouseup", {});' +
        '        canvasT1.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvasT2.addEventListener("touchend", function (e) {' +
        '        var mouseEvent = new MouseEvent("mouseup", {});' +
        '        canvasT2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '' +
        '    canvas.addEventListener("touchmove", function (e) {' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousemove", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvas2.addEventListener("touchmove", function (e) {' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousemove", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvas2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvasT1.addEventListener("touchmove", function (e) {' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousemove", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvasT1.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    canvasT2.addEventListener("touchmove", function (e) {' +
        '        var touch = e.touches[0];' +
        '        var mouseEvent = new MouseEvent("mousemove", {' +
        '            clientX: touch.clientX,' +
        '            clientY: touch.clientY' +
        '        });' +
        '        canvasT2.dispatchEvent(mouseEvent);' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchstart", function (e) {' +
        '        if (e.target == canvas || e.target == canvas2  || e.target == canvasT1 || e.target == canvasT2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchend", function (e) {' +
        '        if (e.target == canvas || e.target == canvas2  || e.target == canvasT1 || e.target == canvasT2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    document.body.addEventListener("touchmove", function (e) {' +
        '        if (e.target == canvas || e.target == canvas2  || e.target == canvasT1 || e.target == canvasT2) {' +
        '            e.preventDefault();' +
        '        }' +
        '    }, false);' +
        '' +
        '    function getMousePos(canvasDom, mouseEvent) {' +
        '        var rect = canvasDom.getBoundingClientRect();' +
        '        return {' +
        '            x: mouseEvent.clientX - rect.left,' +
        '            y: mouseEvent.clientY - rect.top' +
        '        };' +
        '    }' +
        '' +
        '    function getTouchPos(canvasDom, touchEvent) {' +
        '        var rect = canvasDom.getBoundingClientRect();' +
        '        return {' +
        '            x: touchEvent.touches[0].clientX - rect.left,' +
        '            y: touchEvent.touches[0].clientY - rect.top' +
        '        };' +
        '    }' +
        '' +
        '    function renderCanvas() {' +
        '        if (drawing) {' +
        '            ctx.moveTo(lastPos.x, lastPos.y);' +
        '            ctx.lineTo(mousePos.x, mousePos.y);' +
        '            ctx.stroke();' +
        '            lastPos = mousePos;' +
        '        }' +
        '        if (drawing2) {' +
        '            ctx2.moveTo(lastPos2.x, lastPos2.y);' +
        '            ctx2.lineTo(mousePos2.x, mousePos2.y);' +
        '            ctx2.stroke();' +
        '            lastPos2 = mousePos2;' +
        '        }' +
        '        if (drawingT1) {' +
        '            ctxT1.moveTo(lastPosT1.x, lastPosT1.y);' +
        '            ctxT1.lineTo(mousePosT1.x, mousePosT1.y);' +
        '            ctxT1.stroke();' +
        '            lastPosT1 = mousePosT1;' +
        '        }' +
        '        if (drawingT2) {' +
        '            ctxT2.moveTo(lastPosT2.x, lastPosT2.y);' +
        '            ctxT2.lineTo(mousePosT2.x, mousePosT2.y);' +
        '            ctxT2.stroke();' +
        '            lastPosT2 = mousePosT2;' +
        '        }' +
        '    }' +
        '' +
        '    (function drawLoop () {' +
        '        requestAnimFrame(drawLoop);' +
        '        renderCanvas();' +
        '    })();' +
        '' +
        '})();' +
        '</script>';

      if (subsidiary == '11')//BR
      {
        var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
        fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
        formulario.addButton({ id: 'custpage_01', label: 'Enviar Firmas', functionName: 'enviarFirmas' });
        formulario.addButton({ id: 'custpage_01112', label: 'Firmar Cliente', functionName: 'abrirModal' });
        formulario.addButton({ id: 'custpage_01113', label: 'Firmar Medico', functionName: 'abrirModalEd' });
        formulario.addButton({ id: 'custpage_01114', label: 'Limpiar Firma Cliente', functionName: 'limpiarFirmaCli' });
        formulario.addButton({ id: 'custpage_01115', label: 'Limpiar Firma Medico', functionName: 'limpiarFirmaMed' });
        formulario.clientScriptFileId = '2279627';
        context.response.writePage(formulario);
      } else if (subsidiary != '10') {
        var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
        fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
        formulario.addButton({ id: 'custpage_send_signatures_consentimiento', label: 'Enviar Firmas', functionName: 'enviarFirmas' });

        if (field_firmaClienteBase64 == null) {
          formulario.addButton({ id: 'custpage_sign_customer_consentimiento', label: 'Cliente', functionName: 'abrirModal' });
        }
        if (field_firmaMedBase64 == null) {
          formulario.addButton({ id: 'custpage_sign_doctor_consentimeinto', label: 'Médico', functionName: 'abrirModalMed' });
        }
        if (field_firmaTestigo1Base64 == null) {
          formulario.addButton({ id: 'custpage_sign_witness_1_consentimiento', label: 'Testigo 1', functionName: 'abrirModalTestigo1' });
        }
        if (field_firmaTestigo2Base64 == null) {
          formulario.addButton({ id: 'custpage_sign_witness_2_consentimiento', label: 'Testigo 2', functionName: 'abrirModalTestigo2' });
        }
        if (field_firmaClienteBase64 == null) {
          formulario.addButton({ id: 'custpage_clean_customer_consentimiento', label: 'Limpiar Cliente', functionName: 'limpiarFirmaCli' });
        }
        if (field_firmaMedBase64 == null) {
          formulario.addButton({ id: 'custpage_clean_doctor_consentimiento', label: 'Limpiar Médico', functionName: 'limpiarFirmaMed' });
        }
        if (field_firmaTestigo1Base64 == null) {
          formulario.addButton({ id: 'custpage_clean_witness_1_consentimiento', label: 'Limpiar Testigo 1', functionName: 'limpiarFirmaTestigo1' });
        }
        if (field_firmaTestigo2Base64 == null) {
          formulario.addButton({ id: 'custpage_clean_witness_2_consentimiento', label: 'Limpiar Testigo 2', functionName: 'limpiarFirmaTestigo2' });
        }
        formulario.clientScriptFileId = '2078646';
        context.response.writePage(formulario);
      } else {
        var fieldrecordCaseId = formulario.addField({ id: 'custpage_case', label: 'recordCase', type: 'inlinehtml' });
        fieldrecordCaseId.defaultValue = '<input id="recordCaseId" name="recordCaseId" type="hidden" value="' + recordCase_Id + '">';
        formulario.addButton({ id: 'custpage_send_signatures_consentimiento', label: 'Enviar Firmas', functionName: 'enviarFirmas' });

        if (field_firmaClienteBase64 == null) {
          formulario.addButton({ id: 'custpage_sign_customer_consentimiento', label: 'Cliente', functionName: 'abrirModal' });
        }
        if (field_firmaMedBase64 == null) {
          formulario.addButton({ id: 'custpage_sign_doctor_consentimeinto', label: 'Médico', functionName: 'abrirModalMed' });
        }
        if (field_firmaClienteBase64 == null) {
          formulario.addButton({ id: 'custpage_clean_customer_consentimiento', label: 'Limpiar Cliente', functionName: 'limpiarFirmaCli' });
        }
        if (field_firmaMedBase64 == null) {
          formulario.addButton({ id: 'custpage_clean_doctor_consentimiento', label: 'Limpiar Médico', functionName: 'limpiarFirmaMed' });
        }
        formulario.clientScriptFileId = '2078646';
        context.response.writePage(formulario);
      }

      /**
       * Funcion que retorna el nombre de la Sucursal sin el KHG final del nombre original
       * @param {string} sucursalText 
       */
      function sucursalReal(sucursalText) {
        var largoSucrusal = sucursalText.length;
        largoSucrusal = largoSucrusal - 4;
        var sucursalFinal = sucursalText.slice(0, largoSucrusal);
        return sucursalFinal;
      }

      /**
      * Funcion que retorna la los años enteros transcurridos entre dos fechas
      * @param {string} fechaAntigua - se ingresa la fecha inicial desde la que se quiere calcular, por ejemplo: una fecha de nacimiento  
      * @param {string} fechaReciente - se ingresa la fecha final relativa al calculo, por ejemplo: la fecha actual
      */
      function calcYearInt(fechaAntigua, fechaReciente) {
        var separador = '';
        var fR = fechaReciente.length;
        var fA = fechaAntigua.length;

        //extraer dia, mes y año del caso analizado
        separador = fechaReciente.search('/');
        var diaCaso = fechaReciente.substring(0, separador);
        fechaReciente = fechaReciente.substring(separador + 1, fR);
        fR = fechaReciente.length;
        separador = fechaReciente.search('/');
        var mesCaso = fechaReciente.substring(0, separador);
        fechaReciente = fechaReciente.substring(separador + 1, fR);
        var anioCaso = fechaReciente.substring(0, 4);

        //extraer dia, mes y año de la fecha de nacimiento del paciente
        separador = fechaAntigua.search('/');
        var diaNac = fechaAntigua.substring(0, separador);
        fechaAntigua = fechaAntigua.substring(separador + 1, fA);
        fA = fechaAntigua.length;
        separador = fechaAntigua.search('/');
        var mesNac = fechaAntigua.substring(0, separador);
        fechaAntigua = fechaAntigua.substring(separador + 1, fA);
        var anioNac = fechaAntigua.substring(0, 4);

        //calculo de las variables para obtener los días transcurridos entre ambas fechas
        var calcAnio = (parseInt(anioCaso) - parseInt(anioNac)) * 365.25;
        var calcMes = (parseInt(mesCaso) - parseInt(mesNac)) * 30;
        var calcDia = (parseInt(diaCaso) - parseInt(diaNac)) * 1;
        var calcEdad = (calcAnio + calcMes + calcDia) / 365.25;

        //redondeo al entero proximo menor para obtener los años actuales entero entre las dos fechas
        //y no cambia a menos que la fecha reciente cumpla un año entero relativo a la fecha antigua
        var edad = Math.floor(calcEdad);

        return edad;
      }

    }

    return {
      onRequest: onRequest
    };

  });

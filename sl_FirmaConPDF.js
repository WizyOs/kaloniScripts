/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope Public
 */

define(['N/record', 'N/log', 'N/render', 'N/xml'],

  function (record, log, render, xmlMod) {

    function onRequest(context) {
      var recId = context.request.parameters.recordCaseId;
      var caso = record.load({ type: 'supportcase', id: recId });

      var companyId = caso.getValue({ fieldId: 'company' });
      var fechaCaso = caso.getText({ fieldId: 'startdate' });
      var cliente = record.load({ type: 'customer', id: companyId });
      var numExpediente = cliente.getValue({ fieldId: 'entityid' });
      var altname = cliente.getValue({ fieldId: 'altname' });
      var edad = cliente.getValue({ fieldId: 'custentity149' });
      var sucursal = caso.getValue({ fieldId: 'custevent2' });
      var sucursalText = caso.getText({ fieldId: 'custevent2' });
      var cpf = cliente.getText({ fieldId: 'custentity251' });
      var subsidiaryText = cliente.getText({ fieldId: 'subsidiary' });
      var imageBack = getImageBackGround(sucursal);
      var fechaNacimiento = caso.getText({ fieldId: 'custevent331' });
      var sucReal = sucursalReal(sucursalText);
      var identificacion = "";
      var edad_fechaCaso = calcYearInt(fechaNacimiento, fechaCaso);
      var medicoProcedimiento = caso.getText({ fieldId: 'custevent28'});




      var avisoPrivacidadbase64 = caso.getValue({ fieldId: 'custevent269' });
      if (avisoPrivacidadbase64 != "" && avisoPrivacidadbase64 != null) {
        if (avisoPrivacidadbase64.substring(0, 3) == "ok_")
          avisoPrivacidadbase64 = avisoPrivacidadbase64.substring(3, avisoPrivacidadbase64.length);
      }
      else {
        avisoPrivacidadbase64 = "#";
      }

      var avisoPrivacidadbase64MED = caso.getValue({ fieldId: 'custevent485' });
      if (avisoPrivacidadbase64MED != "" && avisoPrivacidadbase64MED != null) {
        if (avisoPrivacidadbase64MED.substring(0, 3) == "ok_")
          avisoPrivacidadbase64MED = avisoPrivacidadbase64MED.substring(3, avisoPrivacidadbase64MED.length);
      }
      else {
        avisoPrivacidadbase64MED = "#";
      }

      // Recupera firma del Testigo 1
      var consentimientoInjerto_base64Testigo1 = caso.getValue({ fieldId: 'custevent513' });
      if (consentimientoInjerto_base64Testigo1 != "" && consentimientoInjerto_base64Testigo1 != null) {
        if (consentimientoInjerto_base64Testigo1.substring(0, 3) == "ok_")
        consentimientoInjerto_base64Testigo1 = consentimientoInjerto_base64Testigo1.substring(3, consentimientoInjerto_base64Testigo1.length);
      }
      else {
        consentimientoInjerto_base64Testigo1 = "#";
      }

      // Recupera firma del Testigo 2
      var consentimientoInjerto_base64Testigo2 = caso.getValue({ fieldId: 'custevent514' });
      if (consentimientoInjerto_base64Testigo2 != "" && consentimientoInjerto_base64Testigo2 != null) {
        if (consentimientoInjerto_base64Testigo2.substring(0, 3) == "ok_")
        consentimientoInjerto_base64Testigo2 = consentimientoInjerto_base64Testigo2.substring(3, consentimientoInjerto_base64Testigo2.length);
      }
      else {
        consentimientoInjerto_base64Testigo2 = "#";
      }
      
      var fecha = new Date();
      fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();


      /** Formato de CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR
       * Aplica sólo a sucursales en México
       * Fecha de implementacion 04/09/2019
       * var - consentimientoMexico contiene la cadena que se procesa como xml
       * var - edad_fechaCaso contiene la edad del paciente fija y relativa a la fecha en que se procesa el caso
       * var - sucReal contiene la sucursal en la que se realiza el caso sin el KHG final del nombre de la sucursal
       * var - fechaCaso contiene la fecha en la que se procesa el caso
       * var - identificacion contiene la cadena correspondiente a la clave de la identificacion presentada por el cliente
       * var - altname contiene la cadena correspondiente al nombre del paciente
       * 
       */
      var consentimientoMexico = '<p style="width:100%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO PROCEDIMIENTO DE MICRO INJERTO CAPILAR</b></p>' +
        '<p style="font-size: 12px;color:#000000;font-family:Aria, sans-serif;">EDAD: <b>' + edad_fechaCaso + ' años</b>, LUGAR Y FECHA: <b>' + sucReal + ' a ' + fechaCaso + '</b></p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + altname + '</b>, por mi propio derecho y en pleno uso de mis facultades, me identifico con ' + identificacion + ' y declaro libremente que se me informó en forma amplia, clara, precisa y sencilla sobre los riesgos y beneficios de someterme al procedimiento de injerto de cabello en Kaloni Holding Group, Sociedad Civil constituida de acuerdo a las leyes mexicanas con domicilio fiscal en Ave. Vasco de Quiroga 3900 Int. 401, Colonia Santa Fe, Cuajimalpa de Morelos, Ciudad de México Código Postal 05348.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>RIESGOS.</b>  Como en cualquier procedimiento médico, existen riesgos asociados. La mayoría de los pacientes no presentan complicaciones, sin embargo, usted debe tener conocimiento de las principales situaciones que pudieran presentarse:</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Sangrado.</b> Es posible que usted presente sangrado durante o después del procedimiento. Medicamentos como aspirina o antiinflamatorios, pueden aumentar el riesgo de hemorragias, por lo tanto, no deben usarse 03 (tres) días antes del procedimiento. La hipertensión y otras enfermedades, como coagulopatías, también pueden causar un mayor sangrado. Es necesario que el paciente siga todos los cuidados recomendados para evitar el exceso de sangre en el área manipulada, lo que puede retrasar la cicatrización.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Infección.</b> A pesar de ser un procedimiento ambulatorio, realizado con todos los cuidados adecuados de asepsia, existe el riesgo de que aparezca un cuadro infeccioso posteriormente en la piel cabelluda tanto de zona donante como en zona a implantar. En caso de que esto ocurra, póngase en contacto con nosotros y nuestros médicos tomarán todas las medidas apropiadas, como la prescripción de antibióticos específicos para su caso.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Asimetría.</b> La cara humana es normalmente asimétrica por lo que puede haber variaciones entre un lado y otro tras un procedimiento de trasplante capilar.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Reacciones alérgicas.</b>  Durante el procedimiento es necesaria la administración de ciertos medicamentos para poder ejecutar el procedimiento como es en la anestesia que se inyecta localmente en el área a tratar, también se requieren de analgésicos y otros medicamentos que son necesarios para mantener estable al paciente, sin embargo el uso de estos implica riesgos de reacción alérgica ya que el paciente puede o no conocerse alérgico a determinados fármacos. Las reacciones alérgicas pueden requerir un tratamiento adicional.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Secuelas, signos y síntomas indeseables.</b> Al finalizar el procedimiento podría generarse edema o neuropatía periférica, es decir daño en nervios o pérdida transitoria de la sensibilidad local tanto de la zona donadora como de la zona a implantar.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultados insatisfactorios.</b> El número de cabellos injertados depende, entre otros factores, de la extensión de la región receptora, de la densidad de la zona donante y de la característica estructural de los folículos y de la dermis. En algunos casos, puede ser que la cantidad de folículos aptos para la extracción no está de acuerdo con la expectativa del paciente. La decisión de someterse al tratamiento es individual y voluntaria.</p>' +
        
        '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>' +
        '<p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + altname + '</b></p>' +

        '<div style="page-break-after: always;"></div>' +
        '<br/><br/><br/><br/><br/><br/>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Retraso en la cicatrización.</b> Los pacientes fumadores y diabéticos tienen un mayor riesgo de complicaciones en cuanto a la cicatrización. El uso de algunos medicamentos, también puede retrasar este proceso.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, sé que la práctica de la medicina y del procedimiento a que se refiere este Consentimiento Informado, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>BENEFICIOS.</b> Recuperación y restauración de la densidad capilar en la zona a implantar, solución a problemas de calvicie local o generalizada (Dependiendo de la cantidad de folículos obtenida, características de la piel del paciente y cuidados del paciente posteriores al procedimiento).</p>' +

        '<p style="font-family:Aria, sans-serif; font-size:medium;"><b>CONSENTIMIENTO PARA EL PROCEDIMIENTO</b><br/>' +
        '<ul style="font-family:Aria, sans-serif; font-size:11px; text-indent: 18px; list-style-type: square;"><li>Autorizo ​​al equipo médico y a los auxiliares médicos y de enfermería de Kaloni Holding Group, S.C., a realizar el procedimiento de injerto de cabello.</li>' +
        '<li>Me han informado que mis datos personales serán protegidos e incluidos en un expediente clínico, en conformidad con la Legislación y Normativa Mexicana aplicable.</li>' +
        '<li>Autorizo la toma de fotografías de mi procedimiento con la finalidad de integrar mi expediente clínico.</li>' +
        '<li>Manifiesto que se me informó detalladamente las precauciones relativas a mi procedimiento y me obligo a cumplir con todas las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en la importancia de éstas para lograr el objetivo esperado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados que yo debo tener en la zona tratada.</li>' +
        '<li>Declaro que el médico me ha informado y ofrecido alternativas al procedimiento al que he decidido someterme.</li>' +
        '<li>Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico tratante y a sus colaboradores, a que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</li></ul></p>' +

        '<p style="font-family:Aria, sans-serif; font-size:12px;">Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>' +

        "<table style=\"width:100%;font-size:10px; font-family:'Aria', sans-serif\">" +
        '<tr><td align="center" width="50%"><img src="' + avisoPrivacidadbase64 + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL PACIENTE<br/>' + altname + '</b></p></td><td align="center" width="50%"><img src="' + avisoPrivacidadbase64MED + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>______________________________________________<br/>FIRMA DEL MEDICO RESPONSABLE O TRATANTE<br/>' + medicoProcedimiento + '</b></p></td></tr>' +
        '<tr><td align="center" width="50%"><img src="' + consentimientoInjerto_base64Testigo1 + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 1</b></p></td><td align="center" width="50%"><img src="' + consentimientoInjerto_base64Testigo2 + '" width="75" height="75" /><p style="align:center;font-family:Aria, sans-serif; font-size:11px;"><b>____________________________<br/>FIRMA DEL TESTIGO 2</b></p></td></tr>' +
        '</table>';


      var avisoEspana = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO</b></p>';
      avisoEspana += '<p style="font-size: medium;">FECHA <b> ' + fechaCaso + ' </b></p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + altname + '</b>, por mi propio derecho y en pleno uso de mis facultades, de <b>' + edad + '</b> años de edad, declaro libremente que se me informó de manera amplia, clara, precisa y sencilla sobre todos los riesgos y beneficios de someterme al procedimiento de injerto de cabello; que ya he formulado todas las preguntas que he considerado necesarias y mis dudas han sido atendidas a mi entera satisfacción.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido informado, que en atención a la idiosincrasia idiopática de cada paciente, puede existir cierta predisposición a presentar respuestas alérgicas o reacciones adversas por idiosincrasia propia a medicamentos utilizados durante mi procedimiento, los cuales pueden desconocerse previamente a la administración de los mismos.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere ese consentimiento, no es una ciencia exacta, y por tal motivo comprendo que no es posible asegurar o garantizar un resultado exacto, entiendo que los resultados pueden variar entre cada persona debido a las diferencias en las condiciones particulares de salud, genética, cuidados posteriores al tratamiento y otros factores.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Asimismo, declaro que se me informó detalladamente todos los cuidados post-procedimiento, los cuales por medio del presente, me obligo a cumplir en su totalidad, también me obligo a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para lograr el objetivo deseado. Sé y estoy de acuerdo en que gran parte del éxito recae en los cuidados posteriores.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y a sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p>';
      avisoEspana += '<p style="font-family:Aria, sans-serif; font-size:12px;">Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) con la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento frente a dos testigos, por mi libre voluntad sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento.</p>';
      avisoEspana += ' <p></p><p></p><p></p>';
      avisoEspana += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
      avisoEspana += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p>';


      var avisoColombia = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>CONSENTIMIENTO INFORMADO</b></p>';
      avisoColombia += '<p style="font-size: medium;">FECHA <b> ' + fechaCaso + ' </b></p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Yo <b>' + altname + '</b>, por mi propio derecho y en pleno uso de mis facultades, de <b>' + edad + '</b> años de edad, declaro libremente que se me informó en forma amplia, clara, precisa y sencilla de los riesgos y beneficios de someterme al procedimiento de injerto de cabello; que he formulado las preguntas que he considerado necesarias y mis dudas han sido atendidas a mi entera satisfacción.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Por otro lado, comprendo que la práctica de la medicina y del procedimiento a que se refiere esta carta, no es una ciencia exacta, y por tal motivo reconozco que no se me ha asegurado ni garantizado que el resultado del procedimiento de injerto de cabello necesariamente alcance los beneficios esperados, incluyendo factores fortuitos propios de la idiosincrasia propia de cada paciente.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Asimismo, declaro que se me informó y me obligo a cumplir con las indicaciones que se me den respecto a los cuidados que debo tener post-procedimiento, así como a acudir a las citas que me sean asignadas ya que se me ha hecho hincapié en las atenciones necesarias para que los implantes logren el objetivo esperado.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Se y estoy de acuerdo en que gran parte del éxito recae en los cuidados de los mismos.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">He sido también informado(a) de que mis datos personales serán protegidos e incluidos en un expediente clínico, que deberá estar sometido a las garantías de la Norma aplicable. Asimismo, autorizo la toma de fotografías de la zona con fines clínicos, garantizándose la confidencialidad de mi expediente.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Se me ha explicado que durante el procedimiento pueden presentarse imprevistos que varíen el procedimiento original, por consiguiente ante cualquier complicación a efecto adverso durante dicho procedimiento, especialmente ante una urgencia médica autorizo y solicito al médico encargado y sus colaboradores, que realicen los procedimientos médicos que consideren necesarios, en ejercicio de su juicio y experiencia profesional, para la protección de mi salud.</p>';
      avisoColombia += '<p style="font-family:Aria, sans-serif; font-size:12px;">Declaro que todas las explicaciones han sido claras, no tengo dudas al respecto y estoy satisfecho(a) de la información recibida. Comprendido el alcance de los riesgos y beneficios, firmo este consentimiento por mi libre voluntad en presencia de mis testigos y/o familiares sin haber estado sujeto(a) a ningún tipo de presión o coacción para hacerlo, por lo anterior es mi decisión autorizar al médico a someterme al procedimiento de implante de cabello.</p>';
      avisoColombia += ' <p></p><p></p><p></p>';
      avisoColombia += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
      avisoColombia += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>FIRMA DEL PACIENTE</b></p>';

      var avisoBrasil = '<p style="width:35%;color:#000000;font-family:Aria, sans-serif;align:center"><b>TERMO DE CONSENTIMENTO INFORMADO PARA O PROCEDIMENTO DE\n' +
        'TRANSPLANTE CAPILAR\</b></p>';
      avisoBrasil += '<p style="font-size: medium;"><b>INTRODUÇÃO</b></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Este é um documento que foi elaborado para ajudar o seu médico a lhe informar sobre a cirurgia de transplante capilar, seus riscos e alguns cuidados necessários durante todo o tratamento.</p>';
      avisoBrasil += '<p style="font-size: medium;"><b>RISCOS</b></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Como em qualquer procedimento médico, existem riscos associados. Por mais que a maioria dos pacientes não apresentem complicações, você deverá ter ciência das principais delas:</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Sangramento.</b> É possível que você apresente sangramento durante ou após a cirurgia. Medicamentos como aspirina ou anti-inflamatórios, que podem aumentar o risco de hemorragias, não devem ser usados 03 (três) dias antes do procedimento. A hipertensão arterial e outras doenças, como coagulopatias, também podem causar um maior sangramento.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">É preciso seguir todos os cuidados recomendados para evitar excesso de sangue na área manipulada, o que pode atrasar a cicatrização.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Infecção.</b> Apesar de ser um procedimento ambulatorial, realizado com todos os cuidados adequados de assepsia, existe o risco do surgimento de um quadro infeccioso posteriormente. Caso isso aconteça, entre em contato conosco e serão tomadas todas as medidas cabíveis, como a prescrição de antibióticos específicos para o seu caso.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Foliculite.</b>  Durante o período de cicatrização ou de crescimento dos fios implantados, podem surgir pontos de foliculite. É importante seguir as recomendações pós-procedimento para na tentativa de evitar o quadro. Pacientes com tendência à formação de quelóides, podem apresentar uma variante queloidiana de foliculite.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Assimetria.</b> A face humana é normalmente assimétrica. Pode haver variação entre um lado e outro no resultado de um procedimento de micro enxerto capilar.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Anestesia.</b> A anestesia realizada durante o procedimento é local injetável, no entanto implica certos riscos como reação alérgica, edema e perda transitória da sensibilidade local.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Resultados insatisfatórios.</b> O número de cabelos enxertados depende, entre outros fatores, da extensão da região receptora, da densidade da zona doadora e da característica estrutural dos fios (loiro, moreno, grosso, fino, liso, crespo...). Em alguns casos, pode ser que a\n' +
        'quantidade de folículos aptos para extração não esteja de acordo com a expectativa do paciente. A decisão de submeter-se ao tratamento é individual.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Reações alérgicas.</b> Mesmo raras, podem ocorrer alergias locais ao material ou líquidos.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">utilizados para assepsia. Podem ocorrer também reações sistêmicas das medicações utilizadas durante o procedimento ou prescritas para o pós. As reações alérgicas podem requerer tratamento adicional.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Queda de cabelo.</b> Pode ocorrer perda de cabelo tanto ao redor da zona doadora como na área receptora do cabelo após alguns dias de procedimento. Esta perda se recupera em torno de 3 meses e o cabelo segue com seus ciclos normais de crescimento e queda. A ocorrência disso não é esperada e também não é frequente, mas pode causar ansiedade no paciente.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Atraso na cicatrização.</b> Pacientes fumantes e diabéticos têm um risco maior de complicações quanto à cicatrização. O uso de alguns medicamentos, como a isotretinoína por exemplo, também pode atrasar esse processo.</p>';
      avisoBrasil += ' <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Efeitos a longo prazo.</b> O transplante capilar não detém o processo de afinamento e queda do cabelo nativo. Pode ser necessário um outro procedimento futuro ou outros tratamentos adicionais para manter os resultados.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;"><b>Número de folículos.</b> Não garantimos uma quantidade máxima de folículos extraídos, isso dependerá única e exclusivamente da sua zona doadora. Quando necessário, trabalhamos com extração máxima, ou seja, serão retirados o maior número de fios possíveis para cada caso. É importante saber que tudo o que é extraído não voltará a nascer, desta forma, devemos ter cautela para preservar esta zona e evitar falhas. Quando a indicação do seu procedimento é de máxima extração, deverá estar ciente de que poderá ser necessária uma segunda intervenção após total recuperação da região, com o intuito de melhorar a densidade ou alcançar resultados que não foram possíveis na primeira sessão. Caso seja necessário, será cobrado um novo valor de menor custo.</p>';
      avisoBrasil += '<p style="font-size: medium;"><b>NECESSIDADE DE UM PROCEDIMENTO ADICIONAL</b></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Uma única sessão de transplante capilar pode não ser o suficiente para conseguir o resultado desejado. Quando a indicação do seu procedimento é de máxima extração, deverá estar ciente de que poderá ser necessária uma segunda intervenção após total recuperação da região, com o intuito de melhorar a densidade ou alcançar os resultados que não foram possíveis na primeira sessão. O paciente também deve ter consciência que o procedimento não detém o afinamento e a queda do cabelo nativo, o que pode requerer tratamentos adicionais. A prática da medicina não é uma ciência exata e não há garantia explícita ou implícita sobre os resultados que poderá obter. Caso seja necessário um outro procedimento, será cobrado um novo valor de menor custo.</p>';
      avisoBrasil += '<p style="font-size: medium;"><b>OBSERVAÇÕES FINAIS\n</b></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Os documentos de consentimento informado são utilizados para informar sobre o tratamento médico proposto para uma condição determinada ou patologia, assim como para mostrar os riscos e possíveis complicações.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Porém, não se deve considerar que os documentos de consentimento informado incluam todos os aspectos sobre o procedimento. Seu médico pode proporcionar informação adicional, baseado em todos os fatos específicos do seu caso.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Os documentos de consentimento informado não pretendem definir ou servir como o modelo do cuidado médico. Isso será determinado com base em todos os fatos individualmente, e está sujeito a mudanças, sendo que o conhecimento científico e a tecnologia avançam e os modelos de prática também.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">É importante que leia cuidadosamente as informações anteriores e que tenha respondido todas as suas dúvidas antes de assinar este consentimento.</p>';
      avisoBrasil += '<p style="font-size: medium;"><b>CONSENTIMENTO PARA O PROCEDIMENTO</b></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">1. Pelo presente documento, autorizo a equipe médica e os ajudantes da KALONI a realizar o seguinte procedimento: auto transplante capilar.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">2. Confirmo o recebimento do informativo: Termo de consentimento informado para transplante capilar.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">3. Dou o consentimento para o protocolo de fotografias que será realizado, com fins médicos, sendo que minha identidade não será revelada nas imagens.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">4. Autorizo que sejam coletadas amostras de meu sangue para o propósito específico de utilização durante o procedimento, estando ciente que todo o material coletado será descartado após utilização.</p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Foi explicado de forma detalhada o procedimento que será realizado. Dou o consentimento para tal procedimento e no caso de existir alguma modificação da técnica a ser realizada, assim como alguma modificação na indicação primária durante o procedimento, autorizo a equipe médica a mudar o que foi exposto anteriormente, se assim a urgência for necessária.</p>';
      avisoBrasil += ' <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">Autorizo o procedimento e estou ciente dos pontos citados acima, estando satisfeito com a\n' +
        'informação que me foi dada. São Paulo, Data: <b>' + fechaCaso + '</b></p>';
      avisoBrasil += ' <p></p><p></p><p></p>';
      avisoBrasil += '<p style="align:center"><img src="' + avisoPrivacidadbase64 + '" width="100" height="100" /></p>';
      avisoBrasil += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>Assinatura do paciente\n</b></p>';
      avisoBrasil += ' <p></p><p></p><p></p>';
      avisoBrasil += '<p style="font-family:Aria, sans-serif; font-size:12px;">CPF: ' + cpf + ' </p>';
      avisoBrasil += ' <p></p><p></p><p></p>';
      avisoBrasil += '<p style="align:center"><img src="' + avisoPrivacidadbase64MED + '" width="100" height="100" /></p>';
      avisoBrasil += '<p style="align:center;font-family:Aria, sans-serif; font-size:13px;"><b>____________________________<br/>Assinatura do Médico Responsável\n</b></p>';

      var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">\n';
      xml += '<pdf>\n';
      xml += '<body background-image="' + xmlMod.escape({ xmlText: imageBack }) + '" >';

      xml += '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>';
      if (subsidiaryText == "Mexico") {
        xml += consentimientoMexico;
      } else if (subsidiaryText == "Colombia") {
        xml += avisoColombia;
      } else if (subsidiaryText == "España") {
        xml += avisoEspana;
      } else if (subsidiaryText == "Brasil") {
        xml += avisoBrasil;
      } else {
        xml += consentimientoMexico;
      }



      xml += '</body></pdf>';
      context.response.renderPdf({ xmlString: xml });
    }

    function getImageBackGround(sucursal) {
      var imageBack = "";
      if (sucursal != "22" && sucursal != "35" && sucursal != "36" && sucursal != "23" && sucursal != "24" && sucursal != "25" && sucursal != "37" && sucursal != "21" && sucursal != "26" && sucursal != "27" && sucursal != "28") {
        imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
      }
      else {
        /*if(sucursal == "22") // Altavista KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072817&c=3559763&h=b46ce55f681b894177a5";
        if(sucursal == "35") // Can-Cun KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
        if(sucursal == "36") // Chihuahua KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072818&c=3559763&h=892dabc4a931b43f70fa";
        if(sucursal == "23") // Guadalajara KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072820&c=3559763&h=6f26863530afd3a9d773";
        if(sucursal == "24") // Monterrey KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072821&c=3559763&h=68fa339cc99e989510e2";
        if(sucursal == "25") // Polanco KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072822&c=3559763&h=572e1ef38c11414c71e7";
        if(sucursal == "37") // Puebla KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072824&c=3559763&h=1c73b157d105dfa7e3b2";
        if(sucursal == "21") // Santa FE KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2068295&c=3559763&h=4678a803a2de37a6d96d";
        if(sucursal == "26") // Satelite KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072825&c=3559763&h=8f0d05a97d9ac70c4ca4";
        if(sucursal == "27") // Tijuana KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072829&c=3559763&h=5ae38dd5ff5f55302ae7";
        if(sucursal == "28") // Veracruz KHG
          imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2072831&c=3559763&h=c36c12d839db5bd27d20";
          */
        imageBack = "https://system.na2.netsuite.com/core/media/media.nl?id=2067732&c=3559763&h=3d8d3a19ab5ca8a24c17";
      }
      return imageBack;
    }

    // Retorna el nombre de la Sucursal sin el KHG final
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
    function calcYearInt(fechaAntigua, fechaReciente){
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
      var calcAnio = (parseInt(anioCaso) - parseInt(anioNac))*365.25;
      var calcMes = (parseInt(mesCaso) - parseInt(mesNac))*30;
      var calcDia = (parseInt(diaCaso) - parseInt(diaNac))*1;
      var calcEdad = (calcAnio+calcMes+calcDia)/365.25;
  
      //redondeo al entero proximo menor para obtener los años actuales entero entre las dos fechas
      //y no cambia a menos que la fecha reciente cumpla un año entero relativo a la fecha antigua
      var edad = Math.floor(calcEdad);
  
      return edad;
    }

    return {
      onRequest: onRequest
    };

  });

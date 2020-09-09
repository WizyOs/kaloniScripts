//NOTE: Id de Formularios
//Diagnostico capilar -> 135
//Historia clínica -> 134
//Procedimiento Injerto Capilar -> 14
//Diagnostico BodySkin -> 138

//NOTE: Id de Roles
//Enfermeria KHG -> 1102
//Injerto KHG -> 1187
//Consultor Ventas KHG -> 1098

//NOTE: id CARGO
// DOCTOR -> 2

//NOTE: id STATUS
//CLOSED -> 5
//IN PROGRESS -> 2

//TODO: Function -> beforeLoad() = Funcion que se ejecuta antes de cargar la pagina
/**
 * @param {object} type NETSUITE VIEW TYPE
 * @param {object} form NETSUITE ONLOAD FORM
 */
function beforeLoad(type, form) {

    /*ACTION: Antes de cargar la pagina bloquea campos que son controlados por el backend y no por el usuario
    **en el evento create bloquea solo los campos que se controlan en todo el workflow
    **en el evento edit bloquea los campos que ya se capturaron por el usuario para que no pueda editarlos
    **en el evento edit bloquea el check de validacion si no cumple: {"cargo":"medico", "validarCheckValue":"false"}
     */
    //VARIABLES: GLOBALES -> beforeLoad() Se usan en todo el cuerpo de la función
    var role = nlapiGetRole(); // Rol del usuario
    var formulario = nlapiGetFieldValue('customform'); // Id del formulario
    var actualIdUser = nlapiGetContext().getUser(); // Id Usuarios Actual
    var validarCheckValue = nlapiGetFieldValue('custevent856');
    var validarCheck = nlapiGetField('custevent856');
    var elementoBlockear = null;
    var run_Search = [];
    run_Search = searchCargo(actualIdUser); // Funcion devuelve el arreglo [0: nombre, 1: cargo]
    var cargo = run_Search[1] || null;
    var key = 0;

    if (type == 'create') {
        if (formulario == 135 || formulario == 134 || formulario == 138 || formulario == 14) {
            if (role == 1102 || role == 1187 || role == 1098) {
                var objectsBlockingCreate = ['company', 'customform', 'title'];
                for (key in objectsBlockingCreate) {
                    elementoBlockear = nlapiGetField(objectsBlockingCreate[key]);
                    elementoBlockear.setDisplayType('inline');
                }
                if(role != 1187){
                    elementoBlockear = nlapiGetField('status');
                    elementoBlockear.setDisplayType('inline');
                }
                validarCheck.setDisplayType('hidden');
            }
        }
    }

    if (type == 'edit') {
        if (formulario == 135 || formulario == 134 || formulario == 138 || formulario == 14 || formulario == 33 || formulario == 147 || formulario == 151) {
            if (role == 1102 || role == 1187 || role == 1098 || role == 3) {

                var objectsBlockingEdit = ['custevent331', 'custevent634', 'custevent309', 'custevent310', 'custevent294', 'custevent277', 'custevent278', 'custevent311',  'custevent313', 'custevent314', 'custevent315', 'custevent316', 'custevent317', 'custevent318', 'custevent303', 'custevent302', 'custevent301', 'custevent300', 'custevent299', 'custevent298', 'custevent297', 'custevent296', 'custevent620', 'custevent621', 'custevent622', 'custevent623', 'custevent624', 'custevent304', 'custevent1079', 'custevent305', 'custevent306', 'custevent307', 'custevent308', 'custevent333', 'custevent334', 'custevent335', 'custevent336', 'company', 'custevent206', 'custevent207', 'custevent208', 'custevent284', 'custevent322', 'custevent2','customform','title', 'custevent324', 'custevent279', 'custevent281', 'custevent280', 'custevent177', 'custevent178', 'custevent179'/* , 'custevent180', 'custevent181', 'custevent182', 'custevent183', 'custevent184', 'custevent185', 'custevent186', 'custevent187', 'custevent188', 'custevent189', 'custevent190' */ ];

                //
                for (key in objectsBlockingEdit) {
                    var elementoBlockearData = nlapiGetFieldValue(objectsBlockingEdit[key]) || null;
                    if (elementoBlockearData != null) {
                        elementoBlockear = nlapiGetField(objectsBlockingEdit[key]);
                        elementoBlockear.setDisplayType('inline');
                    }
                }
                if(role != 1187){
                    elementoBlockear = nlapiGetField('status');
                    elementoBlockear.setDisplayType('inline');
                }
                if (cargo == 2 && validarCheckValue == 'F') {
                    validarCheck.setDisplayType('normal');
                } else {
                    validarCheck.setDisplayType('hidden');
                }
            }
        }
    }
}

//TODO: Function -> beforeSubmit() = Funcion que se ejecuta antes de enviar el formulario
/**
 * @param {object} type NETSUITE VIEW TYPE
 * @param {object} form NETSUITE ONLOAD FORM
 */
function beforeSubmit(type, form) {

    /*ACTION: Antes de enviar el formulario se validan y se setean los campos que son controlados por el backend y no por el usuario
    */
    //VARIABLES: GLOBALES -> beforeSubmit() Se usan en todo el cuerpo de la función
    var role = nlapiGetRole(); // Rol del usuario
    var recId = nlapiGetRecordId();
    var formulario = nlapiGetFieldValue('customform'); // Id del formulario
    var actualIdUser = nlapiGetContext().getUser(); // Id Usuarios Actual
    var actualIdName = nlapiGetContext().getName(); // Id Usuarios Actual
    var nombreDiagnostico = nlapiGetFieldValue('title') || null; // Nombre del diagnostico
    var validarBlockearData = nlapiGetFieldValue('custevent856'); // Valor del checkbox para médico VALIDAR
    var validarCheck = nlapiGetField('custevent856');
    var run_Search = [];
    var existePrefijo = searchPrefix(nombreDiagnostico, 'pre');
    run_Search = searchCargo(actualIdUser); // Funcion devuelve el arreglo [0: nombre, 1: cargo]
    var cargo = run_Search[1] || null;
    var typeVal = '';
    var tipoValoracion = '';

    if (type == 'edit') {
        if (formulario == 135 || formulario == 138) {
            if (role == 1102 || role == 1187 || role == 1098 || role == 1173) {
                if (cargo == 2) {
                    if (existePrefijo == true) {
                        if (validarBlockearData == 'T') {
                            validarCheck.setDisplayType('inline');
                            nlapiSetFieldValue('custevent322', actualIdUser);
                            nlapiSetFieldValue('status', 5);                         
                        }
                    }
                }
            }
            nlapiLogExecution('DEBUG', 'Result Edit BeforeSubmit', 'Modify by: ' + actualIdName + ' Professional charge: ' + cargo + ' RecordId ' + recId);
        }
    }

    if (type == 'create') {
        update_nombreDiagnos = modifyPrefix(nombreDiagnostico, 'without', 'Pre ');
        if (formulario == 135 || formulario == 138) {
            if (role == 1102 || role == 1187 || role == 1098 || role == 1173) {
                if (cargo != 2 || cargo == null) {
                    update_nombreDiagnos = modifyPrefix(nombreDiagnostico, 'with', 'Pre ');
                    nlapiSetFieldValue('custevent322', actualIdUser);
                    nlapiSetFieldValue('status', 2);
                } else {
                    nlapiSetFieldValue('status', 5);
                    nlapiSetFieldValue('custevent856', 'T');
                }
                typeVal = nlapiGetFieldValue('custevent284');
                if (typeVal == 1) { tipoValoracion = 'de Caída de Cabello'; }
                if (typeVal == 2) { tipoValoracion = 'de Barba'; }
                if (typeVal == 3) { tipoValoracion = 'de Cejas'; }
                if (typeVal == 4) { tipoValoracion = 'de Bigote'; }
                //var existeSubfijo = searchSubfix(nombreDiagnostico, typeVal);
                nlapiSetFieldValue('title', update_nombreDiagnos + ' ' + tipoValoracion);
            }
            nlapiLogExecution('DEBUG', 'Result Create BeforeSubmit', 'Modify by: ' + actualIdName + ' Professional charge: ' + cargo + ' RecordId ' + recId + ' Prefijo: ' + update_nombreDiagnos + ' tipo Valoración: ' + tipoValoracion);
        }
    }
}

//TODO: Function -> searchCargo() = devuelve el cargo de un empleado usando su id en una busqueda definida en netsuite
/**
 * 
 * @param {id} id Parametro que corresponde al id de empleado
 * Devuelve un arreglo con los valores
 * response[0]: nombre
 * response[1]: cargo
 */
function searchCargo(id) {
    var searchType = 'employee';
    var filters = nlobjSearchFilter('internalid', null, 'is', id);
    var response = [];
    var columns = [];
    columns[0] = new nlobjSearchColumn('custentity_tipo_cargo');
    columns[1] = new nlobjSearchColumn('entityid');
    var puesto = null;
    var nombre = null;

    if (id != null) {
        try {
            search = nlapiCreateSearch('employee', filters, columns);
            var resultSet = search.runSearch();
            var rowSet = resultSet.getResults(0, 1);
            puesto = rowSet[0].getValue('custentity_tipo_cargo') || null;
            nombre = rowSet[0].getValue('entityid') || null;
            response.push(nombre);
            response.push(puesto);
            return response;
        } catch (error) {
            nlapiLogExecution('ERROR', 'Error de busqueda', error);
        }
    } else {
        response.push(null);
        response.push(null);
        return response;
    }
}

//TODO: Function -> searchPrefix() = devuelve verdadero si se encuentra le prefijo dado en una cadena dada o falso si no lo encuentra
/**
 * 
 * @param {string} chain string where search prefix
 * @param {string} prefix string to searching on chain
 * @param {boolean} return if prefix given exist return true and false is not exist
 */
function searchPrefix(chain, prefix) {
    var lenPrefix = prefix.length;
    var chainIsString = typeof chain;

    if (chain != null) {
        if (chainIsString == 'string') {
            array_chain = chain.split('');
            var prefix_chain = array_chain.slice(0, lenPrefix);
            var prefix_compare = prefix_chain.join('');
            if (prefix_compare.toLowerCase() == prefix.toLowerCase()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//TODO: Function -> modifyPrefix() = devuelve verdadero si se encuentra el prefijo dado en una cadena dada
/**
 * 
 * @param {string} chain string where prefix will be change
 * @param {string} mPrefix string that indicate if prefix will be remove or add ("with" to add and "without" to remove)
 * @param {string} prefix string that setting prefix
 * @param {string} return string that will be returned with or without prefix
 */
function modifyPrefix(chain, mPrefix, prefix) {
    var chainIsString = typeof chain;
    var mPrefixIsString = typeof mPrefix;
    var response = '';
    if (prefix == null) {
        prefix = '';
    } else {
        prefix = prefix;
    }
    var prefixIsString = typeof prefix;
    var existPrefix = searchPrefix(chain, prefix);

    if (chainIsString == 'string' && prefixIsString == 'string' && mPrefixIsString == 'string') {
        if (mPrefix == 'without' && existPrefix == true) {
            response = chain.substring(4);
            return response;
        } else if (mPrefix == 'with' && existPrefix == false) {
            response = prefix + chain;
            return response;
        } else {
            return chain;
        }
    } else {
        return chain;
    }
}

//TODO: Function -> searchSubfix() = devuelve verdadero si se encuentra le subfijo dado en una cadena dada o falso si no lo encuentra
/**
 * 
 * @param {string} chain string where search prefix
 * @param {string} subfix string to searching on chain
 * @param {boolean} return if prefix given exist return true and false is not exist
 */
function searchSubfix(chain, subfix) {
    var lenSubfix = subfix.length;
    var chainIsString = typeof chain;

    if (chain != null) {
        if (chainIsString == 'string') {
            array_chain = chain.split('');
            var subfix_chain = array_chain.slice(lenSubfix * -1);
            var subfix_compare = subfix_chain.join('');
            if (subfix_compare.toLowerCase() == subfix.toLowerCase()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}
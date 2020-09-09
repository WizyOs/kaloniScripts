        /**
     * @NApiVersion 2.0
     * @NScriptType ClientScript
     * @NModuleScope Public
     */

    define(['N/search', 'N/currentRecord', 'N/runtime', 'N/log'], function (search, currentRecord, runtime, log) {
        var record = currentRecord.get();
        var userObj = runtime.getCurrentUser();
        var idUser = userObj.id;
        var role = userObj.role;
        var bandera = true;

        function pageInit(context) {
            var field_branchoffice_hidden = '';
            var obj_branchOffice = '';
            var field_branchOffice;
            
            if (context.mode == 'create') {
                if (role != 3  && role != 1092 && role != 1173) {
                    field_branchoffice_hidden = record.getValue('custpage_branchoffice_hidden');       
                    obj_branchOffice = JSON.parse(field_branchoffice_hidden);
                    field_branchOffice = record.getField('custpage_branchoffice');

                    if (field_branchOffice !== null) {
                        field_branchOffice.removeSelectOption({ value: null });
                    }

                    log.debug('field_branchoffice_hidden', field_branchoffice_hidden);
                    log.debug('field_branchOffice', field_branchOffice);
        
                    field_branchOffice.insertSelectOption({
                        value: 0,
                        text: " "
                    });
        
                    if (obj_branchOffice.length != 0) {
                        for (var kc_branches in obj_branchOffice) {
                            id = obj_branchOffice[kc_branches].id;
                            if (id != 38 && id != 20 && id != 43) {
                                field_branchOffice.insertSelectOption({
                                    value: obj_branchOffice[kc_branches].id,
                                    text: obj_branchOffice[kc_branches].values.name
                                });
                            }
                        }
                    }    
                }
            }
        }

        function fieldChanged(context) {
            
                if (role != 3 && role != 1092 && role != 1173) {
                    var currentRecord = context.currentRecord;
                    if (context.fieldId == 'custevent70') {

                        var value_prefix = currentRecord.getValue('custevent70');
                        var text_prefix = currentRecord.getText('custevent70');
                        var field_subsidiary_hidden = record.getValue('custpage_subsidiary_hidden');
                        var resources = [];

                        if (value_prefix !== '' && value_prefix !== null) {
                            //console.log(text_prefix.substring(0, 7));
                            prefix = text_prefix.substring(0, 7);

                            if (prefix == 'VALORAC' || prefix == 'SEG-VAL' || prefix == 'VAL-2DO' || prefix == 'VAL-3ER' || prefix == 'VAL-4TO') {
                                resources = [
                                    {
                                        "subsidiary": "10",
                                        "value": "131",
                                        "text": "Valoraciones  Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "180",
                                        "text": "Valoraciones Acapulco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "179",
                                        "text": "Valoraciones Aguascalientes"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "88",
                                        "text": "Valoraciones Altavista"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "229",
                                        "text": "Valoraciones Anatole (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "224",
                                        "text": "Valoraciones Guadalajara (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "231",
                                        "text": "Valoraciones Cancún (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "232",
                                        "text": "Valoraciones Chihuahua (Albya)"
                                    },
                                    {
                                        "subsidiary": 17,
                                        "value": "209",
                                        "text": "Valoraciones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "195",
                                        "text": "Valoraciones Barranquilla"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "101",
                                        "text": "Valoraciones Bogotá"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "196",
                                        "text": "Valoraciones Cali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "193",
                                        "text": "Valoraciones Campeche"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "112",
                                        "text": "Valoraciones Cancún"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "215",
                                        "text": "Valoraciones Cartagena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "114",
                                        "text": "Valoraciones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "140",
                                        "text": "Valoraciones Ciudad Juarez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "206",
                                        "text": "Valoraciones Coatzacoalcos"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "174",
                                        "text": "Valoraciones Cuernavaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "192",
                                        "text": "Valoraciones Culiacan"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "213",
                                        "text": "Valoraciones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "141",
                                        "text": "Valoraciones Durango"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "227",
                                        "text": "Valoraciones Garcilaso"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "97",
                                        "text": "Valoraciones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "187",
                                        "text": "Valoraciones Guanajuato"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "133",
                                        "text": "Valoraciones Hermosillo"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "225",
                                        "text": "Valoraciones Horcajo de Santiago"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "173",
                                        "text": "Valoraciones León"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "198",
                                        "text": "Valoraciones Los Cabos"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "127",
                                        "text": "Valoraciones Madrid"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "185",
                                        "text": "Valoraciones Malaga"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "136",
                                        "text": "Valoraciones Medical Altavista"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "190",
                                        "text": "Valoraciones Medical Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "197",
                                        "text": "Valoraciones Medical Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "207",
                                        "text": "Valoraciones Medical Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "124",
                                        "text": "Valoraciones Medical Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "135",
                                        "text": "Valoraciones Medical Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "125",
                                        "text": "Valoraciones Medical Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "134",
                                        "text": "Valoraciones Merida"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "171",
                                        "text": "Valoraciones Mexicali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "93",
                                        "text": "Valoraciones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "172",
                                        "text": "Valoraciones Morelia"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "170",
                                        "text": "Valoraciones Oaxaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "176",
                                        "text": "Valoraciones Obregón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "175",
                                        "text": "Valoraciones Pachuca"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "223",
                                        "text": "Valoraciones Pereira"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "106",
                                        "text": "Valoraciones Polanco Homero"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "117",
                                        "text": "Valoraciones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "122",
                                        "text": "Valoraciones Querétaro"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "144",
                                        "text": "Valoraciones San Diego"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "178",
                                        "text": "Valoraciones San Luis Potosí"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "86",
                                        "text": "Valoraciones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "216",
                                        "text": "Valoraciones Santa Martha"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "221",
                                        "text": "Valoraciones Santiago"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "202",
                                        "text": "Valoraciones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "111",
                                        "text": "Valoraciones Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "105",
                                        "text": "Valoraciones Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "123",
                                        "text": "Valoraciones Tabasco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "191",
                                        "text": "Valoraciones Tampico"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "91",
                                        "text": "Valoraciones Tijuana"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "222",
                                        "text": "Valoraciones Toledo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "181",
                                        "text": "Valoraciones Toluca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "142",
                                        "text": "Valoraciones Torreón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "182",
                                        "text": "Valoraciones Tuxtla"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "186",
                                        "text": "Valoraciones Valencia"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "205",
                                        "text": "Valoraciones Velazquez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "96",
                                        "text": "Valoraciones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "145",
                                        "text": "Valoraciones Viena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "228",
                                        "text": "Valoraciones Villa Hermosa"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "230",
                                        "text": "Valoraciones Villavicencio"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "169",
                                        "text": "Valoraciones Xalapa"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "183",
                                        "text": "Valoraciones Zacatecas"
                                    }
                                ];
                            } else if (prefix == 'REV' || prefix == 'REV 10D' || prefix == 'REV 10M' || prefix == 'REV 11M' || prefix == 'REV 12M' || prefix == 'REV 13M' || prefix == 'REV 14M' || prefix == 'REV 1M' || prefix == 'REV 24H' || prefix == 'REV 2M' || prefix == 'REV 3M' || prefix == 'REV 4M' || prefix == 'REV 5M' || prefix == 'REV 6M' || prefix == 'REV 7M' || prefix == 'REV 8M' || prefix == 'REV 9M' || prefix == 'REV-HAI') {
                                resources = [
                                    {
                                        "subsidiary": "6",
                                        "value": "220",
                                        "text": "Revisiones Altavista"
                                    },
                                    {
                                        "subsidiary": "17",
                                        "value": "211",
                                        "text": "Revisiones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "126",
                                        "text": "Revisiones Bogotá"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "177",
                                        "text": "Revisiones Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "120",
                                        "text": "Revisiones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "212",
                                        "text": "Revisiones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "109",
                                        "text": "Revisiones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "129",
                                        "text": "Revisiones Madrid"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "189",
                                        "text": "Revisiones Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "99",
                                        "text": "Revisiones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "199",
                                        "text": "Revisiones Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "121",
                                        "text": "Revisiones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "87",
                                        "text": "Revisiones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "203",
                                        "text": "Revisiones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "200",
                                        "text": "Revisiones Satélite"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "132",
                                        "text": "Revisiones São Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "100",
                                        "text": "Revisiones Tijuana"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "98",
                                        "text": "Revisiones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "139",
                                        "text": "Revisiones Viena"
                                    }
                                ];
                            } else if (prefix == 'BQL' || prefix == 'INY' || prefix == 'MED' || prefix == 'PRP' || prefix == 'QX') {
                                resources = [
                                    {
                                        "subsidiary": "6",
                                        "value": "116",
                                        "text": "Camara Hiperbárica"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "94",
                                        "text": "Dr. Ulises Aguirre"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "108",
                                        "text": "Medical Completo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "107",
                                        "text": "Aparatología"
                                    },
                                    {
                                        "subsidiary": "17",
                                        "value": "210",
                                        "text": "Sala 1 Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "104",
                                        "text": "Sala 1 Bogotá"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "113",
                                        "text": "Sala 1 Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "115",
                                        "text": "Sala 1 Chihuahua"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "214",
                                        "text": "Sala 1 Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "85",
                                        "text": "Sala 1 Guadalajara"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "128",
                                        "text": "Sala 1 Madrid"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "188",
                                        "text": "Sala 1 Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "83",
                                        "text": "Sala 1 Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "118",
                                        "text": "Sala 1 Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "81",
                                        "text": "Sala 1 Santa Fé"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "204",
                                        "text": "Sala 1 Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "119",
                                        "text": "Sala 1 Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "143",
                                        "text": "Sala 1 Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "82",
                                        "text": "Sala 1 Tijuana"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "84",
                                        "text": "Sala 1 Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "138",
                                        "text": "Sala 1 Viena"
                                    }
                                ];
                            } else if (prefix == 'VAL-INY' || prefix == 'VAL-MED' || prefix == 'VAL-QX') {
                                resources = [
                                    {
                                        "subsidiary": "6",
                                        "value": "116",
                                        "text": "Camara Hiperbárica"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "94",
                                        "text": "Dr. Ulises Aguirre"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "108",
                                        "text": "Medical Completo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "107",
                                        "text": "Aparatología"
                                    },
                                  {
                                        "subsidiary": "10",
                                        "value": "131",
                                        "text": "Valoraciones  Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "180",
                                        "text": "Valoraciones Acapulco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "179",
                                        "text": "Valoraciones Aguascalientes"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "88",
                                        "text": "Valoraciones Altavista"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "229",
                                        "text": "Valoraciones Anatole (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "224",
                                        "text": "Valoraciones Guadalajara (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "231",
                                        "text": "Valoraciones Cancún (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "232",
                                        "text": "Valoraciones Chihuahua (Albya)"
                                    },
                                    {
                                        "subsidiary": 17,
                                        "value": "209",
                                        "text": "Valoraciones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "195",
                                        "text": "Valoraciones Barranquilla"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "101",
                                        "text": "Valoraciones Bogotá"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "196",
                                        "text": "Valoraciones Cali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "193",
                                        "text": "Valoraciones Campeche"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "112",
                                        "text": "Valoraciones Cancún"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "215",
                                        "text": "Valoraciones Cartagena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "114",
                                        "text": "Valoraciones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "140",
                                        "text": "Valoraciones Ciudad Juarez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "206",
                                        "text": "Valoraciones Coatzacoalcos"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "174",
                                        "text": "Valoraciones Cuernavaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "192",
                                        "text": "Valoraciones Culiacan"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "213",
                                        "text": "Valoraciones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "141",
                                        "text": "Valoraciones Durango"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "227",
                                        "text": "Valoraciones Garcilaso"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "97",
                                        "text": "Valoraciones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "187",
                                        "text": "Valoraciones Guanajuato"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "133",
                                        "text": "Valoraciones Hermosillo"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "225",
                                        "text": "Valoraciones Horcajo de Santiago"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "173",
                                        "text": "Valoraciones León"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "198",
                                        "text": "Valoraciones Los Cabos"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "127",
                                        "text": "Valoraciones Madrid"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "185",
                                        "text": "Valoraciones Malaga"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "136",
                                        "text": "Valoraciones Medical Altavista"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "190",
                                        "text": "Valoraciones Medical Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "197",
                                        "text": "Valoraciones Medical Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "207",
                                        "text": "Valoraciones Medical Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "124",
                                        "text": "Valoraciones Medical Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "135",
                                        "text": "Valoraciones Medical Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "125",
                                        "text": "Valoraciones Medical Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "134",
                                        "text": "Valoraciones Merida"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "171",
                                        "text": "Valoraciones Mexicali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "93",
                                        "text": "Valoraciones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "172",
                                        "text": "Valoraciones Morelia"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "170",
                                        "text": "Valoraciones Oaxaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "176",
                                        "text": "Valoraciones Obregón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "175",
                                        "text": "Valoraciones Pachuca"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "223",
                                        "text": "Valoraciones Pereira"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "106",
                                        "text": "Valoraciones Polanco Homero"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "117",
                                        "text": "Valoraciones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "122",
                                        "text": "Valoraciones Querétaro"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "144",
                                        "text": "Valoraciones San Diego"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "178",
                                        "text": "Valoraciones San Luis Potosí"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "86",
                                        "text": "Valoraciones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "216",
                                        "text": "Valoraciones Santa Martha"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "221",
                                        "text": "Valoraciones Santiago"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "202",
                                        "text": "Valoraciones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "111",
                                        "text": "Valoraciones Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "105",
                                        "text": "Valoraciones Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "123",
                                        "text": "Valoraciones Tabasco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "191",
                                        "text": "Valoraciones Tampico"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "91",
                                        "text": "Valoraciones Tijuana"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "222",
                                        "text": "Valoraciones Toledo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "181",
                                        "text": "Valoraciones Toluca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "142",
                                        "text": "Valoraciones Torreón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "182",
                                        "text": "Valoraciones Tuxtla"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "186",
                                        "text": "Valoraciones Valencia"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "205",
                                        "text": "Valoraciones Velazquez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "96",
                                        "text": "Valoraciones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "145",
                                        "text": "Valoraciones Viena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "228",
                                        "text": "Valoraciones Villa Hermosa"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "230",
                                        "text": "Valoraciones Villavicencio"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "169",
                                        "text": "Valoraciones Xalapa"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "183",
                                        "text": "Valoraciones Zacatecas"
                                    }
                                ];
                            } else if (prefix == 'VOL') {
                                resources = [
                                    {
                                        "subsidiary": "6",
                                        "value": "218",
                                        "text": "Alejandra López"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "131",
                                        "text": "Valoraciones  Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "180",
                                        "text": "Valoraciones Acapulco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "179",
                                        "text": "Valoraciones Aguascalientes"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "88",
                                        "text": "Valoraciones Altavista"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "229",
                                        "text": "Valoraciones Anatole (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "224",
                                        "text": "Valoraciones Guadalajara (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "231",
                                        "text": "Valoraciones Cancún (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "232",
                                        "text": "Valoraciones Chihuahua (Albya)"
                                    },
                                    {
                                        "subsidiary": "17",
                                        "value": "209",
                                        "text": "Valoraciones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "195",
                                        "text": "Valoraciones Barranquilla"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "101",
                                        "text": "Valoraciones Bogotá"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "196",
                                        "text": "Valoraciones Cali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "193",
                                        "text": "Valoraciones Campeche"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "112",
                                        "text": "Valoraciones Cancún"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "215",
                                        "text": "Valoraciones Cartagena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "114",
                                        "text": "Valoraciones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "140",
                                        "text": "Valoraciones Ciudad Juarez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "206",
                                        "text": "Valoraciones Coatzacoalcos"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "174",
                                        "text": "Valoraciones Cuernavaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "192",
                                        "text": "Valoraciones Culiacan"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "213",
                                        "text": "Valoraciones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "141",
                                        "text": "Valoraciones Durango"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "227",
                                        "text": "Valoraciones Garcilaso"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "97",
                                        "text": "Valoraciones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "187",
                                        "text": "Valoraciones Guanajuato"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "133",
                                        "text": "Valoraciones Hermosillo"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "225",
                                        "text": "Valoraciones Horcajo de Santiago"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "173",
                                        "text": "Valoraciones León"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "198",
                                        "text": "Valoraciones Los Cabos"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "127",
                                        "text": "Valoraciones Madrid"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "185",
                                        "text": "Valoraciones Malaga"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "136",
                                        "text": "Valoraciones Medical Altavista"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "190",
                                        "text": "Valoraciones Medical Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "197",
                                        "text": "Valoraciones Medical Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "207",
                                        "text": "Valoraciones Medical Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "124",
                                        "text": "Valoraciones Medical Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "135",
                                        "text": "Valoraciones Medical Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "125",
                                        "text": "Valoraciones Medical Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "134",
                                        "text": "Valoraciones Merida"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "171",
                                        "text": "Valoraciones Mexicali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "93",
                                        "text": "Valoraciones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "172",
                                        "text": "Valoraciones Morelia"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "170",
                                        "text": "Valoraciones Oaxaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "176",
                                        "text": "Valoraciones Obregón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "175",
                                        "text": "Valoraciones Pachuca"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "223",
                                        "text": "Valoraciones Pereira"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "106",
                                        "text": "Valoraciones Polanco Homero"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "117",
                                        "text": "Valoraciones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "122",
                                        "text": "Valoraciones Querétaro"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "144",
                                        "text": "Valoraciones San Diego"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "178",
                                        "text": "Valoraciones San Luis Potosí"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "86",
                                        "text": "Valoraciones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "216",
                                        "text": "Valoraciones Santa Martha"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "221",
                                        "text": "Valoraciones Santiago"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "202",
                                        "text": "Valoraciones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "111",
                                        "text": "Valoraciones Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "105",
                                        "text": "Valoraciones Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "123",
                                        "text": "Valoraciones Tabasco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "191",
                                        "text": "Valoraciones Tampico"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "91",
                                        "text": "Valoraciones Tijuana"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "222",
                                        "text": "Valoraciones Toledo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "181",
                                        "text": "Valoraciones Toluca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "142",
                                        "text": "Valoraciones Torreón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "182",
                                        "text": "Valoraciones Tuxtla"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "186",
                                        "text": "Valoraciones Valencia"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "205",
                                        "text": "Valoraciones Velazquez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "96",
                                        "text": "Valoraciones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "145",
                                        "text": "Valoraciones Viena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "228",
                                        "text": "Valoraciones Villa Hermosa"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "230",
                                        "text": "Valoraciones Villavicencio"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "169",
                                        "text": "Valoraciones Xalapa"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "183",
                                        "text": "Valoraciones Zacatecas"
                                    }
                                ];
                            } else if (prefix == 'VOL-PRE') {
                                resources = [
                                    {
                                        "subsidiary": "6",
                                        "value": "218",
                                        "text": "Alejandra López"
                                    },
                                    {
                                        "subsidiary": "17",
                                        "value": "210",
                                        "text": "Sala 1 Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "104",
                                        "text": "Sala 1 Bogotá"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "113",
                                        "text": "Sala 1 Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "115",
                                        "text": "Sala 1 Chihuahua"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "214",
                                        "text": "Sala 1 Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "85",
                                        "text": "Sala 1 Guadalajara"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "128",
                                        "text": "Sala 1 Madrid"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "188",
                                        "text": "Sala 1 Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "83",
                                        "text": "Sala 1 Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "118",
                                        "text": "Sala 1 Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "81",
                                        "text": "Sala 1 Santa Fé"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "204",
                                        "text": "Sala 1 Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "119",
                                        "text": "Sala 1 Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "143",
                                        "text": "Sala 1 Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "82",
                                        "text": "Sala 1 Tijuana"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "84",
                                        "text": "Sala 1 Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "138",
                                        "text": "Sala 1 Viena"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "131",
                                        "text": "Valoraciones  Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "180",
                                        "text": "Valoraciones Acapulco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "179",
                                        "text": "Valoraciones Aguascalientes"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "88",
                                        "text": "Valoraciones Altavista"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "229",
                                        "text": "Valoraciones Anatole (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "224",
                                        "text": "Valoraciones Guadalajara (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "231",
                                        "text": "Valoraciones Cancún (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "232",
                                        "text": "Valoraciones Chihuahua (Albya)"
                                    },
                                    {
                                        "subsidiary": 17,
                                        "value": "209",
                                        "text": "Valoraciones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "195",
                                        "text": "Valoraciones Barranquilla"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "101",
                                        "text": "Valoraciones Bogotá"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "196",
                                        "text": "Valoraciones Cali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "193",
                                        "text": "Valoraciones Campeche"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "112",
                                        "text": "Valoraciones Cancún"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "215",
                                        "text": "Valoraciones Cartagena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "114",
                                        "text": "Valoraciones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "140",
                                        "text": "Valoraciones Ciudad Juarez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "206",
                                        "text": "Valoraciones Coatzacoalcos"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "174",
                                        "text": "Valoraciones Cuernavaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "192",
                                        "text": "Valoraciones Culiacan"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "213",
                                        "text": "Valoraciones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "141",
                                        "text": "Valoraciones Durango"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "227",
                                        "text": "Valoraciones Garcilaso"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "97",
                                        "text": "Valoraciones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "187",
                                        "text": "Valoraciones Guanajuato"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "133",
                                        "text": "Valoraciones Hermosillo"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "225",
                                        "text": "Valoraciones Horcajo de Santiago"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "173",
                                        "text": "Valoraciones León"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "198",
                                        "text": "Valoraciones Los Cabos"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "127",
                                        "text": "Valoraciones Madrid"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "185",
                                        "text": "Valoraciones Malaga"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "136",
                                        "text": "Valoraciones Medical Altavista"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "190",
                                        "text": "Valoraciones Medical Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "197",
                                        "text": "Valoraciones Medical Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "207",
                                        "text": "Valoraciones Medical Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "124",
                                        "text": "Valoraciones Medical Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "135",
                                        "text": "Valoraciones Medical Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "125",
                                        "text": "Valoraciones Medical Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "134",
                                        "text": "Valoraciones Merida"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "171",
                                        "text": "Valoraciones Mexicali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "93",
                                        "text": "Valoraciones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "172",
                                        "text": "Valoraciones Morelia"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "170",
                                        "text": "Valoraciones Oaxaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "176",
                                        "text": "Valoraciones Obregón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "175",
                                        "text": "Valoraciones Pachuca"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "223",
                                        "text": "Valoraciones Pereira"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "106",
                                        "text": "Valoraciones Polanco Homero"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "117",
                                        "text": "Valoraciones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "122",
                                        "text": "Valoraciones Querétaro"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "144",
                                        "text": "Valoraciones San Diego"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "178",
                                        "text": "Valoraciones San Luis Potosí"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "86",
                                        "text": "Valoraciones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "216",
                                        "text": "Valoraciones Santa Martha"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "221",
                                        "text": "Valoraciones Santiago"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "202",
                                        "text": "Valoraciones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "111",
                                        "text": "Valoraciones Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "105",
                                        "text": "Valoraciones Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "123",
                                        "text": "Valoraciones Tabasco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "191",
                                        "text": "Valoraciones Tampico"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "91",
                                        "text": "Valoraciones Tijuana"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "222",
                                        "text": "Valoraciones Toledo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "181",
                                        "text": "Valoraciones Toluca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "142",
                                        "text": "Valoraciones Torreón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "182",
                                        "text": "Valoraciones Tuxtla"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "186",
                                        "text": "Valoraciones Valencia"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "205",
                                        "text": "Valoraciones Velazquez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "96",
                                        "text": "Valoraciones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "145",
                                        "text": "Valoraciones Viena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "228",
                                        "text": "Valoraciones Villa Hermosa"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "230",
                                        "text": "Valoraciones Villavicencio"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "169",
                                        "text": "Valoraciones Xalapa"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "183",
                                        "text": "Valoraciones Zacatecas"
                                    }
                                ];
                            } else if (prefix == 'MESO') {
                                resources = [
                                    {
                                        "subsidiary": "10",
                                        "value": "131",
                                        "text": "Valoraciones  Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "180",
                                        "text": "Valoraciones Acapulco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "179",
                                        "text": "Valoraciones Aguascalientes"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "88",
                                        "text": "Valoraciones Altavista"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "229",
                                        "text": "Valoraciones Anatole (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "224",
                                        "text": "Valoraciones Guadalajara (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "231",
                                        "text": "Valoraciones Cancún (Albya)"
                                    },
                                    {
                                        "subsidiary": "19",
                                        "value": "232",
                                        "text": "Valoraciones Chihuahua (Albya)"
                                    },
                                    {
                                        "subsidiary": 17,
                                        "value": "209",
                                        "text": "Valoraciones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "195",
                                        "text": "Valoraciones Barranquilla"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "101",
                                        "text": "Valoraciones Bogotá"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "196",
                                        "text": "Valoraciones Cali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "193",
                                        "text": "Valoraciones Campeche"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "112",
                                        "text": "Valoraciones Cancún"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "215",
                                        "text": "Valoraciones Cartagena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "114",
                                        "text": "Valoraciones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "140",
                                        "text": "Valoraciones Ciudad Juarez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "206",
                                        "text": "Valoraciones Coatzacoalcos"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "174",
                                        "text": "Valoraciones Cuernavaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "192",
                                        "text": "Valoraciones Culiacan"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "213",
                                        "text": "Valoraciones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "141",
                                        "text": "Valoraciones Durango"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "227",
                                        "text": "Valoraciones Garcilaso"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "97",
                                        "text": "Valoraciones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "187",
                                        "text": "Valoraciones Guanajuato"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "133",
                                        "text": "Valoraciones Hermosillo"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "225",
                                        "text": "Valoraciones Horcajo de Santiago"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "173",
                                        "text": "Valoraciones León"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "198",
                                        "text": "Valoraciones Los Cabos"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "127",
                                        "text": "Valoraciones Madrid"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "185",
                                        "text": "Valoraciones Malaga"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "136",
                                        "text": "Valoraciones Medical Altavista"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "190",
                                        "text": "Valoraciones Medical Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "197",
                                        "text": "Valoraciones Medical Guadalajara"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "207",
                                        "text": "Valoraciones Medical Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "124",
                                        "text": "Valoraciones Medical Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "135",
                                        "text": "Valoraciones Medical Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "125",
                                        "text": "Valoraciones Medical Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "134",
                                        "text": "Valoraciones Merida"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "171",
                                        "text": "Valoraciones Mexicali"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "93",
                                        "text": "Valoraciones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "172",
                                        "text": "Valoraciones Morelia"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "170",
                                        "text": "Valoraciones Oaxaca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "176",
                                        "text": "Valoraciones Obregón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "175",
                                        "text": "Valoraciones Pachuca"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "223",
                                        "text": "Valoraciones Pereira"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "106",
                                        "text": "Valoraciones Polanco Homero"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "117",
                                        "text": "Valoraciones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "122",
                                        "text": "Valoraciones Querétaro"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "144",
                                        "text": "Valoraciones San Diego"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "178",
                                        "text": "Valoraciones San Luis Potosí"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "86",
                                        "text": "Valoraciones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "216",
                                        "text": "Valoraciones Santa Martha"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "221",
                                        "text": "Valoraciones Santiago"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "202",
                                        "text": "Valoraciones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "111",
                                        "text": "Valoraciones Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "105",
                                        "text": "Valoraciones Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "123",
                                        "text": "Valoraciones Tabasco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "191",
                                        "text": "Valoraciones Tampico"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "91",
                                        "text": "Valoraciones Tijuana"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "222",
                                        "text": "Valoraciones Toledo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "181",
                                        "text": "Valoraciones Toluca"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "142",
                                        "text": "Valoraciones Torreón"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "182",
                                        "text": "Valoraciones Tuxtla"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "186",
                                        "text": "Valoraciones Valencia"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "205",
                                        "text": "Valoraciones Velazquez"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "96",
                                        "text": "Valoraciones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "145",
                                        "text": "Valoraciones Viena"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "228",
                                        "text": "Valoraciones Villa Hermosa"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "230",
                                        "text": "Valoraciones Villavicencio"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "169",
                                        "text": "Valoraciones Xalapa"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "183",
                                        "text": "Valoraciones Zacatecas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "220",
                                        "text": "Revisiones Altavista"
                                    },
                                    {
                                        "subsidiary": "17",
                                        "value": "211",
                                        "text": "Revisiones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "126",
                                        "text": "Revisiones Bogotá"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "177",
                                        "text": "Revisiones Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "120",
                                        "text": "Revisiones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "212",
                                        "text": "Revisiones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "109",
                                        "text": "Revisiones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "129",
                                        "text": "Revisiones Madrid"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "189",
                                        "text": "Revisiones Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "99",
                                        "text": "Revisiones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "199",
                                        "text": "Revisiones Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "121",
                                        "text": "Revisiones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "87",
                                        "text": "Revisiones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "203",
                                        "text": "Revisiones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "200",
                                        "text": "Revisiones Satélite"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "132",
                                        "text": "Revisiones São Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "100",
                                        "text": "Revisiones Tijuana"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "98",
                                        "text": "Revisiones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "139",
                                        "text": "Revisiones Viena"
                                    },
                                  {
                                        "subsidiary": "17",
                                        "value": "210",
                                        "text": "Sala 1 Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "104",
                                        "text": "Sala 1 Bogotá"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "113",
                                        "text": "Sala 1 Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "115",
                                        "text": "Sala 1 Chihuahua"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "214",
                                        "text": "Sala 1 Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "85",
                                        "text": "Sala 1 Guadalajara"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "128",
                                        "text": "Sala 1 Madrid"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "188",
                                        "text": "Sala 1 Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "83",
                                        "text": "Sala 1 Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "118",
                                        "text": "Sala 1 Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "81",
                                        "text": "Sala 1 Santa Fé"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "204",
                                        "text": "Sala 1 Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "119",
                                        "text": "Sala 1 Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "143",
                                        "text": "Sala 1 Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "82",
                                        "text": "Sala 1 Tijuana"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "84",
                                        "text": "Sala 1 Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "138",
                                        "text": "Sala 1 Viena"
                                    }
                                ];
                            } else if (prefix == 'PROCEDI') {
                                resources = [
                                    {
                                        "subsidiary": "17",
                                        "value": "210",
                                        "text": "Sala 1 Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "104",
                                        "text": "Sala 1 Bogotá"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "113",
                                        "text": "Sala 1 Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "115",
                                        "text": "Sala 1 Chihuahua"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "214",
                                        "text": "Sala 1 Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "85",
                                        "text": "Sala 1 Guadalajara"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "128",
                                        "text": "Sala 1 Madrid"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "188",
                                        "text": "Sala 1 Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "83",
                                        "text": "Sala 1 Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "118",
                                        "text": "Sala 1 Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "81",
                                        "text": "Sala 1 Santa Fé"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "204",
                                        "text": "Sala 1 Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "119",
                                        "text": "Sala 1 Sao Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "143",
                                        "text": "Sala 1 Satélite"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "82",
                                        "text": "Sala 1 Tijuana"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "84",
                                        "text": "Sala 1 Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "138",
                                        "text": "Sala 1 Viena"
                                    }
                                ];
                            } else if (prefix == 'REV-QX' || prefix == 'REV-TX') {
                                resources = [
                                    {
                                        "subsidiary": "6",
                                        "value": "116",
                                        "text": "Camara Hiperbárica"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "94",
                                        "text": "Dr. Ulises Aguirre"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "108",
                                        "text": "Medical Completo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "107",
                                        "text": "Aparatología"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "220",
                                        "text": "Revisiones Altavista"
                                    },
                                    {
                                        "subsidiary": "17",
                                        "value": "211",
                                        "text": "Revisiones Ashheim"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "126",
                                        "text": "Revisiones Bogotá"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "177",
                                        "text": "Revisiones Cancún"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "120",
                                        "text": "Revisiones Chihuahua"
                                    },
                                    {
                                        "subsidiary": "3",
                                        "value": "212",
                                        "text": "Revisiones Dallas"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "109",
                                        "text": "Revisiones Guadalajara"
                                    },
                                    {
                                        "subsidiary": "12",
                                        "value": "129",
                                        "text": "Revisiones Madrid"
                                    },
                                    {
                                        "subsidiary": "10",
                                        "value": "189",
                                        "text": "Revisiones Medellin"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "99",
                                        "text": "Revisiones Monterrey"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "199",
                                        "text": "Revisiones Polanco"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "121",
                                        "text": "Revisiones Puebla"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "87",
                                        "text": "Revisiones Santa Fé"
                                    },
                                    {
                                        "subsidiary": "16",
                                        "value": "203",
                                        "text": "Revisiones Santo Domingo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "200",
                                        "text": "Revisiones Satélite"
                                    },
                                    {
                                        "subsidiary": "11",
                                        "value": "132",
                                        "text": "Revisiones São Paulo"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "100",
                                        "text": "Revisiones Tijuana"
                                    },
                                    {
                                        "subsidiary": "6",
                                        "value": "98",
                                        "text": "Revisiones Veracruz"
                                    },
                                    {
                                        "subsidiary": "13",
                                        "value": "139",
                                        "text": "Revisiones Viena"
                                    }

                                ];
                            }

                            var obj_resources = JSON.parse(JSON.stringify(resources));

                            log.debug('obj_resources', obj_resources);

                            var field_resources = record.getField('custpage_resource');
                            field_resources.removeSelectOption({ value: null });

                            if (obj_resources.length > 0) {
                                field_resources.insertSelectOption({
                                    value: 0,
                                    text: " "
                                });
                                for (var k_resources in obj_resources) {
                                    if (obj_resources[k_resources].subsidiary == field_subsidiary_hidden) {
                                        field_resources.insertSelectOption({
                                            value: obj_resources[k_resources].value,
                                            text: obj_resources[k_resources].text
                                        });
                                    }
                                }
                            }
                        }
                    }

                    if (context.fieldId == 'custpage_branchoffice') {
                        var value_branch = record.getValue('custpage_branchoffice');
                        record.setValue({
                            fieldId: 'custevent2',
                            value: value_branch,
                            ignoreFieldChange: true
                        });
                    }

                    if (context.fieldId == 'custpage_resource') {
                        console.log('fieldChange' + JSON.stringify(context));
                        var valResource = currentRecord.getValue('custpage_resource');

                        currentRecord.insertLine({
                            sublistId: 'resource',
                            line: 0,
                        });
                        currentRecord.setCurrentSublistValue({
                            sublistId: 'resource',
                            fieldId: 'resource',
                            value: valResource
                        });

                        currentRecord.selectLine({
                            sublistId : 'resource',
                            line: 0
                        });
                        
                        currentRecord.commitLine({
                            sublistId: 'resource',
                        });

                        var objSublist = currentRecord.getSublist({
                            sublistId: 'resource'
                        });

                        if (objSublist.isChanged) {
                            currentRecord.removeLine({
                                sublistId: 'resource',
                                line: 0,
                            });

                            currentRecord.insertLine({
                                sublistId: 'resource',
                                line: 0,
                            });
                            currentRecord.setCurrentSublistValue({
                                sublistId: 'resource',
                                fieldId: 'resource',
                                value: valResource
                            });

                            currentRecord.selectLine({
                                sublistId: 'resource',
                                line: 0
                            });
                            
                            currentRecord.commitLine({
                                sublistId: 'resource',
                            });
                        }
                    }
                }
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged
        };

    });
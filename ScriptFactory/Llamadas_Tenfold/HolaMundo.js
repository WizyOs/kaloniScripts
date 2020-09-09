function eventoAsignacion(){
     var campo1='';
       var searchresults = nlapiSearchRecord('customer','customsearch3260');

    for ( var i = 0; i < searchresults.length; i++ )
    {
     var searchresult = searchresults[ i ];
     var record = searchresult.getId( );
     var rectype = searchresult.getRecordType( );
     var id = searchresult.getValue( 'internalid' );
     var name = searchresult.getText( 'id' );

              if(id=='646410' && name=='HG-9468724'){
                campo1 = nlapiLoadRecord('customer', '646410');
                campo1.setFieldValue(' custentity295 ', name);
                nlapiSubmitRecord(campo1, true);
                 continue;

               }
	}
}
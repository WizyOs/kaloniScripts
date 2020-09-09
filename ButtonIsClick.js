/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/ui/dialog', 'N/search'], function(
		dialog, search) {
	/**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
	function pageInit(context) {
		
		//Call the alert dialog
		var options = {
	            title: "Alert Dialog",
	            message: 'Inventory Detail Alert'
	         };
		dialog.alert(options)
	}

	return {
		pageInit : pageInit
	};
});
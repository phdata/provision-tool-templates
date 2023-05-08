(function process(request, response) {
	var choices = [];
	var variable_name = request.queryParams.variable;
	var limit = request.queryParams.limit;

	if (!variable_name || !limit) {
		response.setStatus(400);
		return { statusCode: 400, message: "variable or limit attribute is null" };
	} else {
		var query_str = 'name=' + variable_name;
		var gr_ion = new GlideRecord('item_option_new');
		gr_ion.addEncodedQuery(query_str);
		gr_ion.setLimit(limit);
		gr_ion.query();

		if (gr_ion.hasNext()) {
			while(gr_ion.next()) {
				var gr_cart = new sn_sc.CatItem(gr_ion.cat_item);
				var variableList = gr_cart.getVariables();
				variableList.forEach(function(data, index) {
					if(variable_name == data.name) {
						var qc = new GlideRecord('question_choice');
						qc.addQuery('question', gr_ion.sys_id.toString());
						qc.query();
						while(qc.next()){
							choices.push(qc.value.toString());
						}
					}
				});
			}
		} else {
			response.setStatus(404);
			return { statusCode: 404, message: "No variable as " + variable_name };
		}
	}

	return choices;
})(request, response);
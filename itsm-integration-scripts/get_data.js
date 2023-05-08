(function process(request, response) {
	var query = request.queryParams.query;
    var limit = request.queryParams.limit;

	if (!query || !limit) {
        response.setStatus(400);
		return { statusCode: 400, message: "query or limit attribute is null" };
	}

	var result = [];
    var gr = new GlideRecord("sc_req_item");
	gr.addEncodedQuery(query);
	gr.setLimit(limit);
	gr.query();

	while (gr.next()) {
		var body = {};
		body['number'] = gr.getValue("number");
		body['short_description'] = gr.getValue("short_description");
		body['opened_by'] = gr.getValue("opened_by");
		body['approval_set'] = gr.getValue("approval_set");

		for (var prop in gr.variables) {
			if (gr.variables.hasOwnProperty(prop) ) {
				var variable = gr.variables[prop];
				var values = variable.toString().split(",");
				if(values.length > 1) {
					var prop_list = [];
					values.forEach(function(val){
						var choiceGR = new GlideRecord('question_choice');
						choiceGR.addQuery('sys_id',val.trim());
						choiceGR.query();
						while(choiceGR.next()){
							prop_list.push(choiceGR.getValue('value'));
						}
					});
					body[prop] = prop_list;
				} else {
					body[prop] = variable.toString();
				}
			}
		}

		// use the below syntax if there is a requirement to concat different form fields
		// if(gr.getValue("short_description") == "Request New Snowflake Workspace") {
		// 	body['workspace_name'] = (body["business_unit_name"] + '_' + body["project_name"]).toUpperCase();
		// }

		body = getUserDetails(gr.getValue("opened_by"), body);
		result.push(body);
	}

	function getUserDetails(sys_id, body) {
		var user = new GlideRecord('sys_user').addQuery('sys_id', sys_id).query();

		if (user.next()) {
			body["first_name"] = user.getValue('first_name');
			body["last_name"] = user.getValue('last_name');
			body["email"] = user.getValue('email');
			body["title"] = user.getValue('title');
			body["phone"] = user.getValue('phone');
		}
		return body;
	}

	return result;
})(request, response);
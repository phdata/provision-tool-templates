// Global variables - update the below variables according to your environment

// update the catalog task short description which is used to filter Tram task
var catalog_task_short_description = "Snowflake User Access Request";

// update the list collector field name if there is a list collector in your form
var ritm_list_collector_field_name = "access_required_for";

(function process(request, response) {
    var query = request.queryParams.query;
    var limit = request.queryParams.limit;

    if (!query || !limit) {
        response.setStatus(400);
        return {
            statusCode: 400,
            message: "query or limit attribute is null"
        };
    }

    var result = [];
    var gr = new GlideRecord("sc_req_item");
	//gr.addEncodedQuery('active=true^cat_item=5b007963dbf3811055425716f496197d^approval=approved^approval_setRELATIVELT@minute@ago@50');
    gr.addEncodedQuery(query);
    gr.setLimit(limit);
    gr.query();

    while (gr.next()) {
        var body = {};
        body['number'] = gr.getValue("number");
		//body['updated_time'] = gr.getValue("sys_updated_on");
        body['short_description'] = gr.getValue("short_description");
        body['opened_by'] = gr.getValue("opened_by");
		//body['requested_for'] = gr.getValue("requested_for");
		//body['requested_for_email'] = gr.getValue("email");
        body['approval_set'] = gr.getValue("approval_set");
        body['ritm_sys_id'] = gr.getValue("sys_id");

        for (var prop in gr.variables) {
            if (gr.variables.hasOwnProperty(prop)) {
                var variable = gr.variables[prop];
                var values = variable.toString().split(",");
                var prop_list = [];
                if (values.length > 1) {
                    values.forEach(function(val) {
                        prop_list = getChoicesBySysId(val, prop_list);
                    });
                } else if (prop == 'access_required_for') {  // condition to handle single value in list collector
                    prop_list = getChoicesBySysId(variable.toString(), prop_list);
                } 
				else if (prop == 'irdl_developer') {
                    body[prop] = variable.toString() === "Yes" ? variable.toString() : '';
                }				
				else {
                    // String type variable lands here and added to body
                    body[prop] = prop === "email_id" ? variable.toString().toUpperCase() : variable.toString();
                }
            }
            if (prop_list.length > 0) {
                body[prop] = prop_list;
            }
        }

//        use the below syntax if there is a requirement to concat different form fields
//         if (gr.getValue("short_description") == "Request New Snowflake Workspace") {
//             body['workspace_name'] = (body["business_unit_name"] + '_' + body["project_name"]).toUpperCase();
//         }

        body = getUserDetails(gr.getValue("requested_for.email.getDisplayvalue()"), body);

        // get catalog task details
        var ritm_sys_id = gr.getValue("sys_id");
        getCatalogTaskInfo(ritm_sys_id, body);

        result.push(body);
    }

    // get catalog task details for given requested item
    function getCatalogTaskInfo(ritm_sys_id, body) {
        var grTask = new GlideRecord('sc_task');
        grTask.addQuery('parent', ritm_sys_id);
        grTask.addQuery('short_description', 'Snowflake User Access Request');
        grTask.query();
        while (grTask.next()) {
            body['sctask_number'] = grTask.number;
            body['sctask_id'] = grTask.sys_id;

        }
    }

    // get values for choices for variable of type list collector
    // we get sys_id for choice in the list collector
    function getChoicesBySysId(sys_id, prop_list) {
        var choiceGR = new GlideRecord('question_choice');
        choiceGR.addQuery('sys_id', sys_id.trim());
        choiceGR.query();
        while (choiceGR.next()) {
            prop_list.push(choiceGR.getValue('value'));
        }
        return prop_list;
    }

    // get user details
    function getUserDetails(sys_id, body) {
        var user = new GlideRecord('sys_user').addQuery('sys_id', sys_id).query();

        if (user.next()) {
            body["first_name"] = user.getValue('first_name');
            body["last_name"] = user.getValue('last_name');
            body["email"] = user.getValue('email');
            body["title"] = user.getValue('title');
            body["phone"] = user.getValue('phone');
			body['requested_for_email'] = user.getValue("requested_for.email");
			
        }
        return body;
    }

    return result;
})(request, response);
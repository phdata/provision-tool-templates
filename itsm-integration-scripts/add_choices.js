(function process(request, response) {
	var reqBody = request.body.nextEntry();

	if (!reqBody.variable_name || !reqBody.variable_values) {
		response.setStatus(400);
		return { statusCode: 400, message: "variable_name or variable_values attribute is null" };
	} else {
		var variable_name = reqBody.variable_name;
		var values = reqBody.variable_values.trim();

		var query_str = 'name=' + variable_name;
		var gr_ion = new GlideRecord('item_option_new');
		gr_ion.addEncodedQuery(query_str);
		gr_ion.query();

		var cat_sys_Id = null;
		if (gr_ion.hasNext()) {
			while(gr_ion.next()) {
				new sn_sc.CatItem(gr_ion.cat_item).getVariables().forEach(function(data) {
					if(data.name === variable_name) {
						cat_sys_Id = gr_ion.getUniqueValue();
					}
				});
			}

			var valuesArr = [];
			if (values) {
				valuesArr = values.replace(/\[|\]/g, "").split(",").map(function(val) {
					return val.trim();
				});
			}

			if (valuesArr.length) {
				valuesArr.forEach(function(v_value, index, tArr) {
					var gr_qc = new GlideRecord('question_choice');
					gr_qc.initialize();
					gr_qc.question = cat_sys_Id;
					gr_qc.text = v_value.toLowerCase();
					gr_qc.value = v_value.toUpperCase();
					gr_qc.insert();
				});
				response.setStatus(200);
				return { statusCode: 200, message: valuesArr.join(",") + " inserted successfully"  };
			}
		} else {
			response.setStatus(404);
			return { statusCode: 404, message: "No variable as " + variable_name };
		}
	}

	function capitalize(str, split_by_underscore) {
		var strArr = str.split(/\s/g);
		if (split_by_underscore) {
			strArr = str.split(/\s|_/g);
		}
		var rtnStr = [];
		strArr.forEach(function(val) {
			rtnStr.push(val.charAt(0).toUpperCase() + val.slice(1));
		});
		return rtnStr.join(" ");
	}
})(request, response);
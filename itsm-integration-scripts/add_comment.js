(function process(request, response) {
	var reqBody = request.body.nextEntry();
	if (!reqBody.comment || !reqBody.key) {
		response.setStatus(400);
		return { statusCode: 400, message: "key or comment attribute is null" };
	} else {
		try {
			var sc_query = "number=" + reqBody.key;
			var g_r = new GlideRecord("sc_req_item");
			g_r.addEncodedQuery(sc_query);
			g_r.query();
			while (g_r.next()) {
				g_r.comments = reqBody.comment;
				g_r.update();
			}
			response.setStatus(200);
			return { statusCode: 200, message: "Comment added successfully" };
		} catch(e) {
			response.setStatus(500);
			return { statusCode: 500, message: "Something goes wrong" };
		}
	}
})(request, response);
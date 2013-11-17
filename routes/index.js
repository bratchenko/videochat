module.exports = function(app) {

	var OpenTok = require('opentok');
	var key = '44429452';
	var secret = '558e17bdf663485b94295384059cb1196735451b';
	var opentok = new OpenTok.OpenTokSDK(key, secret);
	var location = 'localhost:3333';

	app.get("/", function(req, res, next) {
		res.render("index.html");
	});

	app.get("/chat/new", function(req, res, next) {
		var location = process.env.SITE_DOMAIN || 'localhost:3333';
		opentok.createSession(location, {'p2p.preference':'enabled'}, function(sessionId) {
			res.redirect("/chat/" + sessionId);
		});
	});

	app.get("/chat/:sessionId", function(req, res, next) {
		var sessionId = req.params.sessionId;
		var token = opentok.generateToken({session_id:sessionId, role: OpenTok.RoleConstants.PUBLISHER});
		res.render("chat.html", {
			sessionId: sessionId,
			token: token
		});
	});

};
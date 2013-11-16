var
	express = require('express'),
	fs = require('fs');

var app = express();

app.use(express.bodyParser());

app.use(express.static( __dirname + "/public" ) );

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

function initRoutes(path) {
	var files = fs.readdirSync(path);
	files.forEach(function(file) {
		var curPath = path + "/" + file;
		if (fs.statSync(curPath).isDirectory()) {
			initRoutes(curPath);
		} else {
			if (curPath.match(/\.js/)) {
				require(curPath)(app);
			}
		}
	});
}
initRoutes(__dirname + "/routes");

app.all('*', function(req, res, next) {
	res.status(404);
	res.json({error: "Not found"});
});

app.use(function(err, req, res, next) {
	if (err) {
		res.status(500);
		res.json({error: err.stack ? err.stack : (err.toString() ? err.toString() : err)});
	} else {
		next();
	}
});

var port = process.env.PORT || 3333;
app.listen(port, function(err) {
	if (err) console.error(err);

	console.log("Running on localhost:" + port);
});
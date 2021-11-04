// const express = require('express');
// const app = express();
// app.use(express.static('static'));
// port = 3200;
// app.listen(port, () => {
//     console.log('server started on port ' + port);
// });

// const express = require('express');
// const app = express();
// app.use(express.static('static'));
// port = 3200;
// app.listen(port, () => {
//     console.log('server started on port ' + port);
// });

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

function readFilesSync(dirpath) {
	const files = [];

	fs.readdirSync(dirpath).forEach((filename) => {
		const name = path.parse(filename).name;
		const ext = path.parse(filename).ext;
		const filepath = path.resolve(dirpath, filename);
		const stat = fs.statSync(filepath);
		const isFile = stat.isFile();
		const filedata = fs.readFileSync(filepath, 'utf8');
		if (isFile) files.push({ filepath, name, ext, stat, filedata });
	});

	files.sort((a, b) => {
		return a.name.localeCompare(b.name, undefined, {
			numeric: true,
			sensitivity: 'base',
		});
	});

	return files;
}

app.get('/allfiles', (req, res) => {
	let dirData = [];
	let data = {};
	let dirpath = path.join(__dirname, '/static/data/');
	const files = readFilesSync(dirpath);
	//console.log('data from files: ');
	files.forEach((e) => {
		//console.log(e.name, e.filedata);
	});
	res.send(files);
});

app.get('/readData', (req, res) => {
	fs.readFile(
		path.join(__dirname, '/static/data/read_me.json'),
		'utf8',
		(err, data) => {
			if (err) {
				console.error(err);
				return JSON.stringify({ msg: 'no data' });
			}
			//console.log(data);
			res.send({ data: data });
		}
	);
});

app.post('/sendData', (req, res) => {
	let data = req.body;
	let write_data = JSON.stringify(req.body);
	let filename = data.filename;
	fs.writeFile(
		path.join(__dirname, '/static/data/' + filename + '.json'),
		write_data,
		(err) => {
			console.log('errors', err);
		}
	);
	//console.log(write_data);
	res.send({ 'success write to file': write_data });
});

app.use(express.static(path.join(__dirname, '/static')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/static/index.htm'));
});

const port = 3200;
app.listen(port, () => console.log('server started on port ' + port));

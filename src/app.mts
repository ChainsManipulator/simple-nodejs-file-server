import * as http from "http";
import { promises as fs, createReadStream, ReadStream } from "fs";
import * as path from "path";
import { MIME_TYPES } from "./mimeTypes.mjs";

const ROOT_PATH: string = path.join(process.cwd(), "./wwwroot");
const HOSTNAME: string = "127.0.0.1";
const PORT: number = 3000;

// flag indicating if url without extension shoud be
// interpreted as a name of html file or as a folder
const ADD_HTML_EXTENSION: boolean = true;

const sendResponse = (res: http.ServerResponse, responseCode: number, data: string, extension: string = "html"): void => {
	const mimeType: string = MIME_TYPES.get(extension);
	res.writeHead(responseCode, { "Content-Type": mimeType });
	res.end(data);
}

const server = http.createServer(async (req, res) => {
	// if request url is emty replacing it with default value
	let url: string = req.url && req.url !== "/" ? req.url : "/index.html";
	const fileName: string = path.basename(url);

	// getting file extension without leading dot
	let extension: string = path.extname(fileName).substring(1).toLowerCase();

	// if there is no file extension
	if (!extension) {
		if (ADD_HTML_EXTENSION) {
			// removing trailing "/" if present
			if (url.endsWith("/")) url = url.slice(0, -1);
			url += ".html";
		} else {
			if (!url.endsWith("/")) url += "/";
			url += "index.html";
		}

		extension = "html";
	}

	let filePath: string = path.join(ROOT_PATH, url);

	const pathUnderRoot: boolean = filePath.startsWith(ROOT_PATH);
	if (!pathUnderRoot) {
		sendResponse(res, 404, `404: Invalid path "${filePath}"`);
		return;
	}

	const mimeType: string = MIME_TYPES.has(extension) ?
		MIME_TYPES.get(extension) :
		MIME_TYPES.get("default");
	/* 
	// alternatevly return 404 for unknown file extensions 
	const supportedExtension: boolean = Boolean(mimeType);
	if (!MIME_TYPES.has(extension)) {
		sendResponse(res, 404, `404: Unsupported file type ${extension}`);
		return;
	}*/

	try {
		// checking if file exists and readable
		await fs.access(filePath, fs.constants.R_OK);

		const stream: ReadStream = createReadStream(filePath);

		res.writeHead(200, { "Content-Type": mimeType });
		stream.pipe(res);

		console.log(`Served file ${filePath} with ${mimeType} mime-type `);
	} catch {
		sendResponse(res, 404, `404: File "${filePath}" not found`);
	}
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

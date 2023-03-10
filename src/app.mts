import * as http from "http";
import { promises as fs, createReadStream, ReadStream } from "fs";
import * as path from "path";

const ROOT_PATH: string = path.join(process.cwd(), "./wwwroot");
const HOSTNAME: string = "127.0.0.1";
const PORT: number = 3000;

const MIME_TYPES = new Map();
MIME_TYPES.set("html", "text/html");
MIME_TYPES.set("css", "text/css");
MIME_TYPES.set("js", "application/javascript");
MIME_TYPES.set("png", "image/png");
MIME_TYPES.set("jpg", "image/jpeg");
MIME_TYPES.set("jpeg", "image/jpeg");
MIME_TYPES.set("gif", "image/gif");
MIME_TYPES.set("json", "application/json");
MIME_TYPES.set("xml", "application/xml");
MIME_TYPES.set("ico", "image/x-icon"); // should be "image/vnd.microsoft.icon" but nobody uses that
MIME_TYPES.set("default", "application/octet-stream");

const sendResponce = (res: http.ServerResponse, responceCode: number, data: string, extension: string = "html") => {
	const mimeType: string = MIME_TYPES.get(extension);
	res.writeHead(responceCode, { "Content-Type": mimeType });
	res.end(data);
}

const server = http.createServer(async (req, res) => {
	const url: string = req.url ?? "/";
	const paths: string[] = [ROOT_PATH, url];

	// if no filename provided using index.html by default
	if (url.endsWith("/")) paths.push("index.html");
	
	// getting file extension without leading dot
	let extension: string = path.extname(url).substring(1).toLowerCase();

	// if there is no file extension then adding "html"
	if (!extension) {
		paths[-1] += ".html";
		extension = "html";
	}

	let filePath: string = path.join(...paths);

	const mimeType: string = MIME_TYPES.has(extension) ?
		MIME_TYPES.get(extension) :
		MIME_TYPES.get("default");
	/* 
	// alternatevly return 404 for unknown file extensions 
	const supportedExtension: boolean = Boolean(mimeType);
	if (!MIME_TYPES.has(extension)) {
		sendResponce(res, 404, `404: Unsupported file type ${extension}`);
		return;
	}*/

	const pathUnderRoot: boolean = filePath.startsWith(ROOT_PATH);
	if (!pathUnderRoot) {
		sendResponce(res, 404, `404: Invalid path "${filePath}"`);
		return;
	}

	try {
		// checking if file exists and readable
		await fs.access(filePath, fs.constants.R_OK);

		const stream: ReadStream = createReadStream(filePath);

		res.writeHead(200, { "Content-Type": mimeType });
		stream.pipe(res);

		console.log(`Served file ${filePath} with ${mimeType} mime-type `);
	} catch {
		sendResponce(res, 404, `404: File "${filePath}" not found`);
	}
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
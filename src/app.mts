import * as http from "http";
import { promises as fs, createReadStream, ReadStream } from "fs";
import * as path from "path";
import MIME_TYPES from "./mimeTypes.mjs";
import * as settings from "./serverSettings.mjs";

const ROOT_PATH: string = path.join(process.cwd(), settings.RELATIVE_PATH);

const sendTextResponse = (res: http.ServerResponse, responseCode: number, data: string): void => {
	res.writeHead(responseCode, { "Content-Type": MIME_TYPES.get("txt") });
	res.end(data);
}

const sendResponseFile = async (res: http.ServerResponse, filePath: string, mimeType: string): Promise<void> => {
	// checking if file exists and readable
	await fs.access(filePath, fs.constants.R_OK);

	const stream: ReadStream = createReadStream(filePath);

	res.writeHead(200, { "Content-Type": mimeType });
	stream.pipe(res);
}

const server = http.createServer(async (req, res) => {
	// if request url is emty replacing it with default value
	let url: string = req.url && req.url !== "/" ? req.url : "/index.html";

	const fileName: string = path.basename(url);

	// getting file extension without leading dot
	let extension: string = path.extname(fileName).substring(1).toLowerCase();

	// if there is no file extension
	if (!extension) {
		extension = "html";
		if (settings.ADD_HTML_EXTENSION) {
			// removing trailing "/" if present
			if (url.endsWith("/")) url = url.slice(0, -1);
			url += ".html";
		} else {
			if (!url.endsWith("/")) url += "/";
			url += "index.html";
		}
	}

	const isExtensionKnown: boolean = MIME_TYPES.has(extension);
	const mimeType: string = MIME_TYPES.get(extension) ?? settings.DEFAULT_MIME_TYPE;

	if (!isExtensionKnown && settings.REFUSE_UNKNOWN_EXTENSIONS) {
		// return 404 for unknown file extensions 
		sendTextResponse(res, 404, `404: Unsupported file type ${extension}`);
		return;
	}

	let filePath: string = path.join(ROOT_PATH, url);

	const pathUnderRoot: boolean = filePath.startsWith(ROOT_PATH);
	if (!pathUnderRoot) {
		if (settings.RETURN_404_PAGE && extension === "html") {
			filePath = path.join(ROOT_PATH, "/404.html");
		} else {
			sendTextResponse(res, 404, `404: Invalid path "${filePath}"`);
			return;
		}
	}

	try {
		await sendResponseFile(res, filePath, mimeType);

		console.log(`Served file ${filePath} with ${mimeType} mime-type `);
	} catch {
		if (settings.RETURN_404_PAGE && extension === "html") {
			try {
				filePath = path.join(ROOT_PATH, "/404.html");
				await sendResponseFile(res, filePath, mimeType);
			} catch {
				// if there is no 404.html file sending plain text message
				sendTextResponse(res, 404, `404: File "${filePath}" not found`);
			}
		}
		else {
			sendTextResponse(res, 404, `404: File "${filePath}" not found`);
		}
	}
});

server.listen(settings.PORT, settings.HOSTNAME, () => {
	console.log(`Server running at http://${settings.HOSTNAME}:${settings.PORT}/`);
});

const settingsMap: Map<string, boolean | string | number> = new Map();

// trying to read settings from environment variables 
// if none present then setting default values 
settingsMap.set("HOSTNAME", process.env.HOSTNAME ?? "127.0.0.1");
settingsMap.set("PORT", process.env.PORT ?? 3000);
settingsMap.set("RELATIVE_PATH", process.env.RELATIVE_PATH ?? "./wwwroot");
settingsMap.set("ADD_HTML_EXTENSION", process.env.ADD_HTML_EXTENSION ?? true);
settingsMap.set("RETURN_404_PAGE", process.env.RETURN_404_PAGE ?? true);
settingsMap.set("REFUSE_UNKNOWN_EXTENSIONS", process.env.REFUSE_UNKNOWN_EXTENSIONS ?? false);

export const HOSTNAME: string = settingsMap.get("HOSTNAME") as string;
export const PORT: number = Number(settingsMap.get("PORT"));

// client-side code location
export const RELATIVE_PATH: string = settingsMap.get("RELATIVE_PATH") as string;

// flag indicating if url without extension shoud be
// interpreted as a name of html file or as a folder
export const ADD_HTML_EXTENSION: boolean = Boolean(settingsMap.get("ADD_HTML_EXTENSION"));

// flag indicating if for html page 404 page returned 
// when file not found or just a text message
export const RETURN_404_PAGE: boolean = Boolean(settingsMap.get("RETURN_404_PAGE"));

// flag indicating if server should only 
// return files with known mime types
export const REFUSE_UNKNOWN_EXTENSIONS: boolean = Boolean(settingsMap.get("REFUSE_UNKNOWN_EXTENSIONS"));
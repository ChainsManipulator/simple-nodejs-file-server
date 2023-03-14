const MIME_TYPES: Map<string, string> = new Map();

MIME_TYPES.set("epub", "application/epub+zip");
MIME_TYPES.set("gz", "application/gzip");
MIME_TYPES.set("jar", "application/java-archive");
MIME_TYPES.set("js", "application/javascript");
MIME_TYPES.set("mjs", "application/javascript");
MIME_TYPES.set("json", "application/json");
MIME_TYPES.set("jsonld", "application/ld+json");
MIME_TYPES.set("doc", "application/msword");
MIME_TYPES.set("ogg", "application/ogg");
MIME_TYPES.set("ogx", "application/ogg");
MIME_TYPES.set("pdf", "application/pdf");
MIME_TYPES.set("rtf", "application/rtf");
MIME_TYPES.set("azw", "application/vnd.amazon.ebook");
MIME_TYPES.set("xls", "application/vnd.ms-excel");
MIME_TYPES.set("eot", "application/vnd.ms-fontobject");
MIME_TYPES.set(".ppt", "application/vnd.ms-powerpoint");
MIME_TYPES.set("odp", "application/vnd.oasis.opendocument.presentation");
MIME_TYPES.set("ods", "application/vnd.oasis.opendocument.spreadsheet");
MIME_TYPES.set("odt", "application/vnd.oasis.opendocument.text");
MIME_TYPES.set("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
MIME_TYPES.set("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
MIME_TYPES.set("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
MIME_TYPES.set("rar", "application/vnd.rar");
MIME_TYPES.set("vsd", "application/vnd.visio");
MIME_TYPES.set("7z", "application/x-7z-compressed");
MIME_TYPES.set("abw", "application/x-abiword");
MIME_TYPES.set("bz", "application/x-bzip");
MIME_TYPES.set("bz2", "application/x-bzip2");
MIME_TYPES.set("cda", "application/x-cdf");
MIME_TYPES.set("csh", "application/x-csh");
MIME_TYPES.set("arc", "application/x-freearc");
MIME_TYPES.set("php", "application/x-httpd-php");
MIME_TYPES.set("sh", "application/x-sh");
MIME_TYPES.set("tar", "application/x-tar");
MIME_TYPES.set("xhtml", "application/xhtml+xml");
MIME_TYPES.set("xml", "application/xml");
MIME_TYPES.set("zip", "application/zip");

MIME_TYPES.set("aac", "audio/aac");
MIME_TYPES.set("mid", "audio/midi");
MIME_TYPES.set("midi", "audio/midi");
MIME_TYPES.set("mp3", "audio/mpeg");
MIME_TYPES.set("oga", "audio/ogg");
MIME_TYPES.set("opus", "audio/opus");
MIME_TYPES.set("wav", "audio/wav");
MIME_TYPES.set("weba", "audio/webm");

MIME_TYPES.set("otf", "font/otf");
MIME_TYPES.set("ttf", "font/ttf");
MIME_TYPES.set("woff", "font/woff");
MIME_TYPES.set("woff2", "font/woff2");

MIME_TYPES.set("avif", "image/avif");
MIME_TYPES.set("bmp", "image/bmp");
MIME_TYPES.set("gif", "image/gif");
MIME_TYPES.set("jpg", "image/jpeg");
MIME_TYPES.set("jpeg", "image/jpeg");
MIME_TYPES.set("png", "image/png");
MIME_TYPES.set("svg", "image/svg+xml");
MIME_TYPES.set("tif", "image/tiff");
MIME_TYPES.set("tiff", "image/tiff");
MIME_TYPES.set("webp", "image/webp");
MIME_TYPES.set("ico", "image/x-icon"); // should be "image/vnd.microsoft.icon" but nobody uses that

MIME_TYPES.set("ics", "text/calendar");
MIME_TYPES.set("css", "text/css");
MIME_TYPES.set("csv", "text/csv");
MIME_TYPES.set("htm", "text/html");
MIME_TYPES.set("html", "text/html");
MIME_TYPES.set("txt", "text/plain");

MIME_TYPES.set("ts", "video/mp2t");
MIME_TYPES.set("mp4", "video/mp4");
MIME_TYPES.set("mpeg", "video/mpeg");
MIME_TYPES.set("ogv", "video/ogg");
MIME_TYPES.set("webm", "video/webm");
MIME_TYPES.set("avi", "video/x-msvideo");

MIME_TYPES.set("default", "application/octet-stream");

export default MIME_TYPES;

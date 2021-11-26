import { url } from "inspector";
import { UrlWithParsedQuery, parse } from "url";

export class UrlLogin {
    public static parseUrl (url: string): UrlWithParsedQuery {
        return parse(url, true)
    }
}
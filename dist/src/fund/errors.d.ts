export declare const defaultAddressNotFound = "Fundme.js: default address not found. Use setDefaultAddress(str: string) to set it first.";
export declare const invalidAddress = "Fundme.js: Invalid Web Monetization pointer address is given.";
export declare const addressNotFound = "Fundme.js: address not found.";
export declare const addressIsNotAString = "Fundme.js: address must be a string.";
export declare const weightNotFound = "Fundme.js: entries .weight not found.";
export declare function weightIsNotANumber(str: string): string;
export declare const metaTagNotFound = "Fundme.js: web monetization meta tag is not found.";
export declare const metaTagMultipleIsFound = "Fundme.js: multiple <meta name=\"monetization\" /> found - Web Monetization API only support a single meta tag.";
export declare const noTemplateFound = "Fundme.js: no monetization template is found.";
export declare const failParsingTemplate = "Fundme.js: fails to parse address from <template data-fund></template>.";
export declare const templateSinglePointerHasWeight = "Fundme.js: found single <template data-fund></template> but has weight - only address will be parsed.";
export declare const cannotParseScriptJson = "Fundme.js: cannot parse JSON from <script fundme>. Make sure it contains a valid JSON.";
export declare const jsonTemplateIsNotArray = "Fundme.js: found <script fundme> but it's not an array.";
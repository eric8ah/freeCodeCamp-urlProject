var validUrl = require('valid-url');
var validator = require('validator');
var protocols = { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false };

var url = "www";
if (validator.isURL(url, protocols)) {
    console.log('Looks like an URI');
} 
else {
    console.log('Not a URI');
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const STATUS = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANTENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    UPGRADE_REQUIRED: 426,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    PROCESSING: 102,
    MULTI_STATUS: 207,
    IM_USED: 226,
    PERMANENT_REDIRECT: 308,
    UNPROCESSABLE_ENTRY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    NETWORK_AUTHENTICATION_REQUIRED: 511
};
/*tslint:disable:quotemark max-line-length one-line */
/** @type {?} */
export const STATUS_CODE_INFO = {
    '100': {
        'code': 100,
        'text': 'Continue',
        'description': '\"The initial part of a request has been received and has not yet been rejected by the server.\"',
        'spec_title': 'RFC7231#6.2.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.2.1'
    },
    '101': {
        'code': 101,
        'text': 'Switching Protocols',
        'description': '\"The server understands and is willing to comply with the client\'s request, via the Upgrade header field, for a change in the application protocol being used on this connection.\"',
        'spec_title': 'RFC7231#6.2.2',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.2.2'
    },
    '200': {
        'code': 200,
        'text': 'OK',
        'description': '\"The request has succeeded.\"',
        'spec_title': 'RFC7231#6.3.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.3.1'
    },
    '201': {
        'code': 201,
        'text': 'Created',
        'description': '\"The request has been fulfilled and has resulted in one or more new resources being created.\"',
        'spec_title': 'RFC7231#6.3.2',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.3.2'
    },
    '202': {
        'code': 202,
        'text': 'Accepted',
        'description': '\"The request has been accepted for processing, but the processing has not been completed.\"',
        'spec_title': 'RFC7231#6.3.3',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.3.3'
    },
    '203': {
        'code': 203,
        'text': 'Non-Authoritative Information',
        'description': '\"The request was successful but the enclosed payload has been modified from that of the origin server\'s 200 (OK) response by a transforming proxy.\"',
        'spec_title': 'RFC7231#6.3.4',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.3.4'
    },
    '204': {
        'code': 204,
        'text': 'No Content',
        'description': '\"The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.\"',
        'spec_title': 'RFC7231#6.3.5',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.3.5'
    },
    '205': {
        'code': 205,
        'text': 'Reset Content',
        'description': '\"The server has fulfilled the request and desires that the user agent reset the \"document view\", which caused the request to be sent, to its original state as received from the origin server.\"',
        'spec_title': 'RFC7231#6.3.6',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.3.6'
    },
    '206': {
        'code': 206,
        'text': 'Partial Content',
        'description': '\"The server is successfully fulfilling a range request for the target resource by transferring one or more parts of the selected representation that correspond to the satisfiable ranges found in the requests\'s Range header field.\"',
        'spec_title': 'RFC7233#4.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7233#section-4.1'
    },
    '300': {
        'code': 300,
        'text': 'Multiple Choices',
        'description': '\"The target resource has more than one representation, each with its own more specific identifier, and information about the alternatives is being provided so that the user (or user agent) can select a preferred representation by redirecting its request to one or more of those identifiers.\"',
        'spec_title': 'RFC7231#6.4.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.4.1'
    },
    '301': {
        'code': 301,
        'text': 'Moved Permanently',
        'description': '\"The target resource has been assigned a new permanent URI and any future references to this resource ought to use one of the enclosed URIs.\"',
        'spec_title': 'RFC7231#6.4.2',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.4.2'
    },
    '302': {
        'code': 302,
        'text': 'Found',
        'description': '\"The target resource resides temporarily under a different URI.\"',
        'spec_title': 'RFC7231#6.4.3',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.4.3'
    },
    '303': {
        'code': 303,
        'text': 'See Other',
        'description': '\"The server is redirecting the user agent to a different resource, as indicated by a URI in the Location header field, that is intended to provide an indirect response to the original request.\"',
        'spec_title': 'RFC7231#6.4.4',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.4.4'
    },
    '304': {
        'code': 304,
        'text': 'Not Modified',
        'description': '\"A conditional GET request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition has evaluated to false.\"',
        'spec_title': 'RFC7232#4.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7232#section-4.1'
    },
    '305': {
        'code': 305,
        'text': 'Use Proxy',
        'description': '*deprecated*',
        'spec_title': 'RFC7231#6.4.5',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.4.5'
    },
    '307': {
        'code': 307,
        'text': 'Temporary Redirect',
        'description': '\"The target resource resides temporarily under a different URI and the user agent MUST NOT change the request method if it performs an automatic redirection to that URI.\"',
        'spec_title': 'RFC7231#6.4.7',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.4.7'
    },
    '400': {
        'code': 400,
        'text': 'Bad Request',
        'description': '\"The server cannot or will not process the request because the received syntax is invalid, nonsensical, or exceeds some limitation on what the server is willing to process.\"',
        'spec_title': 'RFC7231#6.5.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.1'
    },
    '401': {
        'code': 401,
        'text': 'Unauthorized',
        'description': '\"The request has not been applied because it lacks valid authentication credentials for the target resource.\"',
        'spec_title': 'RFC7235#6.3.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7235#section-3.1'
    },
    '402': {
        'code': 402,
        'text': 'Payment Required',
        'description': '*reserved*',
        'spec_title': 'RFC7231#6.5.2',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.2'
    },
    '403': {
        'code': 403,
        'text': 'Forbidden',
        'description': '\"The server understood the request but refuses to authorize it.\"',
        'spec_title': 'RFC7231#6.5.3',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.3'
    },
    '404': {
        'code': 404,
        'text': 'Not Found',
        'description': '\"The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.\"',
        'spec_title': 'RFC7231#6.5.4',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.4'
    },
    '405': {
        'code': 405,
        'text': 'Method Not Allowed',
        'description': '\"The method specified in the request-line is known by the origin server but not supported by the target resource.\"',
        'spec_title': 'RFC7231#6.5.5',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.5'
    },
    '406': {
        'code': 406,
        'text': 'Not Acceptable',
        'description': '\"The target resource does not have a current representation that would be acceptable to the user agent, according to the proactive negotiation header fields received in the request, and the server is unwilling to supply a default representation.\"',
        'spec_title': 'RFC7231#6.5.6',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.6'
    },
    '407': {
        'code': 407,
        'text': 'Proxy Authentication Required',
        'description': '\"The client needs to authenticate itself in order to use a proxy.\"',
        'spec_title': 'RFC7231#6.3.2',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.3.2'
    },
    '408': {
        'code': 408,
        'text': 'Request Timeout',
        'description': '\"The server did not receive a complete request message within the time that it was prepared to wait.\"',
        'spec_title': 'RFC7231#6.5.7',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.7'
    },
    '409': {
        'code': 409,
        'text': 'Conflict',
        'description': '\"The request could not be completed due to a conflict with the current state of the resource.\"',
        'spec_title': 'RFC7231#6.5.8',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.8'
    },
    '410': {
        'code': 410,
        'text': 'Gone',
        'description': '\"Access to the target resource is no longer available at the origin server and that this condition is likely to be permanent.\"',
        'spec_title': 'RFC7231#6.5.9',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.9'
    },
    '411': {
        'code': 411,
        'text': 'Length Required',
        'description': '\"The server refuses to accept the request without a defined Content-Length.\"',
        'spec_title': 'RFC7231#6.5.10',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.10'
    },
    '412': {
        'code': 412,
        'text': 'Precondition Failed',
        'description': '\"One or more preconditions given in the request header fields evaluated to false when tested on the server.\"',
        'spec_title': 'RFC7232#4.2',
        'spec_href': 'http://tools.ietf.org/html/rfc7232#section-4.2'
    },
    '413': {
        'code': 413,
        'text': 'Payload Too Large',
        'description': '\"The server is refusing to process a request because the request payload is larger than the server is willing or able to process.\"',
        'spec_title': 'RFC7231#6.5.11',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.11'
    },
    '414': {
        'code': 414,
        'text': 'URI Too Long',
        'description': '\"The server is refusing to service the request because the request-target is longer than the server is willing to interpret.\"',
        'spec_title': 'RFC7231#6.5.12',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.12'
    },
    '415': {
        'code': 415,
        'text': 'Unsupported Media Type',
        'description': '\"The origin server is refusing to service the request because the payload is in a format not supported by the target resource for this method.\"',
        'spec_title': 'RFC7231#6.5.13',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.13'
    },
    '416': {
        'code': 416,
        'text': 'Range Not Satisfiable',
        'description': '\"None of the ranges in the request\'s Range header field overlap the current extent of the selected resource or that the set of ranges requested has been rejected due to invalid ranges or an excessive request of small or overlapping ranges.\"',
        'spec_title': 'RFC7233#4.4',
        'spec_href': 'http://tools.ietf.org/html/rfc7233#section-4.4'
    },
    '417': {
        'code': 417,
        'text': 'Expectation Failed',
        'description': '\"The expectation given in the request\'s Expect header field could not be met by at least one of the inbound servers.\"',
        'spec_title': 'RFC7231#6.5.14',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.14'
    },
    '418': {
        'code': 418,
        'text': 'I\'m a teapot',
        'description': '\"1988 April Fools Joke. Returned by tea pots requested to brew coffee.\"',
        'spec_title': 'RFC 2324',
        'spec_href': 'https://tools.ietf.org/html/rfc2324'
    },
    '426': {
        'code': 426,
        'text': 'Upgrade Required',
        'description': '\"The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.\"',
        'spec_title': 'RFC7231#6.5.15',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.5.15'
    },
    '500': {
        'code': 500,
        'text': 'Internal Server Error',
        'description': '\"The server encountered an unexpected condition that prevented it from fulfilling the request.\"',
        'spec_title': 'RFC7231#6.6.1',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.6.1'
    },
    '501': {
        'code': 501,
        'text': 'Not Implemented',
        'description': '\"The server does not support the functionality required to fulfill the request.\"',
        'spec_title': 'RFC7231#6.6.2',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.6.2'
    },
    '502': {
        'code': 502,
        'text': 'Bad Gateway',
        'description': '\"The server, while acting as a gateway or proxy, received an invalid response from an inbound server it accessed while attempting to fulfill the request.\"',
        'spec_title': 'RFC7231#6.6.3',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.6.3'
    },
    '503': {
        'code': 503,
        'text': 'Service Unavailable',
        'description': '\"The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.\"',
        'spec_title': 'RFC7231#6.6.4',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.6.4'
    },
    '504': {
        'code': 504,
        'text': 'Gateway Time-out',
        'description': '\"The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server it needed to access in order to complete the request.\"',
        'spec_title': 'RFC7231#6.6.5',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.6.5'
    },
    '505': {
        'code': 505,
        'text': 'HTTP Version Not Supported',
        'description': '\"The server does not support, or refuses to support, the protocol version that was used in the request message.\"',
        'spec_title': 'RFC7231#6.6.6',
        'spec_href': 'http://tools.ietf.org/html/rfc7231#section-6.6.6'
    },
    '102': {
        'code': 102,
        'text': 'Processing',
        'description': '\"An interim response to inform the client that the server has accepted the complete request, but has not yet completed it.\"',
        'spec_title': 'RFC5218#10.1',
        'spec_href': 'http://tools.ietf.org/html/rfc2518#section-10.1'
    },
    '207': {
        'code': 207,
        'text': 'Multi-Status',
        'description': '\"Status for multiple independent operations.\"',
        'spec_title': 'RFC5218#10.2',
        'spec_href': 'http://tools.ietf.org/html/rfc2518#section-10.2'
    },
    '226': {
        'code': 226,
        'text': 'IM Used',
        'description': '\"The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.\"',
        'spec_title': 'RFC3229#10.4.1',
        'spec_href': 'http://tools.ietf.org/html/rfc3229#section-10.4.1'
    },
    '308': {
        'code': 308,
        'text': 'Permanent Redirect',
        'description': '\"The target resource has been assigned a new permanent URI and any future references to this resource SHOULD use one of the returned URIs. [...] This status code is similar to 301 Moved Permanently (Section 7.3.2 of rfc7231), except that it does not allow rewriting the request method from POST to GET.\"',
        'spec_title': 'RFC7238',
        'spec_href': 'http://tools.ietf.org/html/rfc7238'
    },
    '422': {
        'code': 422,
        'text': 'Unprocessable Entity',
        'description': '\"The server understands the content type of the request entity (hence a 415(Unsupported Media Type) status code is inappropriate), and the syntax of the request entity is correct (thus a 400 (Bad Request) status code is inappropriate) but was unable to process the contained instructions.\"',
        'spec_title': 'RFC5218#10.3',
        'spec_href': 'http://tools.ietf.org/html/rfc2518#section-10.3'
    },
    '423': {
        'code': 423,
        'text': 'Locked',
        'description': '\"The source or destination resource of a method is locked.\"',
        'spec_title': 'RFC5218#10.4',
        'spec_href': 'http://tools.ietf.org/html/rfc2518#section-10.4'
    },
    '424': {
        'code': 424,
        'text': 'Failed Dependency',
        'description': '\"The method could not be performed on the resource because the requested action depended on another action and that action failed.\"',
        'spec_title': 'RFC5218#10.5',
        'spec_href': 'http://tools.ietf.org/html/rfc2518#section-10.5'
    },
    '428': {
        'code': 428,
        'text': 'Precondition Required',
        'description': '\"The origin server requires the request to be conditional.\"',
        'spec_title': 'RFC6585#3',
        'spec_href': 'http://tools.ietf.org/html/rfc6585#section-3'
    },
    '429': {
        'code': 429,
        'text': 'Too Many Requests',
        'description': '\"The user has sent too many requests in a given amount of time (\"rate limiting\").\"',
        'spec_title': 'RFC6585#4',
        'spec_href': 'http://tools.ietf.org/html/rfc6585#section-4'
    },
    '431': {
        'code': 431,
        'text': 'Request Header Fields Too Large',
        'description': '\"The server is unwilling to process the request because its header fields are too large.\"',
        'spec_title': 'RFC6585#5',
        'spec_href': 'http://tools.ietf.org/html/rfc6585#section-5'
    },
    '451': {
        'code': 451,
        'text': 'Unavailable For Legal Reasons',
        'description': '\"The server is denying access to the resource in response to a legal demand.\"',
        'spec_title': 'draft-ietf-httpbis-legally-restricted-status',
        'spec_href': 'http://tools.ietf.org/html/draft-ietf-httpbis-legally-restricted-status'
    },
    '506': {
        'code': 506,
        'text': 'Variant Also Negotiates',
        'description': '\"The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.\"',
        'spec_title': 'RFC2295#8.1',
        'spec_href': 'http://tools.ietf.org/html/rfc2295#section-8.1'
    },
    '507': {
        'code': 507,
        'text': 'Insufficient Storage',
        'description': '\The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.\"',
        'spec_title': 'RFC5218#10.6',
        'spec_href': 'http://tools.ietf.org/html/rfc2518#section-10.6'
    },
    '511': {
        'code': 511,
        'text': 'Network Authentication Required',
        'description': '\"The client needs to authenticate to gain network access.\"',
        'spec_title': 'RFC6585#6',
        'spec_href': 'http://tools.ietf.org/html/rfc6585#section-6'
    }
};
/**
 * get the status text from StatusCode
 * @param {?} status
 * @return {?}
 */
export function getStatusText(status) {
    return STATUS_CODE_INFO[status].text || 'Unknown Status';
}
/**
 * Returns true if the the Http Status Code is 200-299 (success)
 * @param {?} status
 * @return {?}
 */
export function isSuccess(status) { return status >= 200 && status < 300; }
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1zdGF0dXMtY29kZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWluLW1lbW9yeS13ZWItYXBpLyIsInNvdXJjZXMiOlsiaHR0cC1zdGF0dXMtY29kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLE9BQU8sTUFBTSxHQUFHO0lBQ3BCLFFBQVEsRUFBRSxHQUFHO0lBQ2IsbUJBQW1CLEVBQUUsR0FBRztJQUN4QixFQUFFLEVBQUUsR0FBRztJQUNQLE9BQU8sRUFBRSxHQUFHO0lBQ1osUUFBUSxFQUFFLEdBQUc7SUFDYiw2QkFBNkIsRUFBRSxHQUFHO0lBQ2xDLFVBQVUsRUFBRSxHQUFHO0lBQ2YsYUFBYSxFQUFFLEdBQUc7SUFDbEIsZUFBZSxFQUFFLEdBQUc7SUFDcEIsZ0JBQWdCLEVBQUUsR0FBRztJQUNyQixrQkFBa0IsRUFBRSxHQUFHO0lBQ3ZCLEtBQUssRUFBRSxHQUFHO0lBQ1YsU0FBUyxFQUFFLEdBQUc7SUFDZCxZQUFZLEVBQUUsR0FBRztJQUNqQixTQUFTLEVBQUUsR0FBRztJQUNkLGtCQUFrQixFQUFFLEdBQUc7SUFDdkIsV0FBVyxFQUFFLEdBQUc7SUFDaEIsWUFBWSxFQUFFLEdBQUc7SUFDakIsZ0JBQWdCLEVBQUUsR0FBRztJQUNyQixTQUFTLEVBQUUsR0FBRztJQUNkLFNBQVMsRUFBRSxHQUFHO0lBQ2Qsa0JBQWtCLEVBQUUsR0FBRztJQUN2QixjQUFjLEVBQUUsR0FBRztJQUNuQiw2QkFBNkIsRUFBRSxHQUFHO0lBQ2xDLGVBQWUsRUFBRSxHQUFHO0lBQ3BCLFFBQVEsRUFBRSxHQUFHO0lBQ2IsSUFBSSxFQUFFLEdBQUc7SUFDVCxlQUFlLEVBQUUsR0FBRztJQUNwQixtQkFBbUIsRUFBRSxHQUFHO0lBQ3hCLGdCQUFnQixFQUFFLEdBQUc7SUFDckIsWUFBWSxFQUFFLEdBQUc7SUFDakIsc0JBQXNCLEVBQUUsR0FBRztJQUMzQixxQkFBcUIsRUFBRSxHQUFHO0lBQzFCLGtCQUFrQixFQUFFLEdBQUc7SUFDdkIsV0FBVyxFQUFFLEdBQUc7SUFDaEIsZ0JBQWdCLEVBQUUsR0FBRztJQUNyQixxQkFBcUIsRUFBRSxHQUFHO0lBQzFCLGVBQWUsRUFBRSxHQUFHO0lBQ3BCLFdBQVcsRUFBRSxHQUFHO0lBQ2hCLG1CQUFtQixFQUFFLEdBQUc7SUFDeEIsZUFBZSxFQUFFLEdBQUc7SUFDcEIsMEJBQTBCLEVBQUUsR0FBRztJQUMvQixVQUFVLEVBQUUsR0FBRztJQUNmLFlBQVksRUFBRSxHQUFHO0lBQ2pCLE9BQU8sRUFBRSxHQUFHO0lBQ1osa0JBQWtCLEVBQUUsR0FBRztJQUN2QixtQkFBbUIsRUFBRSxHQUFHO0lBQ3hCLE1BQU0sRUFBRSxHQUFHO0lBQ1gsaUJBQWlCLEVBQUUsR0FBRztJQUN0QixxQkFBcUIsRUFBRSxHQUFHO0lBQzFCLGlCQUFpQixFQUFFLEdBQUc7SUFDdEIsK0JBQStCLEVBQUUsR0FBRztJQUNwQyw2QkFBNkIsRUFBRSxHQUFHO0lBQ2xDLHVCQUF1QixFQUFFLEdBQUc7SUFDNUIsb0JBQW9CLEVBQUUsR0FBRztJQUN6QiwrQkFBK0IsRUFBRSxHQUFHO0NBQ3JDOzs7QUFHRCxNQUFNLE9BQU8sZ0JBQWdCLEdBQUc7SUFDOUIsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsVUFBVTtRQUNsQixhQUFhLEVBQUUsa0dBQWtHO1FBQ2pILFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsYUFBYSxFQUFFLHVMQUF1TDtRQUN0TSxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsSUFBSTtRQUNaLGFBQWEsRUFBRSxnQ0FBZ0M7UUFDL0MsWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLFNBQVM7UUFDakIsYUFBYSxFQUFFLGlHQUFpRztRQUNoSCxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsVUFBVTtRQUNsQixhQUFhLEVBQUUsOEZBQThGO1FBQzdHLFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSwrQkFBK0I7UUFDdkMsYUFBYSxFQUFFLHdKQUF3SjtRQUN2SyxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsWUFBWTtRQUNwQixhQUFhLEVBQUUscUlBQXFJO1FBQ3BKLFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLGFBQWEsRUFBRSxzTUFBc007UUFDck4sWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixhQUFhLEVBQUUsMk9BQTJPO1FBQzFQLFlBQVksRUFBRSxhQUFhO1FBQzNCLFdBQVcsRUFBRSxnREFBZ0Q7S0FDOUQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsYUFBYSxFQUFFLHVTQUF1UztRQUN0VCxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLGFBQWEsRUFBRSxpSkFBaUo7UUFDaEssWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLE9BQU87UUFDZixhQUFhLEVBQUUsb0VBQW9FO1FBQ25GLFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxXQUFXO1FBQ25CLGFBQWEsRUFBRSxxTUFBcU07UUFDcE4sWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLGNBQWM7UUFDdEIsYUFBYSxFQUFFLHVLQUF1SztRQUN0TCxZQUFZLEVBQUUsYUFBYTtRQUMzQixXQUFXLEVBQUUsZ0RBQWdEO0tBQzlEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsV0FBVztRQUNuQixhQUFhLEVBQUUsY0FBYztRQUM3QixZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLGFBQWEsRUFBRSw4S0FBOEs7UUFDN0wsWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLGFBQWE7UUFDckIsYUFBYSxFQUFFLGlMQUFpTDtRQUNoTSxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsY0FBYztRQUN0QixhQUFhLEVBQUUsaUhBQWlIO1FBQ2hJLFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxnREFBZ0Q7S0FDOUQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsYUFBYSxFQUFFLFlBQVk7UUFDM0IsWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLFdBQVc7UUFDbkIsYUFBYSxFQUFFLG9FQUFvRTtRQUNuRixZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsV0FBVztRQUNuQixhQUFhLEVBQUUsb0lBQW9JO1FBQ25KLFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsYUFBYSxFQUFFLHNIQUFzSDtRQUNySSxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLGFBQWEsRUFBRSwwUEFBMFA7UUFDelEsWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLCtCQUErQjtRQUN2QyxhQUFhLEVBQUUsc0VBQXNFO1FBQ3JGLFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsYUFBYSxFQUFFLHlHQUF5RztRQUN4SCxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsVUFBVTtRQUNsQixhQUFhLEVBQUUsa0dBQWtHO1FBQ2pILFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxNQUFNO1FBQ2QsYUFBYSxFQUFFLGtJQUFrSTtRQUNqSixZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLGFBQWEsRUFBRSxnRkFBZ0Y7UUFDL0YsWUFBWSxFQUFFLGdCQUFnQjtRQUM5QixXQUFXLEVBQUUsbURBQW1EO0tBQ2pFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUscUJBQXFCO1FBQzdCLGFBQWEsRUFBRSxnSEFBZ0g7UUFDL0gsWUFBWSxFQUFFLGFBQWE7UUFDM0IsV0FBVyxFQUFFLGdEQUFnRDtLQUM5RDtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixhQUFhLEVBQUUsc0lBQXNJO1FBQ3JKLFlBQVksRUFBRSxnQkFBZ0I7UUFDOUIsV0FBVyxFQUFFLG1EQUFtRDtLQUNqRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLGNBQWM7UUFDdEIsYUFBYSxFQUFFLGlJQUFpSTtRQUNoSixZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFdBQVcsRUFBRSxtREFBbUQ7S0FDakU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSx3QkFBd0I7UUFDaEMsYUFBYSxFQUFFLG1KQUFtSjtRQUNsSyxZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFdBQVcsRUFBRSxtREFBbUQ7S0FDakU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsYUFBYSxFQUFFLHFQQUFxUDtRQUNwUSxZQUFZLEVBQUUsYUFBYTtRQUMzQixXQUFXLEVBQUUsZ0RBQWdEO0tBQzlEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLGFBQWEsRUFBRSwwSEFBMEg7UUFDekksWUFBWSxFQUFFLGdCQUFnQjtRQUM5QixXQUFXLEVBQUUsbURBQW1EO0tBQ2pFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsZUFBZTtRQUN2QixhQUFhLEVBQUUsMkVBQTJFO1FBQzFGLFlBQVksRUFBRSxVQUFVO1FBQ3hCLFdBQVcsRUFBRSxxQ0FBcUM7S0FDbkQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsYUFBYSxFQUFFLDJKQUEySjtRQUMxSyxZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFdBQVcsRUFBRSxtREFBbUQ7S0FDakU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsYUFBYSxFQUFFLG1HQUFtRztRQUNsSCxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLGFBQWEsRUFBRSxvRkFBb0Y7UUFDbkcsWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLGFBQWE7UUFDckIsYUFBYSxFQUFFLDhKQUE4SjtRQUM3SyxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUscUJBQXFCO1FBQzdCLGFBQWEsRUFBRSxrS0FBa0s7UUFDakwsWUFBWSxFQUFFLGVBQWU7UUFDN0IsV0FBVyxFQUFFLGtEQUFrRDtLQUNoRTtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixhQUFhLEVBQUUscUtBQXFLO1FBQ3BMLFlBQVksRUFBRSxlQUFlO1FBQzdCLFdBQVcsRUFBRSxrREFBa0Q7S0FDaEU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSw0QkFBNEI7UUFDcEMsYUFBYSxFQUFFLG9IQUFvSDtRQUNuSSxZQUFZLEVBQUUsZUFBZTtRQUM3QixXQUFXLEVBQUUsa0RBQWtEO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsWUFBWTtRQUNwQixhQUFhLEVBQUUsK0hBQStIO1FBQzlJLFlBQVksRUFBRSxjQUFjO1FBQzVCLFdBQVcsRUFBRSxpREFBaUQ7S0FDL0Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLGFBQWEsRUFBRSxpREFBaUQ7UUFDaEUsWUFBWSxFQUFFLGNBQWM7UUFDNUIsV0FBVyxFQUFFLGlEQUFpRDtLQUMvRDtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLFNBQVM7UUFDakIsYUFBYSxFQUFFLHdMQUF3TDtRQUN2TSxZQUFZLEVBQUUsZ0JBQWdCO1FBQzlCLFdBQVcsRUFBRSxtREFBbUQ7S0FDakU7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsYUFBYSxFQUFFLG1UQUFtVDtRQUNsVSxZQUFZLEVBQUUsU0FBUztRQUN2QixXQUFXLEVBQUUsb0NBQW9DO0tBQ2xEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsc0JBQXNCO1FBQzlCLGFBQWEsRUFBRSxxU0FBcVM7UUFDcFQsWUFBWSxFQUFFLGNBQWM7UUFDNUIsV0FBVyxFQUFFLGlEQUFpRDtLQUMvRDtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLFFBQVE7UUFDaEIsYUFBYSxFQUFFLCtEQUErRDtRQUM5RSxZQUFZLEVBQUUsY0FBYztRQUM1QixXQUFXLEVBQUUsaURBQWlEO0tBQy9EO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLGFBQWEsRUFBRSx1SUFBdUk7UUFDdEosWUFBWSxFQUFFLGNBQWM7UUFDNUIsV0FBVyxFQUFFLGlEQUFpRDtLQUMvRDtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLHVCQUF1QjtRQUMvQixhQUFhLEVBQUUsK0RBQStEO1FBQzlFLFlBQVksRUFBRSxXQUFXO1FBQ3pCLFdBQVcsRUFBRSw4Q0FBOEM7S0FDNUQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsYUFBYSxFQUFFLHdGQUF3RjtRQUN2RyxZQUFZLEVBQUUsV0FBVztRQUN6QixXQUFXLEVBQUUsOENBQThDO0tBQzVEO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUNBQWlDO1FBQ3pDLGFBQWEsRUFBRSw2RkFBNkY7UUFDNUcsWUFBWSxFQUFFLFdBQVc7UUFDekIsV0FBVyxFQUFFLDhDQUE4QztLQUM1RDtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLCtCQUErQjtRQUN2QyxhQUFhLEVBQUUsaUZBQWlGO1FBQ2hHLFlBQVksRUFBRSw4Q0FBOEM7UUFDNUQsV0FBVyxFQUFFLHlFQUF5RTtLQUN2RjtJQUNELEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRSxHQUFHO1FBQ1gsTUFBTSxFQUFFLHlCQUF5QjtRQUNqQyxhQUFhLEVBQUUsd05BQXdOO1FBQ3ZPLFlBQVksRUFBRSxhQUFhO1FBQzNCLFdBQVcsRUFBRSxnREFBZ0Q7S0FDOUQ7SUFDRCxLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUUsR0FBRztRQUNYLE1BQU0sRUFBRSxzQkFBc0I7UUFDOUIsYUFBYSxFQUFFLDRKQUE0SjtRQUMzSyxZQUFZLEVBQUUsY0FBYztRQUM1QixXQUFXLEVBQUUsaURBQWlEO0tBQy9EO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFLEdBQUc7UUFDWCxNQUFNLEVBQUUsaUNBQWlDO1FBQ3pDLGFBQWEsRUFBRSw4REFBOEQ7UUFDN0UsWUFBWSxFQUFFLFdBQVc7UUFDekIsV0FBVyxFQUFFLDhDQUE4QztLQUM1RDtDQUNGOzs7Ozs7QUFLRCxNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQWM7SUFDMUMsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksZ0JBQWdCLENBQUM7QUFDM0QsQ0FBQzs7Ozs7O0FBS0QsTUFBTSxVQUFVLFNBQVMsQ0FBQyxNQUFjLElBQWEsT0FBTyxNQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBTVEFUVVMgPSB7XG4gIENPTlRJTlVFOiAxMDAsXG4gIFNXSVRDSElOR19QUk9UT0NPTFM6IDEwMSxcbiAgT0s6IDIwMCxcbiAgQ1JFQVRFRDogMjAxLFxuICBBQ0NFUFRFRDogMjAyLFxuICBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTjogMjAzLFxuICBOT19DT05URU5UOiAyMDQsXG4gIFJFU0VUX0NPTlRFTlQ6IDIwNSxcbiAgUEFSVElBTF9DT05URU5UOiAyMDYsXG4gIE1VTFRJUExFX0NIT0lDRVM6IDMwMCxcbiAgTU9WRURfUEVSTUFOVEVOVExZOiAzMDEsXG4gIEZPVU5EOiAzMDIsXG4gIFNFRV9PVEhFUjogMzAzLFxuICBOT1RfTU9ESUZJRUQ6IDMwNCxcbiAgVVNFX1BST1hZOiAzMDUsXG4gIFRFTVBPUkFSWV9SRURJUkVDVDogMzA3LFxuICBCQURfUkVRVUVTVDogNDAwLFxuICBVTkFVVEhPUklaRUQ6IDQwMSxcbiAgUEFZTUVOVF9SRVFVSVJFRDogNDAyLFxuICBGT1JCSURERU46IDQwMyxcbiAgTk9UX0ZPVU5EOiA0MDQsXG4gIE1FVEhPRF9OT1RfQUxMT1dFRDogNDA1LFxuICBOT1RfQUNDRVBUQUJMRTogNDA2LFxuICBQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRDogNDA3LFxuICBSRVFVRVNUX1RJTUVPVVQ6IDQwOCxcbiAgQ09ORkxJQ1Q6IDQwOSxcbiAgR09ORTogNDEwLFxuICBMRU5HVEhfUkVRVUlSRUQ6IDQxMSxcbiAgUFJFQ09ORElUSU9OX0ZBSUxFRDogNDEyLFxuICBQQVlMT0FEX1RPX0xBUkdFOiA0MTMsXG4gIFVSSV9UT09fTE9ORzogNDE0LFxuICBVTlNVUFBPUlRFRF9NRURJQV9UWVBFOiA0MTUsXG4gIFJBTkdFX05PVF9TQVRJU0ZJQUJMRTogNDE2LFxuICBFWFBFQ1RBVElPTl9GQUlMRUQ6IDQxNyxcbiAgSU1fQV9URUFQT1Q6IDQxOCxcbiAgVVBHUkFERV9SRVFVSVJFRDogNDI2LFxuICBJTlRFUk5BTF9TRVJWRVJfRVJST1I6IDUwMCxcbiAgTk9UX0lNUExFTUVOVEVEOiA1MDEsXG4gIEJBRF9HQVRFV0FZOiA1MDIsXG4gIFNFUlZJQ0VfVU5BVkFJTEFCTEU6IDUwMyxcbiAgR0FURVdBWV9USU1FT1VUOiA1MDQsXG4gIEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEOiA1MDUsXG4gIFBST0NFU1NJTkc6IDEwMixcbiAgTVVMVElfU1RBVFVTOiAyMDcsXG4gIElNX1VTRUQ6IDIyNixcbiAgUEVSTUFORU5UX1JFRElSRUNUOiAzMDgsXG4gIFVOUFJPQ0VTU0FCTEVfRU5UUlk6IDQyMixcbiAgTE9DS0VEOiA0MjMsXG4gIEZBSUxFRF9ERVBFTkRFTkNZOiA0MjQsXG4gIFBSRUNPTkRJVElPTl9SRVFVSVJFRDogNDI4LFxuICBUT09fTUFOWV9SRVFVRVNUUzogNDI5LFxuICBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFOiA0MzEsXG4gIFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TOiA0NTEsXG4gIFZBUklBTlRfQUxTT19ORUdPVElBVEVTOiA1MDYsXG4gIElOU1VGRklDSUVOVF9TVE9SQUdFOiA1MDcsXG4gIE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQ6IDUxMVxufTtcblxuLyp0c2xpbnQ6ZGlzYWJsZTpxdW90ZW1hcmsgbWF4LWxpbmUtbGVuZ3RoIG9uZS1saW5lICovXG5leHBvcnQgY29uc3QgU1RBVFVTX0NPREVfSU5GTyA9IHtcbiAgJzEwMCc6IHtcbiAgICAnY29kZSc6IDEwMCxcbiAgICAndGV4dCc6ICdDb250aW51ZScsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgaW5pdGlhbCBwYXJ0IG9mIGEgcmVxdWVzdCBoYXMgYmVlbiByZWNlaXZlZCBhbmQgaGFzIG5vdCB5ZXQgYmVlbiByZWplY3RlZCBieSB0aGUgc2VydmVyLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi4yLjEnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuMi4xJ1xuICB9LFxuICAnMTAxJzoge1xuICAgICdjb2RlJzogMTAxLFxuICAgICd0ZXh0JzogJ1N3aXRjaGluZyBQcm90b2NvbHMnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHNlcnZlciB1bmRlcnN0YW5kcyBhbmQgaXMgd2lsbGluZyB0byBjb21wbHkgd2l0aCB0aGUgY2xpZW50XFwncyByZXF1ZXN0LCB2aWEgdGhlIFVwZ3JhZGUgaGVhZGVyIGZpZWxkLCBmb3IgYSBjaGFuZ2UgaW4gdGhlIGFwcGxpY2F0aW9uIHByb3RvY29sIGJlaW5nIHVzZWQgb24gdGhpcyBjb25uZWN0aW9uLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi4yLjInLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuMi4yJ1xuICB9LFxuICAnMjAwJzoge1xuICAgICdjb2RlJzogMjAwLFxuICAgICd0ZXh0JzogJ09LJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSByZXF1ZXN0IGhhcyBzdWNjZWVkZWQuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjMuMScsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi4zLjEnXG4gIH0sXG4gICcyMDEnOiB7XG4gICAgJ2NvZGUnOiAyMDEsXG4gICAgJ3RleHQnOiAnQ3JlYXRlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgcmVxdWVzdCBoYXMgYmVlbiBmdWxmaWxsZWQgYW5kIGhhcyByZXN1bHRlZCBpbiBvbmUgb3IgbW9yZSBuZXcgcmVzb3VyY2VzIGJlaW5nIGNyZWF0ZWQuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjMuMicsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi4zLjInXG4gIH0sXG4gICcyMDInOiB7XG4gICAgJ2NvZGUnOiAyMDIsXG4gICAgJ3RleHQnOiAnQWNjZXB0ZWQnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHJlcXVlc3QgaGFzIGJlZW4gYWNjZXB0ZWQgZm9yIHByb2Nlc3NpbmcsIGJ1dCB0aGUgcHJvY2Vzc2luZyBoYXMgbm90IGJlZW4gY29tcGxldGVkLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi4zLjMnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuMy4zJ1xuICB9LFxuICAnMjAzJzoge1xuICAgICdjb2RlJzogMjAzLFxuICAgICd0ZXh0JzogJ05vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSByZXF1ZXN0IHdhcyBzdWNjZXNzZnVsIGJ1dCB0aGUgZW5jbG9zZWQgcGF5bG9hZCBoYXMgYmVlbiBtb2RpZmllZCBmcm9tIHRoYXQgb2YgdGhlIG9yaWdpbiBzZXJ2ZXJcXCdzIDIwMCAoT0spIHJlc3BvbnNlIGJ5IGEgdHJhbnNmb3JtaW5nIHByb3h5LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi4zLjQnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuMy40J1xuICB9LFxuICAnMjA0Jzoge1xuICAgICdjb2RlJzogMjA0LFxuICAgICd0ZXh0JzogJ05vIENvbnRlbnQnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHNlcnZlciBoYXMgc3VjY2Vzc2Z1bGx5IGZ1bGZpbGxlZCB0aGUgcmVxdWVzdCBhbmQgdGhhdCB0aGVyZSBpcyBubyBhZGRpdGlvbmFsIGNvbnRlbnQgdG8gc2VuZCBpbiB0aGUgcmVzcG9uc2UgcGF5bG9hZCBib2R5LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi4zLjUnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuMy41J1xuICB9LFxuICAnMjA1Jzoge1xuICAgICdjb2RlJzogMjA1LFxuICAgICd0ZXh0JzogJ1Jlc2V0IENvbnRlbnQnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHNlcnZlciBoYXMgZnVsZmlsbGVkIHRoZSByZXF1ZXN0IGFuZCBkZXNpcmVzIHRoYXQgdGhlIHVzZXIgYWdlbnQgcmVzZXQgdGhlIFxcXCJkb2N1bWVudCB2aWV3XFxcIiwgd2hpY2ggY2F1c2VkIHRoZSByZXF1ZXN0IHRvIGJlIHNlbnQsIHRvIGl0cyBvcmlnaW5hbCBzdGF0ZSBhcyByZWNlaXZlZCBmcm9tIHRoZSBvcmlnaW4gc2VydmVyLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi4zLjYnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuMy42J1xuICB9LFxuICAnMjA2Jzoge1xuICAgICdjb2RlJzogMjA2LFxuICAgICd0ZXh0JzogJ1BhcnRpYWwgQ29udGVudCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyIGlzIHN1Y2Nlc3NmdWxseSBmdWxmaWxsaW5nIGEgcmFuZ2UgcmVxdWVzdCBmb3IgdGhlIHRhcmdldCByZXNvdXJjZSBieSB0cmFuc2ZlcnJpbmcgb25lIG9yIG1vcmUgcGFydHMgb2YgdGhlIHNlbGVjdGVkIHJlcHJlc2VudGF0aW9uIHRoYXQgY29ycmVzcG9uZCB0byB0aGUgc2F0aXNmaWFibGUgcmFuZ2VzIGZvdW5kIGluIHRoZSByZXF1ZXN0c1xcJ3MgUmFuZ2UgaGVhZGVyIGZpZWxkLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzMjNC4xJyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzMjc2VjdGlvbi00LjEnXG4gIH0sXG4gICczMDAnOiB7XG4gICAgJ2NvZGUnOiAzMDAsXG4gICAgJ3RleHQnOiAnTXVsdGlwbGUgQ2hvaWNlcycsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgdGFyZ2V0IHJlc291cmNlIGhhcyBtb3JlIHRoYW4gb25lIHJlcHJlc2VudGF0aW9uLCBlYWNoIHdpdGggaXRzIG93biBtb3JlIHNwZWNpZmljIGlkZW50aWZpZXIsIGFuZCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgYWx0ZXJuYXRpdmVzIGlzIGJlaW5nIHByb3ZpZGVkIHNvIHRoYXQgdGhlIHVzZXIgKG9yIHVzZXIgYWdlbnQpIGNhbiBzZWxlY3QgYSBwcmVmZXJyZWQgcmVwcmVzZW50YXRpb24gYnkgcmVkaXJlY3RpbmcgaXRzIHJlcXVlc3QgdG8gb25lIG9yIG1vcmUgb2YgdGhvc2UgaWRlbnRpZmllcnMuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjQuMScsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi40LjEnXG4gIH0sXG4gICczMDEnOiB7XG4gICAgJ2NvZGUnOiAzMDEsXG4gICAgJ3RleHQnOiAnTW92ZWQgUGVybWFuZW50bHknLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHRhcmdldCByZXNvdXJjZSBoYXMgYmVlbiBhc3NpZ25lZCBhIG5ldyBwZXJtYW5lbnQgVVJJIGFuZCBhbnkgZnV0dXJlIHJlZmVyZW5jZXMgdG8gdGhpcyByZXNvdXJjZSBvdWdodCB0byB1c2Ugb25lIG9mIHRoZSBlbmNsb3NlZCBVUklzLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi40LjInLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNC4yJ1xuICB9LFxuICAnMzAyJzoge1xuICAgICdjb2RlJzogMzAyLFxuICAgICd0ZXh0JzogJ0ZvdW5kJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSB0YXJnZXQgcmVzb3VyY2UgcmVzaWRlcyB0ZW1wb3JhcmlseSB1bmRlciBhIGRpZmZlcmVudCBVUkkuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjQuMycsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi40LjMnXG4gIH0sXG4gICczMDMnOiB7XG4gICAgJ2NvZGUnOiAzMDMsXG4gICAgJ3RleHQnOiAnU2VlIE90aGVyJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBzZXJ2ZXIgaXMgcmVkaXJlY3RpbmcgdGhlIHVzZXIgYWdlbnQgdG8gYSBkaWZmZXJlbnQgcmVzb3VyY2UsIGFzIGluZGljYXRlZCBieSBhIFVSSSBpbiB0aGUgTG9jYXRpb24gaGVhZGVyIGZpZWxkLCB0aGF0IGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYW4gaW5kaXJlY3QgcmVzcG9uc2UgdG8gdGhlIG9yaWdpbmFsIHJlcXVlc3QuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjQuNCcsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi40LjQnXG4gIH0sXG4gICczMDQnOiB7XG4gICAgJ2NvZGUnOiAzMDQsXG4gICAgJ3RleHQnOiAnTm90IE1vZGlmaWVkJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIkEgY29uZGl0aW9uYWwgR0VUIHJlcXVlc3QgaGFzIGJlZW4gcmVjZWl2ZWQgYW5kIHdvdWxkIGhhdmUgcmVzdWx0ZWQgaW4gYSAyMDAgKE9LKSByZXNwb25zZSBpZiBpdCB3ZXJlIG5vdCBmb3IgdGhlIGZhY3QgdGhhdCB0aGUgY29uZGl0aW9uIGhhcyBldmFsdWF0ZWQgdG8gZmFsc2UuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMiM0LjEnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMiNzZWN0aW9uLTQuMSdcbiAgfSxcbiAgJzMwNSc6IHtcbiAgICAnY29kZSc6IDMwNSxcbiAgICAndGV4dCc6ICdVc2UgUHJveHknLFxuICAgICdkZXNjcmlwdGlvbic6ICcqZGVwcmVjYXRlZConLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi40LjUnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNC41J1xuICB9LFxuICAnMzA3Jzoge1xuICAgICdjb2RlJzogMzA3LFxuICAgICd0ZXh0JzogJ1RlbXBvcmFyeSBSZWRpcmVjdCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgdGFyZ2V0IHJlc291cmNlIHJlc2lkZXMgdGVtcG9yYXJpbHkgdW5kZXIgYSBkaWZmZXJlbnQgVVJJIGFuZCB0aGUgdXNlciBhZ2VudCBNVVNUIE5PVCBjaGFuZ2UgdGhlIHJlcXVlc3QgbWV0aG9kIGlmIGl0IHBlcmZvcm1zIGFuIGF1dG9tYXRpYyByZWRpcmVjdGlvbiB0byB0aGF0IFVSSS5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjMxIzYuNC43JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjQuNydcbiAgfSxcbiAgJzQwMCc6IHtcbiAgICAnY29kZSc6IDQwMCxcbiAgICAndGV4dCc6ICdCYWQgUmVxdWVzdCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyIGNhbm5vdCBvciB3aWxsIG5vdCBwcm9jZXNzIHRoZSByZXF1ZXN0IGJlY2F1c2UgdGhlIHJlY2VpdmVkIHN5bnRheCBpcyBpbnZhbGlkLCBub25zZW5zaWNhbCwgb3IgZXhjZWVkcyBzb21lIGxpbWl0YXRpb24gb24gd2hhdCB0aGUgc2VydmVyIGlzIHdpbGxpbmcgdG8gcHJvY2Vzcy5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjMxIzYuNS4xJyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjUuMSdcbiAgfSxcbiAgJzQwMSc6IHtcbiAgICAnY29kZSc6IDQwMSxcbiAgICAndGV4dCc6ICdVbmF1dGhvcml6ZWQnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHJlcXVlc3QgaGFzIG5vdCBiZWVuIGFwcGxpZWQgYmVjYXVzZSBpdCBsYWNrcyB2YWxpZCBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyBmb3IgdGhlIHRhcmdldCByZXNvdXJjZS5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjM1IzYuMy4xJyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzUjc2VjdGlvbi0zLjEnXG4gIH0sXG4gICc0MDInOiB7XG4gICAgJ2NvZGUnOiA0MDIsXG4gICAgJ3RleHQnOiAnUGF5bWVudCBSZXF1aXJlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJypyZXNlcnZlZConLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi41LjInLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNS4yJ1xuICB9LFxuICAnNDAzJzoge1xuICAgICdjb2RlJzogNDAzLFxuICAgICd0ZXh0JzogJ0ZvcmJpZGRlbicsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyIHVuZGVyc3Rvb2QgdGhlIHJlcXVlc3QgYnV0IHJlZnVzZXMgdG8gYXV0aG9yaXplIGl0LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi41LjMnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNS4zJ1xuICB9LFxuICAnNDA0Jzoge1xuICAgICdjb2RlJzogNDA0LFxuICAgICd0ZXh0JzogJ05vdCBGb3VuZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgb3JpZ2luIHNlcnZlciBkaWQgbm90IGZpbmQgYSBjdXJyZW50IHJlcHJlc2VudGF0aW9uIGZvciB0aGUgdGFyZ2V0IHJlc291cmNlIG9yIGlzIG5vdCB3aWxsaW5nIHRvIGRpc2Nsb3NlIHRoYXQgb25lIGV4aXN0cy5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjMxIzYuNS40JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjUuNCdcbiAgfSxcbiAgJzQwNSc6IHtcbiAgICAnY29kZSc6IDQwNSxcbiAgICAndGV4dCc6ICdNZXRob2QgTm90IEFsbG93ZWQnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIG1ldGhvZCBzcGVjaWZpZWQgaW4gdGhlIHJlcXVlc3QtbGluZSBpcyBrbm93biBieSB0aGUgb3JpZ2luIHNlcnZlciBidXQgbm90IHN1cHBvcnRlZCBieSB0aGUgdGFyZ2V0IHJlc291cmNlLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi41LjUnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNS41J1xuICB9LFxuICAnNDA2Jzoge1xuICAgICdjb2RlJzogNDA2LFxuICAgICd0ZXh0JzogJ05vdCBBY2NlcHRhYmxlJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSB0YXJnZXQgcmVzb3VyY2UgZG9lcyBub3QgaGF2ZSBhIGN1cnJlbnQgcmVwcmVzZW50YXRpb24gdGhhdCB3b3VsZCBiZSBhY2NlcHRhYmxlIHRvIHRoZSB1c2VyIGFnZW50LCBhY2NvcmRpbmcgdG8gdGhlIHByb2FjdGl2ZSBuZWdvdGlhdGlvbiBoZWFkZXIgZmllbGRzIHJlY2VpdmVkIGluIHRoZSByZXF1ZXN0LCBhbmQgdGhlIHNlcnZlciBpcyB1bndpbGxpbmcgdG8gc3VwcGx5IGEgZGVmYXVsdCByZXByZXNlbnRhdGlvbi5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjMxIzYuNS42JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjUuNidcbiAgfSxcbiAgJzQwNyc6IHtcbiAgICAnY29kZSc6IDQwNyxcbiAgICAndGV4dCc6ICdQcm94eSBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgY2xpZW50IG5lZWRzIHRvIGF1dGhlbnRpY2F0ZSBpdHNlbGYgaW4gb3JkZXIgdG8gdXNlIGEgcHJveHkuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjMuMicsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi4zLjInXG4gIH0sXG4gICc0MDgnOiB7XG4gICAgJ2NvZGUnOiA0MDgsXG4gICAgJ3RleHQnOiAnUmVxdWVzdCBUaW1lb3V0JyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBzZXJ2ZXIgZGlkIG5vdCByZWNlaXZlIGEgY29tcGxldGUgcmVxdWVzdCBtZXNzYWdlIHdpdGhpbiB0aGUgdGltZSB0aGF0IGl0IHdhcyBwcmVwYXJlZCB0byB3YWl0LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi41LjcnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNS43J1xuICB9LFxuICAnNDA5Jzoge1xuICAgICdjb2RlJzogNDA5LFxuICAgICd0ZXh0JzogJ0NvbmZsaWN0JyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSByZXF1ZXN0IGNvdWxkIG5vdCBiZSBjb21wbGV0ZWQgZHVlIHRvIGEgY29uZmxpY3Qgd2l0aCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcmVzb3VyY2UuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjUuOCcsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi41LjgnXG4gIH0sXG4gICc0MTAnOiB7XG4gICAgJ2NvZGUnOiA0MTAsXG4gICAgJ3RleHQnOiAnR29uZScsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJBY2Nlc3MgdG8gdGhlIHRhcmdldCByZXNvdXJjZSBpcyBubyBsb25nZXIgYXZhaWxhYmxlIGF0IHRoZSBvcmlnaW4gc2VydmVyIGFuZCB0aGF0IHRoaXMgY29uZGl0aW9uIGlzIGxpa2VseSB0byBiZSBwZXJtYW5lbnQuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjUuOScsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi41LjknXG4gIH0sXG4gICc0MTEnOiB7XG4gICAgJ2NvZGUnOiA0MTEsXG4gICAgJ3RleHQnOiAnTGVuZ3RoIFJlcXVpcmVkJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBzZXJ2ZXIgcmVmdXNlcyB0byBhY2NlcHQgdGhlIHJlcXVlc3Qgd2l0aG91dCBhIGRlZmluZWQgQ29udGVudC1MZW5ndGguXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjUuMTAnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNS4xMCdcbiAgfSxcbiAgJzQxMic6IHtcbiAgICAnY29kZSc6IDQxMixcbiAgICAndGV4dCc6ICdQcmVjb25kaXRpb24gRmFpbGVkJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIk9uZSBvciBtb3JlIHByZWNvbmRpdGlvbnMgZ2l2ZW4gaW4gdGhlIHJlcXVlc3QgaGVhZGVyIGZpZWxkcyBldmFsdWF0ZWQgdG8gZmFsc2Ugd2hlbiB0ZXN0ZWQgb24gdGhlIHNlcnZlci5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjMyIzQuMicsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMyI3NlY3Rpb24tNC4yJ1xuICB9LFxuICAnNDEzJzoge1xuICAgICdjb2RlJzogNDEzLFxuICAgICd0ZXh0JzogJ1BheWxvYWQgVG9vIExhcmdlJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBzZXJ2ZXIgaXMgcmVmdXNpbmcgdG8gcHJvY2VzcyBhIHJlcXVlc3QgYmVjYXVzZSB0aGUgcmVxdWVzdCBwYXlsb2FkIGlzIGxhcmdlciB0aGFuIHRoZSBzZXJ2ZXIgaXMgd2lsbGluZyBvciBhYmxlIHRvIHByb2Nlc3MuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjUuMTEnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNS4xMSdcbiAgfSxcbiAgJzQxNCc6IHtcbiAgICAnY29kZSc6IDQxNCxcbiAgICAndGV4dCc6ICdVUkkgVG9vIExvbmcnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHNlcnZlciBpcyByZWZ1c2luZyB0byBzZXJ2aWNlIHRoZSByZXF1ZXN0IGJlY2F1c2UgdGhlIHJlcXVlc3QtdGFyZ2V0IGlzIGxvbmdlciB0aGFuIHRoZSBzZXJ2ZXIgaXMgd2lsbGluZyB0byBpbnRlcnByZXQuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjUuMTInLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNS4xMidcbiAgfSxcbiAgJzQxNSc6IHtcbiAgICAnY29kZSc6IDQxNSxcbiAgICAndGV4dCc6ICdVbnN1cHBvcnRlZCBNZWRpYSBUeXBlJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBvcmlnaW4gc2VydmVyIGlzIHJlZnVzaW5nIHRvIHNlcnZpY2UgdGhlIHJlcXVlc3QgYmVjYXVzZSB0aGUgcGF5bG9hZCBpcyBpbiBhIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGJ5IHRoZSB0YXJnZXQgcmVzb3VyY2UgZm9yIHRoaXMgbWV0aG9kLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi41LjEzJyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjUuMTMnXG4gIH0sXG4gICc0MTYnOiB7XG4gICAgJ2NvZGUnOiA0MTYsXG4gICAgJ3RleHQnOiAnUmFuZ2UgTm90IFNhdGlzZmlhYmxlJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIk5vbmUgb2YgdGhlIHJhbmdlcyBpbiB0aGUgcmVxdWVzdFxcJ3MgUmFuZ2UgaGVhZGVyIGZpZWxkIG92ZXJsYXAgdGhlIGN1cnJlbnQgZXh0ZW50IG9mIHRoZSBzZWxlY3RlZCByZXNvdXJjZSBvciB0aGF0IHRoZSBzZXQgb2YgcmFuZ2VzIHJlcXVlc3RlZCBoYXMgYmVlbiByZWplY3RlZCBkdWUgdG8gaW52YWxpZCByYW5nZXMgb3IgYW4gZXhjZXNzaXZlIHJlcXVlc3Qgb2Ygc21hbGwgb3Igb3ZlcmxhcHBpbmcgcmFuZ2VzLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzMjNC40JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzMjc2VjdGlvbi00LjQnXG4gIH0sXG4gICc0MTcnOiB7XG4gICAgJ2NvZGUnOiA0MTcsXG4gICAgJ3RleHQnOiAnRXhwZWN0YXRpb24gRmFpbGVkJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBleHBlY3RhdGlvbiBnaXZlbiBpbiB0aGUgcmVxdWVzdFxcJ3MgRXhwZWN0IGhlYWRlciBmaWVsZCBjb3VsZCBub3QgYmUgbWV0IGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgaW5ib3VuZCBzZXJ2ZXJzLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi41LjE0JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjUuMTQnXG4gIH0sXG4gICc0MTgnOiB7XG4gICAgJ2NvZGUnOiA0MTgsXG4gICAgJ3RleHQnOiAnSVxcJ20gYSB0ZWFwb3QnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiMTk4OCBBcHJpbCBGb29scyBKb2tlLiBSZXR1cm5lZCBieSB0ZWEgcG90cyByZXF1ZXN0ZWQgdG8gYnJldyBjb2ZmZWUuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDIDIzMjQnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIzMjQnXG4gIH0sXG4gICc0MjYnOiB7XG4gICAgJ2NvZGUnOiA0MjYsXG4gICAgJ3RleHQnOiAnVXBncmFkZSBSZXF1aXJlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyIHJlZnVzZXMgdG8gcGVyZm9ybSB0aGUgcmVxdWVzdCB1c2luZyB0aGUgY3VycmVudCBwcm90b2NvbCBidXQgbWlnaHQgYmUgd2lsbGluZyB0byBkbyBzbyBhZnRlciB0aGUgY2xpZW50IHVwZ3JhZGVzIHRvIGEgZGlmZmVyZW50IHByb3RvY29sLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi41LjE1JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjUuMTUnXG4gIH0sXG4gICc1MDAnOiB7XG4gICAgJ2NvZGUnOiA1MDAsXG4gICAgJ3RleHQnOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBzZXJ2ZXIgZW5jb3VudGVyZWQgYW4gdW5leHBlY3RlZCBjb25kaXRpb24gdGhhdCBwcmV2ZW50ZWQgaXQgZnJvbSBmdWxmaWxsaW5nIHRoZSByZXF1ZXN0LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi42LjEnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNi4xJ1xuICB9LFxuICAnNTAxJzoge1xuICAgICdjb2RlJzogNTAxLFxuICAgICd0ZXh0JzogJ05vdCBJbXBsZW1lbnRlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyIGRvZXMgbm90IHN1cHBvcnQgdGhlIGZ1bmN0aW9uYWxpdHkgcmVxdWlyZWQgdG8gZnVsZmlsbCB0aGUgcmVxdWVzdC5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjMxIzYuNi4yJyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjYuMidcbiAgfSxcbiAgJzUwMic6IHtcbiAgICAnY29kZSc6IDUwMixcbiAgICAndGV4dCc6ICdCYWQgR2F0ZXdheScsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyLCB3aGlsZSBhY3RpbmcgYXMgYSBnYXRld2F5IG9yIHByb3h5LCByZWNlaXZlZCBhbiBpbnZhbGlkIHJlc3BvbnNlIGZyb20gYW4gaW5ib3VuZCBzZXJ2ZXIgaXQgYWNjZXNzZWQgd2hpbGUgYXR0ZW1wdGluZyB0byBmdWxmaWxsIHRoZSByZXF1ZXN0LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi42LjMnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNi4zJ1xuICB9LFxuICAnNTAzJzoge1xuICAgICdjb2RlJzogNTAzLFxuICAgICd0ZXh0JzogJ1NlcnZpY2UgVW5hdmFpbGFibGUnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHNlcnZlciBpcyBjdXJyZW50bHkgdW5hYmxlIHRvIGhhbmRsZSB0aGUgcmVxdWVzdCBkdWUgdG8gYSB0ZW1wb3Jhcnkgb3ZlcmxvYWQgb3Igc2NoZWR1bGVkIG1haW50ZW5hbmNlLCB3aGljaCB3aWxsIGxpa2VseSBiZSBhbGxldmlhdGVkIGFmdGVyIHNvbWUgZGVsYXkuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzMSM2LjYuNCcsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tNi42LjQnXG4gIH0sXG4gICc1MDQnOiB7XG4gICAgJ2NvZGUnOiA1MDQsXG4gICAgJ3RleHQnOiAnR2F0ZXdheSBUaW1lLW91dCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyLCB3aGlsZSBhY3RpbmcgYXMgYSBnYXRld2F5IG9yIHByb3h5LCBkaWQgbm90IHJlY2VpdmUgYSB0aW1lbHkgcmVzcG9uc2UgZnJvbSBhbiB1cHN0cmVhbSBzZXJ2ZXIgaXQgbmVlZGVkIHRvIGFjY2VzcyBpbiBvcmRlciB0byBjb21wbGV0ZSB0aGUgcmVxdWVzdC5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM3MjMxIzYuNi41JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzEjc2VjdGlvbi02LjYuNSdcbiAgfSxcbiAgJzUwNSc6IHtcbiAgICAnY29kZSc6IDUwNSxcbiAgICAndGV4dCc6ICdIVFRQIFZlcnNpb24gTm90IFN1cHBvcnRlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyIGRvZXMgbm90IHN1cHBvcnQsIG9yIHJlZnVzZXMgdG8gc3VwcG9ydCwgdGhlIHByb3RvY29sIHZlcnNpb24gdGhhdCB3YXMgdXNlZCBpbiB0aGUgcmVxdWVzdCBtZXNzYWdlLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzcyMzEjNi42LjYnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMSNzZWN0aW9uLTYuNi42J1xuICB9LFxuICAnMTAyJzoge1xuICAgICdjb2RlJzogMTAyLFxuICAgICd0ZXh0JzogJ1Byb2Nlc3NpbmcnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiQW4gaW50ZXJpbSByZXNwb25zZSB0byBpbmZvcm0gdGhlIGNsaWVudCB0aGF0IHRoZSBzZXJ2ZXIgaGFzIGFjY2VwdGVkIHRoZSBjb21wbGV0ZSByZXF1ZXN0LCBidXQgaGFzIG5vdCB5ZXQgY29tcGxldGVkIGl0LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzUyMTgjMTAuMScsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyNTE4I3NlY3Rpb24tMTAuMSdcbiAgfSxcbiAgJzIwNyc6IHtcbiAgICAnY29kZSc6IDIwNyxcbiAgICAndGV4dCc6ICdNdWx0aS1TdGF0dXMnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiU3RhdHVzIGZvciBtdWx0aXBsZSBpbmRlcGVuZGVudCBvcGVyYXRpb25zLlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzUyMTgjMTAuMicsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyNTE4I3NlY3Rpb24tMTAuMidcbiAgfSxcbiAgJzIyNic6IHtcbiAgICAnY29kZSc6IDIyNixcbiAgICAndGV4dCc6ICdJTSBVc2VkJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBzZXJ2ZXIgaGFzIGZ1bGZpbGxlZCBhIEdFVCByZXF1ZXN0IGZvciB0aGUgcmVzb3VyY2UsIGFuZCB0aGUgcmVzcG9uc2UgaXMgYSByZXByZXNlbnRhdGlvbiBvZiB0aGUgcmVzdWx0IG9mIG9uZSBvciBtb3JlIGluc3RhbmNlLW1hbmlwdWxhdGlvbnMgYXBwbGllZCB0byB0aGUgY3VycmVudCBpbnN0YW5jZS5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkMzMjI5IzEwLjQuMScsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMjI5I3NlY3Rpb24tMTAuNC4xJ1xuICB9LFxuICAnMzA4Jzoge1xuICAgICdjb2RlJzogMzA4LFxuICAgICd0ZXh0JzogJ1Blcm1hbmVudCBSZWRpcmVjdCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgdGFyZ2V0IHJlc291cmNlIGhhcyBiZWVuIGFzc2lnbmVkIGEgbmV3IHBlcm1hbmVudCBVUkkgYW5kIGFueSBmdXR1cmUgcmVmZXJlbmNlcyB0byB0aGlzIHJlc291cmNlIFNIT1VMRCB1c2Ugb25lIG9mIHRoZSByZXR1cm5lZCBVUklzLiBbLi4uXSBUaGlzIHN0YXR1cyBjb2RlIGlzIHNpbWlsYXIgdG8gMzAxIE1vdmVkIFBlcm1hbmVudGx5IChTZWN0aW9uIDcuMy4yIG9mIHJmYzcyMzEpLCBleGNlcHQgdGhhdCBpdCBkb2VzIG5vdCBhbGxvdyByZXdyaXRpbmcgdGhlIHJlcXVlc3QgbWV0aG9kIGZyb20gUE9TVCB0byBHRVQuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNzIzOCcsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjM4J1xuICB9LFxuICAnNDIyJzoge1xuICAgICdjb2RlJzogNDIyLFxuICAgICd0ZXh0JzogJ1VucHJvY2Vzc2FibGUgRW50aXR5JyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBzZXJ2ZXIgdW5kZXJzdGFuZHMgdGhlIGNvbnRlbnQgdHlwZSBvZiB0aGUgcmVxdWVzdCBlbnRpdHkgKGhlbmNlIGEgNDE1KFVuc3VwcG9ydGVkIE1lZGlhIFR5cGUpIHN0YXR1cyBjb2RlIGlzIGluYXBwcm9wcmlhdGUpLCBhbmQgdGhlIHN5bnRheCBvZiB0aGUgcmVxdWVzdCBlbnRpdHkgaXMgY29ycmVjdCAodGh1cyBhIDQwMCAoQmFkIFJlcXVlc3QpIHN0YXR1cyBjb2RlIGlzIGluYXBwcm9wcmlhdGUpIGJ1dCB3YXMgdW5hYmxlIHRvIHByb2Nlc3MgdGhlIGNvbnRhaW5lZCBpbnN0cnVjdGlvbnMuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNTIxOCMxMC4zJyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI1MTgjc2VjdGlvbi0xMC4zJ1xuICB9LFxuICAnNDIzJzoge1xuICAgICdjb2RlJzogNDIzLFxuICAgICd0ZXh0JzogJ0xvY2tlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc291cmNlIG9yIGRlc3RpbmF0aW9uIHJlc291cmNlIG9mIGEgbWV0aG9kIGlzIGxvY2tlZC5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM1MjE4IzEwLjQnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjUxOCNzZWN0aW9uLTEwLjQnXG4gIH0sXG4gICc0MjQnOiB7XG4gICAgJ2NvZGUnOiA0MjQsXG4gICAgJ3RleHQnOiAnRmFpbGVkIERlcGVuZGVuY3knLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIG1ldGhvZCBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIG9uIHRoZSByZXNvdXJjZSBiZWNhdXNlIHRoZSByZXF1ZXN0ZWQgYWN0aW9uIGRlcGVuZGVkIG9uIGFub3RoZXIgYWN0aW9uIGFuZCB0aGF0IGFjdGlvbiBmYWlsZWQuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNTIxOCMxMC41JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzI1MTgjc2VjdGlvbi0xMC41J1xuICB9LFxuICAnNDI4Jzoge1xuICAgICdjb2RlJzogNDI4LFxuICAgICd0ZXh0JzogJ1ByZWNvbmRpdGlvbiBSZXF1aXJlZCcsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgb3JpZ2luIHNlcnZlciByZXF1aXJlcyB0aGUgcmVxdWVzdCB0byBiZSBjb25kaXRpb25hbC5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM2NTg1IzMnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjU4NSNzZWN0aW9uLTMnXG4gIH0sXG4gICc0MjknOiB7XG4gICAgJ2NvZGUnOiA0MjksXG4gICAgJ3RleHQnOiAnVG9vIE1hbnkgUmVxdWVzdHMnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHVzZXIgaGFzIHNlbnQgdG9vIG1hbnkgcmVxdWVzdHMgaW4gYSBnaXZlbiBhbW91bnQgb2YgdGltZSAoXFxcInJhdGUgbGltaXRpbmdcXFwiKS5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM2NTg1IzQnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjU4NSNzZWN0aW9uLTQnXG4gIH0sXG4gICc0MzEnOiB7XG4gICAgJ2NvZGUnOiA0MzEsXG4gICAgJ3RleHQnOiAnUmVxdWVzdCBIZWFkZXIgRmllbGRzIFRvbyBMYXJnZScsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcXCJUaGUgc2VydmVyIGlzIHVud2lsbGluZyB0byBwcm9jZXNzIHRoZSByZXF1ZXN0IGJlY2F1c2UgaXRzIGhlYWRlciBmaWVsZHMgYXJlIHRvbyBsYXJnZS5cXFwiJyxcbiAgICAnc3BlY190aXRsZSc6ICdSRkM2NTg1IzUnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjU4NSNzZWN0aW9uLTUnXG4gIH0sXG4gICc0NTEnOiB7XG4gICAgJ2NvZGUnOiA0NTEsXG4gICAgJ3RleHQnOiAnVW5hdmFpbGFibGUgRm9yIExlZ2FsIFJlYXNvbnMnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHNlcnZlciBpcyBkZW55aW5nIGFjY2VzcyB0byB0aGUgcmVzb3VyY2UgaW4gcmVzcG9uc2UgdG8gYSBsZWdhbCBkZW1hbmQuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnZHJhZnQtaWV0Zi1odHRwYmlzLWxlZ2FsbHktcmVzdHJpY3RlZC1zdGF0dXMnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaWV0Zi1odHRwYmlzLWxlZ2FsbHktcmVzdHJpY3RlZC1zdGF0dXMnXG4gIH0sXG4gICc1MDYnOiB7XG4gICAgJ2NvZGUnOiA1MDYsXG4gICAgJ3RleHQnOiAnVmFyaWFudCBBbHNvIE5lZ290aWF0ZXMnLFxuICAgICdkZXNjcmlwdGlvbic6ICdcXFwiVGhlIHNlcnZlciBoYXMgYW4gaW50ZXJuYWwgY29uZmlndXJhdGlvbiBlcnJvcjogdGhlIGNob3NlbiB2YXJpYW50IHJlc291cmNlIGlzIGNvbmZpZ3VyZWQgdG8gZW5nYWdlIGluIHRyYW5zcGFyZW50IGNvbnRlbnQgbmVnb3RpYXRpb24gaXRzZWxmLCBhbmQgaXMgdGhlcmVmb3JlIG5vdCBhIHByb3BlciBlbmQgcG9pbnQgaW4gdGhlIG5lZ290aWF0aW9uIHByb2Nlc3MuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDMjI5NSM4LjEnLFxuICAgICdzcGVjX2hyZWYnOiAnaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjI5NSNzZWN0aW9uLTguMSdcbiAgfSxcbiAgJzUwNyc6IHtcbiAgICAnY29kZSc6IDUwNyxcbiAgICAndGV4dCc6ICdJbnN1ZmZpY2llbnQgU3RvcmFnZScsXG4gICAgJ2Rlc2NyaXB0aW9uJzogJ1xcVGhlIG1ldGhvZCBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIG9uIHRoZSByZXNvdXJjZSBiZWNhdXNlIHRoZSBzZXJ2ZXIgaXMgdW5hYmxlIHRvIHN0b3JlIHRoZSByZXByZXNlbnRhdGlvbiBuZWVkZWQgdG8gc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlIHRoZSByZXF1ZXN0LlxcXCInLFxuICAgICdzcGVjX3RpdGxlJzogJ1JGQzUyMTgjMTAuNicsXG4gICAgJ3NwZWNfaHJlZic6ICdodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyNTE4I3NlY3Rpb24tMTAuNidcbiAgfSxcbiAgJzUxMSc6IHtcbiAgICAnY29kZSc6IDUxMSxcbiAgICAndGV4dCc6ICdOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkJyxcbiAgICAnZGVzY3JpcHRpb24nOiAnXFxcIlRoZSBjbGllbnQgbmVlZHMgdG8gYXV0aGVudGljYXRlIHRvIGdhaW4gbmV0d29yayBhY2Nlc3MuXFxcIicsXG4gICAgJ3NwZWNfdGl0bGUnOiAnUkZDNjU4NSM2JyxcbiAgICAnc3BlY19ocmVmJzogJ2h0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY1ODUjc2VjdGlvbi02J1xuICB9XG59O1xuXG4vKipcbiAqIGdldCB0aGUgc3RhdHVzIHRleHQgZnJvbSBTdGF0dXNDb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXNUZXh0KHN0YXR1czogbnVtYmVyKSB7XG4gIHJldHVybiBTVEFUVVNfQ09ERV9JTkZPW3N0YXR1c10udGV4dCB8fCAnVW5rbm93biBTdGF0dXMnO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGhlIEh0dHAgU3RhdHVzIENvZGUgaXMgMjAwLTI5OSAoc3VjY2VzcylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3VjY2VzcyhzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4geyByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7IH07XG4iXX0=
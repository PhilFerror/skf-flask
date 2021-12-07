function FindProxyForURL(url, host) {
    // exclude localhost
    if (shExpMatch(host,"127.0.0.1")) {
       return "DIRECT";
    }
    // access skf-zap directly
    if (shExpMatch(host,"skf-zap")) {
        return "DIRECT";
    }
 
    // All other thrue ZAP Proxy
    return "PROXY skf-zap:7090";
 }

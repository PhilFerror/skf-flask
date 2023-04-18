#!/bin/sh

set -e # Exit immediately if a command exits with a non-zero status.
set -u # Treat unset variables as an error.

sleepTimeSeconds=5
key=/config/zap/owasp_zap_root_ca.key
cert=/config/zap/owasp_zap_root_ca.cer

until [[ -f "$key" && -f "$cert" ]]
do
    echo "waiting another $sleepTimeSeconds s for: $key OR $cert"
    sleep $sleepTimeSeconds
done
certutil -A -n "OWASP Zed Attack Proxy Root CA" -t "TC,Cw,Tw" -i $cert -d /config/profile/
echo "certificates imported,  stop import"

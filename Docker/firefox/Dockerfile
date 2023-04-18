ARG VERSION

# base image
FROM jlesage/firefox:"$VERSION"
RUN apk add nss-tools

# create services
RUN mkdir /etc/services.d/certimport
COPY --chmod=744 ./80-certimport.sh /etc/cont-init.d/80-certimport.sh



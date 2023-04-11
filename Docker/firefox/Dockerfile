############
### build ###
############

# docker build -t pei/firefox .

############
### run ###
############

# escape=`
# base image
FROM jlesage/firefox:v1.17.1
RUN apk add nss-tools
RUN mkdir /etc/services.d/certimport
COPY ./certimport/app.dep /etc/services.d/certimport/app.dep
COPY ./certimport/run /etc/services.d/certimport/run
 

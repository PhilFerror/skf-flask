############
### build ###
############

# docker build -t pei/firefox .

############
### run ###
############

# base image
FROM jlesage/firefox:v1.17.1
RUN apk add nss-tools
RUN mkdir /etc/services.d/certimport
COPY ./certimport/app.dep /etc/services.d/certimport/app.dep
COPY ./certimport/run /etc/services.d/certimport/run
#COPY ./certimport/up /etc/services.d/certimport/up
#COPY ./certimport/down /etc/services.d/certimport/down
#COPY ./certimport/type /etc/services.d/certimport/type

 

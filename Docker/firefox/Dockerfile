############
### build ###
############

# docker build -t pei/firefox .

############
### run ###
############

# base image
FROM jlesage/firefox:v23.03.1
RUN apk add nss-tools

# create services
RUN mkdir /etc/services.d/certimport
COPY --chmod=744 ./80-certimport.sh /etc/cont-init.d/80-certimport.sh



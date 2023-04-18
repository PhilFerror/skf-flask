############
### build ###
############

# docker build -t pei/zap2docker-stable .

############
### run ###
############

# base image
FROM owasp/zap2docker-stable:2.12.0
WORKDIR /zap

#Copy doesn't respect USER directives so we need to chown and to do that we need to be root
USER root
RUN mkdir /zap/wrk && chown zap:zap /zap/wrk
RUN chmod a+rw /zap/wrk

#Expose volume to other container
#VOLUME [ "/zap/wrk" ]

#Change back to zap at the end
USER zap


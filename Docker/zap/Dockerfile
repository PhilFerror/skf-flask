ARG VERSION

# base image
FROM owasp/zap2docker-stable:"$VERSION"
WORKDIR /zap

#Copy doesn't respect USER directives so we need to chown and to do that we need to be root
USER root
RUN mkdir /zap/wrk && chown zap:zap /zap/wrk
RUN chmod a+rw /zap/wrk

#Expose volume to other container
#VOLUME [ "/zap/wrk" ]

#Change back to zap at the end
USER zap


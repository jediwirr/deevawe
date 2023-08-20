FROM whitemaks/web_visualizer:latest

EXPOSE 8080

ENV WEB_APP=/usr/app

COPY ./dist/deewave $WEB_APP/static/

WORKDIR $WEB_APP

ENTRYPOINT ["java", "-jar", "web_visualizer-1.0.0.jar"]

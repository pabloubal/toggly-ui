FROM nginx:1.19
RUN rm /usr/share/nginx/html/*
COPY build/ /usr/share/nginx/html/ui
COPY conf/config.prod.json /etc/toggly/ui/conf/config.json
RUN rm /usr/share/nginx/html/ui/config.json
RUN ln -fs /etc/toggly/ui/conf/config.json /usr/share/nginx/html/ui/config.json
COPY nginx.conf /etc/nginx/conf.d/default.conf
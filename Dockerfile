FROM nginxinc/nginx-unprivileged
COPY dist/ /usr/share/nginx/html
COPY conf/nginx/default.conf /etc/nginx/conf.d

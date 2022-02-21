FROM nginx:alpine
COPY index.html /app/index.html
COPY assets/* /app/assets

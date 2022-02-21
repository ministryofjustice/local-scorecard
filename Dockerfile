FROM nginx:alpine
COPY index.html /app/index.html
COPY dist/* /app/dist

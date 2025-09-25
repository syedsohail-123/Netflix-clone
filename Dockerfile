FROM nginx:stable-alpine

COPY Netflix-clone/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 86

CMD ["nginx", "-g", "daemon off;"]





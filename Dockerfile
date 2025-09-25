FROM nginx:stable-alpine

# Copy built files from Netflix-clone/dist
COPY Netflix-clone/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 86
EXPOSE 86

CMD ["nginx", "-g", "daemon off;"]




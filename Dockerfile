# Use Nginx to serve already built files
FROM nginx:stable-alpine

# Copy built files (inside Netflix-clone/dist)
COPY Netflix-clone/dist /usr/share/nginx/html

# Copy nginx.conf (if you have it inside repo root)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



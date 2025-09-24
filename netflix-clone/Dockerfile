# Use Nginx to serve already built files
FROM nginx:stable-alpine

# Copy built files from local machine (dist folder must exist)
COPY dist /usr/share/nginx/html

# Copy custom nginx config (optional, for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 86

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


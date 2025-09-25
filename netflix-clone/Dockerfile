# Dockerfile
FROM nginx:stable-alpine

# Copy built files from dist directory (must be in build context)
COPY dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 86 for nginx (as per your config)
EXPOSE 86

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]







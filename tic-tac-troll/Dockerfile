# Use nginx to serve the static React build
FROM nginx:alpine

# Copy build folder into nginx html directory
COPY build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

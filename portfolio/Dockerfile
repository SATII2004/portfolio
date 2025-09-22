# Stage 1: Build the React application
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# You can add a custom nginx.conf file here if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
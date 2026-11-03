# syntax=docker/dockerfile:1
# Multi-stage Dockerfile for WorkFlowHub React Frontend

# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency specifications
COPY package.json ./

# Install npm dependencies
RUN npm install

# Copy source code
COPY . .

# Build argument for API base URL
ARG REACT_APP_API_URL=http://localhost:8000/api
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Build optimized production bundle
RUN npm run build

# Stage 2: Serve production bundle with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build artifacts from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

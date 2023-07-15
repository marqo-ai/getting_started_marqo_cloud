# Stage 1: Build the frontend
FROM node:14 as frontend_builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend ./
RUN npm run build

# Stage 2: Setup the backend and serve the frontend
FROM python:3.9-slim-buster

WORKDIR /app

# Copy the backend requirements.txt file to the container
COPY backend/requirements.txt ./

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code to the container
COPY backend ./backend

# Copy the frontend build from the previous stage
COPY --from=frontend_builder /app/frontend/build ./frontend/build

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Remove the default Nginx configuration
RUN rm /etc/nginx/sites-enabled/default

# Copy the custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/sites-enabled/

# Expose the port for Nginx
EXPOSE 80

# Set environment variables as arguments
ARG MARQO_API_URL
ARG MARQO_API_KEY
ARG MARQO_INDEX

# Start Nginx and the Flask app with environment variables
CMD sed -i "s|MARQO_API_URL|$MARQO_API_URL|g" /app/backend/app.py && \
    sed -i "s|MARQO_API_KEY|$MARQO_API_KEY|g" /app/backend/app.py && \
    sed -i "s|MARQO_INDEX|$MARQO_INDEX|g" /app/backend/app.py && \
    service nginx start && \
    gunicorn --bind 127.0.0.1:5000 -w 2 backend.app:app

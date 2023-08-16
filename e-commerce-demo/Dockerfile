

# Stage 1: Build the frontend
# FROM node:18 as frontend_builder
# COPY frontend /app/frontend

# WORKDIR /app/frontend
# RUN npm ci
# RUN REACT_APP_ENV=production npm run build

# Stage 2: Setup the backend and serve the frontend
FROM python:3.11-slim-buster
COPY backend /app/backend
WORKDIR /app/backend
RUN pip3 install --no-cache-dir -r requirements.txt
ENV PYTHONPATH /backend

# Stage 3: Pull it all together
WORKDIR /app

# Copy the frontend build from the previous stage
# COPY --from=frontend_builder /app/frontend/build ./frontend/build

COPY ./frontend/build /app/frontend/build 

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
    cd backend/ && \
    gunicorn -b 127.0.0.1:5000 app:app --workers 2

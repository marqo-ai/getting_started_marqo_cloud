# E-Commerce Marqo Cloud Demo

## Setup

Set environment variables:
```
export MARQO_API_URL="http://localhost:8882"
export MARQO_API_KEY=""
export MARQO_INDEX="e-commerce-demo-index"
```

# Indexing the data
```
python -m venv venv 
source venv/bin/activate
pip install -r requirements.txt
python index_data.py
```

## Dev
Frontend: 
```
cd frontend
npm run start
```

Backend:
```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

## Docker Build
Build the UI:
```
REACT_APP_ENV=production npm run build
```

Build the image:
```
docker build -t e-commerce-demo .
```

```
docker run -p 80:80 --env MARQO_API_URL="$MARQO_API_URL" --env MARQO_API_KEY="$MARQO_API_KEY" --env MARQO_INDEX="$MARQO_INDEX" e-commerce-demo
```

## Deploying on Elastic Beanstalk
Initialise the Elastic Beanstalk project:
```
eb init
```

Set environment variables:
```
eb setenv MARQO_API_URL="http://localhost:8882"
eb setenv MARQO_API_KEY=""
eb setenv MARQO_INDEX="e-commerce-demo-index"
```

Create the application and deploy all resources to AWS:
```
eb create -s
```

### Cleanup application

This will instantly terminate the application and clean up all resources except for an S3 bucket.
```
eb terminate --force
```
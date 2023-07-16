# E-Commerce Marqo Cloud Demo

## Setup

### Dev
Set environment variables:
```
export MARQO_API_URL="http://localhost:8882"
export MARQO_API_KEY=""
export MARQO_INDEX="e-commerce-demo-index"
```

## Docker Build
Build the image:
```
docker build -t e-commerce-demo .
```

```
docker run -p 80:80 --env MARQO_API_URL="<MARQO URL>" --env MARQO_API_KEY="<API KEY>" --env MARQO_INDEX="<index name>" e-commerce-demo
```

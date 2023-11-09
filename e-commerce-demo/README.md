# Image Search Application Quickstart



https://github.com/marqo-ai/getting_started_marqo_cloud/assets/41710527/ae60d405-8ee1-47d6-a719-eeab55bae3bd



In this tutorial we will build an image search application using Marqo! We will start with an existing code base and then walk through how to customise the behaviour.

The total cost of running this application on will depend on your configuration. This demo will use `marqo.basic` storage and `marqo.CPU.large` inference, you are welcome to use `marqo.GPU` inference however it will cost more. The suggested configuration will cost approximately \$0.3780 per hour and the anticipated time to complete the tutorial is 1 to 2 hours. If you want to index the data faster you can use a `marqo.GPU` for a total of \$1.0310 per hour. You don't need to index all the data to benefit from this tutorial however your search results will get better and more interesting as you index more data. Indexing images is significantly faster on a GPU. If you do index all the data you can expect to see results similar to our [live demo site](https://demo.marqo.ai/). You can also index with a GPU and then switch to a CPU afterwards.


## Building your first image search application with Marqo

In this tutorial we will create an E-commerce image search platform using a dataset of AI generated E-commerce data. Our dataset has product titles, descriptions, costs, aesthetic scores and images. In total there are around 250,000 images.

For this tutorial you will need Python, Node.JS, Docker, and Git to be installed. A basic understanding on Python is assumed, an intermediate understand will be useful for customisation of application behaviour at the end.

Please ensure that Python, Node, Docker, and Git work before preceeding. If you are on windows you will need to use the Windows Subsystem for Linux to follow along.

Clone the repo with `git clone https://github.com/marqo-ai/getting_started_marqo_cloud.git`.

## Project Overview

This project is a web application with frontend and backend using Python, Flask, ReactJS, and Typescript. The frontend is a ReactJS application that makes requests to the backend which is a Flask application. The backend makes requests to your Marqo cloud API.

For deployment the flask app is served with a WSGI server and the frontend accesses its routes via a reverse proxy setup with NGINX.

This monolithic architecture is simple yet effective and the concepts in this guide can be extended to other languages, frameworks, and non-monolithic applications.

## Creating your index

Head to your [Marqo Cloud console](https://cloud.marqo.ai) and create a new index. Use the following settings:

- Index name: `e-commerce-demo-index`
- Indexing mode: `Image-compatible`
- Storage shard type: `marqo.basic`
- Inference pod type: `marqo.CPU.large`
- Number of shards: `1`
- Number of replicas: `0`
- Number of inference pods: `1`

### Setup

Clone the repository if you haven't already done so `git clone https://github.com/marqo-ai/getting_started_marqo_cloud.git`.

```
cd getting_started_marqo_cloud
cd e-commerce-demo
```

#### Indexing the data

The first step here is to index the data for the demo, the script is ready to go for you - you just need to set the environment variables for your Marqo endpoint and API key. 

```
export MARQO_API_URL="<your index url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="e-commerce-demo-index"
```

Make a virtual environment:
```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

You can then index the data by running the following script.
```
python3 index_data.py
```
This script will index the data and log the document ids that have been indexed as it goes. A progress bar will show where it is up to. Indexing all 250,000 products will take a while so don't wait for it to finish to continue with the tutorial, just let it work away in the background. 

Open up a two new terminals to continue on.

### Development 

#### Backend

Next we want to start the backend webserver. This webserver acts as an intermediate between Marqo and the UI. It will take the search query from the UI and send it to Marqo, it will then take the results from Marqo and send them back to the UI. This lets us keep our API key secret and also lets us do some pre and post processing of the data. This pattern is typical of many application and can be implemented in any language that can make HTTP requests. In this demo we use Python and Flask however you could use almost any language you like or implement this via serverless functions in the cloud.

In one of your terminals navigate to the `./e-commerce-demo/backend` directory and create a virtual environment for the backend.

```
export MARQO_API_URL="<your index url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="e-commerce-demo-index"

python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

We can now run the webserver for the backend.
```
python3 app.py
```

#### Frontend

In your other terminal we will start the frontend. For this demo the frontend is written using ReactJS and TypeScript. This app makes requests to the Flask server when searches are made, the results hydrate the UI. Navigate to the `./e-commerce-demo/frontend` directory and install the dependencies and start the frontend.

```
npm i
```

We can then run the development server with:
```
npm run start
```

### Experiment

You will be able to search straight away however the experience will get better with time as your index becomes more and more diverse. You will notice though that you always get search results back, this is one of the great things about vector search, it will always return something.

Here are some searches to try out, you can use the three search fields in different combinations to test the results:

| Query | More of | Less of |
| --- | --- | --- |
| shirt | buttons | sleeves|
| shoes | formal | black |
| tshirt | amazon | |
| rolex | gold | |
| handbag | | office job |
| I have a gala coming up | | |
| Some shoes that I can skateboard in | converse | |


This demo also includes a favourting system. Any text or images that you favourite will be added to all queries. Favouriting more things gives you more of an average across the items. Favouriting lots of images may slow down your search on a CPU inference node.

You can also edit the weights assigned to each part of the search via the search settings menu. This will let you experiment with the behaviour of the search.

### Customise (optional)

We can make changes to the code to change how the search behaves. In this section we will list some changes that you can experiment with the customise the search, changes to the backend code will automatically update the server.

#### Updating query construction

Open up `./e-commerce-demo/backend/marqo_search.py`.

The `compose_query` function is where we construct the query and its weights for Marqo. This is what enables for "more of this and less of that" style searches in the UI.

```python
DEFAULT_SEARCH_SETTINGS = SearchSettings(
    query_weight=1.0,
    pos_query_weight=0.75,
    neg_query_weight=-1.1,
    total_favourite_weight=0.5,
)


def compose_query(
    query: str,
    more_of: str,
    less_of: str,
    favourites: List[str],
    search_settings: SearchSettings = None,
) -> Dict[str, float]:
    if not search_settings:
        search_settings = DEFAULT_SEARCH_SETTINGS

    composed_query = {}
    if query:
        composed_query = {query: search_settings.query_weight}
    if more_of:
        more_term = query + ", " + more_of
        composed_query[more_term] = search_settings.pos_query_weight
    if less_of:
        composed_query[less_of] = search_settings.neg_query_weight

    total_fav_weight = search_settings.total_favourite_weight
    for favourite in favourites:
        composed_query[favourite] = total_fav_weight / len(favourites)

    if not composed_query:
        composed_query = {"": 1.0}
    return composed_query
```

The weights in search settings are configurable via the UI however you can experiment with changing the function to explore different behaviours.

For example, you could change the `more_term` construction. Currently it will also include the main query, this is done to avoid a query for `watch` with more of `gold` getting divereted away from watch and towards gold. Try removing this to see the behaviour without it.

You could also experiment with how favourites are handled by modifying the contributes for text and image favourites separately.

You can also add implicit query expansions, for example every query could have a negative weight on `bad, ai generated, weird` to avoid these images in all searches without the user having to specify this.

#### Adding score modifiers

Marqo support score modifiers, these allow you to change to ranking of the results using attributes of the documents. For example, you could boost the score for results where the seller is reputable or where the product is popular.

For the demo we can boost works using their aesthetic score. In the `search` function we can add score modifiers as follows:

```python
def search(
    query: str, more_of: str, less_of: str, limit: int = 50
) -> List[SearchResult]:
    ...

    result = MQ.index(index).search(
        composed_query, 
        limit=limit,
        score_modifiers = {
            "add_to_score": [{"field_name": "aesthetic_score", "weight" : 0.2}] 
        }
    )
    
    ...
```

You can experiment with different weight to see how it impacts the search.

## Deployment

We can deploy this application using AWS and docker. First lets get a local production build working and then we can deploy it to AWS.

The docker build process for this app assumes that the UI has already been built for production, this helps with deployment on smaller machines as the UI build process is quite resource intensive. To build the UI for production run the following command from the ./e-commerce-demo/frontend directory.

```
REACT_APP_ENV=production npm run build
```

The `REACT_APP_ENV` environment variable is used to set the environment for the UI, this is used to determine which API endpoint to use. The `npm run build` command will build the UI for production and place the output in the `./e-commerce-demo/frontend/build` directory.

Once this is done we can build the docker image. Navigate up one directory with `cd ..` and run:

```
docker build -t e-commerce-demo .
```

You can then run the docker container locally with:
```
export MARQO_API_URL="<your index url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="e-commerce-demo-index"

docker run -p 80:80 --env MARQO_API_URL="$MARQO_API_URL" --env MARQO_API_KEY="$MARQO_API_KEY" --env MARQO_INDEX="$MARQO_INDEX" e-commerce-demo
```

The application should now be running on `http://localhost/`.

## Deploying on Elastic Beanstalk
Initialise the Elastic Beanstalk project:
```
pip install awsebcli
eb init
```

Choose your region of choice and name the application. For platform select the first option (Docker running on 64bit Amazon Linux 2). For SSH you can say no.

Create the application and deploy all resources to AWS:
```
eb create -s
```
You can use all default options for this step.

Wait for the app to deploy, once the environment is created successfully we need to push an update to the app with the correct environment variables to make it work.

Set environment variables:
```
eb setenv MARQO_API_URL=$MARQO_API_URL MARQO_API_KEY=$MARQO_API_KEY MARQO_INDEX=$MARQO_INDEX
```

### Cleanup application

This will instantly terminate the application and clean up all resources except for an S3 bucket.
```
eb terminate --force
```

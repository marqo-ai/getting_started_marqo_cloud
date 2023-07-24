# Image Search Application Quickstart

In this tutorial we will build an image search application using Marqo! We will start with an existing code base and then walk through how to customise the behaviour.

The total cost of running this application on will depend on your configuration. You can run it on `marqo.basic` storage and inference however it will be slow to index the data. This configuration will cost approximately \$0.1186 per hour and the anticipated time to complete the tutorial is |TIME|, for a total of \$|TIME|x0.1186 cost. If you want to index the data faster you can use a `marqo.CPU` or `marqo.GPU` for a total of \$0.3780 and \$1.0310 respectively. You don't need to index all the data to benefit from this tutorial however your search results will get better and more interesting as you index more data. Indexing images is significantly faster on a GPU.


## Building your first image search application with Marqo

In this tutorial we will create an E-commerce image search platform using a dataset of AI generated E-commerce data. Our dataset has product titles, descriptions, costs, aesthetic scores and images. In total there are around 250,000 images.
<!-- For this tutorial you will need Python and git to be installed. A basic understanding on Python is assumed. -->
<!-- For this tutorial you will need Python, Node.JS, and git to be installed. A basic understanding on Python is assumed. -->

The application has a frontend and a backend. The frontend is written in NextJS and it sends fetch requests to the backend which is written as a webserver using Python and Flask. The backend webserver uses the Marqo Python client to connect to your Marqo cloud account.

## Creating your index

Head to your [Marqo Cloud console](https://cloud.marqo.ai) and create a new index. Use the following settings:

- Index name: `e-commerce-demo-index`
- Indexing mode: `Multimodal`
- Storage shard type: `marqo.basic`
- Inference pod type: `marqo.basic`
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

In one of your terminals navigate to the ./e-commerce-demo/backend directory and create a virtual environment for the backend.

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

In your other terminal we will start the frontend. For this demo the frontend is written using ReactJS and TypeScript. This app makes requests to the Flask server when searches are made, the results hydrate the UI. Navigate to the ./e-commerce-demo/frontend directory and install the dependencies and start the frontend.

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

### Customise (optional)

We can make changes to the code to change how the search behaves. In this section we will list some changes that you can experiment with the customise the search, changes to the backend code will automatically update the server.

#### Updating query construction

Open up `./e-commerce-demo/backend/marqo_search.py`.

The `compose_query` function is where we construct the query and its weights for Marqo. This is what enables for "more of this and less of that" style searches in the UI.

```python
def compose_query(query: str, more_of: str, less_of: str) -> Dict[str, float]:
    composed_query = {
        query: 1.0,
    }
    if more_of:
        composed_query[more_of] = 0.75
    if less_of:
        composed_query[less_of] = -1.1

    return composed_query
```

You can experiment with these weights to see how they impact your searches. For example, if you want to make the `more_of` term more important you can increase its weight from `0.5` to `0.75`.

You could also add prompting into the query, for example you could force "higher quality" images in your results by adding `composed_query["high quality, high resolution"] = 0.2` to the query.

Or perhaps you want to suppress some of the stranger AI generated images in the dataset, you could add `composed_query["weird, deformed, AI generated"] = -0.3` to the query.

These prompting strategies are a powerful way to customise your search experience.

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

The `REACT_APP_ENV` environment variable is used to set the environment for the UI, this is used to determine which API endpoint to use. The `npm run build` command will build the UI for production and place the output in the ./e-commerce-demo/frontend/build directory.

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
eb init
```

Create the application and deploy all resources to AWS:
```
eb create -s
```

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
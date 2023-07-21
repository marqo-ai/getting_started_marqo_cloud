# Geting Started with Marqo Cloud

Welcome to the Marqo Cloud getting started guide. In this page we will go through how to get set up and running with Marqo Cloud starting from your first time login through to building your first application with Marqo.

# Navigating the Console

In this section we will get aquainted with the console.

## First time login

Your welcome email will have included a link to the Marqo console for your signup. Follow the link to reach the login page.

<!-- IMAGE GOES HERE -->

Choose a password and then use your email you used to sign up and your new password to login. 

## Tour of the Console

Once logged in you will be greeted by the landing page for the console.

## Making an Index


### Storage

### Inference

### Endpoints

## Making an API key

## Testing your endpoint

You can check that your endpoint is up and running for your index with the `/indexes` endpoint. You will need to have created and index and given the inference nodes time to finish initialising as described in the previous steps. You can then run the health check in Python or via cURL as follows.

Python:
```python
import marqo
url = "<your endpoint url goes here>"
api_key = "<your api key goes here>"
mq = marqo.Client(url, api_key)
indexes = mq.get_indexes()
print(indexes)
```
cURL
```curl
curl "http://<your endpoint url>/indexes" -H 'X-API-KEY: <your api key>'
```

You should see output along the lines of

```
{"results": [{"index_name": "my-first-index"}]}
```

## Deleting an Index

## Adding other people to the account (optional)

# Marqo Demo Applications

The following demo applications are a good way to get started building with your new Marqo cloud account! The applications are stored in a getting started repo, you can get the code by cloning it.

```
git clone https://github.com/marqo-ai/getting_started_marqo_cloud.git
```


# Image Search Application Quickstart

In this tutorial we will build an image search application using Marqo! We will start with an existing code base and then walk through how to customise the behaviour.

The total cost of running this application on will depend on your configuration. You can run it on `marqo.basic` storage and inference however it will be slow to index the data. This configuraiton will cost approximately $0.1186 per hour and the anticipated time to complete the tutorial is TIME, for a total of $TIMEx0.1186 cost. If you want to index the data faster you can use a `marqo.CPU` or `marqo.GPU` for a total of $0.3780 and $1.0310 respectively. You don't need to index all the data to benefit from this tutorial however your search results will get better and more interesting as you index more data. Indexing images is significantly faster on a GPU.


## Building your first image search application with Marqo

In this tutorial we will create an E-commerce image search platform using a dataset of AI generated E-commerce data. Our dataset has product titles, descriptions, costs, aesthetic scores and images. In total there are around 250,000 images.
<!-- For this tutorial you will need Python and git to be installed. A basic understanding on Python is assumed. -->
<!-- For this tutorial you will need Python, Node.JS, and git to be installed. A basic understanding on Python is assumed. -->

The application has a frontend and a backend. The frontend is written in NextJS and it sends fetch requests to the backend which is written as a webserver using Python and Flask. The backend webserver uses the Marqo Python client to connect to your marqo cloud account.

### Setup

Clone the repository and install the requirements.

```
git clone ""
cd ""
```

The first step here is to index the data for the demo, the script is ready to go for you - you just need to set the environment variables for your Marqo endpoint and API key. 

```
export MARQO_API_URL="<your index url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="<your index name>"
```

You can then index the data by running the following script.
```
python index_data.py
```
This script will index the data and log the document ids that have been indexed as it goes. A progress bar will show where it is up to. Indexing all 250,000 products will take a while so don't wait for it to finish to continue with the tutorial, just let it work away in the background. 

Open up a couple of new terminals to continue on.

Next we want to start the backend webserver. This webserver acts as an intermediate between Marqo and the UI. It will take the search query from the UI and send it to Marqo, it will then take the results from Marqo and send them back to the UI. This lets us keep our API key secret and also lets us do some pre and post processing of the data. This pattern is typical of many application and can be implemented in any language that can make HTTP requests. In this demo we use Python and Flask however you could use almost any language you like or implement this via serverless functions in the cloud.

In one of your terminals navigate to the ./e-commerce-demo/backend directory and create a virtual environment for the backend.

```
export MARQO_API_URL="<your index url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="<your index name>"

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

We can now run the webserver for the backend.
```
python app.py
```

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

Here are some searches to try out:
<!-- SEARCHES TO TRY OUT GO HERE -->

### Customise (optional)

We can make changes to the code to change how the search behaves. In this section we will list some changes that you can experiment with the customise the search, changes to the backend code will automatically update the server.

#### Updating query construction

Open up `.e-commerce-demo/backend/marqo_search.py`.

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

Or perhaps you want to supress some of the stranger AI generated images in the dataset, you could add `composed_query["weird, deformed, AI generated"] = -0.3` to the query.

These prompting stratergies are a powerful way to customise your search experience.

#### Adding score modifiers

Marqo support score modifiers, these allow you to change to ranking of the results using attributes of the documents. For example, you could boost the score for results where the seller is reputible or where the product is popular.

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
            "add_to_score": 
                [{"field_name": "aesthetic_score", "weight" : 0.2}] 
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
export MARQO_INDEX="<your index name>"

docker run -p 80:80 --env MARQO_API_URL="$MARQO_API_URL" --env MARQO_API_KEY="$MARQO_API_KEY" --env MARQO_INDEX="$MARQO_INDEX" e-commerce-demo
```

The application should now be running on `http://localhost/`.

## Deploying on Elastic Beanstalk

Initialise the Elastic Beanstalk project:
```
eb init
```

Set environment variables:
```
eb setenv MARQO_API_URL="<your index url>"
eb setenv MARQO_API_KEY="<your api key>"
eb setenv MARQO_INDEX="<your index name>"
```

Create the application and deploy all resources to AWS:
```
eb create -s
```

If you navigate to Elastic Beanstalk in your AWS console you should see your application being created. Once it is ready you will be able to use the URL provided by AWS to access your application.


When you are done you can instantly terminate all resources (except for the S3 bucket which you will need to remove manually) with:
```
eb terminate --force
```


# Chatbot Application Quickstart

In this guide we will build a chat bot application using your Marqo Cloud and OpenAI's ChatGPT API. We will start with an existing code base and then walk through how to customise the behaviour.

To begin you will need to create an API key for OpenAI, [get started here](https://openai.com/blog/openai-api). Once you have an API key, save it for use later in this tutorial.

You can run this demo on `marqo.basic` storage and inference as the amount of data is very small. This configuraiton will cost approximately $0.1186 per hour and the anticipated time to complete the tutorial is TIME, for a total of $TIMEx0.1186 cost.

The application also depends upon the `gpt-4-0613` model or the `gpt-3.5-turbo-0613` model from OpenAI, please refer to [their pricing](https://openai.com/pricing). `gpt-4-0613` is the default as it is significantly better at using the functions API. If you do not have access to GPT4's API or want to use a cheaper model then just swap to `gpt-3.5-turbo-0613` in `./backend/ai_chat.py`.

## Building your first chat bot with Marqo

In this tutorial we will build a chatbot that is able to access and use domain specific knowledge from organisational documentation, personal documents, or anything else you ask it to search for. We will use the OpenAI ChatGPT API to generate responses to user queries and Marqo to search for relevant documents to use as context for the chatbot.

This makes use of the function calling capabilites of the new `0613` models.

For this tutorial you will need Python, Node.JS, and git to be installed. A basic understanding on Python is assumed, an intermediate understand will be useful for customisation of application behaviour at the end.

### Setup

### Experiment

<!-- You can start by conversing normally with the chatbot, it should behave exactly like ChatGPT does. If you ask it to search for something however it will call out to Marqo to find relevant documents to use as context for the chatbot. This demo preloads your index with excerpts from the Marqo documentation so you can ask it questions about Marqo like "Search for how to add documents with the Marqo Python client".

If you are using GPT4 then it will be a lot better at using the functions API, you should be able to just say "How do I add documents in Marqo?" and GPT4 will be able to work out that it needs to search by calling the function to get the answer from Marqo. -->

### Customise

You can customise the behaviour by playing with the system prompts and the function description in the `ai_chat.py` file.

Another good excercise is to add more data to your index, perhaps some documents you have or some online information. You can then ask the chatbot questions about this new information. The schema of your documents doesn't matter in this demo as ChatGPT is given the entire document as context. That being said, you will get errors about GPT's context length if your documents are very long so it is best to keep them short and break larger documents into smaller ones (e.g. by chunking on paragraph).

# Further reading

## Documentation

For more information on Marqo and how to use it with Python and cURL please refer to the [documentation](https://docs.marqo.ai/latest).

## Examples

## Support
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

# Image Search Application Quickstart

In this tutorial we will build an image search application using Marqo! We will start with an existing code base and then walk through how to customise the behaviour.

<!-- The total cost of running this application will be $DOLLARS per hour and the anticipated time to complete the tutorial is TIME, for a total of $TIMExDOLLARS cost. -->

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
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Onces we have the project setup we can run the webserver to connect to our Marqo endpoint. We will need to set the environment variables for the endpoint and the API key.

Create a `.env` file and edit `MARQO_ENDPOINT` and `MARQO_API_KEY` like so
```
MARQO_ENDPOINT=<your endpoint url>
MARQO_API_KEY=<your api key>
```

Once this is done we can begin indexing our data. We will use the `index_data.py` script to index our data. This script will index the data and log the document ids that have been indexed as it goes. A progress bar will show where it is up to. Indexing all 250,000 products will take a while so don't wait for it to finish to continue with the tutorial, just let it work away in the background.

Open a new terminal in the same directory and activate the virtual environment again.
```
source venv/bin/activate
```

We can now run the webserver for the backend.
```
python3 app.py
```

While that is running we can open another terminal in the same directory and set up the front end.

```
cd frontend
npm install
npm run serve
```

### Experiment

You will be able to search straight away however the experience will get better with time as your index becomes more and more diverse. You will notice though that you always get search results back, this is one of the great things about vector search, it will always return something.

Here are some searches to try out:
<!-- SEARCHES TO TRY OUT GO HERE -->

### Customise (optional)

We can make changes to the code to change how the search behaves. In this section we will list some changes that you can experiment with the customise the search, changes to the beckend code will automatically update the server.


# Chatbot Application Quickstart

In this guide we will build a chat bot application using your Marqo Cloud and OpenAI's ChatGPT API. We will start with an existing code base and then walk through how to customise the behaviour.

To begin you will need to create an API key for OpenAI, [get started here](https://openai.com/blog/openai-api). Once you have an API key, save it for use later in this tutorial.

<!-- The total cost of running this application on will be $DOLLARS per hour and the anticipated time to complete the tutorial is TIME, for a total of $TIMExDOLLARS cost. The application also depends upon the gpt-3.5-turbo-0613 model from OpenAI, please refer to [their pricing](https://openai.com/pricing). -->

## Building your first chat bot with Marqo

In this tutorial we will build a chatbot that is able to access and use domain specific knowledge from organisational documentation, personal documents, or anything else you ask it to search for. We will use the OpenAI ChatGPT API to generate responses to user queries and Marqo to search for relevant documents to use as context for the chatbot.

This makes use of the function calling capabilites of the latest `gpt-3.5-turbo-0613` model.

For this tutorial you will need Python, Node.JS, and git to be installed. A basic understanding on Python is assumed, an intermediate understand will be useful for customisation of application behaviour at the end.

### Setup

### Experiment

### Customise

# Further reading

## Documentation

## Examples

## Support
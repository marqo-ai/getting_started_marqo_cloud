# Chatbot Application Quickstart

In this guide we will build a chat bot application using your Marqo Cloud and OpenAI's ChatGPT API. We will start with an existing code base and then walk through how to customise the behaviour.

To begin you will need to create an API key for OpenAI, [get started here](https://openai.com/blog/openai-api). Once you have an API key, save it for use later in this tutorial.

This demo will use `marqo.basic` storage and `marqo.CPU` inference, the amount of data is very small. The suggested configuration will cost approximately \$0.3780 per hour and the anticipated time to complete the tutorial is 1 to 2 hours. You will also be charged by OpenAI for usage of their ChatGPT API though the cost is minimal.

The application also depends upon the `gpt-4-0613` model or the `gpt-3.5-turbo-0613` model from OpenAI, please refer to [their pricing](https://openai.com/pricing). `gpt-4-0613` is the default as it is significantly better at using the functions API. If you do not have access to GPT4's API or want to use a cheaper model then just swap to `gpt-3.5-turbo-0613` in `./backend/ai_chat.py`.

## Building your first chat bot with Marqo

In this tutorial we will build a chatbot that is able to access and use domain specific knowledge from organisational documentation, personal documents, or anything else you ask it to search for. We will use the OpenAI ChatGPT API to generate responses to user queries and Marqo to search for relevant documents to use as context for the chatbot.

This makes use of the function calling capabilities of the new `0613` models.

For this tutorial you will need Python, Node.JS, Docker, and Git to be installed. A basic understanding on Python is assumed, an intermediate understand will be useful for customisation of application behaviour at the end.

Please ensure that Python, Node, Docker, and Git work before preceeding. If you are on windows you will need to use the Windows Subsystem for Linux to follow along.

Clone the repo with `git clone https://github.com/marqo-ai/getting_started_marqo_cloud.git`.

## Project Overview

This project is a web application with frontend and backend using Python, Flask, ReactJS, and Typescript. The frontend is a ReactJS application that makes requests to the backend which is a Flask application. The backend makes requests to your Marqo cloud and OpenAI's ChatGPT API.

For deployment the flask app is served with a WSGI server and the frontend accesses its routes via a reverse proxy setup with NGINX.

This monolithic architecture is simple yet effective and the concepts in this guide can be extended to other languages, frameworks, and non-monolithic applications.

## Creating your index

Head to your [Marqo Cloud console](https://cloud.marqo.ai) and create a new index. Use the following settings:

- Index name: `chatbot-demo-index`
- Indexing mode: `Text-based`
- Storage shard type: `marqo.basic`
- Inference pod type: `marqo.CPU`
- Number of shards: `1`
- Number of replicas: `0`
- Number of inference pods: `1`

### Setup

Clone the repository if you haven't already done so `git clone https://github.com/marqo-ai/getting_started_marqo_cloud.git`.

```
cd getting_started_marqo_cloud
cd chatbot-demo
```

#### Indexing the data

This demo comes packaged with a script to index some excerpts from the Marqo documentation for you. You are welcome to adjust this script to index your own data if you like, for the purposes of getting started we recommend completing the tutorial before adding your own data.

Set environment variables:
```
export MARQO_API_URL="<your endpoint url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="chatbot-demo-index"
```

```
python3 -m venv venv 
source venv/bin/activate
pip3 install -r requirements.txt
python3 index_data.py
```

Open up a two new terminals to continue on.

### Development

#### Backend
Next we want to start the backend webserver. This webserver takes the conversation from the front end and gives it to ChatGPT, ChatGPT will then decided if it wants to use Marqo. If Marqo is used then a request to Marqo will be sent and the response will form part of the conversation and a followup will be generated. 


The webserver lets us keep our API key secret and also lets us do some pre and post processing of the data. This pattern is typical of many application and can be implemented in any language that can make HTTP requests. In this demo we use Python and Flask however you could use almost any language you like or implement this via serverless functions in the cloud.

In one of your terminals navigate to the `./chatbot-demo/backend` directory to set the environment variables and create a virtual environment for the backend.

Set environment variables:
```
export MARQO_API_URL="<your endpoint url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="chatbot-demo-index"
export OPENAI_API_KEY="<your OPENAI API key>"
```
Run the backend:
```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 app.py
```

#### Frontend

In your other terminal we will start the frontend. For this demo the frontend is written using ReactJS and TypeScript. This app makes requests to the Flask server when searches are made, the results hydrate the UI. Navigate to the `./chatbot-demo/frontend` directory and install the dependencies and start the frontend.

```
npm i
```

We can then run the development server with:
```
npm run start
```

### Experiment

You can start by conversing normally with the chatbot, it should behave exactly like ChatGPT does. If you ask it to search for something however it will call out to Marqo to find relevant documents to use as context for the chatbot. This demo preloads your index with excerpts from the Marqo documentation so you can ask it questions about Marqo like "Search for how to add documents with the Marqo Python client".

If you are using GPT4 then it will do a lot better with the function calls and hallucinate a lot less in the responses.

Have a look in `./example_data/texts/` to see what sort of data was indexed and thus what things you can expect to be able to ask the chatbot about.

### Customise

You can customise the behaviour by playing with the system prompts and the function description in the `ai_chat.py` file.

Another good exercise is to add more data to your index, perhaps some documents you have or some online information. You can then ask the chatbot questions about this new information. The schema of your documents doesn't matter in this demo as ChatGPT is given the entire document as context. That being said, you will get errors about GPT's context length if your documents are very long so it is best to keep them short and break larger documents into smaller ones (e.g. by chunking on paragraph).


## Deployment

We can deploy this application using AWS and docker. First lets get a local production build working and then we can deploy it to AWS.

The docker build process for this app assumes that the UI has already been built for production, this helps with deployment on smaller machines as the UI build process is quite resource intensive. To build the UI for production run the following command from the ./chatbot-demo/frontend directory.

```
REACT_APP_ENV=production npm run build
```

The `REACT_APP_ENV` environment variable is used to set the environment for the UI, this is used to determine which API endpoint to use. The `npm run build` command will build the UI for production and place the output in the ./chatbot-demo/frontend/build directory.

Once this is done we can build the docker image. Navigate up one directory with `cd ..` and run:

```
docker build -t chatbot-demo .
```

You can then run the docker container locally with:
```
export MARQO_API_URL="<your index url>"
export MARQO_API_KEY="<your api key>"
export MARQO_INDEX="e-commerce-search-demo"
export OPENAI_API_KEY="<your OPENAI API key>"

docker run -p 80:80 --env MARQO_API_URL="$MARQO_API_URL" --env MARQO_API_KEY="$MARQO_API_KEY" --env MARQO_INDEX="$MARQO_INDEX" --env OPENAI_API_KEY=$OPENAI_API_KEY chatbot-demo
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
eb setenv MARQO_API_URL=$MARQO_API_URL MARQO_API_KEY=$MARQO_API_KEY MARQO_INDEX=$MARQO_INDEX OPENAI_API_KEY=$OPENAI_API_KEY
```

### Cleanup application

This will instantly terminate the application and clean up all resources except for an S3 bucket.
```
eb terminate --force
```
# frontend-stuff
A repository to practice some frontend stuff includes: Typescript, react testing library with jest, redux toolkit, rtk query, graphql, bootstrap

Currently, this website consists of two parts. One is RTK(redux toolkit) and Graphql. 

deploy on Github.io [https://deltalf.github.io/frontend-stuff](https://deltalf.github.io/frontend-stuff/)  

back-end code is [here](https://github.com/DeltaLF/Backend-for-frontend-stuff) on GitHub  

## RTK: practicing RTK

4 buttons to create a new to do

Create: Create todo from a bootstrap form and store it in the redux store.

Fetch Joke with RTK Query: Use redux toolkit query to send API to a third-party server to fetch a joke and then use the returned joke to create a todo card.

Fetch Joke with redux-thunk: Aprt from RTK query, we can use redux-thunk to dispatch asynchronous behavior( fetch joke from third-party server).

Fetch Joke with graphql: The third-party server also offers graphql endpoints. This button is used to send graphql query with 3 parameters.

## Graphql: practicing Graphql (backend + frontend)

### Frontend:

1. query: Use RTK query to fetch all counters data from my backend. 
2. mutation: Update counter number with graphql mutation.

### Backend: 

request from FE → Node express server on Render.com → resolver handles corresponding query or mutation → invoke method of datasource → update data in MongoDB Atlas → node express responds result to FE

![frontend stuff](https://github.com/DeltaLF/frontend-stuff/blob/update-readme/frontend_stuff.JPG)

# Documentation
- [GraphQL Documentation](https://graphql.org/) - Information on GraphQL
- [Graphene Documentation](https://docs.graphene-python.org/projects/django/en/latest/installation/) - Used for backend GraphQL with Django
- [Apollo Client](https://www.apollographql.com/docs/react/) - Used for frontend GraphQL with React

# Learning Objectives
- Gain a basic understanding of graph query language and common terminology.
- Learn the advantages and disadvantages of GraphQL over REST.
- How to build a GraphQL API in a Django project.
- How to consume a GraphQL API in a React project.

# Instructions

Whether you follow along in class with the lecture or you tackle this on your own time, you will want to be mindful of which `branch` you have checked out.

## Branches Overview

### Main -- Initial Starting Point for Class/Lecture
**Description**:
- This branch contains a simple GraphQL Django/React project to demonstrate using GraphQL in an application.
- Simple demonstration to quickly cover all of the learning objectives.
- Instructions on how to build the code from scratch are in the respective `frontend/README.md` or `backend/README.md`.

**Tasks**:
- Clone and run the React/Django project.
- Make sure to `makemigrations`, `migrate`, and `loaddata` (movies) before running your backend server.
- Run the backend code and visit `http://localhost:8000/graphql/`.
- Interact with the built-in tool provided for documenting and interacting with our root schema.
- Run the frontend code and see if you are able to view the data from your backend API.
- Examine the changes needed to implement GraphQL in React with Apollo Client.

**Bonus**:
- Obtain some data and load it into your PostgreSQL DB. Can you create another query?

**Dependencies** (in case `requirements.txt` is missing or incomplete):
- `graphene-django` (Django)
- `"psycopg[binary]"` (Django)
- `apollo-client` (React)
- `graphql` (React)

### GRAPHQL -- Examples of using Queries and Mutations
**Description**:
- This branch contains a simple GraphQL Django/React project that makes use of queries and mutations.
- Provides examples of writing simple queries and mutations.
- Includes 3 queries: get a random movie, get a single movie, and get all movies.
- Includes 1 mutation to create a movie.

**Tasks**:
- No specific tasks. Use this branch to learn how to write queries and mutations in GraphQL.

### DJOSER -- Example of handling Auth/Login in GraphQL
**Description**:
- This branch demonstrates setting up JWT Authentication using the Djoser library and implementing a GraphQL API.
- Provides an example of connecting user login/authentication with a GraphQL API.
- Djoser is used for its built-in endpoints to handle authentication.

**Tasks**:
- No specific tasks. Use this branch as a reference to set up authentication in your own projects.

**Bonus**:
- This branch includes working login and authentication, with the `UserProfile` model having a Many-to-Many relationship with `Movies`.
- Add a feature or two to demonstrate CRUD capabilities for the user.

# Intro to GraphQL

GraphQL is a query language for your API and a server-side runtime for executing queries using a type system you define for your data. GraphQL isn’t tied to any specific database or storage engine and is instead backed by your existing code and data.

In practice, both GraphQL and REST send HTTP requests and receive HTTP responses.

GraphQL was created by Meta (formerly Facebook) to address problems they faced with the standard REST protocol.

You can think of some familiar features from Facebook (e.g., Likes). GraphQL's main purpose is to navigate a relational network (to query a relational graph).

## Key Concepts

### Schema-First Approach
- **Designing the Schema**: Determine how to build the schema based on the needs of the client.

### Graphs, Nodes, and Edges
- **Graph**: A collection of nodes (entities) and edges (relationships between entities). In GraphQL, the entire schema can be seen as a graph, representing how different entities relate to each other.
- **Nodes**: Individual entities or objects in the graph (e.g., a `Movie` or a `User`).
- **Edges**: The connections or relationships between nodes (e.g., a `User` who likes a `Movie`).

### Queries and Mutations
- **Query (Read)**: A request to fetch data. It is analogous to a GET request in REST.
- **Mutation (Write)**: A request to modify data. It is analogous to POST, PUT, DELETE requests in REST.

GraphQL is used to traverse these graphs, nodes, and edges. It allows clients to specify the shape of the data they want, which is particularly useful for mobile users where the amount of data sent in a request costs `time` and `bandwidth`.

### Scalar Types in GraphQL
GraphQL has five built-in scalar types:
- **String**
- **Boolean**
- **Int**
- **Float**
- **ID**

You can use `!` to mark a field as required, or place it in brackets `[]` to denote a list of that type.

### GraphQL vs. REST
[A blog about REST vs GraphQL](https://www.cosmicjs.com/blog/graphql-vs-rest-a-quick-guide)

**REST (Representational State Transfer)**:
- Centers around resources, each identified by a URL.
- Well-suited for traditional table-based DB setups.
- Typically have many endpoints for resources.

**GraphQL (Graph Query Language)**:
- Schema-first design, with resources described in the schema.
- Allows specifying not only the resources but also which fields are needed.
- Creates a single endpoint for all queries.
- Default queries document available fields and queries.
- Strong typing.

### Benefits of REST
- No need for special libraries to consume someone else's API.
- Requests can easily be sent through common tools like `curl`, web browsers, Postman.

### Drawbacks of GraphQL
- Requires more tooling and support on both client and server sides.
- Generally not worth the investment for simple CRUD APIs.
- More difficult to cache and optimize.
- N + 1 problem: Related to letting the client decide what data they would like to request.

<details>
  <summary>See More about caching / optimization</summary>
  REST uses HTTP GET for fetching resources, and HTTP GET has a well-defined caching behavior.
  GraphQL has a `single point` of entry and uses `HTTP POST` by default.
  * This does not mean GraphQL cannot be used to properly cache data; it may require additional tools or be more complex in nature.*
</details>

## What is GraphQL?

GraphQL allows clients to request exactly the data they need, avoiding over-fetching and under-fetching common in REST APIs. It uses a single endpoint, and a strongly typed schema defines the capabilities of the API.

### GraphQL Terminology

- **Schema**: Defines the structure of the data and the types of queries and mutations that can be performed. It acts as a blueprint for the API.
- **Type Definitions (TypeDefs)**: Define the shape of the data in the schema using the Schema Definition Language (SDL).
- **Resolvers**: Functions that handle the logic for fetching the data for each field in the schema.
- **Queries**: Used to fetch data from the GraphQL server.
- **Mutations**: Used to modify data on the server, such as creating, updating, or deleting records.

### Example Type Definition

```graphql
type Movie {
  id: ID!
  title: String!
  year: Int!
  rating: String!
}

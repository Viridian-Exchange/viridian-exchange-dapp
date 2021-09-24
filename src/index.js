import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


// const client = new ApolloClient({
//     uri: "https://ran3xlrpb5bwrfovlulhvhcfz4.appsync-api.us-east-2.amazonaws.com/graphql",
//     headers: {
//         'X-API-KEY': gqlconfig.apiKey
//     }
//
// })

// const client = new Client({
//     url: gqlconfig.appsync.graphqlEndpoint,
//     region: gqlconfig.appsync.region,
//     auth: {
//         type: "API_KEY",
//         apiKey: gqlconfig.appsync.apiKey
//     }
// })
//
// const WithProvider = () => {
//     <ApolloProvider client = {client}>
//         <Rehydrated>
//             <App/>
//         </Rehydrated>
//     </ApolloProvider>
// }


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

import { ApolloProvider } from "@apollo/client";
import { useRoutes } from 'react-router-dom'
import { client } from "./app/client";
import { developmentRouters, publicRouters } from "./router";
import './App.css'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <PageRender />
    </ApolloProvider>
  )
}

const PageRender = () => {
  let routers = [
    publicRouters,
    developmentRouters,
  ]
  const ROUTER_SCOPE = useRoutes(routers)
  return ROUTER_SCOPE
}

export default App;

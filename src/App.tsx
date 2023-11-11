import { ApolloProvider } from "@apollo/client";
import { useRoutes } from 'react-router-dom'
import { client } from "./app/client";
import { developmentRouters, publicRouters } from "./router";
import './App.css'
import { Suspense } from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className={'loading-center-lg'}>
      <Spin />
    </div>
  )
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<Loading />}>
        <PageRender />
      </Suspense>
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

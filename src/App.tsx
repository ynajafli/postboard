import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import NewPostPage from "./pages/NewPostPage";
import Layout from "./components/Layout";


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={ <Layout /> }>
    <Route path='/' element={ <HomePage /> } />
    <Route path='/posts/:id' element={ <PostDetailPage /> }/> 
    <Route path='/new' element={ <NewPostPage /> } />
  </Route>
));

function App() {
  
  
  return (
    <>
      <RouterProvider router={ router } />
    </>
  );
}

export default App;
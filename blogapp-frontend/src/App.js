import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NewPost from "./pages/NewPost";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        {/*Login Route */}
        <Route exact path="/login" component={Login} />

        {/*Home page route */}
        <ProtectedRoute exact path="/" component={Home} />

        {/*Route for creating a new post */}
        <ProtectedRoute exact path="/posts/new" component={NewPost} />

        {/*Route for viewing a specific post */}
        <ProtectedRoute exact path="/posts/:postId" component={PostDetail} />

        {/*Route for editing an existing post */}
        <ProtectedRoute exact path="/posts/:postId/edit" component={PostEdit} />

        {/*Route to handle invalid routes */}
        <Route exact path="/not-found" component={NotFound} />

        {/*If url does not match with any of the above, redirect to /not-found */}
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;

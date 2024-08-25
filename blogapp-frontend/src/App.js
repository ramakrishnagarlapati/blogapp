import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import NewPost from "./pages/NewPost";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts/new" component={NewPost} />
        <Route exact path="/posts/:postId" component={PostDetail} />
        <Route exact path="/posts/:postId/edit" component={PostEdit} />
      </Switch>
    </div>
  );
}

export default App;

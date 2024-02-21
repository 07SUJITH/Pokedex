# react-router-dom
react-router-dom is a third-party library used in web applications built with React. It provides a robust solution for handling routing (the ability to move between different parts of an application when a user enters a URL or clicks an element (link, button, icon, image etc) within the application).

Here are some of the main components provided by react-router-dom:

BrowserRouter: A <BrowserRouter> uses HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

Route: It's the conditionally shown component based on matching the current URL's pathname. <Route path="/path" component={ComponentName} />

Link: It's a replacement for <a> tag. It's used to create links in your application where <Link to="/path">Go to Path</Link>

Switch: It renders the first child <Route> or <Redirect> that matches the location.

useParams: It's a hook that allows you to access the URL parameters from a path.

Here's a basic example of how to use react-router-dom:
```jsx
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;
```
In this example, clicking on the "Home" link will render the Home component, and clicking on the "About" link will render the About component.

# useParams
useParams is a hook in react-router-dom that allows you to access the URL parameters from a path. You define these parameters when you set up your routes.

Here's an example of how you might use useParams:
```jsx
    import { useParams } from 'react-router-dom';

    function MyComponent() {
    let { id } = useParams();

    return (
        <div>
        <h2>ID: {id}</h2>
        </div>
    );
    }

    // In your routes
    <Route path="/path/:id">
    <MyComponent />
    </Route>
```
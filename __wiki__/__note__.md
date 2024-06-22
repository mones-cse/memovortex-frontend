- use react-router-dom for routing
- use browser router for routing
- used this [tutorial](https://www.youtube.com/watch?v=Ul3y1LXxzdU&ab_channel=WebDevSimplified) for routing

# Folder Structure

- public/: Contains the static files, such as the HTML template, favicon, and other assets.
- src/: Contains the source code of the application.
  - assets/: Static assets like images, fonts, and icons used in the application.
  - components/: Reusable UI components.
  - containers/: Components that are tied to specific routes and contain other components.
  - hooks/: Custom React hooks.
  - context/: Context providers for global state management.
  - services/: API service files for making network requests.
  - utils/: Utility functions and constants.
  - styles/: Global styles and variables.

# why use immer

```js
const baseState = [
  {
    title: "Learn TypeScript",
    done: true,
  },
  {
    title: "Try Immer",
    done: false,
  },
];
```

without immer

```js
const nextState = baseState.slice(); // shallow clone the array
nextState[1] = {
  // replace element 1...
  ...nextState[1], // with a shallow clone of element 1
  done: true, // ...combined with the desired update
};
nextState.push({ title: "Tweet about it" });
```

with immer

```js
import { produce } from "immer";
const nextState = produce(baseState, (draft) => {
  draft[1].done = true;
  draft.push({ title: "Tweet about it" });
});
```

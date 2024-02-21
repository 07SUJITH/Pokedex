Custom hooks are  functions that allow you to reuse stateful logic across multiple components. They are a way to extract component logic into reusable functions. Custom hooks follow the naming convention of starting with the word "use" (e.g., `useCustomHook`). Custom hooks enable you to separate concerns, making your code more readable and maintainable.

Here's an example of a custom hook called `useCounter` that provides a counter functionality:

```jsx
import { useState } from 'react';

function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(count + step);
  };

  const decrement = () => {
    setCount(count - step);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return {
    count,
    increment,
    decrement,
    reset
  };
}

export default useCounter;
```

In this custom hook:

- We import the `useState` hook from React to manage state.
- We define a function called `useCounter` that takes `initialValue` and `step` as parameters. `initialValue` sets the initial value of the counter, and `step` defines how much the counter will be incremented or decremented.
- Inside the `useCounter` function, we use the `useState` hook to create a `count` state variable and a `setCount` function to update it.
- We define `increment`, `decrement`, and `reset` functions to update the count state based on the step and initial value.
- Finally, we return an object containing the current count value and the functions to manipulate it.

Now, you can use this custom hook in any of your components:

```jsx
import React from 'react';
import useCounter from './useCounter';

function Counter() {
  const { count, increment, decrement, reset } = useCounter(0, 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
```

In this component:

- We import `useCounter` from the custom hook file.
- We call `useCounter` inside the `Counter` component, providing initial values for the counter.
- We destructure the returned object from `useCounter` to get the `count`, `increment`, `decrement`, and `reset` functions.
- We use these functions to display and manipulate the counter state within the component.

Using custom hooks allows you to encapsulate logic and create reusable pieces of code that can be shared across different components.
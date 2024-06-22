import { useStore } from "../stores/useStore";

const Home = () => {
  const { count, setCount } = useStore();
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
      <p>Count is {count}</p>
      <button onClick={setCount}>Increment</button>
    </div>
  );
};

export default Home;

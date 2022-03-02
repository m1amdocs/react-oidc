import { useEffect, useState } from "react";
import { useAuth } from "./oidc";

export default function HomeView() {
  const { auth, isLoggedIn, user, tokens, checkingLogin } = useAuth();
  const [count, setCount] = useState(0);

  async function login() {
    await auth?.login();
  }

  async function logout() {
    await auth?.logout();
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <div>
      <h1>Howdy!</h1>
      <p>Count is {count}</p>
      {isLoggedIn && !checkingLogin ? (
        <>
          <h1>Logged in!</h1>
          <button onClick={logout}>Log out</button>
          <pre>
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
          <h2>Tokens</h2>
          <pre>
            <code>{JSON.stringify(tokens, null, 2)}</code>
          </pre>
        </>
      ) : (
        <button onClick={login}>Log in</button>
      )}
    </div>
  );
}

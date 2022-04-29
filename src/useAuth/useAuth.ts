import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { authAtom, tokensAtom, userAtom, privateScope } from "../atoms";

export function useAuth() {
  const [auth] = useAtom(authAtom, privateScope);
  const [user] = useAtom(userAtom, privateScope);
  const [tokens] = useAtom(tokensAtom, privateScope);

  const [isLoggedIn, setLoggedIn] = useState(user && auth?.user);
  const [checkingLogin, setCheckingLogin] = useState(true);

  async function checkLogin() {
    if (user || (await auth?.isLoggedIn())) {
      setLoggedIn(true);
      setCheckingLogin(false);
    } else {
      setLoggedIn(false);
      setCheckingLogin(false);
    }
  }

  useEffect(() => {
    checkLogin();
  }, [auth]);

  return { auth, user, isLoggedIn, tokens, checkingLogin };
}

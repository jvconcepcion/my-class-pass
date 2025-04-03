import { useState, useEffect } from 'react';
import { getWixClient } from '@/lib/wixClient';
import Cookies from 'js-cookie';

const wixClient = getWixClient();

const LoginCallback = () => {
  const [ nextPage, setNextPage ] = useState<string | null>(null);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const verifyLogin = async () => {
    const data = JSON.parse(localStorage.getItem('oauthRedirectData') ?? '{}');
    localStorage.removeItem('oauthRedirectData');

    try {
      const { code, state } = wixClient.auth.parseFromUrl();
      let tokens = await wixClient.auth.getMemberTokens(code, state, data);
      while (!tokens?.refreshToken?.value) {
        tokens = await wixClient.auth.getMemberTokens(code, state, data);
      }
      Cookies.set('session', JSON.stringify(tokens));
      window.location = data?.originalUri || '/';
    } catch (error: any) {
      setNextPage(data?.originalUri || '/');
      setErrorMessage(error.toString());
    }
  }

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <article>
      { errorMessage && <p>{errorMessage}</p>}
      { nextPage ? <a href={nextPage}>Continue</a> : <>Loading....</>}
    </article>
  )
}

export default LoginCallback;
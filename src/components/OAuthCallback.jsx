import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const DEFAULT_BACKEND_URL = "https://derivautobot-production.up.railway.app";

const getFirstParam = (params, names) => {
  for (const name of names) {
    const value = params.get(name);

    if (value) {
      return value;
    }
  }

  return "";
};

const getLegacyOAuthProfile = (params) => {
  const accessToken = getFirstParam(params, ["access_token", "token", "token1"]);

  if (!accessToken) {
    return null;
  }

  return {
    accessToken,
    profile: {
      token: accessToken,
      loginid: getFirstParam(params, ["loginid", "acct1"]),
      currency: getFirstParam(params, ["currency", "cur1"]),
      account_type: getFirstParam(params, ["account_type", "account_type1"]),
    },
  };
};

const exchangeAuthorizationCode = async ({ code, codeVerifier, redirectUri }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || DEFAULT_BACKEND_URL;
  const exchangeUrl =
    import.meta.env.VITE_DERIV_TOKEN_EXCHANGE_URL ||
    `${backendUrl}/oauth/token`;

  const response = await fetch(exchangeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      code_verifier: codeVerifier,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Could not complete Deriv login.");
  }

  const accessToken = data.access_token || data.token;

  return {
    accessToken,
    profile: data.profile || data.account || data.authorize || data.user || {
      token: accessToken,
      token_type: data.token_type,
      expires_in: data.expires_in,
    },
  };
};

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Confirming your Deriv login...");
  const { login, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    const completeLogin = async () => {
      if (hasHandledCallback.current) {
        return;
      }

      hasHandledCallback.current = true;
      setLoading(true);

      try {
        const error = searchParams.get("error");

        if (error) {
          throw new Error(
            searchParams.get("error_description") || "Deriv login was cancelled."
          );
        }

        const legacyAuth = getLegacyOAuthProfile(searchParams);

        if (legacyAuth) {
          const returnTo = sessionStorage.getItem("oauth_return_to") || "/run-bot";

          sessionStorage.removeItem("oauth_return_to");
          login(legacyAuth);
          navigate(returnTo, {
            replace: true,
          });
          return;
        }

        const code = searchParams.get("code");
        const returnedState = searchParams.get("state");
        const storedState = sessionStorage.getItem("oauth_state");
        const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
        const redirectUri =
          sessionStorage.getItem("oauth_redirect_uri") ||
          `${window.location.origin}/oauth/callback`;

        if (!code) {
          throw new Error("Deriv did not return an authorization code.");
        }

        if (!storedState || returnedState !== storedState) {
          throw new Error("Deriv login state did not match. Please try again.");
        }

        if (!codeVerifier) {
          throw new Error("Missing Deriv login verifier. Please try again.");
        }

        const authData = await exchangeAuthorizationCode({
          code,
          codeVerifier,
          redirectUri,
        });
        const returnTo = sessionStorage.getItem("oauth_return_to") || "/run-bot";

        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("pkce_code_verifier");
        sessionStorage.removeItem("oauth_redirect_uri");
        sessionStorage.removeItem("oauth_return_to");

        login(authData);
        navigate(returnTo, {
          replace: true,
        });
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    completeLogin();
  }, [login, navigate, searchParams, setLoading]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Deriv Account Login
        </h1>
        <p className="text-slate-600">{message}</p>
      </div>
    </div>
  );
};

export default OAuthCallback;

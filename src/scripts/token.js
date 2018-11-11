export async function fetchWithToken(url, options) {
  const accessToken = getAccessToken();
  options = options || {};
  options.body = options.body || {};
  options.headers = options.headers || {};
  options.headers["Authorization"] = "Bearer " + accessToken;
  options.headers["Content-Type"] = "application/json";

  const response = await fetch(startUrl + url, options);
  if (response.ok) {
    return response;
  }

  if (response.status === 401 && response.headers.has("Token-Expired")) {
    const refreshToken = getRefreshToken();

    const refreshResponse = await normalFetch("token", {
      method: "POST",
      body: {
        accessToken: accessToken,
        refreshToken: refreshToken
      }
    });

    if (!refreshResponse.ok) {
      return response;
    }

    const jsonRefreshResponse = await refreshResponse.json();

    saveAccessToken(jsonRefreshResponse.accessToken);
    saveRefreshToken(jsonRefreshResponse.refreshToken);
    return await fetchWithToken(url, options);
  } else {
    return response;
  }
}

export async function normalFetch(url, options) {
  options = options || {};
  options.body = options.body || {};
  options.headers = options.headers || {};
  options.headers["Content-Type"] = "application/json";
  return fetch(startUrl + url, options);
}

export async function LoginFetch(options) {
  const loginResponse = await normalFetch("token", options);
  if (loginResponse.ok) {
    const tokens = await loginResponse.json();
    saveAccessToken(tokens.accessToken);
    saveRefreshToken(tokens.refreshToken);
  } else {
    throw new Error("Failed to login");
  }
}

const startUrl = "https://localhost:5001/api/";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function saveAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

function saveRefreshToken(refreshToken) {
  return localStorage.setItem("refreshToken", refreshToken);
}

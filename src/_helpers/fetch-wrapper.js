import { useRecoilState } from 'recoil';

import { history } from '_helpers';
import { authAtom } from '_state';

export { useFetchWrapper };

function useFetchWrapper() {
    const [auth, setAuth] = useRecoilState(authAtom);

    return {
        get,
        post,
        put,
        delete: _delete
    };

    function get(url) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(url)
        };
        return fetch(url, requestOptions).then(handleResponse);
    }
    
    function post(url, body) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...authHeader(url) },
            credentials: 'include',
            body: JSON.stringify(body)
        };
        return fetch(url, requestOptions).then(handleResponse);
    }
    
    function put(url, body) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...authHeader(url) },
            body: JSON.stringify(body)
        };
        return fetch(url, requestOptions).then(handleResponse);    
    }
    
    // prefixed with underscored because delete is a reserved word in javascript
    function _delete(url) {
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(url)
        };
        return fetch(url, requestOptions).then(handleResponse);
    }
    
    // helper functions
    
    function authHeader(url) {
        // return auth header with jwt if user is logged in and request is to the api url
        const token = auth?.token;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }
    
    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            
            if (!response.ok) {
                if ([401, 403].includes(response.status) && auth?.token) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user');
                    setAuth(null);
                    history.push('/login');
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    }    
}

export class ApiError extends Error{
    constructor(url, status){
        super(`'${url}' returned ${status}`);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
          }
        
        this.name = 'Api Error';
        this.status = status;
    };
}


export async function fetchJson(url, options) {
    const response = await fetch(url, options);
  console.log(response);
    if(!response.ok) {
        throw new ApiError(url, response.status);
    }
    return await response.json();
}
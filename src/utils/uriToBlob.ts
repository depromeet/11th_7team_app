/**
 * Function to convert a URI to a Blob object
 * @param {string} uri - The URI of the file
 * @returns {Promise} - Returns a promise that resolves with the Blob object
 */
export function uriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };

    // reject on error
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };

    // Set the response type to 'blob' - this means the server's response
    // will be accessed as a binary object
    xhr.responseType = 'blob';

    // Initialize the request. The third argument set to 'true' denotes
    // that the request is asynchronous
    xhr.open('GET', uri, true);

    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
}

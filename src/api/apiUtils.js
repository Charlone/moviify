export async function handleResponse(response) {
  if (response.status === 200) {
    return response.data;
  }

  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }

  throw new Error(`Error: ${response.error.text}`);
}

export function handleError(error) {
  console.error("API call failed. " + error);
  throw error;
}

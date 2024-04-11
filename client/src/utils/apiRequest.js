const apiRequest = async (url = '', optionsObj = null) => {
    const response = await fetch(url, optionsObj);
    if (!response.ok)
        return null;
    else
        return response.json();
}

export default apiRequest;
import http from "../http-common";

const options = {
  key: 'AIzaSyBBA37PHb5UjrZfGBvNsHUF8xct7TRybJ8',
  maxResults: 30
};

export function searchAPI(values = {q: "", category: "all", sort: "relevance", startIndex: 0}) {
    return new Promise<{ data: any }>((resolve, reject) => {
        http.get(`?key=${options.key}&maxResults=${options.maxResults}&q=${values.q}${values.category !== 'all' ? `+subject:${values.category}` : ''}&orderBy=${values.sort}&startIndex=${values.startIndex}`).then(response => {
            resolve(response.data);
        })
            .catch(e => {
                console.log(e);
                reject(e)
            });
    });
}

export function getBookAPI(token = "") {
    return new Promise<{ data: any }>((resolve, reject) => {
        http.get(token).then(response => {
            resolve(response.data);
        })
            .catch(e => {
                console.log(e);
                reject(e)
            });
    });
}


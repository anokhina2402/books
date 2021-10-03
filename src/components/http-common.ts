import axios from "axios";

const googleBooksURL = "https://www.googleapis.com/books/v1/volumes";

export default axios.create({
    baseURL: googleBooksURL,
    headers: {
        "Content-type": "application/json"
    }
});

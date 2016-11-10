# Author
akshaybhatia10 


[Github](https://github.com/akshaybhatia10) 

# URL-Shortener-API

### User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.


## Example usage:

```url
https://akshay-url.herokuapp.com/new/https://www.google.com
```

## Example output:

```json
{"original_url":"https://www.google.com","short_url":"https://akshay-url.herokuapp.com/H1rBWbMZe"}

```
## Usage:

```
https://akshay-url.herokuapp.com/H1rBWbMZe
```

### Will redirect to:

```
https://www.google.com
```
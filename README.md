# Author
akshaybhatia10 


[Github](https://github.com/akshaybhatia10) 

# URL-Shorener-API

### User stories:
1. I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. When I visit that shortened URL, it will redirect me to my original link.


## Example usage:

```url
.herokuapp.com/https://www.google.com
```

## Example output:

```json
{"original_url":"http://www.google.com","short_url":"https://little-url.herokuapp.com/8170"}

```
## Usage:

```
https://.herokuapp.com/2871
```

### Will redirect to:

```
https://www.google.com/
```
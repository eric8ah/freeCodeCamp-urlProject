## API Basejump: URL Shortener
By Eric Ochoa "eric8ah"

For [Free Code Camp](http://freecodecamp.com) - [Back-End Project: URL Shortener](https://www.freecodecamp.com/challenges/url-shortener-microservice)

This is a microservice API project for freeCodeCamp. This will take a URL as a parameter and will return a json object with the original url and a shortened version
of the URL. If the URL already exists in the database it will return the existing shortened url otherwise it will create a new random url and insert it into the database.
If you go to the short url it will redirect you to it's corresponding website if it exists in the database, otherwise it will tell you that the short URL does not exist.

### Example creation usage:

```
https://eric8ah-short-url.herokuapp.com/www.google.com
```
### Example output

```
{"original_url":"www.google.com","short_url":"eric8ah-short-url.herokuapp.com/275"}
```
### Usage

```
https://eric8ah-short-url.herokuapp.com/275
```
### Will redirect to:

```
https://www.google.com
```


### Live Site
[https://eric8ah-short-url.herokuapp.com/](https://eric8ah-short-url.herokuapp.com/)
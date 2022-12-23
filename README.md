# Auth Passport Google Strategy

* Create project & credentials at [Console Google Cloud](https://console.cloud.google.com/)

* Set callback URI:
```
http://127.0.0.1:5151/auth/google/callback
``` 


## Using express-session
*branch express-session*

__.env__ example:

```
GOOGLE_CLIENT_ID=xxxx-xxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxx-xxxx_xxxx
SESSION_KEY=secret
```

## Using jsonwebtoken
*branch jsonwebtoken*

__.env__ example:

```
GOOGLE_CLIENT_ID=xxxx-xxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxx-xxxx_xxxx
JWT_SECRET=secret
```

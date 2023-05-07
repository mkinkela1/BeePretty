
<img src="https://user-images.githubusercontent.com/26688618/236701250-af3d8b5e-78b0-4034-ac83-17ddd61248bb.svg" alt="logo" width="200"/>

# BeePretty

BeePretty is an Instagram-like app created for [WASP hackathon #2](https://hackathon.wasp-lang.dev/). It was made using [WASP framework](https://wasp-lang.dev/) that uses React with Tanstack's useQuery to cache requests on frontend and Node.js, Prisma and Postgres on backend.

# Features

## 1. Login and registration
For login and registration, users can use username and password or Google login. After user creates an account, they will be redirected to wizzard that enables adding user data, profile picture and featured image.

## 2. Challenges
Once user data is filled, the user can challenge other users by clicking "Challenge" button. In the "Battle arena" page, user will be given 2 different featured images. Vote is created by clicking on one of those 2 featured images. Users will never get themselves in the battle arena. Also, user can only vote once for the given pair. Exception for that rule is 2 users challenging each other.

## 3. Following and Posts
Users can find other users in search page and by clicking they can view their profile. While checking other profiles, user can start following other users and see their posts on main page. Also, users can like other users posts even if they aren't following them.


# Other features
1. debounce on search to avoid spamming database
2. skeleton loaders across the app to avoid having blank screen if backend call takes too long
3. toasters for every upload, create and delete request
4. uploading images to [Imgur](https://imgur.com/)

# TODO for future
[] notifications for like, follow and challenge
[] chat 
[] using infinite query for loading posts on main page














You can see how does it look [here](https://www.youtube.com/watch?v=EW7M04uN4-k)

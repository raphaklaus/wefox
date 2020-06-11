# Wefox Code Challenge

![CI](https://github.com/raphaklaus/wefox/workflows/Node.js%20CI/badge.svg?event=push)

The solution is 100% dockerized. Here it is a summary of the commands:

## Running

By running the below, the application will start itself without needing extra `&& npm start` call. :)

```bash
  $ docker-compose up
```

## Testing

Because we care about our team's sanity :P

```bash
  $ docker-compose up test
```

## Continous Integration

❤️ GitHub Actions ❤️

Go to the `Actions` tab of this repo and check it by yourself.

## Architecture

```
                              +----------------------------+
                              |                            |
                       +------>  Google Maps Geocoding API |
                       |      |                            |
+-----------------+    |      +----------------------------+
|                 +----+
|   Main  Server  |
|                 +----+
+--------^--------+    |      +----------------------+
         |             |      |                      |
         |             v------>   Open Weather API   |
         |                    |                      |
         |                    +----------------------+
         |
         |
         +-----------+
                     |
                     |
                     |
         +-----------+-----------+
         |                       |
         |       Scheduler       |
         |                       |
         +-----------------------+

```

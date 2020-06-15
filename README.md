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
  $ server> npm test
  $ scheduler> npm test
```

## 🚀 GitHub Actions 🚀

Go to the `Actions` tab of this repo and check it the latest tests

## Architecture

```
                    +-----------------+      +----------------------+
  HTTP Requests     |                 |      |                      |
-------------------->   Main Server   +------> Access Token Manager |
                    |                 |      |                      |
                    +-----------------+      +------+---------------+   +----------------------------+
                                                    |                   |                            |
                                                    |            +------>  Google Maps Geocoding API |
                                                    |            |      |                            |
                                                    |            |      +----------------------------+
                                                    +--------------------------------------------+
                                                    |            |        |                      |
                                                    |            +-------->   Open Weather API   |
                                                    |            |        |                      |
 +-----------------+                                |            |        +----------------------+
 |                 |       Token and HTTP cache     |            |            +-----------------+
 |     Redis       <--------+--+--------------------+            | Data store |                 |
 |                 |        |  |                                 +------------>     MongoDB     |
 +-----------------+        |  |                                              |                 |
                            |  |                                              +-- ----------^---+
                            |  |              Queue managed by Redis                        |
                            |  +------------------------------------+                       |
                            |                                       |                       |
                            |           Consumer/Producer           |     Get request logs  |
                            |   +--------------------------------+  |  +--------------------+
                            |   |                                |  |  |
                            |   |                                |  |  |
               +------------+---+----+                       +---+--+--+--------- ---+
               |                     |                       |                       |
               |       Mailer        |                       |       Scheduler       |
               |                     |                       |  (run every X hours)  |
               +---------------------+                       +-----------------------+
```

To deploy this on AWS I would use ECS. So the steps are like this, on a high level:

* Get your credentials (key and secret)
* Create a profile
* Use ECS-CLI to create the cluster, selecting the region, instance type and size
* Deploy the compose file using the `compose up` of `ecs-cli`
* Preferably, you can run the service containers (Redis and MongoDB) in third-party services and point the host and credentials using environment variables in the ECS instance.

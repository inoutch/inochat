# INO Chat App
## This app consists of the following elements
### Sever
- Spring Boot
- GraphQL (graphql-java, graphql-spring-boot)
- Spring Data Redis
- others

### Client
- Next.js
- Typescript
- MobX
- Jest
- others

## Caution
This app is experimental implementation and you should not use this codes for production.

## Build & Run
1. Prepare environment.
  - Java 8
  - Redis (default port)
  - Postgresql (user: sample, password: sample)

2. Build & Run

```
  $ yarn dev            # in client dir
  $ ./gradlew bootRun   # in server dir
```

3. Open URL of ```http://localhost:3000```

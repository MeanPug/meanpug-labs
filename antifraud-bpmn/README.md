# Introduction
A sample solution to the problem of antifraud detection and processing in a way which combines online and offline processes. To find a more thorough (read: more betterrer) description of the motivations, background, and architecture, you really ought to read our blog post on [Business Process as Code in Modern Web Applications](https://labs.meanpug.com).

## Services
The package is composed of three services:

* `antifraud` - the actual process engine, embedded in a Spring Boot application
* `antifraud-worker` - a dead-stupid worker process listening and processing events
* `storefront` - an example ecomm frontend (and pug paraphernalia paradise)

## Running Locally
The only requirement to run locally is Docker. To spin up, simply:

```bash
make
```

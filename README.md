# Nest.JS + Prisma + REST API template

## Added support
- Prisma
- Dockerfile
- VSCode Debugger
- @nestjs/config

## Features
- Swagger docs generation
- Better logger with [pino-pretty](https://github.com/pinojs/pino-pretty)
- Logs all incoming http requests
- Prisma CRUD generation
- Uses pnpm to save disk space
- fix(prettier): CFLF warning in windows
- fix(prettier): single quote only 
- Github action to build docker image

## Folder structure
```
L app
  L module
    L user
      L controllers
      L crud
      L dtos
      L services
      L user.module.ts
    L ...
  L providers
  L common
L bootstrap
L config
L integrations
L interceptors
```

## Todo
- Add unit & e2e test
# Nest.JS + Prisma + REST API template

## Added support
- Prisma
- Docker
- VSCode Debugger
- @nestjs/config
- prisma-class-generator
- @chax-at/prisma-filter

## Features
- Swagger docs generation
- Better logger with [pino-pretty](https://github.com/pinojs/pino-pretty)
- Logs all incoming http requests
- CRUD controllers that you can copy paste (while not eliminating the need to create custom controller)
- Paginated find many controllers with direct access to prisma filters via [query builder](https://github.com/chax-at/prisma-filter)
- Uses pnpm to save disk space
- fix(prettier): CRLF warning in windows
- fix(prettier): single quote only 
- Github action to build docker image
- Better debugging experience w/o restarting api server

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
    L core.module.ts
  L providers
  L common
L bootstrap
L config
L integrations
L interceptors
```

## Todo
- Add unit & e2e test
- Add dynamic auth
- Add casl
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Start
- `npm run build` - Build the NestJS application
- `npm run start` - Start the application in production mode
- `npm run start:dev` - Start in development mode with file watching
- `npm run start:debug` - Start in debug mode with file watching
- `npm run start:prod` - Start the built application from dist/

### Testing
- `npm run test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage report
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:debug` - Run tests in debug mode

### Code Quality
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Architecture

This is a NestJS TypeScript starter project with the following structure:

### Core Application
- `src/main.ts` - Application bootstrap, starts server on port 3000 (or PORT env var)
- `src/app.module.ts` - Root module that imports UsersModule
- `src/app.controller.ts` and `src/app.service.ts` - Root controller/service

### Module Structure
- Follows NestJS modular architecture with feature modules
- `src/users/` - Example feature module with controller, service, and module files
- Each module typically contains: `*.module.ts`, `*.controller.ts`, `*.service.ts`
- Unit tests are co-located: `*.spec.ts` files alongside source files
- E2E tests are in `test/` directory

### Configuration
- Uses TypeScript with Node.js "nodenext" module resolution
- ESLint configured with TypeScript, Prettier integration, and custom rules
- Prettier configured for single quotes and trailing commas
- Jest configured for testing with ts-jest transform
- Source root is `src/`, build output goes to `dist/`

## Key Dependencies
- `@nestjs/core`, `@nestjs/common` - Core NestJS framework
- `@nestjs/platform-express` - Express.js integration
- `reflect-metadata` - Required for decorators
- `rxjs` - Reactive extensions
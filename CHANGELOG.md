# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-24

### Added
- **Refactored codebase** with modular architecture
  - Separated concerns into services (BookingService, NotificationService)
  - Added configuration validation module
  - Proper TypeScript interfaces and types
- **Docker support** for containerized deployment
  - Multi-stage Dockerfile for optimized image size
  - Docker Compose configuration with resource limits
  - .dockerignore for efficient builds
- **Comprehensive documentation**
  - Detailed README with setup instructions
  - Troubleshooting guide
  - Environment variable documentation
  - Docker deployment guide
- **Enhanced configuration**
  - PROVIDER and SERVICE environment variables
  - Better validation and error messages
  - Improved .env.example with detailed comments
- **Improved notification system**
  - Better formatted Telegram messages
  - Proper MarkdownV2 escaping
  - Graceful handling when Telegram is not configured
- **Production-ready features**
  - Better error handling and logging
  - Input validation
  - Non-root user in Docker for security
  - Health checks in Docker container
  - Resource limits in Docker Compose

### Changed
- **Updated dependencies** to latest versions
  - @types/node: ^20.12.7 → ^25.0.10
  - @types/node-cron: Added ^3.0.11
  - @types/node-telegram-bot-api: Added ^0.64.13
  - @dotenvx/dotenvx: ^0.37.0 → ^1.52.0
  - axios: ^1.6.8 → ^1.13.2
  - node-cron: ^3.0.3 → ^4.2.1
  - nodemon: ^3.1.0 → ^3.1.11
  - rimraf: ^5.0.5 → ^6.1.2
  - typescript: ^5.4.5 → ^5.9.3
  - node-telegram-bot-api: ^0.65.1 → ^0.67.0
- **Improved code structure**
  - Converted to class-based architecture
  - Better separation of concerns
  - Enhanced type safety
  - More descriptive variable and function names
- **Better logging**
  - Structured console output with visual separators
  - Timestamps for each run
  - Clear status indicators (✅, ❌, ℹ️, 🔍, ⏱️)

### Fixed
- Removed deprecated `cron-parser` dependency (unused)
- Fixed TypeScript compilation issues
- Improved error handling in API requests
- Better URL validation

### Security
- Added non-root user in Docker container
- Removed unnecessary dependencies
- Updated to latest security patches

## [0.1.0] - Previous Version

### Initial Release
- Basic slot checking functionality
- Telegram notifications
- Cron scheduling
- Environment variable configuration
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-21

### Changed

- **BREAKING**: Migrated from RapidAPI to direct API access at `https://api.astrology-api.io`
- **BREAKING**: Authentication changed from `x-rapidapi-key` header to `Authorization: Bearer <token>`
- **BREAKING**: Environment variable renamed from `RAPIDAPI_KEY` to `ASTROLOGY_API_KEY`
- Removed `rapidApiHost` configuration option (no longer needed)
- Removed `RAPIDAPI_HOST` environment variable support
- Updated default base URL to `https://api.astrology-api.io`

### Migration Guide

To upgrade from 0.1.0 to 1.0.0:

1. Rename environment variable `RAPIDAPI_KEY` to `ASTROLOGY_API_KEY`
2. Remove any `rapidApiHost` configuration option
3. If using custom `baseUrl`, update it to point to the new API server

## [0.1.0] - 2024-01-01

### Added

- Initial release of `@procoders/astrology-api-client`
- Core API client with configurable base URL and authentication
- Support for natal chart calculations
- Support for transit calculations
- Support for synastry analysis
- Full TypeScript support with comprehensive type definitions
- ESM and CommonJS module support
- Comprehensive test coverage

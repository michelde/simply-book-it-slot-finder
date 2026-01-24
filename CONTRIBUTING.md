# Contributing to Simply Book It Slot Finder

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the problem
- Expected behavior
- Actual behavior
- Your environment (OS, Node.js version, etc.)
- Any relevant logs or screenshots

### Suggesting Enhancements

Enhancement suggestions are welcome! Please create an issue with:
- A clear, descriptive title
- Detailed description of the proposed feature
- Use cases and benefits
- Any implementation ideas you might have

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear, descriptive messages
6. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/simply-book-it-slot-finder.git
cd simply-book-it-slot-finder

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env
# Edit .env with your test values

# Run in development mode
npm run start:dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Provide proper type annotations
- Avoid `any` types when possible

### Code Style

- Use meaningful variable and function names
- Write clear comments for complex logic
- Keep functions focused and single-purpose
- Follow the existing code structure

### File Organization

```
src/
├── services/        # Business logic services
├── config.ts        # Configuration management
├── types.ts         # Type definitions
└── index.ts         # Application entry point
```

## Testing

Before submitting a pull request:

1. **Test locally**:
```bash
npm run build
npm start
```

2. **Test with Docker**:
```bash
docker build -t slot-finder-test .
docker run --env-file .env slot-finder-test
```

3. **Verify all scenarios**:
   - Application starts correctly
   - Configuration validation works
   - Slot checking functions properly
   - Notifications are sent (if configured)
   - Errors are handled gracefully

## Commit Messages

Follow these guidelines for commit messages:

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep the first line under 50 characters
- Reference issues and pull requests when relevant

Examples:
```
feat: Add support for multiple notification channels
fix: Handle API timeout errors gracefully
docs: Update Docker deployment instructions
refactor: Simplify booking service logic
```

## Documentation

When adding features or making changes:

- Update README.md if user-facing changes are made
- Update CHANGELOG.md following Keep a Changelog format
- Add inline comments for complex logic
- Update .env.example if new configuration is added

## Pull Request Process

1. **Ensure your PR**:
   - Follows the coding standards
   - Includes appropriate tests
   - Updates documentation
   - Has a clear description of changes

2. **PR Description should include**:
   - Summary of changes
   - Motivation and context
   - Type of change (bug fix, feature, etc.)
   - Testing performed
   - Screenshots (if applicable)

3. **Review Process**:
   - Maintainers will review your PR
   - Address any feedback or requested changes
   - Once approved, your PR will be merged

## Project Structure

```
simply-book-it-slot-finder/
├── src/                    # Source code
│   ├── services/          # Service layer
│   ├── config.ts          # Configuration
│   ├── types.ts           # Type definitions
│   └── index.ts           # Entry point
├── build/                 # Compiled output (generated)
├── .env.example           # Environment template
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose config
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # Main documentation
```

## Questions?

Feel free to open an issue for:
- Questions about the codebase
- Clarification on contribution guidelines
- Discussion about potential improvements

## License

By contributing, you agree that your contributions will be licensed under the same ISC License that covers this project.

---

Thank you for contributing! 🎉
# Deployment Guide

This document describes how to deploy `@procoders/astrology-api-client` to NPM using GitHub Actions CI/CD.

## Prerequisites

Before deploying, ensure you have:

- [ ] Access to the GitHub repository with admin permissions
- [ ] An NPM account with publish access to `@procoders` scope
- [ ] NPM Access Token with publish permissions

## Initial Setup

### 1. Create NPM Access Token

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Go to **Account Settings** → **Access Tokens**
3. Click **Generate New Token** → **Granular Access Token**
4. Configure the token:
   - **Token name:** `github-actions-astrology`
   - **Expiration:** Choose appropriate duration (recommend 1 year)
   - **Packages and scopes:** Select `@procoders/astrology-api-client`
   - **Permissions:** Read and Write
5. Copy the generated token (you won't see it again)

### 2. Add NPM Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the secret:
   - **Name:** `NPM_TOKEN`
   - **Value:** Paste your NPM access token
5. Click **Add secret**

### 3. Configure Branch Protection (Recommended)

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Configure for `master` branch:
   - [x] Require a pull request before merging
   - [x] Require status checks to pass before merging
     - Select: `build (18)`, `build (20)`, `build (22)`
   - [x] Require conversation resolution before merging
   - [x] Do not allow bypassing the above settings
4. Click **Create**

## How CI/CD Works

### Automatic Release Flow

```
Developer commits → Push to feature branch → Create PR → Merge to master → Auto release
```

1. **On every push/PR:** CI workflow runs tests, linting, and build
2. **On merge to master:** Release workflow triggers semantic-release
3. **Semantic-release:**
   - Analyzes commit messages
   - Determines version bump (major/minor/patch)
   - Updates `package.json` and `CHANGELOG.md`
   - Creates GitHub release with auto-generated notes
   - Publishes to NPM

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

| Type | Description | Version Bump |
|------|-------------|--------------|
| `feat:` | New feature | Minor (0.X.0) |
| `fix:` | Bug fix | Patch (0.0.X) |
| `docs:` | Documentation only | No release |
| `style:` | Code style changes | No release |
| `refactor:` | Code refactoring | No release |
| `perf:` | Performance improvement | Patch (0.0.X) |
| `test:` | Adding tests | No release |
| `build:` | Build system changes | No release |
| `ci:` | CI configuration | No release |
| `chore:` | Maintenance | No release |

**Breaking changes:** Add `!` after type or include `BREAKING CHANGE:` in footer

```bash
# Examples
feat: add synastry calculation endpoint
fix: resolve timezone parsing issue
feat!: change API response format
perf: optimize chart rendering by 40%

# Breaking change with footer
feat: redesign client configuration

BREAKING CHANGE: `apiKey` is now required in constructor
```

### Manual Release (Emergency)

For urgent releases without conventional commits:

1. Go to **Actions** → **Manual Release**
2. Click **Run workflow**
3. Select:
   - **Release type:** `patch`, `minor`, or `major`
   - **Dry run:** Enable to test without publishing
4. Click **Run workflow**

## Workflows Overview

### CI Workflow (`ci.yml`)

**Triggers:** Push to master, Pull requests to master

**Jobs:**
- `build`: Runs on Node.js 22
  - Install dependencies
  - Run ESLint
  - Run tests with coverage
  - Build package
  - Upload coverage to Codecov

- `commitlint`: Validates PR commit messages

### Release Workflow (`release.yml`)

**Triggers:** Push to master (after CI passes)

**Steps:**
1. Checkout with full history
2. Setup Node.js 20
3. Install dependencies
4. Build package
5. Run tests
6. Execute semantic-release

### Manual Release Workflow (`manual-release.yml`)

**Triggers:** Manual dispatch only

**Inputs:**
- `release_type`: patch | minor | major
- `dry_run`: boolean (test mode)

## Troubleshooting

### Release Not Triggering

**Problem:** Commits merged but no release created

**Solutions:**
1. Check commit messages follow conventional format
2. Ensure commits include releasable types (`feat:`, `fix:`, `perf:`)
3. Verify `NPM_TOKEN` secret is set correctly
4. Check workflow logs in Actions tab

### NPM Publish Failed

**Problem:** Release created but NPM publish failed

**Solutions:**
1. Verify NPM token hasn't expired
2. Check token has write access to `@procoders` scope
3. Ensure package name isn't already taken
4. Check for NPM rate limiting

### Commitlint Failing

**Problem:** PR blocked by commitlint

**Solutions:**
1. Amend commit message to follow convention:
   ```bash
   git commit --amend -m "feat: proper message format"
   git push --force-with-lease
   ```
2. For multiple commits, use interactive rebase:
   ```bash
   git rebase -i HEAD~3
   # Change 'pick' to 'reword' for commits to fix
   ```

### Build Failing on Specific Node Version

**Problem:** Tests pass on Node 22 but fail on 20 or 18

**Solutions:**
1. Check for Node.js version-specific APIs
2. Verify `engines` field in package.json
3. Review test environment setup

## Security Recommendations

1. **Rotate NPM token** annually or after team changes
2. **Enable 2FA** on NPM account
3. **Use granular tokens** with minimal permissions
4. **Review GitHub Actions** permissions regularly
5. **Monitor package** for unauthorized publishes

## Monitoring

### GitHub Actions

- Check **Actions** tab for workflow status
- Enable email notifications for failed workflows
- Review security alerts in **Security** tab

### NPM

- Monitor download statistics on npmjs.com
- Set up [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) in CI
- Subscribe to security advisories

## Version Strategy

This package follows [Semantic Versioning](https://semver.org/):

- **MAJOR (X.0.0):** Breaking API changes
- **MINOR (0.X.0):** New features, backward compatible
- **PATCH (0.0.X):** Bug fixes, backward compatible

### Pre-release Versions

For beta/alpha releases, use branches:
- `beta` branch → `1.0.0-beta.1`
- `alpha` branch → `1.0.0-alpha.1`

To enable, update `.releaserc.json`:
```json
{
  "branches": [
    "master",
    { "name": "beta", "prerelease": true },
    { "name": "alpha", "prerelease": true }
  ]
}
```

## Quick Reference

```bash
# Local development
npm install          # Install dependencies
npm run lint         # Check code style
npm run test         # Run tests
npm run build        # Build package

# Before committing
npm run lint:fix     # Auto-fix lint issues
npm run format       # Format code

# Commit with conventional message
git commit -m "feat: add new endpoint"

# Create PR and merge to master for automatic release
```

## Support

- **Issues:** [GitHub Issues](https://github.com/procoders/astrology-typescript/issues)
- **NPM Package:** [@procoders/astrology-api-client](https://www.npmjs.com/package/@procoders/astrology-api-client)

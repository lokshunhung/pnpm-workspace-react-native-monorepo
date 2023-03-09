# pnpm workspace react native monorepo setup

- `metro` related packages are pinned at `0.76.0`  
  the new version added support for symlinks via `config.resolvers.unstable_enableSymlinks` = `true`, which is must be enabled for pnpm to work
- the expo project needs an explicit dependency declaration of `metro-runtime`, with the same version of the bundler, since this package is referenced and injected at bundle time

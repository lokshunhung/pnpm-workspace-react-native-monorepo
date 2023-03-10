# pnpm workspace react native monorepo setup

- `metro` related packages are pinned at `0.76.0`  
  the new version added support for symlinks via `config.resolvers.unstable_enableSymlinks` = `true`, which is must be enabled for pnpm to work
- the expo project needs an explicit dependency declaration of `metro-runtime`, with the same version of the bundler, since this package is referenced and injected at bundle time
- to make `metro` aware of the workspace root and other packages, their paths must be added to `config.watchFolders` in `metro.config.js`, and `config.projectRoot` must be set manually
- each ui package must also have `react`, `react-native`, `react-native-web` declared as dependencies for `webpack` to resolve them correctly at bundle time

<details>
<summary>References:</summary>
<ul>
<li>Metro GitHub Issue on Symlinks:
<br><a href="https://github.com/facebook/metro/issues/1#issuecomment-1436062881">robhogan @ facebook/metro#1</a></li>
<li>PNPM GitHub Issue Related Discussion on Usage With Expo:<br>
<a href="https://github.com/pnpm/pnpm/issues/3010#issuecomment-740224466">vjpr @ pnpm/pnpm#3010</a></li>
<li>Archived Repo for Yarn Workspaces:<br>
<a href="https://github.com/lokshunhung/react-native-web-yarn-workspace-monorepo">lokshunhung/react-native-web-yarn-workspace-monorepo</a></li>
</ul>
</details>

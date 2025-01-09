import { postBuildScript, publishScript } from 'js2me-exports-post-build-script';
import { execSync } from 'child_process';

postBuildScript({
  buildDir: 'dist',
  rootDir: '.',
  srcDirName: 'src',
  filesToCopy: ['LICENSE', 'README.md', 'assets'],
  updateVersion: process.env.PUBLISH_VERSION,
  onDone: (versionsDiff, _, packageJson, { targetPackageJson }) => {
    execSync(`cp dist/utils/types.d.ts dist/utility-types.d.ts`, { stdio: 'inherit' });
    execSync(`sed -i 's/^export type/type/' dist/utility-types.d.ts`, { stdio: 'inherit' });

    if (process.env.PUBLISH) {
      publishScript({
        nextVersion: versionsDiff?.next ?? packageJson.version,
        currVersion: versionsDiff?.current,
        publishCommand: 'pnpm publish',
        commitAllCurrentChanges: true,
        createTag: true,
        githubRepoLink: 'https://github.com/js2me/yummies',
        cleanupCommand: 'pnpm clean', 
        targetPackageJson
      })
    }
  }
});


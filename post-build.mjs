import { postBuildScript } from 'js2me-exports-post-build-script';

import { $ } from "js2me-exports-post-build-script/utils";

postBuildScript({
  buildDir: 'dist',
  rootDir: '.',
  srcDirName: 'src',
  filesToCopy: ['LICENSE', 'README.md'],
  patchPackageJson: (packageJson) => {
    $(`cp src/utils/types.ts dist/util-types.d.ts`);
    $(`sed -i 's/^export type/type/' dist/util-types.d.ts`);

    packageJson.exports['./util-types'] = './util-types.d.ts';
  }
});


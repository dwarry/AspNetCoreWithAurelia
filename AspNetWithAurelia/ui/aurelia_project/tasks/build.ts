import * as gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import copyNonpackagedFiles from './copy-nonpackaged-files';
import copyFiles from './copy-files';
import { build } from 'aurelia-cli';
import copyBuildToWwwRoot from './copy-build-to-wwwroot';
import * as project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS,
    copyNonpackagedFiles,
    copyFiles
  ),
  writeBundles,
  copyBuildToWwwRoot
);

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}

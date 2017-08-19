import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';

export default function copyBuildToWwwRoot() {
  const source = 'scripts';

  const taskIndex = gulp.src('index.html')
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(`${project.platform.output}/../../wwwroot/`));

  const taskScripts = gulp.src(`${source}/*`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(`${project.platform.output}/../../wwwroot/scripts`));

  return merge(taskIndex, taskScripts);
}
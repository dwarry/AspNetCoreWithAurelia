import * as gulp from 'gulp';
import * as merge from 'merge-stream';
import * as changedInPlace from 'gulp-changed-in-place';
import * as project from '../aurelia.json';

export default function copyNonpackagedFiles() {
  const popper = "node_modules/popper.js";
  const source = 'node_modules/font-awesome';

  const taskPopper = gulp.src(`${popper}/dist/umd/popper.min.js`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(`${project.platform.output}`));

  const taskCss = gulp.src(`${source}/css/font-awesome.min.css`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(`${project.platform.output}/css`));

  const taskFonts = gulp.src(`${source}/fonts/*`)
    .pipe(changedInPlace({ firstPass: true }))
    .pipe(gulp.dest(`${project.platform.output}/fonts`));

  return merge(taskCss, taskFonts);
}
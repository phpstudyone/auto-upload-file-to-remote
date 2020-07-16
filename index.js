const chokidar = require('chokidar');
const { putFileToVM, putDirToVM } = require('./lib/ssh');
const { getRemotePath } = require('./lib/path');
const log = console.log.bind(console);


const handleFun = (details) => {
  const {type, path} = details
  const remotePath = getRemotePath(path);
  if (type === 'directory') {
    return putDirToVM(remotePath);
  }

  if (type === 'file') {
    return putFileToVM(path);
  }
}

const watcher = chokidar.watch([
    '/Users/apple1/project/tbl-replatform-api'
], {
    ignored: /(\.git\/)\./, // ignore dotfiles
    persistent: true
});

watcher
    .on('raw', (event, path, details) => { // internal
        if (path.indexOf('.git') !== -1) {
            return false;
        }
        log('Raw event info:', event, path, details);
        if (['modified', 'created'].includes(details.event)) {
          handleFun(details);
        }
  });

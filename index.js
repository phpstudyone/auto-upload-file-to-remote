const chokidar = require('chokidar');
const config = require('config');
const { putFileToVM, putDirToVM ,deleteToVM } = require('./lib/ssh');
const { getRemotePath } = require('./lib/path');
const watcherPath = config.get('watcherPath');

const handleFun = (details) => {
  const {type, path,event,changes} = details
  const remotePath = getRemotePath(path);
  if (['modified', 'created'].includes(event) || (event === 'moved' && changes.inode)) {
    if (type === 'directory') {
      return putDirToVM(remotePath);
    }

    if (type === 'file') {
      return putFileToVM(path);
    }
  }
  console.log(changes.inode);
  if ((event === 'moved' && !changes.inode) || event === 'deleted') {
    return deleteToVM(remotePath);
  }

}

const watcher = chokidar.watch(watcherPath, {
    ignored: /(\.git\/)\./, // ignore dotfiles
    persistent: true
});

watcher
  .on('raw', (event, path, details) => {
        if (path.indexOf('/.git/') !== -1) {
            return false;
        }
        handleFun(details);
  });

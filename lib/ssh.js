
const Client = require('ssh2-sftp-client');
const config = require('config');
const { getFileDirPath,getRemotePath} = require('./path');
const sshConfig = config.get('ssh');

const putFileToVM = (path) => {
    const remotePath = getRemotePath(path)
    const fileDriPath = getFileDirPath(remotePath);
    const client = new Client();
    client.connect(sshConfig)
      .then(() => {
        return client.exists(fileDriPath);
      })
      .then((data) => {
        if (data) {
          return client.fastPut(path, remotePath)
            .then(() => {
                return client.end();
            });
        } else {
          putDirToVM(fileDriPath);
          setTimeout(() => {
            putFileToVM(path);
          }, 100);
        }
      }).catch(err => {
        console.error(err.message,123456778);
      });
  }

  const putDirToVM = (path) => {
    const client = new Client();
    client.connect(sshConfig)
      .then(() => {
        return client.exists(path);
      }).then((data) => {
        if (!data) {
          return client.mkdir(path,true);
        }
      }).then(() => {
          return client.end();
      }).catch(err => {
        console.error(err.message,111111);
      });
  }

module.exports = {
    putFileToVM,
    putDirToVM
};

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
          console.error(`上级目录存在, ${remotePath} uploading.......`);
          return client.fastPut(path, remotePath)
            .then(() => {
                return client.end();
            });
        } else {
          console.error(`上级目录不存在, ${fileDriPath}  creating.......`);
          putDirToVM(fileDriPath);
          setTimeout(() => {
            console.error(`上级目录创建完成 , ${remotePath}  uploading.......`);
            putFileToVM(path);
          }, 100);
        }
      }).catch(err => {
        console.error(err.message,123456778);
      });
  }

const putDirToVM = (remotePath) => {
  const client = new Client();
  client.connect(sshConfig)
    .then(() => {
      return client.exists(remotePath);
    }).then((data) => {
      if (!data) {
        console.error(`目录不存在 , ${remotePath}  creating.......`);
        return client.mkdir(remotePath,true);
      }
    }).then(() => {
        return client.end();
    }).catch(err => {
      console.error(err.message,111111);
    });
}

const deleteToVM = (remotePath) => {
    const client = new Client();
    client.connect(sshConfig)
      .then(() => {
        return client.exists(remotePath);
      }).then((data) => {
        if (data === '-') {
          console.error(`路径存在且为文件 , ${remotePath}   delete .......`);
          return client.delete(remotePath);
        }
        if (data === 'd') {
          console.error(`路径存在在且为目录 , ${remotePath}   delete .......`);
          return client.rmdir(remotePath,true);
        }
      }).then(() => {
          return client.end();
      }).catch(err => {
        console.error(err.message,111111);
      });
}

module.exports = {
    putFileToVM,
    putDirToVM,
    deleteToVM,
};
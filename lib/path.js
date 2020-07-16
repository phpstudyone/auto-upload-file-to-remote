const config = require('config');
const { localWorkPath, remoteWorkPath } = config.get('path');
/**
 * 获取文件的最后一级目录
 * eg: /ccc/ccc/ccc/ccc/ccc.js ----> /ccc/ccc/ccc/ccc
 * @param {*} path
 */
const getFileDirPath = (path) => {
    const arr = path.split('/');
    let tempPath = '';
    const dirArr = []
    arr.forEach((k) => {
        tempPath += '/' + k;
        dirArr.push(tempPath)
    });
    return dirArr[dirArr.length - 2].substr(1)
}

/**
 * 根据本地路径获取远程路径
 * @param {*} path
 */
const getRemotePath = (path) => {
    const relativePath = path.match(localWorkPath);
    const remoteFilePath = `${remoteWorkPath}${relativePath[1]}`;
    return remoteFilePath;
}

module.exports = {
    getFileDirPath,
    getRemotePath
};
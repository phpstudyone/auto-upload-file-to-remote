
重命名:

```js
{
  path: '/Users/apple1/project/tbl-replatform-api/yarn.lockl',
  flags: 67584,
  event: 'moved',
  type: 'file',
  changes: { inode: false, finder: false, access: false, xattrs: false }
}
```

```js
{
  path: '/Users/apple1/project/tbl-replatform-api/yarn.lock',
  flags: 68608,
  event: 'moved',
  type: 'file',
  changes: { inode: true, finder: false, access: false, xattrs: false }
}
```

rename 操作 触发两次 moved event.
旧路径 changes.inode = false     ------>  需要执行 delete 事件.
新路径 changes.inode = true      ------>  需要执行 fastPut 事件.
所以 rename 得执行两个命令.
-----------------


delete 操作 触发一次 moved event.     ------>  需要执行 delete 事件.
需要考虑删除文件夹

删除文件:

``````js
{
  path: '/Users/apple1/project/tbl-replatform-api/ccc/ccc/ccc/ccc/ccc.js',
  flags: 66048,
  event: 'deleted',
  type: 'file',
  changes: { inode: false, finder: false, access: false, xattrs: false }
}
```

删除文件夹:
```js
{
  path: '/Users/apple1/project/tbl-replatform-api/ccc/ccc/ccc/ccc',
  flags: 131584,
  event: 'deleted',
  type: 'directory',
  changes: { inode: false, finder: false, access: false, xattrs: false }
}
```
-----------------------
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  fetchLibgen: (query) => ipcRenderer.invoke('fetch-libgen', query),
  getDownloadLink: (md5) => ipcRenderer.invoke('get-libgen-download-link', md5),
  startDownload: (md5, extension) => ipcRenderer.invoke('start-download', md5, extension),
  downloadMetadataToJson: (id, results) => ipcRenderer.invoke('download-metadata-to-json', id, results),
  onDownloadStatus: (callback) => ipcRenderer.on('download-status', callback),
  onDownloadDone: (callback) => ipcRenderer.on('download-done', callback),
  onDownloadError: (callback) => ipcRenderer.on('download-error', callback),
  listDownloads: () => ipcRenderer.invoke('list-downloads-folder'),
  getConfig: () => ipcRenderer.invoke('get-config'),
  setConfig: (path) => ipcRenderer.invoke('set-config', path),
  setMirrorConfig: (url) => ipcRenderer.send('set-mirror-config', url)
});

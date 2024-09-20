const archive = (url: string, filename: string, progressCallback: (n: number | null) => void) => {
  const xhr = new window.XMLHttpRequest()
  let total = 0

  const abort = () => {
    xhr.abort()
    progressCallback(null)
  }

  xhr.responseType = 'blob'
  xhr.open('POST', url, true)

  progressCallback(0)

  xhr.onload = (e) => {
    const res = xhr.response
    const blob = new window.Blob([res])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')

    progressCallback(100)

    document.body.appendChild(a)
    a.href = url
    a.download = filename
    a.click()

    window.URL.revokeObjectURL(url)
  }

  xhr.onprogress = (e) => {
    total = e.lengthComputable ? e.total : (total || Number(xhr.getResponseHeader('X-Content-Length') || xhr.getResponseHeader('Content-Length') || 0))
    progressCallback((e.loaded / total) * 100)
  }

  xhr.send()
  return { abort }
}

export default archive

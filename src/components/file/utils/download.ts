const download = (url: string, fileName: string) => {
  const link = document.createElement('a')

  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  link.click()
}

export default download

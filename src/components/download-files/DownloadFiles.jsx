import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'redux-bundler-react'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'
import { CircularProgressbar } from 'react-circular-progressbar'
import downloadArchive from '../file/utils/archive'
import downloadFile from '../file/utils/download'

// Styles
import 'react-circular-progressbar/dist/styles.css'
import './DownloadFiles.css'

export class DownloadFiles extends React.Component {
  static propTypes = {
    doGetArchiveURL: PropTypes.func,
    doGetFileURL: PropTypes.func,
    length: PropTypes.number
  }

  state = {
    progress: 100
  }

  handleOnClick = async () => {
    const { doGetArchiveURL, doGetFileURL, existFiles } = this.props

    if (existFiles === 1) {
      const { url, filename } = await doGetFileURL()
      downloadFile(url, filename)
    } else {
      const { url, filename } = await doGetArchiveURL()
      const updater = (progress) => this.setState({ progress: progress })
      downloadArchive(url, filename, updater)
    }
  }

  render () {
    const { existFiles, isLoading, t } = this.props
    const { progress } = this.state
    const btnClass = classnames({
      'ba b--navy bg-white navy no-pointer-events': progress !== 100,
      'bg-navy white glow pointer': progress === 100,
      'no-pointer-events o-50': isLoading,
      'o-80': !isLoading
    }, ['DownloadFilesButton w-100-ns pv2 ph4 mb2 mt3 flex justify-center items-center br-pill f4 montserrat'])

    return (
      <div className='w5 center'>
        <button className={btnClass} onClick={this.handleOnClick}>
          { progress === 100
            ? <span className='truncate'>{ existFiles > 1 ? t('downloadFiles.downloadAll') : t('downloadFiles.download') }</span>
            : <div className='flex items-center'>
              {t('downloadFiles.downloading')}
              <CircularProgressbar
                value={progress}
                strokeWidth={50}
                styles={{
                  root: { width: 15, height: 15, marginLeft: 7, marginRight: 5 },
                  path: { stroke: '#3e6175', strokeLinecap: 'butt' }
                }} />
            </div> }
        </button>
      </div>
    )
  }
}

export const TranslatedDownloadFiles = withTranslation('translation')(DownloadFiles)

export default connect(
  'selectIsLoading',
  'selectExistFiles',
  'doGetArchiveURL',
  'doGetFileURL',
  TranslatedDownloadFiles
)

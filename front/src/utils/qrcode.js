import QRCode from 'qrcode'

/**
 * 生成二维码
 * @param {String} text
 */
export function generatorQRCode (text) {
  return QRCode.toDataURL(text, {
    type: 'svg',
    margin: 0,
    version: 6,
    errorCorrectionLevel: 'H',
    color: {
      dark: '#000',
      light: '#FFFFFF'
    }
  })
}

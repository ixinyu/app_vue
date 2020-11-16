import EXIF from 'exif-js'
function dataURLToBlob(dataurl) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
function rotateImg(img, direction, canvas) {
  // 最小与最大旋转方向，图片旋转4次后回到原方向
  var min_step = 0
  var max_step = 3
  // var img = document.getElementById(pid);
  if (img == null) return
  var height = canvas.height
  var width = canvas.width
  // var step = img.getAttribute('step');
  var step = 2
  if (step == null) {
    step = min_step
  }
  if (direction == 'right') {
    step++
    // 旋转到原位置，即超过最大值
    step > max_step && (step = min_step)
  } else {
    step--
    step < min_step && (step = max_step)
  }
  // 旋转角度以弧度值为参数
  var degree = step * 90 * Math.PI / 180
  var ctx = canvas.getContext('2d')
  switch (step) {
    case 0:
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      break
    case 1:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height, width, height)
      break
    case 2:
      canvas.width = width
      canvas.height = height
      ctx.rotate(degree)
      ctx.drawImage(img, -width, -height, width, height)
      break
    case 3:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, -width, 0, width, height)
      break
  }
}
export const upload = (file, Orientation, callback) => { // 传入file文件
  // alert("Orientation:"+Orientation)
  const oReader = new FileReader()
  oReader.onload = function(e) {
    var image = new Image()
    image.src = e.target.result
    image.onload = function() {
      var expectWidth = this.naturalWidth
      var expectHeight = this.naturalHeight

      if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
        expectWidth = 800
        expectHeight = expectWidth * this.naturalHeight / this.naturalWidth
      } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
        expectHeight = 1200
        expectWidth = expectHeight * this.naturalWidth / this.naturalHeight
      }
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')
      canvas.width = expectWidth
      canvas.height = expectHeight
      // alert("height:"+canvas.height)
      // alert("width:"+canvas.width)
      ctx.drawImage(this, 0, 0, expectWidth, expectHeight)
      var base64 = null
      var u = navigator.userAgent; var app = navigator.appVersion
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (Orientation != '' && Orientation != 1 && (!isiOS || isiOS && canvas.height < canvas.width)) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            // alert('需要顺时针（向左）90度旋转');
            rotateImg(this, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            // alert('需要顺时针（向右）90度旋转');
            rotateImg(this, 'right', canvas)
            break
          case 3:// 需要180度旋转
            // alert('需要180度旋转');
            rotateImg(this, 'right', canvas)// 转两次
            rotateImg(this, 'right', canvas)
            break
        }
      }

      base64 = canvas.toDataURL('image/jpeg', 0.8)
      callback(base64)
    }
  }
  // console.log(file,'onlond')
  oReader.readAsDataURL(file)
}

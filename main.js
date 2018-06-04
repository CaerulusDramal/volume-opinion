$(function () {
  console.log('hello')

  var imgCode = window.location.hash.substr(1)

  console.log(imgCode)

  var srcBackground = 'https://i.imgur.com/' + imgCode.split('-')[0] + '.png'
  var srcA = 'https://i.imgur.com/' + imgCode.split('-')[1] + '.png'

  var heightA = 1
  var numA = 0
  var zoom = 50

  var makeImage = function (src) {
    return $(new Image()).attr('src', src)
  }

  var blobs = []

  var xNudge = function(num) {
    if (!blobs.length) {
      return 0
    }

    var last = 0

    // if (blobs.length % 10 === 0) {
    if (false) {
      var row = Math.floor(blobs.length / 10) - 1
      last = (row * 80) + getRandomArbitrary(-30, 30)
    } else {
      last = parseFloat(blobs[blobs.length - 1].css('left'))
    }

    return 270 + getRandomArbitrary(-30, 30) + last
  }

  var yNudge = function() {
    if (!blobs.length) {
      return 0
    }

    var row = Math.floor(blobs.length / 10)
    var row = 0

    return getRandomArbitrary(-30, 30) + (row * -70)
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  var newBlob = function() {
    var objA = makeImage(srcA)
    objA.addClass('blob').css('top', yNudge()).css('left', xNudge()).css('z-index', (1000 - blobs.length))
    $('#blobs').append(objA)
    blobs.push(objA)
  }

  var makeBlobs = function(a) {
    var extra = a - numA;

    if (extra < 0) {
      for (; extra !==0; extra++) {
        blobs.pop().remove()
        blobs.pop().remove()
      }
    } else if (extra > 0) {
      for (; extra !==0; extra--) {
        newBlob()
        newBlob()
      }
    }

    numA = a;
  }

  var start = function () {
    var backgroundA = makeImage(srcBackground)
    // var objA = makeImage('objA', srcA)

    $('#layout').append(backgroundA)
    backgroundA.css('top', 0).css('left', 20).css('z-index', -1)

    makeBlobs(1)
  }

  var adjust = function () {
    var a = $('#inputA').val()
    var b = $('#inputB').val()
    var scale = $('#inputZ').val()

    makeBlobs(b)

    $('#layout').css('transform', 'scale(' + (scale / 100) + ')')
    $('#blobs').css('transform', 'scale(' + (a / 100) + ')')

    // $('.blob').css('height', a )

    $('#current').text('Current Code: ' + a + '-' + b + '-c')
  }

  start()

  $('#inputA').val(heightA).on('change', adjust)
  $('#inputB').val(numA).on('change', adjust)
  $('#inputZ').val(zoom).on('change', adjust)

  adjust()

})

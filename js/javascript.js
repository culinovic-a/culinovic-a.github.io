$(".loader").fadeOut(800)

$(document).ready(function () {
  // HIDING ELEMENTS
  $(".navbar, .about, .test").css("display", "none")
  setTimeout(function () {
    $(".test").show()
  }, 6000)

    // FORM VALIDATION
    ; (function () {
      "use strict"
      window.addEventListener(
        "load",
        function () {
          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.getElementsByClassName("needs-validation")
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener(
              "submit",
              function (event) {
                if (form.checkValidity() === false) {
                  event.preventDefault()
                  event.stopPropagation()
                }
                form.classList.add("was-validated")
              },
              false
            )
          })
        },
        false
      )
    })()

  // TYPING EFFECT
  function typeWriter(json, speed, sentenceIndex, letterIndex) {
    if (sentenceIndex < 9) {
      if (sentenceIndex === 7 && letterIndex == 0 && speed < 1000) {
        $(".navbar").fadeIn(1000)
        speed = speed + 1000
        setTimeout(function () {
          typeWriter(json, speed, sentenceIndex, letterIndex)
        }, speed)
        return
      } else if (sentenceIndex === 7 && letterIndex === 0 && speed > 1000) {
        speed = speed - 1000
      }

      let sentence = json[sentenceIndex]

      if (letterIndex < sentence.length) {
        document.getElementById(
          "text" + (sentenceIndex + 1)
        ).innerHTML += sentence.charAt(letterIndex)
        setTimeout(function () {
          typeWriter(json, speed, sentenceIndex, letterIndex + 1)
        }, speed)
      } else {
        typeWriter(json, speed, sentenceIndex + 1, 0)
      }
    } else {
      $(".about").fadeIn(2000)
    }
  }

  $.getJSON("json/texts.json", function (json) {
    typeWriter(json.txtArray, 30, 0, 0)
  })

  // LATEST COMMIT
  var request = new XMLHttpRequest()
  request.open(
    "GET",
    "https://api.github.com/repos/culinovic-a/games-benchmarking/commits/main",
    true
  )
  request.onload = function () {
    var data = JSON.parse(this.response)
    $(".gitCommit").text(data.commit.message)
  }
  request.send()

  // SCROLL TO TOP
  $(".button").hide()
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".button").show().fadeIn()
    } else {
      $(".button").fadeOut().hide()
    }
  })
  //Click event to scroll to top
  $(".button").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 360)
    return false
  })
})

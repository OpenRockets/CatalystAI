const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    let isRecording = false;

$(".micInput-voiceRecognitionAPI_status-Active").click(function () {
    if (!isRecording) {
      recognition.start();
      
      isRecording = true;
      $(this).css({
        'background':'red',
        'fill':'black'
      })
    } else {
      recognition.stop();
      $("#voiceBtn").text("🎤 Start Listening");
      $("#loadingMsg").show(); // Show while waiting for result
      isRecording = false;
      $(this).css({
        'background':'',
        'fill':''
      })
    }
  });
  
  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    $(".mainClass_xcvd01").val(text);
    $(".spinner-092CatalystSpinner").hide(); // Hide after processing
  };
  
  recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
    $(this).css({
        'background':'',
        'fill':''
      })
    $(".spinner-092CatalystSpinner").hide(); 
    isRecording = false;
  };
  
  recognition.onend = function () {
    // Optional: you can also hide here to make sure
    $(".spinner-092CatalystSpinner").hide(); 
  };
  

  let DarkThemeX = true;

  $(".ThemeControllerrectPassDiv ").click(function () {
    const root = document.documentElement.style;

    if (DarkThemeX) {
      root.setProperty("--defaultColorBg", "#ffffff");
      root.setProperty("--defaultColorFont", "#000000");
            root.setProperty("--defaultColorFore", "rgb(230, 230, 230)");
        root.setProperty("--defaultColorInversedDark", "rgb(106, 106, 255)");
       root.setProperty("--defaultColorInversedLight", "rgb(68, 149, 255)");
        root.setProperty("--defaultColorBgHead", "#ffffffcc");
      root.setProperty("--defaultColorForeXCVCENDIV", "rgba(0, 0, 0, 0.1)");
      $(this).find('svg').html('<path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>')
      } else {

        root.setProperty("--defaultColorBg", "#000711");
         root.setProperty("--defaultColorFont", "#ffffff");
      root.setProperty("--defaultColorFore", "rgb(24, 24, 24)");
      root.setProperty("--defaultColorInversedDark", "rgb(23, 21, 59)");
      root.setProperty("--defaultColorInversedLight", "rgb(0, 24, 59)");
       root.setProperty("--defaultColorBgHead", "#000711c4");
      root.setProperty("--defaultColorForeXCVCENDIV", "rgba(172, 172, 172, 0.192)");
      $(this).find('svg').html('<path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/>')
    }
    DarkThemeX = !DarkThemeX; 
  });
  



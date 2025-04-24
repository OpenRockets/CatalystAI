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
  
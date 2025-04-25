/*Copyrights (c) 2025 NekshaDeSilva and all other contributors in CatalystAI team.
Originally created for CodeJAM 2025 Comp., Copyrights (c) University of Moratuwa, Sri Lanka.
Licenced with Apache-2.0 contributor's license*/
/*https://www.github.com/nekshadesilva/catalystai*/
var contextFileMt_name = 'Untitled.pdf';
var contextFileMt_size = '128.8';
var docValidator = 0;
console.log('WORKING')
function getCurrentTimestampFor_mainObject() {
  const now = new Date();
  return now.toISOString();
  // Returns the timestamp in ISO 8601 format
}
function randomVarFactorGen(fValue, sValue){
  fValue = Math.floor(Math.random()*29380237)
  sValue =  Math.floor(Math.random()*73208392)
  var finalVal = 'chat' + Math.floor(fValue* sValue / fValue/2);
  return finalVal;
}
var MainObjectFields_withD ={};
var currentRecurrentVARFactor = randomVarFactorGen();
var currentDate = getCurrentTimestampFor_mainObject();
var currentFactor_titieRWgen;
var titleMainContextChatSummery = 'New Chat'
function genNewCapChat(){
  
  MainObjectFields_withD[currentRecurrentVARFactor]={
    title:titleMainContextChatSummery,
    file:0,
    moment:currentDate,
    chats:{}
  }
}
genNewCapChat();
function dynamicSideBar_02(dfg, dfg1H, addvg, gghyt, ythfg){
    function inerfunc(fd_status){
        $('.sidebarX').css({
            'visibility':`${fd_status}`
        })
    }
    return new Promise((resolve, reject)=>{
        dfg = $('body').width();

        dfg1H = $('.header-main').height();
         addvg =$('.header-left-bar-cont').width();
        gghyt = $('.chatDiv-showerLIv').height();
        ythfg = $('.Xcontent').height();


         console.log(addvg)
        
            if(dfg > 0 && addvg > 0 && gghyt > 0){
            resolve('Succeded');
            if(dfg <= 870){
                inerfunc(fd_status = 'hidden');
            }else{
                inerfunc(fd_status = 'visible');
                
                ythfg = $('.Xcontent').height($('body').height() - dfg1H -48);console.log(dfg1H)
                $('.sidebarX').css({
                    'min-width':`${addvg}px`
                })
                $('.sideBarCVX-cendiv').css({
                    'max-width': `${addvg}px`
                })
                $('.box_kjhGIKYTigkg').css({
                    'min-height':`${gghyt}px`
                })
            }
        }else{
            reject('DOM not loaded properly. Reload the page to continue...');
            window.reload();
        }

        
        
    })
}

document.addEventListener('DOMContentLoaded', function(){
    randomeIdeaGen();
    $('html').on('contextmenu', function(eventH){
        eventH.preventDefault();
        
    })
    dynamicSideBar_02()
.then((response)=>{
    console.log(response);
})
.catch((error)=>{
    console.log(error);
})
$(".UxSliderOnOffTruncterTRX").off("change").on("change", function () {
  const $checkbox = $(this);

  if (typeof docValidator !== 'undefined' && docValidator === 0) {
    console.log('Expert mode not available');
    $checkbox.prop("checked", false);
    $checkbox.closest("label").removeClass("activeP");
    expertMode = 0; 
  } else {
    const isChecked = $checkbox.is(":checked");
    expertMode = isChecked ? 1 : 0;
    $checkbox.closest("label").toggleClass("activeP", isChecked);
  }

});

})
function randomeIdeaGen(){
    var obj = { }
    function randomeColorgen(r1,r2,r3){
        r1 = Math.floor(Math.random()*255)
        r2 = Math.floor(Math.random()*255)
        r3 = Math.floor(Math.random()*255)
        return `rgb(${r1},${r2},${r3})`
    }

    var obj ={};
    function addValues() {
        var index  =1 
        let x =  1;
        setInterval(() => 
            {
            text = obj[x]
            writeit(text);
            
            x = (x %  20) + 1; 
            
        }, 4000);
        

        function writeit(text){
                
                function readFrr(){
                    return Math.floor(Math.random()*15) + 16;
                }
                if (!text || typeof text !== 'string') {
                  console.warn("writeit: text is undefined or not a string");
                  return;
              }
                
                    if (index < text.length) {
                        if(21>x){
                            $('.popUploaderDynamic-chatwindow span').text(text.substring(0, index + 1)); // Add characters incrementally
                        index++;
                        
                         setTimeout(function(){
                    writeit(text);
                }, readFrr());
                        }
                        
                    }else{
                        index = 1

                       
                        
                    }
                
            
        }
    }
fetch('../assets/static/objects.txt')
    .then(response => response.text())
    .then(data => {
        obj = JSON.parse(data);
        
        addValues();
    })
    .catch(error => {console.error(
        
        'Fatal error:', error

        
    );
    window.reload();
}
    );
    

}
$('.buttonDiv_cvx-cont').on('click', function () {
    const $path = $(this).find('path'); 


    const currentFill = $path.attr('fill');
    if (currentFill === 'var(--defaultColorFont)' || !currentFill) {
        $path.attr('fill', 'rgb(0, 255, 136)'); 
    } else {
        $path.attr('fill', 'var(--defaultColorFont)');
  
    
    }
});

//There should be a mode called "BookMode" right beneath chat bubbles to search for internet and think function

// The colour of the filecontmeasurerr_func_box the icon should be changed as the media inserted to. PDF-red, Image - purple rtc.
$('body').on('click', '.verctorReburnUI', function () {
  $(this).toggleClass('backdeggft_catalystaiUI');
  setTimeout(() => {
      $(this).removeClass('backdeggft_catalystaiUI');
  }, 100);
});


let hasRunInnterFunc_typingTitleEx = false;


var u76376Status = 0;
function TypingGesturesAdd(div) {
    u76376Status = u76376Status+1;
    if(u76376Status ==1){

    
    $(div).parent().find('.jfjYrtUJYFSRFrANDOMdivcATALYST').css({
        'opacity':'100%',
        'position':'relative',
        'display':'inline-block'
    })
    let index = 0;
    const text = $(div).html(); 
    $(div).html(''); 
    console.log(div)
    function readFrr() {
        return Math.floor(Math.random() * 5) + 6; 
    }



    function innerFunc() {
        if (index < text.length) {
            $(div).html(text.substring(0, index + 1));
            index++;
            setTimeout(innerFunc, readFrr());
        } else {
            $(div).parent().find('.jfjYrtUJYFSRFrANDOMdivcATALYST').css({
                'opacity':'0%',
                'position':'fixed'
            });

            u76376Status =0;
            $('.endSlider_opper-buttons_chatbubble').css({
              'visibility':'visible',
              'position':'relative'
            });
            $('head style').remove();
            if(!MainObjectFields_withD[currentRecurrentVARFactor].title){
              //donothing
            }else{
              
            
     if (hasRunInnterFunc_typingTitleEx) return;
             hasRunInnterFunc_typingTitleEx = true;
            $('.trackName-currentChatDynamicvisual_Handler-1 span')
              .html(MainObjectFields_withD[currentRecurrentVARFactor].title);

            TypingGesturesAdd(div = '.trackName-currentChatDynamicvisual_Handler-1 span');

            hasRunInnterFunc_typingTitleEx = true;
            
              
               console.log('title_executed');
            }
            
        }
       
    }
    innerFunc();
    
}
else{
    //donothing:)
}
}
function sendDtaGVectorDB(valueR, consType, pauseUntil){
         valueR = $('.inputBoxChatInput-div').val();

     function checkIn(){
        
     }
 }
// var chatObjectDynamic = {
//     doc:{

//     },
//     C1:{
//         userInput:'',
//         chatOutput:''
//     },
//     C2:{
        
//     }
    
// }
const chunkObject = {};
      var ConvertedLangChainChapters;
       var ConvertedLangChainChunks;
function fileUpload() {
    const dynamicVirtualElemtN_Catalyst_eventhandle = $('<input>')
      .attr('type', 'file')
      .attr('accept',  'application/pdf');  // Ensure we accept only PDFs
      
    dynamicVirtualElemtN_Catalyst_eventhandle.on('change', async function (event) {
      const file =     event.target.files[0];
      if (!file) {


        console.warn("User canceled file upload.");
        docValidator =0;
        return;
      }
      docValidator =1 
      icnVX_pathHandler_inputbar(show =1);
      contextFileMt_size = Math.floor((file.size / (1024 * 1024)).toFixed(2)) + 'MB'; 
      contextFileMt_name = file.name;
      // ✅ File selected
      console.log("Selected file:", file.name);
  
      // Read the PDF file as ArrayBuffer
      const fileReader = new FileReader();

      //const //non need of useage

      fileReader.onload = async function (e) {
        const typedArray = new  Uint8Array(e.target.result); // Convert the ArrayBuffer to typed array
  
        // Load the PDF using pdf.js
        try {
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let fullText = '';
            
          // Extract text from each page
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
          }
          
          // Output the extracted text
          console.log("Extracted Text from PDF:", fullText);
          MainObjectFields_withD[currentRecurrentVARFactor].file = fullText;
          splitIntoChunkObject(text = fullText, chunkSize =555);
          readTextOpenTopicsMain(topicTetxx = fullText);
          async function uploadChunksAndTopics() {
          const res = await fetch("http://localhost:3000/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ConvertedLangChainChunks, ConvertedLangChainChapters })
          });
          console.log("🚀 Sending to backend:", {
            ConvertedLangChainChunks,
            ConvertedLangChainChapters
          });
          const data = await res.json();
          alert(data.message || "Upload done");//sends final response  
       
        } 
        uploadChunksAndTopics(); 
          
        } catch (error) {
          docValidator =0;
          console.error("Error extracting text from PDF:", error);
          
        }
      };
  
      fileReader.readAsArrayBuffer(file);  
    });
    function splitIntoChunkObject(text, chunkSize = 555) {
  const words = text.split(/\s+/);

  let chunkCount = 0;

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunkWords = words.slice(i, i + chunkSize);
    const chunkText = chunkWords.join(' ');

    const pageNumber = getPageNumberFromChunk(chunkText); // optional
    const wordCount = chunkWords.length;

    // Format chunk ID like "chunk01", "chunk02", etc.
    const chunkKey = `chunk${String(chunkCount + 1).padStart(2, '0')}`;

    chunkObject[chunkKey] = {
      text: chunkText,
      pageNumber: pageNumber,
      wordCount: wordCount
    };
    
    chunkCount++;
    
  }
  const chunkArrayForLangChain = Object.entries(chunkObject).map(
        ([chunkKey, chunkData]) => ({
          type:'chunk',
          pageContent: chunkData.text, // This is what gets embedded
          metadata: {
            chunkKey: chunkKey,
            pageNumber: chunkData.pageNumber,
            wordCount: chunkData.wordCount,
            chatKey:currentRecurrentVARFactor
          }
        })
      );
  console.log(chunkArrayForLangChain)
  ConvertedLangChainChunks =  chunkArrayForLangChain;
  
  return chunkArrayForLangChain;
}      
      
    function readTextOpenTopicsMain(topicTetxx){
        
            const words = topicTetxx.split(/\s+/); // Split by whitespace
            const TopicBasedQuery_CatalystDta = {};
          
            let topicCount = 1;
            
            for (let i = 0; i < words.length; i++) {
                const spacedWord = words.slice(i, i + 7).join(' '); // Check a window of 7 words
                const normalized = spacedWord.replace(/\s+/g, '').toUpperCase();
            
                if (normalized === 'CHAPTER') {
                  // Get 10 words before and 10 after
                  const start = Math.max(i - 10, 0);
                  const end = Math.min(i + 15, words.length);
                  const chapterContext = words.slice(start, end).join(' ');
            
                  TopicBasedQuery_CatalystDta[`chapter_${topicCount}`] = {

                    raw: chapterContext,
                    position: i
                  };
                  
                topicCount++;
              }
            }
            function categorizeChapterPositions(TopicBunch, totalWordCounts) {
                for (const chapterKey in TopicBunch) {
                  const chapter = TopicBunch[chapterKey];
                  const position = chapter.position;
              
                  // Define relative positions
                  let section = 'Starting of the book';
                  if (position <= totalWordCounts * 0.33) {
                    section = 'Start';
                  } else if (position <= totalWordCounts * 0.66) {
                    section = 'Middle of the Book';
                  } else {
                    section = 'End of the book';
                  }
              
                  chapter.section = section;
                  
                }
              
                return TopicBasedQuery_CatalystDta;
              }
              
            categorizeChapterPositions(TopicBunch = TopicBasedQuery_CatalystDta  , totalWordCounts = words.length)
            function convertChaptersToLangChainFormat(chapterObj) {
                const totalChapters = Object.keys(chapterObj).length;
              
                return Object.entries(chapterObj).map(([chapterKey, chapterData], index) => {
                  let section = "Middle of the given electronic document";
                  if (index === 0) section = "Start of the given electronic document";
                  else if (index === totalChapters - 1) section = "End of the given electronic document -- maybe the last page";
              
                  return {
                    type:'topic',
                    pageContent: chapterData.raw,
                    metadata: {
                      chapterKey,
                      section,
                      position: chapterData.position
                    }
                  };
                });
              }
              
            console.log(convertChaptersToLangChainFormat(chapterObj = TopicBasedQuery_CatalystDta));
            ConvertedLangChainChapters = convertChaptersToLangChainFormat(chapterObj = TopicBasedQuery_CatalystDta);

            return convertChaptersToLangChainFormat(chapterObj = TopicBasedQuery_CatalystDta);
            
          }
    
 
// Optional page number extractor
function getPageNumberFromChunk(chunk) {
  const match = chunk.match(/-\s*(\d+)\s*-/); // example: "-- 78 --"
  return match ? parseInt(match[1]) : null;
}

    dynamicVirtualElemtN_Catalyst_eventhandle.click();

  }
  
function dynamicChatBubble_handelr_fcdn(contentFetched){
    var parentConetert =document.createElement('div');
    document.querySelector('.chatContent').append(parentConetert)
    parentConetert.className = 'chatContentCVX_block';
    $('.mainClass_xcvd01').val('');
const chatContent = parentConetert;
chatContent.style.alignItems = 'flex-end';

const bubble = document.createElement('div');
bubble.className = 'chatBubble_payLoad-APP';
const fileDiv = document.createElement('div');
fileDiv.className = 'addedFiles_mediaProd';

if(docValidator == 1){
const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
svgIcon.setAttribute('width', '16');
svgIcon.setAttribute('height', '16');
svgIcon.setAttribute('fill', 'currentColor');
svgIcon.classList.add('bi', 'bi-file-richtext-fill');
svgIcon.setAttribute('viewBox', '0 0 16 16');
const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
path.setAttribute('d', 'M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z');
svgIcon.appendChild(path);
fileDiv.appendChild(svgIcon);
const fileText = document.createElement('div');
fileText.className = 'filecontmeasurerr_func_box';

const fileName = document.createElement('span');
fileName.className = 'q0830_chatcONTETR_name_mes';
fileName.textContent = contextFileMt_name;

const fileSize = document.createElement('span');
fileSize.className = `q0830_chatcONTETR_size_mes`;
fileSize.textContent = contextFileMt_size;

fileText.appendChild(fileName);
fileText.appendChild(fileSize);
fileDiv.appendChild(fileText);
bubble.appendChild(fileDiv);
}else{
    fileDiv.remove();
}





const messageDiv = document.createElement('div');
messageDiv.className = `recurrent_ChatContent_bubble HTPS_div-user-chat-content-fxd${recurrentVariable_env_lopingPar}`;

const msgSpan = document.createElement('span');
msgSpan.textContent = contentFetched;
sendFuncUserta_AInt(text_stremR = contentFetched);
messageDiv.appendChild(msgSpan);

bubble.appendChild(messageDiv);
//$('.deepsearch_button-websearch-user-PRT').on('click', function (event){alert(event)}
const postDiv = document.createElement('div');
postDiv.className = 'recurrentUserchatbubbleContent_poxt';


const button = document.createElement('div');
button.className = 'chatBubble-button deepsearch_button-websearch-user-PRT verctorReburnUI';

const buttonSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
buttonSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
buttonSvg.setAttribute('viewBox', '0 0 16 16');
const globePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
globePath.setAttribute('d', 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0 3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z');
buttonSvg.appendChild(globePath);
button.appendChild(buttonSvg);

const buttonText = document.createElement('span');
buttonText.textContent = 'Web Search';
button.appendChild(buttonText);

postDiv.appendChild(button);
bubble.appendChild(postDiv);
MainObjectFields_withD[currentRecurrentVARFactor].chats[
  `.HTPS_div-user-chat-content-fxd${recurrentVariable_env_lopingPar}`
] = contentFetched;
$('.popUploaderDynamic-chatwindow').remove();
chatContent.appendChild(bubble);
//end-credit-functions
//example: diverting the date to API


}

var intensityChatResponse = 100;
var recurrentVariable_env_lopingPar =0;
function dynamicChatBubble_handelr_chatBotQ(nativeOffer_dynamicrecurrentRetnOut, currentstateX, similarityConf ) {
  recurrentVariable_env_lopingPar++
  const chatContent = document.querySelector('.chatContent');
  const chatContentInnerCenDiv  = document.createElement('div');
  chatContentInnerCenDiv.className = 'chatContentCVX_block';
 
  const chatBubble = document.createElement('div');
  chatBubble.className = 'chatBubble_payLoad-ATT';

  const boxCurrentState = document.createElement('div');
  boxCurrentState.className = 'boxCurrentState_chatbubble';

  const stateDiv = document.createElement('div');
  const stateText = document.createElement('span');
  stateText.textContent = currentstateX;

  stateDiv.appendChild(stateText);
  boxCurrentState.appendChild(stateDiv);
  chatBubble.appendChild(boxCurrentState);


  const chatContentDiv = document.createElement('div');
  chatContentDiv.className = `recurrent_ChatContent_bubble HTPS_div-bot-chat-content-fxd${recurrentVariable_env_lopingPar}`;
  

  const messageSpan = document.createElement('span');

  
  messageSpan.innerHTML = nativeOffer_dynamicrecurrentRetnOut;
  chatContentDiv.appendChild(messageSpan);
  chatBubble.appendChild(chatContentDiv);

  // Delay the TypingGesturesAdd call to ensure the element is fully rendered
  setTimeout(() => {
      const selector = `.HTPS_div-bot-chat-content-fxd${recurrentVariable_env_lopingPar} span`;
      const targetElement = document.querySelector(selector);

      if (targetElement) {
          TypingGesturesAdd(selector);
          console.log('TypingGesturesAdd triggered for:', targetElement);
      } else {
          console.error('Target element not found:', selector);
      }
  }, 0); // Delay execution to the next event loop cycle

  const additionalDiv = document.createElement('div');
  additionalDiv.className = 'jfjYrtUJYFSRFrANDOMdivcATALYST';
  chatContentDiv.appendChild(additionalDiv);

  const endSlider = document.createElement('div');
  endSlider.className = 'endSlider_opper-buttons_chatbubble';

  const deepThinkButton = document.createElement('div');
  deepThinkButton.className = 'chatBubble-button chatBubble-button-deepthink verctorReburnUI';
  deepThinkButton.setAttribute('data-massIntensityThis', intensityChatResponse);

  //Us getAttribute() for retieval.
  const deepThinkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  deepThinkSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  deepThinkSvg.setAttribute('width', '16');
  deepThinkSvg.setAttribute('height', '16');
  deepThinkSvg.setAttribute('fill', 'currentColor');
  deepThinkSvg.classList.add('bi', 'bi-stars');
  deepThinkSvg.setAttribute('viewBox', '0 0 16 16');

  const deepThinkPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  deepThinkPath.setAttribute('d', 'M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z');
  deepThinkSvg.appendChild(deepThinkPath);
  deepThinkButton.appendChild(deepThinkSvg);

  const deepThinkText = document.createElement('span');
  deepThinkText.textContent = 'Deep Think';
  deepThinkButton.appendChild(deepThinkText);

  endSlider.appendChild(deepThinkButton);


  const webSearchButton = document.createElement('div');
  webSearchButton.className = 'chatBubble-button chatBubble-button-searchWeb verctorReburnUI';

  const webSearchSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  webSearchSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  webSearchSvg.setAttribute('viewBox', '0 0 16 16');

  const webSearchPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  webSearchPath.setAttribute('d', 'M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0 3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z');
  webSearchSvg.appendChild(webSearchPath);
  webSearchButton.appendChild(webSearchSvg);

  const webSearchText = document.createElement('span');
  
  webSearchText.textContent = 'Web Search';
  webSearchButton.appendChild(webSearchText)
  endSlider.appendChild(webSearchButton);

  chatBubble.appendChild(endSlider);

  chatContentInnerCenDiv.appendChild(chatBubble);
  chatContent.appendChild(chatContentInnerCenDiv);
  MainObjectFields_withD[currentRecurrentVARFactor].chats[
    `.HTPS_div-bot-chat-content-fxd${recurrentVariable_env_lopingPar}`
  ] = nativeOffer_dynamicrecurrentRetnOut;
  if(recurrentVariable_env_lopingPar == 1){
    console.log('sending started')
    sendTextToGemini(textC = nativeOffer_dynamicrecurrentRetnOut).then((title) => {
      MainObjectFields_withD[currentRecurrentVARFactor].title = title;
     console.log(MainObjectFields_withD);
     
     
  });
  }
  if(similarityConf === undefined || similarityConf ===null){
    
  //doNothing
  }else{
    const confidenceHandelerCont = document.createElement('div');
  confidenceHandelerCont.className = 'confidenceHandelerElement verctorReburnUI';
  const confidenceHandelerCont_span = document.createElement('span');
  var similarityConfX  = similarityConf*100+'%';
  confidenceHandelerCont_span.innerHTML = `Accuracy Score`;
  const confidenceHandelerCont_inputWrapper = document.createElement('div')
  confidenceHandelerCont_inputWrapper.className = 'confidenceHandelerElement_inputWrapper';
  const confidenceHandelerCont_inputBar = document.createElement('div');
    confidenceHandelerCont_inputBar.style.width = similarityConfX;
    confidenceHandelerCont_inputWrapper.appendChild(confidenceHandelerCont_inputBar)
    confidenceHandelerCont.appendChild(confidenceHandelerCont_inputWrapper);
    confidenceHandelerCont.appendChild(confidenceHandelerCont_span)
    endSlider.appendChild(confidenceHandelerCont);
  }
}
$('body').off('click', '.chatBubble-button-deepthink').on('click', '.chatBubble-button-deepthink', function(event) {
  event.stopPropagation();
  let attr_intensity_reverted = $(this).attr('data-massIntensityThis');
  let textContextV = $(this).parent().parent().find('.recurrent_ChatContent_bubble span').html();
  
  console.log(intensityChatResponse, textContextV);

  // Increase the intensity
  intensityChatResponse += 100;
  attr_intensity_reverted = intensityChatResponse;

  // Call your function
  callFunction_API_handle_langChain(intensityFeaturePI = attr_intensity_reverted, textContentF = textContextV);

  // Remove the class from the clicked element
  $('<style>')
  .prop('type', 'text/css')
  .html('.chatInput-div::before { border: .15rem solid var(--defaultColorneonGreen) !important; }')
  .appendTo('head');
  $(this).removeClass('chatBubble-button-deepthink');

});

function callFunction_API_handle_langChain(intensityFeaturePI, textContentF, returnValue){
  //This is just a simulation for now.
  //needs to be updted with API #needstobeupdated
  //send intenstiyF to LangChain and things on that and then recieve the full data amount 
  console.log(textContentF)
  function boxCurrentState_retieval_gen(){
    return "Finalyzing.."


  }
  // dynamicChatBubble_handelr_chatBotQ(nativeOffer_dynamicrecurrentRetnOut = sendBackata_simulation(), currentstateX = boxCurrentState_retieval_gen());
  //there is more to add.
  deepSearchEngineActivator_passmakeover(intense = intensityFeaturePI, UI_sendfunc_currentState = boxCurrentState_retieval_gen(), actText=textContentF);

}

async function sendTextToGemini(textC) {
  try {
      const response = await fetch('/generate-title', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ textC: textC })
      });

      console.log('Request sent with textC:', textC);

      const data = await response.json();
      console.log('Generated Title:', data.title);
      return data.title;
  } catch (error) {
      console.error('Error fetching Gemini title:', error);
      return 'Untitled Chat';
  }
}
async function sendTextGeneral(responseXForm) {
  try {
      const response = await fetch('/general-postG', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseXForm: responseXForm })
      });

      console.log('Request sent with', responseXForm);

      const data = await response.json();
      console.log('Generated response:', data.resultX); 
      console.log('Generated CurrentState', data.stateX);
      dynamicChatBubble_handelr_chatBotQ(nativeOffer_dynamicrecurrentRetnOut =data.resultX, currentstateX =data.stateX )
      return data.resultX;
  } catch (error) {
      console.error('Error fetching Gemini response:', error);
      return 'Untitled Chat';
  }
}

function icnVX_pathHandler_inputbar(show){
  if(show ==1){
    $('.ConetntCreationKernalIdentifier_buildDeps').css({
      'visibility':'visible',
      'position':'relative'
    });
  }else{
    $('.ConetntCreationKernalIdentifier_buildDeps').css({
      'visibility':'hidden'
      ,'position':'fixed'
    })
    docValidator = 0;
  }


}
$('.ConetntCreationKernalIdentifier_buildDeps').on('click', function(){
  icnVX_pathHandler_inputbar(show = 0);
  docValidator =0;
})
// Example usage:


// var MainObjectFields_withD = {
//   chatYUyuyhdjnd7744:{
//     title:'Trying to learn new instruments in future..',
//     file:'pdfText(whole)should be inserted here.',
//     chats:{
//       'HTPS_div-user-chat-content-fxd1':'HeyHowAreYou',
//       'HTPS_div-bot-chat-content-fxd1':'Imfinethanksyou'
//     },
//     moment:'2025/09/17-09-08'
//   },
//   chatjYhkhhdgkjdhgd30839:{
//     title:'Trying to learn new instruments in future..',
//     file:'pdfText(whole)should be inserted here.',
//     chats:{
//       'HTPS_div-user-chat-content-fxd1':'HeyHowAreYou',
//       'HTPS_div-bot-chat-content-fxd1':'Imfinethanksyou'
//     },
//      moment:'2025/09/17-09-08'
//   }
// }
//preview usage of main chat storing object.


function sendFuncUserta_AInt(text_stremR){
  if(docValidator ==0){//when pdf  not uploaded
    console.log('pdf not unploaded.');
    console.log(text_stremR)
    sendTextGeneral(responseXForm =text_stremR);
  }else{
    console.log('pdf detected.');
    sendTextDoc(responseXForm =text_stremR);
  }
}
//DeepSearch Engine V1
var expertMode = 0;
function deepSearchEngineActivator_passmakeover(intense ,UI_sendfunc_currentState, actText){
if(docValidator==0){
  deepSearchVal(actTextRet = actText, intenseRet = intense, UI_sendfunc_currentStateRet = UI_sendfunc_currentState)
  console.log(actText, 'Done in Send1-frontend')
}else{
  if(expertMode ==0){
    deepSearchDoc(actTextRet =actText, intenseRet  =intense,  instructionR= 'detail')
  }else{
    deepSearchDoc(actTextRet =actText, intenseRet  =intense, instructionR = 'question')
  }
  
}
}
async function deepSearchVal(actTextRet, intenseRet, UI_sendfunc_currentStateRet) {
  try {
    console.log(actTextRet, 'Done in Send2-frontend')
    const response = await fetch('/deep-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ actTextRet, intenseRet })
      
    });

    console.log('Request sent with', actTextRet, intenseRet);

    const data = await response.json();
    console.log('Generated response:', data.deepResponse);
    const nativeOffer_dynamicrecurrentRetnOut = data.deepResponse;
const currentstateX = UI_sendfunc_currentStateRet;

dynamicChatBubble_handelr_chatBotQ(nativeOffer_dynamicrecurrentRetnOut, currentstateX);
 

    return data.deepResponse;
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    return 'Failed Deep Search';
  }
}
  async function deepSearchDoc(actTextRet, intenseRet, instructionR) {
    try {
      console.log(actTextRet, 'Done in Send2-frontend')
      const response = await fetch('/upload_deepdoc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ actTextRet, intenseRet,  instructionR})
        
      });
  
      console.log('Request sent with', actTextRet, intenseRet, instructionR);
  
      const data = await response.json();
      console.log('Generated response:', data.deepResponse);
      const respondedVal = data.deepResponse;
      const similarityConfidenceX = data.similarityAverage
  
  dynamicChatBubble_handelr_chatBotQ( respondedVal,'Analyzing..',similarityConfidenceX);
   
  
      return data.deepResponse;
    } catch (error) {
      console.error('Error fetching Gemini response:', error);
      return 'Failed Deep Search';
    }
}





async function sendTextDoc(responseXForm) {
  try {
      const response = await fetch('/doc-postG', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ responseXForm: responseXForm })
      });

      console.log('Request sent with', responseXForm);

      const data = await response.json();
      console.log('Generated response:', data.resultX); 
      dynamicChatBubble_handelr_chatBotQ(nativeOffer_dynamicrecurrentRetnOut =data.resultX, currentstateX ='Generating..' )
      return data.resultX;
  } catch (error) {
      console.error('Error fetching Gemini response:', error);
      return 'Untitled Chat';
  }
}

function fcdnCall(){
  //creteDynamicElements
  $('.summaryContentExperimental_handleDiv').remove();
  function genNewCapChat(){
    hasRunInnterFunc_typingTitleEx = false;
    recurrentVariable_env_lopingPar =0 ;
  currentRecurrentVARFactor = randomVarFactorGen();
    MainObjectFields_withD[currentRecurrentVARFactor]={
      title:titleMainContextChatSummery,
      file:0,
      moment:currentDate,
      chats:{}
    }
    $('.trackName-currentChatDynamicvisual_Handler-1 span').text('New Chat');

  }
  genNewCapChat();
togglePasser_newPreviewCrea();


$('.chatContent').empty();
docValidator=0;
console.log('Expert mode not available');
$('.UxSliderOnOffTruncterTRX').prop("checked", false);
$('.UxSliderOnOffTruncterTRX').closest("label").removeClass("activeP");
expertMode = 0; 

intensityChatResponse = 100;
const $newDiv = $("<div>", {
  class: "popUploaderDynamic-chatwindow childelementYRRT"
}).append($("<span>"))

$(".chatWindow-display").append($newDiv);
$('.ConetntCreationKernalIdentifier_buildDeps'),css({
  'visibility':'hidden',
  'position':'fixed'
})
dynamicSideBar_02();

}
function togglePasser_newPreviewCrea() {
  const $sideBar = $(".sideBarCVX");
  $sideBar.empty();
  
  const fragment = $(document.createDocumentFragment());

  for (const chatID in MainObjectFields_withD) {
    const chat = MainObjectFields_withD[chatID];
    const chats = chat.chats || {};
    const title = chat.title || "New Chat";

    // ✅ Get first 'bot-chat' content
    let botSummary = "";
    for (const key in chats) {
      if (key.includes("bot-chat")) {
        botSummary = chats[key];
        break;
      }
    }

    // ✅ Clean and limit summary
    const botSummaryText = $("<div>").html(botSummary).text(); // remove tags
    const botSummaryX = botSummaryText.split(" ").slice(0, 5).join(" ") + "";

    // ✅ Store original object safely in data attribute
    

    const htmlBlock = $(`
      <div class="sideBarCVX-cendiv">
        <div class="chatDiv-showerLIv">
          <div class="box_kjhGIKYTigkg"></div>
          <div class="chatDiv-showerLIv-indexer">
            <span class="indexerElement_7786956">${title}</span>
            <span class="indexerElement_8886956">${botSummaryX}</span>
          </div>
          <div class="buttonDiv_cvx-cont">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-clock-history" viewBox="0 0 16 16">
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </div>
        </div>
      </div>
    `);

    fragment.append(htmlBlock);
  }

  $sideBar.append(fragment);
}
//summerizePushFeature
function callForPushSummary(){
  function innerFunc(chatObject){
    
      const chats = chatObject.chats;
      let userChatText = '';
      let botChatText = '';
    
      for (const key in chats) {
        if (key.startsWith('.HTPS') && key.includes('user-chat')) {
          userChatText += chats[key] + ' ';
        }
        if (key.startsWith('.HTPS') && key.includes('bot-chat')) {
          botChatText += chats[key] + ' ';
        }
      }
    
      return {
        userChats: userChatText.trim(),
        botChats: botChatText.trim()
      };
    }
    

  const chunkCount = Object.keys(chunkObject).filter(key => key.startsWith("chunk")).length;
    console.log("Total chunks:", chunkCount);
    const numberOfWordsInDoc = chunkCount*555;
    const finalityResponseCout = innerFunc(chatObject = MainObjectFields_withD[currentRecurrentVARFactor]);
    pushSearchSummery(noWords = numberOfWordsInDoc, finalityNumberOfResponsesUser = finalityResponseCout.userChats, finalityNumberOfResponsesBot = finalityResponseCout.botChats)

  }
async function pushSearchSummery(noWords, finalityNumberOfResponsesUser , finalityNumberOfResponsesBot) {
  
  try {
    
    const response = await fetch('/summery-e', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ noWords, finalityNumberOfResponsesBot, finalityNumberOfResponsesUser })
      
    });

    console.log('Request sent with', noWords, finalityNumberOfResponsesBot, finalityNumberOfResponsesUser);

    const data = await response.json();
    const coverageAsAPercentage = data.sumryX;
    alert(data.sumryX);
    summeryLoggerInTheGood(coverge = coverageAsAPercentage);

    return data.sumryX;
  } catch (error) {
    console.error('Error fetching Gemini response:', error);
    return 'Failed summerizing';
  }
}
function summeryLoggerInTheGood(coverge){
  addCompletionPercentage(coverge)
  function addCompletionPercentage(percentage) {
    const chatWindow = document.querySelector(".chatWindow-display");
  
    if (!chatWindow) {
      console.error("chatWindow-display element not found.");
      return;
    }
  
    const html = `
      <div class="popUploaderDynamic-chatwindow childelementYRRT"> 
        <div class="summaryContentExperimental_handleDiv">
          <div class="summaryContentExperimental_handleDiv_left">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
              <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
            </svg>
            <div>Document Completion:</div>
            <h4>Calculation Based on your provided document, as a percentage.</h4>
          </div>
          <div class="summaryContentExperimental_handleDiv_right">
            <div>
              ${percentage}
            </div>
          </div>
        </div>
      </div>
    `;
  
    chatWindow.innerHTML = html;
  }
  
}
function downloadJSON(data, filename = "data.json") {
  const jsonStr = JSON.stringify(data, null, 2); 
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url); // Cleanup
}
function sendMessage(){

  
    const valuex = $('.mainClass_xcvd01').val();
    dynamicChatBubble_handelr_fcdn(contentFetched = valuex);

  

}

  let toggleStateForNewChatToggle = false;
function newChatBtnClick(){
  if(docValidator == 0){
    fcdnCall()
  }else{
    if (toggleStateForNewChatToggle) {
    fcdnCall();
    
  } else {
    callForPushSummary()
    downloadJSON(MainObjectFields_withD, 'Data.json')
  }
  toggleStateForNewChatToggle = !toggleStateForNewChatToggle; 

  }

  
}
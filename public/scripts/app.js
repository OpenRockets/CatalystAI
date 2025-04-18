/*Copyrights (c) 2025 NekshaDeSilva and all other contributors in CatalystAI team.
Originally created for CodeJAM 2025 Comp., Copyrights (c) University of Moratuwa, Sri Lanka.
Licenced with Apache-2.0 contributor's license*/
/*https://www.github.com/nekshadesilva/catalystai*/

console.log('WORKING')

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
.error((error)=>{
    console.log(error);
})
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
                    return Math.floor(Math.random()*51) + 50;
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

$('.verctorReburnUI').on('click', function(){
    
        $(this).toggleClass('backdeggft_catalystaiUI');
        setTimeout(()=>{
            $(this).removeClass('backdeggft_catalystaiUI');
        },100)
    
    

})
var u76376Status = 0;
function TypingGesturesAdd(div) {
    u76376Status = u76376Status+1;
    if(u76376Status ==1){

    
    $(div).parent().find('div').css({
        'opacity':'100%',
        'position':'relative',
        'display':'inline-block'
    })
    let index = 0;
    const text = $(div).html(); 
    $(div).html(''); 

    function readFrr() {
        return Math.floor(Math.random() * 11) + 10; 
    }




    function innerFunc() {
        if (index < text.length) {
            $(div).html(text.substring(0, index + 1));
            index++;
            setTimeout(innerFunc, readFrr());
        } else {
            $(div).parent().find('div').css({
                'opacity':'0%',
                'position':'fixed'
            });
            u76376Status =0;
            
            
        }
       
    }
    innerFunc();
    
}
else{
    //donothing:)
}
}




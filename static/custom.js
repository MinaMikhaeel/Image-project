let imgText = document.getElementById("imgtext");
let imgText2 = document.getElementById("imgtext2");
let imgText3 = document.getElementById("imgtext3");
let imgText4 = document.getElementById("imgtext4");


function myFunction(num) {
    if (num==1){
        window.location.hash='#imgtext';

        if (imgText.style.display === "none") {
            imgText.style.display = "block";
              imgText2.style.display = "none";
              imgText3.style.display = "none";
              imgText4.style.display = "none";
           
        } else {
            imgText.style.display = "none";

    
        }
       
    }
    else if (num==2) {
        window.location.hash='#imgtext2';

        if (imgText2.style.display === "none") {
            imgText2.style.display = "block";
       

              imgText.style.display = "none";
              imgText3.style.display = "none";
              imgText4.style.display = "none";
    
        } else {
            imgText2.style.display = "none";

    
        }
        
    }
    else if (num==3){
        window.location.hash='#imgtext3';

        if (imgText3.style.display === "none") {
            imgText3.style.display = "block";
       

              imgText2.style.display = "none";
              imgText.style.display = "none";
              imgText4.style.display = "none";
    
        } else {
            imgText3.style.display = "none";

    
        }
       

    }
    else if (num==4) {
        window.location.hash='#imgtext4';

        if (imgText4.style.display === "none") {
            imgText4.style.display = "block";
       

              imgText2.style.display = "none";
              imgText3.style.display = "none";
              imgText.style.display = "none";
    
        } else {
            imgText4.style.display = "none";

    
        }
    }
  }

let hide=document.getElementsByClassName('hideBtn')[0]&&document.getElementsByClassName('hideBtn')[4]&&document.getElementsByClassName('hideBtn')[8];
let paragraph=document.getElementsByClassName('text')[0];
let info=document.getElementsByClassName('infoBtn')[0]&&document.getElementsByClassName('infoBtn')[4]&&document.getElementsByClassName('infoBtn')[8];

hide.addEventListener('click',hidePara);

function hidePara() {
    if (paragraph.style.display === "none") {
        paragraph.style.display = "block";

          paragraph1.style.display = "none";
          paragraph3.style.display = "none";
          paragraph2.style.display = "none";
         info.innerHTML = "Close";
         info3.innerHTML="Show Information"
         info1.innerHTML="Show Information"
         info2.innerHTML="Show Information"

    } else {
        paragraph.style.display = "none";
        info.innerHTML = "Show Information";

    }
   
}    


let hide1=document.getElementsByClassName('hideBtn')[1]&&document.getElementsByClassName('hideBtn')[5]&&document.getElementsByClassName('hideBtn')[9];
let paragraph1=document.getElementsByClassName('text')[1];

let info1=document.getElementsByClassName('infoBtn')[1]&&document.getElementsByClassName('infoBtn')[5]&&document.getElementsByClassName('infoBtn')[9];
hide1.addEventListener('click',hidePara1);

function hidePara1() {
    if (paragraph1.style.display === "none") {
        paragraph1.style.display = "block";

          paragraph.style.display = "none";
          paragraph3.style.display = "none";
          paragraph2.style.display = "none";

          info1.innerHTML = "Close";
          info.innerHTML="Show Information"
          info3.innerHTML="Show Information"
          info2.innerHTML="Show Information"

    } else {
        paragraph1.style.display = "none";
        info1.innerHTML = "Show Information";

    }
   
}  
let hide2=document.getElementsByClassName('hideBtn')[2]&&document.getElementsByClassName('hideBtn')[6]&&document.getElementsByClassName('hideBtn')[10];
let paragraph2=document.getElementsByClassName('text')[2];
let info2=document.getElementsByClassName('infoBtn')[2]&&document.getElementsByClassName('infoBtn')[6]&&document.getElementsByClassName('infoBtn')[10];

hide2.addEventListener('click',hidePara2);

function hidePara2() {
    if (paragraph2.style.display === "none") {
        paragraph2.style.display = "block";

          paragraph1.style.display = "none";
          paragraph.style.display = "none";
          paragraph3.style.display = "none";
          info2.innerHTML = "Close";
          info.innerHTML="Show Information"
          info1.innerHTML="Show Information"
          info3.innerHTML="Show Information"

    } else {
        paragraph2.style.display = "none";
        info2.innerHTML = "Show Information";

    }
   
} 
console.log(document.getElementsByClassName('hideBtn'));
let hide3=document.getElementsByClassName('hideBtn')[3]&&document.getElementsByClassName('hideBtn')[7]&&document.getElementsByClassName('hideBtn')[11];
let paragraph3=document.getElementsByClassName('text')[3];
let info3=document.getElementsByClassName('infoBtn')[3]&&document.getElementsByClassName('infoBtn')[7]&&document.getElementsByClassName('infoBtn')[11];
hide3.addEventListener('click',hidePara3);

function hidePara3() {
    if (paragraph3.style.display === "none") {
        paragraph3.style.display = "block";

          paragraph1.style.display = "none";
          paragraph.style.display = "none";
          paragraph2.style.display = "none";
          info3.innerHTML = "Close";
          info.innerHTML="Show Information"
          info1.innerHTML="Show Information"
          info2.innerHTML="Show Information"


    } else {
        paragraph3.style.display = "none";
        info3.innerHTML = "Show Information";

    }
   
}  


let menu=document.getElementsByClassName('sideNavBtn');


   menu[0].addEventListener('click',showNav);
   menu[1].addEventListener('click',showNav);


    

function showNav() {

let navBarEx= document.getElementById('sideNav');
    let container =  document.getElementById('resize');
 


navBarEx.style.height= '100vh';
navBarEx.style.bottom= '0';
navBarEx.style.opacity= '1';
navBarEx.style.transition = 'all 0.6s';

    if ($('body').width() > 768) {
    navBarEx.style.width= '20%';
    container.style.width='80%';
    container.style.transition= 'width 0.6s';
    container.style.transitionDelay= '0.6s';

}
    else {
     navBarEx.style.width= '100%';

}
menu[1].style.display = 'none';
menu[0].style.display = 'none';
    

   
    

}

let closeMenu=document.getElementById('closeBtn');
    
closeMenu.addEventListener('click',closeNav);

function closeNav() {

let closeNavBarEx= document.getElementById('sideNav');
    
    let container =  document.getElementById('resize');



    
closeNavBarEx.style.width= '0';
closeNavBarEx.style.height= '0';
closeNavBarEx.style.bottom= '10%';
closeNavBarEx.style.opacity='0';
closeNavBarEx.style.transition = 'all 0.6s';
closeNavBarEx.style.transitionDelay = '0.3s';

if ($('body').width() > 768) {
    container.style.width='100%';
container.style.transition= 'width 0.6s';
closeNavBarEx.style.transitionDelay= '0.6s';

}
    

menu[1].style.display = 'block';
menu[0].style.display = 'flex';
    
}

$(document).ready(function(){

    $("input[type='radio']").click(function(){
    var sim = $("input[type='radio']:checked").val();
    //alert(sim);
    if (sim<3) { $('.myratings').css('color','red'); $(".myratings").text(sim); }else{ $('.myratings').css('color','green'); $(".myratings").text(sim); } }); });

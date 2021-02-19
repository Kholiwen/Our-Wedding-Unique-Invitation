let t1 = gsap.timeline({ paused: true }); 
let flap = CSSRulePlugin.getRule(".envelope:before"); 

t1.to(flap, { 
  duration: 0.5, 
  cssRule: {
    rotateX: 180
  }
})
 .set(flap, {
  cssRule: {
    zIndex: 10
  }
})
 .to('.letter', {
  translateY: -200,
  duration: 0.9, 
  ease: "back.inOut(1.5)"
})
 .set('.letter', {
  zIndex: 40
})
 .to('.letter', {
  duration: .7,  
  ease: "back.out(.4)",
  translateY: 50,
  translateZ: 288
});

let t2 = gsap.timeline({ paused: true }); 
t2.to('.shadow', {
  delay: 1.2,
  width: 625,
  boxShadow: "-75px 588px 10px 5px #eeeef3",
  ease: "back.out(.8)",
  duration: .7
}); 

function addBird(){
const div = document.createElement('div');

  div.className = 'row';

  div.innerHTML = `
    <div class="bird-container">
		<div class="bird-container-right bird-container--one">
			<div class="bird-right bird--one"></div>
		</div>
		<div class="bird-container-left bird-container--two">
			<div class="bird-left bird--two"></div>
		</div>
    </div>
  `;

  document.getElementsByClassName('container')[0].appendChild(div);
}

function playSongs()
{
	document.getElementById("my_audio").play();
}

function openCard(e) {
  playSongs();
  t1.play();
  addBird();
  document.getElementsByClassName('envelope')[0].className += " animate";
  t2.play();
  hideAddressBar();
}

function closeCard(e) {
  t1.reverse();
  t2.reverse();
}
function hideAddressBar() {
  if(!window.location.hash) {
    if(this.innerHeight < window.outerHeight)
      document.body.style.height = (window.outerHeight + 50) + 'px';
    setTimeout( function(){ 
        window.scrollTo(0, 25); 
        document.body.style.height = 'auto'; 
      }, 1500 );
  }
}
(function( win ){
	var doc = win.document;
	
	// If there's a hash, or addEventListener is undefined, stop here
	if( !location.hash && win.addEventListener ){
		
		//scroll to 1
		window.scrollTo( 0, 1 );
		var scrollTop = 1,
			getScrollTop = function(){
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
			},
		
			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = getScrollTop();
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}	
			}, 15 );
		
		win.addEventListener( "load", function(){
			setTimeout(function(){
				//at load, if user hasn't scrolled more than 20 or so...
				if( getScrollTop() < 20 ){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 0);
		} );
	}
})( this );
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
        translateY: -88,
        translateZ: 65
    });

let t2 = gsap.timeline({ paused: true });
t2.to('.shadow', {
    delay: 1.5,
    width: 300,
    boxShadow: "38px -70px 10px 5px #eeeef3",
    ease: "back.out(.8)",
    duration: .7
});

function addBird() {
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

document.getElementsByClassName("letter")[0].addEventListener("click", function () {
    hideLetterAndShowStream();
});

function playSongs() {
    document.getElementById("my_audio").play();
}

function openCard(e) {
    playSongs();
    t1.play();
    document.getElementsByClassName('envelope')[0].className += " animate";
    t2.play();
    hideAddressBar();
    setTimeout(function () { requestFullScreen(document.body); }, 2888);
    setTimeout(function () { showOurJourneyLink(); }, 3888);
    setTimeout(function () { addBird(); }, 1188);
    setTimeout(function () { document.getElementsByClassName('shadow')[0].style.width = "300px" }, 3888);
    setTimeout(function () { hideLetterAndShowStream(); }, 188000);
}

function closeCard(e) {
    t1.reverse();
    t2.reverse();
}

function hideAddressBar() {
    setTimeout(function () {
        window.scrollTo(0, 1);
    }, 5500);
}

function hideLetterAndShowStream() {
    document.getElementById('livestream').classList.add('show');
    document.getElementById('livestream').style.display = 'block';
    document.getElementsByClassName('letter')[0].classList.add("hide");
    setTimeout(function () { document.getElementById('livestream').style.opacity = 1; }, 500);
}

function showOurJourneyLink() {
    document.getElementById('sticky-bar').classList.add('show');
    document.getElementById('sticky-bar').style.display = 'block';
    setTimeout(function () { document.getElementById('sticky-bar').style.opacity = 1; }, 500);
}

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

(function (win) {
    var doc = win.document;
    setTimeout(function () { eventFire(document.getElementsByClassName("envelope")[0], 'click'); }, 2888);

    // If there's a hash, or addEventListener is undefined, stop here
    if (!location.hash && win.addEventListener) {

        //scroll to 1
        window.scrollTo(0, 1);
        var scrollTop = 1,
            getScrollTop = function () {
                return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
            },

            //reset to 0 on bodyready, if needed
            bodycheck = setInterval(function () {
                if (doc.body) {
                    clearInterval(bodycheck);
                    scrollTop = getScrollTop();
                    win.scrollTo(0, scrollTop === 1 ? 0 : 1);
                }
            }, 15);

        win.addEventListener("load", function () {
            setTimeout(function () {
                //at load, if user hasn't scrolled more than 20 or so...
                if (getScrollTop() < 20) {
                    //reset to hide addr bar at onload
                    win.scrollTo(0, scrollTop === 1 ? 0 : 1);
                }
            }, 0);
        });
    }
})(this);
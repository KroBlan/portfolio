
/* <--- TO-DO --->
- Handle browser's compatibility -> https://css-tricks.com/controlling-css-animations-transitions-javascript/ */

/*
Algorithme:
- Le robot doit aléatoirement bouger les pupilles et cligner les yeux de manière réaliste.
- Les bars doivent bouger doivent bouger à la manière d'un oscillateur en cas de décelenchement de dialogue
- Le faire virevolter de haut en bas comme s'il flottait dans l'air
- Eventuellement lui faire suivre la souris des yeux par moment
*/

document.addEventListener('DOMContentLoaded', (event) => {// When Dom is completely loaded
    console.log(event);
    var getRandomNumber = (min, max) => Math.random() * (max - min) + min;
    // Declarations for pupilsMovement()
    let pupilsMoveSheet = document.createElement('style');
    // Declarations for eyesBlink()
    let topLids = document.getElementsByClassName('topEyeLid');
    let bottomLids = document.getElementsByClassName('bottomEyeLid');
    // Declarations for levitate()
    const robotHead = document.getElementById('machineCOPY');
    const robotShadow = document.getElementById('shadow');
    let levitationSheet = document.createElement('style');
    // Declarations for speaks()
    const speakBars = document.getElementById('speakBars').children;
    let speakSheet = document.createElement('style');

    function pupilsMovement() {
        // Creating random eye movement via css transition (First Math.random is duration, second is delay)
        let pupilsTransition = "transform " + Math.random() * 3 + "s " + Math.random() * 3 + "s";
        let negativeX = Math.random() < 0.5 ? "-" : "";
        let negativeY = Math.random() < 0.5 ? "-" : "";
        let pupilsMove = ".pupilsMove { transform: translate(" + negativeX + Math.random() * 2 + "%," + negativeY + Math.random() * 2 + "%); }"
        
        // Inserting newly created pupilsMove class in a new stylesheet for the transition
        pupilsMoveSheet.innerHTML = pupilsMove;
        document.body.appendChild(pupilsMoveSheet);
        // Applying transition to the pupils elements
        let pupils = document.getElementsByClassName('pupils');
        for (const elem of pupils) {
            // elem.addEventListener("mozTransitionEnd", console.log(elem.tagName + ' is DONE!!!'), false);  
            elem.style.transition = pupilsTransition;
            elem.ontransitionend = () => {// For later: Handle browser compatibility (ex:webkittransitionend)
                pupilsMovement();// <--- It retriger the pupils movement when finished 👍
            };
            elem.classList.add("pupilsMove");
        }
    }
    
    function eyesBlink() {
        // Generating css animations
        if (Math.random() < 0.6) { // if statement make it trigger only x% of the time
            let blinkDuration = getRandomNumber(0.1, 0.4).toString();
            let blinkDelay = getRandomNumber(0.1, 4.5).toString();
            let animBlinkTop = `blink-bottom-eye-lid ${blinkDuration}s ${blinkDelay}s 2 alternate ease-in-out`;
            let animBlinkBottom = `blink-top-eye-lid ${blinkDuration}s ${blinkDelay}s 2 alternate ease-in-out`;
            
            console.warn("!!!! eyesBlink has been called !!!!!");
            console.warn(animBlinkBottom);
            console.warn(animBlinkTop);
            
            lidsMove = (lids) => {
                /* css animation wont retrigger unless the element is detroyed and recreated,
                hence removeChild and appendChild */
                for (elem of lids) {
                    let parent = elem.parentNode;
                    parent.removeChild(elem);
                    parent.appendChild(elem);
                    elem.style.animation = elem.classList.contains('topEyeLid') ? animBlinkBottom : animBlinkTop;
                }
            }

            lidsMove(topLids);
            lidsMove(bottomLids);
        } else {
            console.warn('EYESBLINK NOT TRIGGERED !!!')
        }
    }

    function levitate () {
        console.warn("--- levitate called ---")

        const levitationTransition = "all 2s ease-in-out";// To randomize
        robotHead.style.transition = robotShadow.style.transition = levitationTransition;

        let levitationMove = `
        .levitationMove { transform: translateY(-12.5%) }
        .shadowMove { transform: scaleX(1.2); }`;// To randomize
        
        levitationSheet.innerHTML = levitationMove;
        document.body.appendChild(levitationSheet);
        
        robotHead.classList.add('levitationMove');
        robotShadow.classList.add('shadowMove');

        robotHead.ontransitionend = () => {
            console.log("Levitaitiion animation END");
            levitationMove = `
            .levitationMoveDown { transform: translate(0%, 0%) }
            .shadowMoveDown { transform: scaleX(1); }`;
            levitationSheet.innerHTML = levitationMove;
            robotHead.classList.add('levitationMoveDown');
            robotShadow.classList.add('shadowMoveDown');

            robotHead.ontransitionend = () => levitate();// <--- Triggers infinite loop
        }
    }

    function speak() {// https://css-tricks.com/scale-svg/ <---------
        // console.log(document.getElementById('speakBars'));
        // let barNum = 0;
        // let [bass, middle, high] = [[], [], []]; // One line declaration of multiple arrays 🤙

        // for (bar of speakBars) {
        //     console.log("----> ");
        //     // console.log(bar);
        //     if (barNum < 3) bass.push(bar)
        //     else if (barNum >= 3 && barNum < 6) middle.push(bar)
        //     else high.push(bar);
        //     // if (barNum < 3) {
        //     //     console.log('BASS');
        //     //     bass.push(bar);
        //     // } else if (barNum >= 3 && barNum < 6) {
        //     //     console.log('MIDDLE');
        //     //     middle.push(bar);
        //     // } else {
        //     //     console.log('HIGH');
        //     //     high.push(bar);
        //     // }

        //     ++barNum;
        // }
        let masterBar = ('speakBar' + 10).toString();
        masterBar = document.getElementById(masterBar);
        console.log(masterBar);
        let barTransition = "3s";
        let barMove = ".barMove { transform: scaleY(1.2); }"
        // masterBar.style.transition = barTransition;
        speakSheet.innerHTML = barMove;
        document.body.appendChild(speakSheet);
        masterBar.classList.add('barMove');
    }
    // speak();

    function grabAntenna() {
        /* Must be able to grab antenna by clicking (or swiping on touchscreens) and make it 
        move and maybe drag the robot a little... Check magnetic button video link in README
        for inspiration */
    }

    // Pour randomiser le clignement il faut créer un num random pour le setInterval, et le passer à eyesBlink
    // pour que le delay ne dépasse pas le num random (faire en sorte que le clignement soit finit avant la fin
    // du setInterval sinon les paupières se remettent en position ouverte d'un coup).
    setInterval(eyesBlink, 5000);

    levitate();

    pupilsMovement();

    /* Generating Stars */

});
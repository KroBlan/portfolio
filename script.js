
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
    const pupilsMovement = () => {
        // console.log("-----PUPILSMOVEMENT------")
        // Creating random eye movement via css transition (First Math.random is duration, second is delay)
        let transition = "transform " + Math.random() * 3 + "s " + Math.random() * 3 + "s";
        // console.log(transition);// To remove
        let negativeX = Math.random() < 0.5 ? "-" : "";
        let negativeY = Math.random() < 0.5 ? "-" : "";
        let move = ".move { transform: translate(" + negativeX + Math.random() * 2 + "%," + negativeY + Math.random() * 2 + "%); }"
        // console.log(move);// To remove
        let sheetPupilsMove = document.createElement('style');
        // Inserting newly created move class in a new stylesheet for the transition
        sheetPupilsMove.innerHTML = move;
        document.body.appendChild(sheetPupilsMove);
        // Applying transition to the pupils elements
        let pupils = document.getElementsByClassName('pupils');
        for (const elem of pupils) {
            // elem.addEventListener("mozTransitionEnd", console.log(elem.tagName + ' is DONE!!!'), false);  
            elem.style.transition = transition;
            elem.ontransitionend = () => {// For later: Handle browser compatibility (ex:webkittransitionend)
                pupilsMovement();// <--- It retriger the pupils movement when finished 👍
            };
            elem.classList.add("move");
        }
    }
    
    const eyesBlink = () => {
        // --> Check this out -> https://developer.mozilla.org/fr/docs/Web/API/Element/animate

        // var sheetBlink = document.createElement('style');
        let retrigger0 = (Math.random() * 10);
        let retrigger = retrigger0 > 3 ? retrigger0 : retrigger0 + 3;
        let blinkDuration = Math.random();
            console.warn("!!!! eyesBlink has been called !!!!!")
            delay = (Math.random() * 5).toString();
            // console.log(delay);
            let animBlinkTop = `blink-bottom-eye-lid 0.3s ${delay}s 2 alternate ease-in-out`;
            let animBlinkBottom = `blink-top-eye-lid 0.3s ${delay}s 2 alternate ease-in-out`;
            let t = document.getElementsByClassName('topEyeLid');
            let b = document.getElementsByClassName('bottomEyeLid');
            /* css animation wont retrigger unless the element is detroyed and recreated,
            hence the removeChild and appendChild */
            lidsFunc = (lids) => { // Tentative de mettre le for dans une fonction et y passer t et b pour éviter la répétition.
                for (elem of lids) {
                    console.warn(elem)
                    let parent = elem.parentNode;
                    parent.removeChild(elem);
                    parent.appendChild(elem);
                    elem.style.animation = elem.classList.contains('topEyeLid') ? animBlinkBottom : animBlinkTop;
                }
            }
            lidsFunc(t);
            // for (el of topLids) {
            //     let parent = el.parentNode;
            //     parent.removeChild(el);
            //     parent.appendChild(el);
            //     el.style.animation = animBlinkBottom;
            // }
            lidsFunc(b);
            // for (el of bottomLids) {
            //     let parent = el.parentNode;
            //     parent.removeChild(el);
            //     parent.appendChild(el);
            //     el.style.animation = animBlinkTop;
            // }
        // setInterval(() => {
        //     console.warn(retrigger);
        //     // eyesBlink();
        // }, retrigger);
    }

    // !!! TRIGGERING IS ACCELERATING, FOUND WHY THE FUCK !!!
    // trigBlink = () => {
    //     let retrigger0 = (Math.random() * 20000);
    //     let retrigger = retrigger0 > 3 ? retrigger0 : retrigger0 + 3;
    //     console.warn("retrigger----> "+retrigger);
    //     eyesBlink();
    //     setInterval(trigBlink, 5000);
    // }

    const levitate = () => {
        console.error("levitate called")
        const robotContainer = document.getElementById('machineCOPY');

        console.log(robotContainer);

        const levitationTransition = "transform 5s";
        robotContainer.style.transition = levitationTransition;

        const levitationMove = ".levitationMove { transform: translate(10%, -25%); }";
        let sheetLevitation = document.createElement('style');
        sheetLevitation.innerHTML = levitationMove;
        document.body.appendChild(sheetLevitation);
        
        robotContainer.classList.add('levitationMove');
        
    }

    // Pour randomiser le clignement il faut créer un num random pour le setInterval, et le passer à eyesBlink
    // pour que le delay ne dépasse pas le num random (faire en sorte que le clignement soit finit avant la fin
    // du setInterval sinon les paupières se remettent en position ouverte d'un coup).
    var b = setInterval(eyesBlink, 5000);

    levitate();

    pupilsMovement();
});
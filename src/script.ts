const headerText: String = "Cameron Kullberg";

function updateText(newText: String, docID: String, speed: Number) {
    const text = newText;
    let index = 0;
    const typingElement = document.getElementById(docID.toString());
    
    function typeMessage() {
        if ( typingElement == null ) {
            console.log("typingElement is null");
        } else {

            if ( typingElement.textContent == text ) {
                return;
            }
            // if the current text is a substring of the target text, add characters
            else if (typingElement.textContent && text.startsWith(typingElement.textContent) || typingElement.textContent == "") {

                if (index < text.length) {
                    typingElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeMessage, speed.valueOf() * ((Math.random()+3)/4));
                    typingElement.style.animation = 'none';
                    typingElement.offsetHeight; // trigger reflow
                    typingElement.style.animation = '';
                }

            } 
            // otherwise, delete until we have a substring
            else {

                if (typingElement.textContent && typingElement.textContent.length > 0) {
                    typingElement.textContent = typingElement.textContent.slice(0, -1);
                    index -= (Number)(index > 0);
                    setTimeout(typeMessage, speed.valueOf() * ((Math.random()+3)/4));
                    typingElement.style.animation = 'none';
                    typingElement.offsetHeight; // trigger reflow
                    typingElement.style.animation = '';    

                }
                
            }

        }
    }

    typeMessage();

};

document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll<HTMLDivElement>("#content");
    containers.forEach(container => {
        container.style.display = 'none';
    });
    
    updateText("Cameron Kullberg", 'displayText0', 120);
    updateText("Embedded Systems Engineer at Custom Litt, Junior Computer Engineering major at UMASS Amherst, Amateur Rocketry Enthusiast.", 'displayText1', 50);

    resetGifAnimations();
    initProjectCards();
});

function resetGifAnimations() {
    const gifs = document.querySelectorAll<HTMLImageElement>('img[src$=".gif"], img[src$=".GIF"]');
    gifs.forEach(img => {
        const src = img.getAttribute('src');
        if (!src) return;

        // Strip any existing cache-buster
        const [base, query] = src.split('?');
        const params = new URLSearchParams(query || '');
        params.set('t', Date.now().toString());
        img.src = `${base}?${params.toString()}`;
    });
}

function initProjectCards() {
    const cards = document.querySelectorAll<HTMLElement>('.project-card');
    cards.forEach(card => {
        const toggle = card.querySelector<HTMLButtonElement>('.project-toggle');
        const details = card.querySelector<HTMLElement>('.project-details');
        if (!toggle || !details) return;

        // Ensure ARIA initial
        toggle.setAttribute('aria-expanded', 'false');
        details.setAttribute('role', 'region');

        toggle.addEventListener('click', () => {
            const expanded = card.classList.toggle('expanded');
            toggle.setAttribute('aria-expanded', expanded.toString());
            if (expanded) {
                details.hidden = false;
                // Let CSS transition handle
            } else {
                // Allow transition then hide
                const onEnd = () => {
                    if (!card.classList.contains('expanded')) details.hidden = true;
                    details.removeEventListener('transitionend', onEnd);
                };
                details.addEventListener('transitionend', onEnd);
            }
        });

        // Keyboard toggle with Enter/Space is already handled by button element
    });
}

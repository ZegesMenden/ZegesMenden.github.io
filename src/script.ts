
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
    updateText("Computer Engineering student at UMASS Amherst, amateur rocketry enthusaist, embedded Systems engineer at CustomLitt.", 'displayText1', 50);
    
});

const lift = document.getElementById('lift');
const leftdoor = document.getElementById('leftdoor');
const rightdoor = document.getElementById('rightdoor');
const buttons = document.querySelectorAll('.controls button');

let isElevatorBusy = false;
let destinationQueue = [];
let currentFloor = 1;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('disabled')) {
            button.classList.add('disabled');
            button.style.cursor = 'not-allowed';
            button.style.background = 'red';
            
            destinationQueue.push(parseInt(button.textContent));
            sortQueue();
            processQueue();
        }
    });
});

function sortQueue() {
    destinationQueue.sort((a, b) => a - b);
    if (currentFloor > Math.min(...destinationQueue)) {
        destinationQueue = destinationQueue.reverse();
    }
}

function processQueue() {
    if (!isElevatorBusy && destinationQueue.length > 0) {
        isElevatorBusy = true;
        let nextDestination = destinationQueue.shift();
        
        lift.style.transform = `translateY(${(1 - nextDestination) * 125}px)`;
        currentFloor = nextDestination;

        setTimeout(() => {
            openDoors();
            
            setTimeout(() => {
                closeDoors();
                
                setTimeout(() => {
                    buttons.forEach(button => {
                        if (parseInt(button.textContent) === nextDestination) {
                            button.style.cursor = 'pointer';
                            button.style.background = '#7ea9c6';
                            button.classList.remove('disabled');
                        }
                    });
                    isElevatorBusy = false;
                    processQueue();
                }, 1700);
            }, 3000);
        }, 5000);
    }
}

function openDoors() {
    leftdoor.style.left = '-50%';
    rightdoor.style.right = '-50%';
}

function closeDoors() {
    leftdoor.style.left = '0%';
    rightdoor.style.right = '0%';
}

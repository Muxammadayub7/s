document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector('#countdown'); // Bitta umumiy ID
    
    const initialTime = 1 * 60 + 59; 
    let time = initialTime;

    function updateUI() {
        let m = Math.floor(time / 60);
        let s = time % 60;

        let minutes = m < 10 ? '0' + m : m;
        let seconds = s < 10 ? '0' + s : s;

        if (display) {
            display.textContent = `${minutes}:${seconds}`;
        }
    }

    updateUI();

    setInterval(() => {
        if (time <= 0) {
            time = initialTime; 
        } else {
            time--;
        }
        updateUI();
    }, 1000);
});
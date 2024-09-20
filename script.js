let timerCustom;
let isRunningCustom = false;
let timeCustom = 0;
let lapsCustom = [];
let lastLapTime = 0;

function startStopCustom() {
    if (isRunningCustom) {
        clearInterval(timerCustom);
        document.getElementById("startBtn-custom").textContent = "START";
    } else {
        timerCustom = setInterval(updateDisplayCustom, 10);
        document.getElementById("startBtn-custom").textContent = "STOP";
    }
    isRunningCustom = !isRunningCustom;
}

function updateDisplayCustom() {
    timeCustom += 10;
    const formattedTime = formatTimeCustom(timeCustom);
    document.getElementById("display-custom").textContent = formattedTime;
}

function resetCustom() {
    clearInterval(timerCustom);
    document.getElementById("display-custom").textContent = "00:00:00";
    document.getElementById("startBtn-custom").textContent = "START";
    isRunningCustom = false;
    timeCustom = 0;
    lapsCustom = [];
    lastLapTime = 0;
    displayLapsCustom();
}

function pauseCustom() {
    clearInterval(timerCustom);
    isRunningCustom = false;
    document.getElementById("startBtn-custom").textContent = "START";
}

function lapCustom() {
    let lapTime = timeCustom - lastLapTime;
    lapsCustom.push({ total: timeCustom, difference: lapTime });
    lastLapTime = timeCustom;
    displayLapsCustom();
}

function displayLapsCustom() {
    const lapsList = document.getElementById("laps-custom");
    lapsList.innerHTML = "";  // Clear previous laps

    lapsCustom.forEach((lap, index) => {
        const li = document.createElement("li");
        li.innerHTML = `Lap ${index + 1}: ${formatTimeCustom(lap.total)} 
                        <small>(+${formatTimeCustom(lap.difference)})</small>`;

        lapsList.appendChild(li);

        // Apply animation to each lap item
        setTimeout(() => {
            li.classList.add("show");
        }, index * 100);  // Stagger animations for each lap
    });
}

function formatTimeCustom(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const millisecondsPart = String(Math.floor(milliseconds % 1000 / 10)).padStart(2, '0');
    return $(minutes);$(seconds);$(millisecondsPart);
}
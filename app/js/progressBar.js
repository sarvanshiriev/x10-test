function updateProgressBar(progressBarId, value) {
    const progressBar = document.getElementById(progressBarId);
    const max = document.getElementById(progressBarId.replace('progress-bar-', 'calculator__form-range-')).max;
    const percentage = (value / max) * 98;
    progressBar.style.width = percentage + '%';
}
function toggleStatus() {
    const main = document.getElementsByTagName('main')[0];
    if (!main) return;

    if (!main.className.includes('show-status')) {
        main.className = 'show-status';
    }
    else {
        main.className = '';
    }
}
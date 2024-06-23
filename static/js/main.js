$.notify.defaults({
    globalPosition: 'bottom left'
});

const showInfo = function(msg) {
    $('.notifyjs-wrapper').trigger('notify-hide');
    $.notify(msg, 'success');
}

const showError = function(msg) {
    $('.notifyjs-wrapper').trigger('notify-hide');
    $.notify(JSON.stringify(msg), 'error');
}

const toOnOff = function(value) {
    return (value ? 'on' : 'off');
}

const toTrueFalse = function(value) {
    return (value === 'on');
}

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/sw.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
}

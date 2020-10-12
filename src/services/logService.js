//Service for Logging errors

function init() {
    //initialize the logger service such as sentri or any other service here
}

function log(error) {
    console.error(error);
}

export default {
    init,
    log
}
require('should');

if (!process.env.TRAVIS) {
    if (typeof __cov === 'undefined') {
        process.on('exit', require('semicov').report);
    }
    require('semicov').init('lib', 'Kontroller');
}

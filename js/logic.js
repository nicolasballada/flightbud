function airNav(icao, phase, embed) {
    let err = document.getElementById('airerr');
    if (icao.value != '') {
        let url = 'https://www.airnav.com/airport/' + icao.value
        if (embed) {
            let embedWindow;
            let embedLabel;
            if (phase == 'd') {
                embedWindow = document.getElementById("departureAirnav");
                embedLabel = document.getElementById("departureAirnavLabel");
                embedLabel.innerHTML = 'Departure: ' + String(icao.value).toUpperCase();
            } else {
                embedWindow = document.getElementById("arrivalAirnav");
                embedLabel = document.getElementById("arrivalAirnavLabel");
                embedLabel.innerHTML = 'Arrival: ' + String(icao.value).toUpperCase();
            }
            embedWindow.style.display = "inline-block";
            embedWindow.src = url;
        } else {
            window.open(url, '_blank');
        }
        err.innerHTML = '';
    } else {
        if (phase == 'd') {
            err.innerHTML = 'No AirNav Departure';
        } else if (phase == 'a') {
            err.innerHTML = 'No AirNav Arrival';
        } else {
            err.innerHTML = 'No AirNav Departure/Arrival';
        }
    }
}

function metar(icao, phase) {
    let err = document.getElementById('meterr');
    if (icao.value != '') {
        let url = 'https://www.aviationweather.gov/adds/metars/index?submit=1&station_ids=' + icao.value + '&chk_metars=on&hoursStr=8&std_trans=translated'
        window.open(url, '_blank');
        err.innerHTML = '';
    } else {
        if (phase == 'd') {
            err.innerHTML = 'No Metar Departure';
        } else if (phase == 'a') {
            err.innerHTML = 'No Metar Arrival';
        } else {
            err.innerHTML = 'No Metar Departure/Arrival';
        }
    }
}

function Clear(phase, type) {
    let meterr = document.getElementById('meterr');
    let airerr = document.getElementById('airerr');
    let textField;
    let embedWindow;
    let embedLabel;
    switch (type) {
        case 'metar':
            if (phase == 'd') {
                textField = document.getElementById('locatorMetarD');
                textField.value = '';
                meterr.innerHTML = '';
            } else {
                textField = document.getElementById('locatorMetarA');
                textField.value = '';
                meterr.innerHTML = '';
            }
            break;
        case 'airnav':
            if (phase == 'd') {
                textField = document.getElementById('locatorAirnavD');
                textField.value = '';
                embedWindow = document.getElementById("departureAirnav");
                embedWindow.style.display = 'none';
                embedLabel = document.getElementById("departureAirnavLabel");
                embedLabel.innerHTML = '';
                airerr.innerHTML = '';
            } else if (phase == 'a') {
                textField = document.getElementById('locatorAirnavA');
                textField.value = '';
                embedWindow = document.getElementById("arrivalAirnav");
                embedWindow.style.display = 'none';
                embedLabel = document.getElementById("arrivalAirnavLabel");
                embedLabel.innerHTML = '';
                airerr.innerHTML = '';
            } else if (phase == 'dembed') {
                embedWindow = document.getElementById("departureAirnav");
                embedWindow.style.display = 'none';
                embedLabel = document.getElementById("departureAirnavLabel");
                embedLabel.innerHTML = '';
            } else {
                embedWindow = document.getElementById("arrivalAirnav");
                embedWindow.style.display = 'none';
                embedLabel = document.getElementById("arrivalAirnavLabel");
                embedLabel.innerHTML = '';
            }
            break;
        case 'all':
            if (phase == 'm') {
                textField = document.getElementById('locatorMetarA');
                textField.value = '';
                textField = document.getElementById('locatorMetarD');
                textField.value = '';
                meterr.innerHTML = '';
            } else if (phase == 'an') {
                textField = document.getElementById('locatorAirnavA');
                textField.value = '';
                textField = document.getElementById('locatorAirnavD');
                textField.value = '';
                embedWindow = document.getElementById("departureAirnav");
                embedWindow.style.display = 'none';
                embedLabel = document.getElementById("departureAirnavLabel");
                embedLabel.innerHTML = '';
                embedWindow = document.getElementById("arrivalAirnav");
                embedWindow.style.display = 'none';
                embedLabel = document.getElementById("arrivalAirnavLabel");
                embedLabel.innerHTML = '';
                airerr.innerHTML = '';
            } else {
                textField = document.getElementById('locatorMetarA');
                textField.value = '';
                textField = document.getElementById('locatorMetarD');
                textField.value = '';
                meterr.innerHTML = '';
                textField = document.getElementById('locatorAirnavA');
                textField.value = '';
                textField = document.getElementById('locatorAirnavD');
                textField.value = '';
                embedWindow = document.getElementById("departureAirnav");
                embedWindow.style.display = 'none';
                embedWindow = document.getElementById("arrivalAirnav");
                embedWindow.style.display = 'none';
                embedLabel = document.getElementById("departureAirnavLabel");
                embedLabel.innerHTML = '';
                embedLabel = document.getElementById("arrivalAirnavLabel");
                embedLabel.innerHTML = '';
                airerr.innerHTML = '';
            }
            break;
    }
}

function actuallySyncFields(icao, field, phase) {
    let metarDepartureField = document.getElementById('locatorMetarD');
    let airNavDepartureField = document.getElementById('locatorAirnavD');
    let metarArrivalField = document.getElementById('locatorMetarA');
    let airNavArrivalField = document.getElementById('locatorAirnavA');

    if (phase == 'd') {
        if (field == 'metar') {
            airNavDepartureField.value = icao;
        } else if (field == 'airNav') {
            metarDepartureField.value = icao;
        } else {
            console.log('how did we get here?? departure');
        }
    } else if (phase == 'a') {
        if (field == 'metar') {
            airNavArrivalField.value = icao;
        } else if (field == 'airNav') {
            metarArrivalField.value = icao;
        } else {
            console.log('how did we get here?? arrival');
        }
    } else {
        console.log(phase);
    }
}

function syncFields() {
    let metarDepartureField = document.getElementById('locatorMetarD');
    let airNavDepartureField = document.getElementById('locatorAirnavD');
    let metarArrivalField = document.getElementById('locatorMetarA');
    let airNavArrivalField = document.getElementById('locatorAirnavA');
    let departureIcao = 'departureUnsynced';
    let arrivalIcao = 'arrivalUnsynced';
    let phase = '';

    if (metarDepartureField.value == '' && airNavDepartureField.value != '') {
        departureIcao = airNavDepartureField.value;
        field = 'airNav';
        phase = 'd';
        actuallySyncFields(departureIcao, field, phase);
    } else if (metarDepartureField.value != '' && airNavDepartureField.value == '') {
        departureIcao = metarDepartureField.value;
        field = 'metar';
        phase = 'd';
        actuallySyncFields(departureIcao, field, phase);
    } else if (metarDepartureField.value == '' && airNavDepartureField.value == '') {
        console.log('Empty Departure Fields');
    } else if (metarDepartureField.value != '' && airNavDepartureField.value != '') {
        console.log('Dual Departure Inputs');
    } else {
        console.log('How did I get here with departures?');
    }

    if (metarArrivalField.value == '' && airNavArrivalField.value != '') {
        arrivalIcao = airNavArrivalField.value;
        field = 'airNav';
        phase = 'a';
        actuallySyncFields(arrivalIcao, field, phase);
    } else if (metarArrivalField.value != '' && airNavArrivalField.value == '') {
        arrivalIcao = metarArrivalField.value;
        field = 'metar';
        phase = 'a';
        actuallySyncFields(arrivalIcao, field, phase);
    } else if (metarArrivalField.value == '' && airNavArrivalField.value == '') {
        console.log('Empty Arrival Fields');
    } else if (metarArrivalField.value != '' && airNavArrivalField.value != '') {
        console.log('Dual Arrival Inputs');
    } else {
        console.log('How did I get here with arrivals?');
    }

    console.log(departureIcao, arrivalIcao);
}

function NewTab(phase, type, embed) {
    let icao = 'SPJC'
    embed = embed || false;

    switch (type) {
        case 'metar':
            if (phase == 'd') {
                icao = document.getElementById('locatorMetarD');
            } else {
                icao = document.getElementById('locatorMetarA');
            }
            metar(icao, phase);
            break;
        case 'airnav':
            if (phase == 'd') {
                icao = document.getElementById('locatorAirnavD');
            } else {
                icao = document.getElementById('locatorAirnavA');
            }
            airNav(icao, phase, embed);
            break;
        case 'all':
            if (phase == 'm') {
                icao = document.getElementById('locatorMetarA');
                metar(icao, phase);
                icao = document.getElementById('locatorMetarD');
                metar(icao, phase);
            } else if (phase == 'an') {
                icao = document.getElementById('locatorAirnavA');
                airNav(icao, phase);
                icao = document.getElementById('locatorAirnavD');
                airNav(icao, phase);
            } else {
                icao = document.getElementById('locatorAirnavA');
                airNav(icao, phase);
                icao = document.getElementById('locatorMetarA');
                metar(icao, phase);
                icao = document.getElementById('locatorAirnavD');
                airNav(icao, phase);
                icao = document.getElementById('locatorMetarD');
                metar(icao, phase);
            }
    }
}
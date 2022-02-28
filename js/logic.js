let vatMap = () => {
  let url = `https://map.vatsim.net`;
  window.open(url, '_blank');
}

let airNav = (_icao) => {
  let icao = _icao || 'ABCD';
  let err = document.getElementById('airerr');
  if (icao !== '' || icao !== undefined || icao !== 'ABCD') {
    let url = `https://www.airnav.com/airport/${icao}`;
    window.open(url, '_blank');
    err.innerHTML = '';
  } else {
    err.innerHTML = `No AirNav ${icao}`;
    console.log(`No AirNav ${icao}`);
  }
}

let metar = (_icao) => {
  let icao = _icao || 'ABCD';
  let err = document.getElementById('meterr');
  console.log(icao);
  if (icao !== '' || icao !== undefined || icao !== 'ABCD') {
    let url = `https://www.aviationweather.gov/adds/metars/index?submit=1&station_ids=${icao}&chk_metars=on&hoursStr=8&std_trans=translated`;
    window.open(url, '_blank');
    err.innerHTML = '';
  } else {
    err.innerHTML = `No Metar ${icao}`;
    console.log(`No Metar ${icao}`);
  }
}

let skyVector = (_icao) => {
  let icao = _icao || 'ABCD';
  let err = document.getElementById('skyerr');
  console.log(icao);
  if (icao !== '' || icao !== undefined || icao !== 'ABCD') {
    let url = `https://skyvector.com/airport/${icao}`;
    window.open(url, '_blank');
    err.innerHTML = '';
  } else {
    err.innerHTML = `No Metar ${icao}`;
    console.log(`No SkyVector ${icao}`);
  }
}

let clearAll = () => {
  let meterr = document.getElementById('meterr');
  let airerr = document.getElementById('airerr');
  let skyerr = document.getElementById('skyerr');
  let metText = document.getElementById('metText');
  let airText = document.getElementById('airText');
  let skyText = document.getElementById('skyText');

  airerr.innerHTML = '';
  skyerr.innerHTML = '';
  metText.innerHTML = '';
  airText.innerHTML = '';
  skyText.innerHTML = '';
}

let expandList = (_icaoText) => {
  let icaoText = _icaoText || 'ABCDList';
  let icaoList = [];

  if (icaoText !== 'ABCDList') {
    icaoList = icaoText.split(' ');
    return icaoList
  }
}

let openService = (_service) => {
  let meterr = document.getElementById('meterr');
  let airerr = document.getElementById('airerr');
  let skyerr = document.getElementById('skyerr');
  let metarList = document.getElementById('metText').value || undefined;
  let airNavList = document.getElementById('airText').value || undefined;
  let skyVectorList = document.getElementById('skyText').value || undefined;
  let icaoList = [];
  let service = _service || 'error';

  switch (service) {
    case 'metar':
      if (metarList) {
        icaoList = expandList(metarList);
        icaoList.forEach(icao => {
          metar(icao);
        });
      } else {
        meterr.innerHTML = `metar empty | ${metarList} | ${service}`;
      }
      break;
    case 'airnav':
      if (airNavList) {
        icaoList = expandList(airNavList);
        icaoList.forEach(icao => {
          airNav(icao);
        });
      } else {
        airerr.innerHTML = `airNav empty | ${airNavList} | ${service}`;
      }
      break;
    case 'skyvector':
      if (skyVectorList) {
        icaoList = expandList(skyVectorList);
        icaoList.forEach(icao => {
          skyVector(icao);
        });
      } else {
        skyerr.innerHTML = `skyVector empty | ${skyVectorList} | ${service}`;
      }
      break;
    case 'all':
      if (metarList) {
        icaoList = expandList(metarList);
        icaoList.forEach(icao => {
          metar(icao);
        });
      } else {
        meterr.innerHTML = `metar empty | ${metarList} | ${service}`;
      }
      if (airNavList) {
        icaoList = expandList(airNavList);
        icaoList.forEach(icao => {
          airNav(icao);
        });
      } else {
        airerr.innerHTML = `airNav empty | ${airNavList} | ${service}`;
      }
      if (skyVectorList) {
        icaoList = expandList(skyVectorList);
        icaoList.forEach(icao => {
          skyVector(icao);
        });
      } else {
        skyerr.innerHTML = `skyVector empty | ${skyVectorList} | ${service}`;
      }
      break;
    default:
      console.log(`open default ${service} | ${icao}`);
  }
}
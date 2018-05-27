const URL = 'http://ras.pi/devices';

export function getAll() {
  return fetch(URL, {
    mode: 'cors',
  });
};

export function create(name)  {
  const device = {active: false, name};
  return fetch(URL, {
    method: 'POST',
    body: JSON.stringify(device),
    headers: {
      'content-type': 'application/json',
    },
    mode: 'cors',
  });
};

export function update(id, state) {
  return fetch(`${ URL }/${ id }/state?state=${ state }`, {
    method: 'PUT',
    mode: 'cors',
  });
};

export function remove(id) {
  return fetch(`${ URL }/${ id }`, {
    method: 'DELETE',
    mode: 'cors',
  });
};

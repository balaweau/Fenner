import { hasData } from '../Utils/text';
import PropTypes from 'prop-types';

// const COMPANY = 'http://development-877370342.us-west-2.elb.amazonaws.com';
const COMPANY = 'http://localhost:3004/company';

const GET = 'get';
const DELETE = 'delete';
const POST = 'post';
const PUT = 'put';

const MOSTTYPES = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8';

export const postData = (uri, body) => {
  if (!hasData(body)) throw new TypeError('The postI9 method requires a valid body parameter.');

  return GenericService({uri: uri, method: POST, contentType: MOSTTYPES, body: body});
}

export const getData = (uri, id) => {
  console.log(uri, id);
  const query = hasData(id) ? `\\${id}` : '';

  return GenericService({uri: uri+query, method: GET, contentType: MOSTTYPES });
}

export const putData = (uri, body, id) => {
  if (!hasData(body)) throw new TypeError('The putI9 method requires a valid body parameter.');
  if (!hasData(id)) throw new TypeError('The deleteI9 method requires a valid id parameter.');

  return GenericService({uri: uri, method: PUT, contentType: MOSTTYPES, body: body});
}

export const deleteData = (uri, id) => {
  if (!hasData(id)) throw new TypeError('The deleteI9 method requires a valid id parameter.');

  const query = `\\${id}`;
  return GenericService({uri: uri+query, method: DELETE, contentType: MOSTTYPES});
}

async function GenericService(props) {
  let param = {
    method: props.method,
    headers: {}
  };

  if (hasData(props.body)) {
    param.body = JSON.stringify(props.body);
    param.headers = {
      'Content-Type': 'text/plain',
      'Accepts': MOSTTYPES
    };
  }

  if (hasData(props.mode)) {
    param.headers.mode = props.mode;
  }

  return (
    fetch(props.uri, param)
    .then(response => {
      if(response === undefined) {
        return [];
      }
      if(response.ok) {
        const result = response.json() || [];
        return result;
      }
      else {
        console.log('response', response);
        const newErr = new Error(response.status);
        throw newErr;
      }
    }).catch(error => {
      console.log(error);
    })
  )
};

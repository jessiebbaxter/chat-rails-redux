const ROOT_URL = '/api/v1/channels';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';
export const MESSAGE_POSTED = 'MESSAGE_POSTED';
export const CHANNEL_SELECTED = 'CHANNEL_SELECTED';

export function fetchMessages(channel) {
  const url = `${ROOT_URL}/${channel}/messages`;
  const promise = fetch(url).then(r => r.json());

  return {
    type: FETCH_MESSAGES,
    payload: promise // Will be resolved by redux-promise
  };
}

export function createMessage(channel, content) {
  const url = `${ROOT_URL}/${channel}/messages`;
  const body = { content }; // ES6 destructuring
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;
  const promise = fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin',
    body: JSON.stringify(body)
  }).then(r => r.json());

  return {
    type: MESSAGE_POSTED,
    payload: promise // Will be resolved by redux-promise
  };
}

export function selectChannel() {
  return {
    type: CHANNEL_SELECTED,
  };
}

export function appendMessage(message) {
  return {
    type: MESSAGE_POSTED,
    payload: message
  }
}
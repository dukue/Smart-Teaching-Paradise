import WebSocket_URL  from './aiPath';

// 创建 WebSocket 连接
const ws = new WebSocket(WebSocket_URL());


// ws.onopen = () => {
//     // connection opened
//     console.log('WebSocket connection opened');
//   };
  
//   ws.onmessage = e => {
//     // a message was received
//     console.log(e.data);
//   };
  
//   ws.onerror = e => {
//     // an error occurred
//     console.log(e.message);
//   };
  
//   ws.onclose = e => {
//     // connection closed
//     console.log(e.code, e.reason);
//   };
export default ws;
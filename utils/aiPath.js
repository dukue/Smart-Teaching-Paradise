import { sha256} from "js-sha256";
import { Buffer } from 'buffer';

export const APPID = '8f3794a1';
const APISecret = 'YTNlZjBlNGExOWEwZDgzYWY2YjIzNGI3';
const APIKey = '4a685779ae669f55c99a47744ff5c7f8';

function getWebsocketUrl(){
  const curTime = new Date();
  const date = curTime.toGMTString();
  
  let tmp = `host: spark-api.xf-yun.com\n`;
  tmp += `date: ${date}\n`;
  tmp += `GET /v3.5/chat HTTP/1.1`;
  
  const tmpSha = sha256.hmac.create(APISecret)
    .update(tmp)
    .digest();
  
  const signature = Buffer.from(tmpSha).toString('base64');
    
  const authorizationOrigin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
  
  const authorization = Buffer.from(authorizationOrigin).toString('base64');
  
  const params = new URLSearchParams({
    authorization: authorization,
    date: date,
    host: 'spark-api.xf-yun.com',
  });
  const url = `ws://spark-api.xf-yun.com/v3.5/chat?${params.toString()}`;
  return url;
}

export default getWebsocketUrl;
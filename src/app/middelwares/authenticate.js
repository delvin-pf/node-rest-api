import { expressjwt as jwt} from 'express-jwt';
import 'dotenv/config';

const secret = JSON.parse(process.env.SECRET);

export default jwt({
  secret: secret.key,
  algorithms: [ 'HS256' ]
})
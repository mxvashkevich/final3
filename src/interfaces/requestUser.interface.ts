import { Request } from 'express';
import { User } from 'src/modules/user/user.model';

interface RequestUser extends Request {
  user: User;
}

export default RequestUser;

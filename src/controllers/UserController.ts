import { getConnection } from "typeorm";
import { User } from "../entity/User";

export class UserController {
  async insertUser(req, res) {
    console.log(req.body, typeof req.body);

    const userRepository = getConnection("default").getRepository(User);

    const { username, email, password, age } = req.body;
    const user = new User();

    user.name = username;
    user.email = email;
    user.password = password;
    user.age = age;

    const isNewUser = (await userRepository.findOne({ email: email }))
      ? false
      : true;

    if (!isNewUser) {
      return res.send({ status: 404 });
    }

    await userRepository.save(user);
    return res.send(user);
  }
}

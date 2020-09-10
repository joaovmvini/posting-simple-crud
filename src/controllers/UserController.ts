import { getConnection } from "typeorm";
import { User } from "../entity/User";

export class UserController {
  async insertUser(req, res) {
    const userRepository = getConnection("default").getRepository(User);

    const { username, email, password, age } = req.body;
    const user = new User();

    user.name = username;
    user.email = email;
    user.password = password;
    user.age = age;

    const newUser = await userRepository.findOne({ email: email });

    if (newUser) {
      return res.send({ status: 404 });
    }

    const userFromDb = await userRepository.save(user);
    return res.send(userFromDb);
  }

  async login(req, res) {
    const userRepository = getConnection("default").getRepository(User);
    const { email, password } = req.body;
    const userFromDb = await userRepository.find({
      relations: ["posts"],
      where: { email: email, password: password },
    });
    const error = { status: 404 };

    return !userFromDb.length
      ? res.status(404).send(error)
      : res.send(userFromDb[0]);
  }
}

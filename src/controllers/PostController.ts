import { getConnection } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export class PostController {
  async insertPost(req, res) {
    const userRepository = getConnection("default").getRepository(User);
    const postRepository = getConnection("default").getRepository(Post);
    const { title, content, user } = req.body;
    console.log("user:", user);
    const currentUser = await userRepository.findOne({ id: user.id });
    const post = new Post();

    post.title = title;
    post.content = content;
    post.user = currentUser;

    const updatedPost = await postRepository.save(post);

    return res.send(updatedPost);
  }
}

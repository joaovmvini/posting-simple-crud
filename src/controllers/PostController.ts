import { getConnection } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export class PostController {
  async insertPost(req, res) {
    const userRepository = getConnection("default").getRepository(User);
    const postRepository = getConnection("default").getRepository(Post);
    const { title, content, user } = req.body;
    const currentUser = await userRepository.findOne({ id: user.id });
    const post = new Post();

    post.title = title;
    post.content = content;
    post.user = currentUser;

    const updatedPost = await postRepository.save(post);

    return res.send(updatedPost);
  }

  async updatePost(req, res) {
    const userRepository = getConnection("default").getRepository(User);
    const postRepository = getConnection("default").getRepository(Post);

    const { id } = req.params;
    const { title, content, user } = req.body;

    if (title.length && content.length) {
      const currentPost = await postRepository.findOne(id);
      const currentUser = await userRepository.findOne(user.id);

      currentPost.title = title;
      currentPost.content = content;
      currentPost.user = currentUser;

      await postRepository.save(currentPost);

      return res.send(currentPost);
    }
    return res.status(406).send({ error: "please fill all fields correctly" });
  }

  async deletePost(req, res) {
    const postRepository = getConnection("default").getRepository(Post);

    const { id } = req.params;

    const currentPost = await postRepository.findOne(id);

    await postRepository.remove(currentPost);

    return res.send(currentPost);
  }
}

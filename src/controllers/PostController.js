const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  async findAll(req, res) {
    const user_id = req.user.id;
    const user = await User.findByPk(user_id, {
      include: { association: "posts" }
    });

    return res.json(user.posts);
  },

  async findById(req, res) {
    const post_id = req.params.id;

    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(404).send();
    }

    return res.json(post);
  },

  async store(req, res) {
    const user_id = req.user.id;
    const { title, content = false } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const post = await Post.create({ title, content, user, user_id });
    return res.json(post);
  },

  async update(req, res) {
    const post_id = req.params.id;
    const { title, content } = req.body;

    if (!Post.findByPk(post_id)) {
      return res.status(404).send();
    }

    await User.update({ title, content }, { where: { id: post_id } });

    return res.status(204).send();
  },

  async delete(req, res) {
    const post_id = req.params.id;
    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(404).send();
    }

    Post.destroy({ where: { id: post_id } });

    return res.status(204).send();
  }
};

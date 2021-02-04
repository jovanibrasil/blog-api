const Post = require("../models/Post");
const Tag = require("../models/Tag");

module.exports = {
  async index(req, res) {
    const { post_id } = req.params;

    const post = await Post.findByPk(post_id, {
      include: {
        association: "tags",
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    });

    return res.json(post.tags);
  },

  async store(req, res) {
    const { post_id } = req.params;
    const { name } = req.body;

    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(400).json({ error: "post not found" });
    }

    const [tag] = await Tag.findOrCreate({ where: { name } });
    console.log(tag);
    await post.addTag(tag);

    return res.json(tag);
  },

  async delete(req, res) {
    const { post_id, tag_id } = req.params;

    const post = await Post.findByPk(post_id);

    if (!post) {
      return res.status(400).json({ error: "post not found" });
    }

    const tag = await Tag.findByPk(tag_id);

    await post.removeTag(tag);

    return res.status(204).json();
  }
};

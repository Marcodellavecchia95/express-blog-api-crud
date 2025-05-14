const { posts } = require("../data/posts");

const index = (req, res) => {
  res.json({
    description: "Ecco la lista degli elementi",
    data: posts,
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((currentPost) => currentPost.id === id);
  res.json({
    description: `${post.title}`,
    data: post,
  });
};

const store = (req, res) => {
  res.json({
    description: "Creazione di un nuovo elemento",
  });
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    description: `Modifica dell'elemento ${id}`,
  });
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  res.json({
    description: `Modifica parziale dell'elemento ${id}`,
  });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404).json({
      error: "404, non trovato",
      message: "Post non trovato",
    });
    return;
  }

  const postIndex = posts.indexOf(post);
  posts.splice(postIndex, 1);

  res.sendStatus(204);
  console.log(posts);
};

module.exports = { index, show, store, update, modify, destroy };

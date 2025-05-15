const { posts } = require("../data/posts");

const index = (req, res) => {
  let filterTag = req.query.tags;
  let filteredPosts = [...posts];
  let message = "Post trovati";
  if (filterTag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.includes(filterTag)
    );
    if (filteredPosts.length === 0) {
      message = `Non sono stati trovati post con la parola ${filterTag}`;
    } else {
      message = `Post che includono la parola ${filterTag}`;
    }
  }

  res.json({
    message,
    data: filteredPosts,
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((currentPost) => currentPost.id === id);

  if (!post) {
    res.status(404).json({
      error: "404, not found",
      message: "Post non trovato",
    });
    return;
  }

  res.json({
    description: `${post.title}`,
    data: post,
  });
};

const store = (req, res) => {
  let { title, content, image, tags } = req.body;
  let newPost = {
    title,
    content,
    image,
    tags,
  };

  posts.push(newPost);

  res.json({
    message: "Hai aggiunto un nuovo post",
    data: newPost,
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
      error: "404, not found",
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

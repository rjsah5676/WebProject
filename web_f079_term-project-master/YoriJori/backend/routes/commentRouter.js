const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
const User = require("../schemas/user");
const Board = require("../schemas/board");

router.post("/write", async (req, res) => {
   try {
    let obj;

    const wname = await User.findOne({_id:req.body.writer}, null, {
    });
    obj = {
      board: req.body.board,
      writer: req.body.writer,
      writerName: wname.name,
      content: req.body.content
    };

    const comment = new Comment(obj);
    await comment.save();
    res.json({ message: "댓글 등록 완료" });
  } catch (err) {
    res.json({ message: false });
  }

  });

  router.post("/getCommentList", async (req, res) => {
    try {
      const _id = req.body._id;
      const comment = await Comment.find({board: _id}, null, {
        sort: { createdAt: 1 }
      });
      res.json({ list: comment });
    } catch (err) {
      res.json({ message: false });
    }
});

router.post("/delete", async (req, res) => {
    try {
      await Comment.remove({
        _id: req.body._id
      });
      res.json({ message: true });
    } catch (err) {
      res.json({ message: false });
    }
  });

module.exports = router;
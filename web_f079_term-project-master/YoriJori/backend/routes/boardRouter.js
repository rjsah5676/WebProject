const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
const User = require("../schemas/user");
const Rating = require("../schemas/rating");
const Comment = require("../schemas/comment");

router.post("/delete", async (req, res) => {
  try {
    await Board.remove({
      _id: req.body._id
    });
    await Rating.remove({
      board: req.body._id
    });
    await Comment.remove({
      board: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    await Board.update(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      }
    );
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  try {
    let obj;
    const wname = await User.findOne({_id:req.body._id}, null, {
    });
    obj = {
      writer: req.body._id,
      writerName: wname.name,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
    };

    const board = new Board(obj);
    await board.save();
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/getWriter", async (req, res) => {
  const wname = await Board.findOne({_id:req.body._id}, null, {
  });
  res.json({ message: wname.writer});
});

router.post("/getBoardList", async (req, res) => {
  const per = 10;  //페이지당 몇 게시글
  const page = req.body.page;

  try {
    const _id = req.body._id;
    const search = req.body.search;
    const category = req.body.category;
    if((search === "" || search === undefined) && category === "전체") {
      if(req.body.method === "default") {
        const board = await Board.find({}, null, {
          sort: { createdAt: -1 }
        });
        const total = Math.ceil(board.length/per);
        const pageNumbers = [];
        for(let i = 1; i <= total; i++)
          pageNumbers.push(i);
        const result = board.slice((page-1)*per,per*page);
        res.json({ list: result, msg:"", target:pageNumbers })
      } 
      else if(req.body.method === "rating") {
        const board = await Board.find({}, null, {
          sort: { rating: -1 }
        });
        const total = Math.ceil(board.length/per);
        const pageNumbers = [];
        for(let i = 1; i <= total; i++)
          pageNumbers.push(i);
        const result = board.slice((page-1)*per,per*page);
        res.json({ list: result, msg:"", target:pageNumbers })  
      }
    }
    else if((search === "" || search === undefined) && category !== "전체") {
      if(req.body.method === "default") {
        const board = await Board.find({category:category}, null, {
          sort: { createdAt: -1 }
        });
        const total = Math.ceil(board.length/per);
        const pageNumbers = [];
        for(let i = 1; i <= total; i++)
          pageNumbers.push(i);
        const result = board.slice((page-1)*per,per*page);
        res.json({ list: result, msg:"", target:pageNumbers })
      } 
      else if(req.body.method === "rating") {
        const board = await Board.find({category:category}, null, {
          sort: { rating: -1 }
        });
        const total = Math.ceil(board.length/per);
        const pageNumbers = [];
        for(let i = 1; i <= total; i++)
          pageNumbers.push(i);
        const result = board.slice((page-1)*per,per*page);
        res.json({ list: result, msg:"", target:pageNumbers })  
      }
    }
    else {
      if(category === "전체") {
        if(req.body.method === "default") {
          const board = await Board.find({ title: {'$regex': search}}, null, {
            sort: { createdAt: -1 }
          });
          const total = Math.ceil(board.length/per);
          const pageNumbers = [];
          for(let i = 1; i <= total; i++)
            pageNumbers.push(i);
          const result = board.slice((page-1)*per,per*page);
          res.json({ list: result, msg: "검색어: '" + search + "' 에 대한 결과", target:pageNumbers})
        } 
        else if(req.body.method === "rating") {
          const board = await Board.find({ title: {'$regex': search}}, null, {
            sort: { rating: -1 }
          });
          const total = Math.ceil(board.length/per);
          const pageNumbers = [];
          for(let i = 1; i <= total; i++)
            pageNumbers.push(i);
          const result = board.slice((page-1)*per,per*page);
          res.json({ list: result, msg: "검색어: '" + search + "' 에 대한 결과", target:pageNumbers}) 
        }
      }
      else{
        if(req.body.method === "default") {
          const board = await Board.find({ category: category, title: {'$regex': search}}, null, {
            sort: { createdAt: -1 }
          });
          const total = Math.ceil(board.length/per);
          const pageNumbers = [];
          for(let i = 1; i <= total; i++)
            pageNumbers.push(i);
          const result = board.slice((page-1)*per,per*page);
          res.json({ list: result, msg: "검색어: '" + search + "' 에 대한 결과", target:pageNumbers})
        } 
        else if(req.body.method === "rating") {
          const board = await Board.find({ category: category, title: {'$regex': search}}, null, {
            sort: { rating: -1 }
          });
          const total = Math.ceil(board.length/per);
          const pageNumbers = [];
          for(let i = 1; i <= total; i++)
            pageNumbers.push(i);
          const result = board.slice((page-1)*per,per*page);
          res.json({ list: result, msg: "검색어: '" + search + "' 에 대한 결과", target:pageNumbers}) 
        }
      }
    }
  }   
  catch (err) {
    res.json({ message: false });
  }
});

router.post("/getMainBoard", async (req, res) => {
  try {
    const board = await Board.find({}, null, {
      sort: { createdAt: -1 }
    });
    const result = board.slice(0,10);
    res.json({ list: result})
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/getHotBoard", async (req, res) => {
  try {
    const board = await Board.find({}, null, {
      sort: { rating_people: -1 }
    });
    const result = board.slice(0,3);
    res.json({ list: result})
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/myBoard", async (req, res) => {
  const per = 10;  //페이지당 몇 게시글
  const page = req.body.page;
  try {
    const _id = req.body._id;
    const board = await Board.find({ writer: _id }, null, {
      sort: { createdAt: -1 }
    });
    const total = Math.ceil(board.length/per);
    const pageNumbers = [];
    for(let i = 1; i <= total; i++)
      pageNumbers.push(i);
    const result = board.slice((page-1)*per,per*page);
    res.json({ list: result, target:pageNumbers })
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ _id });
    res.json({ board });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/submitRating", async (req, res) => {
  try {
    let obj;
    const bRating = await Rating.find({board:req.body.board}, null, {
    });
    let isOk = true;
    let sum = 0;
    for(let i=0; i<bRating.length; i++) {
      if(req.body.writer.toString() === bRating[i].writer.toString()) isOk=false;
      sum+=bRating[i].rating;
    }
    if(!isOk)
      res.json({ message: "이미 평점을 등록하셨습니다." });
    else {
      await Board.update(
        { _id: req.body.board },
        {
          $set: {
            rating: (Number(sum) + Number(req.body.rating))/(bRating.length + 1),
            rating_people:(bRating.length + 1)
          }
        }
      );
      obj = {
        writer: req.body.writer,
        board: req.body.board,
        rating: req.body.rating,
      };
      const rating = new Rating(obj);
      await rating.save();
      res.json({ message: "평점 등록이 완료되었습니다." });
    }
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/getRatingList", async (req, res) => {
  try {
    const _id = req.body._id;
    const rating = await Rating.find({board: _id}, null, {
    });
    res.json({ list: rating });
  } catch (err) {
    res.json({ message: false });
  }
});

module.exports = router;

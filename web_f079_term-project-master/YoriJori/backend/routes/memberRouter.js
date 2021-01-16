const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const crypto = require("crypto");

//회원가입
router.post("/join", async (req, res) => {
  try {
    let obj = { email: req.body.email };  //이메일 겹치는지
    let obj2 = { name: req.body.name }; //별명 겹치는지
    let user = await User.findOne(obj);
    let user2 = await User.findOne(obj2);
    if (user) {
      res.json({
        message: "이미 가입한 이메일 입니다.",
        dup: "1"
      });
    } 
    else if(user2) {
      res.json({
        message: "이미 존재하는 별명 입니다.",
        dup: "2"
      });
    }
    else {
      crypto.randomBytes(64, (err, buf) => {
        if (err) {
        } else {
          crypto.pbkdf2(
            req.body.password,
            buf.toString("base64"),
            100000,
            64,
            "sha512",
            async (err, key) => {
              if (err) {
              } else {
                buf.toString("base64");
                obj = {
                  email: req.body.email,
                  name: req.body.name,
                  password: key.toString("base64"),
                  salt: buf.toString("base64")
                };
                user = new User(obj);
                await user.save();
                res.json({ message: "회원가입이 완료되었습니다.", dupYn: "0" });
              }
            }
          );
        }
      });
    }
  } catch (err) {
    res.json({ message: false });
  }
});

//로그인
router.post("/login", async (req, res) => {
  try {
    //이메일 값으로 아이디가 존재하는지 확인
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
      } else {
        if (user) {
          //아이디가 존재할 경우 이메일과 패스워드가 일치하는 회원이 있는지 확인
          crypto.pbkdf2(
            req.body.password,
            user.salt,
            100000,
            64,
            "sha512",
            async (err, key) => {
              if (err) {
              } else {
                const obj = {
                  email: req.body.email,
                  password: key.toString("base64")
                };

                const user2 = await User.findOne(obj);
                if (user2) {
                  //로그인 처리
                  await User.updateOne(
                    {
                      email: req.body.email
                    },
                    { $set: { loginCnt: 0 } }
                  );
                  req.session.email = user.email;
                  res.json({
                    message: "로그인 되었습니다!",
                    _id: user2._id,
                    email: user2.email
                  });
                } else {
                  //로그인 실패횟수 추가
                  if (user.loginCnt > 4) {
                    res.json({
                      message:
                        "아이디나 비밀번호가 5회 이상 일치하지 않았기 때문에 로그인이 불가능 합니다."
                    });
                  } else {
                    await User.updateOne(
                      {
                        email: req.body.email
                      },
                      { $set: { loginCnt: user.loginCnt + 1 } }
                    );
                    if (user.loginCnt >= 5) {
                      await User.updateOne(
                        {
                          email: req.body.email
                        },
                        { $set: { lockYn: true } }
                      );
                      res.json({
                        message:
                        "아이디나 비밀번호가 5회 이상 일치하지 않았기 때문에 로그인이 불가능 합니다."
                      });
                    } else {
                      res.json({
                        message: "아이디나 비밀번호가 일치하지 않습니다."
                      });
                    }
                  }
                }
              }
            }
          );
        } else {
          res.json({ message: "아이디나 비밀번호가 일치하지 않습니다." });
        }
      }
    });
  } catch (err) {
    res.json({ message: "로그인 실패" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: true });
  });
});

router.post("/delete", async (req, res) => {
  try {
    await User.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/getName", async (req, res) => {
  const wname = await User.findOne({_id:req.body._id}, null, {
  });
  res.json({ message: wname.name});
});

router.post("/update", async (req, res) => {
  try {
    await User.update({
      _id: req.body._id,
      name: req.body.name
    });
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: true });
  } catch (err) {
    res.json({ message: false });
  }
});

router.post("/getAllMember", async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ message: user });
  } catch (err) {
    res.json({ message: false });
  }
});

module.exports = router;

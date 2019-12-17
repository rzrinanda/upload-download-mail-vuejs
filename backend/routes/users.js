const express = require("express");
const router = express.Router();

const user = require("../models").user;
const Article = require("../models").article;

const sequelize = require("../models").sequelize;
const Sequelize = require("../models").Sequelize;
const Op = Sequelize.Op;

router.post('/login', async (req, res, next) => {
  if (req.body.username === 'rizal' && req.body.password === 'rahasia') {
    res.json({
      message: 'Authentication success',
      data: {
        username: 'rizal',
        name: 'Rizal',
        level: 'IT',
        menus: [
          {path: '/', label: 'Home'},
          {path: '/camera', label: 'Camera'},
          {path: '/gudang', label: 'Gudang'},
        ]
      }
    })
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }
})

/* GET users listing. */
router.get("/", async (req, res, next) => {
  // res.send('respond with a resource');
  // console.log(res)
  // res.json({
  //   name: "Someone",
  //   gender: "male"
  // })

  /** 
   * SELECT ALL
  */
  // const result = await user.findAll()
  const result = await user.findAll({
    where:{
      email: {
        [Op.like]: "%gmail.com"
      }
    },
    include: Article
  })
  res.json(result);
  /** END */

  /**
   * sequelize query
   * output json
   */
  // const result = await sequelize.query(
  //   "SELECT * FROM users WHERE email ILIKE ?",
  //   { 
  //     replacements: ["%@yahoo.com"], 
  //     type: sequelize.QueryTypes.SELECT 
  //   }
  // );
  // res.json(result);
  /** END */
  
  /**
   * menampilkan dari object
   * output string
   */
  // const [result2] = await sequelize.query("SELECT * FROM users WHERE name ILIKE 'B%'")
  // let name = ''
  // for(let res of result2){
  //   name += res.name + '<br>'
  //   console.log(res.name)
  // }
  // res.send(name)
  /** End */

});
/**
 * INSERT W/ QUERY
 */
// router.post("/", async (req, res, next) => {
//   const query = `INSERT INTO users (name, email, created_at, updated_at) 
//                   VALUES (?, ?, ?, ?) 
//                   RETURNING *`
//   const [[result]] = await sequelize.query(query, {
//     replacements: [
//       req.body.name,
//       req.body.email,
//       new Date,
//       new Date
//     ],
//     type: sequelize.QueryTypes.INSERT
//   })
//   console.log(result)
//   res.json(result)
  /**
   * End
   */
  /**
   * insert with sequelize
   */
  // const result = await user.create({
  //   name: req.body.name,
  //   email:req.body.email, 
  //   created_at: new Date,
  //   updated_at: new Date
  // })
  /**
   * End
   */
// })

module.exports = router;

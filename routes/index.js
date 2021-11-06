const express = require('express');
const path = require('path')
const router = express.Router();
const moment = require('moment')
const User = require('./../models/User')
const Suggestions = require('./../models/Suggestions')
const sendEmail = require('./../controllers/nodemailer/email')
const { v4: uuidv4 } = require('uuid');

router.get('/', (req,res)=>{
  res.send(`Ankur is the best`)
})

router.get('/googlea4a3175641f7151b.html',(req,res)=>{
  res.sendFile(path.join(__dirname, '../config', 'googlea4a3175641f7151b.html'));
})

router.get('/total-subs', async (req, res) => {
  try {
    const allEmail = await User.find({})
    const number = allEmail.length
    res.json({
      totalSubs : number
    })
  } catch (err) {
    return res.json({error: 'Internal server error', err})
  }
});


router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body

    const findEmail = await User.findOne({ email })

    if (findEmail) {
      return res.json({message: 'You are already subscribed.'})
    }

    const confirmationCode = uuidv4()

    const newUser = new User({
      email,
      confirmationCode,
      date: moment().utcOffset("+05:30").format('MMMM Do YYYY, h:mm:ss a')
    })

    newUser.save(async (err) => {
      if (err) {
        return res.json({error: 'Internal server error', err})
      }
      sendEmail(email, confirmationCode )
      return res.json({message: "Confirm your email to subscribe."})
    })

  } catch (err) {
    return res.json({error: 'Internal server error', err})
  }

})

router.get('/confirm/:id', async (req, res) => {
  try {
    const { id } = req.params
    const findUser = await User.findOne({ confirmationCode: id })

    if (!findUser) {
      return res.json({ message: 'Wrong confirmation code' })
    }

    findUser.status = "Active"

    findUser.save((err) => {
      if (err) {
        return res.json({error: 'Internal server error', err})

      } else {
        return res.redirect('https://ytsuggest.vercel.app/')
      }

    })

  } catch (err) {
    return res.json({error: 'Internal server error', err})
  }
})

router.post('/suggest-video', async (req, res) => {
  try {
    const { link } = req.body

    const newSuggestions = new Suggestions({
      link,
      date: moment().format('MMMM Do YYYY, h:mm:ss a')
    })

    newSuggestions.save(async (err) => {
      if (err) {
        return res.json({error: 'Internal server error', err})
      }
      return res.json({message: "Thanks for your suggestion"})
    })

  } catch (err) {
    console.log(err)

  }
})

module.exports = router;

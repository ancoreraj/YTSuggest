const express = require('express');
const router = express.Router();
const User = require('./../models/User')
const Suggestions = require('./../models/Suggestions')
const moment = require('moment')

function youtube_parser(url) {
  var regExp = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;
  var match = url.match(regExp);
  return (match && match[1].length == 11) ? true : false;
}

router.get('/', async (req, res) => {
  let message = ''
  const allEmail = await User.find({})
  const number = allEmail.length

  res.render('pages/home', { message, number })
});

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body

    const findEmail = await User.findOne({ email })

    if (findEmail) {
      let message = `Your are already subscribed`
      const allEmail = await User.find({})
      const number = allEmail.length
      res.render('pages/home', { message, number })
    }

    const newUser = new User({
      email,
      date: moment().format('MMMM Do YYYY, h:mm:ss a')
    })

    newUser.save(async (err) => {
      if (err) {
        console.log(err)
      }
      let message = `Your are subscribed`
      const allEmail = await User.find({})
      const number = allEmail.length
      res.render('pages/home', { message, number })
    })

  } catch (err) {
    console.log(err)

  }

})

router.get('/suggest', async (req, res) => {
  let message = ''
  const allEmail = await User.find({})
  const number = allEmail.length
  res.render('pages/suggest', { message, number })
});

router.post('/suggest-video', async (req, res) => {
  try {
    const { link } = req.body

    // if (!youtube_parser(link)) {
    //   let message = 'Please enter a valid youtube link.'
    //   const allEmail = await User.find({})
    //   const number = allEmail.length
    //   res.render('pages/home', { message, number })
    // }

    const newSuggestions = new Suggestions({
      link,
      date: moment().format('MMMM Do YYYY, h:mm:ss a')
    })

    newSuggestions.save(async (err) => {
      if (err) {
        console.log(err)
      }
      let message = `Thanks for your seggestion.`
      const allEmail = await User.find({})
      const number = allEmail.length
      res.render('pages/home', { message, number })

    })

  } catch (err) {
    console.log(err)

  }

})

module.exports = router;

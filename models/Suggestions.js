const mongoose = require('mongoose');

const SuggestionsSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

const Suggestions = mongoose.model('Suggestions', SuggestionsSchema);

module.exports = Suggestions;

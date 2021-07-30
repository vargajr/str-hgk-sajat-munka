const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const PersonSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  vaccine: {
    count: Number,
    vaccine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vaccine',
    },
  },
}, {
  collection: 'gyak',
  timestamps: true,
});

PersonSchema.plugin(idValidator);

module.exports = mongoose.model('Person', PersonSchema);

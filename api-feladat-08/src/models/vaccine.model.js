const mongoose = require('mongoose');

const VaccineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  efficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
}, {
  collection: 'vaccinae',
  timestamps: true,
});

module.exports = mongoose.model('Vaccine', VaccineSchema);

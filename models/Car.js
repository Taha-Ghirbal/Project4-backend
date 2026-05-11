const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
      minlength: 3,
    },
    carModel: {
        type: Number,
        required: true,
    },
    carMileage: {
        type: Number,
        required: true,
    },
    carAvailability: {
        type: Boolean,
        required: true,
    },
    carDescription: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

carsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('Cars', carsSchema);
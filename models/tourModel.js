const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'a tour must have 40 character length '],
      minlength: [10, 'a tour name have moe than 10 character'],
      validate: [validator.isAlpha, 'tour must only contain character'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'a tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour must have group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour must have difficulty'],
      enum: {
        values: ['easy', 'difficult', 'medium'],
        message: 'difficulty is either easy,difficult,medium',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'a rating must be above 1'],
      max: [5, 'a rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, 'a tour must have a name'],
    },
    pricediscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'the discount price {VALUE} must be below price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'a tour must have description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have a cover image'],
    },
    images: [String],
    createDates: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secrettour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourschema.virtual('durationonweeks').get(function () {
  return this.duration / 7;
});
tourschema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourschema.post('save', function (doc, next) {
  // console.log(doc);
  next();
});

//query middleware
tourschema.pre(/^find/, function (next) {
  this.find({ secrettour: { $ne: true } });
  next();
});
tourschema.post(/^find/, function (doc, next) {
  console.log(`the query took${Date.now() - this.startDates}millisecond`);
});
//aggregation middleware
tourschema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secrettour: { $ne: true } } });
  next();
});
const Tour = mongoose.model('Tour', tourschema);

module.exports = Tour;

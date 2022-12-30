const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/appFeatures');
const catchAsync = require('./../utils/catchAsync');
exports.gettopaliastour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-price';
  next();
};

exports.getalltour = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .fieldlimit()
    .paginate();

  const tours = await features.query;
  res.status(200).json({
    message: 'success',

    data: {
      tours,
    },
  });
});
exports.gettour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new Error('not found with that id', 404));
  }
  res.status(200).json({
    message: 'success',
    data: {
      tour,
    },
  });
});

exports.createtour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});
exports.patchtour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new Error('not found with that id', 404));
  }
  res.status(200).json({
    message: 'success',
    data: {
      tour,
    },
  });
});
exports.deletetour = catchAsync(async (req, res, next) => {
  const tour = Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new Error('not found with that id', 404));
  }
  res.status(200).json({
    message: 'success',
    data: {
      tour: null,
    },
  });
});

exports.gettourstats = catchAsync(async (req, res, next) => {
  const tourstat = Tour.aggregate([
    {
      $match: { ratingAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: 'difficulty',
        numtour: { $sum: 1 },
        numrating: { $sum: 'ratingQuantity' },
        avgPrice: { $avg: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);
  res.status(200).json({
    message: 'success',
    data: {
      tour: tourstat,
    },
  });
});

class APIFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }
  filter() {
    const queryobj = { ...this.querystr };
    const excludedfield = ['page', 'sort', 'limit', 'fields'];
    excludedfield.forEach((el) => delete queryobj[el]);
    let querystr = JSON.stringify(queryobj);
    querystr = querystr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(querystr));

    this.query.find(JSON.parse(querystr));
    return this;
  }
  sort() {
    if (this.querystr.sort) {
      const sortby = this.querystr.sort.split(',').join(' ');
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort('createDates');
    }
    return this;
  }
  fieldlimit() {
    if (this.querystr.fields) {
      const fields = this.querystr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.querystr.page * 1 || 1;
    const limit = this.querystr.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;

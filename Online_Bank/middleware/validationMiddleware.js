// Middleware reuse
exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    req.flash('error', error.details[0].message);

    // Save input
    req.flash('oldInput', req.body);

    // return res.redirect('back');
    return res.redirect(req.get('Referrer') || '/login');
  }

  next();
};
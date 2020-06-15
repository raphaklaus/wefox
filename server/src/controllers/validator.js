import validator from 'express-validator'

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validator.validationResult(req)

    if (errors.isEmpty()) {
      return next()
    }

    return res.status(422).json({
      errors: errors.array()
    })
  }
}

export const authValidator = validate([
  validator.check('email').exists(),
  validator.check('password').exists()
])

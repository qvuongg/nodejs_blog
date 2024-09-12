const Joi = require('joi');

const userSchema = Joi.object({
    userName: Joi.string().required().min(6).max(255).messages({
        'string.empty': 'Tên người dùng không được để trống',
        'string.max': 'Tên người dùng không được vượt quá {#limit} ký tự',
        'string.min': 'Tên người dùng không được ít hơn {#limit} ký tự',
        'any.required': 'Tên người dùng là bắt buộc'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email không được để trống',
        'string.email': 'Email không đúng định dạng',
        'any.required': 'Email là bắt buộc'
    }),
    password: Joi.string().required().min(6).max(255).messages({
        'string.empty': 'Mật khẩu không được để trống',
        'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
        'string.min': 'Mật khẩu không được ít hơn {#limit} ký tự',
        'any.required': 'Mật khẩu là bắt buộc'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'string.empty': 'Mật khẩu không được để trống',
        'string.max': 'Mật khẩu không được vượt quá {#limit} ký tự',
        'string.min': 'Mật khẩu không được ít hơn {#limit} ký tự',
        'any.required': 'Mật khẩu là bắt buộc',
        'any.only': 'Mật khẩu không khớp'
    }),
    role: Joi.string().default('user')
});



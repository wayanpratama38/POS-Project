import { RegisterValidator, LoginValidator } from '../validator/Auth.js';
import { AuthService } from '../services/Auth.js';

export const AuthController = {
  // POST Register User
  registerUser: async (req, res, next) => {
    // Get request body
    const { fullname, username, password } = req.body;

    try {
      // Validate user input
      const validatedData = RegisterValidator.parse({
        fullname,
        username,
        password,
      });

      // Use AuthService
      const data = await AuthService.registerUser({ ...validatedData });

      // Send response
      return res.status(201).json({
        status: 'success',
        message: 'Berhasil membuat akun baru',
        data: { ...data },
      });
    } catch (err) {
      next(err);
    }
  },

  // POST Login User
  loginUser: async (req, res, next) => {
    // Get request body
    const { username, password } = req.body;

    try {
      // Validate user input
      const validatedData = LoginValidator.parse({ username, password });

      // Use AuthService.loginUser()
      const data = await AuthService.loginUser({ ...validatedData });

      res.cookie('accessToken', data.accessToken, {
        httponly: true,
        maxAge: "90000",
        path: '/',
        sameSite: 'strict'
      })

      res.cookie('refreshToken', data.refreshToken, {
        httponly: true,
        maxAge: "90000",
        path: '/refresh',
        sameSite: 'strict'
      })

      return res.status(200).json({
        status: 'success',
        message: 'Berhasil login',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },
};

import { RegisterValidator, LoginValidator } from '../validator/Auth.js';
import AuthService from '../services/Auth.js';

export default class AuthController {
 constructor() {
  // Binding all the controller
  this.registerUser = this.registerUser.bind(this);
  this.loginUser = this.loginUser.bind(this);
  this.service = new AuthService();
 }

 // POST Register User
 async registerUser(req, res, next) {
  // Get request body
  const body = req.body;

  // Validate user input
  RegisterValidator.parse(body.fullname, body.username, body.password);

  // Use AuthService
  const data = await this.service.registerUser({ ...body });

  // Send response
  return res.status(201).json({
   status: 'success',
   message: 'Berhasil membuat akun baru',
   data: { ...data },
  });
 }

 // POST Login User
 async loginUser(req, res, next) {
  // Get request body
  const body = req.body;

  // Validate user input
  LoginValidator.parse(body.username, body.password);

  // Use AuthService.loginUser()
  await this.service.loginUser({ ...body });

  return res.status(200).json({
   status: 'success',
   message: 'Berhasil login',
  });
 }
}

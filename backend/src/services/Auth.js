import prisma from '../config/DBConnection.js'
import bcrypt from 'bcrypt';


export default class AuthService {
    // POST Register User
    async registerUser({fullname, username, password}) {
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data : {
                username : username,
                fullname : fullname,
                password : hashedPassword
            }
        })

        return {... newUser};
    }

    // POST Login User
    async loginUser({username,password}) {
        const userData = await prisma.user.findUnique({
            where : {username : username},
            select : {
                password : true
            } 
        });

        // check if user exist or password is wrong!
        if(!userData || !(await bcrypt.compare(password,userData.password))){
            console.log("Wrong password");
        }
    }
}
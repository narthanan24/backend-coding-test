import { UnauthorizedException } from "@nestjs/common";
import * as admin from 'firebase-admin';

export class AuthService{

  private static getToken(authToken:string):string{
    const match=authToken.match(/^Bearer (.*)$/);
    if(!match || match.length<2){
      throw new UnauthorizedException("Invalid bearer token")
    }
    return match[1]
  }

  public async authenticate(authToken:string):Promise<any>{
    const tokenString = AuthService.getToken(authToken);
    try {
      const decodedToken=await admin.auth().verifyIdToken(tokenString);
      const {
        email,
        uid,
        role
      } = decodedToken;
      return { email, uid, role};
    }catch (e) {
      throw new UnauthorizedException(e.message)
    }
  }
}

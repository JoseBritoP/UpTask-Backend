import { CorsOptions } from "cors";

export const corsOptions:CorsOptions = {
  origin:function(origin,callback){
    if(origin === process.env.FRONTEND_URL || origin === undefined ){
      console.log('Allowed...')
      callback(null,true);
    } else {
      console.log('Not allowed...')
      callback(new Error(`Cors error`))
    }
  }
}

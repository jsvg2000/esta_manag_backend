export interface AuthenticatedRequest extends Request{
    user:{
        userId:string;
        email:String;
        role: {
            name: string;
            id: number;
        }
    }
}
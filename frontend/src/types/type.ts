
export interface Register{
    name : string;
    email : string;
    password : string;
}

export interface Login{
    email : string;
    password : string;
}

export interface Feedback {
  id?: number;
  nama: string;
  lokasi: string;
  subjek: string;
  pesan: string;
}

export interface FeedbackResponse {
  message?: string;
  error?: string;
}

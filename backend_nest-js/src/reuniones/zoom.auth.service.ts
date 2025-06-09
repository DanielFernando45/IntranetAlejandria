import { Injectable } from "@nestjs/common";
import axios from 'axios';

@Injectable()
export class ZoomAuthService{
    // private clientId="9TqwyiIUSmao8DLWxntRQw";
    // private clientSecret="6W3arutJRbZ0HZ530XrsdEdz0UNjO9Li"
    // private accountId="zotGX7FnRpCp3HQsNj6kSw"

    async getAccessToken(): Promise<string> {
    const res = await axios.post(
      'https://zoom.us/oauth/token',
      null,
      {
        params: {
          grant_type: 'account_credentials',
          account_id: String(process.env.S2_ACCOUNT_ID),
        },
        auth: {
          username: String(process.env.S2_CLIENT_ID),
          password: String(process.env.S2_CLIENT_SECRET),
        },
      },
    );
    return res.data.access_token;
  }
}
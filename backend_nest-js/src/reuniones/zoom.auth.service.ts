import { Injectable } from "@nestjs/common";
import axios from 'axios';

@Injectable()
export class ZoomAuthService{
    private clientId="9TqwyiIUSmao8DLWxntRQw";
    private clientSecret="6W3arutJRbZ0HZ530XrsdEdz0UNjO9Li"
    private accountId="zotGX7FnRpCp3HQsNj6kSw"

    async getAccessToken(): Promise<string> {
    const res = await axios.post(
      'https://zoom.us/oauth/token',
      null,
      {
        params: {
          grant_type: 'account_credentials',
          account_id: this.accountId,
        },
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
      },
    );
    return res.data.access_token;
  }
}
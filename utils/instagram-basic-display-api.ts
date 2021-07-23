import axios from 'axios'

interface Options {
  INSTAGRAM_ACCESS_TOKEN: string
}


export interface InstaResponse {
  data: Media[];
  paging: Paging;
}

export interface Media {
  media_type: MediaType;
  permalink: string;
  media_url: string;
  id: string;
}

export enum MediaType {
  Image = "IMAGE",
  Video = "VIDEO",
}

export interface Paging {
  cursors: Cursors;
}

export interface Cursors {
  before: string;
  after: string;
}


export class InstragramBasicDisplay {
  private apiBaseUrl: string = 'https://graph.instagram.com'

  constructor(readonly options: Options) { }

  async getUserMedia() {
    const endpoint = `${this.apiBaseUrl}/me/media`
    const params = {
      fields: 'media_count,media_type,permalink,media_url',
      access_token: this.options.INSTAGRAM_ACCESS_TOKEN
    }
    const { data } = await axios.get<InstaResponse>(endpoint, {
      params
    })
    return data
  }
}
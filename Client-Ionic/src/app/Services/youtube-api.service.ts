import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {
apikey='AIzaSyAIyv-RhbPIbXTIZrhA-aMR-4OsRBgFRTk'
  constructor(private httpClient: HttpClient) { }

  getPlayListForChannel(channel){
   
    return this.httpClient.get('https://www.googleapis.com/youtube/v3/playlists?key='+this.apikey+'&channelId='+channel+'&part=snippet,id&maxResults=60')
    
  }
  getListVideos(listId){
    return this.httpClient.get('https://www.googleapis.com/youtube/v3/playlistItems?key='+this.apikey+'&playlistId='+listId+'&part=snippet,id&maxResults=50')
  }

}

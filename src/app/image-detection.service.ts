import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageDetectionService {
  private apiUrl = 'https://vision.googleapis.com/v1/images:annotate';
  private apiKey = 'AIzaSyBraMJITZleSlTHOV2A4myZgrR1lkCgdkU'; // Replace with your Google Cloud Vision API key

  constructor(private http: HttpClient) { }

  detectLabels(imageData: string): Observable<string[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = {
      requests: [
        {
          image: {
            content: imageData.replace('data:image/jpeg;base64,', ''),
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 50,
            },
          ],
        },
      ],
    };

    const params = new URLSearchParams();
    params.set('key', this.apiKey);

    return this.http.post<any>(`${this.apiUrl}?${params.toString()}`, requestBody, { headers }).pipe(
      map((response) => {
        if (response.responses && response.responses[0] && response.responses[0].labelAnnotations) {
          // Extract plain label descriptions
          const labels = response.responses[0].labelAnnotations
            .map((label: any) => label.description.toLowerCase());

          return labels.length > 0 ? labels : ['No labels detected'];
        } else {
          return ['No labels detected'];
        }
      }),
      catchError((error) => {
        console.error('Error detecting labels:', error);
        return of(['Error detecting labels']);
      })
    );
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GlobalsService } from '../globals.service';
import { BannerService } from '../banner/banner.service';
import { ToolsService } from '../tools/tools.service';



@Injectable({
  providedIn: 'root'
})
export class FatappCoreService {

  private httpOptions: any;
  private httpOptionsFormData: any;

  constructor(
    private http: HttpClient,
    private global: GlobalsService,
    private tools: ToolsService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'token': environment.apiCoreToken,
      })
    };
  }


  // Subscriptions
  async getSubscriptions(activityId) {
    const link = environment.apiCoreUrl + 'activities/' + activityId + 'subscriptions';
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }


  // Activities
  async getAllActivity() {
    const link = environment.apiCoreUrl + 'activities';
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async getActivity(id) {
    const link = environment.apiCoreUrl + 'activities/' + id;
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async registerActivity(data) {
    const link = environment.apiCoreUrl + 'activities/';

    return this.http.post(link, data, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      this.global.createAlert('Ocorreu algum erro ao cadastrar atividade, verifique se a data da atividade está dentro da data do evento');
    });
  }

  async updateActivity(data, id) {
    const link = environment.apiCoreUrl + 'activities/' + id;
    return this.http.put(link, data, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      this.global.createAlert('Ocorreu algum erro ao alterar atividade, verifique se a data da atividade está dentro da data do evento');
    });
  }

  async removeActivity(id) {
    const link = environment.apiCoreUrl + 'activities/' + id;
    return this.http.delete(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      this.global.createAlert('Ocorreu algum erro ao remover atividade');
    });
  }

  // Courses / Target Audience
  async getAllCourses() {
    const link = environment.apiCoreUrl + 'courses/';
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }
  async getCourse(id) {
    const link = environment.apiCoreUrl + 'courses/' + id;
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }
  async registerCourse(data) {
    const link = environment.apiCoreUrl + 'courses/';

    return this.http.post(link, data, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }
  async updateCourse(data, id) {
    const link = environment.apiCoreUrl + 'courses/' + id;
    return this.http.put(link, data, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }
  async removeCourse(id) {
    const link = environment.apiCoreUrl + 'courses/' + id;
    return this.http.delete(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  // EVENT

  async getEventImage(file) {
    const imgLink = decodeURIComponent(file);
    const link = environment.apiCoreUrl + 'files/' + imgLink;
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:object-literal-key-quotes
        'token': environment.apiCoreToken,
      })
    };
    return this.http.get(link, httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async getAllEvents() {
    const link = environment.apiCoreUrl + 'events/';
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async getEvent(id) {
    const link = environment.apiCoreUrl + 'events/' + id;
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async registerEvent(data) {
    const link = environment.apiCoreUrl + 'events/';

    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:object-literal-key-quotes
        'token': environment.apiCoreToken,
      })
    };

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('edition', data.edition);
    formData.append('initialDate', `${data.initialDate}`);
    formData.append('finalDate', `${data.finalDate}`);
    formData.append('banner', data.banner);
    formData.append('certificateId', '1');


    return this.http.post(link, formData, httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async removeEvent(id) {
    const link = environment.apiCoreUrl + 'events/' + id;
    return this.http.delete(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async updateEvent(data, id) {
    const link = environment.apiCoreUrl + 'events/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:object-literal-key-quotes
        'token': environment.apiCoreToken,
      })
    };

    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('edition', data.edition);
    formData.append('initialDate', data.initialDate);
    formData.append('finalDate', data.finalDate);
    formData.append('banner', data.banner);
    formData.append('certificateId', '1');

    return this.http.put(link, formData, httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  // SPEAKER

  async getAllSpeakers() {
    const link = environment.apiCoreUrl + 'speakers/';

    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async getSpeaker(email) {
    const link = environment.apiCoreUrl + 'speakers?email=' + email;

    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async registerSpeaker(data) {
    const link = environment.apiCoreUrl + 'speakers';

    const httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line:object-literal-key-quotes
        'token': environment.apiCoreToken,
      })
    };
    console.log(data);
    const formData = new FormData();

    formData.append('speakerName', data.speakerName);
    formData.append('speakerEmail', data.speakerEmail);
    formData.append('speakerPhone', data.speakerPhone);
    formData.append('speakerPhone2', data.speakerPhone2);
    formData.append('speakerCurriculum', data.speakerCurriculum);
    formData.append('speakerPicture', data.speakerPicture);


    return this.http.post(link, formData, httpOptions).toPromise().catch(error => {
      console.log(error);
      this.global.createAlert('Erro ao cadastrar palestrante');
    });
  }

  async removeSpeaker(id) {
    const link = environment.apiCoreUrl + 'speakers/' + id;
    return this.http.delete(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      this.global.createAlert('Erro ao remover palestrante');
    });

  }

  // ROOMS

  async getAllRooms() {
    const link = environment.apiCoreUrl + 'rooms/';
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async getRoomById(id) {
    const link = environment.apiCoreUrl + 'rooms/' + id;
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });

  }

  async registerRoom(data) {
    const room = {
      name: data.number,
      type: data.type,
      capacity: data.capacity,
    };

    const link = environment.apiCoreUrl + 'rooms/';
    return this.http.post(link, room, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      this.global.createAlert('Falha ao registrar uma sala');
    });
  }

  async removeRoom(id) {
    const link = environment.apiCoreUrl + 'rooms/' + id;
    return this.http.delete(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      this.global.createAlert('Falha ao remover a sala');
    });
  }



  // RESOURCES

  async getAllResources() {
    const link = environment.apiCoreUrl + 'resources/';
    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
    });
  }

  async registerResource(name) {
    const link = environment.apiCoreUrl + 'resources/';

    const resource = {
      name,
    };

    return this.http.post(link, resource, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      if (error.status >= 400) {
        this.global.createAlert('Houve algum erro ao cadastrar o recurso');
      }
    });
  }

  async removeResource(id) {
    const link = environment.apiCoreUrl + 'resources/' + id;

    return this.http.delete(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      if (error.status >= 400) {
        this.global.createAlert('Houve algum erro ao remover recurso');
      }
    });
  }

  // ROOM RESOURCE

  async addResourceRoom(resourceId, amount, roomId) {
    const link = environment.apiCoreUrl + 'rooms/' + roomId + '/resources';

    const resource = {
      resourceId,
      amount
    };

    return this.http.post(link, resource, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      if (error.status >= 400) {
        this.global.createAlert('Houve algum erro ao adicionar o recurso');
      }
    });
  }

  async getResourceRoom(roomId) {
    const link = environment.apiCoreUrl + 'rooms/' + roomId + '/resources';

    return this.http.get(link, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      if (error.status >= 400) {
        this.global.createAlert('Houve algum erro ao carregar os recursos');
      }
    });
  }

  async removeResourceRoom(roomId, resourceId) {
    console.log(resourceId);
    const link = environment.apiCoreUrl + `rooms/${roomId}/resources/${resourceId}`;


    return await this.http.delete(link, this.httpOptions).toPromise().catch(error => {
      console.log(error.status);
      if (error.status === 200) {
        return true;
      } else {
        return false;
      }
    });
  }

  async updateResourceRoom(resourceId, resourceAmount, roomId) {
    const link = environment.apiCoreUrl + 'rooms/' + roomId + '/resources';

    const resource = {
      resourceId: `${resourceId}`,
      amount: resourceAmount,
    };

    return this.http.post(link, resource, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      if (error.status >= 400) {
        this.global.createAlert('Houve algum erro ao alterar o recurso');
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GlobalsService } from '../globals.service';


@Injectable({
  providedIn: 'root'
})
export class FatappCoreService {

  private httpOptions: any;

  constructor(
    private http: HttpClient,
    private global: GlobalsService,
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'token': environment.apiCoreToken,
      })
    };
  }

  // EVENT

  async getAllEvents() {

  }

  async registerEvent(data) {
    console.log(data);
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

  async addResourceRoom(resourceId, resourceAmount, roomId) {
    const link = environment.apiCoreUrl + 'rooms/' + roomId + '/resources';

    const resource = {
      resource_id: `${resourceId}`,
      resource_amount: resourceAmount,
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

  async removeResourceRoom(roomId, roomResourceId) {
    const link = environment.apiCoreUrl + `rooms/${roomId}/resources`;

    console.log(roomResourceId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'token': environment.apiCoreToken,
      }),
      body: {
        room_resource_id: `${roomResourceId}`,
      }
    };

    return await this.http.delete(link, httpOptions).toPromise().catch(error => {
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
      resource_id: `${resourceId}`,
      resource_amount: resourceAmount,
    };

    return this.http.post(link, resource, this.httpOptions).toPromise().catch(error => {
      console.log(error);
      if (error.status >= 400) {
        this.global.createAlert('Houve algum erro ao alterar o recurso');
      }
    });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChecklistCategoryService
{
    constructor(
        private http: HttpClient,
    ) { }

    public headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    getChecklistCategoryCollection(): Observable<Object>
    {
        return this.http.get(environment.API_ENDPOINT + '/api/checklist_category/items', { headers: this.headers });
    }

    getChecklistCategoryById(category_id: number)
    {
        return this.http.get(environment.API_ENDPOINT + `/api/checklist_category/${category_id}`, { headers: this.headers });
    }

    createChecklistCategory(value: any): Observable<Object>
    {
        return this.http.put(environment.API_ENDPOINT + '/api/checklist_category/new', value, { headers: this.headers });
    }

    updateChecklistCategory(category_id: number, value: any): Observable<Object>
    {
        return this.http.put(environment.API_ENDPOINT + `/api/checklist_category/update/${category_id}`, value, { headers: this.headers });
    }

    deleteChecklistCategory(category_id: number)
    {
        return this.http.delete(environment.API_ENDPOINT + `/api/checklist_category/delete/${category_id}`, { headers: this.headers });
    }
}

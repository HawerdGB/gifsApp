import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
private apiKey : string = 'wvNY1hte3cNF31Ii45OLWDkjsRukxqZn';
 private _historial : string[] = [];

 get historial(){
   return [...this._historial];
 }

 buscarGifs( query: string = ''){

query = query.trim().toLowerCase();

  if(!this._historial.includes( query)){
    this._historial.unshift( query );
    this._historial = this._historial.splice(0,10);
  }


 }
}


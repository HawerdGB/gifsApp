import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
private apiKey : string = 'wvNY1hte3cNF31Ii45OLWDkjsRukxqZn';
private servicioUrl : string = 'https://api.giphy.com/v1/gifs';
 private _historial : string[] = [];

 public resultados: Gif[] = [];

 get historial(){
   return [...this._historial];
 }

 constructor (private http: HttpClient){
   if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
       }
   localStorage.getItem('historial');
//esta es otra manera mas sencilla de hacer los mismo de arriba , en una sola linea
this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

 }

 buscarGifs( query: string = ''){

query = query.trim().toLowerCase();

  if(!this._historial.includes( query)){
    this._historial.unshift( query );
    this._historial = this._historial.splice(0,10);

    localStorage.setItem('historial',JSON.stringify(this._historial) );
  }

  //este metodo que nos proporciona angular a traves del HttpClient, usando
const params = new HttpParams()
              .set('api_key', this.apiKey)
              .set('q', query)
              .set('limit', '10');


  this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`,{ params })
  .subscribe( resp => {
   // console.log(resp.data);
    this.resultados = resp.data;
    localStorage.setItem('resultados',JSON.stringify(this.resultados));

  })

//fetch('https://api.giphy.com/v1/gifs/search?api_key=wvNY1hte3cNF31Ii45OLWDkjsRukxqZn&q=dbz&limit=10')
//.then( resp => {resp.json().then(data => console.log(data))})

//otra forma es poniendole async a buscarGifts y creando las const para la resp., daria el mismo resultado

//const resp =  await fetch('https://api.giphy.com/v1/gifs/search?api_key=wvNY1hte3cNF31Ii45OLWDkjsRukxqZn&q=dbz&limit=10');
//const data = await resp.json();
//console.log(data);

//para SearchGifResponse se uso el website app.quicktype.io, se copio el resultado del postman
//se pego en la web , se elige el lenguaje Typescript , y da el formato para crear la interface que servira para el tipado

//para animaciones website https://animate.style/

 }
}


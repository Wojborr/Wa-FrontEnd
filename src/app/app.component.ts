import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.getClient();
    this.getMovies();
  }
  title = 'wideo';
  private client: Client;
  private baseUrl:string = "http://localhost:8080";
  private movies:Movie[];

  /*getClient(){
    this.http.post<Client>("localhost:8080/client/login", {"login":"login", "password":"login"});




  }*/

  getClient()
  {
    this.http.post<Client>(this.baseUrl +"/client/login", {"login":"login", "password":"login"}).subscribe(
      response => {this.client = response;
    console.log(this.client)})
  }

  getMovies()
  {
    this.http.get<Movie[]>(this.baseUrl +"/movie").subscribe(
      response => {this.movies = response;
        console.log(this.movies)})
  }


  buyMovie(movie:Movie)
  {
    this.http.post<Client>(this.baseUrl + "/client/" + this.client.id+ "/movie/add", movie).subscribe(
      response => {this.client = response;
        console.log(this.client);},
      error1 => {alert("Sorry but you already have this movie")}
    )
    this.movies = null;
    this.getMovies();
  }

  refoundMovie(movie:Movie)
  {
    this.http.post<Client>(this.baseUrl + "/client/" + this.client.id+ "/movie/remove", movie).subscribe(
      response => {this.client = response;
        console.log(this.client);}
    )
    this.movies = null;
    this.getMovies();
  }



  test()
  {
    alert("aaaaakotki dwa");

  }
}

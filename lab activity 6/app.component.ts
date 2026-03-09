import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Book Hub';
  readonly APIUrl = "http://localhost:5038/api/books/";
  books: any = [];
  editingId: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshBooks();
  }

  refreshBooks() {
    this.http.get(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data;
    });
  }

  addBook() {
    const formData = this.getFormData();
    this.http.post(this.APIUrl + 'AddBook', formData).subscribe(data => {
      alert(data);
      this.refreshBooks();
      this.clearInputs();
    });
  }

  editBook(book: any) {
    // ✅ FIX: Captures the ID for updating later
    this.editingId = book.id || book._id || book.Id;

    // ✅ FIX: Use book.desc first since that's what MongoDB stores
    (<HTMLInputElement>document.getElementById("newBook")).value = book.title || book.Title || "";
    (<HTMLInputElement>document.getElementById("newDesc")).value = book.desc || book.description || book.Description || "";
    (<HTMLInputElement>document.getElementById("newPrice")).value = book.price || book.Price || "";
    (<HTMLInputElement>document.getElementById("newAuthor")).value = book.author || book.Author || "";
    (<HTMLInputElement>document.getElementById("newGenre")).value = book.genre || book.Genre || "";
  }

  updateBook() {
    const formData = this.getFormData();
    formData.append("id", this.editingId);

    this.http.put(this.APIUrl + 'UpdateBook', formData).subscribe(data => {
      alert(data);
      this.editingId = null;
      this.refreshBooks();
      this.clearInputs();
    });
  }

  private getFormData(): FormData {
    const formData = new FormData();
    formData.append("title", (<HTMLInputElement>document.getElementById("newBook")).value);
    formData.append("description", (<HTMLInputElement>document.getElementById("newDesc")).value);
    formData.append("price", (<HTMLInputElement>document.getElementById("newPrice")).value);
    formData.append("author", (<HTMLInputElement>document.getElementById("newAuthor")).value);
    formData.append("genre", (<HTMLInputElement>document.getElementById("newGenre")).value);
    return formData;
  }

  deleteBook(id: any) {
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(data => {
      alert(data);
      this.refreshBooks();
    });
  }

  clearInputs() {
    ["newBook", "newDesc", "newPrice", "newAuthor", "newGenre"].forEach(id => {
      (<HTMLInputElement>document.getElementById(id)).value = "";
    });
  }
}

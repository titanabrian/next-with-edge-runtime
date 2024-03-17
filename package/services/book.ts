import { BookRepository } from "../repository/book";

export class BookService {
  constructor(private bookRepo: BookRepository) {}

  async getBooks(){
    return await this.bookRepo.getBooks()
  }
}
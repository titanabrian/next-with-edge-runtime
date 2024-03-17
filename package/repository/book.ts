import { SupabaseClient } from "@supabase/supabase-js";

export class BookRepository {
  public tableName: string = 'books'

  constructor(private supabase: SupabaseClient){}

  async getBooks() {
    const singleResponse = await this.supabase.from(this.tableName).select()
    if (singleResponse.error) {
      throw new Error('failed to fetch table books')
    }

    return singleResponse.data
  }
}
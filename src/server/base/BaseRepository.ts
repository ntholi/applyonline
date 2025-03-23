import { db } from '@/db';
import { count, eq, sql, SQL, ilike, like, or } from 'drizzle-orm';

import { SQLiteTable as Table, SQLiteColumn as Column } from 'drizzle-orm/sqlite-core';


type ModelInsert<T extends Table> = T['$inferInsert'];
type ModelSelect<T extends Table> = T['$inferSelect'];

export interface SortOptions<T extends Table> {
  column: keyof ModelSelect<T>;
  order?: 'asc' | 'desc';
}

export interface QueryOptions<T extends Table> {
  page?: number;
  size?: number;
  search?: string;
  searchColumns?: (keyof ModelSelect<T>)[];
  sort?: SortOptions<T>[];
  filter?: SQL;
}

class BaseRepository<
  T extends Table,
  PK extends keyof T & keyof ModelSelect<T>
> {
  constructor(private table: T, private primaryKey: PK) {}

  async findFirst(): Promise<ModelSelect<T> | undefined> {
    return await db
      .select()
      .from(this.table)
      .limit(1)
      .then(([result]) => result);
  }

  async findById(id: ModelSelect<T>[PK]): Promise<ModelSelect<T> | undefined> {
    const [result] = await db
      .select()
      .from(this.table)
      .where(eq(this.table[this.primaryKey] as Column, id))
      .limit(1);
    return result;
  }

  async findAll(limit?: number): Promise<ModelSelect<T>[]> {
    if (limit) {
      return await db.select().from(this.table).limit(limit);
    }
    return await db.select().from(this.table);
  }

  protected async buildQueryCriteria(options: QueryOptions<T>) {
    const {
      page = 1,
      size = 15,
      search,
      searchColumns = [],
      sort = [],
      filter,
    } = options;

    const offset = (page - 1) * size;

    let sortExpressions = sort.map((sortOption) => {
      const column = this.table[sortOption.column] as Column;
      return sql`${column} ${
        sortOption.order === 'desc' ? sql`DESC` : sql`ASC`
      }`;
    });

    if (sortExpressions.length === 0 && 'createdAt' in this.table) {
      sortExpressions = [sql`${this.table.createdAt} DESC`];
    }

    let filterCondition: SQL | undefined;

    if (search && searchColumns.length > 0) {
      const searchCondition = or(
        ...searchColumns.map((column) =>

          like(this.table[column as keyof T] as Column, `%${search}%`)

        )
      );

      filterCondition = filter
        ? sql`${searchCondition} AND ${filter}`
        : searchCondition;
    } else {
      filterCondition = filter;
    }

    return {
      sortExpressions,
      filterCondition,
      offset,
      size,
    };
  }

  protected async createPaginatedResult<E extends ModelSelect<T>>(
    items: E[],
    filterCondition: SQL | undefined,
    size: number
  ) {
    const totalItems = await this.count(filterCondition);
    return {
      items,
      totalPages: Math.ceil(totalItems / size),
      totalItems
    };
  }

  async query(
    options: QueryOptions<T>
  ): Promise<{ items: ModelSelect<T>[]; totalPages: number; totalItems: number }> {
    const { sortExpressions, filterCondition, offset, size } =
      await this.buildQueryCriteria(options);

    const items = await db
      .select()
      .from(this.table)
      .orderBy(...sortExpressions)
      .where(filterCondition)
      .limit(size)
      .offset(offset);

    return await this.createPaginatedResult(items, filterCondition, size);
  }

  async exists(id: ModelSelect<T>[PK]): Promise<boolean> {
    const [result] = await db
      .select({ count: count() })
      .from(this.table)
      .where(eq(this.table[this.primaryKey] as Column, id))
      .limit(1);
    return result?.count > 0;
  }

  async create(entity: ModelInsert<T>): Promise<ModelSelect<T>> {
    const [inserted] = await db.insert(this.table).values(entity).returning();
    return inserted;
  }

  async update(
    id: ModelSelect<T>[PK],
    entity: Partial<ModelInsert<T>>
  ): Promise<ModelSelect<T>> {

    const [updated] = (await db
      .update(this.table)
      .set(entity)
      .where(eq(this.table[this.primaryKey] as Column, id))
      .returning()) as ModelSelect<T>[];

    return updated;
  }

  async delete(id: ModelSelect<T>[PK]): Promise<void> {
    await db
      .delete(this.table)
      .where(eq(this.table[this.primaryKey] as Column, id));
  }

  async count(filter?: SQL): Promise<number> {
    const query = db.select({ count: count() }).from(this.table);
    const [result] = await (filter ? query.where(filter) : query);
    return result?.count ?? 0;
  }

  async deleteAll(): Promise<void> {
    await db.delete(this.table);
  }
}

export default BaseRepository;

---
name: mssql-database
description: Microsoft SQL Server (MSSQL) database development guide covering T-SQL conventions, indexes, performance tuning, and connection pooling.
---

# Microsoft SQL Server (MSSQL) Database Skill

Best practices and performance guidelines for working with Microsoft SQL Server databases.

---

## 🔑 Database Connection & Security

1. **Connection Strings**:
   - Store Connection Strings securely using User Secrets (`dotnet user-secrets`) or environment variables. **Never hardcode credentials.**
   - Configure connection pooling and set appropriate timeout properties:
     ```text
     Server=localhost;Database=DevDb;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;
     ```

2. **Transaction Isolation Levels**:
   - Understand the default transaction isolation level (usually `Read Committed`).
   - Use `SET TRANSACTION ISOLATION LEVEL SNAPSHOT` or `READ_COMMITTED_SNAPSHOT ON` to prevent read locks and writers from blocking readers.

---

## 📈 Performance & Query Tuning

1. **Indexing Strategy**:
   - **Clustered Indexes**: Ensure every table has a clustered primary key (usually an auto-incrementing integer `INT IDENTITY` or a sequential Guid `NEWSEQUENTIALID()`).
   - **Non-Clustered Indexes**: Add indexes to foreign keys and columns frequently used in `WHERE`, `JOIN`, or `ORDER BY` clauses.
   - **Covering Indexes**: Use the `INCLUDE` clause to attach columns to non-clustered indexes to avoid expensive bookmark lookup operations.

2. **Query Optimization**:
   - Avoid `SELECT *`. Always select specific columns.
   - Avoid functions on indexed columns in `WHERE` clauses (e.g., `WHERE YEAR(CreatedDate) = 2026`) as this prevents SQL Server from performing index seeks (sargability).
   - Use `EXISTS` instead of `IN` / `COUNT` when checking for the existence of records.

---

## 🛠 T-SQL Conventions

1. **Naming Conventions**:
   - Table names: Plural PascalCase (e.g., `Users`, `BillingRecords`).
   - Column names: Singular PascalCase (e.g., `Id`, `EmailAddress`, `CreatedAt`).
   - Primary Keys: Named `Id` or `TableNameId`.
   - Foreign Keys: Named `ParentTableNameId`.

2. **Data Types**:
   - Use `NVARCHAR` for text columns requiring Unicode (international language) support.
   - Use `VARCHAR` only for ascii-only tokens (e.g., status strings, ISO codes, hashes).
   - Use `DATETIMEOFFSET` for all date/time fields to store timezone information. Avoid `DATETIME` or `DATETIME2` without offset.
   - Use `DECIMAL(18,2)` (or higher precision) for currency and financial values. Never use `FLOAT` or `REAL` for exact math.

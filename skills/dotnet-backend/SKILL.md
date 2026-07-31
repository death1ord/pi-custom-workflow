---
name: dotnet-backend
description: Senior developer patterns for C# and ASP.NET Core Web APIs, Entity Framework Core migrations, dependency injection, and clean architecture.
---

# .NET Backend Engineering Skill

Best practices and guidelines for building and maintaining ASP.NET Core Web APIs and Entity Framework Core databases.

---

## 🏗 API & Component Architecture

1. **Dependency Injection (DI)**:
   - Register services with matching lifespans: `Transient` (lightweight stateless services), `Scoped` (services holding state per request, e.g., EF Database Context), `Singleton` (caching, configs).
   - Inject dependencies via constructor injection. Avoid using the Service Locator pattern (`IServiceProvider.GetService`).

2. **Controller/Endpoint Patterns**:
   - Keep controllers thin. Delegate business logic to Services, CQRS Handlers (MediatR), or Repositories.
   - Use strongly-typed DTOs (Data Transfer Objects) for request validation and API outputs.
   - Return clean action results using standard HTTP status codes: `Ok()`, `CreatedAtAction()`, `BadRequest()`, `NotFound()`, `Unauthorized()`.

3. **Validation & Exception Handling**:
   - Use **FluentValidation** for robust, testable request validation models.
   - Implement a global exception filter or middleware (`UseExceptionHandler`) to capture errors and return consistent RFC 7807 problem details responses.

---

## 🗄 Entity Framework Core (EF Core)

1. **Query Performance**:
   - **No-Tracking**: For read-only operations, always append `.AsNoTracking()` to avoid EF tracking overhead:
     ```csharp
     var users = await _context.Users
         .AsNoTracking()
         .Where(u => u.IsActive)
         .ToListAsync();
     ```
   - **Explicit Projection**: Project queries directly to DTOs using `.Select()` to fetch only the required columns instead of loading whole entities.
   - **Eager Loading**: Use `.Include()` and `.ThenInclude()` carefully to prevent N+1 query problems.

2. **Migrations & Database Management**:
   - **Enforce TDD Migrations**: Before modifying database models, write the entity types and add the migration:
     ```cmd
     dotnet ef migrations add AddUserBillingTable --project src/Infrastructure --startup-project src/WebAPI
     ```
   - **Update database safely**:
     ```cmd
     dotnet ef database update --project src/Infrastructure --startup-project src/WebAPI
     ```
   - Never use `context.Database.EnsureCreated()` in production code. Always use migrations.

3. **Data Isolation & Transactions**:
   - Use `IDbContextTransaction` explicitly when executing multiple database operations that must succeed or fail as a single unit.

---

## 🧪 Testing dotnet APIs

- **Unit Testing**: Use **xUnit** or **NUnit** combined with **FluentAssertions** and **Moq** / **NSubstitute**.
- **Integration Testing**: Use `WebApplicationFactory<TStartup>` to spin up the API in-memory and verify end-to-end controllers against a test database instance (Respawn or local DB).
- **Stealth Check**: Ensure no AI signatures or generated code comments are committed to production C# classes.

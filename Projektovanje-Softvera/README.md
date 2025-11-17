# Explorer project quickstart

This repository hosts the Explorer .NET solution under `src/Explorer.sln`. The API entry point lives in `src/Explorer.API/Explorer.API.csproj`.

## Running the app
1. Open a terminal **inside the repository root** (the folder that contains the `src/` directory and `Explorer.sln`). If you run commands from a different folder, you'll see errors like `MSB1003` or `Project file does not exist`.
2. Restore dependencies (run in the root folder):
   ```bash
   dotnet restore src/Explorer.sln
   ```
3. Start the API from the repository root (same folder as `README.md`):
   ```bash
   dotnet run --project src/Explorer.API/Explorer.API.csproj
   ```
   If you are already inside the `src/` folder, run:
   ```bash
   dotnet run --project Explorer.API/Explorer.API.csproj --launch-profile Explorer.API
   ```
4. When the app prints the listening address, open the Swagger UI (typically `https://localhost:5001/swagger` or `http://localhost:5000/swagger`).

   Swagger UI is a built-in documentation and tester for the API. It lists every controller/endpoint with the request shape, response schema, and lets you send requests directly from the browser (no extra tools needed). Use it to verify the API is running and to try login/registration or equipment routes without writing a client.

## Database connection
The app uses PostgreSQL via environment variables; defaults are `localhost:5432`, database `explorer-v1`, user `postgres`, password `root`, and module-specific schemas (`stakeholders`, `tours`, `blog`). Override them before `dotnet run` if your database name or credentials differ.

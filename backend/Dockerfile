FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY WebAPI.csproj .
RUN dotnet restore "WebAPI.csproj"
COPY . .
RUN dotnet publish "WebAPI.csproj" -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0 as final
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT [ "dotnet", "WebAPI.dll" ]
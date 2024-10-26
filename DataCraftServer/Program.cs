using DataCraftServer.AppContext;
using DataCraftServer.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<IPostgreSQLService, PostgreSQLService>();

var connectionString = builder.Configuration["DbConnection"];

DbConnection.ConnectionString = connectionString;

builder.Services.AddDbContext<ApplicationContext>((sp, options) =>
    options.UseNpgsql(connectionString)
);

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.MapGet("/", (ApplicationContext db) => db.Users.ToList());
app.UseRouting();
app.MapControllers();

app.Run();

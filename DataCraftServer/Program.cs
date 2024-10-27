using DataCraftServer.AppContext;
using DataCraftServer.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IPostgreSQLService, PostgreSQLService>();

var connectionString = builder.Configuration["DbConnection"];

DbConnection.ConnectionString = connectionString;

builder.Services.AddDbContext<ApplicationContext>((sp, options) =>
    options.UseNpgsql(connectionString)
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", b => b
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader()
           );
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();
app.UseCors("CorsPolicy");
app.UseSwagger();

app.UseSwaggerUI();
app.MapGet("/", (ApplicationContext db) => db.Users.ToList());
app.UseRouting();
app.MapControllers();

app.Run();

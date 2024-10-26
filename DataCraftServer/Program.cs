using DataCraftServer.AppContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var connectionString = builder.Configuration["DbConnection"];

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

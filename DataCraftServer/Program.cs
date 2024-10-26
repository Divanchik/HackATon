using DataCraftServer.AppContext;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationContext>();
var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.MapGet("/", (ApplicationContext db) => db.Users.ToList());
app.UseRouting();
app.MapControllers();

app.Run();

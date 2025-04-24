using ProjectApi.Interfaces;
using ProjectApi.Services;
using ProjectApi.Middlewares;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddNewbornService();

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.DateFormatPath(pathFormat: "Logs/log-{date:format=yyyy-MM-dd}.txt")
    .CreateLogger();

builder.Host.UseSerilog();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuditLogMiddleware();
app.UseErrorHandlingMiddleware();

app.UseDefaultFiles();
app.UseStaticFiles();

// app.UseFirstMiddelware();

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();

// app.UseHttpsRedirection();

// app.UseAuthorization();

// app.MapControllers();

// app.Run();

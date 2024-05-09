var builder = WebApplication.CreateBuilder(args);    //Buliding applicaion

// Add services to the container.

builder.Services.AddControllers();            //Adding controllers

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();   //Comments
    app.UseSwagger();
    app.UseSwaggerUI();   //userInterface
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();


app.UseRouting();           //Adding new comments   

app.UseCors(policy=>policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());   //comments


app.MapGet("/",() => "Medical store application");           //comments


app.Run();

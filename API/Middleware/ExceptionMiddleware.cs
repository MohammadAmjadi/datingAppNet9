using System;
using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
IHostEnvironment env)
{

    public async Task InvokeAsync(HttpContext contex)
    {


        try
        {
            await next(contex);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            contex.Response.ContentType = "application/json";
            contex.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = env.IsDevelopment()
            ? new ApiException(contex.Response.StatusCode, ex.Message, ex.StackTrace)
            : new ApiException(contex.Response.StatusCode, ex.Message, "Internal server error");

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);
            await contex.Response.WriteAsync(json);
        }
    }
}

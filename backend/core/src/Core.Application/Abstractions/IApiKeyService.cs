namespace Core.Application.Abstractions;

public interface IApiKeyService
{
   public string GenerateApiKey(string customerCode, DateTimeOffset expirationDate);
   
   
}
using Core.Domain.Primitives;

namespace Core.Domain.Entities.ApiKeyAggregate;

public class ApiKey : Entity
{
    public string CustomerCode { get; set; }
    public string Key { get; set; }
}
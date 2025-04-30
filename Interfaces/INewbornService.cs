using ProjectApi.Models;

namespace ProjectApi.Interfaces
{
    public interface INewbornService
    {
        List<NewbornAccessories>? GetAll();
        NewbornAccessories? Get(int id);
        void Add(NewbornAccessories newborn, int userId);
        void Delete(int id);
        void Update(NewbornAccessories newborn, int userId);
        int Count { get; }
        void DeleteAccesoryByUserId(int userId);
    }
}







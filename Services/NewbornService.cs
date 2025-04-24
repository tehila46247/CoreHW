using ProjectApi.Interfaces;
using ProjectApi.Models;

namespace ProjectApi.Services
{
    public class NewbornService : INewbornService
    {

        List<NewbornAccessories> NewbornList { get; } 
        int nextId = 3;

        public NewbornService()
        {
            NewbornList = new List<NewbornAccessories>
            {
               new NewbornAccessories { Id = 1, Name = "Soft carpet" },
               new NewbornAccessories { Id = 2, Name = "Basket of keys", IsInUse = true }
            };
        }

        public List<NewbornAccessories> GetAll() => NewbornList;

        public NewbornAccessories Get(int id) => NewbornList.FirstOrDefault(n => n.Id == id);

        public void Add(NewbornAccessories newborn)
        {
            newborn.Id = nextId++;
            NewbornList.Add(newborn);
        }

        public void Delete(int id)
        {
            var newborn = Get(id);
            if(newborn is null)
                return;

            NewbornList.Remove(newborn);
        }

        public void Update(NewbornAccessories newborn)
        {
            var index = NewbornList.FindIndex(n => n.Id == newborn.Id);
            if(index == -1)
                return;

            NewbornList[index] = newborn;
        }

        public int Count { get =>  NewbornList.Count();}
    }
}
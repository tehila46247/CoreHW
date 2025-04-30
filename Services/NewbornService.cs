using System.Text.Json;
using ProjectApi.Interfaces;
using ProjectApi.Models;

namespace ProjectApi.Services
{
    public class NewbornService : INewbornService
    {
        int nextId;
        string text;
        List<NewbornAccessories>? newbornList { get; }
        public NewbornService()
        {
            text = Path.Combine(
                "Data",
                "NewbornAccessories.json"
            );

            using (var jsonOpen = File.OpenText(text))
            {
                newbornList = JsonSerializer.Deserialize<List<NewbornAccessories>>(jsonOpen.ReadToEnd(),
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            nextId = newbornList != null ? newbornList[newbornList.Count - 1].Id + 1 : 1;
        }

        private void saveToFile()
        {
            File.WriteAllText(text, JsonSerializer.Serialize(newbornList));
        }

        public List<NewbornAccessories>? GetAll() => newbornList;

        public NewbornAccessories? Get(int id) => newbornList?.FirstOrDefault(j => j.Id == id);

        public void Add(NewbornAccessories newborn, int UserId)
        {
            newborn.Id = nextId++;
            newborn.UserId = UserId;
            newbornList?.Add(newborn);
            saveToFile();
        }

        public void Update(NewbornAccessories newborn, int UserId)
        {
            if (newbornList == null)
                throw new InvalidOperationException("The newborn accessories list has not been initialized.");

            var index = newbornList.FindIndex(n => n.Id == newborn.Id);
            if (index == -1)
                return;

            newborn.UserId = UserId;
            newbornList[index] = newborn;
            saveToFile();
        }

        public void Delete(int id)
        {
            var newborn = Get(id);
            if (newborn is null)
                return;
            newbornList?.Remove(newborn);
            saveToFile();
        }

        public int Count { get => newbornList?.Count() ?? 0; }


        public void DeleteAccesoryByUserId(int userId)
        {
            var itemsToRemove = newbornList?.Where(n => n.UserId == userId).ToList();

            if (itemsToRemove == null || !itemsToRemove.Any())
                return;

            foreach (var item in itemsToRemove)
            {
                newbornList?.Remove(item);
            }
            saveToFile();
        }
    }
    public static class NewbornServiceHelper
    {
        public static void AddAccessoryService(this IServiceCollection services)
        {
            services.AddSingleton<INewbornService, NewbornService>();
        }
    }
}
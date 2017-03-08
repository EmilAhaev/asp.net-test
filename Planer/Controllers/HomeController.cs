using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Planer.Models;
namespace Planer.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        private PlanerDatabaseEntities db = new PlanerDatabaseEntities();
        [HttpGet]
        public ActionResult Index()
        {
            var Items = db.Planers.OrderBy(p => p.Sort);
            
            return View(Items);
        }
        [HttpPost]
        public ActionResult TaskList()
        {
            var Items = db.Planers.OrderBy(p => p.Sort);

            return View(Items);
        }

        
        [HttpPost]
        public string Create(string Title, string Description, int Sort)
        {
            Models.Planer task = new Models.Planer
            {
                Title = Title,
                Description = Description,
                Sort = Sort
            };
            db.Planers.Add(task);
            db.SaveChanges();
            return "Записали!";
        }

        [HttpPost]
        public string Delete(int id)
        {
            Models.Planer task = new Models.Planer
            {
                Id=id
            };         
            db.Planers.Attach(task);
            db.Planers.Remove(task);
            db.SaveChanges();           
            return "Удалили!";
        }

        [HttpPost]
        public string Update(int id, string title, string description, int sort)
        {
            Models.Planer task = db.Planers.Find(id);

            task.Title = title;
            task.Description = description;
            task.Sort = sort;
            db.SaveChanges();

            return "Изменили";
        }

        [HttpPost]
        public ActionResult GetTaskEditForm(int id, string title, string description, int sort)
        {
            ViewBag.Id = id;
            ViewBag.Title = title;
            ViewBag.Description = description;
            ViewBag.Sort = sort;
            return View();
        }
    }
}
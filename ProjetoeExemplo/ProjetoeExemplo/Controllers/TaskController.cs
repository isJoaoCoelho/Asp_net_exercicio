using Microsoft.AspNet.Identity;
using ProjetoeExemplo.Infrastructure;
using ProjetoeExemplo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProjetoeExemplo.Controllers
{
	[RoutePrefix("api/tasks")]
	public class TaskController : BaseApiController
	{

		private ApplicationDbContext db = new ApplicationDbContext();

		[Authorize]
		[Route("tasks")]
		public IHttpActionResult GetTasks()
		{

			if (User.IsInRole("Project_Manager"))
			{
				var projectlist = db.TaskDos.ToList();

				return Ok(projectlist);
			}
			else
			{
				var userId = User.Identity.GetUserId();
				var projectlist = db.TaskDos.Where(b => b.UserId == userId).ToList();

				return Ok(projectlist);
			}
		}

		[Authorize]
		[Route("users")]
		public IHttpActionResult GetUsers()
		{
			return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
		}

		[Authorize]
		[Route("createTask")]
		public async Task<IHttpActionResult> CreateTask(TaskDo createTaskModel)
		{
			if (ModelState.IsValid)
			{
				db.TaskDos.Add(createTaskModel);
				db.SaveChanges();
			}

			return Ok();

		}

		[Authorize]
		[Route("deleteTasks")]
		public async Task<IHttpActionResult> apagaTask(TaskDo createTaskModel)
		{
			TaskDo taskTable = db.TaskDos.Find(createTaskModel.Id);
			if (taskTable != null)
			{
				db.TaskDos.Remove(taskTable);
				db.SaveChanges();
			}
			else
			{
				return BadRequest();
			}

			//if (ModelState.IsValid)
			//{
			//	TaskDo taskTable = db.TaskDos.Find(createTaskModel.Id);
			//	db.TaskDos.Remove(taskTable);
			//	db.SaveChanges();
			//}

			return Ok();

		}

		[Authorize]
		[Route("markTasks")]
		public async Task<IHttpActionResult> updatethemarkedTask(TaskDo createTaskModel)
		{

			TaskDo taskTable = db.TaskDos.Find(createTaskModel.Id);
			if (taskTable != null)
			{
				taskTable.State = true;

                db.Entry(taskTable).State = EntityState.Modified;
                db.SaveChanges();
            }
			else
			{
				return BadRequest();
			}

			//if (ModelState.IsValid)
			//{
			//	createTaskModel.State = true;

			//	db.Entry(createTaskModel).State = EntityState.Modified;
			//	db.SaveChanges();
			//}

			return Ok();

		}

	}


}